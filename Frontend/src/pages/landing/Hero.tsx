import CtaLink from "./CtaLink";

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-7 px-6 pb-16 pt-32 text-center lg:px-20 lg:pt-40">
      <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink">
        <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-paper">
          New
        </span>
        Workspaces are here
      </p>

      <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
        Meet Cognia, your
        <br />
        <span className="font-serif-italic text-ink/90">
          personal digital brain.
        </span>
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
        Save YouTube videos, X threads, notes, and links in one calm,
        distraction-free workspace. Organize with tags and workspaces, find
        anything in seconds.
      </p>

      <div className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <CtaLink to="/signup" variant="primary">
          Create your second brain
        </CtaLink>
        <CtaLink to="/signin" variant="secondary">
          Sign in
        </CtaLink>
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
        Free to start · No feed · Private by default
      </p>
    </section>
  );
}
