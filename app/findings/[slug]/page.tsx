import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findings, getFinding, findingHero } from "../findings-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return findings.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const finding = getFinding(slug);
  if (!finding) return { title: "Finding not found" };
  return {
    title: finding.paperTitle,
    description: finding.cardBody,
  };
}

export default async function FindingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const finding = getFinding(slug);
  if (!finding) notFound();

  // Adjacent findings for prev/next navigation
  const idx = findings.findIndex((f) => f.slug === finding.slug);
  const prev = idx > 0 ? findings[idx - 1] : null;
  const next = idx < findings.length - 1 ? findings[idx + 1] : null;

  return (
    <div className="bg-grid">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-4 sm:pt-32">
        <Link
          href="/findings"
          className="inline-flex items-center text-sm text-text-tertiary hover:text-accent transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          All findings
        </Link>
      </section>

      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-accent">
            {finding.number}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
            {finding.tag}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-6">
          {finding.paperTitle}
        </h1>

        <p className="text-xl sm:text-2xl text-foreground/90 leading-snug font-medium">
          {finding.headline}
        </p>
      </section>

      {/* Hero figure — watercolor illustration of the finding */}
      <section className="mx-auto max-w-3xl px-6 pt-4 pb-2">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-[#fdf8ec]">
          <Image
            src={findingHero(finding.slug)}
            alt={`Watercolor illustration: ${finding.headline}`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Provoking question */}
      <section className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-xl border border-accent/15 bg-accent/[0.04] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            Provoking question
          </p>
          <p className="text-lg sm:text-xl text-foreground leading-snug italic">
            {finding.question}
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Abstract / paper body */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Abstract
          </span>
        </div>

        <div className="space-y-5 text-text-secondary leading-relaxed text-base sm:text-lg">
          {finding.abstract.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Why it matters */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Why it matters
          </span>
        </div>

        <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
          {finding.whyItMatters}
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* Core insight */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Core insight
          </span>
        </div>

        <p className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug tracking-tight">
          {finding.coreInsight}
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* Resources */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Resources
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {finding.demoSlug ? (
            <Link
              href={`/demos/${finding.demoSlug}`}
              className="group rounded-lg border border-accent/30 bg-accent/[0.04] hover:bg-accent/[0.08] hover:border-accent/50 transition-all px-4 py-3 flex items-center justify-between text-sm"
            >
              <span className="text-foreground font-medium">
                Try the demo
              </span>
              <span className="inline-flex items-center font-mono text-xs uppercase tracking-[0.15em] text-accent">
                Live
                <svg
                  className="ml-2 h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform"
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
          ) : (
            <div
              className="rounded-lg border border-border bg-surface/30 px-4 py-3 flex items-center justify-between text-sm"
              aria-disabled
            >
              <span className="text-text-secondary">Try the demo</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                Coming soon
              </span>
            </div>
          )}
          {finding.paperUrl ? (
            <a
              href={finding.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-accent/30 bg-accent/[0.04] hover:bg-accent/[0.08] hover:border-accent/50 transition-all px-4 py-3 flex items-center justify-between text-sm"
            >
              <span className="text-foreground font-medium">
                Read the paper
              </span>
              <span className="inline-flex items-center font-mono text-xs uppercase tracking-[0.15em] text-accent">
                arXiv
                <svg
                  className="ml-2 h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </a>
          ) : (
            <div
              className="rounded-lg border border-border bg-surface/30 px-4 py-3 flex items-center justify-between text-sm"
              aria-disabled
            >
              <span className="text-text-secondary">Read the paper</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                Coming soon
              </span>
            </div>
          )}
          <div
            className="rounded-lg border border-border bg-surface/30 px-4 py-3 flex items-center justify-between text-sm"
            aria-disabled
          >
            <span className="text-text-secondary">Benchmark &amp; code</span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
              Coming soon
            </span>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/findings/${prev.slug}`}
              className="rounded-lg border border-border bg-surface/30 hover:bg-surface-hover hover:border-accent/30 transition-all p-5 group"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-2">
                ← Previous
              </p>
              <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                {prev.tag}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/findings/${next.slug}`}
              className="rounded-lg border border-border bg-surface/30 hover:bg-surface-hover hover:border-accent/30 transition-all p-5 group sm:text-right"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-2">
                Next →
              </p>
              <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                {next.tag}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
