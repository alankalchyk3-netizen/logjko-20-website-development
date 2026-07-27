import { bar, heroImage } from "../data";
import { BookmarkIcon, MapPinIcon, NavigationIcon, ShareIcon, StarIcon } from "./Icons";
import { useUi } from "./UiProvider";

export function Hero() {
  const { showToast, openBooking, saved, toggleSaved } = useUi();

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: bar.name, text: `Vieni al ${bar.name}!`, url });
        showToast("Condiviso con successo!", "success");
      } else {
        await navigator.clipboard.writeText(url);
        showToast("Link copiato — condividilo con gli amici!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copiato!");
      } catch {}
    }
  };

  const handleSendToPhone = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href + " — " + bar.address + ", " + bar.city);
      showToast("Indirizzo e link copiati! Incollali sul telefono 📱");
    } catch {
      showToast("Indirizzo: " + bar.address + ", " + bar.city);
    }
  };

  const handleMaps = () => {
    window.open(bar.mapsUrl, "_blank", "noopener,noreferrer");
    showToast("Apro Google Maps per le indicazioni…");
  };

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Atmosfera serale al Logjko 2.0"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 md:justify-center md:px-8 md:pb-24 md:pt-28">
        <div className="max-w-2xl">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm text-cream/90">Aperto · Chiude alle 02:00</span>
          </div>

          <p className="animate-fade-up delay-100 mb-3 text-sm uppercase tracking-[0.35em] text-amber-glow">
            {bar.tagline}
          </p>

          <h1 className="animate-fade-up delay-200 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-cream sm:text-7xl md:text-8xl">
            Logjko
            <span className="block gold-gradient italic">2.0</span>
          </h1>

          <p className="animate-fade-up delay-300 mt-6 max-w-lg text-base leading-relaxed text-cream/70 md:text-lg">
            Il pub di Settimo Torinese dove cocktail della casa, vini piemontesi e cucina serale
            incontrano musica live e un&apos;atmosfera che fa sentire a casa.
          </p>

          <div className="animate-fade-up delay-400 mt-8 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "text-amber-glow" : "text-amber-glow/40"}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-cream">{bar.rating}</span>
              <span className="text-sm text-mist">({bar.reviewCount} recensioni)</span>
            </div>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span className="text-sm text-mist">{bar.priceRange} a persona</span>
          </div>

          <div className="animate-fade-up delay-500 mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center justify-center rounded-full bg-amber-glow px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-amber-glow/25 transition hover:bg-[#f0c14b] hover:shadow-amber-glow/40"
            >
              Prenota tavolo
            </button>
            <button
              type="button"
              onClick={handleMaps}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition hover:border-amber-glow/40 hover:bg-white/10"
            >
              <MapPinIcon className="h-4 w-4 text-amber-glow" />
              Indicazioni
            </button>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm font-medium text-cream/80 transition hover:border-white/20 hover:text-cream"
            >
              Menu
            </a>
          </div>

          {/* Google Maps style action bar */}
          <div className="animate-fade-up delay-500 mt-10 flex flex-wrap gap-2.5 border-t border-white/10 pt-8">
            <button
              onClick={toggleSaved}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                saved
                  ? "border-amber-glow/40 bg-amber-glow/15 text-amber-glow"
                  : "border-white/10 bg-white/5 text-cream/70 hover:text-cream hover:border-white/20"
              }`}
            >
              <BookmarkIcon className="h-4 w-4" />
              {saved ? "Salvato" : "Salva"}
            </button>

            <button
              onClick={handleSendToPhone}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream/70 transition hover:text-cream hover:border-white/20"
            >
              <MapPinIcon className="h-4 w-4" />
              Invia al telefono
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream/70 transition hover:text-cream hover:border-white/20"
            >
              <ShareIcon className="h-4 w-4" />
              Condividi
            </button>

            <button
              onClick={handleMaps}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream/70 transition hover:text-cream hover:border-white/20"
            >
              <NavigationIcon className="h-4 w-4" />
              Nelle vicinanze
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden flex-col items-end gap-1 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-mist">Scorri</span>
        <div className="h-12 w-px bg-gradient-to-b from-amber-glow to-transparent animate-shimmer" />
      </div>
    </section>
  );
}
