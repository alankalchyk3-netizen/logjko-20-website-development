import { useState } from "react";
import { menu } from "../data";
import { useUi } from "./UiProvider";

export function Menu() {
  const [active, setActive] = useState(menu[0].id);
  const section = menu.find((m) => m.id === active) ?? menu[0];
  const { showToast, openBooking } = useUi();

  return (
    <section id="menu" className="relative bg-charcoal/50 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-glow/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-glow">Menu</p>
          <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl lg:text-6xl">
            Cosa beviamo stasera?
          </h2>
          <p className="mt-4 text-cream/60">
            Cocktail della casa, vini in bottiglia, birre e cucina — prezzi indicativi €10–20 a
            persona.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink/60 p-1.5 scrollbar-hide">
            {menu.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActive(m.id);
                  showToast(`Menu: ${m.title}`);
                }}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === m.id
                    ? "bg-amber-glow text-ink shadow-md shadow-amber-glow/20"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-10 text-center">
            <h3 className="font-display text-3xl text-cream md:text-4xl">{section.title}</h3>
            <p className="mt-2 text-sm text-mist">{section.subtitle}</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-3">
            {section.items.map((item) => (
              <article
                key={item.name}
                className="group flex items-start justify-between gap-6 rounded-2xl border border-white/5 bg-ink/40 px-5 py-5 transition hover:border-amber-glow/25 hover:bg-ink/70 md:px-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-display text-xl font-medium text-cream md:text-2xl">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span className="rounded-full border border-amber-glow/30 bg-amber-glow/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-glow">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{item.description}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => showToast(`Aggiunto ai preferiti: ${item.name}`, "success")}
                      className="text-[11px] uppercase tracking-wider text-mist transition hover:text-cream"
                    >
                      ♡ Salva
                    </button>
                    <span className="text-mist/30">·</span>
                    <button
                      onClick={openBooking}
                      className="text-[11px] uppercase tracking-wider text-amber-glow/70 transition hover:text-amber-glow"
                    >
                      Ordina al tavolo →
                    </button>
                  </div>
                </div>
                <div className="shrink-0 pt-1 font-display text-xl font-semibold text-amber-glow md:text-2xl">
                  {item.price}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-3">
            <button
              onClick={openBooking}
              className="rounded-full bg-amber-glow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#f0c14b]"
            >
              Prenota e assaggia
            </button>
            <button
              onClick={() => showToast("Menu PDF scaricato (demo)")}
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-cream/70 transition hover:text-cream"
            >
              Scarica menu PDF
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-mist/80">
            Menu illustrativo — chiedi al bancone la carta aggiornata e le specialità del giorno.
          </p>
        </div>
      </div>
    </section>
  );
}
