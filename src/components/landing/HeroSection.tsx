"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { motion } from "framer-motion";

/* Decorative star field — three parallax layers at different speeds */
function StarField() {
  const starsBack = [
    { top: "8%", left: "5%", size: 2 },
    { top: "15%", left: "22%", size: 1.5 },
    { top: "12%", left: "48%", size: 1 },
    { top: "25%", left: "75%", size: 2 },
    { top: "8%", left: "88%", size: 1.5 },
    { top: "35%", left: "12%", size: 1 },
    { top: "45%", left: "65%", size: 2 },
    { top: "55%", left: "30%", size: 1 },
    { top: "62%", left: "82%", size: 1.5 },
    { top: "72%", left: "8%", size: 1 },
    { top: "78%", left: "55%", size: 2 },
    { top: "85%", left: "40%", size: 1 },
    { top: "90%", left: "72%", size: 1.5 },
    { top: "18%", left: "62%", size: 1 },
    { top: "42%", left: "92%", size: 1.5 },
  ];

  const starsMid = [
    { top: "10%", left: "15%", size: 2.5 },
    { top: "20%", left: "40%", size: 2 },
    { top: "30%", left: "70%", size: 3 },
    { top: "50%", left: "20%", size: 2 },
    { top: "60%", left: "50%", size: 2.5 },
    { top: "75%", left: "85%", size: 2 },
    { top: "40%", left: "35%", size: 2.5 },
    { top: "88%", left: "15%", size: 2 },
  ];

  return (
    <>
      <ParallaxSection
        offset={30}
        className="pointer-events-none absolute inset-0"
      >
        {starsBack.map((star, i) => (
          <div
            key={`b-${i}`}
            className="animate-twinkle absolute rounded-full bg-white/30"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </ParallaxSection>

      <ParallaxSection
        offset={60}
        className="pointer-events-none absolute inset-0"
      >
        {starsMid.map((star, i) => (
          <div
            key={`m-${i}`}
            className="animate-twinkle absolute rounded-full bg-white/50"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${i * 0.6 + 0.2}s`,
            }}
          />
        ))}
      </ParallaxSection>

      <ParallaxSection
        offset={100}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="animate-twinkle absolute rounded-full bg-indigo-300/60 blur-[1px]"
          style={{
            top: "18%",
            left: "30%",
            width: 4,
            height: 4,
            animationDelay: "0s",
          }}
        />
        <div
          className="animate-twinkle absolute rounded-full bg-purple-300/50 blur-[1px]"
          style={{
            top: "45%",
            left: "75%",
            width: 3,
            height: 3,
            animationDelay: "1.2s",
          }}
        />
        <div
          className="animate-twinkle absolute rounded-full bg-indigo-200/70 blur-[1px]"
          style={{
            top: "70%",
            left: "15%",
            width: 4,
            height: 4,
            animationDelay: "0.8s",
          }}
        />
        <div
          className="animate-twinkle absolute rounded-full bg-violet-300/40 blur-[1px]"
          style={{
            top: "30%",
            left: "85%",
            width: 3,
            height: 3,
            animationDelay: "2s",
          }}
        />
      </ParallaxSection>
    </>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <StarField />

      {/* Central radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/10 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        {/* Social proof badge */}
        <ScrollReveal variant="fadeIn" duration={0.5} immediate>
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="animate-pulse-glow inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-indigo-200">
              Già 1.200+ famiglie hanno scoperto le loro stelle
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" duration={0.8} immediate>
          <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Scopri le stelle
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              della tua famiglia
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2} immediate>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-indigo-100/80 sm:text-xl">
            Inserisci le date di nascita dei tuoi familiari e scopri come i
            vostri segni zodiacali si intrecciano.{" "}
            <span className="font-medium text-indigo-200">
              Sinastrie dettagliate, commenti personalizzati dall&apos;AI,
            </span>{" "}
            tutto in italiano.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.4} immediate>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/calcola"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-900 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
            >
              <span className="relative z-10">Calcola gratis →</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#come-funziona"
              className="rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-indigo-200 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              Come funziona?
            </a>
          </div>
        </ScrollReveal>

        {/* Zodiac symbols row */}
        <ScrollReveal variant="fadeUp" delay={0.6} immediate>
          <div className="mx-auto mt-16 flex max-w-md items-center justify-center gap-3 opacity-60">
            {[
              "♈",
              "♉",
              "♊",
              "♋",
              "♌",
              "♍",
              "♎",
              "♏",
              "♐",
              "♑",
              "♒",
              "♓",
            ].map((symbol, i) => (
              <span
                key={i}
                className="text-lg text-white/40 transition-all hover:scale-125 hover:text-white/80"
              >
                {symbol}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mx-auto h-10 w-6 rounded-full border-2 border-indigo-400/30 p-1">
            <div className="mx-auto h-2 w-1.5 rounded-full bg-indigo-400/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
