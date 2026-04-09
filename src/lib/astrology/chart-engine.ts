// ============================================
// AstralChart — Natal Chart Computation Engine
// ============================================
// Uses `astronomia` for Moon sign and Ascendant calculations.
// Sun sign uses our existing boundary-based approach.
// All calculations are in tropical zodiac (Western standard).

import type { ZodiacSign } from "@/types/astrology";
import { getSunSign } from "./sun-sign";

// Re-export sun-sign utilities
export { getSunSign, getElement, getZodiacSymbol } from "./sun-sign";

// ---- Constants ----

const J2000 = 2451545.0;
const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

const SIGN_NAMES: ZodiacSign[] = [
  "Ariete",
  "Toro",
  "Gemelli",
  "Cancro",
  "Leone",
  "Vergine",
  "Bilancia",
  "Scorpione",
  "Sagittario",
  "Capricorno",
  "Acquario",
  "Pesci",
];

// ---- Julian Day Conversion ----

/**
 * Convert a date + optional time (UTC) to Julian Day Number.
 * astronomia's CalendarGregorianToJD expects (year, month, dayFraction).
 */
function dateToJD(date: string, time?: string): number {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  let day = d.getUTCDate();

  if (time) {
    const [hh, mm] = time.split(":").map(Number);
    day += (hh + mm / 60) / 24;
  } else {
    // Default to 12:00 UTC if no time provided (reduces maximum error)
    day += 0.5;
  }

  // Gregorian to JD formula (Meeus, Astronomical Algorithms)
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

// ---- Ecliptic Longitude → Zodiac Sign ----

function longitudeToSign(lonDeg: number): ZodiacSign {
  const normalized = ((lonDeg % 360) + 360) % 360;
  return SIGN_NAMES[Math.floor(normalized / 30)];
}

function longitudeToDegreeInSign(lonDeg: number): number {
  const normalized = ((lonDeg % 360) + 360) % 360;
  return normalized % 30;
}

// ---- Moon Position (via astronomia) ----

/**
 * Compute the Moon's ecliptic longitude for a given Julian Day.
 * Returns longitude in degrees (0–360).
 */
async function getMoonLongitude(jd: number): Promise<number> {
  // Dynamic import to keep this tree-shakeable
  const { moonposition } = await import("astronomia");
  const pos = moonposition.position(jd);
  return (pos.lon * RAD + 360) % 360;
}

// ---- Sun Position (via astronomia, more precise than boundary table) ----

/**
 * Compute the Sun's apparent ecliptic longitude.
 * More accurate than the boundary-table approach — accounts for leap years and exact time.
 */
async function getSunLongitude(jd: number): Promise<number> {
  const { solar } = await import("astronomia");
  const T = (jd - J2000) / 36525.0; // Julian centuries from J2000
  const lonRad = solar.apparentLongitude(T);
  return (lonRad * RAD + 360) % 360;
}

// ---- Nutation & Obliquity ----

async function getNutationAndObliquity(jd: number): Promise<{
  nutLon: number; // nutation in longitude (radians)
  nutObl: number; // nutation in obliquity (radians)
  obliquity: number; // true obliquity (radians)
}> {
  const { nutation } = await import("astronomia");
  const [nutLon, nutObl] = nutation.nutation(jd);
  const eps0 = nutation.meanObliquity(jd);
  return { nutLon, nutObl, obliquity: eps0 + nutObl };
}

// ---- Ascendant Calculation ----

/**
 * Compute the Ascendant (Rising Sign) for a given moment and location.
 *
 * @param jd - Julian Day Number
 * @param latDeg - Observer latitude in degrees (positive = North)
 * @param lonDeg - Observer longitude in degrees (positive = East)
 * @returns Ascendant ecliptic longitude in degrees (0–360)
 */
async function getAscendant(
  jd: number,
  latDeg: number,
  lonDeg: number,
): Promise<number> {
  const T = (jd - J2000) / 36525.0;

  // Greenwich Mean Sidereal Time (degrees) — IAU formula
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - J2000) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;
  gmst = ((gmst % 360) + 360) % 360;

  // Nutation correction
  const { nutLon, obliquity } = await getNutationAndObliquity(jd);
  const nutLonDeg = nutLon * RAD;

  // Local Apparent Sidereal Time (degrees)
  const last =
    (((gmst + nutLonDeg * Math.cos(obliquity) + lonDeg) % 360) + 360) % 360;
  const lastRad = last * DEG;
  const latRad = latDeg * DEG;

  // Ascendant formula (Meeus, Astronomical Algorithms, Ch. 14)
  const ascRad = Math.atan2(
    Math.cos(lastRad),
    -(
      Math.sin(obliquity) * Math.tan(latRad) +
      Math.cos(obliquity) * Math.sin(lastRad)
    ),
  );

  return (ascRad * RAD + 360) % 360;
}

