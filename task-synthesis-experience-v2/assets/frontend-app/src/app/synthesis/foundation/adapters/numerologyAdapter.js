import { INDEPENDENCE_GROUPS } from '../evidenceIndependence.js?v=53c0693';
import { bridgeSeeds } from './knowledgeBridge.js?v=53c0693';
function seedFor(source) {
    return {
        sourceEntity: source.sourceEntity,
        fact: `${source.label} ${source.value}`,
        strength: source.strength,
        independenceGroup: source.group,
        /* Role first, base archetype second. The resolver already enforces that a
           role never falls back to a SIBLING role, so this pair cannot accidentally
           serve Soul Urge text for a Life Path. */
        lookups: [
            { kind: 'number', key: String(source.value), role: source.role },
            { kind: 'number', key: String(source.value), role: 'base-archetype' },
        ],
    };
}
export function numerologyEvidence(output) {
    const dateGroup = INDEPENDENCE_GROUPS.numerology.birthDate;
    const nameGroup = INDEPENDENCE_GROUPS.numerology.birthName;
    const sources = [
        /* The Life Path is the axis of the whole system - the one number a
           practitioner reaches for first - so it is the pillar's only `defining`
           source. */
        { sourceEntity: 'lifePath', label: 'Life Path', value: output.lifePathNumber.finalNumber,
            role: 'life-path', strength: 'defining', group: dateGroup },
        { sourceEntity: 'birthDay', label: 'Birth Day', value: output.birthDayNumber.finalNumber,
            role: 'birthday', strength: 'moderate', group: dateGroup },
        { sourceEntity: 'expression', label: 'Expression', value: output.expressionNumber.finalNumber,
            role: 'expression', strength: 'strong', group: nameGroup },
        { sourceEntity: 'soulUrge', label: 'Soul Urge', value: output.soulUrgeNumber.finalNumber,
            role: 'soul-urge', strength: 'strong', group: nameGroup },
        { sourceEntity: 'personality', label: 'Personality', value: output.personalityNumber.finalNumber,
            role: 'personality', strength: 'moderate', group: nameGroup },
        /* Maturity combines Life Path and Expression, so it is not an independent
           reading - it is filed under the date root it inherits from and will be
           discounted behind the Life Path rather than counted again. */
        { sourceEntity: 'maturity', label: 'Maturity', value: output.maturityNumber.finalNumber,
            role: 'maturity', strength: 'moderate', group: dateGroup },
        { sourceEntity: 'balance', label: 'Balance', value: output.balanceNumber.finalNumber,
            role: 'balance', strength: 'slight', group: nameGroup },
        /* Schools disagree about whether the Attitude number is meaningful at all.
           That disagreement is recorded in the knowledge layer's provenance rather
           than asserted here, so the discount it earns comes from the same place as
           every other discount. */
        { sourceEntity: 'attitude', label: 'Attitude', value: output.attitudeNumber.finalNumber,
            role: 'attitude', strength: 'slight', group: dateGroup },
    ];
    /* Hidden Passion is the most repeated letter value in the name - a real
       emphasis rather than an absence, which is why it is included where Karmic
       Lessons are not. */
    for (const value of output.hiddenPassionNumbers.finalValues) {
        sources.push({
            sourceEntity: `hiddenPassion-${value}`,
            label: 'Hidden Passion',
            value,
            role: 'hidden-passion',
            strength: 'moderate',
            group: nameGroup,
        });
    }
    return bridgeSeeds('numerology', sources.map(seedFor));
}
