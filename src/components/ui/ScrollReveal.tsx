"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Pre-built animation variants for scroll-triggered reveals.
 * Use these with <ScrollReveal variant="fadeUp"> etc.
 */
const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Wraps any content to animate it when it scrolls into view.
 *
 * @example
 * <ScrollReveal variant="fadeUp" delay={0.2}>
 *   <h2>Ciao mondo!</h2>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // custom cubic bezier — snappy but smooth
      }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
