// Production build: the benchmark demo profile is not shipped.
export const BORIS_BENCHMARK_INPUT = Object.freeze({
  fullName: '', givenNames: '', birthSurname: '', birthDate: '', birthTime: '',
  birthPlaceText: '', birthLatitude: null, birthLongitude: null,
  birthLocationPrecision: 'text-only', birthLocationSource: 'user-input',
  resolvedPlaceLabel: null, birthCountry: null, birthRegion: null,
  birthLocationProvider: null, birthTimeZoneHint: null, birthTimeZoneHintSource: null,
  birthTimeZone: null, birthTimeZoneSource: null, birthTimeZoneConfidence: 'unavailable',
  birthTimeZoneLimitations: [],
});
export const BORIS_BENCHMARK_REPORT_DATE = new Date(0);
export const BORIS_BENCHMARK_REFERENCES = Object.freeze({
  numerology: '', westernAstrology: '', baziTcm: '', humanDesign: '', unified: '',
});
export const BORIS_BENCHMARK_THEMES = [];
export const BORIS_BENCHMARK_UNIFIED_PATTERN = Object.freeze({});
export function benchmarkThemesForPillar() { return []; }
export function buildBorisBenchmarkPillars() { return []; }
