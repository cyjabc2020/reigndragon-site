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

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary mb-4">
              The empirical safety lab for the age of multi-agent AI.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary mb-10">
              AI is leaving the sandbox. Agents are coordinating in groups, holding
              budgets, and making decisions that affect people who never see them.
              ReignDragon studies how these populations behave &mdash; and turns
              that evidence into governance that works.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/research"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors backdrop-blur-sm"
              >
                Explore the Research
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors backdrop-blur-sm"
              >
                Partner With Us
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
                "We place AI agents in high-stakes multi-agent environments and measure how they cooperate, defect, trust, punish, and fail — surfacing the population-level risks that single-turn evaluations cannot see.",
            },
            {
              label: "02",
              title: "Formal Theory",
              image: "/images/formal-theory.png",
              description:
                "We connect behavior to structure. Which environments make defection optimal? Which horizons collapse cooperation? Which information regimes make trust stable? Not anecdote — predictive science.",
            },
            {
              label: "03",
              title: "Policy-as-Product",
              image: "/images/policy-as-product.png",
              description:
                "Findings become governance levers. Consequence regimes, accountability horizons, visibility, memory, deployment-readiness benchmarks — the everyday choices that decide whether multi-agent systems serve people or quietly harm them.",
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
                alt="They will not fail like chatbots"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                They will not fail like chatbots
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Coding swarms. Marketplace traders. Autonomous services.
                Recommendation ecosystems. These systems will fail like economies
                &mdash; over-extracting shared resources, defecting at the end of
                short horizons, exploiting bad rules, optimizing locally while
                destroying welfare globally. Single-agent benchmarks cannot see
                these failures.
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
                Capability is not the bottleneck. The same model cooperates or
                self-destructs depending on consequence design, accountability
                horizon, and who is made visible. If structure determines behavior,
                governance is not guesswork &mdash; there are levers, they can be
                measured, and they can be pulled.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* What we have found */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            What we have found
          </span>
        </div>

        <p className="max-w-2xl text-text-secondary leading-relaxed mb-10">
          Four results from the lab so far. Each one points to a structural lever
          that decides whether multi-agent systems serve people or quietly harm
          them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              tag: "Creeping Trap",
              headline:
                "Individually sensible agents can produce collective harm.",
              body:
                "LLM agents repeatedly over-extracted from a shared-risk commons. Across the main confirmatory study, 396 of 400 episodes were welfare-negative — even though behavior sat near a local best-response region. Not random irrationality; sensible behavior producing population-level failure.",
            },
            {
              tag: "Trust Under Fire",
              headline: "Trust can scar.",
              body:
                "A single early partner failure created persistent distrust. Even after the partner became reliable for many subsequent games, agents kept verifying and excluding the formerly unreliable partner at elevated rates. Higher reasoning improved coordination, but did not erase the scar.",
            },
            {
              tag: "Prospect Theory from Bellman",
              headline: "Risk preferences can come from environment structure.",
              body:
                "In MDPs with absorbing catastrophic states, risk-neutral agents produced prospect-theory-like behavior: S-shaped value functions, endogenous loss sensitivity, reflection-effect policy reversals. What looks like “bias” can emerge from optimal control near irreversible failure.",
            },
            {
              tag: "No Safe Default",
              headline: "There is no safe default governance rule.",
              body:
                "Five consequence regimes, tested in a crisis-fund game. Progressive punishment performed best on average — but every regime contained “death-trap” configurations. The worst regimes failed catastrophically across large parts of the design space. Governance is part of the system, not a wrapper around it.",
            },
          ].map((finding) => (
            <div
              key={finding.tag}
              className="rounded-xl border border-border bg-surface/50 p-8"
            >
              <span className="font-mono text-xs text-accent mb-4 block uppercase tracking-[0.15em]">
                {finding.tag}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                {finding.headline}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {finding.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/findings"
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            See the full findings
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
            ReignDragon exists because every serious account of AI risk eventually
            becomes an account of incentives, institutions, and human nature
            &mdash; fields economics and psychology have studied for a century,
            but that AI governance often rediscovers too late.
          </p>
          <p>
            The twentieth century built institutions for human-only societies:
            markets, courts, contracts, antitrust law, public-goods mechanisms.
            The twenty-first century will include billions of artificial
            decision-makers that price, negotiate, recommend, allocate, and act
            on behalf of people. We need a science that explains how these
            populations behave &mdash; and how to govern them before their
            defaults harden.
          </p>
          <p>
            That is what we are building. Not a wrapper around agents. The
            institutional science of AI civilization.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Signal Section */}
      <section className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 sm:p-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Signal
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug max-w-2xl mx-auto mb-4">
            Reign the dragon.
          </p>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            The future will not be governed by sentiment. It will be governed by
            structure. ReignDragon builds that structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/research"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              Read the Research
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors"
            >
              Contact the Lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
