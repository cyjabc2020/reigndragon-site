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

    </div>
  );
}
