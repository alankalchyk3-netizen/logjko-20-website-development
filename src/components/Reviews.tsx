import { bar, reviews } from "../data";
import { StarIcon } from "./Icons";
import { useUi } from "./UiProvider";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-glow" : "text-white/15"}`}
        />
      ))}
    </div>
  );
}

const distribution = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 22 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 2 },
];

export function Reviews() {
  const { showToast } = useUi();

  return (
    <section id="reviews" className="relative overflow-hidden bg-charcoal/40 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-glow">Recensioni</p>
            <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
              Cosa dicono di noi
            </h2>

            <div className="mt-10 rounded-3xl border border-white/8 bg-ink/50 p-8">
              <div className="flex items-end gap-3">
                <span className="font-display text-6xl font-semibold leading-none text-cream">
                  {bar.rating}
                </span>
                <div className="mb-1">
                  <Stars rating={4} />
                  <p className="mt-1 text-sm text-mist">{bar.reviewCount} recensioni Google</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {distribution.map((d) => (
                  <div key={d.stars} className="flex items-center gap-3">
                    <span className="w-3 text-xs text-mist">{d.stars}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-glow to-copper"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-mist">{d.pct}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    window.open(bar.reviewUrl, "_blank", "noopener,noreferrer");
                    showToast("Apro Google Maps per lasciare una recensione ★");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-amber-glow/40 bg-amber-glow/10 px-5 py-3 text-sm font-medium text-amber-glow transition hover:bg-amber-glow hover:text-ink"
                >
                  Scrivi recensione
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      showToast("Link alle recensioni copiato!", "success");
                    } catch {
                      showToast("Link copiato!");
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-cream/70 transition hover:border-white/20 hover:text-cream"
                >
                  Condividi
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <article
                key={r.name + r.date}
                className="flex flex-col rounded-2xl border border-white/6 bg-gradient-to-b from-smoke/60 to-ink/40 p-6 transition hover:border-white/12"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-glow/15 font-display text-lg font-semibold text-amber-glow">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cream">{r.name}</p>
                      <p className="text-xs text-mist">{r.date}</p>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">{r.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-mist"
                    >
                      {t}
                    </span>
                  ))}
                  <button
                    onClick={() => showToast(`Grazie per il feedback su ${r.tags[0]}!`)}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cream/60 transition hover:text-cream"
                  >
                    utile
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
