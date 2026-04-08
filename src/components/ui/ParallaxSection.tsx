"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  /** How much parallax offset (in pixels). Positive = moves down slower. */
  offset?: number;
  className?: string;
}

/**
 * Makes its children move at a different scroll speed than the page,
 * creating a depth/parallax effect.
 *
 * @example
 * <ParallaxSection offset={100}>
 *   <img src="/stars.svg" />
 * </ParallaxSection>
 */
export function ParallaxSection({
  children,
  offset = 50,
  className,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
