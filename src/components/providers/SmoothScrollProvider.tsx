"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Wraps the app in Lenis smooth scrolling.
 * This gives us that buttery, momentum-based scroll feel
 * that premium websites have.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // smoothness (lower = smoother, 0.1 is a nice default)
        duration: 1.2, // scroll duration
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
