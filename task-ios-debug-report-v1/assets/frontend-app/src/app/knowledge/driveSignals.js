import { sig } from './semanticDimensions.js?v=b5ef5ed';
/*
 * NUMEROLOGY - the number's own want.
 *
 * Applied to the number wherever it is read. A 7 in the Life Path and a 7 in the
 * Attitude number are the same appetite at different volumes, and the volume is
 * already handled: the adapter reads a Life Path as `defining` and an Attitude
 * number as `slight`, so the same row reaches the model ten times lighter in one
 * position than the other.
 */
const NUMBER_DRIVES = {
    /* Initiation is a solitary act by definition - the want is room to make the
       first move, not applause for having made it. */
    1: [sig('freedom', 0.6), sig('achievement', 0.4)],
    2: [sig('belonging', 0.8), sig('care', 0.5)],
    /* "The thing is not real until it is said" is a drive statement, not a style. */
    3: [sig('self-expression', 0.9), sig('recognition', 0.5)],
    4: [sig('mastery', 0.5), sig('achievement', 0.5)],
    5: [sig('freedom', 0.9)],
    6: [sig('care', 0.9), sig('belonging', 0.5), sig('beauty', 0.3)],
    7: [sig('understanding', 0.9), sig('meaning', 0.5), sig('mastery', 0.4)],
    8: [sig('achievement', 0.9), sig('recognition', 0.5)],
    9: [sig('meaning', 0.8), sig('care', 0.6)],
    11: [sig('meaning', 0.7), sig('self-expression', 0.4)],
    22: [sig('achievement', 0.7), sig('mastery', 0.6), sig('meaning', 0.4)],
    33: [sig('care', 0.8), sig('meaning', 0.6)],
    /* The four karmic-debt numbers are read as a route rather than an appetite,
       so they carry one light row each. */
    13: [sig('mastery', 0.4)],
    14: [sig('freedom', 0.5)],
    16: [sig('meaning', 0.5)],
    19: [sig('freedom', 0.4), sig('achievement', 0.4)],
};
/*
 * BAZI - the Ten Gods ARE the motivational layer.
 *
 * The five element relations to the Day Master are not descriptions of
 * temperament; they are what the chart is organised around producing, holding,
 * answering to or learning from. Output produces, Wealth acquires and controls,
 * Officer answers to a standard and is placed by it, Resource is fed and learns,
 * Companion stands level with others. This is the least inferential table in the
 * file.
 */
const TEN_GOD_DRIVES = {
    /* Output, the gentle face: making something because making is satisfying. */
    'eating-god': [sig('self-expression', 0.8), sig('beauty', 0.5)],
    /* Output, the sharp face: making something that is unmistakably yours. */
    'hurting-officer': [sig('self-expression', 0.9), sig('recognition', 0.5), sig('freedom', 0.4)],
    'direct-wealth': [sig('achievement', 0.8), sig('mastery', 0.3)],
    'indirect-wealth': [sig('achievement', 0.7), sig('freedom', 0.4)],
    'direct-officer': [sig('recognition', 0.6), sig('achievement', 0.5), sig('care', 0.3)],
    'seven-killings': [sig('achievement', 0.7), sig('freedom', 0.5)],
    'direct-resource': [sig('understanding', 0.7), sig('care', 0.5)],
    'indirect-resource': [sig('understanding', 0.8), sig('meaning', 0.5)],
    friend: [sig('freedom', 0.6), sig('belonging', 0.4)],
    'rob-wealth': [sig('freedom', 0.5), sig('achievement', 0.4)],
};
/*
 * ASTROLOGY - the planet's function, which every school states as a want.
 *
 * Venus is what a chart finds beautiful and wants near it; Saturn is what it
 * must become competent at; Jupiter is where it looks for meaning. The sign
 * says in what manner, and the sign's own row below is lighter for that reason.
 */
