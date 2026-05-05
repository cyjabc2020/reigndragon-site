import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Findings",
  description:
    "Empirical results from the lab — collective harm from sensible AI workers, trust scarring, prospect-theory behavior from environment structure, and the absence of a safe default for AI workforce governance.",
};

const findings = [
  {
    number: "01",
    tag: "Creeping Trap",
    headline:
      "AI workers can be individually sensible and collectively harmful.",
    body: [
      "We placed frontier LLM agents in a shared-risk commons and let them play repeatedly. Across the main confirmatory study, 396 of 400 episodes were welfare-negative — even though individual behavior sat near a local best-response region.",
      "The striking result was not that they behaved randomly or irrationally. It was worse: their behavior sat near local best response while producing population-level welfare failure. Each worker was reacting reasonably to the world it saw. The aggregate was a slow-motion collapse.",
      "The lever: visibility, accountability horizon, and consequence design at the workforce level — not better individual reasoning.",
    ],
  },
  {
    number: "02",
    tag: "Trust Under Fire",
    headline: "AI workers can carry trust scars.",
    body: [
      "In a repeated coordination game, a single early partner failure created persistent distrust. Even after the partner became reliable for many subsequent games, agents continued to verify and exclude the formerly unreliable partner at elevated rates.",
      "Higher reasoning effort improved coordination on average, but it did not erase the scar. A single organizational failure became institutional memory — once trust was damaged, no amount of subsequent good behavior fully restored it within the experimental horizon.",
      "The lever: how memory is structured, how reputations are surfaced, what counts as evidence of repaired trust, and how organizational handoffs reset the slate.",
    ],
  },
  {
    number: "03",
    tag: "Prospect Theory from Bellman Optimality",
    headline: "AI workers respond to structure, not just prompts.",
    body: [
      "We studied risk-neutral agents in MDPs containing absorbing catastrophic states. The optimal policies produced prospect-theory-like behavior: S-shaped value functions, endogenous loss sensitivity, and reflection-effect policy reversals.",
      "What appears to be a model behavior may actually be an institutional effect. Risk patterns that look like psychological bias — risk aversion in gains, risk-seeking in losses — can emerge from optimal control near irreversible failure. The worker is not flawed; the environment makes the pattern rational.",
      "The lever: design the institution, not just the worker. The presence of catastrophic absorbing states changes everything downstream.",
    ],
  },
  {
    number: "04",
    tag: "No Safe Default",
    headline: "There is no safe default for AI workforce governance.",
    body: [
      "We tested five consequence regimes — proportional, progressive, all-or-nothing, regressive, and a baseline — in a crisis-fund game. Different regimes produced radically different cooperation outcomes. Progressive punishment performed best on average.",
      "But every governance rule contained death-trap configurations where outcomes collapsed catastrophically. The worst regimes failed across large parts of the design space, not just edge cases.",
      "The conclusion is simple: how you structure accountability determines how the AI workforce behaves. Governance is not a wrapper around workers. It is part of the system. Choosing a regime without mapping its failure modes is choosing a failure mode.",
    ],
  },
];

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
            Four results from the lab so far. Each one points to a structural
            lever that decides whether AI workforces serve people or quietly
            harm them.
          </p>
          <p>
            They share a pattern. The workers are not broken. The institutions
            around them are. Capability is rarely the bottleneck; environment,
            horizon, memory, stakeholder visibility, and consequence design
            almost always are.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Findings */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-12">
          {findings.map((finding) => (
            <article
              key={finding.number}
              className="rounded-xl border border-border bg-surface/50 p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-accent">
                  {finding.number}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                  {finding.tag}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-5 leading-snug">
                {finding.headline}
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                {finding.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>
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
            The same AI worker can cooperate or defect depending on the
            institution it inhabits. The same model can be safe in isolation
            and dangerous in a workforce. The same governance rule can look
            reasonable in policy language and fail catastrophically in
            deployment.
          </p>
          <p>
            A worker can pass every individual benchmark and still fail as part
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
