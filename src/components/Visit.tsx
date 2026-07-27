import { bar, hours, popularTimes } from "../data";
import {
  ClockIcon,
  ExternalLinkIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "./Icons";
import { useUi } from "./UiProvider";

const dayNames = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

export function Visit() {
  const today = dayNames[new Date().getDay()];
  const { showToast, openBooking } = useUi();

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(bar.phone);
      showToast(`Copiato: ${bar.phone} — ora puoi incollarlo!`, "success");
    } catch {
      showToast(bar.phone);
    }
  };

  const handleCall = async () => {
    try {
      await navigator.clipboard.writeText(bar.phone);
      showToast(`Numero copiato: ${bar.phone}`);
    } catch {}
    window.location.href = bar.phoneHref;
  };

  const handleMaps = () => {
    window.open(bar.mapsUrl, "_blank", "noopener,noreferrer");
    showToast("Apro le indicazioni in Google Maps…");
  };

  const handleInstagram = () => {
    window.open(bar.instagram, "_blank", "noopener,noreferrer");
    showToast("Apro Instagram @logjko2.0…");
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${bar.address}, ${bar.city}`);
      showToast("Indirizzo copiato!", "success");
    } catch {
      showToast(`${bar.address}, ${bar.city}`);
    }
  };

  return (
    <section id="visit" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-glow">Vieni a trovarci</p>
          <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl lg:text-6xl">
            Orari & Contatti
          </h2>
          <p className="mt-4 text-cream/60">
            Ti aspettiamo ogni sera. Prenota un tavolo o passa pure — il bancone è sempre pronto.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Contact card */}
          <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-smoke/70 to-charcoal/80 p-8 lg:col-span-1">
            <h3 className="font-display text-2xl text-cream">Info utili</h3>

            <ul className="mt-8 space-y-6">
              <li>
                <button onClick={handleMaps} className="group flex w-full gap-4 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-glow/20 bg-amber-glow/10 text-amber-glow">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-cream group-hover:text-amber-glow">
                      {bar.address}
                    </span>
                    <span className="mt-0.5 block text-sm text-mist">{bar.city}</span>
                    <span className="mt-1 block text-xs text-amber-glow/70 group-hover:text-amber-glow">
                      Apri in Google Maps →
                    </span>
                  </span>
                </button>
              </li>
              <li>
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-glow/20 bg-amber-glow/10 text-amber-glow">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <button onClick={handleCall} className="block text-left text-sm font-medium text-cream hover:text-amber-glow">
                      {bar.phone}
                    </button>
                    <span className="mt-0.5 block text-sm text-mist">Chiama per info o tavolo</span>
                    <button
                      onClick={handleCopyPhone}
                      className="mt-2 text-xs text-mist underline decoration-white/20 underline-offset-4 hover:text-cream"
                    >
                      Copia numero
                    </button>
                  </span>
                </div>
              </li>
              <li>
                <button onClick={handleInstagram} className="group flex w-full gap-4 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-glow/20 bg-amber-glow/10 text-amber-glow">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-cream group-hover:text-amber-glow">
                      @logjko2.0 su Instagram
                    </span>
                    <span className="mt-0.5 block text-sm text-mist">Stories & eventi</span>
                    <span className="mt-1 block text-xs text-amber-glow/70 group-hover:text-amber-glow">Apri profilo →</span>
                  </span>
                </button>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Prenota un tavolo
              </button>

              <button
                type="button"
                onClick={handleMaps}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-glow px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-[#f0c14b]"
              >
                Apri in Maps
                <ExternalLinkIcon className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCall}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-cream transition hover:border-amber-glow/40 hover:text-amber-glow"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Chiama
                </button>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm font-medium text-cream/70 transition hover:border-white/20 hover:text-cream"
                >
                  Copia indirizzo
                </button>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="rounded-3xl border border-white/8 bg-ink/40 p-8">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-amber-glow" />
              <h3 className="font-display text-2xl text-cream">Orari</h3>
            </div>
            <p className="mt-2 text-sm text-emerald-400/90">Aperto · Chiude alle 02:00</p>

            <ul className="mt-8 space-y-1">
              {hours.map((h) => {
                const isToday = h.day === today;
                return (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                      isToday
                        ? "bg-amber-glow/15 text-cream"
                        : "text-cream/70 hover:bg-white/5"
                    }`}
                  >
                    <span className={`font-medium ${isToday ? "text-amber-glow" : ""}`}>
                      {h.day}
                      {isToday && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-glow/80">
                          oggi
                        </span>
                      )}
                    </span>
                    <span>
                      {h.open} – {h.close}
                    </span>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={openBooking}
              className="mt-8 w-full rounded-full border border-amber-glow/30 bg-amber-glow/10 px-5 py-3 text-sm font-medium text-amber-glow transition hover:bg-amber-glow hover:text-ink"
            >
              Prenota nel giorno più tranquillo →
            </button>
          </div>

          {/* Popular times */}
          <div className="rounded-3xl border border-white/8 bg-ink/40 p-8">
            <h3 className="font-display text-2xl text-cream">Orari più frequentati</h3>
            <p className="mt-2 text-sm text-mist">Tipico serale · lunedì–domenica</p>

            <div className="mt-10 flex h-44 items-end justify-between gap-2">
              {popularTimes.map((t) => (
                <div key={t.hour} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-copper to-amber-glow transition-all"
                      style={{
                        height: `${t.level}%`,
                        opacity: 0.45 + t.level / 200,
                      }}
                      title={`${t.level}%`}
                    />
                  </div>
                  <span className="text-[10px] text-mist">{t.hour}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-mist">
              Il picco è tra le 21 e mezzanotte — perfetto per cocktail e live.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {bar.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-cream/70"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/8 group">
          <iframe
            title="Mappa Logjko 2.0"
            src={bar.mapsEmbedUrl}
            className="h-72 w-full grayscale invert-[0.92] contrast-125 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          <button
            onClick={handleMaps}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-ink/90 px-5 py-4 backdrop-blur-xl border border-white/10 shadow-xl transition hover:bg-ink sm:left-6 sm:right-auto sm:min-w-[340px]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-glow text-ink">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-cream">Logjko 2.0</p>
                <p className="text-xs text-mist">{bar.address}</p>
              </div>
            </div>
            <ExternalLinkIcon className="h-4 w-4 text-mist" />
          </button>
        </div>
      </div>
    </section>
  );
}
