import { composePractice } from './humanDesignPractice.js?v=b5ef5ed';
import { HD_NEEDS_TIME } from '../human-design/humanDesignEnvelope.js?v=b5ef5ed';
import { composeHumanDesignNarrative } from './human-design-narrative/composeHumanDesignNarrative.js?v=b5ef5ed';
import { resolve } from '../knowledge/knowledgeBase.js?v=b5ef5ed';
import { AUTHORITY_KEYS, CENTER_KEYS, DEFINITION_KEYS, TYPE_KEYS, normaliseKey, } from '../knowledge/human-design/humanDesignKeys.js?v=b5ef5ed';
import { hdAuthorityGlyph, hdCenterGlyph, hdGateGlyph, hdTypeGlyph, hdVariableArrow, } from './glyphs/pillarGlyphs.js?v=b5ef5ed';
import { SectionBuilder, outputValue } from './composeReading.js?v=b5ef5ed';
import { t, tf } from '../i18n/uiStrings.js?v=b5ef5ed';
const isKnownType = (value) => value in TYPE_KEYS;
/* The body/mind concepts this pillar legitimately touches, labelled for the
   marks that expose them. The entries themselves live in the encyclopedia and
   each carries its own scientific boundary. */
const CONCEPT_LABELS = {
    interoception: 'Interoception',
    'bodily-signal': 'Bodily decision signals',
    'autonomic-arousal': 'Autonomic arousal',
    'cognitive-rationalisation': 'Rationalisation',
};
const isKnownAuthority = (value) => value in AUTHORITY_KEYS;
const isKnownDefinition = (value) => value in DEFINITION_KEYS;
const CENTER_LABELS = {
    head: 'Head', ajna: 'Ajna', throat: 'Throat', g: 'G / Identity', ego: 'Heart / Ego',
    solarPlexus: 'Solar Plexus', sacral: 'Sacral', spleen: 'Spleen', root: 'Root',
};
function normaliseProfile(value) {
    if (!value)
        return undefined;
    const match = /(\d)\s*\/\s*(\d)/.exec(value);
    return match ? `${match[1]}/${match[2]}` : undefined;
}
/** Engines separate lists with commas or slashes; both are handled. */
function splitList(value) {
    if (!value)
        return [];
    return value.split(/[,/]/).map((part) => part.trim()).filter((part) => part.length > 0);
}
/** "9-52, 16-48" or "9-52 / 16-48" -> the channel ids. */
function channelIds(value) {
    if (!value)
        return [];
    return [...value.matchAll(/(\d{1,2}-\d{1,2})/g)].map((match) => match[1]);
}
/** Any run of digits that could be a gate number. */
function gateNumbers(value) {
    if (!value)
        return [];
    return [...value.matchAll(/\b(\d{1,2})\b/g)]
        .map((match) => Number(match[1]))
        .filter((gate) => gate >= 1 && gate <= 64);
}
export function composeHumanDesignReading(pillar) {
    const builder = new SectionBuilder();
    const shownLabels = [];
    const marksBySection = {};
    const heroMarks = [];
    const introduction = [
        t('reading.hd.intro.1'),
        t('reading.hd.intro.2'),
    ];
    /* ------------------------------------------------- the narrative, first */
    /*
     * Asked before anything else, because its answer decides whether this screen
     * has a reading on it at all. Everything below the withheld branch - the
     * hero marks, At a glance, every Go deeper section - is skipped rather than
     * suppressed value by value, so there is no list of nine "Suppressed" rows
     * to read as though the mechanics were nearly there.
     */
    const narrative = composeHumanDesignNarrative(pillar.humanDesignBodygraph);
    if (narrative.state === 'withheld') {
        builder.add('hd-withheld', [...narrative.paragraphs]);
        return { heroMarks, introduction, sections: builder.build(marksBySection), shownLabels };
    }
    /*
     * A mechanic an unknown birth time leaves open reaches this composer as
     * "Needs a birth time" (model.ts, humanDesignEnvelope.ts). It is absent here,
     * exactly as an unresolved one is: the hero, At a glance and every Go deeper
     * section below skip it, so only what holds all day is read.
     */
    const valueOf = (label) => {
        const value = outputValue(pillar, label);
        return value === HD_NEEDS_TIME || /^None (?:defined |open )?all day$/.test(value ?? '') ? null : value;
    };
    const typeValue = valueOf('Type');
    const strategyValue = valueOf('Strategy');
    const authorityValue = valueOf('Authority');
    const profileValue = valueOf('Profile');
    const definitionValue = valueOf('Definition');
    const signatureValue = valueOf('Signature');
    const notSelfValue = valueOf('Not-Self Theme');
    const authorityKey = authorityValue && isKnownAuthority(authorityValue)
        ? AUTHORITY_KEYS[authorityValue] : undefined;
    const definitionKey = definitionValue && isKnownDefinition(definitionValue)
        ? DEFINITION_KEYS[definitionValue] : undefined;
    const profileKey = normaliseProfile(profileValue);
    /* ------------------------------------------------------------- hero */
    if (typeValue) {
        shownLabels.push('Type');
        heroMarks.push({
            glyph: hdTypeGlyph(normaliseKey(typeValue), { title: typeValue }),
            label: 'Type', value: typeValue,
            infoKey: 'hd-type',
            ...(strategyValue ? { note: `Strategy: ${strategyValue}` } : {}),
        });
    }
    if (authorityValue) {
        shownLabels.push('Authority');
        heroMarks.push({
            glyph: hdAuthorityGlyph(authorityValue, { title: authorityValue }),
            label: 'Authority', value: authorityValue,
            infoKey: 'hd-authority',
        });
    }
    if (profileValue) {
        shownLabels.push('Profile');
        heroMarks.push({
            glyph: hdGateGlyph(), label: 'Profile', value: profileValue, infoKey: 'hd-profile',
        });
    }
    /* ---------------------------------------------------- AT A GLANCE */
    /*
     * The thirty-second answer, sitting directly under the BodyGraph. Everything
     * here is said again in prose below; the point is that a reader should not
     * have to read eight sections to find out what their Definition is.
     */
    const glanceMarks = [];
    const glance = (label, value, infoKey) => {
        if (!value)
            return;
        glanceMarks.push({
            glyph: '', label, value, ...(infoKey ? { infoKey } : {}),
        });
    };
    glance('Type', typeValue, 'hd-type');
    glance('Strategy', strategyValue, 'hd-strategy');
    glance('Authority', authorityValue, 'hd-authority');
    glance('Profile', profileValue, 'hd-profile');
    glance('Definition', definitionValue, 'hd-definition');
    glance('Signature', signatureValue);
    glance('Not-self theme', notSelfValue);
    const definedCentreNames = valueOf('Defined Centers');
    const definedChannelNames = valueOf('Defined Channels');
    if (definedCentreNames)
        glance('Defined centres', definedCentreNames, 'hd-defined-centre');
    if (definedChannelNames)
        glance('Defined channels', definedChannelNames, 'hd-channel');
    if (glanceMarks.length > 0) {
        builder.describe('at-a-glance', { layer: 'glance' });
        builder.standfirst('at-a-glance', t('reading.hd.atAGlance.standfirst'));
        marksBySection['at-a-glance'] = glanceMarks;
    }
    /* --------------------------------------- THE MAIN READING: one argument */
    for (const section of narrative.sections) {
        builder.add(section.id, section.paragraphs);
        if (section.standfirst)
            builder.standfirst(section.id, section.standfirst);
    }
    builder.setEntries('hd-evidence', narrative.evidence);
    builder.describe('hd-evidence', { layer: 'deep' });
    builder.standfirst('hd-evidence', narrative.evidenceStandfirst);
    /* Labels the reading has now accounted for, so the appendix does not list
       them again as values nobody used. */
    for (const label of ['Definition', 'Defined Centers', 'Open Centers', 'Defined Channels', 'Signature', 'Not-Self Theme']) {
        if (valueOf(label))
            shownLabels.push(label);
    }
    /* ============================ GO DEEPER ==================================
     * Everything below is `deep`. It is the authored detail behind the argument
     * above - the same units the reading used to print at the top, in the place
     * a reader reaches for after they have been told what any of it means.
     */
    /* ------------------------------------------- TYPE AND STRATEGY, in full */
    if (typeValue && isKnownType(typeValue)) {
        const context = {
            ...(authorityKey ? { authority: authorityKey } : {}),
            ...(profileKey ? { profile: profileKey } : {}),
            ...(definitionKey ? { definition: definitionKey } : {}),
        };
        const resolved = resolve({
            system: 'human-design', kind: 'hd-type', key: TYPE_KEYS[typeValue],
            role: 'type-role', context,
        }) ?? resolve({
            system: 'human-design', kind: 'hd-type', key: TYPE_KEYS[typeValue], role: 'base-archetype',
        });
        if (resolved) {
            builder.add('hd-type-detail', resolved.core);
            builder.describe('hd-type-detail', { layer: 'deep', infoKey: 'hd-type' });
            builder.standfirst('hd-type-detail', t('reading.hd.typeDetail.standfirst'));
        }
    }
    /* ----------------------------------------- THE DECIDING PRACTICE, in full */
    /* Strategy and Authority as a sequence rather than as two labels. The info
       controls on these entries are what make the body/mind layer reachable. */
    const practice = composePractice(typeValue && isKnownType(typeValue) ? typeValue : null, authorityValue && isKnownAuthority(authorityValue) ? authorityValue : null, strategyValue);
    if (practice) {
        builder.setEntries('deciding', practice.entries);
        builder.describe('deciding', { layer: 'deep', infoKey: 'hd-strategy' });
        builder.standfirst('deciding', practice.standfirst);
        /* Label and value this way round on purpose. A mark renders its label small
           and its value large, so naming the concept in the label put the word the
           reader needs in the quiet slot. Caught on the device, not in the DOM. */
        marksBySection.deciding = practice.concepts.map((concept) => ({
            glyph: '',
            label: 'Background',
            value: CONCEPT_LABELS[concept] ?? concept,
            infoKey: concept,
        }));
    }
    /* --------------------------------------------- THE AUTHORITY, in full */
    if (authorityKey) {
        const resolved = resolve({
            system: 'human-design', kind: 'hd-authority', key: authorityKey, role: 'authority-role',
            ...(typeValue && isKnownType(typeValue)
                ? { context: { type: TYPE_KEYS[typeValue] } } : {}),
        });
        if (resolved) {
            builder.add('hd-authority-detail', resolved.core);
            builder.describe('hd-authority-detail', { layer: 'deep', infoKey: 'hd-authority' });
            builder.standfirst('hd-authority-detail', t('reading.hd.authorityDetail.standfirst'));
        }
    }
    /* ------------------------------------------------ THE PROFILE, in full */
    if (profileKey) {
        const resolved = resolve({
            system: 'human-design', kind: 'hd-profile', key: profileKey, role: 'profile-role',
            ...(authorityKey ? { context: { authority: authorityKey } } : {}),
        });
        if (resolved) {
            builder.add('hd-profile-detail', resolved.core);
            builder.describe('hd-profile-detail', { layer: 'deep', infoKey: 'hd-profile' });
            builder.standfirst('hd-profile-detail', t('reading.hd.profileDetail.standfirst'));
        }
    }
    /* --------------------------------------------- THE DEFINITION, in full */
    if (definitionKey) {
        const resolved = resolve({
            system: 'human-design', kind: 'hd-definition', key: definitionKey, role: 'base-archetype',
        });
        if (resolved) {
            builder.add('hd-definition-detail', resolved.core);
            builder.describe('hd-definition-detail', { layer: 'deep', infoKey: 'hd-definition' });
            builder.standfirst('hd-definition-detail', t('reading.hd.definitionDetail.standfirst'));
        }
    }
    /* ------------------------------ DEFINED CENTRES / WHERE YOU ARE OPEN */
    const definedCenters = valueOf('Defined Centers');
    const openCenters = valueOf('Open Centers');
    const definedSet = new Set(splitList(definedCenters).map((name) => name.toLowerCase()));
    const openSet = new Set(splitList(openCenters).map((name) => name.toLowerCase()));
    const definedEntries = [];
    const openEntries = [];
    const definedMarks = [];
    const openMarks = [];
    for (const [engineId, knowledgeKey] of Object.entries(CENTER_KEYS)) {
        const label = CENTER_LABELS[engineId] ?? engineId;
        const shortLabel = label.split(' /')[0];
        const isDefined = definedSet.has(shortLabel.toLowerCase()) || definedSet.has(engineId.toLowerCase())
            || definedSet.has(label.toLowerCase());
        const isOpen = openSet.has(shortLabel.toLowerCase()) || openSet.has(engineId.toLowerCase())
            || openSet.has(label.toLowerCase());
        if (!isDefined && !isOpen)
            continue;
        const resolved = resolve({
            system: 'human-design', kind: 'hd-center',
            key: `${knowledgeKey}-${isDefined ? 'defined' : 'open'}`, role: 'center-role',
        });
        if (!resolved)
            continue;
        const mark = {
            glyph: hdCenterGlyph(isDefined), label: shortLabel,
            value: isDefined ? 'Defined' : 'Open',
        };
        const entry = {
            id: `center-${knowledgeKey}-${isDefined ? 'defined' : 'open'}`,
            title: tf(isDefined ? 'reading.hd.centreTitle.defined' : 'reading.hd.centreTitle.open', { centre: label }),
            mark,
            paragraphs: [
                ...resolved.core,
                ...(resolved.portrait.shadow ?? []),
                ...(resolved.portrait.growth ?? []),
            ],
        };
        if (isDefined) {
            definedEntries.push(entry);
            definedMarks.push(mark);
        }
        else {
            openEntries.push(entry);
            openMarks.push(mark);
        }
    }
    /* Defined and open centres are their own sections. Filing them under
       'strengths' and 'shadow' would quietly assert that a defined centre is a
       strength and an open one is a weakness; the system says neither. */
    if (definedEntries.length > 0) {
        builder.setEntries('defined-centres', definedEntries);
        builder.describe('defined-centres', { layer: 'deep', infoKey: 'hd-defined-centre' });
        builder.standfirst('defined-centres', t('reading.hd.definedCentres.standfirst'));
        marksBySection['defined-centres'] = definedMarks;
    }
    if (openEntries.length > 0) {
        builder.setEntries('open-centres', openEntries);
        builder.describe('open-centres', { layer: 'deep', infoKey: 'hd-open-centre' });
        builder.standfirst('open-centres', t('reading.hd.openCentres.standfirst'));
        marksBySection['open-centres'] = openMarks;
    }
    /* -------------------------------------------------- YOUR CHANNELS */
    const channels = channelIds(valueOf('Defined Channels'));
    const channelEntries = [];
    for (const id of channels) {
        const resolved = resolve({
            system: 'human-design', kind: 'hd-channel', key: id, role: 'base-archetype',
        });
        if (!resolved)
            continue;
        channelEntries.push({
            id: `channel-${id}`,
            title: resolved.entity.label,
            mark: { glyph: hdGateGlyph(), label: 'Channel', value: id },
            paragraphs: [...resolved.core],
        });
    }
    if (channelEntries.length > 0) {
        builder.setEntries('channels', channelEntries);
        builder.describe('channels', { layer: 'deep', infoKey: 'hd-channel' });
        builder.standfirst('channels', t('reading.hd.channels.standfirst'));
    }
    /* ------------------------------------------------------ KEY GATES */
    /* Structural ranking. The four cross gates first, then gates completing a
       defined channel. Everything else stays in Technical Details. */
    const crossGates = [];
    for (const label of ['Personality Sun', 'Personality Earth', 'Design Sun', 'Design Earth']) {
        crossGates.push(...gateNumbers(valueOf(label)).slice(0, 1));
    }
    const channelGates = new Set();
    for (const id of channels) {
        for (const part of id.split('-'))
            channelGates.add(Number(part));
    }
    const ranked = [];
    for (const gate of crossGates)
        if (!ranked.includes(gate))
            ranked.push(gate);
    for (const gate of [...channelGates].sort((a, b) => a - b)) {
        if (!ranked.includes(gate))
            ranked.push(gate);
    }
    const gateEntries = [];
    for (const gate of ranked.slice(0, 10)) {
        const resolved = resolve({
            system: 'human-design', kind: 'hd-gate', key: String(gate), role: 'base-archetype',
        });
        if (!resolved)
            continue;
        gateEntries.push({
            id: `gate-${gate}`,
            title: resolved.entity.label,
            mark: { glyph: hdGateGlyph(), label: 'Gate', value: String(gate) },
            paragraphs: [...resolved.core],
        });
    }
    if (gateEntries.length > 0) {
        builder.setEntries('gates', gateEntries);
        builder.describe('gates', { layer: 'deep', infoKey: 'hd-gate' });
        builder.standfirst('gates', t('reading.hd.gates.standfirst'));
    }
    /* -------------------------------------------- THE INCARNATION CROSS */
    const cross = valueOf('Incarnation Cross');
    if (cross) {
        shownLabels.push('Incarnation Cross');
        const resolved = resolve({
            system: 'human-design', kind: 'hd-cross', key: 'incarnation-cross', role: 'base-archetype',
        });
        if (resolved)
            builder.add('hd-cross', resolved.core);
        const angle = /left angle/i.test(cross) ? 'cross-angle-left'
            : /juxtaposition/i.test(cross) ? 'cross-angle-juxtaposition'
                : /right angle/i.test(cross) ? 'cross-angle-right' : null;
        if (angle) {
            const angleUnit = resolve({
                system: 'human-design', kind: 'hd-cross', key: angle, role: 'base-archetype',
            });
            if (angleUnit)
                builder.add('hd-cross', angleUnit.core);
        }
        builder.describe('hd-cross', { layer: 'deep' });
        builder.standfirst('hd-cross', t('reading.hd.cross.standfirst'));
    }
    /* ---------------------------------------------------- VARIABLES */
    const variables = valueOf('Variables');
    if (variables) {
        shownLabels.push('Variables');
        const arrows = [...variables.matchAll(/(left|right)/gi)].map((match) => match[1].toLowerCase());
        const labels = ['Determination', 'Environment', 'Motivation', 'Perspective'];
        marksBySection.variables = arrows.slice(0, 4).map((direction, index) => ({
            glyph: hdVariableArrow(direction === 'left' ? 'left' : 'right'),
            label: labels[index] ?? 'Variable',
            value: direction === 'left' ? 'Left' : 'Right',
        }));
        for (const variable of ['determination', 'environment', 'motivation', 'perspective']) {
            const resolved = resolve({
                system: 'human-design', kind: 'hd-variable', key: variable, role: 'variable-role',
            });
            if (resolved)
                builder.add('variables', resolved.core);
        }
        /* The orientation is interpreted; the colour, tone and base are calculated,
           shown in Technical Details, and deliberately not interpreted here. */
        const orientations = new Set(arrows);
        for (const side of ['left', 'right']) {
            if (!orientations.has(side))
                continue;
            const resolved = resolve({
                system: 'human-design', kind: 'hd-variable',
                key: `orientation-${side}`, role: 'variable-role',
            });
            if (resolved)
                builder.add('variables', resolved.core);
        }
        builder.describe('variables', { layer: 'deep' });
        builder.standfirst('variables', t('reading.hd.variables.standfirst'));
    }
    return { heroMarks, introduction, sections: builder.build(marksBySection), shownLabels };
}
