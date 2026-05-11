import type { Metadata } from "next";
import { partitionEvents, type Event } from "./events-data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Roundtables, talks, and workshops from ReignDragon Lab on governing the AI workforce.",
};

// Re-render on each request so upcoming/past partition stays current.
export const dynamic = "force-dynamic";

function EventCard({ event, past }: { event: Event; past?: boolean }) {
  return (
    <article
      className={`rounded-xl border bg-surface/50 p-8 sm:p-10 transition-all ${
        past
          ? "border-border/60 opacity-80"
          : "border-border hover:bg-surface-hover hover:border-accent/30"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {event.kind}
        </span>
        {event.badge && (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
            {event.badge}
          </span>
        )}
        {past && (
          <span className="inline-flex items-center rounded-full bg-text-tertiary/10 px-2.5 py-0.5 text-xs font-medium text-text-tertiary">
            Past
          </span>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug mb-4 tracking-tight">
        {event.title}
      </h2>

      <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-2 gap-x-4 mb-6 text-sm">
        <dt className="font-mono uppercase tracking-[0.15em] text-text-tertiary">
          When
        </dt>
        <dd className="text-foreground/90">{event.dateDisplay}</dd>
        <dt className="font-mono uppercase tracking-[0.15em] text-text-tertiary">
          Where
        </dt>
        <dd className="text-foreground/90">{event.location}</dd>
      </dl>

      <p className="text-text-secondary leading-relaxed mb-6">
        {event.description}
      </p>

      {!past && (
        <a
          href={event.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-5 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
        >
          {event.rsvpLabel ?? "RSVP"}
          <svg
            className="ml-2 h-4 w-4"
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
        </a>
      )}
    </article>
  );
}

export default function EventsPage() {
  const { upcoming, past } = partitionEvents();

  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Events
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Roundtables, talks, and{" "}
          <span className="gradient-text">workshops</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed">
          Where we bring researchers, enterprises, platforms, and
          policymakers together to talk about governing the AI workforce.
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* Upcoming */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Upcoming
          </span>
        </div>

        {upcoming.length > 0 ? (
          <div className="space-y-6">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface/30 p-8 text-center">
            <p className="text-text-secondary">
              No upcoming events scheduled. Reach out at{" "}
              <span className="text-accent">hello@reigndragon.com</span> if
              you&apos;d like to host or collaborate on one.
            </p>
          </div>
        )}
      </section>

      {/* Past — only render section if there are any */}
      {past.length > 0 && (
        <>
          <div className="glow-line mx-6" />
          <section className="mx-auto max-w-3xl px-6 py-14">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-accent/40" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                Past
              </span>
            </div>

            <div className="space-y-6">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} past />
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-14 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Host with us
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            Want to co-host a roundtable, run a workshop, or have us speak?
          </p>
          <p className="text-accent font-medium">hello@reigndragon.com</p>
        </div>
      </section>
    </div>
  );
}