const PLANET_DRIVES = {
    sun: [sig('recognition', 0.6), sig('meaning', 0.5)],
    moon: [sig('belonging', 0.7), sig('care', 0.5)],
    mercury: [sig('understanding', 0.7), sig('self-expression', 0.4)],
    venus: [sig('beauty', 0.8), sig('belonging', 0.5)],
    mars: [sig('achievement', 0.7), sig('freedom', 0.4)],
    jupiter: [sig('meaning', 0.8), sig('understanding', 0.4)],
    saturn: [sig('mastery', 0.8), sig('achievement', 0.5)],
    uranus: [sig('freedom', 0.8)],
    neptune: [sig('meaning', 0.6), sig('beauty', 0.5)],
    pluto: [sig('meaning', 0.5), sig('mastery', 0.4)],
};
/* The sign's own appetite, lighter than a planet's because a sign is a manner
   as much as a motive. Read where a sign stands on its own: the Ascendant, and
   any placement with no authored planet-in-sign unit behind it. */
const SIGN_DRIVES = {
    aries: [sig('freedom', 0.5), sig('achievement', 0.5)],
    taurus: [sig('beauty', 0.6), sig('mastery', 0.3)],
    gemini: [sig('understanding', 0.5), sig('self-expression', 0.5)],
    cancer: [sig('belonging', 0.8), sig('care', 0.6)],
    leo: [sig('recognition', 0.8), sig('self-expression', 0.6)],
    virgo: [sig('mastery', 0.7), sig('care', 0.4)],
    libra: [sig('beauty', 0.7), sig('belonging', 0.5)],
    scorpio: [sig('meaning', 0.5), sig('mastery', 0.4)],
    sagittarius: [sig('meaning', 0.8), sig('freedom', 0.6)],
    capricorn: [sig('achievement', 0.8), sig('mastery', 0.5)],
    aquarius: [sig('freedom', 0.7), sig('meaning', 0.4)],
    pisces: [sig('meaning', 0.6), sig('care', 0.5), sig('beauty', 0.4)],
};
/*
 * HUMAN DESIGN - Type, Profile and the channels.
 *
 * Type is where the system is most explicitly about motivation: a Projector's
 * whole mechanic is waiting to be recognised and invited, and calling that a
 * behavioural style rather than a need misreads it. The channels are the other
 * place the system says what somebody is for - they are the fixed capacities,
 * and their authored headlines are written as exactly that.
 */
const HD_TYPE_DRIVES = {
    generator: [sig('mastery', 0.5)],
    'manifesting-generator': [sig('mastery', 0.4), sig('freedom', 0.5)],
    manifestor: [sig('freedom', 0.8)],
    /* Recognition is not vanity here: it is the mechanic the type runs on. */
    projector: [sig('recognition', 0.7), sig('understanding', 0.5)],
    reflector: [sig('belonging', 0.4), sig('understanding', 0.4)],
};
const HD_PROFILE_DRIVES = {
    '1/3': [sig('understanding', 0.6)],
    '1/4': [sig('understanding', 0.5), sig('belonging', 0.5)],
    '2/4': [sig('belonging', 0.5), sig('mastery', 0.4)],
    '2/5': [sig('mastery', 0.4), sig('recognition', 0.4)],
    '3/5': [sig('understanding', 0.4), sig('recognition', 0.4)],
    '3/6': [sig('understanding', 0.4), sig('meaning', 0.4)],
    '4/6': [sig('belonging', 0.6), sig('meaning', 0.4)],
    '4/1': [sig('belonging', 0.5), sig('understanding', 0.5)],
    /* The 5 is called on to solve something and carries the projection that comes
       with it; the 1 underneath has to know the subject before it answers. */
    '5/1': [sig('recognition', 0.6), sig('understanding', 0.5)],
    '5/2': [sig('recognition', 0.6), sig('mastery', 0.4)],
    '6/2': [sig('meaning', 0.5), sig('mastery', 0.4)],
    '6/3': [sig('meaning', 0.6), sig('understanding', 0.4)],
};
/* One row per channel, read from what the authored entry already says the
   connection is for. A channel with no motive of its own - a pure capacity -
   has no row. */
