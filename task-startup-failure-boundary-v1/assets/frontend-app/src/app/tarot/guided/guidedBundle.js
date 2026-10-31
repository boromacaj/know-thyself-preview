import * as panels from '../ui/tarotGuidedPanels.js?v=2ea79e9';
import * as adapter from './guidedAdapter.js?v=2ea79e9';
import * as catalog from './guidedCatalog.js?v=2ea79e9';
import * as flow from './guidedFlow.js?v=2ea79e9';
import * as persistence from './guidedPersistence.js?v=2ea79e9';
import { composeGuidedReading } from './composeGuidedReading.js?v=2ea79e9';
/**
 * EVERYTHING GUIDED TAROT NEEDS THAT IS NOT SMALL, AS ONE MODULE.
 *
 * The catalog (seven areas in two languages, about a quarter of a megabyte of prose), the flow, the keeper of a guided session, the composer of a
 * reading and the screens that show them. The Tarot screen loads this the first time a person opens Guided Tarot and never before
 * (guidedRuntime.ts), so Daily Tarot, which is what almost every visit is, pays nothing for it.
 */
export { adapter, catalog, composeGuidedReading, flow, panels, persistence };
