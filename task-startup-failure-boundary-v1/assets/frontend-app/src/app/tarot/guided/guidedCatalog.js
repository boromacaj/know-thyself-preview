import { FINANCES_AREA } from './content/finances.js?v=2ea79e9';
import { GROWTH_AREA } from './content/growth.js?v=2ea79e9';
import { HOME_AREA } from './content/home.js?v=2ea79e9';
import { LIFE_CHANGES_AREA } from './content/lifeChanges.js?v=2ea79e9';
import { RELATIONSHIPS_AREA } from './content/relationships.js?v=2ea79e9';
import { TRAVEL_AREA } from './content/travel.js?v=2ea79e9';
import { WORK_AREA } from './content/work.js?v=2ea79e9';
import { GUIDED_AREA_IDS } from './guidedTypes.js?v=2ea79e9';
/**
 * THE CATALOG: THE ONLY AUTHORITY ON WHICH AREAS AND INTENTIONS EXIST.
 *
 * Seven life areas, each with a short list of intentions, in the order a person sees them. Stored state, a link or a
 * restored session can only ever REFER to these by id; nothing a browser holds can add, remove or reorder an entry.
 */
const AREAS = [
    RELATIONSHIPS_AREA, WORK_AREA, FINANCES_AREA, GROWTH_AREA, LIFE_CHANGES_AREA, HOME_AREA, TRAVEL_AREA,
];
const BY_AREA = new Map(AREAS.map((area) => [area.id, area]));
const BY_INTENTION = new Map(AREAS.flatMap((area) => area.intentions.map((intention) => [intention.id, intention])));
export const GUIDED_AREAS = GUIDED_AREA_IDS.map((id) => BY_AREA.get(id)).filter((area) => area !== undefined);
export const isGuidedAreaId = (value) => typeof value === 'string' && BY_AREA.has(value);
export const getGuidedArea = (id) => (isGuidedAreaId(id) ? BY_AREA.get(id) ?? null : null);
export const getGuidedIntention = (id) => (typeof id === 'string' ? BY_INTENTION.get(id) ?? null : null);
/** A choice whose two ids exist and belong together. */
export function isGuidedChoice(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const { areaId, intentionId } = value;
    const intention = getGuidedIntention(intentionId);
    return isGuidedAreaId(areaId) && intention !== null && intention.areaId === areaId;
}
