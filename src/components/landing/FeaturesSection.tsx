"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const features = [
  {
    icon: "☀️",
    title: "Segno solare e personalità",
    description:
      "Scopri il segno zodiacale di ogni familiare e un profilo caratteriale completo, scritto dall'AI in italiano naturale — non la solita frase copia-incolla.",
    tier: "free" as const,
  },
  {
    icon: "🌙",
    title: "Luna e Ascendente",
    description:
      "Con l'ora di nascita sbloccherai il segno lunare (le tue emozioni profonde) e l'Ascendente (come ti presenti al mondo). Due dimensioni che cambiano tutto.",
    tier: "free" as const,
  },
  {
    icon: "💞",
    title: "Sinastria familiare",
    description:
      "La magia di AstralChart: confrontiamo le carte astrali di ogni coppia di familiari e analizziamo affinità, sfide e dinamiche relazionali.",
    tier: "premium" as const,
  },
  {
    icon: "🤖",
    title: "Motore astronomico + AI",
    description:
      'Prima il motore calcola posizioni planetarie reali con effemeridi professionali. Poi l\'AI interpreta quei dati — non li inventa. Un risultato che non otterrai "chiedendo a ChatGPT", perché un LLM da solo non sa fare calcoli astronomici.',
    tier: "premium" as const,
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Fino a 6 membri",
    description:
      "Mamma, papà, fratelli, partner, nonni — aggiungi fino a 4 familiari gratis (6 con Premium). 15 possibili sinastrie da esplorare!",
    tier: "free" as const,
  },
  {
    icon: "📄",
    title: "Report stampabile",
    description:
      "I risultati sono progettati per essere stampati e regalati. Un'idea perfetta per compleanni, Natale o semplicemente per sorprendere chi ami.",
    tier: "premium" as const,
  },
];

export function FeaturesSection() {
  return (
    <section id="funzionalita" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
              Funzionalità
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Tutto ciò che ti serve per esplorare le stelle
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-indigo-200/60">
              Da una semplice curiosità sul segno zodiacale a un&apos;analisi
              astrologica completa di tutta la famiglia. Inizia gratis, vai in
              profondità quando vuoi.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.1}
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all hover:border-indigo-400/30 hover:bg-white/[0.08]">
                {/* Tier badge */}
                {feature.tier === "free" ? (
                  <span className="absolute top-5 right-5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Gratis
                  </span>
                ) : (
                  <span className="absolute top-5 right-5 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
                    Premium
                  </span>
                )}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-indigo-200/60">
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
