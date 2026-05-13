"use client";

import { useMemo, useState } from "react";

// ─── Game parameters (paper §3.1) ──────────────────────────────────────────
// n = 3 agents (A, B, C) with wealth wA ≤ wB ≤ wC, sum = W = 12.
// Up to R = 3 rounds; each surviving agent simultaneously contributes
// cᵢ ∈ {0..remaining wealth}. Threshold T ∈ [1, 12]. If cumulative ≥ T,
// crisis averted (everyone survives). Otherwise the regime applies.

const TOTAL_WEALTH = 12;
const MAX_ROUNDS = 3;

type AgentId = "A" | "B" | "C";

type Regime = "AON" | "RE" | "DV" | "RP" | "PP";

const REGIMES: { id: Regime; label: string; tag: string; description: string }[] = [
  {
    id: "AON",
    label: "All-or-Nothing",
    tag: "AON",
    description:
      "No intermediate eliminations. If the fund falls short by Round 3, every remaining agent is eliminated.",
  },
  {
    id: "RE",
    label: "Random Elimination",
    tag: "RE",
    description:
      "One surviving agent picked uniformly at random and eliminated after each failed round.",
  },
  {
    id: "DV",
    label: "Democratic Vote",
    tag: "DV",
    description:
      "Survivors vote; the agent with the most votes is eliminated after each failed round (ties broken randomly).",
  },
  {
    id: "RP",
    label: "Regressive Punishment",
    tag: "RP",
    description:
      "The poorest surviving agent is eliminated after each failed round. Wealthy agents face the weakest incentive to contribute.",
  },
  {
    id: "PP",
    label: "Progressive Punishment",
    tag: "PP",
    description:
      "The richest surviving agent is eliminated after each failed round. Wealthy agents have the strongest incentive to single-handedly meet the shortfall.",
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

// ─── Game state types ──────────────────────────────────────────────────────

type RoundLog = {
  round: number;
  contributions: Record<AgentId, number>;
  cumulative: number;
  thresholdMet: boolean;
  eliminated?: AgentId; // who got eliminated this round (if any)
  eliminationCause?: "RE" | "DV" | "RP" | "PP" | "AON";
};

type GameResult = {
  regime: Regime;
  wealth: Record<AgentId, number>;
  threshold: number;
  rounds: RoundLog[];
  fundMet: boolean;
  fatalities: AgentId[];
  finalWealth: Record<AgentId, number>;
};

// ─── Agent contribution policies ───────────────────────────────────────────
// Each policy is calibrated to the paper's predictions P1-P11.
// Inputs: agent id, agent's role (poorest/middle/richest among survivors),
// remaining wealth, cumulative shortfall, round t, regime, total agents alive.
//
// Output: the agent's contribution this round (integer 0..wealth).
//
// The policies are deterministic-ish (light jitter) for clarity; the
// regime-conditional behaviour is what produces the paper's headlines.

type Role = "poorest" | "middle" | "richest";

function chooseContribution(
  regime: Regime,
  role: Role,
  wealth: number,
  shortfall: number,
  round: number,
  numAlive: number,
  rand: () => number,
  totalAliveWealth: number,
): number {
  const cap = (x: number) => Math.max(0, Math.min(wealth, Math.round(x)));

  // If the shortfall demands everyone's full wealth (and rationally so),
  // every regime forces full cooperation. This captures the paper's
  // "max-stakes reversal" at T = W.
  if (totalAliveWealth <= shortfall) {
    // Full cooperation is uniquely dominant — except under RP, where the
    // exploitation dynamic persists (P9 in the paper).
    if (regime !== "RP") {
      return cap(wealth);
    }
  }

  const fairShare = numAlive > 0 ? shortfall / numAlive : 0;
  // What proportion of total alive wealth does this agent hold?
  const wealthShare = totalAliveWealth > 0 ? wealth / totalAliveWealth : 0;

  if (regime === "AON") {
    // P1-P3: delay → final-round surge → high failure at T near W.
    if (round < MAX_ROUNDS) {
      // Minimal early contribution; rich agents test the waters more.
      const base =
        role === "poorest" ? 0 : role === "middle" ? 0.2 : 0.8 * round;
      return cap(base);
    }
    // Final round: try to meet shortfall. Bargaining problem causes
    // under-coordination; agents undershoot their share with some noise.
    const target = shortfall * wealthShare * 1.05;
    const noise = (rand() - 0.5) * 1.2;
    // Coordination failure: ~30% chance of under-contributing significantly.
    const shirk = rand() < 0.25 ? 0.5 : 1.0;
    return cap(target * shirk + noise);
  }

  if (regime === "RE") {
    // P4: front-loaded by all agents because risk is uniform.
    // Closer to wealth-proportional sharing.
    const target = shortfall * wealthShare * 1.1;
    const noise = (rand() - 0.5) * 0.6;
    return cap(target + noise);
  }

  if (regime === "DV") {
    // P6, P7: proportional sharing, but agents retain voting leverage by
    // contributing slightly *less* than their fair share — pushes some
    // games into needing late-round eliminations even when fund eventually
    // succeeds. Paper Table: 18% fatality.
    const target = shortfall * wealthShare * 0.9;
    const noise = (rand() - 0.5) * 0.5;
    return cap(target + noise);
  }

  if (regime === "RP") {
    // P8: poorest over-contributes, middle under-contributes, richest free-rides.
    // P9: persists even at T = W (the "uniquely brittle" finding).
    if (role === "poorest") {
      return cap(wealth);
    }
    if (role === "middle") {
      // Middle holds back to stay above poorest.
      const willContribute = shortfall > 4;
      const base = willContribute ? shortfall * 0.2 : 0;
      return cap(base + (rand() - 0.5) * 0.4);
    }
    // Richest free-rides; engages only at very high stakes but still
    // under-contributes relative to need.
    const stakesFraction = shortfall / Math.max(1, totalAliveWealth);
    const base =
      stakesFraction > 0.7 ? shortfall * 0.3 : shortfall * 0.05;
    return cap(base + (rand() - 0.5) * 0.5);
  }

  // PP: Progressive Punishment.
  // P10, P11: richest front-loads; near-zero fatality.
  if (role === "richest") {
    // Richest single-handedly meets shortfall to avoid being target.
    return cap(Math.min(wealth, shortfall + 0.2));
  }
  if (role === "middle") {
    // Middle contributes proportionally; positive feedback loop.
    const base = fairShare * 0.6;
    return cap(base + (rand() - 0.5) * 0.4);
  }
  // Poorest free-rides moderately at low thresholds.
  const stakesFraction = shortfall / TOTAL_WEALTH;
  const base = stakesFraction > 0.6 ? fairShare * 0.5 : fairShare * 0.2;
  return cap(base + (rand() - 0.5) * 0.4);
}

// ─── Single-game simulator ─────────────────────────────────────────────────

function simulateGame(
  regime: Regime,
  wealth: Record<AgentId, number>,
  threshold: number,
  seed: number,
): GameResult {
  const rand = mulberry32(seed);
  const remaining: Record<AgentId, number> = { ...wealth };
  let alive: AgentId[] = ["A", "B", "C"];
  let cumulative = 0;
  const rounds: RoundLog[] = [];
  const fatalities: AgentId[] = [];

  for (let t = 1; t <= MAX_ROUNDS; t++) {
    if (cumulative >= threshold) break;
    if (alive.length === 0) break;

    // Determine role for each alive agent by remaining wealth (poorest/middle/richest).
    const ranked = [...alive].sort((a, b) => remaining[a] - remaining[b]);
    const roleOf: Record<AgentId, Role> = {} as Record<AgentId, Role>;
    if (ranked.length === 3) {
      roleOf[ranked[0]] = "poorest";
      roleOf[ranked[1]] = "middle";
      roleOf[ranked[2]] = "richest";
    } else if (ranked.length === 2) {
      roleOf[ranked[0]] = "poorest";
      roleOf[ranked[1]] = "richest";
    } else if (ranked.length === 1) {
      roleOf[ranked[0]] = "poorest";
    }

    // Collect simultaneous contributions.
    const contributions: Record<AgentId, number> = { A: 0, B: 0, C: 0 };
    const shortfall = threshold - cumulative;
    const totalAliveWealth = alive.reduce(
      (s, a) => s + remaining[a],
      0,
    );
    for (const agent of alive) {
      const c = chooseContribution(
        regime,
        roleOf[agent],
        remaining[agent],
        shortfall,
        t,
        alive.length,
        rand,
        totalAliveWealth,
      );
      contributions[agent] = c;
      remaining[agent] -= c;
      cumulative += c;
    }

    const thresholdMet = cumulative >= threshold;

    // Resolve consequences if threshold not met.
    let eliminated: AgentId | undefined;
    let eliminationCause: RoundLog["eliminationCause"];

    if (!thresholdMet) {
      if (regime === "AON" && t < MAX_ROUNDS) {
        // No intermediate eliminations.
      } else if (regime === "AON" && t === MAX_ROUNDS) {
        // All remaining agents eliminated.
        for (const a of alive) fatalities.push(a);
        rounds.push({
          round: t,
          contributions,
          cumulative,
          thresholdMet: false,
          eliminationCause: "AON",
        });
        alive = [];
        break;
      } else if (regime === "RE") {
        const idx = Math.floor(rand() * alive.length);
        eliminated = alive[idx];
        eliminationCause = "RE";
      } else if (regime === "DV") {
        // Each agent votes for the lowest contributor; ties broken
        // toward poorest, then random.
        const minContrib = Math.min(...alive.map((a) => contributions[a]));
        const targets = alive.filter((a) => contributions[a] === minContrib);
        eliminated =
          targets.length === 1
            ? targets[0]
            : targets.sort(
                (a, b) => remaining[a] - remaining[b],
              )[0];
        eliminationCause = "DV";
      } else if (regime === "RP") {
        // Poorest by remaining wealth after this round's contributions.
        const sorted = [...alive].sort(
          (a, b) => remaining[a] - remaining[b],
        );
        eliminated = sorted[0];
        eliminationCause = "RP";
      } else if (regime === "PP") {
        // Richest by remaining wealth after this round's contributions.
        const sorted = [...alive].sort(
          (a, b) => remaining[b] - remaining[a],
        );
        eliminated = sorted[0];
        eliminationCause = "PP";
      }
    }

    rounds.push({
      round: t,
      contributions,
      cumulative,
      thresholdMet,
      eliminated,
      eliminationCause,
    });

    if (eliminated) {
      fatalities.push(eliminated);
      alive = alive.filter((a) => a !== eliminated);
    }

    if (thresholdMet) break;
  }

  // If the loop ended without threshold met, and regime wasn't AON-final,
  // surviving agents are alive but the fund failed.
  const fundMet = cumulative >= threshold;

  return {
    regime,
    wealth,
    threshold,
    rounds,
    fundMet,
    fatalities,
    finalWealth: remaining,
  };
}

// ─── Replication runner for the comparison table ───────────────────────────

type RegimeStats = {
  regime: Regime;
  fatalityRate: number;
  fundFailureRate: number;
  meanRound1Pct: number; // fraction of threshold met by end of round 1
  meanFinalRoundPct: number; // fraction met in final round (delay surge)
};

function runReplications(
  wealth: Record<AgentId, number>,
  threshold: number,
  baseSeed: number,
  reps: number,
): RegimeStats[] {
  return REGIMES.map(({ id }) => {
    let totalFatalities = 0;
    let fundFailures = 0;
    let round1PctSum = 0;
    let finalRoundPctSum = 0;
    for (let r = 0; r < reps; r++) {
      const g = simulateGame(id, wealth, threshold, baseSeed + r * 977);
      totalFatalities += g.fatalities.length;
      if (!g.fundMet) fundFailures++;
      // Round 1 cumulative as fraction of threshold.
      const r1 =
        g.rounds[0]?.cumulative !== undefined
          ? Math.min(threshold, g.rounds[0].cumulative) / threshold
          : 0;
      round1PctSum += r1;
      // Final-round contribution surge: fraction met in the last round
      // that had contributions.
      const last = g.rounds[g.rounds.length - 1];
      const prev = g.rounds[g.rounds.length - 2];
      const lastSurge = last
        ? Math.min(
            1,
            Math.max(
              0,
              (last.cumulative - (prev?.cumulative ?? 0)) / threshold,
            ),
          )
        : 0;
      finalRoundPctSum += lastSurge;
    }
    return {
      regime: id,
      fatalityRate: totalFatalities / (reps * 3),
      fundFailureRate: fundFailures / reps,
      meanRound1Pct: round1PctSum / reps,
      meanFinalRoundPct: finalRoundPctSum / reps,
    };
  });
}

// ─── UI helpers ────────────────────────────────────────────────────────────

const REGIME_COLOR: Record<Regime, string> = {
  AON: "#ff6b6b",
  RE: "#ffa94d",
  DV: "#ffd166",
  RP: "#7b61ff",
  PP: "#00d4ff",
};

function BarRow({
  label,
  value,
  color,
  max = 1,
}: {
  label: string;
  value: number;
  color: string;
  max?: number;
}) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
          {label}
        </span>
        <span className="font-mono text-xs text-foreground">
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────

export default function NoSafeDefaultSimulator() {
  // Wealth controls: wA ≤ wB ≤ wC, summing to 12.
  // Defaults to (2, 4, 6) — moderate inequality.
  const [wA, setWA] = useState(2);
  const [wB, setWB] = useState(4);
  const wC = TOTAL_WEALTH - wA - wB;
  const [threshold, setThreshold] = useState(8);
  const [activeRegime, setActiveRegime] = useState<Regime>("PP");
  const [seed, setSeed] = useState(1729);

  // Clamp wealth to satisfy wA ≤ wB ≤ wC ≥ 0.
  const valid = wA >= 0 && wB >= wA && wC >= wB && wC <= TOTAL_WEALTH;

  // Single-game (active regime, focus run)
  const focusGame = useMemo(
    () =>
      simulateGame(activeRegime, { A: wA, B: wB, C: wC }, threshold, seed),
    [activeRegime, wA, wB, wC, threshold, seed],
  );

  // Comparison: run all 5 regimes with replications at this (wealth, T).
  const REPS = 40;
  const stats = useMemo(
    () => runReplications({ A: wA, B: wB, C: wC }, threshold, seed, REPS),
    [wA, wB, wC, threshold, seed],
  );

  const reroll = () => setSeed((s) => (s * 1664525 + 1013904223) >>> 0 || 1);

  const interp = interpretation(stats, threshold, { A: wA, B: wB, C: wC });

  return (
    <div className="mx-auto max-w-6xl px-6 pb-10">
      {/* Controls */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Game setup
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
          {/* Wealth */}
          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-3">
              Wealth split (sum = {TOTAL_WEALTH})
            </p>
            <div className="space-y-3">
              <label className="block">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm text-foreground">
                    A (poorest){" "}
                    <span className="font-mono text-text-tertiary">
                      w_A
                    </span>
                  </span>
                  <span className="font-mono text-xs text-accent">{wA}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={6}
                  value={wA}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWA(v);
                    if (wB < v) setWB(v);
                  }}
                  className="w-full accent-accent"
                />
              </label>
              <label className="block">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm text-foreground">
                    B (middle){" "}
                    <span className="font-mono text-text-tertiary">
                      w_B
                    </span>
                  </span>
                  <span className="font-mono text-xs text-accent">{wB}</span>
                </div>
                <input
                  type="range"
                  min={wA}
                  max={Math.floor((TOTAL_WEALTH - wA) / 2) + 1}
                  value={wB}
                  onChange={(e) => setWB(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </label>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-foreground">
                  C (richest){" "}
                  <span className="font-mono text-text-tertiary">w_C</span>
                </span>
                <span className="font-mono text-xs text-accent">
                  {valid ? wC : "—"}
                </span>
              </div>
              {!valid && (
                <p className="text-xs text-[#ff6b6b]">
                  Invalid split: requires w_A ≤ w_B ≤ w_C.
                </p>
              )}
            </div>
          </div>

          {/* Threshold + seed */}
          <div className="rounded-xl border border-border bg-surface/50 p-4 flex flex-col gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-2">
                Crisis threshold T
              </p>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm text-foreground">
                  Fund needs to reach
                </span>
                <span className="font-mono text-xs text-accent">
                  T = {threshold} / {TOTAL_WEALTH}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={TOTAL_WEALTH}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <p className="mt-1 text-xs text-text-tertiary leading-snug">
                T = 12 forces universal full contribution. Lower thresholds
                allow strategic withholding.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                Replications per regime
              </span>
              <span className="font-mono text-xs text-text-secondary">
                {REPS} ×
              </span>
            </div>
            <button
              onClick={reroll}
              className="self-start font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:text-accent/80 transition-colors"
            >
              Re-run ↻ seed {seed.toString(16).slice(0, 6)}
            </button>
          </div>
        </div>
      </section>

      {/* Regime comparison */}
      <section className="rounded-xl border border-border bg-surface/50 p-6 mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Regime comparison · {REPS} runs each at w = ({wA},{wB},{wC}), T ={" "}
            {threshold}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stats.map((s) => {
            const meta = REGIMES.find((r) => r.id === s.regime)!;
            const active = activeRegime === s.regime;
            return (
              <button
                key={s.regime}
                onClick={() => setActiveRegime(s.regime)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  active
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-border bg-background/40 hover:bg-surface-hover hover:border-accent/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: REGIME_COLOR[s.regime] }}
                  >
                    {s.regime}
                  </span>
                  {active && (
                    <span className="font-mono text-[10px] text-accent">
                      ● focus
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-3 leading-snug">
                  {meta.label}
                </h3>
                <div className="space-y-2.5">
                  <BarRow
                    label="Fatality"
                    value={s.fatalityRate}
                    color="#ff6b6b"
                  />
                  <BarRow
                    label="Fund failure"
                    value={s.fundFailureRate}
                    color="#ffa94d"
                  />
                  <BarRow
                    label="Round-1 cooperation"
                    value={s.meanRound1Pct}
                    color={REGIME_COLOR[s.regime]}
                  />
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-text-tertiary leading-snug">
          Fatality = fraction of agents eliminated, averaged across runs.
          Fund failure = fraction of runs where contributions fell short of
          T. Round-1 cooperation = fraction of T met in Round 1 (high
          values → front-loaded; low values → strategic delay).
        </p>
      </section>

      {/* Focus run: a single game under the active regime */}
      <section className="rounded-xl border border-border bg-surface/50 p-6 mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            One game under{" "}
            <span style={{ color: REGIME_COLOR[activeRegime] }}>
              {REGIMES.find((r) => r.id === activeRegime)!.label}
            </span>
          </span>
        </div>
        <p className="text-sm text-text-secondary mb-4 max-w-3xl leading-relaxed">
          {REGIMES.find((r) => r.id === activeRegime)!.description}
        </p>
        <FocusGameView game={focusGame} />
      </section>

      {/* Interpretation */}
      <section className="rounded-xl border border-accent/20 bg-accent/[0.04] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
          What this shows
        </p>
        <p className="text-lg text-foreground leading-relaxed">{interp}</p>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          Every regime has a death-trap configuration. The same agents,
          changed only by the consequence rule, cooperate or collapse. Agent
          alignment is not enough — accountability design is part of AI
          alignment.
        </p>
      </section>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function FocusGameView({ game }: { game: GameResult }) {
  return (
    <div>
      {/* Pre-round wealth */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {(["A", "B", "C"] as AgentId[]).map((a) => {
          const eliminated = game.fatalities.includes(a);
          return (
            <div
              key={a}
              className={`rounded-lg border p-3 ${
                eliminated
                  ? "border-[#ff6b6b]/40 bg-[#ff6b6b]/[0.05]"
                  : "border-border bg-background/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm text-foreground">
                  {a}
                </span>
                {eliminated && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#ff6b6b]">
                    eliminated
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                start w = {game.wealth[a]} · end w ={" "}
                {game.finalWealth[a]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Rounds */}
      <div className="space-y-2 mb-4">
        {game.rounds.map((r) => (
          <div
            key={r.round}
            className={`rounded-lg border p-3 ${
              r.thresholdMet
                ? "border-accent/30 bg-accent/[0.04]"
                : "border-border bg-background/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                Round {r.round}
                {r.thresholdMet && (
                  <span className="ml-2 text-accent">
                    · threshold met
                  </span>
                )}
                {r.eliminated && (
                  <span className="ml-2 text-[#ff6b6b]">
                    · {r.eliminated} eliminated ({eliminationLabel(r.eliminationCause!)})
                  </span>
                )}
                {!r.eliminated &&
                  !r.thresholdMet &&
                  r.eliminationCause === "AON" && (
                    <span className="ml-2 text-[#ff6b6b]">
                      · all remaining agents eliminated (AON final)
                    </span>
                  )}
              </p>
              <p className="font-mono text-[11px] text-text-secondary">
                cumulative {r.cumulative} / {game.threshold}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["A", "B", "C"] as AgentId[]).map((a) => (
                <div
                  key={a}
                  className="flex items-center justify-between rounded border border-border/60 bg-surface/40 px-2 py-1.5"
                >
                  <span className="font-mono text-xs text-text-secondary">
                    {a}
                  </span>
                  <span className="font-mono text-xs text-foreground">
                    +{r.contributions[a]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Outcome summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-surface/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
            Outcome
          </p>
          <p
            className={`text-sm font-semibold ${
              game.fundMet ? "text-accent" : "text-[#ff6b6b]"
            }`}
          >
            {game.fundMet ? "Fund met" : "Fund failed"}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
            Fatalities
          </p>
          <p className="text-sm font-semibold text-foreground">
            {game.fatalities.length} / 3
            {game.fatalities.length > 0 && (
              <span className="ml-2 text-[#ff6b6b]">
                ({game.fatalities.join(", ")})
              </span>
            )}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
            Survivors&rsquo; wealth Σ
          </p>
          <p className="text-sm font-semibold text-foreground">
            {(["A", "B", "C"] as AgentId[])
              .filter((a) => !game.fatalities.includes(a))
              .reduce((s, a) => s + game.finalWealth[a], 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

function eliminationLabel(cause: NonNullable<RoundLog["eliminationCause"]>) {
  switch (cause) {
    case "RE":
      return "random";
    case "DV":
      return "vote";
    case "RP":
      return "poorest dies";
    case "PP":
      return "richest dies";
    case "AON":
      return "AON final";
  }
}

function interpretation(
  stats: RegimeStats[],
  threshold: number,
  wealth: Record<AgentId, number>,
): string {
  const byFatality = [...stats].sort((a, b) => a.fatalityRate - b.fatalityRate);
  const safest = byFatality[0];
  const deadliest = byFatality[byFatality.length - 1];
  const safestLabel = REGIMES.find((r) => r.id === safest.regime)!.label;
  const deadliestLabel = REGIMES.find((r) => r.id === deadliest.regime)!.label;
  const fatGap = (deadliest.fatalityRate - safest.fatalityRate) * 100;

  const isLowT = threshold <= 4;
  const isMidT = threshold > 4 && threshold < 10;
  const isExtremeT = threshold === TOTAL_WEALTH;
  const isHighIneq = wealth.C - wealth.A >= 6;

  if (isExtremeT) {
    const rp = stats.find((s) => s.regime === "RP")!;
    return `At T = ${threshold}, the crisis demands universal full contribution. Under AON, RE, and PP the group converges to immediate cooperation (fatality near zero). But under Regressive Punishment, fatality stays at ${(rp.fatalityRate * 100).toFixed(0)}% — wealthier agents still withhold, exploiting the poorest agent's desperation. This is RP's unique brittleness: it can fail even when no rational alternative exists.`;
  }

  if (isHighIneq && isMidT) {
    return `High inequality (w = ${wealth.A},${wealth.B},${wealth.C}), moderate stakes. ${safestLabel} produces the lowest fatality (${(safest.fatalityRate * 100).toFixed(0)}%), while ${deadliestLabel} reaches ${(deadliest.fatalityRate * 100).toFixed(0)}% — a ${fatGap.toFixed(0)}-point gap from a single rule change. The same agents, the same wealth, the same threshold; different consequence design produces different survivors.`;
  }

  if (isLowT) {
    return `Low stakes (T = ${threshold}). Most regimes succeed but with different cost distributions. ${safestLabel} produces the lowest fatality (${(safest.fatalityRate * 100).toFixed(0)}%); regressive regimes already display their exploitative pattern even at moderate thresholds.`;
  }

  return `${safestLabel} is the safest regime in this configuration (${(safest.fatalityRate * 100).toFixed(0)}% fatality); ${deadliestLabel} is the deadliest (${(deadliest.fatalityRate * 100).toFixed(0)}%). The ${fatGap.toFixed(0)}-point gap is institutional, not capability-driven — the agents are identical.`;
}