const HD_CHANNEL_DRIVES = {
    '1-8': [sig('self-expression', 0.8), sig('recognition', 0.5)],
    '2-14': [sig('meaning', 0.5), sig('achievement', 0.4)],
    '3-60': [sig('achievement', 0.4)],
    '4-63': [sig('understanding', 0.7)],
    '6-59': [sig('belonging', 0.7)],
    '7-31': [sig('recognition', 0.6)],
    '9-52': [sig('mastery', 0.5)],
    '10-20': [sig('self-expression', 0.7), sig('freedom', 0.4)],
    '10-34': [sig('freedom', 0.5), sig('achievement', 0.4)],
    '11-56': [sig('self-expression', 0.6), sig('meaning', 0.4)],
    '12-22': [sig('self-expression', 0.7), sig('beauty', 0.4)],
    '13-33': [sig('meaning', 0.5), sig('care', 0.4)],
    /* Talent that has to go deep before it is worth expressing: mastery first,
       and an expression that is only earned by it. */
    '16-48': [sig('mastery', 0.8), sig('self-expression', 0.5)],
    '17-62': [sig('understanding', 0.5)],
    '18-58': [sig('mastery', 0.6), sig('care', 0.3)],
    '19-49': [sig('belonging', 0.6), sig('care', 0.5)],
    '20-57': [sig('understanding', 0.4)],
    '21-45': [sig('achievement', 0.7), sig('freedom', 0.4)],
    '23-43': [sig('self-expression', 0.5), sig('understanding', 0.5)],
    '24-61': [sig('understanding', 0.8), sig('meaning', 0.4)],
    '25-51': [sig('meaning', 0.6)],
    '26-44': [sig('achievement', 0.6), sig('recognition', 0.4)],
    '27-50': [sig('care', 0.9), sig('belonging', 0.4)],
    '28-38': [sig('meaning', 0.8)],
    '29-46': [sig('meaning', 0.4)],
    '30-41': [sig('meaning', 0.4), sig('freedom', 0.4)],
    '32-54': [sig('achievement', 0.8), sig('recognition', 0.4)],
    '34-57': [sig('mastery', 0.4)],
    '35-36': [sig('freedom', 0.5), sig('meaning', 0.4)],
    '37-40': [sig('belonging', 0.8), sig('care', 0.4)],
    '39-55': [sig('self-expression', 0.5), sig('beauty', 0.4)],
    '42-53': [sig('achievement', 0.5), sig('mastery', 0.4)],
    '47-64': [sig('understanding', 0.7), sig('meaning', 0.4)],
};
export const DRIVE_SIGNALS = {
    numerology: { number: NUMBER_DRIVES },
    bazi: { 'ten-god': TEN_GOD_DRIVES },
    'western-astrology': { planet: PLANET_DRIVES, sign: SIGN_DRIVES },
    'human-design': {
        'hd-type': HD_TYPE_DRIVES,
        'hd-profile': HD_PROFILE_DRIVES,
        'hd-channel': HD_CHANNEL_DRIVES,
    },
};
/** The drive rows for one entity, or an empty list where the tradition is silent. */
export function drivesFor(system, kind, key) {
    return DRIVE_SIGNALS[system]?.[kind]?.[key] ?? [];
}
/**
 * Merge the drive rows into a unit's own semantics.
 *
 * The unit keeps its id, its prose, its provenance and its style signals; it
 * gains only what this table says the symbol is for. A dimension the unit
 * already reads on keeps the HEAVIER of the two weights, so a table row can
 * never quietly overwrite an authored one.
 */
export function withDriveSignals(units) {
    return units.map((unit) => {
        const drives = drivesFor(unit.entity.system, unit.entity.kind, unit.entity.key);
        if (drives.length === 0)
            return unit;
        const merged = new Map();
        for (const signal of [...unit.semantics, ...drives]) {
            const known = merged.get(signal.dimension);
            if (!known || signal.weight > known.weight)
                merged.set(signal.dimension, signal);
        }
        return { ...unit, semantics: [...merged.values()] };
    });
}
