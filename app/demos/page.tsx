import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Interactive prototypes that illustrate how AI workforces fail — and how governance levers change the trajectory.",
};

const demos = [
  {
    slug: "creeping-trap",
    tag: "Creeping Trap",
    status: "Live",
    title: "Creeping Trap Simulator",
    description:
      "Three deciders extract from a shared resource while three silent bystanders absorb damage. Pick a decider strategy from the paper's reference panel — social planner, interior MPE, observed LLM mean, corner trap — and watch the risk pool, catastrophes, and aggregate welfare evolve over the episode.",
    finding: "creeping-trap",
  },
  {
    slug: "no-safe-default",
    tag: "No Safe Default",
    status: "Live",
    title: "Consequence Regime Comparator",
    description:
      "Three agents with unequal wealth must pool resources to avert a crisis. Run the same wealth split and threshold under five consequence regimes — All-or-Nothing, Random, Democratic Vote, Regressive Punishment, Progressive Punishment — and watch fatality rates, fund success, and burden allocation diverge. Every regime has its own death-trap.",
    finding: "no-safe-default",
  },
];

const upcoming = [
  {
    tag: "Trust Under Fire",
    title: "Trust scarring playground",
    description:
      "How a single early partner failure reshapes long-run cooperation, even after the partner becomes reliable.",
  },
  {
    tag: "Loss Aversion",
    title: "Cliff-edge MDP explorer",
    description:
      "Watch a risk-neutral Bellman-optimal agent develop prospect-theory-like behavior as the catastrophe boundary moves.",
  },
];

export default function DemosPage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Demos
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Interactive <span className="gradient-text">illustrations</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p className="text-foreground font-medium">
            Interactive prototypes from ReignDragon Institute showing how AI
            workforces fail through institutional structure: accumulating
            risk, invisible stakeholders, and consequence-regime design.
          </p>
          <p>
            Each demo is a small, transparent prototype — rule-based, not a
            full LLM simulation — that lets you adjust the structural levers
            we study and see how an AI workforce drifts.
          </p>
          <p>
            They are illustrative, not predictive. The point is the mechanism:
            change a governance dial, change the trajectory.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Live demos */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Live
          </span>
        </div>

        <div className="space-y-6">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/demos/${demo.slug}`}
              className="group block rounded-xl border border-border bg-surface/50 hover:bg-surface-hover hover:border-accent/30 transition-all p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  {demo.status}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                  {demo.tag}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 leading-snug group-hover:text-accent transition-colors">
                {demo.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                {demo.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-accent">
                Open the simulator
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Upcoming */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            On the bench
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcoming.map((u) => (
            <div
              key={u.title}
              className="rounded-xl border border-border bg-surface/30 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-3">
                {u.tag}
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                {u.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {u.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-tertiary italic">
          These are illustrative prototypes, not production-scale simulators.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Collaborate
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            Want to test AI workforce failure modes in your own deployment
            setting? ReignDragon Institute designs scoped simulations and governance
            pilots.
          </p>
          <Link
            href="/who-we-serve"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            Request a briefing
          </Link>
        </div>
      </section>
    </div>
  );
}
