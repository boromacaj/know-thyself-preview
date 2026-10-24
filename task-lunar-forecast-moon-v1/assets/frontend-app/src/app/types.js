export const FLOW_STAGES = [
    { id: 'intake', index: '01', label: 'Intake' },
    { id: 'themes', index: '02', label: 'Theme Discovery' },
    { id: 'pattern', index: '03', label: 'Pattern Reveal' },
    { id: 'map', index: '04', label: 'Unified Self Map' },
    { id: 'appendix', index: '05', label: 'Technical Appendix' },
];
export const PILLAR_IDS = [
    'numerology',
    'western-astrology',
    'bazi-tcm',
    'human-design',
];
export function isNumberCalculation(value) {
    if (!value || typeof value !== 'object')
        return false;
    const candidate = value;
    return typeof candidate.finalNumber === 'number' && Array.isArray(candidate.reductionSteps);
}
