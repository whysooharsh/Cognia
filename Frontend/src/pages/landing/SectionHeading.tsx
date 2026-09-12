export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60">
        {eyebrow}
      </span>
      <h2 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="leading-relaxed text-ink/70">{description}</p>
      ) : null}
    </div>
  );
}
