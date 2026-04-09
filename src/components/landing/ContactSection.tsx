"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactSection() {
  return (
    <section id="contatti" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
              Contatti
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Parliamo delle stelle
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-indigo-200/60">
              Hai una domanda, un feedback o un&apos;idea? Scrivici. Ti
              rispondiamo entro 24 ore (spesso molto prima).
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.15}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-14 space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-indigo-200/50 uppercase"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Mario"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-indigo-200/30 transition-colors outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/20"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-indigo-200/50 uppercase"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="mario@esempio.it"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-indigo-200/30 transition-colors outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-medium tracking-wide text-indigo-200/50 uppercase"
              >
                Messaggio
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Raccontaci come possiamo aiutarti..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-indigo-200/30 transition-colors outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-indigo-900 shadow-lg shadow-white/10 transition-all hover:shadow-xl hover:shadow-white/20 sm:w-auto sm:px-10"
            >
              Invia messaggio →
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
