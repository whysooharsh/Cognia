import {
  PREVIEW_FILTERS,
  PREVIEW_ITEMS,
  PREVIEW_WORKSPACES,
} from "./landingContent";
import TypeIcon from "./TypeIcon";

function PinMarker() {
  return (
    <span className="inline-flex items-center">
      <svg
        className="h-3.5 w-3.5 fill-current text-amber-500"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
      </svg>
      <span className="sr-only">Pinned</span>
    </span>
  );
}

export default function LibraryPreview() {
  return (
    <section
      aria-label="Product preview"
      className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-20"
    >
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_24px_60px_-24px_rgba(28,27,23,0.18)]">
        <div className="flex items-center justify-between border-b border-ink/10 bg-ink/[0.03] px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <span className="font-mono text-xs font-semibold text-ink/60">
            cognia.app/dashboard
          </span>
          <div className="w-12" aria-hidden="true" />
        </div>

        <div className="bg-paper/50 p-6 text-left md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-full max-w-md flex-1 rounded-xl border border-ink/10 bg-white px-4 py-2 font-mono text-xs text-ink/60"
            >
              Search your brain...
            </div>
            <div
              aria-hidden="true"
              className="hidden shrink-0 rounded-full border border-ink/10 bg-white px-3 py-2 font-mono text-[11px] font-semibold text-ink/60 sm:block"
            >
              Newest
            </div>
            <div
              aria-hidden="true"
              className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper"
            >
              + Add
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mb-4 flex flex-wrap items-center gap-2"
          >
            <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-bold text-paper">
              All Brain
            </span>
            {PREVIEW_WORKSPACES.map((workspace) => (
              <span
                key={workspace.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-ink/60"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: workspace.color }}
                />
                {workspace.name}
                <span className="text-ink/40">{workspace.count}</span>
              </span>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            {PREVIEW_FILTERS.map((filter, index) => (
              <span
                key={filter}
                className={
                  index === 0
                    ? "rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-bold text-paper"
                    : "rounded-full border border-ink/10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-ink/60"
                }
              >
                {filter}
              </span>
            ))}
            <span className="ml-auto font-mono text-[11px] text-ink/50">
              4 items
            </span>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PREVIEW_ITEMS.map((card) => (
              <article
                key={card.id}
                className="flex h-full min-h-[280px] flex-col rounded-2xl border border-ink/10 bg-white p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/5 bg-paper text-ink/70">
                    <TypeIcon type={card.type} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                      {card.typeLabel}
                    </span>
                    {card.isPinned ? <PinMarker /> : null}
                  </div>
                </div>

                <h3
                  title={card.title}
                  className="mb-1 min-h-[2.5rem] line-clamp-2 text-sm font-bold leading-snug text-ink"
                >
                  {card.title}
                </h3>
                <p
                  title={card.content}
                  className="mb-3 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/60"
                >
                  {card.content}
                </p>

                <p className="mb-3 truncate font-mono text-[10px] text-ink/45">
                  {card.source} · {card.savedAt}
                </p>

                <div className="flex flex-wrap gap-1.5 border-t border-ink/5 pt-3">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
