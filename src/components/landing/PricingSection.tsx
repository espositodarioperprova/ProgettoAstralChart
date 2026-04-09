"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const tiers = [
  {
    name: "Gratis",
    emoji: "✨",
    price: "€0",
    priceDetail: "per sempre",
    description:
      "Tutto ciò che serve per iniziare ad esplorare le stelle della tua famiglia.",
    features: [
      "Segno solare per ogni familiare",
      "Luna e Ascendente (con ora di nascita)",
      "Fino a 4 membri della famiglia",
      "1 sinastria completa (una coppia)",
      "Commenti AI di base",
      "Nessuna registrazione richiesta",
    ],
    limitations: ["Sinastrie aggiuntive bloccate", "Commenti AI brevi"],
    cta: "Inizia gratis",
    ctaHref: "/calcola",
    highlighted: false,
  },
  {
    name: "Premium",
    emoji: "💎",
    price: "€4,99",
    priceDetail: "una tantum",
    description:
      "Sblocca tutte le sinastrie, i commenti completi e i consigli personalizzati.",
    features: [
      "Tutto del piano Gratis, più:",
      "Fino a 6 membri della famiglia",
      "Tutte le sinastrie sbloccate (fino a 15 coppie)",
      "Commenti AI approfonditi e completi",
      '"Consigli di vita" personalizzati dall\'AI',
      "Report stampabile / PDF",
      "Supporto prioritario",
    ],
    limitations: [],
    cta: "Sblocca Premium",
    ctaHref: "#",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="prezzi" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
              Prezzi
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Semplice, trasparente, onesto
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-indigo-200/60">
              Inizia gratis. Se vuoi di più, un unico pagamento sblocca tutto.
              Niente abbonamenti nascosti, niente trucchi.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.12}
          className="mt-20 grid gap-8 lg:grid-cols-2"
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all ${
                  tier.highlighted
                    ? "border-indigo-400/40 bg-white/[0.08] shadow-lg shadow-indigo-500/10 backdrop-blur-sm"
                    : "border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-1.5 text-xs font-bold text-white uppercase shadow-lg shadow-indigo-500/20">
                    Consigliato
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tier.emoji}</span>
                    <h3 className="text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-indigo-200/60">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-sm text-indigo-200/50">
                    {tier.priceDetail}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-indigo-100/80"
                    >
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      {feature}
                    </li>
                  ))}
                  {tier.limitations.map((limitation) => (
                    <li
                      key={limitation}
                      className="flex items-start gap-2.5 text-sm text-indigo-200/30"
                    >
                      <span className="mt-0.5">✗</span>
                      {limitation}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-bold transition-all ${
                    tier.highlighted
                      ? "bg-white text-indigo-900 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20"
                      : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust line */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <p className="mt-10 text-center text-sm text-indigo-200/40">
            🔒 Pagamento sicuro via Lemon Squeezy • Nessun abbonamento •
            Soddisfatti o rimborsati
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
