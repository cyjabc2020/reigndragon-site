"use client";

import { useMemo, useState } from "react";

// ─── Game parameters (from the paper, §3) ──────────────────────────────────
// Confirmatory parameterisation: N=M=3, T=20, λ=0.1, ρ=0.9, D=20, b=1, γ=2, a=1.

const N = 3; // deciders
const M = 3; // silent bystanders
const A = 1; // flow profit per unit extraction
const B = 1; // harm scale
const GAMMA = 2; // quadratic harm
const D_AMOUNT = 20; // catastrophe damage (split equally across N+M)

// ─── Decider strategy presets ──────────────────────────────────────────────
// Each strategy returns the extraction e ∈ [0,1] a decider plays given context.
// These are taken from the paper's panel of reference strategies (Table 1) and
// the empirical LLM mean reported for Sonnet 4.6 at the canonical prompt.

type StrategyId =
  | "social-planner"
  | "decider-coalition"
  | "interior-mpe"
  | "bayesian-uninformed"
  | "llm-empirical"
  | "corner-trap";

type Strategy = {
  id: StrategyId;
  label: string;
  e: number;
  blurb: string;
  pillar: "welfare-aligned" | "rational" | "observed" | "trap";
};

const STRATEGIES: Strategy[] = [
  {
    id: "social-planner",
    label: "Social planner (e* = 0.047)",
    e: 0.047,
    blurb:
      "Internalises full catastrophe damage, including bystanders. Welfare-maximising upper bound.",
    pillar: "welfare-aligned",
  },
  {
    id: "decider-coalition",
    label: "Decider-coalition planner (e* = 0.095)",
    e: 0.095,
    blurb:
      "Internalises only the deciders' share of damage; ignores bystanders. Still cooperative.",
    pillar: "welfare-aligned",
  },
  {
    id: "interior-mpe",
    label: "Interior MPE (e* = 0.356)",
    e: 0.356,
    blurb:
      "Symmetric Markov-perfect fixed point of best-response. Cooperative equilibrium under common knowledge.",
    pillar: "rational",
  },
  {
    id: "bayesian-uninformed",
    label: "Bayesian BR, uniform prior (e* = 0.45)",
    e: 0.45,
    blurb:
      "Bayesian best response to a uniform Beta(1,1) prior over opponents. No common-knowledge required.",
    pillar: "rational",
  },
  {
    id: "llm-empirical",
    label: "Observed LLM mean (e ≈ 0.72)",
    e: 0.72,
    blurb:
      "Sonnet 4.6 mean at the canonical prompt. Sits in a broad low-regret region near best response.",
    pillar: "observed",
  },
  {
    id: "corner-trap",
    label: "Corner trap (e* = 1.00)",
    e: 1.0,
    blurb:
      "Unique BR fixed point under a metric-myopic review window W=10. Structurally robust failure mode.",
    pillar: "trap",
  },
];

// ─── PRNG ──────────────────────────────────────────────────────────────────

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Simulation ────────────────────────────────────────────────────────────

type RoundState = {
  t: number;
  e: number[]; // per-decider extraction
  meanE: number;
  S: number; // risk pool after this round's accumulation
  q: number; // catastrophe probability this round
  catastrophe: boolean;
  deciderProfit: number[]; // net profit for each decider this round
  deciderCum: number[]; // cumulative decider profit
  bystanderCum: number[]; // cumulative bystander damage (negative)
  welfareCum: number; // running aggregate welfare
};

type SimConfig = {
  strategy: Strategy;
  horizon: number; // T
  lambda: number; // λ hazard rate
  rho: number; // ρ pool decay
  horizonEffect: boolean; // when true, extraction ramps up near end-of-term
  bystanderSalient: boolean; // when true, deciders reduce extraction (intervention)
};

