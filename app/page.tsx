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
          className="object-cover object-[78%_center] md:object-[90%_center] -z-20"
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

            <p className="max-w-2xl text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.2] tracking-tight text-foreground mb-6">
              The empirical safety lab for the{" "}
              <span className="gradient-text">AI workforce</span>.
            </p>
            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-foreground/90 mb-10">
              AI is becoming labor. ReignDragon builds the science, benchmarks,
              and governance levers for fleets of AI workers operating inside
              companies, markets, governments, and platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/research"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors backdrop-blur-sm"
              >
                Read the Research
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/who-we-serve"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors backdrop-blur-sm"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* AI is becoming labor */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            The shift
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 leading-tight">
          AI is becoming <span className="gradient-text">labor</span>.
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Not software that waits for instructions. Not chatbots that answer
            questions. Not isolated agents completing isolated tasks.
          </p>
          <p>
            A new workforce is forming: fleets of AI workers that write code,
            trade, price, negotiate, allocate resources, manage workflows,
            advise decision-makers, represent users, and coordinate with one
            another inside companies, markets, governments, and platforms.
          </p>
          <p className="text-foreground font-medium">
            That workforce will not fail like a model. It will fail like an
            organization.
          </p>
          <ul className="space-y-2 pl-1 text-text-secondary">
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will develop incentives.</span></li>
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will inherit bad institutions.</span></li>
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will over-optimize local goals.</span></li>
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will lose trust after early shocks.</span></li>
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will exploit weak rules.</span></li>
            <li className="flex gap-3"><span className="text-accent shrink-0">·</span><span>It will create harm for stakeholders who were never represented in the prompt.</span></li>
          </ul>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* The Question */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            The question
          </span>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface/30 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-2">
              Old AI safety question
            </p>
            <p className="text-lg text-text-secondary leading-snug">
              Can this model do the task?
            </p>
          </div>
          <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-2">
              The new question
            </p>
            <p className="text-lg text-foreground leading-snug font-medium">
              What happens when AI workers operate together inside real
              institutions?
            </p>
          </div>
        </div>

        <p className="mt-8 text-text-secondary leading-relaxed">
          Single-agent benchmarks test capability. ReignDragon tests
          institutional behavior &mdash; what happens when AI workers compete
          for resources, face short deadlines, are evaluated by rankings,
          inherit failures from previous agents, and act on behalf of
          stakeholders who are invisible to the prompt.
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* The ReignDragon Method */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            The ReignDragon method
          </span>
        </div>

        <p className="max-w-2xl text-text-secondary leading-relaxed mb-10">
          We build controlled economies for AI workers &mdash; artificial
          organizations, markets, crisis rooms, commons, and governance
          environments &mdash; and measure what happens. Not vibes. Not
          anecdotes. Not demos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "01",
              title: "Behavioral Experiments",
              image: "/images/behavioral-experiments.png",
              description:
                "Place AI workers in high-stakes social and organizational environments and observe how they cooperate, defect, trust, punish, free-ride, and fail.",
            },
            {
              label: "02",
              title: "Formal Theory",
              image: "/images/formal-theory.png",
              description:
                "Connect observed behavior to structure: incentives, horizons, information, payoff geometry, consequence regimes, and governance rules.",
            },
            {
              label: "03",
              title: "Welfare Accounting",
              image: "/images/welfare.png",
              description:
                "Measure not only whether tasks succeed, but who benefits, who bears risk, and when local success produces collective harm.",
            },
            {
              label: "04",
              title: "Policy-as-Product",
              image: "/images/policy-as-product.png",
              description:
                "Translate findings into concrete levers: bystander visibility, accountability horizons, review windows, memory structures, trust repair, and consequence design.",
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
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                alt="Most AI work studies the worker. We study the workforce."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Most AI work studies the worker. We study the workforce.
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Most AI companies build workers. Most AI labs evaluate workers.
                Most governance groups write principles about workers. ReignDragon
                studies the structure around the worker &mdash; roles, incentives,
                visibility, memory, rankings, handoffs, deadlines, review windows,
                consequence regimes, stakeholder representation, and accountability
                horizons.
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
                The same worker, different institution
              </h3>
              <p className="text-text-secondary leading-relaxed">
                The same AI worker can cooperate or defect depending on the
                institution it inhabits. The same model can be safe in isolation
                and dangerous in a population. The same rule can look reasonable
                in policy language and fail catastrophically in deployment.
                ReignDragon is built to find those failures before they become
                infrastructure.
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
          Four results from the lab so far. Each one points to a structural
          lever that decides whether AI workforces serve people or quietly
          harm them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              tag: "Creeping Trap",
              headline:
                "AI workers can be individually sensible and collectively harmful.",
              body:
                "Frontier LLM agents repeatedly over-extracted from a shared-risk commons. The striking result was not that they behaved randomly or irrationally. It was worse: their behavior sat near local best response while producing population-level welfare failure.",
            },
            {
              tag: "Trust Under Fire",
              headline: "AI workers can carry trust scars.",
              body:
                "One early failure by a partner produced persistent distrust. Even after the partner became reliable, agents continued to verify and exclude it at elevated rates. A single organizational failure can become institutional memory.",
            },
            {
              tag: "Prospect Theory from Bellman",
              headline: "AI workers respond to structure, not just prompts.",
              body:
                "Risk patterns that look like psychological bias emerged from the structure of the environment itself. What appears to be a model behavior may actually be an institutional effect — optimal control near irreversible failure produces what looks like loss aversion.",
            },
            {
              tag: "No Safe Default",
              headline: "There is no safe default for AI workforce governance.",
              body:
                "Different consequence regimes produced radically different cooperation outcomes. Every governance rule contained death-trap configurations. The conclusion is simple: how you structure accountability determines how the AI workforce behaves.",
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
            The twentieth century built institutions for human labor: firms,
            contracts, labor law, management systems, fiduciary duties, unions,
            compliance departments, courts, regulators, and public agencies.
          </p>
          <p>
            The twenty-first century will need institutions for AI labor. AI
            workers will not simply execute commands &mdash; they will make
            decisions, negotiate tradeoffs, allocate scarce resources, manage
            risk, and act on behalf of humans at scale.
          </p>
          <p className="text-foreground font-medium">
            The question is not whether the AI workforce will arrive. It is
            whether it will be governed.
          </p>
          <p>
            ReignDragon exists to build the empirical science that makes
            governance possible &mdash; AI workforces that are cooperative,
            accountable, welfare-preserving, and resilient by design, not
            because every AI worker is perfect, but because the system around
            them makes safe behavior the equilibrium.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Why Now */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Why now
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
          AI workforces are moving from imagination to deployment.
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Enterprises are already adopting agentic systems at scale, while
            governance frameworks race to catch up. The market is building AI
            labor faster than it is building the labor science, safety science,
            and institutional design discipline required to govern it.
          </p>
          <p className="text-foreground font-medium">
            This is the opening.
          </p>
          <p>
            ReignDragon&rsquo;s category is not another agent platform. It is
            the science of how AI workforces behave &mdash; and how to govern
            them before their defaults harden into infrastructure.
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
            Govern the AI workforce before it governs us.
          </p>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            The future of AI work will be governed by structure. ReignDragon
            builds that structure.
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
