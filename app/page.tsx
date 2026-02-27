import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-grid">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        {/* Decorative elements */}
        <div className="absolute top-20 left-8 glow-dot pulse-glow" />
        <div className="absolute top-40 right-12 glow-dot pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              ReignDragon
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            Reign the{" "}
            <span className="gradient-text">dragon</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-text-secondary mb-10">
            AI is the most powerful force humanity has ever created. Our lab
            researches AI governance and policy-as-product &mdash; combining AI,
            economics, psychology, policy, and applied math to ensure this
            dragon advances our civilization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/vision"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              Our Vision
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/thoughts"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors"
            >
              Read Our Thoughts
            </Link>
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Three Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "01",
              title: "Vision",
              description:
                "AI governance and policy-as-product. Ensuring the most powerful force ever created helps advance civilization, not destroy it.",
              href: "/vision",
            },
            {
              label: "02",
              title: "Research",
              description:
                "Interdisciplinary research across AI, economics, psychology, policy, and applied math to evaluate and optimize governance frameworks.",
              href: "/research",
            },
            {
              label: "03",
              title: "Thoughts",
              description:
                "Essays on AI, governance, identity, and the transformation unfolding around us. A mirror held up to human society itself.",
              href: "/thoughts",
            },
          ].map((pillar) => (
            <Link
              key={pillar.label}
              href={pillar.href}
              className="group relative rounded-xl border border-border bg-surface/50 p-8 hover:bg-surface-hover hover:border-accent/20 transition-all"
            >
              <span className="font-mono text-xs text-accent mb-4 block">
                {pillar.label}
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {pillar.description}
              </p>
              <div className="mt-6 flex items-center text-xs font-medium text-text-tertiary group-hover:text-accent transition-colors">
                Explore
                <svg className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Latest Post Teaser */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Latest
          </span>
        </div>

        <Link href="/thoughts/your-resume-is-dying" className="group block">
          <article className="rounded-xl border border-border bg-surface/50 p-8 sm:p-10 hover:bg-surface-hover hover:border-accent/20 transition-all">
            <span className="font-mono text-xs text-accent">Essay</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
              Your R&eacute;sum&eacute; Is Dying
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
              AI doesn&apos;t care where you went to school. The era of defining yourself by
              a handful of keywords is ending. The era of individuals is here.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-text-tertiary group-hover:text-accent transition-colors">
              Read more
              <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </article>
        </Link>
      </section>

      {/* Signal Section */}
      <section className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 sm:p-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Signal
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug max-w-2xl mx-auto">
            Reign the dragon.
            <br />
            <span className="text-text-secondary">Advance the civilization.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
