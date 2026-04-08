"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child animating in (seconds) */
  stagger?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

/**
 * Container that staggers the reveal animation of its children.
 * Wrap each child in <StaggerItem>.
 *
 * @example
 * <StaggerContainer stagger={0.15}>
 *   <StaggerItem><Card title="Ariete" /></StaggerItem>
 *   <StaggerItem><Card title="Toro" /></StaggerItem>
 *   <StaggerItem><Card title="Gemelli" /></StaggerItem>
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={stagger}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
