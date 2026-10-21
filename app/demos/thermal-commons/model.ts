// Thermal Commons pool module: screening-level heat balance between a swimming
// pool (or N pools) and a data center's recoverable waste heat.
//
// Pool side follows the ENERGY STAR Pool Technical Reference (ASHRAE HVAC
// Applications equations): evaporation, convection, radiation, plus a small
// conduction term and solar gain added here. Monthly climate normals, so the
// numbers are screening level (treat as ±30 %). Same equations as the Python
// model pool_dc_balance.py in the Thermal Commons project.

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const BTU_H_FT2_TO_W_M2 = 3.1546;
const INHG_TO_PA = 3386.39;

// ─── Climate (approximate NOAA 1991–2020 normals; replace with NCEI station data) ─────
export type City = {
  id: string;
  label: string;
  tempF: number[]; // monthly mean dry-bulb, °F
  rh: number[]; // monthly mean relative humidity, %
  windMph: number; // annual mean wind at 10 m, mph
  ghi: number[]; // global horizontal irradiance, kWh/m²/day
  hdd65: number;
  cdd65: number;
  zone: string; // ASHRAE / IECC climate zone
};

export const CITIES: City[] = [
  {
    id: "boston",
    label: "Boston, MA",
    zone: "5A (cold, humid)",
    tempF: [31.6, 33.4, 40.1, 49.9, 59.9, 69.3, 75.4, 74.3, 67.2, 56.0, 46.1, 37.1],
    rh: [62, 62, 63, 64, 67, 69, 69, 71, 72, 69, 67, 65],
    windMph: 12.5,
    ghi: [1.9, 2.8, 3.8, 4.7, 5.5, 5.9, 5.9, 5.3, 4.3, 3.0, 1.9, 1.6],
    hdd65: 5630,
    cdd65: 777,
  },
  {
    id: "phoenix",
    label: "Phoenix, AZ",
    zone: "2B (hot, dry)",
    tempF: [56.5, 59.4, 65.7, 72.4, 81.4, 90.5, 94.8, 93.5, 88.0, 76.5, 64.5, 56.0],
    rh: [46, 41, 36, 27, 22, 19, 30, 35, 34, 34, 40, 48],
    windMph: 6.2,
    ghi: [3.3, 4.3, 5.5, 6.9, 7.6, 7.8, 7.0, 6.6, 5.9, 4.7, 3.6, 3.0],
    hdd65: 1040,
    cdd65: 4556,
  },
];

// ─── Pool archetypes ───────────────────────────────────────────────────────────────
export type Pool = {
  id: string;
  label: string;
  dims: string;
  areaM2: number;
  depthM: number;
  af: number; // ASHRAE activity factor during use hours
  useHours: number; // hours per day the pool is uncovered and in use
};

export const POOLS: Pool[] = [
  { id: "residential", label: "Residential", dims: "16 × 32 ft (512 ft²)", areaM2: 47.6, depthM: 1.5, af: 0.5, useHours: 4 },
  { id: "community", label: "Community / HOA", dims: "20 × 40 ft (800 ft²)", areaM2: 74.3, depthM: 1.5, af: 0.65, useHours: 8 },
  { id: "recreational", label: "Recreational", dims: "20 × 15 yd (2,700 ft²)", areaM2: 250.8, depthM: 1.5, af: 1.0, useHours: 10 },
  { id: "shortcourse", label: "Short-course", dims: "25 × 20 yd (4,500 ft²)", areaM2: 418.1, depthM: 1.8, af: 1.0, useHours: 12 },
  { id: "olympic", label: "Olympic", dims: "50 × 25 m (13,456 ft²)", areaM2: 1250, depthM: 2.0, af: 1.0, useHours: 12 },
];

// ─── Data center cooling types ─────────────────────────────────────────────────────
export type Cooling = {
  id: string;
  label: string;
  supplyC: [number, number]; // temperature available to an offtaker, °C
  frac: number; // share of IT heat that reaches a water loop
  blurb: string;
};

