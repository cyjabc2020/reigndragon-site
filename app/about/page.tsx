import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ReignDragon — an interdisciplinary research lab focused on AI governance and policy-as-product.",
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
            ReignDragon is an interdisciplinary research lab focused on AI
            governance and policy-as-product.
          </p>

          <p>
            We were founded on a conviction: AI is the most powerful force
            humanity has ever created, and the question of how to govern it is
            the most important question of our time. No single discipline can
            answer it alone.
          </p>

          <p>
            We bring together researchers across artificial intelligence,
            economics, psychology, public policy, applied mathematics, and
            machine learning &mdash; not as separate tracks, but as a unified
            effort to understand governance-level and policy-level challenges in
            their full complexity.
          </p>

          <p>
            We publish our thinking openly because governance must be a
            conversation, not a decree.
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
              principle: "Governance as rigorous as the technology",
              detail:
                "AI policy cannot be vague aspiration. We treat governance as a product \u2014 evaluated, iterated, and optimized with the same rigor applied to the systems it governs.",
            },
            {
              principle: "Interdisciplinary by necessity",
              detail:
                "The problems at this frontier don\u2019t respect disciplinary boundaries. Economics, psychology, policy, math, and ML must work together \u2014 not in parallel, but as one.",
            },
            {
              principle: "Context over universals",
              detail:
                "There is no single policy for all AI. Every domain has its own failure modes and trade-offs. We build evaluation frameworks tailored to specific contexts.",
            },
            {
              principle: "A mirror for humanity",
              detail:
                "Governing AI forces us to examine our own biases, incentive structures, and blind spots. The work of reigning AI is also the work of better understanding human society itself.",
            },
            {
              principle: "Advance, don\u2019t retreat",
              detail:
                "We are not here to slow down. We are here to ensure the most powerful technology ever created points in the right direction.",
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
