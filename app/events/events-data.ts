export type Event = {
  slug: string;
  title: string;
  kind: string; // e.g. "Research roundtable", "Talk", "Workshop"
  // ISO 8601 datetime (UTC or with offset). Used for sorting + freshness logic.
  date: string;
  // Human-readable date/time string shown on the page.
  dateDisplay: string;
  location: string; // "Boston, MA", "Online", or "Location TBA"
  description: string;
  // External link (Partiful, Lu.ma, etc.) — the source of truth for RSVP.
  rsvpUrl: string;
  rsvpLabel?: string; // defaults to "RSVP"
  // Optional badge for context, e.g. "BOSTechWeek"
  badge?: string;
};

export const events: Event[] = [
  {
    slug: "governing-the-ai-workforce-bostechweek-2026",
    title:
      "Governing the AI Workforce: Institutions, Incentives, and Accountability",
    kind: "Research roundtable",
    date: "2026-05-29T14:00:00Z", // 10:00 AM ET = 14:00 UTC
    dateDisplay: "Friday, May 29 · 10:00 AM ET",
    location: "Location TBA",
    description:
      "A research roundtable examining governance challenges as AI agents transition into organizational roles — how multi-agent systems behave inside companies, markets, platforms, and governance environments, and what accountability and institutional safety mechanisms might look like in practice.",
    rsvpUrl: "https://partiful.com/e/obw9iWg6PPHrxoHVe6cj",
    rsvpLabel: "RSVP on Partiful",
    badge: "#BOSTechWeek",
  },
];

// Split events into upcoming vs past relative to "now".
// Server-rendered pages will compute this at request/build time.
export function partitionEvents(now: Date = new Date()): {
  upcoming: Event[];
  past: Event[];
} {
  const upcoming: Event[] = [];
  const past: Event[] = [];
  for (const e of events) {
    const eventDate = new Date(e.date);
    if (eventDate >= now) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { upcoming, past };
}
