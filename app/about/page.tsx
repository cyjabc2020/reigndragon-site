import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ReignDragon — a research lab studying how AI agents behave under pressure and turning that evidence into governance that works.",
};

export default function AboutPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            About
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Who we <span className="gradient-text">are</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            ReignDragon is a research lab studying how AI agents behave under
            pressure &mdash; in groups, under risk, across time &mdash; and
            translating that evidence into governance that works.
          </p>

          <p>
            We were founded on a conviction: AI is the most powerful force
            humanity has ever created, and the question of how to govern it is
            the most important question of our time. It is also a question that
            no single discipline can answer alone.
          </p>

          <p>
            So we built a lab that doesn&apos;t pretend otherwise. We design
            controlled multi-agent experiments, derive the formal structure
            behind what we observe, and turn the findings into design rules
            people can actually use. AI, machine learning, economics,
            psychology, public policy, and applied mathematics &mdash; not as
            parallel tracks, but as one effort.
          </p>

          <p>
            We publish openly because governance must be a conversation, not a
            decree.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold text-foreground mb-10">
          What we believe
        </h2>

        <div className="space-y-8">
          {[
            {
              principle: "Evidence before opinion",
              detail:
                "AI policy cannot be vague aspiration. Every claim we make is grounded in controlled simulation, formal analysis, or both. Every design rule comes with the failure mode it prevents.",
            },
            {
              principle: "Structure beats sentiment",
              detail:
                "The same model can cooperate or self-destruct depending on the rules around it. Capability is rarely the bottleneck; consequence design, accountability horizon, and visibility almost always are.",
            },
            {
              principle: "Behavior emerges between agents and over time",
              detail:
                "Trust, restraint, cooperation, foresight, fairness — the things that decide whether deployment goes well — do not appear in single-prompt benchmarks. They appear in groups, under stakes, across rounds. So that is where we look.",
            },
            {
              principle: "Cheap interventions matter most",
              detail:
                "We look hardest for the prompt-, horizon-, and visibility-level fixes that change outcomes without changing the model. The worst outcomes are often cheaply preventable — if someone has done the work to find them.",
            },
            {
              principle: "Interdisciplinary by necessity",
              detail:
                "The questions at this frontier — trust, accountability, collective action, decision-making near catastrophe — have never lived inside any single field. Economics, psychology, policy, math, and ML must work together as one.",
            },
            {
              principle: "A mirror for humanity",
              detail:
                "The biases and blind spots we find in artificial agents are rarely the model’s invention. They are inherited from us. Governing AI well forces us to examine the institutions and incentives we already live inside.",
            },
            {
              principle: "Advance, don’t retreat",
              detail:
                "We are not here to slow progress. We are here to ensure the most powerful technology ever created points in the right direction.",
            },
          ].map((belief) => (
            <div
              key={belief.principle}
              className="flex gap-4 items-start"
            >
              <div className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full bg-accent" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {belief.principle}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {belief.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-xl border border-border bg-surface/50 p-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Get in touch
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Whether you want to collaborate on research, discuss governance
            frameworks, or explore how our work applies to your domain &mdash;
            we&apos;re always interested in connecting.
          </p>
          <p className="text-accent font-medium">
            hello@reigndragon.com
          </p>
        </div>
      </section>
    </div>
  );
}