// ---- Public API ----

export interface ChartInput {
  birthDate: string; // ISO date string "YYYY-MM-DD"
  birthTime?: string; // "HH:MM" 24h format
  birthLat?: number; // Latitude (degrees, positive = N)
  birthLng?: number; // Longitude (degrees, positive = E)
}

export interface ComputedChart {
  sunSign: ZodiacSign;
  sunDegree: number;
  moonSign: ZodiacSign | null;
  moonDegree: number | null;
  ascendant: ZodiacSign | null;
  ascendantDegree: number | null;
  /** Whether the moon is within 2° of a sign boundary (less reliable) */
  moonOnCusp: boolean;
  /** What data was available for the calculation */
  dataQuality: "date-only" | "date-time" | "full";
}

/**
 * Compute a natal chart from birth data.
 *
 * - Date only → Sun sign (boundary-based, no astronomia needed)
 * - Date + time → Sun + Moon (via astronomia ephemeris)
 * - Date + time + location → Sun + Moon + Ascendant
 *
 * @param input Birth data
 * @returns Computed chart with available placements
 */
export async function computeNatalChart(
  input: ChartInput,
): Promise<ComputedChart> {
  const { birthDate, birthTime, birthLat, birthLng } = input;
  const hasTime = !!birthTime;
  const hasLocation = birthLat != null && birthLng != null;

  // Determine data quality level
  const dataQuality: ComputedChart["dataQuality"] =
    hasTime && hasLocation ? "full" : hasTime ? "date-time" : "date-only";

  // Sun sign — always available (from date alone)
  const sunSign = getSunSign(birthDate);

  // For more precise calculations, use astronomia
  let sunDegree = 0;
  let moonSign: ZodiacSign | null = null;
  let moonDegree: number | null = null;
  let moonOnCusp = false;
  let ascendant: ZodiacSign | null = null;
  let ascendantDegree: number | null = null;

  if (hasTime) {
    const jd = dateToJD(birthDate, birthTime);

    // Precise Sun longitude
    const sunLon = await getSunLongitude(jd);
    sunDegree = longitudeToDegreeInSign(sunLon);

    // Moon longitude (needs time for accuracy)
    const moonLon = await getMoonLongitude(jd);
    moonSign = longitudeToSign(moonLon);
    moonDegree = longitudeToDegreeInSign(moonLon);
    moonOnCusp = moonDegree < 2 || moonDegree > 28;

    // Ascendant (needs time + location)
    if (hasLocation) {
      const ascLon = await getAscendant(jd, birthLat, birthLng);
      ascendant = longitudeToSign(ascLon);
      ascendantDegree = longitudeToDegreeInSign(ascLon);
    }
  } else {
    // Date-only: use boundary-based sun sign, no precise degree
    sunDegree = 0; // Unknown precise degree
  }

  return {
    sunSign,
    sunDegree,
    moonSign,
    moonDegree,
    ascendant,
    ascendantDegree,
    moonOnCusp,
    dataQuality,
  };
}
