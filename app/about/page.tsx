import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ReignDragon Institute — we design policies and mechanisms to prevent intelligent agents from failing together. We study how AI workers behave inside companies, markets, and institutions, and turn that evidence into governance that works.",
};

export default function AboutPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            About
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
          Who we <span className="gradient-text">are</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>
            ReignDragon Institute is a non-profit research institute that
            designs policies and mechanisms to prevent intelligent agents from
            failing together. We run controlled multi-agent experiments and
            formal models inside companies, markets, governments, and platforms
            &mdash; and translate that evidence into governance that works.
          </p>
          <p>
            We were founded on a conviction: AI is becoming labor, and the
            question of how to govern that labor is the most important question
            of our time. It is also a question that no single discipline can
            answer alone.
          </p>
          <p>
            So we built an institute that doesn&apos;t pretend otherwise. We design
            controlled multi-agent experiments, derive the formal structure
            behind what we observe, account for who benefits and who bears
            risk, and turn the findings into design rules people can actually
            use. AI, machine learning, labor economics, organizational
            behavior, mechanism design, behavioral psychology, and public
            policy &mdash; not as parallel tracks, but as one effort.
          </p>
          <p>
            As a non-profit, we answer to the public interest rather than to
            shareholders or a product roadmap. We publish openly because
            governance must be a conversation, not a decree.
          </p>
        </div>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold text-foreground mb-10">
          Why we are different
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed mb-10">
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-accent shrink-0">·</span>
              <span>Most AI companies build workers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">·</span>
              <span>Most AI labs evaluate workers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent shrink-0">·</span>
              <span>Most governance groups write principles about workers.</span>
            </li>
          </ul>
          <p className="text-foreground font-medium">
            ReignDragon studies the workforce.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              principle: "Evidence before opinion",
              detail:
                "AI workforce policy cannot be vague aspiration. Every claim we make is grounded in controlled simulation, formal analysis, or both. Every design rule comes with the failure mode it prevents.",
            },
            {
              principle: "Structure beats sentiment",
              detail:
                "The same AI worker can cooperate or defect depending on the institution it inhabits. Capability is rarely the bottleneck; consequence design, accountability horizon, and stakeholder visibility almost always are.",
            },
            {
              principle: "Workforce, not just worker",
              detail:
                "We study the structure around the agent — roles, incentives, visibility, memory, rankings, handoffs, deadlines, review windows, consequence regimes, stakeholder representation. The same model is safe in isolation and dangerous in a population.",
            },
            {
              principle: "Welfare, not just task success",
              detail:
                "Most evaluation asks whether tasks succeed. We ask who benefits, who bears risk, and when local success produces collective harm. The metrics that matter for an AI workforce on behalf of people.",
            },
            {
              principle: "Cheap interventions matter most",
              detail:
                "We look hardest for the role-, horizon-, and visibility-level fixes that change outcomes without changing the model. The worst outcomes are often cheaply preventable — if someone has done the work to find them.",
            },
            {
              principle: "Interdisciplinary by necessity",
              detail:
                "The questions at this frontier — cooperation, accountability, trust repair, stakeholder representation — have never lived inside any single field. AI, labor economics, organizational behavior, mechanism design, psychology, and policy must work together as one.",
            },
            {
              principle: "A mirror for humanity",
              detail:
                "The biases and blind spots we find in AI workers are rarely the model’s invention. They are inherited from us. Governing AI labor well forces us to examine the institutions and incentives we already live inside.",
            },
            {
              principle: "Advance, don’t retreat",
              detail:
                "We are not here to slow progress. We are here to ensure the largest labor transformation in history points in the right direction.",
            },
          ].map((belief) => (
            <div key={belief.principle} className="flex gap-4 items-start">
              <div className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full bg-accent" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {belief.principle}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {belief.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-xl border border-border bg-surface/50 p-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Get in touch
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Whether you want to collaborate on research, discuss governance
            frameworks for the AI workforce, or explore how our work applies to
            your domain &mdash; we&apos;re always interested in connecting.
          </p>
          <p className="text-accent font-medium">hello@reigndragon.ai</p>
        </div>
      </section>
    </div>
  );
}