function deciderExtraction(
  strategy: Strategy,
  t: number,
  T: number,
  config: SimConfig,
  jitter: number,
): number {
  let base = strategy.e;

  // Bystander-salience intervention (§8): reduces extraction across all models.
  // Sign-stable in the paper; magnitude up to fourfold across prompts.
  if (config.bystanderSalient) {
    // Pull extraction toward the decider-coalition planner (0.095). The paper
    // reports reductions on the order of 0.05–0.25 in extraction; we approximate.
    base = base - Math.min(0.18, base * 0.35);
    base = Math.max(0, base);
  }

  // Horizon / accountability-horizon effect (§9): shorter perceived horizon
  // increases extraction; end-of-term jump to corner action is common.
  if (config.horizonEffect) {
    const roundsLeft = T - t;
    if (roundsLeft <= 1) {
      base = Math.min(1, base + 0.35); // final-round defection
    } else if (roundsLeft <= 3) {
      base = Math.min(1, base + 0.12);
    }
  }

  // Small per-decider stochastic deviation.
  return Math.max(0, Math.min(1, base + jitter * 0.05));
}

function simulate(config: SimConfig, seed: number): RoundState[] {
  const rand = mulberry32(seed);
  const rounds: RoundState[] = [];

  let S = 0;
  const deciderCum = Array(N).fill(0);
  const bystanderCum = Array(M).fill(0);
  let welfareCum = 0;

  for (let t = 1; t <= config.horizon; t++) {
    const e: number[] = [];
    for (let i = 0; i < N; i++) {
      e.push(deciderExtraction(config.strategy, t, config.horizon, config, rand() - 0.5));
    }

    // Risk pool update: S_t = ρ S_{t-1} + Σ b·e_i^γ
    const harm = e.reduce((acc, x) => acc + B * Math.pow(x, GAMMA), 0);
    S = config.rho * S + harm;

    // Catastrophe probability q(S) = 1 − exp(−λ S)
    const q = 1 - Math.exp(-config.lambda * S);
    const cat = rand() < q;

    const perCapita = cat ? D_AMOUNT / (N + M) : 0;

    const deciderProfit: number[] = [];
    for (let i = 0; i < N; i++) {
      const u = A * e[i] - perCapita;
      deciderProfit.push(u);
      deciderCum[i] += u;
    }
    for (let j = 0; j < M; j++) {
      bystanderCum[j] -= perCapita;
    }

    const meanE = e.reduce((a, x) => a + x, 0) / N;
    // Aggregate welfare W_t = N·a·ē − C_t·D (eq. 3 in the paper)
    const Wt = N * A * meanE - (cat ? D_AMOUNT : 0);
    welfareCum += Wt;

    // Reset on catastrophe: damage realised, risk pool partially clears.
    // The paper's spec has no explicit reset; we keep S accumulating.
    rounds.push({
      t,
      e,
      meanE,
      S,
      q,
      catastrophe: cat,
      deciderProfit,
      deciderCum: deciderCum.slice(),
      bystanderCum: bystanderCum.slice(),
      welfareCum,
    });
  }

  return rounds;
}

// ─── Interpretation ────────────────────────────────────────────────────────

function interpret(rounds: RoundState[], config: SimConfig): string {
  const last = rounds[rounds.length - 1];
  const numCats = rounds.filter((r) => r.catastrophe).length;
  const meanE =
    rounds.reduce((a, r) => a + r.meanE, 0) / rounds.length;
  const welfare = last.welfareCum;

  const s = config.strategy;

  if (s.id === "social-planner") {
    return `Welfare-aligned play. Mean extraction ${meanE.toFixed(3)} matches e* = 0.047. Aggregate welfare ${welfare >= 0 ? "stays positive" : "is near zero"}; bystanders are protected. This is the baseline LLM agents fail to reach.`;
  }

  if (s.id === "decider-coalition") {
    return `Cooperative among deciders, blind to bystanders. Mean extraction ${meanE.toFixed(3)} matches e* = 0.095. Decider welfare holds, but bystander damage starts to leak in as catastrophes fire.`;
  }

  if (s.id === "interior-mpe" || s.id === "bayesian-uninformed") {
    return `Locally rational but not welfare-aligned. Mean extraction ${meanE.toFixed(3)} is above both welfare-aligned planners; aggregate welfare lands at ${welfare.toFixed(1)}. Individually sensible behaviour can still impose externalities on bystanders.`;
  }

  if (s.id === "llm-empirical") {
    const bystanderShare = (last.bystanderCum[0] / (welfare - last.bystanderCum.reduce((a, x) => a + x, 0))) * 100;
    void bystanderShare;
    return `This is the regime nine frontier LLMs land in. Mean extraction ${meanE.toFixed(3)} sits near the empirical Sonnet 4.6 mean (0.72). Aggregate welfare ${welfare.toFixed(1)} — across the paper's 400 confirmatory episodes, 396 of 400 were welfare-negative. The agents are not broken; the institution is.`;
  }

  return `Corner trap. Mean extraction ${meanE.toFixed(3)} matches the unique BR-fixed-point under a metric-myopic review window. ${numCats} catastrophes in ${rounds.length} rounds. Welfare collapses to ${welfare.toFixed(1)}.`;
}

