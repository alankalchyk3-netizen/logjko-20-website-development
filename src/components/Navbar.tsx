import { useEffect, useState } from "react";
import { BookmarkIcon, CloseIcon, MenuIcon, PhoneIcon, ShareIcon } from "./Icons";
import { bar } from "../data";
import { useUi } from "./UiProvider";

const links = [
  { href: "#about", label: "Chi siamo" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Recensioni" },
  { href: "#visit", label: "Orari & Contatti" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { showToast, openBooking, saved, toggleSaved } = useUi();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else if (!document.querySelector("[data-booking-open]")) document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleShare = async () => {
    const data = { title: `${bar.name} - Pub a Settimo Torinese`, url: window.location.href, text: `Vieni al ${bar.name}!` };
    try {
      if (navigator.share && navigator.canShare?.(data)) {
        await navigator.share(data);
        showToast("Condiviso!", "success");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copiato negli appunti — condividilo!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copiato!");
      } catch {
        showToast("Condivisione non disponibile su questo device");
      }
    }
  };

  const handleCall = async () => {
    try {
      await navigator.clipboard.writeText(bar.phone);
      showToast(`Numero copiato: ${bar.phone}`, "info");
    } catch {}
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-glow/40 bg-amber-glow/10 font-display text-lg font-semibold text-amber-glow transition group-hover:bg-amber-glow/20">
            L
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold tracking-wide text-cream md:text-2xl">
              Logjko <span className="text-amber-glow">2.0</span>
            </div>
            <div className="hidden text-[10px] uppercase tracking-[0.25em] text-mist sm:block">
              Settimo Torinese
            </div>
          </div>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cream/70 transition hover:text-amber-glow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSaved}
            aria-label={saved ? "Rimuovi dai salvati" : "Salva"}
            className={`hidden h-10 w-10 items-center justify-center rounded-full border transition sm:inline-flex ${
              saved
                ? "border-amber-glow/50 bg-amber-glow/15 text-amber-glow"
                : "border-white/10 text-cream/70 hover:border-white/20 hover:text-cream"
            }`}
          >
            <BookmarkIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Condividi"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:border-white/20 hover:text-cream sm:inline-flex"
          >
            <ShareIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={openBooking}
            className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white md:inline-flex"
          >
            Prenota tavolo
          </button>

          <a
            href={bar.phoneHref}
            onClick={handleCall}
            className="inline-flex items-center gap-2 rounded-full border border-amber-glow/30 bg-amber-glow/10 px-4 py-2.5 text-sm font-medium text-amber-glow transition hover:bg-amber-glow hover:text-ink"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Chiama</span>
            <span className="sm:hidden">Call</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream transition hover:border-amber-glow/40 hover:text-amber-glow lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[73px] bottom-0 z-40 bg-ink/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-6 py-8">
          {links.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: `${i * 40}ms` }}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-4 font-display text-3xl text-cream transition hover:text-amber-glow"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex gap-3">
            <button
              onClick={() => { toggleSaved(); }}
              className={`flex-1 rounded-full border px-5 py-3.5 text-sm font-medium transition ${saved ? "border-amber-glow/40 bg-amber-glow/10 text-amber-glow" : "border-white/10 text-cream/80"}`}
            >
              {saved ? "★ Salvato" : "☆ Salva"}
            </button>
            <button
              onClick={() => { handleShare(); setOpen(false); }}
              className="flex-1 rounded-full border border-white/10 px-5 py-3.5 text-sm font-medium text-cream/80"
            >
              Condividi
            </button>
          </li>
          <li className="pt-4">
            <button
              onClick={() => { setOpen(false); openBooking(); }}
              className="w-full rounded-full bg-cream px-6 py-4 text-base font-semibold text-ink"
            >
              Prenota un tavolo
            </button>
          </li>
          <li className="pt-2">
            <a
              href={bar.phoneHref}
              onClick={() => { handleCall(); setOpen(false); }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-glow px-6 py-4 text-base font-semibold text-ink"
            >
              <PhoneIcon className="h-5 w-5" />
              {bar.phone}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
