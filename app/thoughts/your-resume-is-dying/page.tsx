import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your R\u00e9sum\u00e9 Is Dying",
  description:
    "AI doesn\u2019t care where you went to school. The era of defining yourself by a handful of keywords is ending.",
};

export default function YourResumeIsDying() {
  return (
    <div className="bg-grid">
      <article className="mx-auto max-w-3xl px-6 pt-24 pb-20 sm:pt-32">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs text-text-tertiary">
          <Link href="/thoughts" className="hover:text-accent transition-colors">
            Thoughts
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Essay</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-xs mb-6">
            <span className="font-mono text-accent">Essay</span>
            <span className="text-text-tertiary">&middot;</span>
            <time className="text-text-tertiary">February 26, 2026</time>
            <span className="text-text-tertiary">&middot;</span>
            <span className="text-text-tertiary">6 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
            Your R&eacute;sum&eacute; Is Dying
          </h1>
        </header>

        <div className="glow-line mb-12" />

        {/* Body */}
        <div className="prose-custom">
          <p className="text-xl !leading-relaxed !text-text-secondary">
            Your r&eacute;sum&eacute; is dying. AI doesn&apos;t care where you went to school.
            And the era of defining yourself by a handful of keywords &mdash; your
            job title, your firm, your alma mater &mdash; is ending.
          </p>

          <p>Here&apos;s how we got here:</p>

          <div className="glow-line my-10" />

          <h2>The old world had a formula.</h2>

          <p>
            Want the best career? A generation ago, the answer was probably
            investment banking. Here&apos;s the recipe: get into one of a handful of
            target schools. Be charismatic. Be the alpha in the room. Dress in
            fine suits. Network relentlessly. Then compete &mdash; ferociously &mdash; for a
            handful of seats at Goldman Sachs or Morgan Stanley.
          </p>

          <p>
            You couldn&apos;t be an investment banker alone in your apartment. You
            needed the institution. And because the positions were scarce and the
            ambitious were many, a brutal filtering system emerged: your entire
            identity compressed into a few keywords. School. Firm. Title. Look.
            Personality type. That was you.
          </p>

          <h2>Then the nerds won.</h2>

          <p>
            The tech boom flipped the script. The richest, most powerful people
            on Earth weren&apos;t polished finance bros anymore &mdash; they were awkward,
            hoodie-wearing engineers who didn&apos;t always make great eye contact. The
            barrier to entry dropped. All you needed was a computer and an idea.
          </p>

          <p>
            But the old operating system never fully uninstalled. It just got a
            new skin. &ldquo;Stanford dropout&rdquo; replaced &ldquo;Harvard MBA.&rdquo;
            &ldquo;Ex-Google&rdquo; replaced &ldquo;Ex-Goldman.&rdquo; &ldquo;Sequoia-backed&rdquo; and
            &ldquo;YC alum&rdquo; became the new secret handshake. People still wore labels
            like armor. Still defined themselves by which exclusive club stamped
            their passport.
          </p>

          <h2>Now AI is rewriting the rules entirely.</h2>

          <p>
            This time, it&apos;s not swapping one elite club for another. It&apos;s
            dissolving the very concept of the club.
          </p>

          <p>
            AI empowers the individual. One person with the right vision can now
            do what once required an entire company, a few million dollars, and
            two years. The gatekeepers of every specialized trade are being
            disarmed. The entrance barriers aren&apos;t lowering &mdash; they&apos;re collapsing.
          </p>

          <p>
            The old world ran on networks as identity. Where you went to school.
            Where you worked. Who you married. A few curated keywords that were
            supposed to tell the world who you are.
          </p>

          <p>
            That world is evaporating. And not just because of technology &mdash;
            because of us.
          </p>

          <p>
            A new generation is growing up screen-first. They spend more time in
            digital worlds than interacting in person. Nearly everyone now
            acknowledges the mental health struggles that previous generations
            buried and denied. The old playbook for navigating human
            relationships &mdash; the game, the trick, the pretending &mdash; is too slow,
            too shallow, too lossy for what&apos;s coming.
          </p>

          <p>
            In the age of AI, language is no longer a barrier &mdash; and with
            interfaces like Neuralink, we&apos;ll eventually exchange information
            itself, not simplified symbols of it. We are moving from a world that
            reads your r&eacute;sum&eacute; to a world that reads <em>you</em>. Intelligence has
            expanded so dramatically that we can engage with the full, rich,
            complex reality of a person &mdash; not a compressed label of one.
          </p>

          <p>
            Less posturing. Less performing. More being.
          </p>

          <p>
            No human will outcompete AI on traditional measures of intelligence
            or productivity. That race is over. There&apos;s no need to hide your
            flaws and imperfections anymore. Look at the upside &mdash; there is
            unprecedented opportunity for each of us to shape and forward our
            civilization.
          </p>

          <p>
            The opportunity space is expanding faster than any generation has ever
            witnessed. Entirely new territories to explore, new things to build,
            new problems to solve. We are no longer bound by exclusive clubs,
            titles, or a handful of words trying to compress a human life into a
            label.
          </p>

          <p className="!text-foreground !text-xl font-semibold">
            The era of labels is ending. The era of individuals is here.
          </p>

          <p className="!text-accent font-medium">
            It&apos;s our time to shine.
          </p>

          <div className="glow-line my-10" />

          <p className="!text-text-tertiary italic">
            What labels are you ready to let go of?
          </p>
        </div>
      </article>

      {/* Back to Thoughts */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <Link
          href="/thoughts"
          className="inline-flex items-center text-sm text-text-tertiary hover:text-accent transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Thoughts
        </Link>
      </section>
    </div>
  );
}
