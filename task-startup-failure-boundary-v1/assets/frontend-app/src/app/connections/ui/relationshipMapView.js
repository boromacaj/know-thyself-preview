import { escapeAttribute, escapeHtml } from '../../format.js?v=2ea79e9';
import { AXIS_TEXT, CATEGORY_TEXT, DERIVED_NOTE, DRIVE_FINDINGS, FINDINGS, LIMITED_BRIEF, LIMITED_TEXT, PATTERN_TEXT, POLE_TEXT, STANCE_TEXT, TONE_TEXT, UI_TEXT, } from '../presentation/mapContent.js?v=2ea79e9';
import { MAP_CATEGORIES, selectHighlights, } from '../presentation/relationshipMap.js?v=2ea79e9';
import { dimensionScale } from './connectionsArt.js?v=2ea79e9';
const e = escapeHtml;
const a = escapeAttribute;
const text = (value, lang) => value[lang];
const INITIAL = (label) => Array.from(label.trim())[0]?.toLocaleUpperCase() ?? '?';
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
 * The sentence for one finding: chosen by the axis and by where the two people stand, with their names as the subjects. Null for a finding that cannot be worded (a quiet or unreadable one), which
 * the caller states as what it is instead.
 */
export function findingSentence(member, names, lang) {
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
/** The findings an area says on its row: the most important firm one and, when the area holds a differently-read one, that too. Never more than two. */
function briefMembers(category) {
    const firm = category.members.filter((member) => member.supported && member.shape);
    if (firm.length === 0)
        return [];
    const ranked = [...firm].sort((x, y) => y.weight - x.weight || y.salience - x.salience);
    const lead = ranked[0];
    const unlike = ranked.find((member) => member.role !== lead.role);
    return unlike ? [lead, unlike] : [lead];
}
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
const memberTone = (member) => (member.supported && member.role && member.role !== 'open' ? member.role : 'limited');
/** The compact track of one axis in a row: its label with a small shape for the member's own kind, and the two markers, on one line. */
function trackHtml(member, names, lang) {
    if (!member.axis)
        return '';
    const label = e(axisLabel(member, lang));
    if (member.state === 'unreadable' || !member.markers) {
        return `<span class="cx-rm-track cx-rm-track-open"><span class="cx-rm-axis">${toneShape('limited')}${label}</span><span class="cx-rm-soft">${e(text(LIMITED_BRIEF.unreadable, lang))}</span></span>`;
    }
    const scale = dimensionScale(member.markers, { first: INITIAL(names.first), second: INITIAL(names.second) });
    return `<span class="cx-rm-track"><span class="cx-rm-axis">${toneShape(memberTone(member))}${label}</span>${scale}</span>`;
}
function firmnessHtml(member, lang) {
    const support = text(UI_TEXT.support[member.corroboration], lang);
    const strength = text(UI_TEXT.strengthWord[member.strength], lang);
    return `<p class="cx-rm-firm">${e(text(UI_TEXT.howFirm, lang))}: ${e(support)} · ${e(text(UI_TEXT.strength, lang))}: ${e(strength)}${member.hedged ? ` · ${e(text(UI_TEXT.pulledBoth, lang))}` : ''}</p>`;
}
function partHtml(member, names, dimensions, withReason, lang) {
    const tone = memberTone(member);
    const view = dimensions.find((entry) => entry.id === member.dynamic);
    const finding = findingSentence(member, names, lang);
    const sentence = finding && member.supported ? `<p class="cx-rm-finding">${e(finding)}</p>` : '';
    const head = `<div class="cx-rm-part-head"><strong>${e(axisLabel(member, lang))}</strong>${member.state === 'told' && member.supported ? toneBadge(tone, lang) : toneBadge('limited', lang)}</div>`;
    if (member.drives) {
        return `<li class="cx-rm-part">${head}${sentence}<p class="cx-rm-persons">${driveLine(names.first, member.drives.first, lang)}</p><p class="cx-rm-persons">${driveLine(names.second, member.drives.second, lang)}</p>${firmnessHtml(member, lang)}</li>`;
    }
    const scale = member.markers && member.state !== 'unreadable'
        ? `<div class="cx-scale-wrap">${dimensionScale(member.markers, { first: INITIAL(names.first), second: INITIAL(names.second) })}${view?.scale ? `<div class="cx-scale-ends"><span>${e(view.scale[0])}</span><span>${e(view.scale[1])}</span></div>` : ''}</div>`
        : '';
    /* a part that stands on too little says what that is (a faint signal, one tradition, no clear preference, cannot be placed) rather than a finding */
    const reason = member.state === 'quiet' ? LIMITED_TEXT.quiet : member.state === 'unreadable' ? LIMITED_TEXT.unreadable : member.strength === 'faint' ? LIMITED_TEXT.faint : LIMITED_TEXT['single-source'];
    const note = member.supported || !withReason ? '' : `<p class="cx-rm-soft">${e(text(reason, lang))}</p>`;
    return `<li class="cx-rm-part">${head}${sentence}${scale}<p class="cx-rm-persons">${stanceLine(names.first, member.first, lang)}</p><p class="cx-rm-persons">${stanceLine(names.second, member.second, lang)}</p>${note}${member.state === 'told' ? firmnessHtml(member, lang) : ''}</li>`;
}
function detailHtml(category, names, dimensions, lang) {
    const limited = category.tone === 'limited' ? `<p class="cx-rm-says">${e(text(LIMITED_TEXT[category.reason ?? 'unreadable'], lang))}</p>` : '';
    const derived = category.derived ? `<p class="cx-note cx-rm-derived-note">${e(text(DERIVED_NOTE, lang))}</p><h4>${e(text(UI_TEXT.derivedFrom, lang))}</h4>` : '';
    const implication = implicationOf(category, lang);
    /* an area that is limited as a whole has said why above: its only part does not say it again */
    const withReason = !(category.tone === 'limited' && category.members.length <= 1);
    const parts = category.members.length ? `<ul class="cx-rm-parts">${category.members.map((member) => partHtml(member, names, dimensions, withReason, lang)).join('')}</ul>` : '';
    return `
    <div class="cx-rm-detail" id="cx-rm-detail-${a(category.id)}" role="region" aria-label="${a(text(CATEGORY_TEXT[category.id].label, lang))}" data-cx-dimension="${a(category.id)}">
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
function cardHtml(highlight, names, lang) {
    const heading = highlight.slot === 'connects' ? UI_TEXT.connects : highlight.slot === 'complements' ? UI_TEXT.complements : highlight.tone === 'asymmetry' ? UI_TEXT.attention : UI_TEXT.tension;
    const sentence = highlight.member ? findingSentence(highlight.member, names, lang) : null;
    if (!highlight.member || !highlight.category || !highlight.tone || !sentence) {
        const empty = highlight.slot === 'connects' ? UI_TEXT.emptyConnects : highlight.slot === 'complements' ? UI_TEXT.emptyComplements : UI_TEXT.emptyAttention;
        return `<li class="cx-rm-card cx-rm-card-empty" data-slot="${a(highlight.slot)}"><span class="cx-rm-card-head">${toneShape('limited')}<span>${e(text(heading, lang))}</span></span><span class="cx-rm-card-text">${e(text(empty, lang))}</span></li>`;
    }
    /* what is worth doing about it, for the two cards that point at a difference; what connects needs no instruction */
    const tone = highlight.tone;
    const practice = highlight.slot !== 'connects' && (tone === 'complement' || tone === 'friction' || tone === 'asymmetry')
        ? `<span class="cx-rm-card-practice">${e(text(CATEGORY_TEXT[highlight.category].implication[tone], lang))}</span>` : '';
    return `<li class="cx-rm-card" data-slot="${a(highlight.slot)}" data-tone="${a(highlight.tone)}">
      <button type="button" class="cx-rm-card-button" data-cx-focus="${a(highlight.category)}">
        <span class="cx-rm-card-head">${toneShape(highlight.tone)}<span>${e(text(heading, lang))}</span></span>
        <span class="cx-rm-card-text">${e(sentence)}</span>${practice}
        <span class="cx-rm-card-area">${e(text(CATEGORY_TEXT[highlight.category].label, lang))}<span class="cx-rm-card-go"> · ${e(text(UI_TEXT.open, lang))}</span></span>
      </button>
    </li>`;
}
/** The first screen's findings: what connects the two, how they can complement each other, where to pay attention; a slot with nothing defensible says so. Then how much of the map stands on more than one tradition. */
export function highlightsHtml(map, names, lang) {
    const { supported, total, pattern, timeUncertain } = map.summary;
    const cards = selectHighlights(map).map((highlight) => cardHtml(highlight, names, lang)).join('');
    const thin = pattern === 'thin' ? `<p class="cx-rm-statement">${e(text(PATTERN_TEXT.thin, lang))}</p>` : '';
    return `
    ${thin}
    <ul class="cx-rm-cards" aria-label="${a(text(UI_TEXT.mapTitle, lang))}">${cards}</ul>
    <p class="cx-note cx-rm-count">${e(text(UI_TEXT.coverage, lang))}: ${supported} ${e(text(UI_TEXT.of, lang))} ${total} ${e(text(UI_TEXT.coverageUnit, lang))}${timeUncertain ? ` · ${e(text(UI_TEXT.timeNote, lang))}` : ''}</p>
    <p class="cx-note cx-rm-count-note">${e(text(UI_TEXT.coverageNote, lang))}</p>`;
}
/** The map itself: one row per area, the open one followed by its detail. */
export function relationshipMapHtml(map, names, dimensions, focus, lang) {
    const open = MAP_CATEGORIES.includes(focus ?? '') ? focus : defaultCategory(map);
    const rows = map.categories.map((category) => {
        const expanded = category.id === open;
        /* the open row shows its detail, which draws each scale in full: the compact tracks and the brief would say the same thing twice */
        const tracks = expanded ? '' : category.derived || category.id === 'direction' ? '' : category.members.map((member) => trackHtml(member, names, lang)).join('');
        const brief = expanded ? '' : category.tone === 'limited'
            ? `<span class="cx-rm-brief">${e(text(LIMITED_BRIEF[category.reason ?? 'unreadable'], lang))}</span>`
            : briefMembers(category).map((member) => `<span class="cx-rm-brief">${e(findingSentence(member, names, lang) ?? '')}</span>`).join('');
        const cover = category.derived && !expanded ? `<span class="cx-rm-cover">${e(text(CATEGORY_TEXT[category.id].covers, lang))}</span>` : '';
        return `
      <li class="cx-rm-item" data-tone="${a(category.tone)}">
        <button type="button" class="cx-rm-row${expanded ? ' is-open' : ''}" data-cx-focus="${a(category.id)}" aria-expanded="${expanded}"${expanded ? ` aria-controls="cx-rm-detail-${a(category.id)}"` : ''}>
          <span class="cx-rm-head"><span class="cx-rm-name">${e(text(CATEGORY_TEXT[category.id].label, lang))}</span>${toneBadge(category.tone, lang)}<span class="cx-rm-chevron" aria-hidden="true"></span></span>
          ${cover}${brief}${tracks ? `<span class="cx-rm-tracks">${tracks}</span>` : ''}
        </button>
        ${expanded ? detailHtml(category, names, dimensions, lang) : ''}
      </li>`;
    }).join('');
    return `
    <section class="cx-panel cx-rm-map" aria-label="${a(text(UI_TEXT.mapTitle, lang))}">
      <h2>${e(text(UI_TEXT.mapTitle, lang))}</h2>
      <p class="cx-note">${e(text(UI_TEXT.mapHint, lang))}</p>
      <ul class="cx-rm-list">${rows}</ul>
      <p class="cx-note cx-rm-legend">${e(text(UI_TEXT.legend, lang))}</p>
    </section>`;
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
