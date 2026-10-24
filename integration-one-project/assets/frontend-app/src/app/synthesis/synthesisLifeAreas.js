import { LIFE_AREA_IDS } from './synthesisTypes.js';
const LIFE_AREA_LABELS = {
    'personal-life': 'Personal life',
    'relationships-intimacy': 'Relationships and intimacy',
    'work-career': 'Work and career',
    'decision-making': 'Decision-making',
    communication: 'Communication',
    'stress-recovery': 'Stress and recovery',
    'growth-direction': 'Growth and direction',
};
/**
 * Life areas are built from the FULL uncapped domain-theme map (not the display-capped
 * ranked list): several single-pillar domains — decision-making, communication,
 * relationships — are exactly the ones a life area needs even though they never reach
 * cross-pillar "primary/strong" status. Sections with no contributing theme are omitted
 * entirely rather than rendered empty (spec section 21).
 */
export function buildSynthesisLifeAreas(domainThemes) {
    const byArea = new Map();
    for (const theme of domainThemes.values()) {
        for (const implication of theme.lifeAreaImplications) {
            const bucket = byArea.get(implication.lifeAreaId) ?? { paragraphs: [], themeIds: [], evidenceRefs: [] };
            bucket.paragraphs.push(implication.text);
            bucket.themeIds.push(theme.id);
            bucket.evidenceRefs.push(...theme.evidenceRefs);
            byArea.set(implication.lifeAreaId, bucket);
        }
    }
    return LIFE_AREA_IDS
        .filter((id) => byArea.has(id))
        .map((id) => {
        const bucket = byArea.get(id);
        return {
            id,
            label: LIFE_AREA_LABELS[id],
            paragraphs: bucket.paragraphs,
            contributingThemeIds: [...new Set(bucket.themeIds)],
            evidenceRefs: [...new Set(bucket.evidenceRefs)],
        };
    });
}
