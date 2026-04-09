"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const steps = [
  {
    number: "01",
    icon: "👨‍👩‍👧‍👦",
    title: "Inserisci la tua famiglia",
    description:
      "Aggiungi fino a 4 membri della tua famiglia (6 con Premium). Basta il nome, la relazione e la data di nascita. Se conosci l'ora, ancora meglio!",
    detail: "2 minuti per iniziare",
  },
  {
    number: "02",
    icon: "🪐",
    title: "Calcoliamo le carte astrali",
    description:
      "Il nostro motore astrologico calcola il segno solare, la Luna, l'Ascendante e le posizioni planetarie. Poi confronta ogni coppia di familiari.",
    detail: "Risultati in pochi secondi",
  },
  {
    number: "03",
    icon: "✨",
    title: "Scopri le connessioni",
    description:
      "L'intelligenza artificiale analizza le sinastrie e genera commenti personalizzati — in italiano — sulle dinamiche tra i membri della tua famiglia.",
    detail: "Interpretazioni uniche, non oroscopi generici",
  },
];

export function HowItWorksSection() {
  return (
    <section id="come-funziona" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
              Come funziona
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Tre passi verso le stelle
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-indigo-200/60">
              Non serve sapere nulla di astrologia. Pensiamo a tutto noi.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.15}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all hover:border-indigo-400/30 hover:bg-white/[0.08]">
                {/* Step number — big, faded */}
                <div className="absolute -top-4 -right-2 text-7xl font-black text-white/[0.04] select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
                  {step.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-indigo-200/60">
                  {step.description}
                </p>

                {/* Detail badge */}
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                  <span className="h-1 w-1 rounded-full bg-indigo-400" />
                  {step.detail}
                </div>

                {/* Connecting arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute top-1/2 -right-4 hidden -translate-y-1/2 text-2xl text-white/10 md:block">
                    →
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
