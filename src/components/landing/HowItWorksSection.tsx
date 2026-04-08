"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const steps = [
  {
    number: "01",
    icon: "📝",
    title: "Inserisci i dati",
    description:
      "Aggiungi i membri della tua famiglia con data, ora e luogo di nascita.",
  },
  {
    number: "02",
    icon: "🔮",
    title: "Calcola le carte",
    description:
      "Il nostro motore astrologico calcola carte natali complete e sinastrie.",
  },
  {
    number: "03",
    icon: "✨",
    title: "Scopri le connessioni",
    description:
      "L'intelligenza artificiale genera commenti personalizzati sulle dinamiche familiari.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="come-funziona"
      className="relative bg-slate-900 py-24 sm:py-32"
    >
      {/* Subtle gradient divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
              Come funziona
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Tre passi verso le stelle
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.15}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-indigo-500/30 hover:bg-white/[0.07]">
                <span className="text-5xl">{step.icon}</span>
                <div className="mt-4 text-xs font-bold tracking-widest text-indigo-400/60 uppercase">
                  Passo {step.number}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-indigo-200/70">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
