"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const navLinks = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Funzionalità", href: "#funzionalita" },
  { label: "Prezzi", href: "#prezzi" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const ref = useRef(null);

  // Navbar becomes solid after scrolling past the hero
  // #1e1b4b = indigo-950, matching the unified page gradient
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(30, 27, 75, 0)", "rgba(30, 27, 75, 0.95)"],
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"],
  );

  return (
    <motion.nav
      ref={ref}
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/0 transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white">
          🌟 <span className="hidden sm:inline">AstralChart</span>
        </a>

        {/* Nav links — hidden on mobile for now */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-indigo-200 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/calcola"
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-indigo-900 shadow-lg shadow-white/10 transition-all hover:shadow-xl hover:shadow-white/20"
        >
          Calcola gratis
        </a>
      </div>
    </motion.nav>
  );
}
