/**
 * Generating order used for cycle-distance arithmetic: Wood -> Fire -> Earth -> Metal -> Water -> Wood.
 * Distance 0 = same phase, +1 = Day Master generates target (output), +2 = Day Master controls
 * target (wealth), +3 = target controls Day Master (authority), +4 = target generates Day Master
 * (resource). This mirrors the standard Ten Gods derivation used across BaZi schools.
 */
const GENERATING_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const TEN_GOD_TABLE = {
    0: { category: 'companion', relation: 'same-phase', same: 'Friend', diff: 'Rob Wealth' },
    1: { category: 'output', relation: 'generates', same: 'Eating God', diff: 'Hurting Officer' },
    2: { category: 'wealth', relation: 'controls', same: 'Indirect Wealth', diff: 'Direct Wealth' },
    3: { category: 'authority', relation: 'controlled-by', same: 'Seven Killings', diff: 'Direct Officer' },
    4: { category: 'resource', relation: 'generated-by', same: 'Indirect Resource', diff: 'Direct Resource' },
};
/**
 * Computes the Ten God of `target` relative to `dayMaster`. This is the calculation, not a
 * lookup table of pre-baked pairs, so every one of the 100 (dayMaster x target) stem
 * combinations — the full 10x10 matrix — resolves consistently from the same two rules:
 * Five Phase cycle distance (same/generates/controls/controlled-by/generated-by) and whether
 * polarity (Yin/Yang) matches.
 */
export function calculateTenGod(dayMaster, target) {
    const dayMasterIndex = GENERATING_ORDER.indexOf(dayMaster.element);
    const targetIndex = GENERATING_ORDER.indexOf(target.element);
    const distance = mod(targetIndex - dayMasterIndex, 5);
    const entry = TEN_GOD_TABLE[distance];
    const samePolarity = dayMaster.polarity === target.polarity;
    return {
        tenGod: samePolarity ? entry.same : entry.diff,
        category: entry.category,
        relation: entry.relation,
        samePolarity,
        dayMasterElement: dayMaster.element,
        targetElement: target.element,
    };
}
function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
}
