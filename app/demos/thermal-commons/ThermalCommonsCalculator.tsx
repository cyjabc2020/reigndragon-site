"use client";

import { useMemo, useState } from "react";
import {
  CITIES,
  COOLING,
  DC_PRESETS,
  DEFAULT_PRICES,
  POOLS,
  balance,
  economics,
  poolDegreeDays,
  type Balance,
} from "./model";

// ─── Small helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
const fmtMw = (mw: number) => (mw >= 10 ? `${fmt(mw)} MW` : `${fmt(mw, mw < 1 ? 2 : 1)} MW`);
const usd = (n: number) => (n >= 1e6 ? `$${fmt(n / 1e6, 2)}M` : n >= 1e4 ? `$${fmt(n / 1e3)}k` : `$${fmt(n)}`);

// Log-scale slider for data-center size: 0.1 MW .. 200 MW
const MW_MIN = 0.1;
const MW_MAX = 200;
const sliderToMw = (s: number) => MW_MIN * Math.pow(MW_MAX / MW_MIN, s / 100);
const mwToSlider = (mw: number) => (100 * Math.log(mw / MW_MIN)) / Math.log(MW_MAX / MW_MIN);

function Section({ label, children, right }: { label: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">{label}</p>
        {right}
      </div>
      {children}
    </div>
  );
}

function Choice({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub?: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-lg border px-3 py-2.5 transition-all ${
        active ? "border-accent/50 bg-accent/[0.08]" : "border-border bg-background hover:border-accent/30 hover:bg-surface-hover"
      }`}
    >
      <p className={`text-sm font-medium leading-snug ${active ? "text-accent" : "text-foreground"}`}>{title}</p>
      {sub && <p className="mt-0.5 text-[11px] text-text-tertiary leading-snug">{sub}</p>}
    </button>
  );
}

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1.5">{label}</p>
      <p className={`text-2xl font-semibold tracking-tight ${accent ? "text-accent" : "text-foreground"}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-text-secondary leading-snug">{sub}</p>}
    </div>
  );
}

// ─── Chart ─────────────────────────────────────────────────────────────────────────
const UNMET = "rgba(255, 140, 90, 0.85)";
const MET = "rgba(0, 212, 255, 0.85)";
const SUPPLY = "rgba(224, 224, 232, 0.9)";
const UNIT = "rgba(255, 220, 120, 0.9)";

