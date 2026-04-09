// ============================================
// AstralChart — Sun Sign Calculator
// ============================================
// Determines the zodiac sign from a date of birth.
// This is the most basic astrology calculation — no ephemeris needed.

import type { ZodiacSign } from "@/types/astrology";

/**
 * Sun sign date boundaries.
 * Each entry: [month, day] = start of that sign.
 * Boundaries are approximate (±1 day depending on year).
 * For cusp dates, a proper ephemeris would be needed.
 */
const SIGN_BOUNDARIES: [number, number, ZodiacSign][] = [
  [1, 20, "Acquario"],
  [2, 19, "Pesci"],
  [3, 21, "Ariete"],
  [4, 20, "Toro"],
  [5, 21, "Gemelli"],
  [6, 21, "Cancro"],
  [7, 23, "Leone"],
  [8, 23, "Vergine"],
  [9, 23, "Bilancia"],
  [10, 23, "Scorpione"],
  [11, 22, "Sagittario"],
  [12, 22, "Capricorno"],
];

/**
 * Get the sun sign (zodiac sign) for a given date.
 *
 * @param date - Date of birth (Date object or ISO string)
 * @returns The zodiac sign in Italian
 */
export function getSunSign(date: Date | string): ZodiacSign {
  const d = typeof date === "string" ? new Date(date) : date;
  const month = d.getMonth() + 1; // 1-12
  const day = d.getDate();

  // Walk backwards through boundaries to find the matching sign
  for (let i = SIGN_BOUNDARIES.length - 1; i >= 0; i--) {
    const [bMonth, bDay, sign] = SIGN_BOUNDARIES[i];
    if (month > bMonth || (month === bMonth && day >= bDay)) {
      return sign;
    }
  }

  // If we get here, the date is before January 20 → Capricorno
  return "Capricorno";
}

/**
 * Get the zodiac element for a sign.
 */
export function getElement(
  sign: ZodiacSign,
): "Fuoco" | "Terra" | "Aria" | "Acqua" {
  const elements: Record<ZodiacSign, "Fuoco" | "Terra" | "Aria" | "Acqua"> = {
    Ariete: "Fuoco",
    Toro: "Terra",
    Gemelli: "Aria",
    Cancro: "Acqua",
    Leone: "Fuoco",
    Vergine: "Terra",
    Bilancia: "Aria",
    Scorpione: "Acqua",
    Sagittario: "Fuoco",
    Capricorno: "Terra",
    Acquario: "Aria",
    Pesci: "Acqua",
  };
  return elements[sign];
}

/**
 * Get the zodiac symbol (Unicode) for a sign.
 */
export function getZodiacSymbol(sign: ZodiacSign): string {
  const symbols: Record<ZodiacSign, string> = {
    Ariete: "♈",
    Toro: "♉",
    Gemelli: "♊",
    Cancro: "♋",
    Leone: "♌",
    Vergine: "♍",
    Bilancia: "♎",
    Scorpione: "♏",
    Sagittario: "♐",
    Capricorno: "♑",
    Acquario: "♒",
    Pesci: "♓",
  };
  return symbols[sign];
}
