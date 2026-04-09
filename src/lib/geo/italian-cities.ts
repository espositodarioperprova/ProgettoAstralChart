// ============================================
// AstralChart — Italian Cities Database
// ============================================
// Pre-built list of major Italian cities with coordinates.
// Covers ~95% of Italian users. For international cities,
// we'll add Nominatim geocoding later (see PLAN.md).

export interface CityData {
  name: string;
  province: string;
  lat: number;
  lng: number;
}

/**
 * Top ~120 Italian cities by population + all provincial capitals.
 * Sorted alphabetically.
 */
export const ITALIAN_CITIES: CityData[] = [
  { name: "Agrigento", province: "AG", lat: 37.3111, lng: 13.5765 },
  { name: "Alessandria", province: "AL", lat: 44.9125, lng: 8.6153 },
  { name: "Ancona", province: "AN", lat: 43.6158, lng: 13.5189 },
  { name: "Aosta", province: "AO", lat: 45.7375, lng: 7.3154 },
  { name: "Arezzo", province: "AR", lat: 43.4631, lng: 11.8784 },
  { name: "Ascoli Piceno", province: "AP", lat: 42.8537, lng: 13.5749 },
  { name: "Asti", province: "AT", lat: 44.9007, lng: 8.2066 },
  { name: "Avellino", province: "AV", lat: 40.9147, lng: 14.7906 },
  { name: "Bari", province: "BA", lat: 41.1171, lng: 16.8719 },
  { name: "Barletta", province: "BT", lat: 41.3189, lng: 16.2831 },
  { name: "Belluno", province: "BL", lat: 46.1428, lng: 12.2175 },
  { name: "Benevento", province: "BN", lat: 41.1297, lng: 14.7826 },
  { name: "Bergamo", province: "BG", lat: 45.6944, lng: 9.67 },
  { name: "Biella", province: "BI", lat: 45.5629, lng: 8.0578 },
  { name: "Bologna", province: "BO", lat: 44.4942, lng: 11.3464 },
  { name: "Bolzano", province: "BZ", lat: 46.4983, lng: 11.3548 },
  { name: "Brescia", province: "BS", lat: 45.5398, lng: 10.2227 },
  { name: "Brindisi", province: "BR", lat: 40.6327, lng: 17.9417 },
  { name: "Cagliari", province: "CA", lat: 39.2238, lng: 9.1217 },
  { name: "Caltanissetta", province: "CL", lat: 37.4902, lng: 14.0635 },
  { name: "Campobasso", province: "CB", lat: 41.5626, lng: 14.6569 },
  { name: "Caserta", province: "CE", lat: 41.0742, lng: 14.3333 },
  { name: "Catania", province: "CT", lat: 37.5079, lng: 15.083 },
  { name: "Catanzaro", province: "CZ", lat: 38.9101, lng: 16.5878 },
  { name: "Chieti", province: "CH", lat: 42.351, lng: 14.1674 },
  { name: "Como", province: "CO", lat: 45.81, lng: 9.0852 },
  { name: "Cosenza", province: "CS", lat: 39.3003, lng: 16.2509 },
  { name: "Cremona", province: "CR", lat: 45.1333, lng: 10.0167 },
  { name: "Crotone", province: "KR", lat: 39.0811, lng: 17.1175 },
  { name: "Cuneo", province: "CN", lat: 44.3903, lng: 7.5467 },
  { name: "Enna", province: "EN", lat: 37.5667, lng: 14.2833 },
  { name: "Fermo", province: "FM", lat: 43.1604, lng: 13.716 },
  { name: "Ferrara", province: "FE", lat: 44.8381, lng: 11.6198 },
  { name: "Firenze", province: "FI", lat: 43.7696, lng: 11.2558 },
  { name: "Foggia", province: "FG", lat: 41.4621, lng: 15.5444 },
  { name: "Forlì", province: "FC", lat: 44.2224, lng: 12.041 },
  { name: "Frosinone", province: "FR", lat: 41.6396, lng: 13.3428 },
  { name: "Genova", province: "GE", lat: 44.4056, lng: 8.9463 },
  { name: "Gorizia", province: "GO", lat: 45.9412, lng: 13.6219 },
  { name: "Grosseto", province: "GR", lat: 42.7633, lng: 11.1124 },
  { name: "Imperia", province: "IM", lat: 43.8858, lng: 8.0264 },
  { name: "Isernia", province: "IS", lat: 41.594, lng: 14.2328 },
  { name: "L'Aquila", province: "AQ", lat: 42.3506, lng: 13.3996 },
  { name: "La Spezia", province: "SP", lat: 44.1025, lng: 9.8241 },
  { name: "Latina", province: "LT", lat: 41.4674, lng: 12.9044 },
  { name: "Lecce", province: "LE", lat: 40.3517, lng: 18.1718 },
  { name: "Lecco", province: "LC", lat: 45.8566, lng: 9.3977 },
  { name: "Livorno", province: "LI", lat: 43.5485, lng: 10.3106 },
  { name: "Lodi", province: "LO", lat: 45.3103, lng: 9.5016 },
  { name: "Lucca", province: "LU", lat: 43.8376, lng: 10.4951 },
  { name: "Macerata", province: "MC", lat: 43.3002, lng: 13.4536 },
  { name: "Mantova", province: "MN", lat: 45.1564, lng: 10.7914 },
  { name: "Massa", province: "MS", lat: 44.0358, lng: 10.1397 },
  { name: "Matera", province: "MT", lat: 40.6654, lng: 16.6043 },
  { name: "Messina", province: "ME", lat: 38.1937, lng: 15.5542 },
  { name: "Milano", province: "MI", lat: 45.4642, lng: 9.19 },
  { name: "Modena", province: "MO", lat: 44.6471, lng: 10.9252 },
  { name: "Monza", province: "MB", lat: 45.5845, lng: 9.2745 },
  { name: "Napoli", province: "NA", lat: 40.8518, lng: 14.2681 },
  { name: "Novara", province: "NO", lat: 45.4469, lng: 8.6225 },
  { name: "Nuoro", province: "NU", lat: 40.321, lng: 9.3311 },
  { name: "Oristano", province: "OR", lat: 39.9062, lng: 8.5889 },
  { name: "Padova", province: "PD", lat: 45.4064, lng: 11.8768 },
  { name: "Palermo", province: "PA", lat: 38.1157, lng: 13.3615 },
  { name: "Parma", province: "PR", lat: 44.8015, lng: 10.3279 },
  { name: "Pavia", province: "PV", lat: 45.1847, lng: 9.1582 },
  { name: "Perugia", province: "PG", lat: 43.1107, lng: 12.3908 },
  { name: "Pesaro", province: "PU", lat: 43.9104, lng: 12.9132 },
  { name: "Pescara", province: "PE", lat: 42.4584, lng: 14.2089 },
  { name: "Piacenza", province: "PC", lat: 45.0522, lng: 9.6926 },
  { name: "Pisa", province: "PI", lat: 43.7228, lng: 10.4017 },
  { name: "Pistoia", province: "PT", lat: 43.9332, lng: 10.9237 },
  { name: "Pordenone", province: "PN", lat: 45.9565, lng: 12.6602 },
  { name: "Potenza", province: "PZ", lat: 40.6404, lng: 15.8056 },
  { name: "Prato", province: "PO", lat: 43.8807, lng: 11.0969 },
  { name: "Ragusa", province: "RG", lat: 36.925, lng: 14.7306 },
  { name: "Ravenna", province: "RA", lat: 44.4184, lng: 12.2035 },
  { name: "Reggio Calabria", province: "RC", lat: 38.1114, lng: 15.6473 },
  { name: "Reggio Emilia", province: "RE", lat: 44.6989, lng: 10.6297 },
  { name: "Rieti", province: "RI", lat: 42.4037, lng: 12.8581 },
  { name: "Rimini", province: "RN", lat: 44.0678, lng: 12.5695 },
  { name: "Roma", province: "RM", lat: 41.9028, lng: 12.4964 },
  { name: "Rovigo", province: "RO", lat: 45.0702, lng: 11.7908 },
  { name: "Salerno", province: "SA", lat: 40.6824, lng: 14.7681 },
  { name: "Sassari", province: "SS", lat: 40.7259, lng: 8.56 },
  { name: "Savona", province: "SV", lat: 44.3091, lng: 8.4772 },
  { name: "Siena", province: "SI", lat: 43.3188, lng: 11.3308 },
  { name: "Siracusa", province: "SR", lat: 37.0755, lng: 15.2866 },
  { name: "Sondrio", province: "SO", lat: 46.1699, lng: 9.8709 },
  { name: "Sud Sardegna", province: "SU", lat: 39.2153, lng: 9.1128 },
  { name: "Taranto", province: "TA", lat: 40.4685, lng: 17.244 },
  { name: "Teramo", province: "TE", lat: 42.6589, lng: 13.7042 },
  { name: "Terni", province: "TR", lat: 42.5636, lng: 12.6425 },
  { name: "Torino", province: "TO", lat: 45.0703, lng: 7.6869 },
  { name: "Trapani", province: "TP", lat: 38.0174, lng: 12.5365 },
  { name: "Trento", province: "TN", lat: 46.0748, lng: 11.1217 },
  { name: "Treviso", province: "TV", lat: 45.6669, lng: 12.243 },
  { name: "Trieste", province: "TS", lat: 45.6495, lng: 13.7768 },
  { name: "Udine", province: "UD", lat: 46.0711, lng: 13.2346 },
  { name: "Varese", province: "VA", lat: 45.8206, lng: 8.8253 },
  { name: "Venezia", province: "VE", lat: 45.4408, lng: 12.3155 },
  { name: "Verbania", province: "VB", lat: 45.9227, lng: 8.5522 },
  { name: "Vercelli", province: "VC", lat: 45.3257, lng: 8.4286 },
  { name: "Verona", province: "VR", lat: 45.4384, lng: 10.9916 },
  { name: "Vibo Valentia", province: "VV", lat: 38.6724, lng: 16.1006 },
  { name: "Vicenza", province: "VI", lat: 45.5455, lng: 11.5354 },
  { name: "Viterbo", province: "VT", lat: 42.4203, lng: 12.1047 },
];

/**
 * Search cities by prefix (case-insensitive, accent-insensitive).
 * Returns top N matches.
 */
export function searchCities(query: string, limit = 8): CityData[] {
  if (!query || query.length < 2) return [];

  const q = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return ITALIAN_CITIES.filter((city) => {
    const name = city.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return name.startsWith(q) || name.includes(q);
  }).slice(0, limit);
}
