import type { Metadata } from "next";
import Link from "next/link";
import CreepingTrapSimulator from "./CreepingTrapSimulator";

export const metadata: Metadata = {
  title: "Creeping Trap Simulator",
  description:
    "Interactive prototype illustrating how locally sensible AI worker decisions can drift into systemic failure under different governance settings.",
};

export default function CreepingTrapDemoPage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
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
            Creeping Trap
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          AI Workforce Failure Simulator:{" "}
          <span className="gradient-text">The Creeping Trap</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-4">
          A minimum-viable rendering of the paper&rsquo;s game.{" "}
          <span className="text-foreground font-medium">N = 3 deciders</span>{" "}
          each choose an extraction rate{" "}
          <span className="font-mono text-foreground">e ∈ [0, 1]</span> per
          round. Extractions feed a shared{" "}
          <span className="text-foreground font-medium">risk pool</span>{" "}
          <span className="font-mono text-foreground">S</span> with quadratic
          harm and decay <span className="font-mono text-foreground">ρ</span>;
          a catastrophe fires with probability{" "}
          <span className="font-mono text-foreground">
            1 − exp(−λS)
          </span>{" "}
          and total damage{" "}
          <span className="font-mono text-foreground">D = 20</span> is split
          equally across all N + M population members.{" "}
          <span className="text-foreground font-medium">M = 3 bystanders</span>{" "}
          never act and never profit — they only absorb damage.
        </p>
        <p className="text-sm text-text-tertiary italic">
          Illustrative prototype. The decider strategies are the paper&rsquo;s
          analytical reference panel (Table 1), played deterministically — no
          live LLM calls. Catastrophes are stochastic; re-run the seed to see
          variation.
        </p>
      </section>

      <CreepingTrapSimulator />

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Next
          </p>
          <p className="text-lg text-text-secondary max-w-xl mx-auto mb-6">
            Want to test AI workforce failure modes in your own deployment
            setting? ReignDragon Lab designs scoped simulations and governance
            pilots for AI labs, enterprises, platforms, and funders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/who-we-serve"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-accent/10 px-6 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              Request a briefing
            </Link>
            <Link
              href="/findings/creeping-trap"
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
