// ============================================
// AstralChart — Core Astrology Types
// ============================================

/** The 12 zodiac signs */
export type ZodiacSign =
  | "Ariete"
  | "Toro"
  | "Gemelli"
  | "Cancro"
  | "Leone"
  | "Vergine"
  | "Bilancia"
  | "Scorpione"
  | "Sagittario"
  | "Capricorno"
  | "Acquario"
  | "Pesci";

/** Zodiac sign metadata */
export interface ZodiacSignInfo {
  name: ZodiacSign;
  symbol: string; // Unicode symbol (♈, ♉, etc.)
  element: "Fuoco" | "Terra" | "Aria" | "Acqua";
  quality: "Cardinale" | "Fisso" | "Mutevole";
  ruler: string; // Ruling planet
  dateRange: string; // e.g. "21 marzo – 19 aprile"
}

/** Celestial body / planet */
export type Planet =
  | "Sole"
  | "Luna"
  | "Mercurio"
  | "Venere"
  | "Marte"
  | "Giove"
  | "Saturno"
  | "Urano"
  | "Nettuno"
  | "Plutone";

/** Position of a planet in the chart */
export interface PlanetPosition {
  planet: Planet;
  sign: ZodiacSign;
  degree: number; // 0-359.99
  house?: number; // 1-12, optional (requires birth time + location)
  retrograde?: boolean;
}

/** Aspect between two planets */
export type AspectType =
  | "Congiunzione"
  | "Opposizione"
  | "Trigono"
  | "Quadratura"
  | "Sestile";

export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  orb: number; // how exact the aspect is (in degrees)
}

/** A complete natal chart for one person */
export interface NatalChart {
  sunSign: ZodiacSign;
  moonSign?: ZodiacSign; // Requires birth time
  ascendant?: ZodiacSign; // Requires birth time (+ location for precision)
  planets: PlanetPosition[];
  houses?: number[]; // 12 house cusps in degrees
  aspects: Aspect[];
}

/** Synastry result between two people */
export interface SynastryResult {
  personA: string; // Name or ID
  personB: string;
  aspects: Aspect[]; // Cross-chart aspects
  compatibility: number; // 0-100 score (rough indicator)
  summary?: string; // AI-generated summary
}

/** Relationship types for family members */
export type Relationship =
  | "Madre"
  | "Padre"
  | "Fratello"
  | "Sorella"
  | "Figlio"
  | "Figlia"
  | "Partner"
  | "Nonno"
  | "Nonna"
  | "Zio"
  | "Zia"
  | "Cugino"
  | "Cugina"
  | "Altro";

/** A family member as entered by the user */
export interface FamilyMemberInput {
  id: string; // Client-side ID (cuid or uuid)
  name: string;
  relationship: Relationship;
  birthDate: string; // ISO date string (YYYY-MM-DD)
  birthTime?: string; // HH:MM format (24h), optional
  birthCity?: string; // Optional — for location-based calculations
  birthLat?: number;
  birthLng?: number;
}

/** A family member with computed chart data */
export interface FamilyMemberWithChart extends FamilyMemberInput {
  chart: NatalChart;
}

/** Full analysis result */
export interface AnalysisResult {
  members: FamilyMemberWithChart[];
  synastryPairs: SynastryResult[];
  generatedAt: string; // ISO timestamp
}

/** Zodiac signs constant data (Italian) */
export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    name: "Ariete",
    symbol: "♈",
    element: "Fuoco",
    quality: "Cardinale",
    ruler: "Marte",
    dateRange: "21 marzo – 19 aprile",
  },
  {
    name: "Toro",
    symbol: "♉",
    element: "Terra",
    quality: "Fisso",
    ruler: "Venere",
    dateRange: "20 aprile – 20 maggio",
  },
  {
    name: "Gemelli",
    symbol: "♊",
    element: "Aria",
    quality: "Mutevole",
    ruler: "Mercurio",
    dateRange: "21 maggio – 20 giugno",
  },
  {
    name: "Cancro",
    symbol: "♋",
    element: "Acqua",
    quality: "Cardinale",
    ruler: "Luna",
    dateRange: "21 giugno – 22 luglio",
  },
  {
    name: "Leone",
    symbol: "♌",
    element: "Fuoco",
    quality: "Fisso",
    ruler: "Sole",
    dateRange: "23 luglio – 22 agosto",
  },
  {
    name: "Vergine",
    symbol: "♍",
    element: "Terra",
    quality: "Mutevole",
    ruler: "Mercurio",
    dateRange: "23 agosto – 22 settembre",
  },
  {
    name: "Bilancia",
    symbol: "♎",
    element: "Aria",
    quality: "Cardinale",
    ruler: "Venere",
    dateRange: "23 settembre – 22 ottobre",
  },
  {
    name: "Scorpione",
    symbol: "♏",
    element: "Acqua",
    quality: "Fisso",
    ruler: "Plutone",
    dateRange: "23 ottobre – 21 novembre",
  },
  {
    name: "Sagittario",
    symbol: "♐",
    element: "Fuoco",
    quality: "Mutevole",
    ruler: "Giove",
    dateRange: "22 novembre – 21 dicembre",
  },
  {
    name: "Capricorno",
    symbol: "♑",
    element: "Terra",
    quality: "Cardinale",
    ruler: "Saturno",
    dateRange: "22 dicembre – 19 gennaio",
  },
  {
    name: "Acquario",
    symbol: "♒",
    element: "Aria",
    quality: "Fisso",
    ruler: "Urano",
    dateRange: "20 gennaio – 18 febbraio",
  },
  {
    name: "Pesci",
    symbol: "♓",
    element: "Acqua",
    quality: "Mutevole",
    ruler: "Nettuno",
    dateRange: "19 febbraio – 20 marzo",
  },
];

/** Relationship options for the dropdown */
export const RELATIONSHIPS: Relationship[] = [
  "Madre",
  "Padre",
  "Fratello",
  "Sorella",
  "Figlio",
  "Figlia",
  "Partner",
  "Nonno",
  "Nonna",
  "Zio",
  "Zia",
  "Cugino",
  "Cugina",
  "Altro",
];

/** Max family members per tier */
export const MAX_MEMBERS_FREE = 4;
export const MAX_MEMBERS_PREMIUM = 6;

/** Free synastry pairs limit */
export const FREE_SYNASTRY_PAIRS = 1;
