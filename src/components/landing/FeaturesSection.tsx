"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const features = [
  {
    icon: "🌙",
    title: "Carta natale completa",
    description:
      "Sole, Luna, Ascendente, tutti i pianeti, le case e gli aspetti. Non solo il segno zodiacale.",
    tier: "premium",
  },
  {
    icon: "💞",
    title: "Sinastria familiare",
    description:
      "Analisi delle interazioni astrali tra ogni coppia di membri della tua famiglia.",
    tier: "premium",
  },
  {
    icon: "🤖",
    title: "Commenti AI",
    description:
      "Interpretazioni profonde e personalizzate, generate dall'intelligenza artificiale. In italiano.",
    tier: "premium",
  },
  {
    icon: "♈",
    title: "Segno zodiacale",
    description:
      "Scopri il segno solare di ogni membro della famiglia. Gratis, senza registrazione.",
    tier: "free",
  },
  {
    icon: "📊",
    title: "Grafici interattivi",
    description:
      "Visualizza le carte astrali con grafici circolari interattivi e bellissimi.",
    tier: "premium",
  },
  {
    icon: "📄",
    title: "Esporta in PDF",
    description:
      "Scarica un report completo da stampare o regalare ai tuoi familiari.",
    tier: "premium",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="funzionalita"
      className="relative bg-gradient-to-b from-slate-900 to-indigo-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
              Funzionalità
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Tutto ciò che ti serve
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-indigo-200/70">
              Da una semplice curiosità sul segno zodiacale a un&apos;analisi
              astrologica completa della tua famiglia.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.1}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-indigo-500/30 hover:bg-white/[0.07]">
                {feature.tier === "free" && (
                  <span className="absolute top-4 right-4 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    Gratis
                  </span>
                )}
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-200/70">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
