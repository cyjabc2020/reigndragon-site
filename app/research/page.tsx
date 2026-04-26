import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Multi-agent behavioral experiments and formal theory for AI governance and policy-as-product.",
};

const projects = [
  {
    status: "Active",
    title: "Trust Dynamics in Multi-Agent LLM Systems",
    description:
      "How do agents build, lose, and recover trust across repeated interactions? We study the conditions under which a single early failure leaves a lasting mark — and the structural choices (reasoning effort, memory, verification protocols) that shape whether groups of agents can coordinate at all when the stakes are real.",
    tags: ["Multi-Agent", "Trust", "Coordination", "Memory"],
  },
  {
    status: "Active",
    title: "Consequence Design for Cooperation",
    description:
      "Cooperation in agent systems is not a property of the model — it is a property of the rules around the model. We map how different consequence regimes (proportional, progressive, all-or-nothing, regressive) shape cooperation, exploitation, and catastrophic failure, and identify the configurations where each regime quietly breaks.",
    tags: ["Mechanism Design", "Cooperation", "Game Theory"],
  },
  {
    status: "Active",
    title: "Risk and Decision Theory in Optimal Control",
    description:
      "When environments contain absorbing failure states, optimal policies start to look strikingly human — risk-averse near the cliff in growth regimes, risk-seeking near the cliff in decline. We derive the structural conditions that produce these patterns and connect them to long-standing puzzles in behavioral economics.",
    tags: ["Decision Theory", "MDP", "Prospect Theory", "Applied Math"],
  },
  {
    status: "Active",
    title: "Long-Horizon Behavior and Accountability",
    description:
      "Many real deployments give agents fixed terms, finite horizons, or short-window incentives. We study what happens when these conditions meet a shared resource: when does an agent extract too much, rationalize doing it, and become invisible to the people it harms? And which deployment-time choices reverse the pattern cheaply?",
    tags: ["Long Horizon", "Commons", "Incentives", "Accountability"],
  },
  {
    status: "Active",
    title: "Policy-as-Product Frameworks",
    description:
      "Translating experimental findings into design rules for the people deploying agent systems. Consequence regimes, accountability horizons, visibility prompts, memory structure, measurement choices — the everyday levers, the failure modes they prevent, and the evidence behind each rule.",
    tags: ["Policy", "Evaluation", "Deployment"],
  },
  {
    status: "Upcoming",
    title: "Context-Specific Governance Evaluation",
    description:
      "Every domain — healthcare, finance, education, defense — has its own failure modes and trade-offs. We are building tailored evaluation frameworks that move beyond one-size-fits-all checklists toward governance shaped by the structure of each setting.",
    tags: ["Healthcare", "Finance", "Education", "Defense"],
  },
  {
    status: "Upcoming",
    title: "AI as a Mirror: Societal Reflection Studies",
    description:
      "The patterns we find in artificial agents — negativity bias, short-horizon extraction, bystander invisibility — are not the model's invention. They are inherited from us. We use multi-agent experiments as a diagnostic tool for the institutions, incentives, and blind spots of the societies that built the training data.",
    tags: ["Society", "Bias", "Institutions"],
  },
];

const themes = [
  {
    title: "Behavior under stakes",
    detail:
      "What agents do when the cost of being wrong is real — not what they say they would do in the abstract.",
  },
  {
    title: "Structure over capability",
    detail:
      "The same model can cooperate or self-destruct depending on the rules around it. We map which rules matter.",
  },
  {
    title: "Cheap interventions",
    detail:
      "We look hardest for the prompt-, horizon-, and visibility-level fixes that change outcomes without changing the model.",
  },
  {
    title: "Theory that predicts",
    detail:
      "Where simulation reveals a pattern, we look for the formal structure that explains it — and would have predicted it.",
  },
];

export default function ResearchPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-10 lg:gap-12 items-center">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-accent/40" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Research
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
              Research <span className="gradient-text">programs</span>
            </h1>

            <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
              We study how AI agents behave in groups, under risk, and across time
              &mdash; through controlled multi-agent simulation, formal theory, and
              translation into deployment-ready design rules.
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-[440px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border bg-surface/30">
            <Image
              src="/images/research-hero.png"
              alt="Research"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="glow-line mx-6" />

      {/* Themes */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            How we work
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className="rounded-xl border border-border bg-surface/50 p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {theme.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {theme.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Programs
          </span>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-xl border border-border bg-surface/50 p-8 hover:bg-surface-hover hover:border-accent/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.status === "Active"
                      ? "bg-accent/10 text-accent"
                      : "bg-text-tertiary/10 text-text-tertiary"
                  }`}
                >
                  <span
                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      project.status === "Active"
                        ? "bg-accent"
                        : "bg-text-tertiary"
                    }`}
                  />
                  {project.status}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h2>

              <p
                className="text-text-secondary leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-mono text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Publications placeholder */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-border bg-surface/30 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary mb-3">
            Publications
          </p>
          <p className="text-text-secondary leading-relaxed">
            New work from the lab is in preparation. Papers and preprints will
            be listed here as they are released.
          </p>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Collaborate
          </p>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            Interested in our research or want to collaborate on governance
            frameworks? Reach out at{" "}
            <span className="text-accent">hello@reigndragon.com</span>
          </p>
        </div>
      </section>
    </div>
  );
}
