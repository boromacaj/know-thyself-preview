/**
 * THE READING ENGINE, THE READING INTENT AND ITS PILLAR ADAPTERS (the Tarot adapter is read-only over the canonical Tarot engine and changes nothing under src/app/tarot).
 *
 * Nothing in the shipped application imports this module. It is the contract between an intelligence engine and a renderer, built and tested beside the product first
 * (docs/reading-engine-v2/PHASE1_DESIGN.md). The only caller is the test and QA suite.
 */
export * from './contract/readingIntentTypes.js?v=b5ef5ed';
export { canonicalize, digestOf, sha256Hex } from './contract/canonical.js?v=b5ef5ed';
export { bodyOf, sealIntent, summarizeConvergence } from './contract/readingIntent.js?v=b5ef5ed';
export { validateReadingIntent } from './contract/validateReadingIntent.js?v=b5ef5ed';
export { buildHumanDesignReadingIntent, HUMAN_DESIGN_KIND, slug as humanDesignSlug } from './human-design/humanDesignReadingIntent.js?v=b5ef5ed';
export { buildNumerologyReadingIntent, NUMEROLOGY_KIND } from './numerology/numerologyReadingIntent.js?v=b5ef5ed';
export { buildBaziReadingIntent, BAZI_KIND } from './bazi/baziReadingIntent.js?v=b5ef5ed';
export { buildAstrologyReadingIntent, ASTROLOGY_KIND } from './astrology/astrologyReadingIntent.js?v=b5ef5ed';
export { buildForecastReadingIntent, FORECAST_KINDS } from './forecast/forecastReadingIntent.js?v=b5ef5ed';
export { buildCrossPillarReadingIntent, crossPillarIntentOf, CROSS_PILLAR_KIND, evidenceToken } from './cross-pillar/crossPillarReadingIntent.js?v=b5ef5ed';
export { buildProposition, withheldNotice, sealPillarIntent, noTakeaway, MODALITY_OF_EVIDENCE } from './contract/adapterKit.js?v=b5ef5ed';
export { buildTarotQuestionReadingIntent, buildTarotDailyReadingIntent, tarotReadingStatus, TarotIntentError, TAROT_KINDS, UNAVAILABLE_QUESTION_FIELDS } from './tarot/tarotReadingIntent.js?v=b5ef5ed';
export { buildConnectionsReadingIntent, CONNECTIONS_KINDS } from './connections/connectionsReadingIntent.js?v=b5ef5ed';
