"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const tiers = [
  {
    name: "Curiosi",
    emoji: "🟢",
    price: "Gratis",
    priceDetail: "per sempre",
    description: "Per chi vuole scoprire il proprio segno zodiacale.",
    features: [
      "Segno solare di ogni familiare",
      "Fino a 2 membri della famiglia",
      "Tratti base della personalità",
      "Nessuna registrazione richiesta",
    ],
    cta: "Inizia gratis",
    highlighted: false,
  },
  {
    name: "Appassionati",
    emoji: "🟡",
    price: "€4,99",
    priceDetail: "/ mese",
    description: "Per chi vuole andare oltre il segno zodiacale.",
    features: [
      "Tutto di Curiosi, più:",
      "Sole + Luna + Ascendente",
      "Fino a 5 membri della famiglia",
      "Sinastria base tra coppie",
      "Commenti AI introduttivi",
    ],
    cta: "Prova gratis per 7 giorni",
    highlighted: true,
  },
  {
    name: "Premium",
    emoji: "🔴",
    price: "€9,99",
    priceDetail: "/ mese",
    description: "L'esperienza completa per tutta la famiglia.",
    features: [
      "Tutto di Appassionati, più:",
      "Carta natale completa (tutti i pianeti)",
      "Membri della famiglia illimitati",
      "Sinastria dettagliata per ogni coppia",
      "Commenti AI approfonditi",
      "Grafici interattivi",
      "Esportazione PDF",
    ],
    cta: "Prova gratis per 7 giorni",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="prezzi" className="relative bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
              Prezzi
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Scegli il tuo percorso
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-indigo-200/70">
              Inizia gratis, poi scegli il piano che fa per te.
            </p>
          </div>
        </ScrollReveal>

        {/* TODO: Toggle mensile/annuale */}

        <StaggerContainer
          stagger={0.12}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`relative flex flex-col rounded-2xl border p-8 transition-colors ${
                  tier.highlighted
                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white uppercase">
                    Più popolare
                  </span>
                )}

                <div>
                  <span className="text-2xl">{tier.emoji}</span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-indigo-200/60">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-sm text-indigo-200/60">
                    {tier.priceDetail}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-indigo-200/80"
                    >
                      <span className="mt-0.5 text-indigo-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "border border-white/20 text-white hover:border-white/40"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
