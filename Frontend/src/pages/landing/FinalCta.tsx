import CtaLink from "./CtaLink";

export default function FinalCta() {
  return (
    <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pb-32 pt-8 text-center lg:px-20">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60">
        Start organizing
      </span>
      <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-ink md:text-6xl">
        Ready to clear the clutter?
      </h2>
      <p className="max-w-xl leading-relaxed text-ink/70">
        Create your minimal second brain for YouTube videos, X threads, notes,
        and bookmarks.
      </p>
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <CtaLink to="/signup" variant="primary">
          Create your second brain
        </CtaLink>
        <CtaLink to="/dashboard" variant="secondary">
          Go to dashboard
        </CtaLink>
      </div>
    </section>
  );
}
