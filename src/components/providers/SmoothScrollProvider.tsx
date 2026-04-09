"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps the app in Lenis smooth scrolling — but ONLY on the
 * marketing/landing pages. App pages like /calcola use native
 * scroll so users can reach the bottom comfortably.
 */

const SMOOTH_SCROLL_PATHS = ["/"];

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enableSmooth = SMOOTH_SCROLL_PATHS.includes(pathname);

  if (!enableSmooth) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
