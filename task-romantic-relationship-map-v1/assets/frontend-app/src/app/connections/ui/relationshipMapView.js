import { escapeAttribute, escapeHtml } from '../../format.js';
import { AXIS_TEXT, CATEGORY_TEXT, DERIVED_NOTE, DRIVE_FINDINGS, FINDINGS, LIMITED_TEXT, PATTERN_TEXT, PILLAR_TEXT, POLE_TEXT, STANCE_TEXT, TONE_TEXT, UI_TEXT, } from '../presentation/mapContent.js';
import { selectHighlights, } from '../presentation/relationshipMap.js';
import { relationshipSpectrum } from './connectionsArt.js';
const e = escapeHtml;
const a = escapeAttribute;
const text = (value, lang) => value[lang];
/** The shape of a tone, as a small drawing: a shared direction (two overlapping rings), a balance (a half-filled ring), a coordination (a turned square), a clearer preference (an arrow), several patterns, too little (a dashed ring). */
export function toneShape(tone) {
    const body = {
        resonance: '<circle cx="6.5" cy="9" r="4.2"/><circle cx="11.5" cy="9" r="4.2"/>',
        complement: '<circle cx="9" cy="9" r="5.4"/><path d="M9 3.6v10.8" /><path d="M9 3.6a5.4 5.4 0 0 0 0 10.8z" fill="currentColor" stroke="none" opacity=".75"/>',
        friction: '<rect x="4.4" y="4.4" width="9.2" height="9.2" rx="1.2" transform="rotate(45 9 9)"/>',
        asymmetry: '<path d="M3 9h11M10.5 5.2 14.4 9l-3.9 3.8"/>',
        mixed: '<circle cx="9" cy="9" r="5.4"/><path d="M5.2 12.8 12.8 5.2"/>',
        limited: '<circle cx="9" cy="9" r="5.4" stroke-dasharray="2.2 2.4"/>',
    }[tone];
    return `<svg class="cx-rm-shape" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
const toneBadge = (tone, lang) => `<span class="cx-rm-tone" data-tone="${a(tone)}">${toneShape(tone)}<span>${e(text(TONE_TEXT[tone].label, lang))}</span></span>`;
/** What one person's position on an axis is, in words that carry no gender: a phrase after the name. */
function stanceLine(name, stance, lang) {
    if (!stance || stance.strength === 'unknown')
        return `${e(name)} · ${e(text(STANCE_TEXT.none, lang))}`;
    const phrase = stance.pole ? POLE_TEXT[stance.pole] : undefined;
    if (stance.mixed)
        return `${e(name)} · ${phrase ? `${e(text(phrase, lang))}; ${e(lang === 'sk' ? 'ťahá to však oboma smermi' : 'pulled both ways, though')}` : e(text(STANCE_TEXT.mixed, lang))}`;
    if (!stance.pole || stance.strength === 'middle')
        return `${e(name)} · ${e(text(STANCE_TEXT.middle, lang))}`;
    const slight = stance.strength === 'slight' ? ` <span class="cx-rm-soft">(${e(text(STANCE_TEXT.slight, lang))})</span>` : '';
    return `${e(name)} · ${phrase ? e(text(phrase, lang)) : ''}${slight}`;
}
function driveLine(name, drive, lang) {
    const phrase = drive ? POLE_TEXT[drive] : undefined;
    return `${e(name)} · ${e(text(STANCE_TEXT.driveLabel, lang))}: ${phrase ? e(text(phrase, lang)) : ''}`;
}
/* ---------------------------------------------------------------- findings -- */
const fill = (template, values) => template.replace(/\{([A-Za-z0-9]+)\}/g, (whole, key) => values[key] ?? whole);
/**
 * The sentence for one finding: chosen by the axis and by where the two people stand, with their names as the subjects. `qualify` adds the qualifier a slight or hedged position needs when the sentence stands alone (a card on the first screen); in a panel the lines directly beneath it (each person's place, the symbolic support) already say so, and saying it again after every finding was the most repeated sentence in the readings. Null for a finding that cannot be worded (a quiet or unreadable one), which
 * the caller states as what it is instead.
 */
export function findingSentence(member, names, lang, qualify = true) {
    const shape = member.shape;
    if (!shape || member.state !== 'told')
        return null;
    const named = (who) => (who === 'first' ? names.first : names.second);
    const other = (who) => (who === 'first' ? 'second' : 'first');
    if (shape.kind === 'drive') {
        const word = (drive) => (drive && POLE_TEXT[drive] ? text(POLE_TEXT[drive], lang) : '');
        const first = word(member.drives?.first);
        const second = word(member.drives?.second);
        return fill(text(DRIVE_FINDINGS[shape.relation], lang), { a: names.first, b: names.second, d: first, dA: first, dB: second });
    }
    if (!member.axis)
        return null;
    const bank = FINDINGS[member.axis];
    const slight = (stance) => stance?.strength === 'slight';
    /* a finding whose positions are only slight, or whose person is also pulled the other way, says so in the same breath: the words of a clear lean would claim more than the evidence */
    const pulled = (member.first?.mixed ? 1 : 0) + (member.second?.mixed ? 2 : 0);
    const hedge = member.hedged && pulled > 0
        ? pulled === 3 ? fill(text(UI_TEXT.qualHedgedBoth, lang), { a: names.first, b: names.second }) : fill(text(UI_TEXT.qualHedgedOne, lang), { who: pulled === 1 ? names.first : names.second })
        : null;
    const qualifier = (own) => {
        if (!qualify)
            return '';
        const note = hedge ?? (own ? text(own, lang) : null);
        return note ? ` ${note}` : '';
    };
    if (shape.kind === 'shared')
        return fill(text(bank.shared[shape.pole], lang), { a: names.first, b: names.second }) + qualifier(slight(member.first) && slight(member.second) ? UI_TEXT.qualSlightBoth : null);
    if (shape.kind === 'opposed')
        return fill(text(bank.opposed, lang), { p0: named(shape.pole0), p1: named(other(shape.pole0)) }) + qualifier(slight(member.first) || slight(member.second) ? UI_TEXT.qualSlightOne : null);
    return fill(text(bank.lean[shape.pole], lang), { lean: named(shape.lean), flex: named(other(shape.lean)) }) + qualifier(slight(shape.lean === 'first' ? member.first : member.second) ? UI_TEXT.qualSlightLean : null);
}
const IMPORTANCE_OF_ROLE = ['friction', 'asymmetry', 'complement', 'resonance'];
/** The one implication of an area: from its own tone, and for an area of several patterns from the pattern that most needs a word (friction, then a clearer preference, then a complement, then a shared direction). */
function implicationOf(category, lang) {
    if (category.tone === 'limited')
        return null;
    const bank = CATEGORY_TEXT[category.id].implication;
    if (category.tone !== 'mixed')
        return text(bank[category.tone], lang);
    const roles = new Set(category.members.filter((member) => member.supported).map((member) => member.role));
    const pick = IMPORTANCE_OF_ROLE.find((role) => roles.has(role));
    return pick ? text(bank[pick], lang) : null;
}
/* ------------------------------------------------------------------ pieces -- */
const axisLabel = (member, lang) => (member.axis ? text(AXIS_TEXT[member.axis], lang) : text(CATEGORY_TEXT.direction.label, lang));
export const memberTone = (member) => (member.supported && member.role && member.role !== 'open' ? member.role : 'limited');
function firmnessHtml(member, lang) {
    const support = text(UI_TEXT.support[member.corroboration], lang);
    const strength = text(UI_TEXT.strengthWord[member.strength], lang);
    return `<p class="cx-rm-firm">${e(text(UI_TEXT.howFirm, lang))}: ${e(support)} · ${e(text(UI_TEXT.strength, lang))}: ${e(strength)}${member.hedged ? ` · ${e(text(UI_TEXT.pulledBoth, lang))}` : ''}</p>`;
}
/** The traditions each person's position on this finding is drawn from, in words ("Drawn from: Anna: BaZi, Numerology · Ben: Human Design"). Empty when the engine holds no trace for it. */
function provenanceHtml(view, names, lang) {
    const side = (who, name) => {
        const trace = view?.trace[who];
        return trace && trace.pillars.length ? `${e(name)}: ${trace.pillars.map((pillar) => e(PILLAR_TEXT[pillar] ? text(PILLAR_TEXT[pillar], lang) : pillar)).join(', ')}` : '';
    };
    const parts = [side('first', names.first), side('second', names.second)].filter((part) => part !== '');
    return parts.length ? `<p class="cx-rm-prov">${e(text(UI_TEXT.drawnFrom, lang))}: ${parts.join(' · ')}</p>` : '';
}
function partHtml(member, names, dimensions, withReason, lang) {
    const tone = memberTone(member);
    const view = dimensions.find((entry) => entry.id === member.dynamic);
    const finding = findingSentence(member, names, lang, false);
    const sentence = finding && member.supported ? `<p class="cx-rm-finding">${e(finding)}</p>` : '';
    const head = `<div class="cx-rm-part-head"><strong>${e(axisLabel(member, lang))}</strong>${member.state === 'told' && member.supported ? toneBadge(tone, lang) : toneBadge('limited', lang)}</div>`;
    if (member.drives) {
        return `<li class="cx-rm-part">${head}${sentence}<p class="cx-rm-persons">${driveLine(names.first, member.drives.first, lang)}</p><p class="cx-rm-persons">${driveLine(names.second, member.drives.second, lang)}</p>${firmnessHtml(member, lang)}${provenanceHtml(view, names, lang)}</li>`;
    }
    /* the Relationship Spectrum: both people's places on the axis, with the evidence's uncertainty drawn as uncertainty (connectionsArt.ts) */
    const soft = (stance) => stance !== null && (stance.mixed || stance.strength === 'slight');
    const scale = member.markers && member.state !== 'unreadable'
        ? relationshipSpectrum({ name: names.first, position: member.markers.first, soft: soft(member.first) }, { name: names.second, position: member.markers.second, soft: soft(member.second) }, view?.scale ? [view.scale[0], view.scale[1]] : null, !member.supported || member.strength === 'faint', text(STANCE_TEXT.none, lang))
        : '';
    /* a part that stands on too little says what that is (a faint signal, one tradition, no clear preference, cannot be placed) rather than a finding */
    const reason = member.state === 'quiet' ? LIMITED_TEXT.quiet : member.state === 'unreadable' ? LIMITED_TEXT.unreadable : member.strength === 'faint' ? LIMITED_TEXT.faint : LIMITED_TEXT['single-source'];
    const note = member.supported || !withReason ? '' : `<p class="cx-rm-soft">${e(text(reason, lang))}</p>`;
    return `<li class="cx-rm-part">${head}${sentence}${scale}<p class="cx-rm-persons">${stanceLine(names.first, member.first, lang)}</p><p class="cx-rm-persons">${stanceLine(names.second, member.second, lang)}</p>${note}${member.state === 'told' ? firmnessHtml(member, lang) : ''}${member.state === 'told' ? provenanceHtml(view, names, lang) : ''}</li>`;
}
/** The detail of one area: its findings with their sentences, each person's place, the symbolic support, and one implication. The content of the dashboard's panel. */
export function categoryDetailHtml(category, names, dimensions, lang) {
    const limited = category.tone === 'limited' ? `<p class="cx-rm-says">${e(text(LIMITED_TEXT[category.reason ?? 'unreadable'], lang))}</p>` : '';
    const derived = category.derived ? `<p class="cx-note cx-rm-derived-note">${e(text(DERIVED_NOTE, lang))}</p><h4>${e(text(UI_TEXT.derivedFrom, lang))}</h4>` : '';
    const implication = implicationOf(category, lang);
    /* an area that is limited as a whole has said why above: its only part does not say it again */
    const withReason = !(category.tone === 'limited' && category.members.length <= 1);
    const parts = category.members.length ? `<ul class="cx-rm-parts">${category.members.map((member) => partHtml(member, names, dimensions, withReason, lang)).join('')}</ul>` : '';
    return `
    <div class="cx-rm-detail" id="cx-rm-detail-${a(category.id)}" data-cx-dimension="${a(category.id)}">
      ${limited}${derived}
      ${parts}
      ${implication ? `<p class="cx-rm-practice"><strong>${e(text(UI_TEXT.inPractice, lang))}.</strong> ${e(implication)}</p>` : ''}
    </div>`;
}
/** The area opened when the screen first appears: the one that most needs a word (the most important firm friction, clearer preference or mixed area), else the most important firm area, else the first. */
export function defaultCategory(map) {
    const rank = (category) => (category.lead ? category.lead.weight * 10 + category.lead.salience : 0);
    const attention = map.categories.filter((category) => !category.derived && (category.tone === 'friction' || category.tone === 'mixed' || category.tone === 'asymmetry'));
    const pick = [...attention].sort((x, y) => rank(y) - rank(x))[0]
        ?? [...map.categories].filter((category) => category.supported).sort((x, y) => rank(y) - rank(x))[0];
    return (pick ?? map.categories[0]).id;
}
/* ------------------------------------------------------------------ public -- */
/** The symbol of a card: a sun for what connects, three overlapping circles for what complements, a crescent for where to pay attention. */
export function slotSymbol(slot) {
    const body = {
        connects: '<circle cx="9" cy="9" r="3.1"/><path d="M9 1.6v2.4M9 14v2.4M1.6 9H4M14 9h2.4M3.8 3.8l1.7 1.7M12.5 12.5l1.7 1.7M3.8 14.2l1.7-1.7M12.5 5.5l1.7-1.7"/>',
        complements: '<circle cx="9" cy="6.4" r="3.9"/><circle cx="6.1" cy="11" r="3.9"/><circle cx="11.9" cy="11" r="3.9"/>',
        attention: '<path d="M12.8 2.6A6.8 6.8 0 1 0 15.4 11 5.4 5.4 0 0 1 12.8 2.6Z"/>',
    }[slot];
    return `<svg class="cx-rm-slot-symbol" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
function cardHtml(highlight, names, lang) {
    const heading = highlight.slot === 'connects' ? UI_TEXT.connects : highlight.slot === 'complements' ? UI_TEXT.complements : highlight.tone === 'asymmetry' ? UI_TEXT.attention : UI_TEXT.tension;
    const sentence = highlight.member ? findingSentence(highlight.member, names, lang) : null;
    if (!highlight.member || !highlight.category || !highlight.tone || !sentence) {
        const empty = highlight.slot === 'connects' ? UI_TEXT.emptyConnects : highlight.slot === 'complements' ? UI_TEXT.emptyComplements : UI_TEXT.emptyAttention;
        return `<li class="cx-rm-card cx-rm-card-empty" data-slot="${a(highlight.slot)}"><span class="cx-rm-card-head">${slotSymbol(highlight.slot)}<span>${e(text(heading, lang))}</span></span><span class="cx-rm-card-text">${e(text(empty, lang))}</span></li>`;
    }
    /* what is worth doing about it, for the two cards that point at a difference; what connects needs no instruction */
    const tone = highlight.tone;
    const practice = highlight.slot !== 'connects' && (tone === 'complement' || tone === 'friction' || tone === 'asymmetry')
        ? `<span class="cx-rm-card-practice">${e(text(CATEGORY_TEXT[highlight.category].implication[tone], lang))}</span>` : '';
    return `<li class="cx-rm-card" data-slot="${a(highlight.slot)}" data-tone="${a(highlight.tone)}">
      <button type="button" class="cx-rm-card-button" data-cx-focus="${a(highlight.category)}">
        <span class="cx-rm-card-head">${slotSymbol(highlight.slot)}<span>${e(text(heading, lang))}</span></span>
        <span class="cx-rm-card-text">${e(sentence)}</span>${practice}
        <span class="cx-rm-card-area">${e(text(CATEGORY_TEXT[highlight.category].label, lang))}<span class="cx-rm-card-go"> · ${e(text(UI_TEXT.open, lang))}</span></span>
      </button>
    </li>`;
}
/** The three things to notice: what connects the two, how they can complement each other, where to pay attention; a slot with nothing defensible says so and is never filled with something else. */
export function insightCardsHtml(map, names, lang) {
    const cards = selectHighlights(map).map((highlight) => cardHtml(highlight, names, lang)).join('');
    return `
    <section class="cx-dash-insights" aria-label="${a(text(UI_TEXT.insightsTitle, lang))}">
      <h2 class="cx-dash-h">${e(text(UI_TEXT.insightsTitle, lang))}</h2>
      <ul class="cx-rm-cards">${cards}</ul>
    </section>`;
}
/** How much of the map stands on more than one tradition (agreement between traditions, not accuracy), and the note on birth time when it is not exact. */
export function coverageHtml(map, lang) {
    const { supported, total, pattern, timeUncertain } = map.summary;
    const thin = pattern === 'thin' ? `<p class="cx-rm-statement">${e(text(PATTERN_TEXT.thin, lang))}</p>` : '';
    return `
    ${thin}
    <p class="cx-note cx-rm-count">${e(text(UI_TEXT.coverage, lang))}: ${supported} ${e(text(UI_TEXT.of, lang))} ${total} ${e(text(UI_TEXT.coverageUnit, lang))}${timeUncertain ? ` · ${e(text(UI_TEXT.timeNote, lang))}` : ''}</p>
    <p class="cx-note cx-rm-count-note">${e(text(UI_TEXT.coverageNote, lang))}</p>`;
}
/** The heading of a dimension in the technical evidence, in the map's own words: the area of life and the kind of relationship, never the older reading's label (which said that one side "adapts"). */
export function dimensionHeading(dimension, lang) {
    const label = dimension.axis ? text(AXIS_TEXT[dimension.axis], lang) : text(CATEGORY_TEXT.direction.label, lang);
    const firm = dimension.strength !== 'faint' && dimension.corroboration !== 'single-source' && dimension.role !== 'open';
    return `${label} — ${text(TONE_TEXT[firm ? dimension.role : 'limited'].label, lang)}`;
}
export const mapKicker = (lang) => text(UI_TEXT.kicker, lang);
export const mapFrame = (lang) => text(UI_TEXT.frame, lang);
export const mapLimitsTitle = (lang) => text(UI_TEXT.limitsTitle, lang);
