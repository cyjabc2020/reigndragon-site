import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Population-level safety evaluations for AI labs, design levers for platforms, governance frameworks for policymakers, and open benchmarks for researchers.",
};

const audiences = [
  {
    number: "01",
    title: "AI Labs",
    headline: "Population-level safety evaluations.",
    body: "Single-agent benchmarks miss the failures that matter for deployment. We provide controlled multi-agent environments that reveal how frontier models behave under risk, across time, and against each other — surfacing welfare collapse, persistent distrust, and exploitative equilibria before they reach users.",
  },
  {
    number: "02",
    title: "Platforms",
    headline: "Design levers for agent-mediated systems.",
    body: "If your product routes work between agents, settles trades, allocates budgets, or moderates a marketplace, the structural choices around the agents matter more than the agents themselves. We identify the levers — visibility, accountability horizon, consequence regime, memory — that reduce collective-action failure in your specific setting.",
  },
  {
    number: "03",
    title: "Policymakers",
    headline: "Experimental evidence for governance frameworks.",
    body: "AI governance often arrives years after the technology. We translate experimental findings into deployment-readiness benchmarks and design rules, giving regulators and standard-setters a vocabulary grounded in what agents actually do — not what they say they would do.",
  },
  {
    number: "04",
    title: "Researchers",
    headline: "Open benchmarks, simulators, and formal models.",
    body: "Multi-agent AI behavior is a young science. We publish the environments, the data, and the formal structure behind our results so the field can replicate, extend, and disagree. Reach out if you want to collaborate on a benchmark, a paper, or a shared simulator.",
  },
  {
    number: "05",
    title: "Society",
    headline: "Make invisible structural risks visible.",
    body: "The largest risks from multi-agent AI will not announce themselves. They will look like ordinary economic activity: prices that drift, recommendations that narrow, services that quietly defect. Our job is to surface those risks while they are still cheap to fix — before they harden into infrastructure.",
  },
];

export default function WhoWeServePage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Who we serve
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          The missing layer between <span className="gradient-text">capability and governance</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            Most AI evaluation asks whether a model is helpful, harmless, honest,
            capable, or aligned in a single interaction. ReignDragon asks what
            happens when many capable agents pursue local objectives in a shared
            world.
          </p>
          <p>
            Different stakeholders need different parts of that answer. Here is
            how we work with each.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Audiences */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10">
          {audiences.map((audience) => (
            <div key={audience.number} className="flex gap-6">
              <span className="font-mono text-sm text-accent shrink-0 pt-1">
                {audience.number}
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-2">
                  For {audience.title}
                </p>
                <h2 className="text-xl font-semibold text-foreground mb-3 leading-snug">
                  {audience.headline}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {audience.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* The category */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            The category
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Multi-Agent AI Governance Science
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon is creating the empirical and theoretical foundation for
            a new category: the study of how artificial agents behave in
            populations, and how institutions can shape those populations toward
            cooperation, welfare, and resilience.
          </p>
          <p>
            The category sits between AI safety, mechanism design, behavioral
            economics, policy research, agent evaluation, and institutional
            design. None of those fields, on its own, can answer what happens
            when many capable agents share a world.
          </p>
          <p className="text-foreground font-medium">
            It is not enough to build better agents. We must build better worlds
            for agents to inhabit.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Partner with us
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            If your work touches multi-agent AI in any of these ways, we would
            like to hear from you.
          </p>
          <p className="text-accent font-medium mb-6">hello@reigndragon.com</p>
          <Link
            href="/findings"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors"
          >
            See what we have found
          </Link>
        </div>
      </section>
    </div>
  );
}
