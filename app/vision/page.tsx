import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "AI is the most powerful force humanity has ever created. Our mission is to reign this dragon — through governance, policy-as-product, and interdisciplinary research.",
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
            AI is the new intelligence. The new workforce. It processes faster,
            knows more, and scales infinitely. No human will outcompete it on
            traditional measures of knowledge and productivity &mdash; that race
            is already over.
          </p>

          <p>
            This is the most powerful force humanity has ever created. And that
            is precisely what makes the next question the most important one of
            our time:
          </p>

          <p className="text-foreground text-xl font-semibold">
            How do we reign this dragon?
          </p>

          <p>
            How do we ensure this immense power helps us advance our
            civilization &mdash; rather than destroy ourselves? The answer
            won&apos;t come from any single discipline. It demands a new kind of
            thinking.
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
          AI governance &amp; policy-as-product
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon is a research lab at the intersection of AI governance
            and applied policy. We don&apos;t just study what&apos;s happening &mdash;
            we build the frameworks, evaluations, and tools that make governance
            actionable.
          </p>

          <p>
            We combine research from across disciplines &mdash; artificial
            intelligence, economics, psychology, public policy, applied
            mathematics, and machine learning &mdash; to understand governance-level
            and policy-level pitfalls in each specific context. Then we optimize
            for outcomes that actually serve people.
          </p>

          <p>
            This is what <em className="text-accent not-italic font-medium">policy-as-product</em> means:
            governance that is evaluated, iterated, and deployed with the same
            rigor as the technology it governs.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Pillars */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-14">
          {[
            {
              number: "01",
              title: "Interdisciplinary by Design",
              text: "AI governance cannot live in a single silo. We weave together AI research, economics, psychology, policy analysis, and applied math &mdash; because the problems at this frontier don&rsquo;t respect disciplinary boundaries.",
            },
            {
              number: "02",
              title: "Context-Specific Evaluation",
              text: "There is no universal policy that governs all AI. Every domain &mdash; healthcare, finance, education, defense &mdash; has its own failure modes and trade-offs. We build evaluation frameworks tailored to specific contexts, not one-size-fits-all checklists.",
            },
            {
              number: "03",
              title: "A Mirror for Human Society",
              text: "The work of reigning AI doesn&rsquo;t only serve technology. By rigorously examining how we govern intelligence systems, we hold up a reflection mirror to our own societies &mdash; exposing the biases, incentive structures, and blind spots that were always there, now made legible at scale.",
            },
            {
              number: "04",
              title: "Advance, Don&rsquo;t Retreat",
              text: "We are not here to slow down progress. We are here to ensure it points in the right direction. The opportunity to shape civilization has never been greater &mdash; and that opportunity demands governance that is as ambitious and capable as the technology itself.",
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
                <p
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            </div>
          ))}
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
            "Economics",
            "Psychology",
            "Public Policy",
            "Applied Mathematics",
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
