import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "As a non-profit research institute, we work with AI labs, enterprises, platforms, policymakers, and researchers in the public interest — from population-level safety evaluations to open benchmarks, governance levers, and evidence-based frameworks for the AI workforce.",
};

const audiences = [
  {
    number: "01",
    title: "The Public",
    headline: "Anyone living and working alongside the AI workforce.",
    body: "AI is quietly becoming part of the workforce that shapes your job, your money, your healthcare, and the services you rely on — and the decisions about how it is governed are being made right now, often without you. As a non-profit, our work belongs in the public conversation, not behind a paywall. We publish our findings, demos, and writing openly so anyone who is curious or concerned can understand what an AI workforce does, where it fails, and what good governance looks like.",
  },
  {
    number: "02",
    title: "AI Labs",
    headline: "Population-level safety evaluations.",
    body: "Single-agent benchmarks miss the failures that matter when models are deployed as a workforce. We provide controlled multi-agent environments that reveal how frontier models behave under risk, across time, and against each other — surfacing welfare collapse, persistent distrust, and exploitative equilibria before they reach users.",
  },
  {
    number: "03",
    title: "Enterprises",
    headline: "Design rules for deploying AI workers across workflows.",
    body: "Enterprises are adopting agentic systems at scale, but the failures that matter for an AI workforce don’t look like the failures that matter for a single agent. We share design rules for deploying AI workers across roles, handoffs, and review windows without creating hidden collective failures — so the workforce serves not only the organization but the people it acts on behalf of. Our findings are published openly, not sold as a service.",
  },
  {
    number: "04",
    title: "Platforms",
    headline: "Governance levers for agent-mediated systems.",
    body: "When a system routes work between agents, settles trades, allocates budgets, or moderates a marketplace, the structural choices around the workers matter more than the workers themselves. We study the levers — visibility, accountability horizon, consequence regime, memory — that reduce collective-action failure, and make what we learn available to the platforms building these systems in the public interest.",
  },
  {
    number: "05",
    title: "Policymakers",
    headline: "Evidence-based frameworks for accountability and oversight.",
    body: "AI governance often arrives years after the technology. We translate experimental findings into deployment-readiness benchmarks and design rules — accountability, oversight, and stakeholder protection in AI labor systems — giving regulators and standard-setters a vocabulary grounded in what AI workforces actually do.",
  },
  {
    number: "06",
    title: "Researchers",
    headline: "Open benchmarks, simulators, and formal models.",
    body: "AI workforce behavior is a young science. We publish the environments, the data, and the formal structure behind our results so the field can replicate, extend, and disagree. Reach out if you want to collaborate on a benchmark, a paper, or a shared simulator.",
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
          The missing layer between AI{" "}
          <span className="gradient-text">capability and governance</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            Most AI evaluation asks whether a model is helpful, harmless,
            honest, capable, or aligned in a single interaction. ReignDragon
            Institute asks what happens when AI workers operate together inside real
            institutions &mdash; companies, markets, governments, and
            platforms.
          </p>
          <p>
            As a non-profit, we work in the public interest rather than for a
            single client or shareholder. Different stakeholders need different
            parts of that answer &mdash; here is how we collaborate with each.
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
                <p className="font-mono text-sm sm:text-base uppercase tracking-[0.15em] text-accent mb-3">
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
            The field
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          AI Workforce Governance Science
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon is helping build the empirical and theoretical
            foundation for an emerging public field: the study of how AI workers
            behave in organizations, markets, and institutions &mdash; and how
            system design can make those workforces cooperative, accountable, and
            safe.
          </p>
          <p>
            The field sits between AI safety, labor economics,
            organizational behavior, mechanism design, behavioral psychology,
            public policy, frontier-model evaluation, and institutional
            governance. None of those fields, on its own, can answer what
            happens when AI workers share an institution.
          </p>
          <p className="text-foreground font-medium">
            The future of AI is not a single assistant. It is a workforce. And
            every workforce needs institutions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Collaborate with us
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            If your work touches the AI workforce in any of these ways, we
            would like to hear from you. We collaborate openly and in the public
            interest &mdash; on research, benchmarks, and governance.
          </p>
          <p className="text-accent font-medium mb-6">hello@reigndragon.ai</p>
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
