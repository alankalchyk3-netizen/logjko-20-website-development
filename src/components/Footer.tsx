import { bar } from "../data";
import { InstagramIcon, MapPinIcon, PhoneIcon } from "./Icons";
import { useUi } from "./UiProvider";

export function Footer() {
  const { showToast } = useUi();

  return (
    <footer className="border-t border-white/8 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-glow/40 bg-amber-glow/10 font-display text-lg font-semibold text-amber-glow">
                L
              </span>
              <span className="font-display text-2xl font-semibold text-cream">
                Logjko <span className="text-amber-glow">2.0</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Pub e cocktail bar a Settimo Torinese. Drink, cucina serale e notti da ricordare.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => window.open(bar.instagram, "_blank", "noopener,noreferrer")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-amber-glow/40 hover:text-amber-glow"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  window.open(bar.mapsUrl, "_blank", "noopener,noreferrer");
                  showToast("Apro indicazioni…");
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-amber-glow/40 hover:text-amber-glow"
                aria-label="Maps"
              >
                <MapPinIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => (window.location.href = bar.phoneHref)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-amber-glow/40 hover:text-amber-glow"
                aria-label="Chiama"
              >
                <PhoneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/50">
              Esplora
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                ["#about", "Chi siamo"],
                ["#menu", "Menu"],
                ["#gallery", "Gallery"],
                ["#reviews", "Recensioni"],
                ["#visit", "Orari & Contatti"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-mist transition hover:text-amber-glow">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/50">
              Contatti — tutti funzionanti
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  onClick={() => window.open(bar.mapsUrl, "_blank", "noopener,noreferrer")}
                  className="flex items-start gap-2 text-left text-sm text-mist transition hover:text-cream"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-glow/80" />
                  <span>
                    {bar.address}
                    <br />
                    {bar.city}
                  </span>
                </button>
              </li>
              <li>
                <a
                  href={bar.phoneHref}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(bar.phone);
                    } catch {}
                  }}
                  className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-amber-glow"
                >
                  <PhoneIcon className="h-4 w-4 text-amber-glow/80" />
                  {bar.phone} — clicca per chiamare
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.open(bar.instagram, "_blank", "noopener,noreferrer")}
                  className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-amber-glow"
                >
                  <InstagramIcon className="h-4 w-4 text-amber-glow/80" />
                  @logjko2.0 — apri Instagram
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-mist/70">
            © {new Date().getFullYear()} Logjko 2.0 · Settimo Torinese · Tel {bar.phone}
          </p>
          <p className="text-xs text-mist/50">LGBTQ+ friendly · Dine-in · Asporto · Delivery</p>
        </div>
      </div>
    </footer>
  );
}
