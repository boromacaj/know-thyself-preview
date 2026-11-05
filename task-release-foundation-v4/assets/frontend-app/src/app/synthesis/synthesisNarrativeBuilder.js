const NARRATIVE_LIFE_AREA_SECTIONS = [
    { areaId: 'decision-making', title: 'How you make decisions' },
    { areaId: 'relationships-intimacy', title: 'How you relate to others' },
    { areaId: 'communication', title: 'Communication' },
    { areaId: 'work-career', title: 'Work and direction' },
    { areaId: 'stress-recovery', title: 'Under pressure' },
    { areaId: 'growth-direction', title: 'Growth' },
];
/** Deterministic, template-driven assembly (spec section 33) — every paragraph here
 *  is reused verbatim from a theme's or life area's own text, never freshly
 *  generated prose, so every sentence in the narrative stays traceable via
 *  evidenceRefs back to synthesisTypes.ts's SynthesisEvidenceEntry records. */
export function buildMainNarrative(themes, lifeAreas) {
    const sections = [];
    const topThemes = themes.filter((theme) => theme.strength === 'primary' || theme.strength === 'strong').slice(0, 4);
    sections.push(topThemes.length > 0
        ? {
            id: 'central-pattern',
            title: 'Your central pattern',
            paragraphs: topThemes.map((theme) => theme.longDescription),
            evidenceRefs: topThemes.flatMap((theme) => theme.evidenceRefs),
        }
        : {
            id: 'central-pattern',
            title: 'Your central pattern',
            paragraphs: ['No theme in this profile yet has independent support from two or more pillars. The sections below reflect single-pillar signals only, shown as exploratory rather than a confirmed cross-pillar pattern.'],
            evidenceRefs: [],
        });
    for (const { areaId, title } of NARRATIVE_LIFE_AREA_SECTIONS) {
        const area = lifeAreas.find((candidate) => candidate.id === areaId);
        if (!area)
            continue;
        sections.push({ id: `narrative-${areaId}`, title, paragraphs: area.paragraphs, evidenceRefs: area.evidenceRefs });
    }
    return sections;
}
export function buildOverview(themes, tensions, sourceStatus) {
    const strongest = themes.filter((theme) => theme.strength === 'primary' || theme.strength === 'strong').slice(0, 5);
    const central = strongest[0] ?? themes[0] ?? null;
    const centralTension = tensions[0] ?? null;
    const completeCount = sourceStatus.filter((status) => status.status === 'complete').length;
    const partialCount = sourceStatus.filter((status) => status.status === 'partial').length;
    const growthSource = themes.find((theme) => theme.growthQuestions.length > 0);
    return {
        headline: central ? `A recurring pattern around ${central.label.toLowerCase()}` : 'Building a cross-pillar picture from the evidence available so far',
        centralPatternSentence: central ? central.summary : 'No theme yet has independent support from two or more pillars; more themes will appear here as more pillars are calculated.',
        strongestThemeIds: strongest.map((theme) => theme.id),
        centralTensionId: centralTension?.id ?? null,
        growthDirectionSentence: growthSource ? growthSource.growthQuestions[0] : 'Return to this map once more pillars are calculated to reveal a clearer growth direction.',
        sourceCoverageSummary: `${completeCount} of ${sourceStatus.length} pillars fully calculated${partialCount > 0 ? `, ${partialCount} partial` : ''}.`,
    };
}
