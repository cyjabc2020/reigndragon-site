import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "AI is the most powerful force humanity has ever created. ReignDragon studies how AI agents behave under pressure and turns that evidence into governance that works.",
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
          Reign the <span className="gradient-text">dragon</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            AI is the new intelligence. The new workforce. It already processes
            faster, knows more, and scales further than any human ever will.
            That race is over.
          </p>

          <p>
            But intelligence is not the only thing that matters when AI is
            deployed in the real world. What matters is how agents behave when
            they are placed in groups, given resources, made accountable to a
            term in office, and asked to act under risk. These are not
            engineering problems. They are the problems human institutions have
            spent centuries learning to handle.
          </p>

          <p className="text-foreground text-xl font-semibold">
            How do we reign this dragon?
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
            Our Mission
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Evidence-based AI governance
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon studies how AI agents actually behave &mdash; in
            multi-agent settings, under high stakes, across time &mdash; and
            translates that evidence into design rules for the people deploying
            them.
          </p>

          <p>
            We don&apos;t treat governance as a wishlist. We treat it as a
            product. Every claim is grounded in controlled simulation, formal
            analysis, or both. Every design rule comes with the failure mode it
            prevents.
          </p>

          <p>
            We work across artificial intelligence, economics, psychology,
            public policy, applied mathematics, and machine learning &mdash;
            because the questions that matter at this frontier (trust,
            cooperation, accountability, restraint) have never lived inside any
            single field.
          </p>

          <p>
            This is what <em className="text-accent not-italic font-medium">policy-as-product</em> means:
            governance that is evaluated, iterated, and deployed with the same
            rigor as the technology it governs.
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
              title: "Multi-Agent Behavioral Studies",
              text: "Controlled simulations that put LLMs into the situations where governance actually breaks: collective action under risk, repeated trust after betrayal, commons under temptation, decisions near catastrophe. We run these at scale and report what changes the outcome.",
            },
            {
              number: "02",
              title: "Formal Foundations",
              text: "Mathematical theory connecting agent behavior to environment structure. When does optimal control reproduce human-like risk attitudes? When does an incentive scheme guarantee cooperation? Theory that predicts what we see in the simulations — and what we will see in deployment.",
            },
            {
              number: "03",
              title: "Design Rules for Deployment",
              text: "Concrete, testable guidance on the everyday levers that decide whether an agent system serves people: consequence regimes, accountability horizons, who is made visible, what gets measured, how memory is structured. Cheap to change, expensive to ignore.",
            },
            {
              number: "04",
              title: "A Mirror for Human Society",
              text: "By rigorously examining how artificial agents behave under structures we already know, we hold a mirror up to our own institutions. The biases, blind spots, and incentive misalignments we find in the model are rarely the model's invention — they are ours, made legible at scale.",
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
            AI agents are no longer answering single questions. They are sitting
            on budgets, coordinating in groups, taking long-horizon actions, and
            affecting people who never see them. The behaviors that decide
            whether this goes well &mdash; trust, restraint, cooperation,
            foresight, fairness &mdash; emerge between agents and over time.
            They will not show up in a single-prompt benchmark.
          </p>
          <p>
            The encouraging part is that our experiments keep finding the same
            thing: capability is rarely the bottleneck. The same model
            cooperates beautifully under one structure and self-destructs under
            another. That means governance is not guesswork. It means there are
            levers. It means the worst outcomes are often cheaply preventable
            &mdash; if someone has done the work to find them.
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
            "Machine Learning",
            "Game Theory",
            "Behavioral Economics",
            "Cognitive Psychology",
            "Public Policy",
            "Applied Mathematics",
            "Mechanism Design",
            "Decision Theory",
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
          <p className="text-xl sm:text-2xl font-semibold text-foreground leading-snug max-w-xl mx-auto">
            Reign the dragon.
            <br />
            <span className="text-text-secondary">Advance the civilization.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
