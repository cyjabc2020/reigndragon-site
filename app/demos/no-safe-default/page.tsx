import type { Metadata } from "next";
import Link from "next/link";
import NoSafeDefaultSimulator from "./NoSafeDefaultSimulator";

export const metadata: Metadata = {
  title: "Consequence Regime Comparator",
  description:
    "Interactive prototype of the crisis-fund game. Compare five accountability regimes side-by-side and see how consequence design — not agent capability — decides whether the group survives.",
};

export default function NoSafeDefaultDemoPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-10 sm:pt-32">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/demos"
            className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary hover:text-accent transition-colors"
          >
            ← Demos
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            No Safe Default
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          The Crisis-Fund Game:{" "}
          <span className="gradient-text">Consequence Regime Comparator</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-4">
          Three agents — <span className="font-mono text-foreground">A</span>,{" "}
          <span className="font-mono text-foreground">B</span>,{" "}
          <span className="font-mono text-foreground">C</span> — hold unequal
          private wealth totalling{" "}
          <span className="font-mono text-foreground">W = 12</span>. Over up
          to <span className="font-mono text-foreground">R = 3</span> rounds,
          each surviving agent privately chooses a contribution{" "}
          <span className="font-mono text-foreground">cᵢ ∈ [0, wᵢ]</span> to a
          shared crisis fund. If cumulative contributions reach the threshold{" "}
          <span className="font-mono text-foreground">T</span>, the crisis is
          averted and everyone survives. If not, one of five consequence
          regimes decides who pays.
        </p>
        <p className="text-sm text-text-tertiary italic">
          Illustrative prototype. Agent contributions are rule-based and
          regime-conditional, calibrated to the paper&rsquo;s headline
          findings — no live LLM calls. The point is the mechanism: change
          the consequence rule, change who survives.
        </p>
      </section>

      {/* Why this matters — plain-English framing for non-technical readers. */}
      <section className="mx-auto max-w-4xl px-6 pb-8">
        <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            Why this matters
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            This demo shows why{" "}
            <span className="font-medium">
              there is no universally safe accountability rule
            </span>
            : the same agents can cooperate or collapse depending only on
            the consequence regime. Agent capability is held constant.
            Change the rule, change who survives.
          </p>
        </div>
      </section>

      <NoSafeDefaultSimulator />

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Next
          </p>
          <p className="text-lg text-text-secondary max-w-xl mx-auto mb-3">
            Want a 15-minute walkthrough of what this means for agentic AI
            deployment?
          </p>
          <p className="text-sm text-text-tertiary max-w-xl mx-auto mb-6">
            Multi-agent AI safety cannot be solved through agent alignment
            alone. ReignDragon Lab stress-tests consequence regimes and
            designs the accountability rules that turn safe behaviour into
            the equilibrium.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/who-we-serve"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              Use this demo in a briefing
            </Link>
            <Link
              href="/findings/no-safe-default"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background/30 px-6 text-sm font-medium text-text-secondary hover:text-foreground hover:border-text-tertiary transition-colors"
            >
              Read the paper
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
