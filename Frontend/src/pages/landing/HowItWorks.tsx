import SectionHeading from "./SectionHeading";
import { HOW_IT_WORKS_STEPS } from "./landingContent";

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-ink/60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="features"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 lg:px-20"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Save, organize, retrieve."
        description="A simple loop designed for fast retrieval, not endless organizing."
      />

      <ol className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li key={step.index} className="flex flex-col gap-4 bg-paper p-8">
            <span className="inline-flex w-fit rounded-full bg-ink/5 px-3 py-1 font-mono text-xs font-bold text-ink">
              {step.index}
            </span>
            <h3 className="font-serif text-2xl font-medium tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink/70">
              {step.description}
            </p>
            <ul className="mt-auto flex flex-col gap-2 border-t border-ink/10 pt-4">
              {step.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm font-medium text-ink/75"
                >
                  <Check />
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
