import { WESTERNASTROLOGY01 } from './westernAstrology01.js?v=d9f39e7';
import { WESTERNASTROLOGY02 } from './westernAstrology02.js?v=d9f39e7';
import { WESTERNASTROLOGY03 } from './westernAstrology03.js?v=d9f39e7';
import { WESTERNASTROLOGY04 } from './westernAstrology04.js?v=d9f39e7';
import { WESTERNASTROLOGY05 } from './westernAstrology05.js?v=d9f39e7';
import { HUMANDESIGN01 } from './humanDesign01.js?v=d9f39e7';
import { HUMANDESIGN02 } from './humanDesign02.js?v=d9f39e7';
import { HUMANDESIGN03 } from './humanDesign03.js?v=d9f39e7';
import { HUMANDESIGN04 } from './humanDesign04.js?v=d9f39e7';
import { NUMEROLOGY01 } from './numerology01.js?v=d9f39e7';
import { NUMEROLOGY02 } from './numerology02.js?v=d9f39e7';
import { NUMEROLOGY03 } from './numerology03.js?v=d9f39e7';
import { NUMEROLOGY04 } from './numerology04.js?v=d9f39e7';
import { BAZI01 } from './bazi01.js?v=d9f39e7';
import { BAZI02 } from './bazi02.js?v=d9f39e7';
import { BAZI03 } from './bazi03.js?v=d9f39e7';
import { BAZI05 } from './bazi05.js?v=d9f39e7';
import { CROSSPILLAR01 } from './crossPillar01.js?v=d9f39e7';
import { BAZI_OVERLAYS_SK } from './overlays01.js?v=d9f39e7';
import { OVERLAYS02_SK } from './overlays02.js?v=d9f39e7';
/*
 * THE WHOLE SLOVAK READING, IN ONE PLACE THAT NOTHING IMPORTS STATICALLY.
 *
 * The twenty batch files above are the translated reading: about nine hundred
 * kilobytes of authored prose. proseTranslations.ts used to import them at the
 * top, which put every one of them in the module graph of every session - an
 * English reader downloaded the entire Slovak reading before the first screen
 * appeared, and never used a word of it.
 *
 * Collecting them here changes nothing about the text or about how a unit is
 * looked up. It only gives the corpus one door: proseTranslations.ts reaches it
 * with a dynamic import when Slovak is actually the language, so the batches
 * are in the Slovak session's graph and in no other.
 *
 * The type import above is erased at compile time, so it makes no runtime edge
 * back to the module that loads this one.
 */
/*
 * BATCHES MERGE PER FIELD, THEY DO NOT OVERWRITE EACH OTHER.
 *
 * This was a plain object spread, and the spread is wrong for a staged
 * translation. A later batch that carries only a `portrait` for a unit an
 * earlier batch had given a `core` replaced the whole entry, silently dropping
 * the translated core - so adding depth to a placement made its already
 * translated opening revert to English, and the only symptom was the residue
 * scanner catching it two files away.
 *
 * Merging by field means a batch can add exactly what it wrote. Later still
 * wins per field, so a deliberate override works as before - it just has to
 * name the field it is overriding rather than taking the whole unit with it.
 */
const mergeBatches = (...batches) => {
    const out = {};
    for (const batch of batches) {
        for (const [id, entry] of Object.entries(batch)) {
            const existing = out[id];
            out[id] = existing
                ? {
                    ...existing,
                    ...entry,
                    ...(existing.portrait || entry.portrait
                        ? { portrait: { ...existing.portrait, ...entry.portrait } }
                        : {}),
                }
                : entry;
        }
    }
    return out;
};
export const SK_PROSE = mergeBatches(WESTERNASTROLOGY01, WESTERNASTROLOGY02, WESTERNASTROLOGY03, WESTERNASTROLOGY04, WESTERNASTROLOGY05, HUMANDESIGN01, HUMANDESIGN02, HUMANDESIGN03, HUMANDESIGN04, NUMEROLOGY01, NUMEROLOGY02, NUMEROLOGY03, NUMEROLOGY04, BAZI01, BAZI02, BAZI03, BAZI05, CROSSPILLAR01);
export const SK_OVERLAY_PROSE = {
    ...BAZI_OVERLAYS_SK,
    ...OVERLAYS02_SK,
};
