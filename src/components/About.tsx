import { bar } from "../data";
import { CheckIcon, GlassIcon, HeartIcon, MusicIcon, UtensilsIcon } from "./Icons";
import { useUi } from "./UiProvider";

const highlights = [
  {
    icon: GlassIcon,
    title: "Cocktail & Vini",
    text: "Signature drink, spritz e una selezione curata di bottiglie piemontesi.",
    action: "Scopri menu",
    target: "#menu",
  },
  {
    icon: UtensilsIcon,
    title: "Cucina serale",
    text: "Taglieri, burger e piatti fino a tardi — soprattutto nel weekend.",
    action: "Vedi taglieri",
    target: "#menu",
  },
  {
    icon: MusicIcon,
    title: "Musica live",
    text: "Serate con artisti live e un vibe che scalda la notte di Settimo.",
    action: "Gallery live",
    target: "#gallery",
  },
  {
    icon: HeartIcon,
    title: "Spazio per tutti",
    text: "Locale LGBTQ+ friendly, accogliente e senza giudizi.",
    action: "Recensioni",
    target: "#reviews",
  },
];

export function About() {
  const { showToast } = useUi();

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-glow/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-copper/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-glow">Chi siamo</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-cream md:text-5xl lg:text-6xl">
              Un pub con anima,{" "}
              <span className="italic text-amber-glow/90">nel cuore di Settimo</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/65 md:text-lg">
              Logjko 2.0 è il punto di ritrovo per chi cerca un bicchiere fatto bene, una chiacchiera
              senza fretta e un&apos;atmosfera rilassata. Dalla tradizione del pub alle creazioni al
              bancone: qui la notte ha il sapore giusto.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/65 md:text-lg">
              Che sia un aperitivo dopo il lavoro, una cena leggera o un after con gli amici, ti
              aspettiamo in Via Teologo Giuseppe Antonino 7 — a due passi dal centro di Settimo
              Torinese.
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {bar.services.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream/80"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-amber-glow" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={bar.mapsUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => showToast("Apro Google Maps…")}
                className="rounded-full bg-amber-glow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#f0c14b]"
              >
                Come arrivare
              </a>
              <a
                href={bar.phoneHref}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(bar.phone);
                    showToast(`Numero copiato: ${bar.phone}`);
                  } catch {}
                }}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-cream/80 transition hover:border-white/20 hover:text-cream"
              >
                Chiama {bar.phone}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <article
                key={item.title}
                className={`group rounded-2xl border border-white/8 bg-gradient-to-br from-smoke/80 to-charcoal/60 p-6 transition hover:border-amber-glow/30 hover:shadow-lg hover:shadow-amber-glow/5 ${
                  i % 2 === 1 ? "sm:translate-y-6" : ""
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-glow/20 bg-amber-glow/10 text-amber-glow transition group-hover:bg-amber-glow group-hover:text-ink">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
                <a
                  href={item.target}
                  className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-amber-glow/70 transition group-hover:text-amber-glow"
                >
                  {item.action} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
