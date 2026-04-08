"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactSection() {
  return (
    <section id="contatti" className="relative bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal variant="fadeUp">
          <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
            Contatti
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Hai bisogno di aiuto?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-200/70">
            Scrivici e ti risponderemo il prima possibile. Siamo qui per
            aiutarti a scoprire le stelle.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire up to API route or email service
              alert("Grazie! Ti risponderemo presto.");
            }}
            className="mx-auto mt-10 max-w-md space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1 block text-sm font-medium text-indigo-200"
              >
                Nome
              </label>
              <input
                type="text"
                id="contact-name"
                required
                placeholder="Il tuo nome"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-indigo-300/40 transition-colors outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1 block text-sm font-medium text-indigo-200"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                required
                placeholder="la-tua@email.it"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-indigo-300/40 transition-colors outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block text-sm font-medium text-indigo-200"
              >
                Messaggio
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Come possiamo aiutarti?"
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-indigo-300/40 transition-colors outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Invia messaggio
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
