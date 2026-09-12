import SectionHeading from "./SectionHeading";
import { SAVED_TYPES } from "./landingContent";
import TypeIcon from "./TypeIcon";

export default function ContentTypes() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-20">
      <SectionHeading
        eyebrow="What you can save"
        title="One quiet place for everything."
        description="Cognia keeps each format with its context, so a video, a thread, and a note are equally easy to revisit."
      />
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {SAVED_TYPES.map((item) => (
          <div key={item.type} className="flex flex-col gap-2 bg-paper p-7">
            <div className="flex items-center gap-2.5 text-ink">
              <TypeIcon type={item.type} />
              <h3 className="text-sm font-bold">{item.label}</h3>
            </div>
            <p className="text-sm leading-relaxed text-ink/65">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
