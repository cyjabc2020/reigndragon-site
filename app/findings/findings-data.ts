export type Finding = {
  slug: string;
  number: string;
  tag: string;
  title: string;
  headline: string;
  oneLiner: string;
  cardBody: string;
  question: string;
  paperTitle: string;
  abstract: string[];
  coreInsight: string;
  whyItMatters: string;
  // Slug of the live demo under /demos/<demoSlug>. Optional — only set
  // for findings that have a working interactive prototype.
  demoSlug?: string;
  // Public URL of the paper (arXiv, preprint server, journal page).
  // Optional — falls back to a "Coming soon" placeholder when absent.
  paperUrl?: string;
};

// All four findings share their slug as the image filename.
// 16:9 art for paper-page heroes; 1:1 art for cards and index portraits.
export const findingHero = (slug: string) =>
  `/images/findings/16-9/${slug}.png`;
export const findingPortrait = (slug: string) =>
  `/images/findings/1-1/${slug}.png`;

export const findings: Finding[] = [
  {
    slug: "no-safe-default",
    number: "01",
    tag: "No Safe Default",
    title: "No Safe Default",
    headline:
      "Consequence rules decide whether AI agents cooperate or collapse.",
    oneLiner:
      "Consequence rules decide whether AI agents cooperate or collapse.",
    cardBody:
      "In a crisis-fund game, the same LLM agents either cooperate early, delay, exploit the vulnerable, or fail catastrophically — depending only on who pays the price when the group fails. There is no universally safe default governance rule.",
    question:
      "If AI agents are aligned individually, who designs the rules that keep them from destroying each other collectively?",
    paperTitle:
      "No Safe Default: Why AI Agents Need Governance, Not Just Alignment",
    abstract: [
      "AI safety is often framed as a problem of individual agents: make the model more capable, more truthful, more aligned, more reliable. But future AI systems will rarely act alone. They will coordinate, compete, verify, delegate, bargain, and make decisions under shared risk.",
      "This paper asks what happens when the agents are held constant, but the rules around them change.",
      "We introduce a crisis-fund game in which three LLM agents must pool resources to prevent collective failure. The agents have unequal wealth, a shared survival problem, and different consequence regimes determining who dies if the group fails. Across thousands of simulations, the result is clear: consequence design is not a detail. It shapes whether agents cooperate early, delay strategically, exploit weaker partners, or create avoidable deaths.",
      "The most successful regime on average is progressive accountability, where the richest agent faces the greatest risk if the group fails. This makes responsibility self-enforcing: the agent most able to solve the problem has the strongest reason to act. By contrast, all-or-nothing failure produces delay, while regressive punishment — where the poorest agent dies first — creates exploitation. Wealthier agents learn to use the poorest agent's vulnerability as a strategic buffer.",
      "The deeper finding is that no mechanism is universally safe. Every regime contains death-trap configurations: combinations of inequality and crisis severity where that rule performs catastrophically worse than another.",
    ],
    whyItMatters:
      "Multi-agent AI safety cannot be solved through agent alignment alone. Agents act inside institutions. Those institutions create incentives, vulnerabilities, and failure modes. If we do not stress-test governance rules, we may deploy systems where individually capable agents still produce collective catastrophe.",
    coreInsight:
      "There is no safe default. Accountability design is part of AI alignment.",
    demoSlug: "no-safe-default",
  },
  {
    slug: "creeping-trap",
    number: "02",
    tag: "Creeping Trap",
    title: "Individually Sensible, Collectively Harmful",
    headline:
      "AI agents do not need to be irrational to damage the commons.",
    oneLiner:
      "AI agents do not need to be irrational to damage the commons.",
    cardBody:
      "LLM agents repeatedly choose how much to extract from a shared system. Their choices often look locally reasonable, yet across the population they produce negative welfare and harm silent bystanders. The danger is competent behavior inside bad incentives.",
    question:
      "What if the real danger is not misaligned agents, but well-optimized agents playing the game we gave them?",
    paperTitle:
      "Individually Sensible, Collectively Harmful: The AI Commons Problem",
    abstract: [
      "The most dangerous AI failures may not come from agents behaving irrationally. They may come from agents behaving sensibly inside systems that reward local success while hiding collective harm.",
      "This paper introduces Creeping Trap, a repeated commons benchmark for LLM agents. Each agent chooses how much to extract from a shared system. Extraction gives immediate reward, but it also accumulates catastrophe risk. When catastrophe happens, the damage is shared across the population, including silent bystanders who do not act, do not profit, and do not get a vote.",
      "Across a wide range of LLMs and experimental conditions, agents consistently over-extract relative to welfare-aligned baselines. The striking point is that their behavior is not simply random or incoherent. It often lies near a broad low-regret region of local best response. The agents are not obviously “broken.” They are making individually sensible choices that become collectively harmful.",
      "The study also identifies three design levers. Prompt wording strongly shifts behavior, meaning that prompt form is part of the experimental treatment. Making bystander harm visible consistently reduces extraction. Shorter accountability horizons increase extraction and produce end-of-term defection, where agents take the reward and leave future consequences behind.",
    ],
    whyItMatters:
      "A multi-agent system can look successful by individual performance metrics while damaging the broader environment. If evaluations only measure whether each agent is doing well, they may miss whether the population is destroying the commons.",
    coreInsight: "Local coherence is not social safety.",
    demoSlug: "creeping-trap",
  },
  {
    slug: "trust-under-fire",
    number: "03",
    tag: "Trust Under Fire",
    title: "Trust Under Fire",
    headline:
      "AI agents can learn to trust, but they may not easily forgive.",
    oneLiner:
      "AI agents can learn to trust, but they may not easily forgive.",
    cardBody:
      "Agents must decide when to verify, when to trust, and when to risk acting on another agent's information. A single early partner failure creates persistent distrust even after the partner becomes reliable — a form of trust scarring.",
    question:
      "If AI agents inherit our ability to cooperate, do they also inherit our inability to forgive?",
    paperTitle:
      "Trust Under Fire: How AI Agents Build, Lose, and Recover Trust",
    abstract: [
      "Multi-agent AI systems will depend on trust. Agents will rely on each other's claims, verify uncertain information, recover from mistakes, and decide when to act under risk. But trust is not just a score. It is a history.",
      "This paper introduces the Escape Room Survival Game, where agents must assemble a shared password under mortal risk. Each agent knows one part of the answer. Someone must volunteer the full password. If the password is correct, the group survives. If it is wrong, the volunteer dies. If nobody acts, a random agent dies. Verification is possible but costly.",
      "The game forces agents to balance premature trust against excessive caution. Trusting too early can kill you. Verifying too much wastes resources and delays action.",
      "The results show that reasoning effort is the dominant driver of coordination success. High-reasoning agents verify strategically, track evidence, and volunteer only when confidence is sufficient. Reflective memory helps, especially for lower-reasoning agents, but it does not replace in-context deliberation.",
      "The most important finding is trust scarring. When one partner gives a wrong answer in the first game and then becomes reliable afterward, agents continue to distrust that partner long after the evidence improves. They verify the partner more often and include its answers less often. A single early failure outweighs many later successes.",
    ],
    whyItMatters:
      "Real AI systems will experience transient failures: bad tool calls, corrupted contexts, unreliable partners, misleading observations. If agents preserve distrust too strongly, a single early error can damage long-term coordination.",
    coreInsight: "Multi-agent systems need trust repair, not just memory.",
    paperUrl: "https://arxiv.org/abs/2606.14923",
  },
  {
    slug: "loss-aversion",
    number: "04",
    tag: "Loss Aversion Without Loss-Averse Preferences",
    title: "Loss Aversion Without Loss-Averse Preferences",
    headline:
      "Irreversible failure can make a rational agent look psychologically biased.",
    oneLiner:
      "Irreversible failure can make a rational agent look psychologically biased.",
    cardBody:
      "A risk-neutral Bellman-optimal agent with linear rewards develops prospect-theory-like behavior when the environment contains an absorbing catastrophe boundary: caution near gains, desperate risk-taking near decline.",
    question:
      "How much of what we call “bias” is actually optimal behavior near an irreversible boundary?",
    paperTitle: "Loss Aversion Without Loss-Averse Preferences",
    abstract: [
      "Some behaviors that look psychologically biased may emerge from the structure of the world.",
      "This paper studies a simple Markov decision process in which an agent chooses between a safe action and a risky action. The agent is risk-neutral. Rewards are linear. There is no built-in loss aversion, no probability weighting, and no framing effect. But the environment contains an absorbing catastrophe boundary: once the agent falls into failure, the failure is irreversible.",
      "That boundary is enough to produce prospect-theory-like behavior.",
      "In growth environments, the risky action has higher immediate expected value. But near catastrophe, one bad outcome can end everything, so the Bellman-optimal agent plays safe. In decline environments, the safe action has lower immediate expected loss. But near catastrophe, safety only leads to certain ruin more slowly, so the optimal agent gambles. The same agent, with the same objective, shows opposite risk attitudes depending on the direction of the environment.",
      "The paper also derives a closed-form formula for endogenous loss sensitivity and shows that loss-aversion-like slope ratios can arise even with symmetric payoffs. The effect persists under model-free Q-learning and stochastic transitions.",
    ],
    whyItMatters:
      "In AI safety, reinforcement learning, economics, and institutional design, we often interpret risk aversion or desperate risk-taking as a property of the agent. This paper shows that irreversible boundaries can create those behaviors structurally.",
    coreInsight: "When failure is irreversible, the world itself becomes loss-sensitive.",
    paperUrl: "https://arxiv.org/abs/2606.00970",
  },
];

export function getFinding(slug: string): Finding | undefined {
  return findings.find((f) => f.slug === slug);
}
