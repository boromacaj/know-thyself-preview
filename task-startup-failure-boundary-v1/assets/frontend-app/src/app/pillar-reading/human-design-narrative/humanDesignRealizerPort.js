import { hdChannels } from '../../human-design/data/hdChannels.js?v=2ea79e9';
import { resolve } from '../../knowledge/knowledgeBase.js?v=2ea79e9';
/**
 * THE REALIZER PORT: THE ONE DOOR THROUGH WHICH A DIFFERENT HUMAN DESIGN COMPOSITION CAN BE TRIED.
 *
 * The shipped reading is composed by the narrative layer in this folder (interpretation -> plan -> voice). The editorial
 * pilot (reading-engine/human-design/pilot) composes the same reading differently: it re-plans the discourse over the
 * sealed ReadingIntent of the SAME plan and realizes sentences from that intent alone. This file is only the seam:
 *
 *   - a registry that holds NOTHING by default, so the shipped application composes exactly what it always did;
 *   - the types the pilot fills in;
 *   - `humanDesignMeanings`, the authored meanings the pilot may quote (a channel's and a profile's headline), resolved
 *     through the knowledge base HERE so the pilot never imports the knowledge layer (the reading engine's isolation
 *     rule: it depends on its contract and the pillars' plans, nothing else).
 *
 * Nothing in the application sets the registry. Only the pilot's own activation (QA tooling and tests) does, so there
 * is no switch, no URL parameter and no stored setting that could turn it on for a reader.
 */
/** The ids of the sections the pilot writes. They have their own headings, so a pilot reading never borrows a baseline one. */
export const PILOT_SECTION_IDS = [
    'hd2-lead', 'hd2-energy', 'hd2-decide', 'hd2-people', 'hd2-steady', 'hd2-open', 'hd2-pull', 'hd2-off', 'hd2-help',
];
export const humanDesignMeanings = () => ({
    channelHeadline: (id) => resolve({ system: 'human-design', kind: 'hd-channel', key: id, role: 'base-archetype' })?.headline ?? null,
    channelCenters: (id) => hdChannels.find((channel) => channel.id === id)?.centers ?? null,
});
let registered = null;
/** Registers (or clears, with null) the realizer. Called by the pilot's activation only. */
export function setHumanDesignRealizer(realizer) {
    registered = realizer;
}
export const currentHumanDesignRealizer = () => registered;
