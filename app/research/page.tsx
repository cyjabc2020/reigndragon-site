import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Interdisciplinary research across AI, economics, psychology, policy, and applied math for AI governance and policy-as-product.",
};

const projects = [
  {
    status: "Active",
    title: "Policy-as-Product Frameworks",
    description:
      "Developing evaluation and optimization frameworks that treat AI governance as a product &mdash; measurable, iterable, and context-specific. Bridging the gap between policy intention and real-world outcomes.",
    tags: ["Policy", "Evaluation", "Optimization"],
  },
  {
    status: "Active",
    title: "Context-Specific Governance Evaluation",
    description:
      "Every domain has unique failure modes. We build tailored assessment methodologies for AI governance in healthcare, finance, education, and national security &mdash; moving beyond one-size-fits-all checklists.",
    tags: ["Healthcare", "Finance", "Education", "Defense"],
  },
  {
    status: "Active",
    title: "Behavioral Economics of AI Adoption",
    description:
      "Studying the psychological and economic incentive structures that shape how organizations and governments adopt, regulate, and respond to AI. Where do governance failures originate?",
    tags: ["Economics", "Psychology", "Incentives"],
  },
  {
    status: "Upcoming",
    title: "AI as a Mirror: Societal Reflection Studies",
    description:
      "Using the process of governing AI systems as a diagnostic tool for human society itself &mdash; surfacing biases, institutional blind spots, and structural incentive misalignments that were always present but now made legible at scale.",
    tags: ["Society", "Bias", "Institutions"],
  },
  {
    status: "Upcoming",
    title: "Governance Optimization via Applied Mathematics",
    description:
      "Applying formal mathematical methods &mdash; game theory, mechanism design, optimization theory &mdash; to model and improve AI governance structures. Moving policy from intuition to rigor.",
    tags: ["Applied Math", "Game Theory", "Mechanism Design"],
  },
];

export default function ResearchPage() {
  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Research
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          Research <span className="gradient-text">Projects</span>
        </h1>

        <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
          Interdisciplinary research combining AI, economics, psychology,
          policy, and applied mathematics to evaluate and optimize AI governance
          for specific contexts.
        </p>
      </section>

      <div className="glow-line mx-6" />

      <section className="mx-auto max-w-4xl px-6 py-16">
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
