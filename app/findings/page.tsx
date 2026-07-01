import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findings, findingPortrait } from "./findings-data";

export const metadata: Metadata = {
  title: "Findings",
  description:
    "Empirical results from ReignDragon Institute — collective harm from sensible agents, trust scarring, prospect-theory behavior from environment structure, and the absence of a safe default for AI workforce governance.",
};

export default function FindingsPage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Findings
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          What we have <span className="gradient-text">found</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            Four results from the institute so far. Each one points to a structural
            lever that decides whether AI workforces serve people or quietly
            harm them.
          </p>
          <p>
            They share a pattern. The agents are not broken. The institutions
            around them are. Capability is rarely the bottleneck; environment,
            horizon, memory, stakeholder visibility, and consequence design
            almost always are.
          </p>
        </div>
      </section>

      {/* Series portrait row — same dragon, four moods */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {findings.map((finding) => (
            <Link
              key={finding.slug}
              href={`/findings/${finding.slug}`}
              className="group block"
              aria-label={finding.tag}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-[#fdf8ec] group-hover:border-accent/40 transition-colors">
                <Image
                  src={findingPortrait(finding.slug)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-text-tertiary group-hover:text-accent transition-colors text-center">
                {finding.tag}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-text-tertiary italic">
          Four findings, one dragon.
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* Findings */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-8">
          {findings.map((finding) => (
            <Link
              key={finding.slug}
              href={`/findings/${finding.slug}`}
              className="group block rounded-xl border border-border bg-surface/50 hover:bg-surface-hover hover:border-accent/30 transition-all p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-accent">
                  {finding.number}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                  {finding.tag}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 leading-snug group-hover:text-accent transition-colors">
                {finding.headline}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                {finding.cardBody}
              </p>
              <p className="text-foreground/80 italic leading-relaxed mb-5 border-l-2 border-accent/30 pl-4">
                {finding.question}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-accent">
                Read the paper
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Pattern */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            The pattern
          </span>
        </div>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            The same AI agent can cooperate or defect depending on the
            institution it inhabits. The same model can be safe in isolation
            and dangerous in a workforce. The same governance rule can look
            reasonable in policy language and fail catastrophically in
            deployment.
          </p>
          <p>
            An agent can pass every individual benchmark and still fail as part
            of a workforce.
          </p>
          <p className="text-foreground font-medium">
            That is the gap we exist to close.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Next
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            Active research programs and how the findings are being extended
            into deployable governance.
          </p>
          <Link
            href="/research"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            See the research programs
          </Link>
        </div>
      </section>
    </div>
  );
}
