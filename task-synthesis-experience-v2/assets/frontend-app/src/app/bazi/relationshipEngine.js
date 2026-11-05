import { EARTHLY_BRANCHES } from './data/baziConstants.js?v=53c0693';
import { BRANCH_MUTUAL_PUNISHMENT, BRANCH_SELF_PUNISHMENT_INDEXES, BRANCH_SIX_CLASHES, BRANCH_SIX_HARMONIES, BRANCH_SIX_HARMS, BRANCH_THREE_HARMONIES, BRANCH_THREE_PUNISHMENT_GROUPS, } from './data/branchRelationships.js?v=53c0693';
import { STEM_CLASHES, STEM_COMBINATIONS } from './data/stemRelationships.js?v=53c0693';
export function detectBaziRelationships(pillars) {
    const relationships = [];
    for (let i = 0; i < pillars.length; i += 1) {
        for (let j = i + 1; j < pillars.length; j += 1) {
            const a = pillars[i];
            const b = pillars[j];
            relationships.push(...detectStemPairRelationships(a, b));
            relationships.push(...detectBranchPairRelationships(a, b));
        }
    }
    relationships.push(...detectThreeHarmonies(pillars));
    relationships.push(...detectThreePunishments(pillars));
    return relationships;
}
function detectStemPairRelationships(a, b) {
    const results = [];
    const combo = STEM_COMBINATIONS.find((entry) => matchesUnorderedIndex(entry.stemIndexA, entry.stemIndexB, a.stem.index, b.stem.index));
    if (combo) {
        results.push({
            category: 'stem-combination',
            label: `${a.stem.name}-${b.stem.name} Stem Combination`,
            participants: [participant(a, a.stem.name), participant(b, b.stem.name)],
            resultingElement: combo.resultingElement,
            completeness: 'complete',
            missingForCompletion: null,
            transformationAsserted: false,
            description: `${a.stem.name} (${a.key}) and ${b.stem.name} (${b.key}) form the traditional Five Stem Combination. Whether this actually transforms into ${combo.resultingElement} depends on seasonal and structural conditions not modeled in this milestone.`,
        });
    }
    const clash = STEM_CLASHES.find((entry) => matchesUnorderedIndex(entry.stemIndexA, entry.stemIndexB, a.stem.index, b.stem.index));
    if (clash) {
        results.push({
            category: 'stem-clash',
            label: `${a.stem.name}-${b.stem.name} Stem Clash`,
            participants: [participant(a, a.stem.name), participant(b, b.stem.name)],
            resultingElement: null,
            completeness: 'complete',
            missingForCompletion: null,
            transformationAsserted: false,
            description: `${a.stem.name} (${a.key}) and ${b.stem.name} (${b.key}) are in direct controlling-cycle opposition (a commonly cited stem clash).`,
        });
    }
    return results;
}
function detectBranchPairRelationships(a, b) {
    const results = [];
    const aIndex = a.branch.index;
    const bIndex = b.branch.index;
    if (BRANCH_SIX_CLASHES.some(([x, y]) => matchesUnorderedIndex(x, y, aIndex, bIndex))) {
        results.push(branchPairRelationship('branch-six-clash', `${a.branch.name}-${b.branch.name} Six Clash`, a, b, null, `${a.branch.name} (${a.key}) and ${b.branch.name} (${b.key}) directly clash (Six Clashes / 六冲).`));
    }
    const harmony = BRANCH_SIX_HARMONIES.find((entry) => matchesUnorderedIndex(entry.pair[0], entry.pair[1], aIndex, bIndex));
    if (harmony) {
        results.push(branchPairRelationship('branch-six-harmony', `${a.branch.name}-${b.branch.name} Six Harmony`, a, b, harmony.resultingElement, `${a.branch.name} (${a.key}) and ${b.branch.name} (${b.key}) form a Six Harmony (六合) pair.${harmony.resultingElement ? ` A resulting ${harmony.resultingElement} phase is traditionally cited but not asserted as an actual transformation.` : ' No resulting element is consistently agreed for this pair across sources, so none is asserted here.'}`));
    }
    if (BRANCH_SIX_HARMS.some(([x, y]) => matchesUnorderedIndex(x, y, aIndex, bIndex))) {
        results.push(branchPairRelationship('branch-six-harm', `${a.branch.name}-${b.branch.name} Six Harm`, a, b, null, `${a.branch.name} (${a.key}) and ${b.branch.name} (${b.key}) form a Six Harm (六害) pair.`));
    }
    if (matchesUnorderedIndex(BRANCH_MUTUAL_PUNISHMENT[0], BRANCH_MUTUAL_PUNISHMENT[1], aIndex, bIndex)) {
        results.push(branchPairRelationship('branch-mutual-punishment', `${a.branch.name}-${b.branch.name} Mutual Punishment`, a, b, null, `${a.branch.name} (${a.key}) and ${b.branch.name} (${b.key}) form the Zi-Mao mutual punishment (punishment of impropriety).`));
    }
    if (aIndex === bIndex && BRANCH_SELF_PUNISHMENT_INDEXES.includes(aIndex)) {
        results.push(branchPairRelationship('branch-self-punishment', `${a.branch.name} Self-Punishment`, a, b, null, `${a.branch.name} appears in both ${a.key} and ${b.key}; this branch is a recognized self-punishment branch.`));
    }
    return results;
}
function detectThreeHarmonies(pillars) {
    const entries = pillars.map((pillar) => ({ pillarKind: pillar.key, branchIndex: pillar.branch.index }));
    return BRANCH_THREE_HARMONIES.flatMap((definition) => detectTrio(entries, definition.trio, 'branch-three-harmony', `Three Harmony (${definition.resultingElement} bureau)`, definition.resultingElement, `forms a Three Harmony ${definition.resultingElement} bureau. A full bureau is traditionally considered a stronger structural presence of ${definition.resultingElement}; transformation is not asserted.`));
}
function detectThreePunishments(pillars) {
    const entries = pillars.map((pillar) => ({ pillarKind: pillar.key, branchIndex: pillar.branch.index }));
    return BRANCH_THREE_PUNISHMENT_GROUPS.flatMap((definition) => detectTrio(entries, definition.trio, 'branch-three-punishment', definition.label, null, `forms the ${definition.label}.`));
}
function detectTrio(entries, trio, category, label, resultingElement, descriptionSuffix) {
    const present = trio
        .map((branchIndex) => ({ branchIndex, entry: entries.find((item) => item.branchIndex === branchIndex) ?? null }))
        .filter((item) => item.entry !== null);
    if (present.length < 2)
        return [];
    const participants = present.map(({ entry }) => ({
        pillarKind: entry.pillarKind,
        value: EARTHLY_BRANCHES[entry.branchIndex].name,
    }));
    const isComplete = present.length === 3;
    const missingBranchIndex = isComplete ? null : trio.find((branchIndex) => !present.some((item) => item.branchIndex === branchIndex)) ?? null;
    const missingBranchName = missingBranchIndex !== null ? EARTHLY_BRANCHES[missingBranchIndex].name : null;
    const namesInvolved = participants.map((item) => item.value).join('-');
    return [{
            category,
            label,
            participants,
            resultingElement,
            completeness: isComplete ? 'complete' : 'partial',
            missingForCompletion: missingBranchName,
            transformationAsserted: false,
            description: isComplete
                ? `${namesInvolved} ${descriptionSuffix}`
                : `${namesInvolved} present as a partial grouping (missing ${missingBranchName} to complete) that would ${descriptionSuffix}`,
        }];
}
function branchPairRelationship(category, label, a, b, resultingElement, description) {
    return {
        category,
        label,
        participants: [participant(a, a.branch.name), participant(b, b.branch.name)],
        resultingElement,
        completeness: 'complete',
        missingForCompletion: null,
        transformationAsserted: false,
        description,
    };
}
function participant(pillar, value) {
    return { pillarKind: pillar.key, value };
}
function matchesUnorderedIndex(x, y, a, b) {
    return (x === a && y === b) || (x === b && y === a);
}