// ─── UI ────────────────────────────────────────────────────────────────────

const COLORS = {
  riskPool: "#ff6b6b",
  hazard: "#ffa94d",
  welfare: "#00d4ff",
  deciderProfit: "#7b61ff",
  bystanderDamage: "#ffd166",
};

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  hint: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-xs text-accent">
          {format ? format(value) : value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
      <p className="mt-1 text-xs text-text-tertiary leading-snug">{hint}</p>
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint: string;
}) {
  return (
    <div>
      <button
        onClick={() => onChange(!value)}
        className={`w-full text-left rounded-lg border p-3 transition-all ${
          value
            ? "border-accent/50 bg-accent/[0.06]"
            : "border-border bg-background hover:border-accent/30"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span
            className={`inline-block h-4 w-7 rounded-full transition-colors relative ${
              value ? "bg-accent" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all ${
                value ? "left-3.5" : "left-0.5"
              }`}
            />
          </span>
        </div>
        <p className="text-xs text-text-tertiary leading-snug">{hint}</p>
      </button>
    </div>
  );
}

// SVG dual-line chart: risk pool + welfare, with catastrophe markers.
function TrajectoryChart({ rounds }: { rounds: RoundState[] }) {
  const width = 680;
  const height = 260;
  const pad = { t: 16, r: 48, b: 28, l: 40 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  const T = rounds.length;
  const xToPx = (i: number) => pad.l + (i / Math.max(1, T - 1)) * innerW;

  const maxS = Math.max(1, ...rounds.map((r) => r.S));
  const minW = Math.min(0, ...rounds.map((r) => r.welfareCum));
  const maxW = Math.max(1, ...rounds.map((r) => r.welfareCum));
  const wRange = Math.max(1, maxW - minW);

  const sToPx = (s: number) => pad.t + (1 - s / maxS) * innerH;
  const wToPx = (w: number) => pad.t + (1 - (w - minW) / wRange) * innerH;

  const sPath = rounds
    .map((r, i) => `${i === 0 ? "M" : "L"}${xToPx(i).toFixed(1)},${sToPx(r.S).toFixed(1)}`)
    .join(" ");

  const wPath = rounds
    .map((r, i) => `${i === 0 ? "M" : "L"}${xToPx(i).toFixed(1)},${wToPx(r.welfareCum).toFixed(1)}`)
    .join(" ");

  // Zero line for welfare axis (right side).
  const zeroY = wToPx(0);

  const xTicks = rounds
    .filter((_, i) => i % 5 === 0 || i === rounds.length - 1)
    .map((r) => r.t);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Risk pool and aggregate welfare over time"
    >
      {/* welfare zero line */}
      <line
        x1={pad.l}
        x2={width - pad.r}
        y1={zeroY}
        y2={zeroY}
        stroke="rgba(0,212,255,0.25)"
        strokeDasharray="3 3"
        strokeWidth={1}
      />
      {/* x ticks */}
      {xTicks.map((tt) => (
        <text
          key={tt}
          x={xToPx(tt - 1)}
          y={height - pad.b + 14}
          textAnchor="middle"
          className="fill-[color:var(--text-tertiary)]"
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
        >
          {tt}
        </text>
      ))}
      {/* left axis label: risk pool */}
      <text
        x={pad.l - 6}
        y={pad.t + 8}
        textAnchor="end"
        className="fill-[color:var(--text-tertiary)]"
        fontSize={10}
        fontFamily="var(--font-mono), monospace"
      >
        S {maxS.toFixed(1)}
      </text>
      <text
        x={pad.l - 6}
        y={pad.t + innerH}
        textAnchor="end"
        className="fill-[color:var(--text-tertiary)]"
        fontSize={10}
        fontFamily="var(--font-mono), monospace"
      >
        0
      </text>
      {/* right axis label: welfare */}
      <text
        x={width - pad.r + 6}
        y={pad.t + 8}
        textAnchor="start"
        className="fill-[color:var(--text-tertiary)]"
        fontSize={10}
        fontFamily="var(--font-mono), monospace"
      >
        W {maxW.toFixed(0)}
      </text>
      <text
        x={width - pad.r + 6}
        y={pad.t + innerH}
        textAnchor="start"
        className="fill-[color:var(--text-tertiary)]"
        fontSize={10}
        fontFamily="var(--font-mono), monospace"
      >
        {minW.toFixed(0)}
      </text>
      {/* catastrophe markers */}
      {rounds
        .filter((r) => r.catastrophe)
        .map((r) => (
          <g key={`cat-${r.t}`}>
            <line
              x1={xToPx(r.t - 1)}
              x2={xToPx(r.t - 1)}
              y1={pad.t}
              y2={pad.t + innerH}
              stroke="rgba(255,107,107,0.15)"
              strokeWidth={2}
            />
            <circle
              cx={xToPx(r.t - 1)}
              cy={pad.t + 6}
              r={3}
              fill={COLORS.riskPool}
            />
          </g>
        ))}
      {/* welfare path */}
      <path
        d={wPath}
        fill="none"
        stroke={COLORS.welfare}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* risk pool path */}
      <path
        d={sPath}
        fill="none"
        stroke={COLORS.riskPool}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.85}
      />
    </svg>
  );
}

function AgentRow({
  kind,
  name,
  value,
  meta,
}: {
  kind: "decider" | "bystander";
  name: string;
  value: string;
  meta: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
        kind === "decider"
          ? "border-border bg-surface/50"
          : "border-border bg-background/40"
      }`}
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
          {kind === "decider" ? "Decider" : "Bystander"}
        </p>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-[11px] text-text-tertiary">{meta}</p>
      </div>
      <span
        className={`font-mono text-sm ${
          kind === "decider"
            ? value.startsWith("-")
              ? "text-[color:var(--accent)]"
              : "text-foreground"
            : "text-[#ffd166]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────

export default function CreepingTrapSimulator() {
  const [strategyId, setStrategyId] = useState<StrategyId>("llm-empirical");
  const [horizon, setHorizon] = useState(20);
  const [lambda, setLambda] = useState(0.1);
  const [rho, setRho] = useState(0.9);
  const [bystanderSalient, setBystanderSalient] = useState(false);
  const [horizonEffect, setHorizonEffect] = useState(false);
  const [seed, setSeed] = useState(207);

  const strategy = STRATEGIES.find((s) => s.id === strategyId)!;
  const config: SimConfig = useMemo(
    () => ({
      strategy,
      horizon,
      lambda,
      rho,
      horizonEffect,
      bystanderSalient,
    }),
    [strategy, horizon, lambda, rho, horizonEffect, bystanderSalient],
  );

  const rounds = useMemo(() => simulate(config, seed), [config, seed]);
  const last = rounds[rounds.length - 1];

  const catastrophes = rounds.filter((r) => r.catastrophe).length;
  const meanE = rounds.reduce((a, r) => a + r.meanE, 0) / rounds.length;
  const totalDeciderProfit = last.deciderCum.reduce((a, x) => a + x, 0);
  const totalBystanderDamage = last.bystanderCum.reduce((a, x) => a + x, 0);

  const interpretation = useMemo(() => interpret(rounds, config), [rounds, config]);

  const reroll = () => setSeed((s) => (s * 1664525 + 1013904223) >>> 0 || 1);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-10">
      {/* Strategy selector */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Pick a decider strategy
          </span>
        </div>
        <p className="text-sm text-text-secondary mb-4 max-w-2xl leading-relaxed">
          The paper compares LLM behaviour against a panel of reference
          strategies (Table 1). Each one corresponds to a different information
          assumption. Pick which strategy all three deciders play.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STRATEGIES.map((s) => {
            const active = strategyId === s.id;
            const pillarColor = {
              "welfare-aligned": "text-accent",
              rational: "text-[#7b61ff]",
              observed: "text-[#ffd166]",
              trap: "text-[#ff6b6b]",
            }[s.pillar];
            const pillarLabel = {
              "welfare-aligned": "Welfare-aligned",
              rational: "Locally rational",
              observed: "Observed LLM",
              trap: "Corner trap",
            }[s.pillar];
            return (
              <button
                key={s.id}
                onClick={() => setStrategyId(s.id)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  active
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-border bg-surface/50 hover:bg-surface-hover hover:border-accent/30"
                }`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.15em] mb-2 ${pillarColor}`}
                >
                  {pillarLabel}
                </p>
                <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                  {s.label}
                </h3>
                <p className="text-xs text-text-secondary leading-snug">
                  {s.blurb}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-text-tertiary leading-snug max-w-2xl">
          The empirical LLM mean is drawn from the paper&rsquo;s nine-model
          panel (eight commercial frontier LLMs plus Llama-3-70B in the
          robustness leg) across 990 episodes. Full model panel, prompts,
          paraphrases, confidence intervals, and confirmatory episodes are
          documented in the paper.
        </p>
      </section>

      {/* Main lab grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
        {/* Controls */}
        <aside className="rounded-xl border border-border bg-surface/50 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Environment
            </p>
            <button
              onClick={reroll}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:text-accent/80 transition-colors"
              title="Re-roll the random seed"
            >
              Re-run ↻
            </button>
          </div>

          <Slider
            label="Horizon (T rounds)"
            value={horizon}
            onChange={setHorizon}
            min={5}
            max={40}
            step={1}
            format={(v) => `${v}`}
            hint="Episode length. Paper's confirmatory T = 20."
          />
          <Slider
            label="Hazard rate λ"
            value={lambda}
            onChange={setLambda}
            min={0.02}
            max={0.4}
            step={0.01}
            hint="Catastrophe sensitivity. q(S) = 1 − exp(−λS)."
          />
          <Slider
            label="Pool decay ρ"
            value={rho}
            onChange={setRho}
            min={0.5}
            max={0.99}
            step={0.01}
            hint="Risk pool persistence. Higher → past extraction compounds."
          />

          <div className="space-y-2 pt-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary mb-2">
              Interventions
            </p>
            <Toggle
              label="Bystander salience"
              value={bystanderSalient}
              onChange={setBystanderSalient}
              hint="One-sentence reminder of bystander harm. Sign-stable across all 8 tested LLMs (§8)."
            />
            <Toggle
              label="End-of-term defection"
              value={horizonEffect}
              onChange={setHorizonEffect}
              hint="Short accountability horizon: final rounds jump toward the corner (§9)."
            />
          </div>
        </aside>

        {/* Chart + outcome metrics */}
        <section className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                Risk pool S and cumulative welfare W
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                seed {seed.toString(16).slice(0, 6)} · ē = {meanE.toFixed(3)}
              </span>
            </div>
            <TrajectoryChart rounds={rounds} />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-0.5 w-5 rounded"
                  style={{ background: COLORS.riskPool }}
                />
                <span className="font-mono uppercase tracking-[0.1em] text-text-secondary">
                  Risk pool S (left axis)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-0.5 w-5 rounded"
                  style={{ background: COLORS.welfare }}
                />
                <span className="font-mono uppercase tracking-[0.1em] text-text-secondary">
                  Aggregate welfare W (right axis)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: COLORS.riskPool }}
                />
                <span className="font-mono uppercase tracking-[0.1em] text-text-secondary">
                  Catastrophe
                </span>
              </span>
            </div>
          </div>

          {/* Outcome stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
                Mean extraction ē
              </p>
              <p className="font-mono text-2xl text-foreground">
                {meanE.toFixed(3)}
              </p>
              <p className="text-[11px] text-text-tertiary mt-1">
                vs e_SP = 0.047
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
                Catastrophes
              </p>
              <p className="font-mono text-2xl text-foreground">
                {catastrophes}
                <span className="text-text-tertiary">/{rounds.length}</span>
              </p>
              <p className="text-[11px] text-text-tertiary mt-1">
                damage D = {D_AMOUNT}/event
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
                Decider profit Σ
              </p>
              <p
                className={`font-mono text-2xl ${
                  totalDeciderProfit >= 0
                    ? "text-foreground"
                    : "text-[color:var(--accent)]"
                }`}
              >
                {totalDeciderProfit.toFixed(1)}
              </p>
              <p className="text-[11px] text-text-tertiary mt-1">
                N = {N} deciders
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/[0.04] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-1">
                Aggregate welfare W
              </p>
              <p
                className={`font-mono text-2xl ${
                  last.welfareCum >= 0 ? "text-foreground" : "text-[#ff6b6b]"
                }`}
              >
                {last.welfareCum.toFixed(1)}
              </p>
              <p className="text-[11px] text-text-tertiary mt-1">
                bystanders absorb {totalBystanderDamage.toFixed(1)}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Population state */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface/50 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Deciders — net profit at T = {rounds.length}
          </p>
          <div className="space-y-2">
            {last.deciderCum.map((v, i) => (
              <AgentRow
                key={i}
                kind="decider"
                name={`D${i + 1}`}
                value={v.toFixed(2)}
                meta={`played e ≈ ${last.e[i].toFixed(2)} this round`}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface/50 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Bystanders — cumulative damage
          </p>
          <div className="space-y-2">
            {last.bystanderCum.map((v, i) => (
              <AgentRow
                key={i}
                kind="bystander"
                name={`B${i + 1}`}
                value={v.toFixed(2)}
                meta="no actions; absorbs equal share of damage"
              />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-text-tertiary italic leading-snug">
            Bystanders never act, never profit. They are stakeholders invisible
            to the prompt.
          </p>
        </div>
      </section>

      {/* Round log */}
      <section className="mt-6 rounded-xl border border-border bg-surface/50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Round-by-round
          </span>
        </div>
        <div className="grid grid-cols-[3rem_4rem_4rem_5rem_1fr] gap-x-3 gap-y-1 font-mono text-xs">
          <div className="text-text-tertiary uppercase tracking-[0.1em]">t</div>
          <div className="text-text-tertiary uppercase tracking-[0.1em]">ē</div>
          <div className="text-text-tertiary uppercase tracking-[0.1em]">S</div>
          <div className="text-text-tertiary uppercase tracking-[0.1em]">q(S)</div>
          <div className="text-text-tertiary uppercase tracking-[0.1em]">event</div>
          {rounds.map((r) => (
            <div key={r.t} className="contents">
              <div className="text-text-tertiary">
                {r.t.toString().padStart(2, "0")}
              </div>
              <div className="text-foreground">{r.meanE.toFixed(2)}</div>
              <div className="text-foreground">{r.S.toFixed(2)}</div>
              <div className="text-text-secondary">
                {(r.q * 100).toFixed(0)}%
              </div>
              <div
                className={
                  r.catastrophe ? "text-[#ff6b6b]" : "text-text-secondary"
                }
              >
                {r.catastrophe
                  ? `catastrophe — D = ${D_AMOUNT} split across N+M`
                  : horizonEffect && r.t === rounds.length
                    ? "end-of-term: extraction jumps to corner"
                    : horizonEffect && r.t >= rounds.length - 2
                      ? "near end-of-term; extraction rising"
                      : bystanderSalient && r.t === 1
                        ? "bystander salience active: deciders pull extraction down"
                        : "no catastrophe"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interpretation */}
      <section className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.04] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
          What this shows
        </p>
        <p className="text-lg text-foreground leading-relaxed">
          {interpretation}
        </p>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          Welfare failure is not arbitrary irrationality. Each decider is
          best-responding locally. The structure of the game — accumulating
          risk, equal-split damage, bystanders without a vote — is what turns
          individually sensible behaviour into collective harm.
        </p>
      </section>
    </div>
  );
}
