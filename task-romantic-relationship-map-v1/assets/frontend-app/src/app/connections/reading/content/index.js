import FAMILY from './family.js';
import PARENTING from './parenting.js';
import PARENTING_GUIDE from './parentingGuide.js';
import { PRACTICE_INTENTS } from './practiceIntents.js';
import { STEP_INTENTS } from './stepIntents.js';
import ROMANTIC from './romantic.js';
import SHARED from './shared.js';
import WORK from './work.js';
import FAMILY_A from './mechanisms/family.a.js';
import FAMILY_B from './mechanisms/family.b.js';
import FAMILY_DRIVES from './mechanisms/family.drives.js';
import HOUSEHOLD_PATTERNS_A from './mechanisms/householdPatterns.a.js';
import HOUSEHOLD_PATTERNS_B from './mechanisms/householdPatterns.b.js';
import HOUSEHOLD_PATTERNS_C from './mechanisms/householdPatterns.c.js';
import PARENTING_A1 from './mechanisms/parenting.a1.js';
import PARENTING_A2 from './mechanisms/parenting.a2.js';
import PARENTING_B1 from './mechanisms/parenting.b1.js';
import PARENTING_B2 from './mechanisms/parenting.b2.js';
import PARENTING_DRIVES from './mechanisms/parenting.drives.js';
import ROMANTIC_A from './mechanisms/romantic.a.js';
import ROMANTIC_B from './mechanisms/romantic.b.js';
import ROMANTIC_DRIVES from './mechanisms/romantic.drives.js';
import WORK_A from './mechanisms/work.a.js';
import WORK_B from './mechanisms/work.b.js';
import WORK_DRIVES from './mechanisms/work.drives.js';
/**
 * ALL THE AUTHORED WORDS OF CONNECTIONS, IN ONE PLACE.
 *
 * Six files, each a typed value: the words that are the same in every domain (shared), the four domains' own (romantic, family, work, parenting), and the parenting guide by age.
 * Each is validated by frontend-app/scripts/connections/contentRules.mjs (the grammar rules in contentTypes.ts, the banned phrases, both languages complete) and its practices
 * cite only research that is in docs/research/connections. This is the only file that imports them, so the engine can be loaded and tested with other content.
 */
/** Every practice carries what it asks the person to do (practiceIntents.ts), so the engine can tell two cards that give the same instruction. */
const withIntents = (content) => ({ ...content, practices: content.practices.map((practice) => ({ ...practice, intents: PRACTICE_INTENTS[practice.id] ?? [] })) });
/** ...and every mechanism's step carries what it asks (stepIntents.ts). */
const stepsWithIntents = (domain, mechanisms) => Object.fromEntries(Object.entries(mechanisms).map(([key, mechanism]) => [key, { ...mechanism, intents: STEP_INTENTS[domain][key] ?? [] }]));
export const CONNECTIONS_CONTENT = {
    shared: SHARED,
    domains: {
        romantic: { ...withIntents(ROMANTIC), mechanisms: stepsWithIntents('romantic', { ...ROMANTIC_A, ...ROMANTIC_B, ...ROMANTIC_DRIVES }) },
        family: { ...withIntents(FAMILY), mechanisms: stepsWithIntents('family', { ...FAMILY_A, ...FAMILY_B, ...FAMILY_DRIVES }) },
        work: { ...withIntents(WORK), mechanisms: stepsWithIntents('work', { ...WORK_A, ...WORK_B, ...WORK_DRIVES }) },
        parenting: { ...withIntents(PARENTING), mechanisms: stepsWithIntents('parenting', { ...PARENTING_A1, ...PARENTING_A2, ...PARENTING_B1, ...PARENTING_B2, ...PARENTING_DRIVES }), ...(PARENTING.household ? { household: { ...PARENTING.household, patterns: { ...HOUSEHOLD_PATTERNS_A, ...HOUSEHOLD_PATTERNS_B, ...HOUSEHOLD_PATTERNS_C } } } : {}) },
    },
    ageGuide: PARENTING_GUIDE,
};
