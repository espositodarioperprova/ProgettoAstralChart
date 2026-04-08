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
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"],
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
          href="#prezzi"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Inizia gratis
        </a>
      </div>
    </motion.nav>
  );
}
