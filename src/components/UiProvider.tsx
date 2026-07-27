import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from "react";
import { CloseIcon } from "./Icons";
import { bar } from "../data";

type Toast = { id: number; message: string; type?: "success" | "info" };

type UiContextType = {
  showToast: (msg: string, type?: Toast["type"]) => void;
  openBooking: () => void;
  closeBooking: () => void;
  openLightbox: (src: string, alt: string) => void;
  closeLightbox: () => void;
  saved: boolean;
  toggleSaved: () => void;
  isBookingOpen: boolean;
};

const UiContext = createContext<UiContextType | null>(null);

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be inside UiProvider");
  return ctx;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const openLightbox = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const toggleSaved = useCallback(() => {
    setSaved((s) => {
      const ns = !s;
      showToast(ns ? "Salvato nei preferiti ★" : "Rimosso dai preferiti", ns ? "success" : "info");
      return ns;
    });
  }, [showToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBookingOpen(false);
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isBookingOpen || lightbox) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isBookingOpen, lightbox]);

  return (
    <UiContext.Provider
      value={{ showToast, openBooking, closeBooking, openLightbox, closeLightbox, saved, toggleSaved, isBookingOpen }}
    >
      {children}

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium shadow-xl backdrop-blur-xl animate-fade-up ${
              t.type === "success"
                ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100"
                : "border-white/10 bg-ink/80 text-cream"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${t.type === "success" ? "bg-emerald-400" : "bg-amber-glow"}`}
            />
            {t.message}
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={closeBooking} />
          <div className="relative flex max-h-[95svh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-charcoal shadow-2xl animate-fade-up sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <h3 className="font-display text-2xl text-cream">Prenota un tavolo</h3>
                <p className="mt-1 text-xs text-mist">Risposta immediata al {bar.phoneDisplayShort}</p>
              </div>
              <button
                onClick={closeBooking}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition hover:text-cream"
                aria-label="Chiudi"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form
              className="flex-1 overflow-y-auto px-6 py-6 sm:px-8"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const name = data.get("name") as string;
                const guests = data.get("guests") as string;
                showToast(`Perfetto ${name}! Tavolo per ${guests} confermato — ti aspettiamo!`, "success");
                closeBooking();
                form.reset();
              }}
            >
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Nome</label>
                  <input
                    required
                    name="name"
                    placeholder="Come ti chiami?"
                    className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-mist/60 focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Telefono</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="3xx xxx xxxx"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-mist/60 focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Persone</label>
                    <select
                      name="guests"
                      defaultValue="2"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "persona" : "persone"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Data</label>
                    <input
                      required
                      name="date"
                      type="date"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Orario</label>
                    <select
                      name="time"
                      defaultValue="21:00"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                    >
                      {[
                        "18:00",
                        "18:30",
                        "19:00",
                        "19:30",
                        "20:00",
                        "20:30",
                        "21:00",
                        "21:30",
                        "22:00",
                        "22:30",
                        "23:00",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-mist">Note (facoltativo)</label>
                  <textarea
                    name="note"
                    rows={3}
                    placeholder="Allergie, compleanno, richiesta speciale..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-mist/60 focus:border-amber-glow/40 focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={closeBooking}
                  className="flex-1 rounded-full border border-white/10 px-6 py-3.5 text-sm font-medium text-cream/70 transition hover:border-white/20 hover:text-cream"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-amber-glow px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-amber-glow/20 transition hover:bg-[#f0c14b]"
                >
                  Conferma prenotazione
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-mist/70">
                Prenotazione demo — in produzione invieremmo SMS/WhatsApp al {bar.phoneDisplayShort}. Puoi anche chiamare direttamente.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" onClick={closeLightbox} />
          <div className="relative w-full max-w-4xl animate-fade-up">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream backdrop-blur-md transition hover:bg-white/10 sm:-right-2"
              aria-label="Chiudi"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[85svh] w-full rounded-2xl object-contain shadow-2xl" />
            <p className="mt-4 text-center text-sm text-cream/60">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </UiContext.Provider>
  );
}
