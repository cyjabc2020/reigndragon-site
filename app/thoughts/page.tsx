import type { Metadata } from "next";
import Image from "next/image";
import { fetchPosts, SUBSTACK_URL, type Post } from "./substack";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Essays and notes on AI governance, institutions, and the future of the AI workforce — synced from the ReignDragon Substack.",
};

// Refetch on each request; the feed itself is cached for an hour
// (see fetchPosts) so newly published posts appear without a redeploy.
export const dynamic = "force-dynamic";

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row gap-6 rounded-xl border border-border bg-surface/50 hover:bg-surface-hover hover:border-accent/30 transition-all p-6 sm:p-8"
    >
      {post.image && (
        <div className="relative aspect-square w-full sm:w-40 sm:h-40 sm:shrink-0 overflow-hidden rounded-lg bg-[#fdf8ec] border border-border/60">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col">
        {post.dateDisplay && (
          <time
            dateTime={post.date}
            className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary mb-3"
          >
            {post.dateDisplay}
          </time>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug mb-3 tracking-tight group-hover:text-accent transition-colors">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-text-secondary leading-relaxed mb-4">
            {post.subtitle}
          </p>
        )}
        <span className="mt-auto inline-flex items-center text-sm font-medium text-accent">
          Read on Substack
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
      </div>
    </a>
  );
}

export default async function ThoughtsPage() {
  const posts = await fetchPosts();

  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Thoughts
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Notes on <span className="gradient-text">governing AI</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed">
          Essays on AI governance, institutions, and the future of the AI
          workforce — written in the open and synced from our{" "}
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Substack
          </a>
          .
        </p>
      </section>

      <div className="glow-line mx-6" />

      {/* Posts */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface/30 p-8 text-center">
            <p className="text-text-secondary">
              Posts are published over on{" "}
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Substack
              </a>
              . Check back here shortly — new essays sync automatically.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-14 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Subscribe
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-6">
            Get new essays on governing the AI workforce in your inbox.
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            Subscribe on Substack
          </a>
        </div>
      </section>
    </div>
  );
}
