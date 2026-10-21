import type { Metadata } from "next";
import Link from "next/link";
import ThermalCommonsCalculator from "./ThermalCommonsCalculator";

export const metadata: Metadata = {
  title: "Thermal Commons: Pool Heat Balance",
  description:
    "Screening calculator for matching data-center waste heat with swimming-pool heating demand across the year, by climate, data-center size, cooling type and pool type.",
};

export default function ThermalCommonsDemoPage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10 sm:pt-32">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/demos"
            className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary hover:text-accent transition-colors"
          >
            ← Demos
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Thermal Commons
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          Data-center heat meets the{" "}
          <span className="gradient-text">community pool</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-4">
          A pool is one of the few neighbourhood loads that can take
          data-center heat at 30 °C directly, with a plate heat exchanger and no
          heat pump. Pick a climate, a data center, its cooling architecture
          and a pool, and watch the month-by-month balance: how much of the
          pool&rsquo;s heat the data center covers, how much of the data
          center&rsquo;s heat the pool absorbs, and what the pool owner stops
          paying for.
        </p>
        <p className="text-sm text-text-tertiary italic">
          Screening-level prototype from the Thermal Commons project (MIT
          Climate Project, Data Centers Frontier). Monthly climate normals and
          ASHRAE pool-loss equations; treat results as ±30 %. Two cities for
          now.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            What to look for
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Pool demand peaks in January and collapses in summer; data-center
            heat is flat all year. In cold climates a 0.5 MW edge site keeps a
            50 m pool warm through winter; a hyperscale campus barely notices
            it. Use{" "}
            <span className="font-medium">Fill the data center</span> to see
            how many pools of a given type one site could carry in its peak
            month.
          </p>
        </div>
      </section>

      <ThermalCommonsCalculator />

      {/* Method */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-3 text-sm text-text-secondary leading-relaxed">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Method, in brief
          </p>
          <p>
            Pool heat loss per square metre of surface is evaporation,
            convection and radiation from the ASHRAE HVAC Applications
            equations as implemented in the ENERGY STAR Pool Technical
            Reference, plus a small conduction term to the ground and a solar
            gain of 80 % of global horizontal irradiance. A floating cover
            removes about 95 % of evaporation and 70 % of convection and
            radiation while the pool is idle. The low case uses the ASHRAE
            activity factor of 0.5 for an unoccupied pool; the high case uses
            1.0 around the clock, which reproduces the DOE Energy Saver cost
            tables within about 30 %.
          </p>
          <p>
            The data center rejects 8,760 MWh of heat per MW of IT load per
            year. The share that reaches a water loop, and the water
            temperature, depend on the cooling architecture: about 85 % at 30
            to 35 °C for a chilled-water plant, 75 % at 45 to 60 °C for
            direct-to-chip cold plates, 95 % at 50 to 65 °C for immersion.
            Each month the pool takes the smaller of its demand and the
            supply; the rest is unmet (backup heater) or unused (rejected to
            the cooling towers as before).
          </p>
          <p>
            Savings count only the heat actually delivered, priced against a
            gas heater and against an air-source heat pump at the prices in
            the assumptions panel. Connection costs (heat exchanger, piping,
            pumps) are not yet included. Climate inputs are monthly means
            from the NCEI Typical Meteorological Year (1998 to 2022) for the
            nearest first-order station; the monthly model was checked against
            an hourly run of the same TMY with day-level storage in the pool and
            agrees within 2 %.
          </p>
          <p className="text-text-tertiary">
            Sources: DOE Energy Saver pool-heater pages; ENERGY STAR Swimming
            Pool Technical Reference (2023); ASHRAE HVAC Applications ch. 5;
            Alfa Laval and ICEF 2025 on heat-reuse temperatures by cooling
            type; NCEI Typical Meteorological Year; EPA emission factors.
          </p>
        </div>
      </section>
    </div>
  );
}
