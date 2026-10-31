import { congenialElements, involves, otherEnd, readable, SIGN_QUALITIES, } from './astrologyInterpretation.js?v=2ea79e9';
/* ------------------------------------------------------------- rules -- */
/** An orb under three degrees: close enough to be one of the chart's defining links. */
const TIGHT_ORB = 3;
/** The widest orb at which a hard aspect may carry a tension section on its own. */
const TENSION_ORB = 4;
/** A knot needs this many tight links on one body. */
const KNOT_LINKS = 3;
const PERSONAL = new Set(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars']);
const PLANET_ORDER = [
    'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];
const HARD_CONJUNCTION = new Set(['Saturn', 'Mars', 'Pluto', 'Uranus']);
const isHard = (aspect) => aspect.kind === 'square' || aspect.kind === 'opposition'
    || (aspect.kind === 'conjunction' && (HARD_CONJUNCTION.has(aspect.a) || HARD_CONJUNCTION.has(aspect.b)));
/** Aspects a main section may read at all: readable, not generational, no node. */
const readableAspect = (aspect) => readable(aspect.state) && !aspect.generational
    && !aspect.a.endsWith('Node') && !aspect.b.endsWith('Node');
const nonPeregrine = (dignity) => (dignity && dignity !== 'Peregrine' ? dignity : null);
function supportFor(pattern, quality) {
    if (pattern.state !== 'known' || !pattern.leaders.includes(quality))
        return 'none';
    if (pattern.shape === 'single' || pattern.shape === 'near')
        return 'leads';
    return pattern.shape === 'tie' ? 'shares' : 'none';
}
/* ------------------------------------------------------------- plan -- */
export function planAstrologyNarrative(model) {
    const claimed = new Set();
    const claim = (aspect) => {
        if (aspect)
            claimed.add(aspect.id);
        return aspect;
    };
    const unclaimed = (aspect) => !claimed.has(aspect.id);
    const { bodies, bigThree } = model;
    /* ----------------------------------------------------------- time */
    const time = model.precision === 'exact' ? null : {
        kind: 'time',
        precision: model.precision,
        windowMinutes: model.window ? Math.max(-model.window.fromMinutes, model.window.toMinutes) : 0,
        rising: model.precision === 'approximate' && bigThree.ascendant.sign
            ? { sign: bigThree.ascendant.sign, state: bigThree.ascendant.state, spans: bigThree.ascendant.spans }
            : null,
        boundary: model.boundaryBodies.map((body) => ({ body, spans: bodies[body].spans })),
        moonHolds: model.precision === 'unknown' && bodies.Moon.state === 'known',
    };
    /* -------------------------------------------------------- pattern */
    const pattern = choosePattern(model);
    if (pattern.kind === 'knot')
        for (const link of [...pattern.links, ...pattern.internal])
            claim(link);
    if (pattern.kind === 'concentration') {
        for (const aspect of [...pattern.withSunAspects, ...(pattern.outside?.aspects ?? [])])
            claim(aspect);
    }
    const patternPlanets = new Set(pattern.kind === 'concentration' ? pattern.planets
        : pattern.kind === 'knot' ? [pattern.center, ...pattern.links.map((link) => otherEnd(link, pattern.center))
                .filter((point) => !point.endsWith('Node'))] : []);
    /* A link between two members of a knot belongs to the knot, wherever it is
       read; a conjunction inside a concentration is the concentration itself. */
    const insideKnot = (aspect) => (pattern.kind === 'knot'
        || (pattern.kind === 'concentration' && aspect.kind === 'conjunction'))
        && patternPlanets.has(aspect.a) && patternPlanets.has(aspect.b);
    /* ---------------------------------------------------------- tension, chosen before it is told */
    /*
     * Chosen here, ahead of the sections that come before it in the reading, for
     * one reason: the drive section has to know whether the Sun-Moon difference
     * is told in full further down, so that it names it rather than telling it
     * twice. The aspects it claims are claimed in reading order below.
     */
    /* Both luminaries' signs have to stand: a difference between two signs one
       of which the day does not fix is not a tension the chart can be said to have. */
    const luminariesFixed = bigThree.moon.state !== 'boundary' && bigThree.sun.state !== 'boundary';
    const luminaryTension = luminariesFixed
        && (bigThree.relation === 'friction' || bigThree.relation === 'same-modality'
            || (bigThree.aspect !== null && readable(bigThree.aspect.state)
                && (bigThree.aspect.kind === 'square' || bigThree.aspect.kind === 'opposition')));
    /* ---------------------------------------------------------- drive */
    const sunMoonAspect = bigThree.aspect && readable(bigThree.aspect.state) ? bigThree.aspect : null;
    const joined = model.aspects
        .filter((aspect) => readableAspect(aspect) && aspect.kind === 'conjunction' && involves(aspect, 'Sun')
        && aspect.orb < TIGHT_ORB && unclaimed(aspect) && !insideKnot(aspect))
        .map((aspect) => otherEnd(aspect, 'Sun'))
        .filter((point) => PERSONAL.has(point) && point !== 'Moon');
    for (const aspect of model.aspects) {
        if (aspect.kind === 'conjunction' && involves(aspect, 'Sun') && joined.includes(otherEnd(aspect, 'Sun')))
            claim(aspect);
    }
    /*
     * A HOUSE IS SAID ONCE. The pattern's house covers every member of the
     * concentration; the chart ruler's house belongs to what shows first; a
     * luminary on an angle is told there too. What is left is the luminary's own
     * arena, read beside the need or the drive it houses.
     */
    const houseTold = new Set(pattern.kind === 'concentration' && pattern.house !== null ? pattern.planets : []);
    const rulerBody = model.ruler && readable(model.ruler.state) ? model.ruler.body : null;
    const luminaryHouse = (body) => {
        const reading = bodies[body];
        if (reading.state === 'boundary' || reading.house === null || !readable(reading.houseState))
            return null;
        if (houseTold.has(body) || rulerBody === body)
            return null;
        if (model.angular.some((entry) => entry.body === body && readable(entry.state)))
            return null;
        return reading.house;
    };
    const drive = {
        kind: 'drive',
        sun: bigThree.sun.sign,
        sunSigns: bigThree.sun.signs,
        sunSpans: bigThree.sun.spans,
        sunSplitTold: pattern.kind === 'luminary' && pattern.spans.length > 1,
        moon: bigThree.moon.sign,
        moonSigns: bigThree.moon.signs,
        moonSpans: bigThree.moon.spans,
        relation: bigThree.relation,
        sameModality: bigThree.sameModality,
        /* A Sun-Moon link the pattern has already read (a conjunction inside its
           concentration) is not read again here. */
        aspect: luminaryTension || !sunMoonAspect || !unclaimed(sunMoonAspect) ? null : claim(sunMoonAspect),
        joined,
        moonDignity: bigThree.moon.state === 'boundary' ? null : nonPeregrine(bigThree.moon.dignity),
        developedBelow: luminaryTension,
        sunHouse: luminaryHouse('Sun'),
        moonHouse: luminaryHouse('Moon'),
    };
    /* ----------------------------------------------------------- meet */
    const ascendant = bigThree.ascendant;
    let meet = null;
    if (ascendant.sign && ascendant.state !== 'withheld' && bigThree.affinity) {
        const state = ascendant.state === 'known' || ascendant.state === 'approximate' ? ascendant.state : 'boundary';
        const ruler = model.ruler && readable(model.ruler.state) ? model.ruler : null;
        const luminary = model.angular.find((entry) => readable(entry.state)
            && (entry.body === 'Sun' || entry.body === 'Moon') && entry.body !== ruler?.body);
        meet = {
            kind: 'meet',
            state,
            rising: ascendant.sign,
            spans: ascendant.spans,
            affinity: bigThree.affinity,
            sameSignAs: bigThree.sameSignAs,
            ruler: ruler ? {
                body: ruler.body, sign: ruler.sign, house: houseTold.has(ruler.body) ? null : ruler.house,
                angle: ruler.angle, inRisingSign: ruler.inRisingSign,
                inPatternSign: pattern.kind === 'concentration' && pattern.sign === ruler.sign,
            } : null,
            luminaryOnAngle: luminary ? { body: luminary.body, angle: luminary.angle } : null,
        };
    }
    /* ----------------------------------------------------------- mind */
    const noteFor = (body, pick) => {
        const reading = bodies[body];
        const aspect = reading.state === 'boundary' ? null
            : model.aspects.find((entry) => readableAspect(entry) && involves(entry, body) && unclaimed(entry)
                && !insideKnot(entry) && entry.orb < TIGHT_ORB && pick(entry)) ?? null;
        return {
            body,
            sign: reading.sign,
            state: reading.state,
            signs: reading.signs,
            spans: reading.spans,
            dignity: reading.state === 'boundary' ? null : nonPeregrine(reading.dignity),
            aspect: claim(aspect),
            inPattern: patternPlanets.has(body),
        };
    };
    /* Material: a dignity that changes the reading, or a tight link to another
       part of the chart that is not merely the Sun it always travels near. */
    const material = (note) => note.dignity !== null || note.aspect !== null;
    const mercury = noteFor('Mercury', (aspect) => otherEnd(aspect, 'Mercury') !== 'Sun');
    const mars = noteFor('Mars', (aspect) => !(otherEnd(aspect, 'Mars') === 'Sun' && joined.includes('Mars')));
    const mind = material(mercury) || material(mars) ? {
        kind: 'mind',
        mercury: material(mercury) ? mercury : null,
        mars: material(mars) ? mars : null,
    } : null;
    /* An aspect a planet claimed and then did not get to use is released. */
    if (mind && !mind.mercury && mercury.aspect)
        claimed.delete(mercury.aspect.id);
    if (mind && !mind.mars && mars.aspect)
        claimed.delete(mars.aspect.id);
    if (!mind) {
        if (mercury.aspect)
            claimed.delete(mercury.aspect.id);
        if (mars.aspect)
            claimed.delete(mars.aspect.id);
    }
    /* --------------------------------------------------------- relate */
    const venus = noteFor('Venus', (aspect) => !(otherEnd(aspect, 'Venus') === 'Sun' && joined.includes('Venus')));
    const moon = bodies.Moon;
    const venusReading = bodies.Venus;
    const relation = venusReading.sign === moon.sign ? 'same-sign'
        : venusReading.element === moon.element ? 'same-element'
            : congenialElements(venusReading.element, moon.element) ? 'congenial' : 'friction';
    const relate = {
        kind: 'relate',
        venus,
        moon: { sign: moon.sign, state: moon.state, signs: moon.signs },
        relation,
    };
    /* ---------------------------------------------------------- pull */
    const tensions = [];
    if (luminaryTension) {
        tensions.push({
            score: 60 + (sunMoonAspect && (sunMoonAspect.kind === 'square' || sunMoonAspect.kind === 'opposition') ? 20 : 0),
            tension: {
                type: 'luminaries',
                sun: bigThree.sun.sign,
                moon: bigThree.moon.sign,
                aspect: sunMoonAspect && unclaimed(sunMoonAspect) ? claim(sunMoonAspect) : null,
                moonAlone: model.elements.state === 'known' && model.elements.counts[bigThree.moon.element] === 1
                    && model.elements.counts[bigThree.sun.element] >= 3,
            },
        });
    }
    for (const aspect of model.aspects) {
        /* A luminary carries a wider orb in the engine's own policy (eight degrees
           against six), and the tension threshold follows it by one degree. */
        const limit = aspect.involvesLuminary ? TENSION_ORB + 1 : TENSION_ORB;
        if (!readableAspect(aspect) || !unclaimed(aspect) || !isHard(aspect) || aspect.orb >= limit)
            continue;
        if (!aspect.involvesLuminary && !aspect.involvesPersonal)
            continue;
        if (insideKnot(aspect))
            continue;
        tensions.push({ score: 30 + aspect.salience / 2, tension: { type: 'aspect', aspect } });
    }
    if (meet && meet.state !== 'boundary' && meet.affinity === 'neither' && !luminaryTension && luminariesFixed) {
        tensions.push({
            score: 40,
            tension: { type: 'surface', rising: meet.rising, sun: bigThree.sun.sign, moon: bigThree.moon.sign },
        });
    }
    const lead = model.modalities;
    if (lead.state === 'known' && (lead.shape === 'single' || lead.shape === 'near')
        && bigThree.sun.modality === bigThree.moon.modality && bigThree.sun.modality !== lead.leaders[0]
        && luminariesFixed) {
        tensions.push({ score: 35, tension: { type: 'pace', lead: lead.leaders[0], luminaries: bigThree.sun.modality } });
    }
    const chosen = tensions
        .sort((a, b) => b.score - a.score)
        .filter((entry, index, list) => list.findIndex((other) => other.tension.type === entry.tension.type) === index)
        .slice(0, 2)
        .map((entry) => entry.tension);
    for (const tension of chosen)
        if (tension.type === 'aspect')
            claim(tension.aspect);
    const tension = chosen.length > 0 ? { kind: 'tension', tensions: chosen } : null;
    /* --------------------------------------------------------- helps */
    const overuse = [overuseOf(pattern, model)];
    if (moon.state !== 'boundary' && !(pattern.kind === 'concentration' && pattern.sign === moon.sign)) {
        overuse.push({ source: 'moon', sign: moon.sign });
    }
    const support = model.aspects.find((aspect) => readableAspect(aspect) && unclaimed(aspect) && !insideKnot(aspect)
        && (aspect.kind === 'trine' || aspect.kind === 'sextile') && aspect.involvesLuminary
        && aspect.orb < TIGHT_ORB) ?? null;
    claim(support);
    return {
        time,
        pattern,
        drive,
        meet,
        mind,
        relate,
        tension,
        helps: { kind: 'helps', patternKind: pattern.kind, overuse, practice: overuse, support },
        claimedAspects: [...claimed].sort(),
    };
}
/*
 * THE OPENING THEME, CHOSEN BY STRENGTH OF CONVERGENCE.
 *
 *   concentration  several of the chart's functions in one sign - the most
 *                  direct form of reinforcement a chart can show
 *   knot           one planet tied tightly to three others, two or more of
 *                  them at a hard angle: a theme made of pressure, not style
 *   temperament    one element or mode clearly ahead of the rest
 *   polarity       two elements carrying most of the chart, with the Sun or
 *                  the Moon alone outside them
 *   luminary       nothing converges: the Sun's sign sets the theme
 *
 * Only facts the time window leaves standing may open a reading.
 */
function choosePattern(model) {
    const signConcentration = model.concentrations
        .filter((entry) => entry.kind === 'sign' && entry.sign !== null && entry.state === 'known')
        .sort((a, b) => b.planets.length - a.planets.length
        || Number(b.includesLuminary) - Number(a.includesLuminary));
    const strong = signConcentration.find((entry) => entry.strength === 'strong');
    const concentrationClaim = (entry) => {
        const sign = entry.sign;
        const { element, modality } = SIGN_QUALITIES[sign];
        const members = new Set(entry.planets);
        /* The members sitting right on the Sun: the concentration's core, told with it. */
        const withSunAspects = entry.planets.includes('Sun')
            ? model.aspects.filter((aspect) => aspect.kind === 'conjunction' && involves(aspect, 'Sun')
                && members.has(otherEnd(aspect, 'Sun')) && readableAspect(aspect) && aspect.orb < TIGHT_ORB)
            : [];
        /* One planet outside meeting several members the same way. */
        const groups = new Map();
        for (const aspect of model.aspects) {
            if (!readableAspect(aspect) || aspect.orb >= TIGHT_ORB || aspect.kind === 'conjunction')
                continue;
            const inA = members.has(aspect.a);
            if (inA === members.has(aspect.b))
                continue;
            const outsider = inA ? aspect.b : aspect.a;
            const key = `${outsider}|${aspect.kind}`;
            groups.set(key, [...(groups.get(key) ?? []), aspect]);
        }
        const strongest = [...groups.values()]
            .filter((list) => list.length >= 2)
            .sort((a, b) => b.length - a.length
            || b.reduce((sum, aspect) => sum + aspect.salience, 0) - a.reduce((sum, aspect) => sum + aspect.salience, 0))[0];
        const outside = strongest ? {
            body: (members.has(strongest[0].a) ? strongest[0].b : strongest[0].a),
            kind: strongest[0].kind,
            members: strongest.map((aspect) => (members.has(aspect.a) ? aspect.a : aspect.b))
                .sort((a, b) => PLANET_ORDER.indexOf(a) - PLANET_ORDER.indexOf(b)),
            aspects: strongest,
        } : null;
        /* Whole Sign: one sign is one house, so every member shares it - read only
           when the houses can be read at all. */
        const houses = new Set(entry.planets.map((body) => model.bodies[body].house));
        const house = readable(model.houseState) && houses.size === 1 ? [...houses][0] : null;
        return {
            kind: 'concentration',
            sign,
            planets: entry.planets,
            strength: entry.strength,
            element: supportFor(model.elements, element),
            modality: supportFor(model.modalities, modality),
            withSun: withSunAspects.map((aspect) => otherEnd(aspect, 'Sun'))
                .sort((a, b) => PLANET_ORDER.indexOf(a) - PLANET_ORDER.indexOf(b)),
            withSunAspects,
            outside,
            house,
        };
    };
    if (strong)
        return concentrationClaim(strong);
    for (const center of ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars']) {
        if (model.bodies[center].state !== 'known')
            continue;
        const links = model.aspects.filter((aspect) => involves(aspect, center) && readableAspect(aspect)
            && aspect.state === 'known' && aspect.orb < TIGHT_ORB);
        if (links.length >= KNOT_LINKS && links.filter(isHard).length >= 2) {
            const members = [center, ...links.map((link) => otherEnd(link, center))];
            const memberSet = new Set(members);
            const modalities = new Set(members.map((member) => model.bodies[member].modality));
            return {
                kind: 'knot',
                center,
                links: [...links].sort((a, b) => a.orb - b.orb),
                internal: model.aspects
                    .filter((aspect) => !involves(aspect, center) && memberSet.has(aspect.a) && memberSet.has(aspect.b)
                    && readableAspect(aspect) && aspect.orb < TIGHT_ORB)
                    .sort((a, b) => a.orb - b.orb),
                sharedModality: modalities.size === 1 ? [...modalities][0] : null,
            };
        }
    }
    const element = model.elements.state === 'known' && model.elements.shape === 'single'
        ? model.elements.leaders[0] : null;
    const modality = model.modalities.state === 'known' && model.modalities.shape === 'single'
        ? model.modalities.leaders[0] : null;
    if (element || modality)
        return { kind: 'temperament', element, modality };
    if (model.outlier) {
        return { kind: 'polarity', mass: [model.outlier.mass[0], model.outlier.mass[1]], outlier: model.outlier };
    }
    const light = signConcentration[0];
    if (light)
        return concentrationClaim(light);
    const sun = model.bodies.Sun;
    return { kind: 'luminary', sign: sun.sign, spans: sun.state === 'boundary' ? sun.spans : [] };
}
function overuseOf(pattern, model) {
    switch (pattern.kind) {
        case 'concentration': return { source: 'sign', sign: pattern.sign };
        case 'knot': return {
            source: 'knot',
            center: pattern.center,
            others: pattern.links.map((link) => otherEnd(link, pattern.center))
                .filter((point) => !point.endsWith('Node')),
        };
        case 'temperament':
            return pattern.element ? { source: 'element', element: pattern.element }
                : { source: 'modality', modality: pattern.modality };
        /* The outlier's own style is what the rest of the chart does not share, so
           it is the one most easily overused in compensation - or overruled. */
        case 'polarity': return { source: 'sign', sign: model.bodies[pattern.outlier.body].sign };
        default: return pattern.spans.length > 1
            ? { source: 'sun-both', spans: pattern.spans }
            : { source: 'sign', sign: model.bodies.Sun.sign };
    }
}
