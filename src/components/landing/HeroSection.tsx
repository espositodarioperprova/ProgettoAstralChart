"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated background stars (decorative) */}
      <ParallaxSection
        offset={80}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-20 left-[10%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute top-40 left-[25%] h-1.5 w-1.5 rounded-full bg-indigo-300/30" />
        <div className="absolute top-32 left-[60%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute top-60 left-[80%] h-2 w-2 rounded-full bg-indigo-400/20" />
        <div className="absolute top-80 left-[45%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute top-16 left-[90%] h-1.5 w-1.5 rounded-full bg-purple-300/30" />
        <div className="absolute top-[70%] left-[15%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute top-[55%] left-[70%] h-1.5 w-1.5 rounded-full bg-indigo-200/30" />
        <div className="absolute top-[85%] left-[35%] h-1 w-1 rounded-full bg-white/30" />
      </ParallaxSection>

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <ScrollReveal variant="fadeUp" duration={0.8}>
          <h1 className="text-5xl leading-tight font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Scopri le stelle
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              della tua famiglia
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200 sm:text-xl">
            Carte astrali complete, sinastrie dettagliate e commenti
            personalizzati generati dall&apos;intelligenza artificiale. Scopri
            come le stelle influenzano i legami nella tua famiglia.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#prezzi"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/50"
            >
              Inizia gratis →
            </a>
            <a
              href="#come-funziona"
              className="rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-indigo-200 transition-colors hover:border-white/40 hover:text-white"
            >
              Come funziona?
            </a>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mx-auto h-10 w-6 rounded-full border-2 border-indigo-400/40 p-1">
            <div className="mx-auto h-2 w-1.5 rounded-full bg-indigo-400/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
