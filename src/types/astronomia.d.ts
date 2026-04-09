// Type declarations for astronomia (no @types package available)
declare module "astronomia" {
  export const moonposition: {
    position(jd: number): { lon: number; lat: number; range: number };
  };

  export const solar: {
    apparentLongitude(T: number): number;
    trueLongitude(T: number): number;
  };

  export const nutation: {
    nutation(jd: number): [number, number]; // [nutLon, nutObl] in radians
    meanObliquity(jd: number): number; // radians
  };

  export const sidereal: {
    apparent(jd: number): number;
    mean(jd: number): number;
  };

  export const julian: {
    CalendarGregorianToJD(year: number, month: number, day: number): number;
    JDToCalendarGregorian(jd: number): [number, number, number];
    DateToJD(d: Date): number;
  };

  export const planetposition: {
    position(
      planet: unknown,
      jd: number,
    ): { lon: number; lat: number; range: number };
  };

  export const coord: {
    eclipticToEquatorial(
      eclCoord: { lon: number; lat: number },
      obliquity: number,
    ): { ra: number; dec: number };
  };
}