export const COOLING: Cooling[] = [
  { id: "air", label: "Air-cooled (chiller condenser loop)", supplyC: [30, 35], frac: 0.85, blurb: "Today's majority. Heat leaves in condenser water near 30 °C: too cool for radiators, fine for a pool." },
  { id: "reardoor", label: "Rear-door heat exchangers", supplyC: [38, 42], frac: 0.8, blurb: "Water-cooled doors on standard racks. Around 40 °C." },
  { id: "d2c", label: "Direct-to-chip liquid", supplyC: [45, 60], frac: 0.75, blurb: "Cold plates on CPUs and GPUs. 45 to 60 °C; a quarter of the heat still goes to air." },
  { id: "immersion", label: "Immersion", supplyC: [50, 65], frac: 0.95, blurb: "Racks submerged in dielectric fluid. Nearly all heat captured at 50 °C or more." },
];

export const DC_PRESETS = [
  { mw: 0.5, label: "Edge 0.5 MW" },
  { mw: 2, label: "Enterprise 2 MW" },
  { mw: 10, label: "Colocation 10 MW" },
  { mw: 50, label: "Hyperscale 50 MW" },
];

// ─── Physics ───────────────────────────────────────────────────────────────────────
function pSatPa(tC: number) {
  return 610.94 * Math.exp((17.625 * tC) / (tC + 243.04));
}

export type LossParts = { evap: number; conv: number; rad: number; cond: number; solar: number; net: number };

export function poolLossWm2(
  twC: number,
  taC: number,
  rh: number,
  vSurfaceMph: number,
  af: number,
  ghiKwhDay: number,
  tGroundC: number,
  covered: boolean,
  indoor: boolean,
): LossParts {
  const twF = (twC * 9) / 5 + 32;
  const taF = (taC * 9) / 5 + 32;
  const pw = pSatPa(twC) / INHG_TO_PA;
  const pa = ((rh / 100) * pSatPa(taC)) / INHG_TO_PA;
  const v = indoor ? 0 : vSurfaceMph;
  let evap = (68.3 + 32 * v) * Math.max(pw - pa, 0) * af * BTU_H_FT2_TO_W_M2;
  let conv = (0.5 + 0.235 * v) * (twF - taF) * BTU_H_FT2_TO_W_M2;
  let rad = indoor ? 0 : 1.0 * (twF - (taF - 5 * 1.8)) * BTU_H_FT2_TO_W_M2;
  let solar = indoor ? 0 : (0.8 * ghiKwhDay * 1000) / 24;
  const cond = 0.6 * 1.6 * (twC - tGroundC);
  if (covered) {
    evap *= 0.05;
    conv *= 0.3;
    rad *= 0.3;
    solar *= 0.8;
  }
  return { evap, conv, rad, cond, solar: -solar, net: evap + conv + rad + cond - solar };
}

export type DemandOptions = {
  poolTempC: number;
  indoor: boolean;
  coverIdle: boolean;
  idleAF: number; // 0.5 = ASHRAE unoccupied convention; 1.0 reproduces DOE cost tables
};

export type MonthDemand = { month: string; mwh: number; wm2: number };

// Monthly heating demand for ONE pool, MWh thermal (clamped at zero when the
// pool gains more than it loses).
export function monthlyDemand(city: City, pool: Pool, o: DemandOptions): MonthDemand[] {
  const tAnnC = ((city.tempF.reduce((s, t) => s + t, 0) / 12 - 32) * 5) / 9;
  const v = city.windMph * 0.35; // sheltered pool surface
  return MONTHS.map((month, m) => {
    const taC = ((city.tempF[m] - 32) * 5) / 9;
    const ta = o.indoor ? 27 : taC;
    const rh = o.indoor ? 55 : city.rh[m];
    const ghi = o.indoor ? 0 : city.ghi[m];
    const use = poolLossWm2(o.poolTempC, ta, rh, v, pool.af, ghi, tAnnC, false, o.indoor);
    const idle = poolLossWm2(o.poolTempC, ta, rh, v, o.idleAF, ghi, tAnnC, o.coverIdle, o.indoor);
    const wm2 = (use.net * pool.useHours + idle.net * (24 - pool.useHours)) / 24;
    const mwh = (Math.max(wm2, 0) * pool.areaM2 * 24 * DAYS[m]) / 1e6;
    return { month, mwh, wm2 };
  });
}

