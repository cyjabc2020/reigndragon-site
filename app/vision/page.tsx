import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Build the institutional science of the AI workforce. ReignDragon Lab studies how AI workers behave inside companies, markets, and institutions — and turns that evidence into governance that works.",
};

export default function VisionPage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Vision
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Build the institutional science of the{" "}
          <span className="gradient-text">AI workforce</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            AI is becoming labor. Fleets of AI workers are already writing code,
            trading, pricing, negotiating, allocating resources, advising
            decision-makers, and coordinating with one another inside
            companies, markets, governments, and platforms.
          </p>
          <p>
            That workforce will not fail like a model. It will fail like an
            organization &mdash; developing incentives, inheriting bad
            institutions, over-optimizing local goals, exploiting weak rules,
            and creating harm for stakeholders who were never represented in
            the prompt.
          </p>
          <p className="text-foreground text-xl font-semibold">
            How do we govern this workforce?
          </p>
          <p>
            We answer that question the way the question deserves: with
            experiments, with theory, and with governance that is itself a
            product &mdash; designed, measured, and improved.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Our mission
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Evidence-based governance for the AI workforce
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon Lab studies how AI workers actually behave &mdash; in
            organizations, markets, crisis rooms, commons, and governance
            environments &mdash; and translates that evidence into design
            rules for the people deploying them.
          </p>
          <p>
            We don&apos;t treat governance as a wishlist. We treat it as a
            product. Every claim is grounded in controlled simulation, formal
            analysis, or both. Every design rule comes with the failure mode it
            prevents.
          </p>
          <p>
            We work across artificial intelligence, labor economics,
            organizational behavior, mechanism design, behavioral psychology,
            public policy, and applied mathematics &mdash; because the
            questions that matter at this frontier (cooperation, accountability,
            stakeholder representation, trust repair) have never lived inside
            any single field.
          </p>
          <p>
            This is what{" "}
            <em className="text-accent not-italic font-medium">
              policy-as-product
            </em>{" "}
            means: governance that is evaluated, iterated, and deployed with
            the same rigor as the technology it governs.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* What we provide */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            What we provide
          </span>
        </div>

        <div className="space-y-10">
          {[
            {
              number: "01",
              title: "Behavioral Studies of AI Workers",
              text: "Controlled simulations that put AI workers into the situations where governance actually breaks: cooperation under scarcity, trust after failure, resource extraction, short-term incentives, unequal power, accountability rules, collective risk, and stakeholders without voice. We run these at scale and report what changes the outcome.",
            },
            {
              number: "02",
              title: "Formal Foundations",
              text: "Mathematical theory connecting worker behavior to environment structure: incentives, horizons, information, payoff geometry, consequence regimes, and governance rules. Theory that predicts what we see in the simulations — and what we will see in deployment.",
            },
            {
              number: "03",
              title: "Welfare Accounting",
              text: "Most evaluation asks whether tasks succeed. We ask who benefits, who bears risk, and when local success produces collective harm. The metrics that actually matter for an AI workforce operating on behalf of people.",
            },
            {
              number: "04",
              title: "Design Rules for Deployment",
              text: "Concrete, testable guidance on the levers that decide whether an AI workforce serves people: bystander visibility, accountability horizons, review windows, memory structures, trust repair, and consequence design. Cheap to change, expensive to ignore.",
            },
          ].map((item) => (
            <div key={item.number} className="flex gap-6">
              <span className="font-mono text-sm text-accent shrink-0 pt-1">
                {item.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Why it matters */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Why it matters
          </span>
        </div>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            The twentieth century built institutions for human labor: firms,
            contracts, labor law, management systems, fiduciary duties, unions,
            compliance departments, courts, regulators. The twenty-first
            century will need institutions for AI labor.
          </p>
          <p>
            Our experiments keep finding the same thing: capability is rarely
            the bottleneck. The same AI worker cooperates beautifully under one
            institution and self-destructs under another. That means governance
            is not guesswork. It means there are levers. It means the worst
            outcomes are often cheaply preventable &mdash; if someone has done
            the work to find them.
          </p>
          <p className="text-foreground font-medium">
            That is the work we are here to do.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Disciplines */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Disciplines
          </span>
        </div>

        <p className="text-text-secondary leading-relaxed mb-8">
          Our research draws from and contributes to:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "Artificial Intelligence",
            "Labor Economics",
            "Organizational Behavior",
            "Mechanism Design",
            "Behavioral Psychology",
            "Public Policy",
            "Game Theory",
            "Applied Mathematics",
            "Institutional Governance",
          ].map((discipline) => (
            <div
              key={discipline}
              className="rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-text-secondary text-center"
            >
              {discipline}
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="text-xl sm:text-2xl font-semibold text-foreground leading-snug max-w-xl mx-auto mb-3">
            The future of AI is not a single assistant.
          </p>
          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto">
            It is a workforce. And every workforce needs institutions.
          </p>
        </div>
      </section>
    </div>
  );
}