function BalanceChart({ b, nPools }: { b: Balance; nPools: number }) {
  const width = 760;
  const height = 360;
  const pad = { l: 56, r: nPools > 1 ? 56 : 24, t: 20, b: 36 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const band = plotW / 12;
  const maxLeft = Math.max(...b.rows.map((r) => Math.max(r.demandMwh, r.supplyMwh)), 1) * 1.08;
  const maxUnit = Math.max(...b.rows.map((r) => r.unitMwh), 1) * 1.08;
  const yL = (v: number) => pad.t + plotH - (v / maxLeft) * plotH;
  const yR = (v: number) => pad.t + plotH - (v / maxUnit) * plotH;
  const ticks = (max: number) => {
    const step = Math.pow(10, Math.floor(Math.log10(max))) * (max / Math.pow(10, Math.floor(Math.log10(max))) > 5 ? 2 : max / Math.pow(10, Math.floor(Math.log10(max))) > 2 ? 1 : 0.5);
    const out: number[] = [];
    for (let v = 0; v <= max; v += step) out.push(v);
    return out;
  };
  const supplyY = yL(b.rows[0].supplyMwh);
  const unitPath = b.rows.map((r, i) => `${i === 0 ? "M" : "L"}${pad.l + band * (i + 0.5)} ${yR(r.unitMwh)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Monthly pool heat demand against data-center heat supply">
      {/* gridlines + left axis */}
      {ticks(maxLeft).map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={width - pad.r} y1={yL(v)} y2={yL(v)} stroke="rgba(255,255,255,0.06)" />
          <text x={pad.l - 8} y={yL(v) + 3} textAnchor="end" fontSize={10} fontFamily="var(--font-mono), monospace" fill="var(--text-tertiary)">
            {fmt(v)}
          </text>
        </g>
      ))}
      <text x={4} y={pad.t - 8} textAnchor="start" fontSize={9} fontFamily="var(--font-mono), monospace" fill="var(--text-tertiary)">
        MWh / month
      </text>
      {/* bars */}
      {b.rows.map((r, i) => {
        const x = pad.l + band * i + band * 0.2;
        const w = band * 0.6;
        const yMet = yL(r.usedMwh);
        const yTop = yL(r.demandMwh);
        return (
          <g key={r.month}>
            <rect x={x} y={yMet} width={w} height={pad.t + plotH - yMet} fill={MET} rx={2}>
              <title>{`${r.month}: ${fmt(r.usedMwh)} MWh met by the data center`}</title>
            </rect>
            {r.unmetMwh > 0.5 && (
              <rect x={x} y={yTop} width={w} height={yMet - yTop} fill={UNMET} rx={2}>
                <title>{`${r.month}: ${fmt(r.unmetMwh)} MWh unmet (needs backup heater)`}</title>
              </rect>
            )}
            <text x={x + w / 2} y={height - pad.b + 16} textAnchor="middle" fontSize={10} fontFamily="var(--font-mono), monospace" fill="var(--text-tertiary)">
              {r.month}
            </text>
          </g>
        );
      })}
      {/* supply line */}
      <line x1={pad.l} x2={width - pad.r} y1={supplyY} y2={supplyY} stroke={SUPPLY} strokeWidth={1.5} strokeDasharray="6 4" />
      <text x={width - pad.r - 4} y={supplyY - 6} textAnchor="end" fontSize={10} fontFamily="var(--font-mono), monospace" fill="var(--foreground)">
        recoverable DC heat {fmt(b.rows[0].supplyMwh)} MWh/mo
      </text>
      {/* unit pool curve on the right axis */}
      {nPools > 1 && (
        <g>
          <path d={unitPath} fill="none" stroke={UNIT} strokeWidth={1.5} />
          {b.rows.map((r, i) => (
            <circle key={r.month} cx={pad.l + band * (i + 0.5)} cy={yR(r.unitMwh)} r={2.5} fill={UNIT}>
              <title>{`${r.month}: one pool needs ${fmt(r.unitMwh, 1)} MWh`}</title>
            </circle>
          ))}
          {ticks(maxUnit).map((v) => (
            <text key={v} x={width - pad.r + 8} y={yR(v) + 3} fontSize={10} fontFamily="var(--font-mono), monospace" fill={UNIT} opacity={0.8}>
              {fmt(v)}
            </text>
          ))}
          <text x={width - pad.r + 8} y={pad.t - 8} fontSize={9} fontFamily="var(--font-mono), monospace" fill={UNIT} opacity={0.8}>
            one pool
          </text>
        </g>
      )}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────────
export default function ThermalCommonsCalculator() {
  const [cityId, setCityId] = useState("boston");
  const [dcMw, setDcMw] = useState(2);
  const [coolingId, setCoolingId] = useState("d2c");
  const [poolId, setPoolId] = useState("olympic");
  const [nPools, setNPools] = useState(1);
  const [indoor, setIndoor] = useState(false);
  const [cover, setCover] = useState(true);
  const [tempF, setTempF] = useState(80);
  const [highCase, setHighCase] = useState(false);
  const [prices, setPrices] = useState(DEFAULT_PRICES);

  const city = CITIES.find((c) => c.id === cityId)!;
  const cooling = COOLING.find((c) => c.id === coolingId)!;
  const pool = POOLS.find((p) => p.id === poolId)!;

  const b = useMemo(
    () => balance(city, pool, nPools, dcMw, cooling, { poolTempC: ((tempF - 32) * 5) / 9, indoor, coverIdle: cover, idleAF: highCase ? 1.0 : 0.5 }),
    [city, pool, nPools, dcMw, cooling, tempF, indoor, cover, highCase],
  );
  const econ = economics(b.usedMwh, prices);
  const poolTempC = ((tempF - 32) * 5) / 9;
  const directUse = cooling.supplyC[0] >= poolTempC + 3;
  const pdd = poolDegreeDays(city);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section label="1 · Climate">
          <div className="grid grid-cols-2 gap-2">
            {CITIES.map((c) => (
              <Choice key={c.id} active={c.id === cityId} onClick={() => setCityId(c.id)} title={c.label} sub={`Zone ${c.zone} · HDD65 ${fmt(c.hdd65)}`} />
            ))}
          </div>
          <p className="mt-3 text-xs text-text-tertiary leading-snug">
            Pool degree days (base 80 °F): {fmt(pdd)} °F·day. Climate from the NCEI Typical Meteorological Year, {city.station}. Two cities for now; more are a data file away.
          </p>
        </Section>

        <Section label="2 · Data center" right={<span className="font-mono text-xs text-accent">{fmtMw(dcMw)} IT load</span>}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {DC_PRESETS.map((p) => (
              <Choice key={p.mw} active={Math.abs(p.mw - dcMw) < 1e-6} onClick={() => setDcMw(p.mw)} title={p.label} />
            ))}
          </div>
          <input type="range" min={0} max={100} step={0.5} value={mwToSlider(dcMw)} onChange={(e) => setDcMw(Number(sliderToMw(Number(e.target.value)).toPrecision(2)))} className="w-full accent-accent" />
          <p className="mt-1 text-xs text-text-tertiary leading-snug">IT load, 0.1 to 200 MW (log scale). Every MW rejects about 8,760 MWh of heat a year, flat across the seasons.</p>
        </Section>

        <Section label="3 · Cooling type">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COOLING.map((c) => (
              <Choice key={c.id} active={c.id === coolingId} onClick={() => setCoolingId(c.id)} title={c.label} sub={`${c.supplyC[0]} to ${c.supplyC[1]} °C · ${Math.round(c.frac * 100)} % of IT heat to water`} />
            ))}
          </div>
        </Section>

        <Section label="4 · Pool">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {POOLS.map((p) => (
              <Choice key={p.id} active={p.id === poolId} onClick={() => setPoolId(p.id)} title={p.label} sub={p.dims} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setIndoor(!indoor)} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${indoor ? "border-accent/50 bg-accent/[0.08] text-accent" : "border-border text-text-secondary hover:border-accent/30"}`}>
              {indoor ? "Indoor" : "Outdoor"}
            </button>
            <button onClick={() => setCover(!cover)} disabled={indoor} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all disabled:opacity-40 ${cover ? "border-accent/50 bg-accent/[0.08] text-accent" : "border-border text-text-secondary hover:border-accent/30"}`}>
              {cover ? "Cover when idle" : "No cover"}
            </button>
            <select value={tempF} onChange={(e) => setTempF(Number(e.target.value))} className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground">
              {[78, 80, 82, 84].map((t) => (
                <option key={t} value={t}>
                  {t} °F water
                </option>
              ))}
            </select>
          </div>
        </Section>

        <Section
          label="5 · Number of pools"
          right={
            <button onClick={() => setNPools(Math.max(1, Math.min(500, b.poolsAtPeak === Infinity ? 1 : b.poolsAtPeak)))} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:text-accent/80 transition-colors">
              Fill the data center →
            </button>
          }
        >
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground">{nPools === 1 ? "1 pool" : `${nPools} identical pools`}</span>
            <span className="font-mono text-xs text-text-secondary">
              {b.poolsAtPeak === Infinity ? "no winter load here" : `this data center carries ${fmt(b.poolsAtPeak)} in January`}
            </span>
          </div>
          <input type="range" min={1} max={500} step={1} value={nPools} onChange={(e) => setNPools(Number(e.target.value))} className="w-full accent-accent" />
          <p className="mt-1 text-xs text-text-tertiary leading-snug">The chart shows the total for all pools as bars and a single pool as the thin line on the right axis.</p>
        </Section>

        <Section label="Assumptions">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <label className="flex items-center justify-between gap-2">
              <span className="text-text-secondary">Gas $/therm</span>
              <input type="number" step={0.05} value={prices.gasPerTherm} onChange={(e) => setPrices({ ...prices, gasPerTherm: Number(e.target.value) })} className="w-20 rounded border border-border bg-background px-2 py-1 text-right font-mono text-foreground" />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-text-secondary">Electricity $/kWh</span>
              <input type="number" step={0.01} value={prices.elecPerKwh} onChange={(e) => setPrices({ ...prices, elecPerKwh: Number(e.target.value) })} className="w-20 rounded border border-border bg-background px-2 py-1 text-right font-mono text-foreground" />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-text-secondary">Heat pump seasonal COP</span>
              <input type="number" step={0.5} value={prices.hpCop} onChange={(e) => setPrices({ ...prices, hpCop: Number(e.target.value) })} className="w-20 rounded border border-border bg-background px-2 py-1 text-right font-mono text-foreground" />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-text-secondary">Loss convention</span>
              <button onClick={() => setHighCase(!highCase)} className="rounded border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent hover:border-accent/30">
                {highCase ? "high (DOE)" : "low (ASHRAE)"}
              </button>
            </label>
          </div>
        </Section>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-surface/50 p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            Year-round heat balance · {city.label}
          </h2>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: MET }} />met by DC</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: UNMET }} />unmet</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-px w-4 border-t border-dashed" style={{ borderColor: SUPPLY }} />DC supply</span>
            {nPools > 1 && <span className="flex items-center gap-1.5"><span className="inline-block h-px w-4" style={{ background: UNIT }} />one pool</span>}
          </div>
        </div>
        <BalanceChart b={b} nPools={nPools} />
        <p className="mt-2 text-xs text-text-tertiary leading-snug">
          {nPools} × {pool.label.toLowerCase()} pool{nPools > 1 ? "s" : ""} at {tempF} °F, {indoor ? "indoor" : cover ? "outdoor, covered when idle" : "outdoor, never covered"}, open all year. Months with no bar need no heat: the pool gains more from sun and air than it loses.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="Pool heat demand" value={`${fmt(b.annualDemandMwh)} MWh/yr`} sub={nPools > 1 ? `${fmt(b.annualUnitMwh)} MWh per pool · ${fmt((b.annualUnitMwh * 1000) / pool.areaM2)} kWh/m²` : `${fmt((b.annualUnitMwh * 1000) / pool.areaM2)} kWh per m² of surface`} />
        <Kpi label="Demand met by DC heat" value={`${fmt(b.demandMet * 100)} %`} sub={b.demandMet < 1 ? `${fmt(b.annualDemandMwh - b.usedMwh)} MWh/yr still needs a backup heater` : "Covered in every month"} accent />
        <Kpi label="Share of DC heat absorbed" value={`${fmt(b.dcShareUsed * 100, b.dcShareUsed < 0.1 ? 1 : 0)} %`} sub={`of ${fmt(b.annualSupplyMwh)} MWh/yr recoverable`} />
        <Kpi label="Peak load, one pool" value={`${fmt(b.peakUnitKw)} kW`} sub="January monthly average; sizes the heat exchanger" />
      </div>

      {/* Economics + temperature ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
        <Section label="What the pool owner saves (heat actually delivered)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Kpi label="vs gas heater" value={`${usd(econ.gasUsd)}/yr`} sub={`${Math.round(prices.gasEff * 100)} % efficiency at $${prices.gasPerTherm.toFixed(2)}/therm`} accent />
            <Kpi label="vs heat pump" value={`${usd(econ.hpUsd)}/yr`} sub={`${fmt(econ.hpMwhE)} MWh electricity at COP ${prices.hpCop}`} />
            <Kpi label="CO₂ avoided vs gas" value={`${fmt(econ.tCo2)} t/yr`} sub="EPA factor 53 kg per MMBtu" />
            <Kpi label="Value of the heat" value={`$${(econ.gasUsd / Math.max(b.usedMwh * 1000, 1)).toFixed(3)}/kWh`} sub="ceiling an offtaker could pay before connection costs" />
          </div>
        </Section>
        <Section label="Temperature match">
          <TemperatureLadder supply={cooling.supplyC} poolC={poolTempC} />
          <p className="mt-3 text-xs leading-snug">
            {directUse ? (
              <span className="text-accent">Direct use: supply water is above the pool by at least 3 K, so a plate heat exchanger moves the heat with no heat pump.</span>
            ) : (
              <span className="text-[rgba(255,140,90,0.95)]">Supply is too close to pool temperature for a plain heat exchanger; a small heat pump or a warmer loop would be needed.</span>
            )}
          </p>
          <p className="mt-2 text-xs text-text-tertiary leading-snug">{cooling.blurb}</p>
        </Section>
      </div>
    </div>
  );
}

function TemperatureLadder({ supply, poolC }: { supply: [number, number]; poolC: number }) {
  const lo = 15;
  const hi = 70;
  const x = (t: number) => ((t - lo) / (hi - lo)) * 100;
  return (
    <div className="relative mt-2 h-14">
      <div className="absolute left-0 right-0 top-6 h-2 rounded-full bg-border" />
      <div className="absolute top-6 h-2 rounded-full bg-accent/60" style={{ left: `${x(supply[0])}%`, width: `${x(supply[1]) - x(supply[0])}%` }} />
      <div className="absolute top-4 h-6 w-0.5 bg-[rgba(255,220,120,0.95)]" style={{ left: `${x(poolC)}%` }} />
      <span className="absolute top-0 font-mono text-[10px] text-text-secondary" style={{ left: `${x(supply[0])}%` }}>
        DC water {supply[0]} to {supply[1]} °C
      </span>
      <span className="absolute top-10 -translate-x-1/2 font-mono text-[10px] text-[rgba(255,220,120,0.95)]" style={{ left: `${x(poolC)}%` }}>
        pool {poolC.toFixed(0)} °C
      </span>
      <span className="absolute top-10 right-0 font-mono text-[10px] text-text-tertiary">{hi} °C</span>
      <span className="absolute top-10 left-0 font-mono text-[10px] text-text-tertiary">{lo} °C</span>
    </div>
  );
}