export function poolDegreeDays(city: City, baseF = 80) {
  return city.tempF.reduce((s, t, i) => s + Math.max(baseF - t, 0) * DAYS[i], 0);
}

// ─── Balance and economics ─────────────────────────────────────────────────────────
export type BalanceRow = {
  month: string;
  unitMwh: number; // one pool
  demandMwh: number; // N pools
  supplyMwh: number; // recoverable DC heat
  usedMwh: number;
  unmetMwh: number;
};

export type Balance = {
  rows: BalanceRow[];
  annualUnitMwh: number;
  annualDemandMwh: number;
  annualSupplyMwh: number;
  usedMwh: number;
  demandMet: number; // 0..1
  dcShareUsed: number; // 0..1
  peakUnitKw: number; // January monthly-average load of one pool, kW
  poolsAtPeak: number; // pools this DC could carry in the peak month
};

export function balance(city: City, pool: Pool, nPools: number, dcMw: number, cooling: Cooling, o: DemandOptions): Balance {
  const unit = monthlyDemand(city, pool, o);
  const rows: BalanceRow[] = unit.map((u, m) => {
    const supply = dcMw * cooling.frac * 24 * DAYS[m];
    const demand = u.mwh * nPools;
    const used = Math.min(demand, supply);
    return { month: u.month, unitMwh: u.mwh, demandMwh: demand, supplyMwh: supply, usedMwh: used, unmetMwh: demand - used };
  });
  const annualUnit = unit.reduce((s, u) => s + u.mwh, 0);
  const annualDemand = rows.reduce((s, r) => s + r.demandMwh, 0);
  const annualSupply = rows.reduce((s, r) => s + r.supplyMwh, 0);
  const used = rows.reduce((s, r) => s + r.usedMwh, 0);
  const peakUnitKw = Math.max(...unit.map((u, m) => (u.mwh * 1000) / (24 * DAYS[m])));
  return {
    rows,
    annualUnitMwh: annualUnit,
    annualDemandMwh: annualDemand,
    annualSupplyMwh: annualSupply,
    usedMwh: used,
    demandMet: annualDemand > 0 ? used / annualDemand : 1,
    dcShareUsed: used / annualSupply,
    peakUnitKw,
    poolsAtPeak: peakUnitKw > 0 ? Math.floor((dcMw * cooling.frac * 1000) / peakUnitKw) : Infinity,
  };
}

export type Prices = { gasPerTherm: number; elecPerKwh: number; gasEff: number; hpCop: number };
export const DEFAULT_PRICES: Prices = { gasPerTherm: 1.3, elecPerKwh: 0.17, gasEff: 0.84, hpCop: 4.0 };

// EPA emission factor for natural gas: 53.06 kg CO2 per MMBtu.
const GAS_KG_CO2_PER_MMBTU = 53.06;

export function economics(mwhTh: number, p: Prices) {
  const mmbtu = (mwhTh * 1000 * 3.412) / 1000;
  const therms = (mmbtu * 10) / p.gasEff;
  return {
    gasUsd: therms * p.gasPerTherm,
    hpUsd: ((mwhTh * 1000) / p.hpCop) * p.elecPerKwh,
    hpMwhE: mwhTh / p.hpCop,
    tCo2: (mmbtu / p.gasEff) * GAS_KG_CO2_PER_MMBTU / 1000,
  };
}
