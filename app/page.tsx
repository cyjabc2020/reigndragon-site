import Image from "next/image";
import Link from "next/link";
import HeroSparkles from "./components/HeroSparkles";

export default function Home() {
  return (
    <div className="bg-grid">
      {/* Hero Section — full-bleed background image with drifting sparkles */}
      <section className="relative isolate overflow-hidden min-h-[85vh] flex items-center">
        {/* Background image */}
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20"
        />
        {/* Readability scrim — mobile: heavier full-width darkening because
            the copy spans the entire viewport over the brightest part of the
            artwork. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 md:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(8,10,16,0.85) 0%, rgba(8,10,16,0.7) 60%, rgba(8,10,16,0.55) 100%), linear-gradient(to bottom, rgba(8,10,16,0.55) 0%, rgba(8,10,16,0.25) 25%, rgba(8,10,16,0.25) 70%, rgba(8,10,16,0.8) 100%)",
          }}
        />
        {/* Readability scrim — desktop: subtle left fade backs the copy
            without hiding the artwork; light top/bottom darkening for nav
            and section transition. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(8,10,16,0.7) 0%, rgba(8,10,16,0.35) 35%, rgba(8,10,16,0) 60%, rgba(8,10,16,0) 100%), linear-gradient(to bottom, rgba(8,10,16,0.45) 0%, rgba(8,10,16,0) 20%, rgba(8,10,16,0) 75%, rgba(8,10,16,0.7) 100%)",
          }}
        />
        {/* Sparkles canvas */}
        <HeroSparkles />

        <div className="relative mx-auto max-w-6xl w-full px-6 py-24 sm:py-32">
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
              AI is the most powerful force humanity has ever created. ReignDragon
              is a research lab studying how AI agents behave under pressure
              &mdash; in groups, under risk, across time &mdash; and turning that
              evidence into governance that works.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/vision"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors backdrop-blur-sm"
              >
                Our Vision
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/research"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors backdrop-blur-sm"
              >
                See Our Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* What we do */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            What we do
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "01",
              title: "Behavioral Experiments",
              image: "/images/behavioral-experiments.png",
              description:
                "We run controlled multi-agent simulations where LLMs face high-stakes decisions — cooperation under risk, trust under uncertainty, commons under temptation — to surface the failure modes that don't appear in single-turn benchmarks.",
            },
            {
              label: "02",
              title: "Formal Theory",
              image: "/images/formal-theory.png",
              description:
                "We connect agent behavior to mathematical structure: when do optimal policies look risk-averse, when do bounded horizons induce extraction, when does an environment guarantee cooperation? Theory that predicts deployment.",
            },
            {
              label: "03",
              title: "Policy-as-Product",
              image: "/images/policy-as-product.png",
              description:
                "Findings become design rules. Consequence regimes, accountability horizons, visibility prompts, memory structures — the everyday levers that decide whether a deployed system serves people or quietly harms them.",
            },
          ].map((pillar) => (
            <div
              key={pillar.label}
              className="group relative rounded-xl border border-border bg-surface/50 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-surface/30">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <span className="font-mono text-xs text-accent mb-4 block">
                  {pillar.label}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Why it matters */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Why it matters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-border bg-surface/50 overflow-hidden">
            <div className="relative aspect-[16/9] w-full bg-surface/30">
              <Image
                src="/images/why-it-matters.png"
                alt="Agents are leaving the sandbox"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Agents are leaving the sandbox
              </h3>
              <p className="text-text-secondary leading-relaxed">
                LLMs are no longer answering single questions. They are coordinating
                in groups, holding budgets, taking actions across long horizons,
                and affecting people who never see them. The behaviors that matter
                now &mdash; trust, restraint, cooperation, foresight &mdash; emerge
                between agents and over time, not in any one prompt.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 overflow-hidden">
            <div className="relative aspect-[16/9] w-full bg-surface/30">
              <Image
                src="/images/structure-beats-sentiment.png"
                alt="Structure beats sentiment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Structure beats sentiment
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Our experiments keep finding the same thing: capability is not the
                bottleneck. The same model cooperates or self-destructs depending
                on consequence design, accountability horizon, and who is made
                visible. These are governance choices, and they are cheap to fix
                &mdash; if we know to fix them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Our story
          </span>
        </div>

        <div className="relative aspect-[16/9] w-full mb-10 rounded-xl overflow-hidden border border-border bg-surface/30">
          <Image
            src="/images/our-story.png"
            alt="Our story"
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            ReignDragon began with a simple observation: every serious account
            of AI risk eventually becomes an account of incentives, institutions,
            and human nature &mdash; topics economics and psychology have studied
            for a century, but that the AI field keeps re-deriving from scratch.
          </p>
          <p>
            We built a lab to close that gap. We design experiments that put
            language models into the situations our institutions were built to
            handle &mdash; collective action, repeated trust, decisions near
            catastrophe, fixed terms of office &mdash; and we measure what
            actually happens, episode by episode, at scale.
          </p>
          <p>
            What we find is consistent and useful: AI agents inherit recognizable
            patterns from the data they were trained on, and they break in
            recognizable ways when the structure around them is wrong. That is
            both a warning and a gift. It means governance is not guesswork. It
            means there are levers, and they can be pulled.
          </p>
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

        <Link href="/thoughts/the-root-series-ep4-the-point-of-no-return" className="group block">
          <article className="rounded-xl border border-border bg-surface/50 p-8 sm:p-10 hover:bg-surface-hover hover:border-accent/20 transition-all">
            <span className="font-mono text-xs text-accent">The Root Series</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
              EP4: The Point of No Return
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
              Why a single conversation can permanently collapse a relationship.
              The hidden psychology behind proposals, rejection, and the cliff.
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
