// Pulls published posts from the public Substack RSS feed and normalizes
// them into a small shape the Thoughts page renders. No external deps —
// the feed is parsed with regexes scoped to RSS's predictable structure.

export const SUBSTACK_URL = "https://yujiaochen.substack.com";
export const SUBSTACK_FEED = `${SUBSTACK_URL}/feed`;

export type Post = {
  title: string;
  subtitle: string; // RSS <description> — Substack's post subtitle
  url: string;
  date: string; // ISO 8601, for sorting + <time dateTime>
  dateDisplay: string; // e.g. "June 21, 2026"
  author: string;
  image?: string; // cover image from <enclosure> if present
};

function decode(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#160;|&nbsp;/g, " ")
    .trim();
}

function tag(block: string, name: string): string | undefined {
  // Matches <name ...>...</name> for the first occurrence in `block`.
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : undefined;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function parseItem(block: string): Post | null {
  const title = tag(block, "title");
  const link = tag(block, "link");
  const pubDate = tag(block, "pubDate");
  if (!title || !link) return null;

  const iso = pubDate ? new Date(pubDate).toISOString() : "";
  const enclosure = block.match(/<enclosure\s+url="([^"]+)"/i);

  return {
    title,
    subtitle: tag(block, "description") ?? "",
    url: link,
    date: iso,
    dateDisplay: formatDate(iso),
    author: tag(block, "dc:creator") ?? "Yujiao Chen",
    image: enclosure?.[1],
  };
}

/**
 * Fetch + parse the Substack RSS feed. Returns posts newest-first.
 * On any network/parse failure returns an empty array so the page can
 * render a graceful fallback instead of throwing.
 */
export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(SUBSTACK_FEED, {
      headers: { "User-Agent": "reigndragon-site (+https://reigndragon.ai)" },
      // Refetch hourly so newly published posts appear without a redeploy.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const posts: Post[] = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/gi;
    let m: RegExpExecArray | null;
    while ((m = itemRe.exec(xml)) !== null) {
      const post = parseItem(m[1]);
      if (post) posts.push(post);
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch {
    return [];
  }
}
