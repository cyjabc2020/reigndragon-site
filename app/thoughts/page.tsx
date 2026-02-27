import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Essays on the transformation happening now. AI, careers, identity, and human connection.",
};

const posts = [
  {
    slug: "your-resume-is-dying",
    title: "Your R\u00e9sum\u00e9 Is Dying",
    excerpt:
      "AI doesn\u2019t care where you went to school. The era of defining yourself by a handful of keywords is ending.",
    date: "2026-02-26",
    category: "Essay",
    readTime: "6 min read",
  },
];

export default function ThoughtsPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Thoughts
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          Dispatches from the <span className="gradient-text">frontier</span>
        </h1>

        <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
          Essays, analysis, and reflections on AI, identity, and the
          transformation unfolding around us.
        </p>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/thoughts/${post.slug}`}
              className="group block"
            >
              <article className="rounded-xl border border-border bg-surface/50 p-8 hover:bg-surface-hover hover:border-accent/20 transition-all">
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span className="font-mono text-accent">{post.category}</span>
                  <span className="text-text-tertiary">&middot;</span>
                  <time className="text-text-tertiary">{post.date}</time>
                  <span className="text-text-tertiary">&middot;</span>
                  <span className="text-text-tertiary">{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>

                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center text-sm font-medium text-text-tertiary group-hover:text-accent transition-colors">
                  Read essay
                  <svg
                    className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
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
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
