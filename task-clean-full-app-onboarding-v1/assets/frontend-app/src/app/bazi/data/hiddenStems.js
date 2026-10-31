import { HEAVENLY_STEMS } from './baziConstants.js?v=f9ab0a6';
export const HIDDEN_STEM_WEIGHTING_MODEL = 'conventional-zi-ping-percentage-v1';
/**
 * Structural hidden-stem membership per Earthly Branch (indexed 0=Zi..11=Hai, matching
 * EARTHLY_BRANCHES in baziConstants.ts). This membership table (which stems, in which role)
 * is the standard "藏干" table used essentially universally across BaZi schools; only the
 * conventional weighting below varies by school.
 */
const HIDDEN_STEM_MEMBERSHIP = [
    /* Zi   */ [{ stemIndex: 9, role: 'primary' }],
    /* Chou */ [{ stemIndex: 5, role: 'primary' }, { stemIndex: 9, role: 'secondary' }, { stemIndex: 7, role: 'tertiary' }],
    /* Yin  */ [{ stemIndex: 0, role: 'primary' }, { stemIndex: 2, role: 'secondary' }, { stemIndex: 4, role: 'tertiary' }],
    /* Mao  */ [{ stemIndex: 1, role: 'primary' }],
    /* Chen */ [{ stemIndex: 4, role: 'primary' }, { stemIndex: 1, role: 'secondary' }, { stemIndex: 9, role: 'tertiary' }],
    /* Si   */ [{ stemIndex: 2, role: 'primary' }, { stemIndex: 4, role: 'secondary' }, { stemIndex: 6, role: 'tertiary' }],
    /* Wu   */ [{ stemIndex: 3, role: 'primary' }, { stemIndex: 5, role: 'secondary' }],
    /* Wei  */ [{ stemIndex: 5, role: 'primary' }, { stemIndex: 3, role: 'secondary' }, { stemIndex: 1, role: 'tertiary' }],
    /* Shen */ [{ stemIndex: 6, role: 'primary' }, { stemIndex: 8, role: 'secondary' }, { stemIndex: 4, role: 'tertiary' }],
    /* You  */ [{ stemIndex: 7, role: 'primary' }],
    /* Xu   */ [{ stemIndex: 4, role: 'primary' }, { stemIndex: 7, role: 'secondary' }, { stemIndex: 3, role: 'tertiary' }],
    /* Hai  */ [{ stemIndex: 8, role: 'primary' }, { stemIndex: 0, role: 'secondary' }],
];
const WEIGHT_BY_ROLE_AND_COUNT = {
    1: { primary: 100 },
    2: { primary: 70, secondary: 30 },
    3: { primary: 60, secondary: 30, tertiary: 10 },
};
export function resolveHiddenStems(branchIndex) {
    const membership = HIDDEN_STEM_MEMBERSHIP[branchIndex];
    if (!membership)
        throw new Error(`No hidden-stem membership defined for branch index ${branchIndex}.`);
    const weights = WEIGHT_BY_ROLE_AND_COUNT[membership.length];
    return membership.map(({ stemIndex, role }) => {
        const stem = HEAVENLY_STEMS[stemIndex];
        if (!stem)
            throw new Error(`Hidden-stem membership references invalid stem index ${stemIndex}.`);
        return {
            stem,
            role,
            conventionalWeightPercent: weights?.[role] ?? 0,
            sourceModel: HIDDEN_STEM_WEIGHTING_MODEL,
        };
    });
}
