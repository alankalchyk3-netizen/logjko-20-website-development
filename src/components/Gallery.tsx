import { useState } from "react";
import { gallery } from "../data";
import { useUi } from "./UiProvider";

const filters = [
  { id: "all", label: "Tutto" },
  { id: "drinks", label: "Drink" },
  { id: "food", label: "Cibo" },
  { id: "vibe", label: "Vibe" },
];

export function Gallery() {
  const [filter, setFilter] = useState("all");
  const { openLightbox, showToast } = useUi();
  const items =
    filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-glow">Gallery</p>
            <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
              L&apos;atmosfera Logjko
            </h2>
            <p className="mt-3 text-sm text-mist">Tocca una foto per ingrandire</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  showToast(`Filtro: ${f.label}`, "info");
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === f.id
                    ? "bg-cream text-ink"
                    : "border border-white/10 text-cream/70 hover:border-white/25 hover:text-cream"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => openLightbox(img.src, img.alt)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
                }`}
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                <span className="text-sm text-cream/90">{img.alt} — clicca per zoom</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
