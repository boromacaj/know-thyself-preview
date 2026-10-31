import { escapeAttribute, escapeHtml } from '../../format.js?v=d9f39e7';
import { activeLocale } from '../../i18n/locale.js?v=d9f39e7';
import { tf, t } from '../../i18n/uiStrings.js?v=d9f39e7';
import { ktSonarAttrs } from '../../premium-earth/sonarAffordance.js?v=d9f39e7';
import { ageBandOf } from '../model/ageBands.js?v=d9f39e7';
import { CONNECTIONS_DOMAINS, OBSERVED_CONTEXT_BY_DOMAIN, RELATIONSHIP_KINDS_BY_DOMAIN, isDirectedKind, } from '../model/connectionsTypes.js?v=d9f39e7';
import { SITUATION_DYNAMIC } from '../reading/parentingExtras.js?v=d9f39e7';
import { researchSource } from '../research/researchIndex.js?v=d9f39e7';
import { MAX_CAREGIVERS, MAX_CHILDREN, MAX_CONTEXT, OWNER_ID, isReady, missingFrom } from '../state/flow.js?v=d9f39e7';
import { buildRelationshipMap } from '../presentation/relationshipMap.js?v=d9f39e7';
import { constellation, dimensionScale, domainMark } from './connectionsArt.js?v=d9f39e7';
import { dimensionHeading, highlightsHtml, mapFrame, mapKicker, mapLimitsTitle, relationshipMapHtml } from './relationshipMapView.js?v=d9f39e7';
const ui = (key) => t(key);
const uif = (key, params) => tf(key, params);
const e = escapeHtml;
const a = escapeAttribute;
/* ------------------------------------------------------------------ pieces -- */
function backBar() {
    return `<div class="cx-bar"><button type="button" class="cx-back" data-cx-back aria-label="${a(ui('ui.back'))}"><span aria-hidden="true">‹</span> ${e(ui('ui.back'))}</button></div>`;
}
const chip = (attrs, label, pressed, extra = '') => (`<button type="button" class="cx-chip${pressed ? ' is-on' : ''}" ${attrs}${pressed === null ? '' : ` aria-pressed="${pressed}"`}>${e(label)}${extra}</button>`);
function ageLabel(age) {
    const sk = activeLocale() === 'sk';
    const plural = (n, one, few, many) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);
    if (age.years < 2 && age.totalMonths < 24) {
        const n = age.totalMonths;
        return uif(sk ? plural(n, 'cx.age.months.one', 'cx.age.months.few', 'cx.age.months') : (n === 1 ? 'cx.age.months.one' : 'cx.age.months'), { n });
    }
    const n = age.years;
    return uif(sk ? plural(n, 'cx.age.years.one', 'cx.age.years.few', 'cx.age.years') : (n === 1 ? 'cx.age.years.one' : 'cx.age.years'), { n });
}
export { ageLabel };
/* ----------------------------------------------------------------- domains -- */
export function renderDomains(model) {
    const cards = CONNECTIONS_DOMAINS.map((domain) => `
      <button type="button" class="cx-domain" data-cx-domain="${a(domain)}" data-domain="${a(domain)}">
        <span class="cx-domain-art" aria-hidden="true">${domainMark(domain)}</span>
        <span class="cx-domain-name">${e(ui(`cx.domain.${domain}`))}</span>
        <span class="cx-domain-line">${e(ui(`cx.domain.${domain}.line`))}</span>
      </button>`).join('');
    const resume = model.canResume ? `<button type="button" class="cx-button cx-quiet" data-cx-resume>${e(ui('cx.resume'))}</button>` : '';
    const kept = model.people.filter((person) => person.retention === 'device');
    const keptList = kept.length ? `
    <section class="cx-panel cx-kept" aria-label="${a(ui('cx.people.title'))}">
      <h2>${e(ui('cx.people.title'))}</h2>
      <ul class="cx-people">${kept.map((person) => `<li><span>${e(person.label)}</span><button type="button" class="cx-link-button" data-cx-remove="${a(person.id)}" aria-label="${a(uif('cx.remove.aria', { name: person.label }))}">${e(ui('cx.remove'))}</button></li>`).join('')}</ul>
    </section>` : '';
    return `
    <div class="cx" data-cx-level="domains">
      <header class="cx-head">
        <h1 class="cx-title">${e(ui('cx.title'))}</h1>
        <p class="cx-sub">${e(ui('cx.subtitle'))}</p>
      </header>
      <div class="cx-domains" role="group" aria-label="${a(ui('cx.domains.aria'))}">${cards}</div>
      ${resume ? `<div class="cx-actions cx-center">${resume}</div>` : ''}
      ${keptList}
      <footer class="cx-foot">
        <p class="cx-note">${e(ui('cx.privacy'))}</p>
        <button type="button" class="cx-link-button" data-cx-forget>${e(ui('cx.forget'))}</button>
        <p class="cx-note cx-forgot" role="status" ${model.forgotten ? '' : 'hidden'}>${e(ui('cx.forget.done'))}</p>
      </footer>
    </div>`;
}
/* ------------------------------------------------------------------- setup -- */
const kindLabel = (kind) => ui(`cx.kind.${kind}`);
const ROLE_NAMES = {
    'adult-parent-adult-child': ['parent', 'adult-child'],
    'grandparent-grandchild': ['grandparent', 'grandchild'],
    'manager-collaborator': ['manager', 'collaborator'],
    'mentor-mentee': ['mentor', 'mentee'],
};
function personChips(model, selected, attr, taken) {
    const available = model.people.filter((person) => !taken.includes(person.id));
    if (available.length === 0)
        return '';
    return `<div class="cx-chips" role="group" aria-label="${a(ui('cx.add.choose'))}">${available.map((person) => chip(`${attr}="${a(person.id)}"`, person.age ? `${person.label} · ${person.age}` : person.label, selected.includes(person.id))).join('')}</div>`;
}
function selectedPeople(model, ids, attr) {
    if (ids.length === 0)
        return '';
    return `<ul class="cx-people cx-chosen">${ids.map((id) => {
        const person = model.people.find((entry) => entry.id === id);
        if (!person)
            return '';
        return `<li><span>${e(person.age ? `${person.label} · ${person.age}` : person.label)}</span><button type="button" class="cx-link-button" ${attr}="${a(id)}" aria-label="${a(uif('cx.remove.aria', { name: person.label }))}">${e(ui('cx.remove'))}</button></li>`;
    }).join('')}</ul>`;
}
export function renderSetup(model) {
    const { flow } = model;
    const domain = flow.domain;
    const kinds = RELATIONSHIP_KINDS_BY_DOMAIN[domain];
    const content = model.content.domains[domain];
    const missing = missingFrom(flow);
    const ready = isReady(flow);
    /* ---- the relationship ---- */
    let relationship = '';
    if (domain === 'parenting') {
        relationship = `<section class="cx-panel"><h2>${e(ui('cx.step.relationship'))}</h2><div class="cx-chips">${['parent-child', 'caregiver-child'].map((kind) => chip(`data-cx-kind="${kind}"`, kindLabel(kind), flow.kind === kind)).join('')}</div></section>`;
    }
    else if (kinds.length > 1) {
        relationship = `<section class="cx-panel"><h2>${e(ui('cx.step.relationship'))}</h2><div class="cx-chips">${kinds.map((kind) => chip(`data-cx-kind="${kind}"`, kindLabel(kind), flow.kind === kind)).join('')}</div></section>`;
    }
    /* ---- who ---- */
    let who = '';
    if (domain === 'parenting') {
        const addAdult = flow.caregivers.length + 1 < MAX_CAREGIVERS ? `<button type="button" class="cx-button" data-cx-add="adult">${e(ui('cx.add.adult'))}</button>` : '';
        const addChild = MAX_CHILDREN > flow.children.length ? `<button type="button" class="cx-button" data-cx-add="child">${e(ui('cx.add.child'))}</button>` : '';
        const adults = `
        <h3>${e(ui('cx.adults'))}</h3>
        <ul class="cx-people cx-chosen"><li><span>${e(uif('cx.you.as', { name: model.ownerLabel }))}</span></li></ul>
        ${selectedPeople(model, flow.caregivers, 'data-cx-drop')}
        ${addAdult}
        ${personChips(model, flow.caregivers, 'data-cx-pick-adult', [...flow.children])}`;
        const kids = `
        <h3>${e(ui('cx.children'))}</h3>
        ${selectedPeople(model, flow.children, 'data-cx-drop')}
        ${addChild}
        ${personChips(model, flow.children, 'data-cx-pick-child', [...flow.caregivers])}`;
        who = `<section class="cx-panel"><h2>${e(ui('cx.step.who'))}</h2>${adults}${kids}</section>`;
    }
    else {
        const directed = flow.kind ? isDirectedKind(flow.kind) : false;
        const roles = flow.kind ? ROLE_NAMES[flow.kind] : undefined;
        const roleToggle = directed && roles ? `
        <div class="cx-role" role="group" aria-label="${a(ui('cx.role.question'))}">
          <span class="cx-role-q">${e(ui('cx.role.question'))}</span>
          ${chip('data-cx-role="first"', ui(`cx.role.${roles[0]}`), flow.ownerIsFirst)}${chip('data-cx-role="second"', ui(`cx.role.${roles[1]}`), !flow.ownerIsFirst)}
        </div>` : '';
        who = `
      <section class="cx-panel">
        <h2>${e(ui('cx.step.who'))}</h2>
        <ul class="cx-people cx-chosen"><li><span>${e(uif('cx.you.as', { name: model.ownerLabel }))}</span></li></ul>
        ${roleToggle}
        <h3>${e(ui('cx.other'))}</h3>
        ${flow.other ? selectedPeople(model, [flow.other], 'data-cx-drop') : `<button type="button" class="cx-button" data-cx-add="other">${e(ui('cx.add.person'))}</button>`}
        ${flow.other ? '' : personChips(model, [], 'data-cx-pick-other', [])}
      </section>`;
    }
    /* ---- what the user notices ---- */
    const codes = OBSERVED_CONTEXT_BY_DOMAIN[domain];
    const notice = `
      <section class="cx-panel cx-optional">
        <details ${flow.context.length ? 'open' : ''}>
          <summary><span>${e(ui('cx.step.notice'))}</span><span class="cx-opt">${e(ui('cx.step.optional'))}</span></summary>
          <p class="cx-note">${e(ui('cx.notice.hint'))}</p>
          <div class="cx-chips" role="group" aria-label="${a(ui('cx.step.notice'))}">${codes.map((code) => chip(`data-cx-notice="${a(code)}"`, ui(`cx.observed.${code}`), flow.context.includes(code))).join('')}</div>
        </details>
      </section>`;
    const helper = ready ? '' : `<p class="cx-note cx-need" data-cx-need role="status">${e(missing.includes('kind') ? ui('cx.need.kind') : missing.includes('child') ? ui('cx.need.child') : ui('cx.need.other'))}</p>`;
    const error = model.error ? `<p class="cx-error" role="alert">${e(model.error)}</p>` : '';
    void content;
    return `
    <div class="cx" data-cx-level="setup" data-domain="${a(domain)}">
      ${backBar()}
      <header class="cx-head cx-head-setup">
        <span class="cx-domain-art cx-small" aria-hidden="true">${domainMark(domain)}</span>
        <h1 class="cx-title">${e(ui(`cx.domain.${domain}`))}</h1>
      </header>
      ${relationship}${who}${notice}
      ${error}${helper}
      <div class="cx-actions cx-center"><button type="button" class="cx-button cx-primary" data-cx-run ${ready && !model.busy ? '' : 'disabled aria-disabled="true"'}>${e(model.busy ? ui('cx.reading') : ui('cx.run'))}</button></div>
      <p class="cx-note cx-center">${e(ui('cx.privacy'))}</p>
    </div>`;
}
/* ------------------------------------------------------------------ result -- */
const initialOf = (label) => Array.from(label.trim())[0]?.toLocaleUpperCase() ?? '?';
function paragraphsHtml(paragraphs) {
    return paragraphs.map((text) => `<p>${e(text)}</p>`).join('');
}
function sectionHtml(section) {
    return `<section class="cx-prose" data-cx-section="${a(section.id)}"><h3>${e(section.title)}</h3>${paragraphsHtml(section.paragraphs)}</section>`;
}
function glance(reading, content) {
    const roles = [['resonance', 0], ['complement', 0.22], ['friction', 0.45]];
    const buttons = roles.map(([role, delay]) => {
        const dimension = reading.dimensions.find((entry) => entry.surfaced && entry.role === role);
        if (!dimension)
            return '';
        const label = e(dimension.roleLabel);
        return `<button type="button" class="cx-glance cx-glance-${role}" data-cx-focus="${a(dimension.id)}" ${ktSonarAttrs({ shape: 'pill', delay })}>
        <span class="cx-glance-role">${label}</span><span class="cx-glance-label">${e(dimension.label)}</span></button>`;
    }).join('');
    void content;
    return buttons ? `<div class="cx-glances" role="group">${buttons}</div>` : '';
}
function dimensionPanel(view, names) {
    const markers = view.markers
        ? `<div class="cx-scale-wrap">${dimensionScale(view.markers, { first: initialOf(names.first), second: initialOf(names.second) })}${view.scale ? `<div class="cx-scale-ends"><span>${e(view.scale[0])}</span><span>${e(view.scale[1])}</span></div>` : ''}</div>` : '';
    const corroboration = view.corroboration === 'firm' ? ui('cx.evidence.corroboration.firm') : view.corroboration === 'supported' ? ui('cx.evidence.corroboration.supported') : ui('cx.evidence.corroboration.single');
    const [summary, ...rest] = view.detail;
    return `
    <article class="cx-dim" data-cx-dimension="${a(view.id)}" aria-live="polite">
      <header><span class="cx-badge cx-badge-${a(view.role)}">${e(view.roleLabel)}</span><h3>${e(view.title)}</h3></header>
      ${markers}
      <p>${e(summary ?? view.summary)}</p>
      ${rest.length ? `<details class="cx-more"><summary>${e(ui('cx.dimension.more'))}</summary>${paragraphsHtml(rest)}</details>` : ''}
      <p class="cx-corroboration">${e(corroboration)}</p>
    </article>`;
}
function explore(reading, focus, names) {
    const surfaced = reading.dimensions.filter((dimension) => dimension.surfaced);
    const list = surfaced.length ? surfaced : reading.dimensions;
    if (list.length === 0)
        return '';
    const active = list.find((dimension) => dimension.id === focus) ?? list[0];
    const chips = list.map((dimension) => chip(`data-cx-focus="${a(dimension.id)}" data-role="${a(dimension.role)}"`, dimension.label, dimension.id === active.id)).join('');
    return `
    <section class="cx-panel cx-explore" aria-label="${a(ui('cx.section.explore'))}">
      <h2>${e(ui('cx.section.explore'))}</h2>
      <p class="cx-note">${e(ui('cx.section.explore.hint'))}</p>
      <div class="cx-strip" role="group">${chips}</div>
      ${dimensionPanel(active, names)}
    </section>`;
}
function practicesHtml(reading, content, domain, lang) {
    return practiceCardsHtml(reading.practices, content, domain, lang);
}
/** The guidance cards, each with its research, for a pair reading or for what the household reading answers. */
function practiceCardsHtml(practices, content, domain, lang) {
    const dc = content.domains[domain];
    if (practices.length === 0)
        return '';
    const cards = practices.map((practice) => {
        const sources = practice.sources.map((id) => researchSource(id)).filter((source) => Boolean(source));
        const research = sources.length ? `
        <details class="cx-research"><summary>${e(ui('cx.practice.sources'))} · ${sources.length}</summary>
          <ul>${sources.map((source) => `<li><a href="${a(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.ref)}</a> — ${e(source.title)} <span class="cx-quality cx-quality-${source.quality}">${e(ui(`cx.evidence.quality.${source.quality}`))}</span></li>`).join('')}</ul>
        </details>` : '';
        return `
      <article class="cx-practice" data-cx-practice="${a(practice.id)}">
        ${practice.forLabel ? `<span class="cx-for">${e(practice.forLabel)}</span>` : ''}
        <h3>${e(practice.title)}</h3>
        <p>${e(practice.body)}</p>
        ${research}
      </article>`;
    }).join('');
    return `
    <section class="cx-panel cx-guidance" aria-label="${a(lang === 'sk' ? dc.sections.guidance.sk : dc.sections.guidance.en)}">
      <h2>${e(lang === 'sk' ? dc.sections.guidance.sk : dc.sections.guidance.en)}</h2>
      <p>${e(lang === 'sk' ? dc.guidanceIntro.sk : dc.guidanceIntro.en)}</p>
      <div class="cx-practices">${cards}</div>
      <p class="cx-care">${e(lang === 'sk' ? dc.care.sk : dc.care.en)}</p>
    </section>`;
}
function evidenceHtml(pair, reading, content, lang, heading = (dimension) => `${dimension.label} — ${dimension.roleLabel}`) {
    const unreadable = pair.evidence.coverage.unreadableAxes.length;
    const dims = reading.dimensions.map((dimension) => {
        const trace = (side) => {
            const item = dimension.trace[side];
            if (!item)
                return '';
            const pillars = item.pillars.map((pillar) => ui(`cx.pillar.${pillar === 'astrology' ? 'astrology' : pillar === 'human-design' ? 'human-design' : pillar}`)).join(', ');
            const facts = item.facts.length ? `<ul>${item.facts.map((fact) => `<li>${e(fact)}</li>`).join('')}</ul>` : '';
            return `<div class="cx-trace"><strong>${e(item.person)}</strong>${pillars ? `<span>${e(uif('cx.evidence.pillars', { list: pillars }))}</span>` : ''}${facts}</div>`;
        };
        return `<details class="cx-trace-dim"><summary>${e(heading(dimension))}</summary>${trace('first')}${trace('second')}</details>`;
    }).join('');
    const signatures = reading.signatures.length ? `<h4>${e(ui('cx.evidence.traditions'))}</h4><p class="cx-note">${e(content.shared.signaturesLede[lang])}</p><ul class="cx-sigs">${reading.signatures.map((signature) => `<li><span class="cx-sig-chip">${e(signature.chips.first)}</span> <span class="cx-sig-rel">${e(signature.chips.relation)}</span> <span class="cx-sig-chip">${e(signature.chips.second)}</span><span class="cx-sig-text">${e(signature.text.charAt(0).toLocaleUpperCase() + signature.text.slice(1))}</span></li>`).join('')}</ul>` : '';
    return `
    <details class="cx-panel cx-evidence" data-cx-evidence>
      <summary><span>${e(ui('cx.section.evidence'))}</span></summary>
      <p class="cx-note">${e(ui('cx.evidence.note'))}</p>
      ${signatures}
      <h4>${e(ui('cx.evidence.dimensions'))}</h4>
      ${dims}
      ${unreadable ? `<p class="cx-note">${e(ui('cx.evidence.unreadable'))}</p>` : ''}
    </details>`;
}
/**
 * A child's own block: the portrait and the guide for the age. Under the household page it is told whole; under a pair, when the household page exists, only the situations that bear on the pair
 * (the ones the user named, and the one the pair's central dimension draws on) are shown, and the whole is pointed to: the same child is not told in full under every pair.
 */
function childHtml(child, expanded, brief = null) {
    const guide = child.guide;
    const portrait = child.portrait.paragraphs.length ? `<div class="cx-prose"><h4>${e(ui('cx.child.portrait'))}</h4>${paragraphsHtml(child.portrait.paragraphs)}</div>` : '';
    const shown = guide ? (brief ? guide.situations.filter((situation) => situation.priority || (brief.dynamic !== null && SITUATION_DYNAMIC[situation.id] === brief.dynamic)).slice(0, 2) : guide.situations) : [];
    const items = guide ? shown.map((situation) => `
        <details class="cx-situation" ${situation.priority ? 'open' : ''}>
          <summary><span>${e(situation.title)}</span>${situation.priority ? `<span class="cx-flag">${e(ui('cx.guide.priority'))}</span>` : ''}</summary>
          <p><strong>${e(ui('cx.guide.know'))}.</strong> ${e(situation.know)}</p>
          <p><strong>${e(ui('cx.guide.try'))}.</strong> ${e(situation.try)}</p>
          ${situation.fit ? `<p class="cx-fit"><strong>${e(ui('cx.guide.fit'))}.</strong> ${e(situation.fit)}</p>` : ''}
        </details>`).join('') : '';
    const guideHtml = guide ? `
      <div class="cx-guide">
        <h4>${e(ui('cx.guide.title'))} — ${e(guide.label)}</h4>
        <p>${e(guide.portrait)}</p>
        <p class="cx-note"><strong>${e(ui('cx.guide.notyet'))}.</strong> ${e(guide.notYet)}</p>
        ${items}
        ${brief ? `<p class="cx-note">${e(uif('cx.child.fullGuide', { name: child.portrait.name }))}</p>` : ''}
      </div>` : '';
    return `<section class="cx-panel cx-child" data-cx-child="${a(child.person)}" ${expanded ? '' : ''}><h2>${e(child.portrait.name)} <span class="cx-age">${e(ageLabel(child.age))}</span></h2>${portrait}${guideHtml}</section>`;
}
/**
 * THE ROMANTIC RESULT: a map, not an essay. The relationship at a glance (one statement and the areas in each kind of relationship), the map (one row per area, the open one followed by what the
 * profiles show and why), the few practices the findings call for, and the evidence behind a closed disclosure. The other three domains keep the reading they have.
 */
function romanticBody(analysis, pair, art, model, content) {
    const reading = pair.reading;
    const lang = analysis.lang;
    const names = { first: pair.first.person.label, second: pair.second.person.label };
    const map = buildRelationshipMap(pair.evidence, pair.interpretation);
    const limits = reading.sections.find((section) => section.id === 'limits');
    const noticed = model.flow.context.length ? `<p class="cx-noticed"><span>${e(ui('cx.result.noticed'))}:</span> ${model.flow.context.map((code) => `<span class="cx-tag">${e(ui(`cx.observed.${code}`))}</span>`).join(' ')}</p>` : '';
    return `
      <section class="cx-panel cx-hero cx-rm-hero">
        ${art}
        <p class="cx-between">${e(mapKicker(lang))}</p>
        <h1 class="cx-title cx-headline">${e(uif('cx.result.between', { a: names.first, b: names.second }))}</h1>
        ${highlightsHtml(map, names, lang)}
        ${noticed}
        <p class="cx-note cx-rm-frame">${e(mapFrame(lang))}</p>
      </section>
      ${relationshipMapHtml(map, names, reading.dimensions, model.focus, lang)}
      ${practicesHtml(reading, content, pair.edge.domain, lang)}
      ${limits ? `<details class="cx-panel cx-rm-limits"><summary><span>${e(mapLimitsTitle(lang))}</span></summary>${paragraphsHtml(limits.paragraphs)}</details>` : ''}
      ${evidenceHtml(pair, reading, content, lang, (dimension) => dimensionHeading(dimension, lang))}`;
}
export function renderResult(model) {
    const analysis = model.analysis;
    if (!analysis) {
        return `<div class="cx" data-cx-level="result">${backBar()}<p class="cx-note cx-center" role="status">${e(model.error ?? ui('cx.reading'))}</p></div>`;
    }
    const lang = analysis.lang;
    const content = model.content;
    const readable = analysis.pairs.filter((pair) => pair.reading !== null);
    /* a household with no pattern to tell still answers what the user reported (its words, a step, a research-backed card), so it has a page when it says more than that it is quiet */
    const household = analysis.household && (!analysis.household.quiet || analysis.household.paragraphs.length > 1) ? analysis.household : null;
    const choices = [
        ...(household || analysis.pairs.length > 2 ? [{ id: 'household', label: ui('cx.household.title') }] : []),
        ...readable.map((pair) => ({ id: pair.edge.id, label: uif('cx.result.between', { a: pair.first.person.label, b: pair.second.person.label }) })),
    ];
    const selected = choices.find((choice) => choice.id === model.pair)?.id ?? (household ? 'household' : readable[0]?.edge.id ?? choices[0]?.id ?? 'household');
    const pills = choices.length > 1 ? `<div class="cx-pairs" role="group" aria-label="${a(ui('cx.household.pairs'))}">${choices.map((choice) => chip(`data-cx-pair="${a(choice.id)}"`, choice.label, choice.id === selected)).join('')}</div>` : '';
    const nodes = analysis.domain === 'parenting'
        ? [
            ...new Map(analysis.pairs.flatMap((pair) => [pair.edge.from, pair.edge.to].map((id) => [id, id]))).keys(),
        ].map((id) => {
            const p = analysis.pairs.flatMap((pair) => [pair.first, pair.second]).find((entry) => entry.person.id === id);
            const isChild = analysis.children.some((child) => child.person === id);
            return { id, initial: initialOf(p.person.label), row: isChild ? 'bottom' : 'top' };
        })
        : analysis.pairs.slice(0, 1).flatMap((pair) => [
            { id: pair.first.person.id, initial: initialOf(pair.first.person.label), row: 'middle' },
            { id: pair.second.person.id, initial: initialOf(pair.second.person.label), row: 'middle' },
        ]);
    const edges = analysis.pairs.map((pair) => ({
        id: pair.edge.id, from: pair.edge.from, to: pair.edge.to,
        style: pair.edge.kind === 'siblings-in-household' ? 'dashed' : pair.edge.kind === 'co-parents' ? 'double' : 'solid',
    }));
    const art = constellation(nodes, edges, selected === 'household' ? null : selected);
    const body = (() => {
        if (selected === 'household') {
            return `
        <section class="cx-panel cx-hero">${art}<h1 class="cx-title cx-headline">${e(household?.headline ?? ui('cx.household.title'))}</h1>${household ? `<div class="cx-prose">${paragraphsHtml(household.paragraphs)}</div>` : ''}</section>
        ${household ? practiceCardsHtml(household.practices, content, analysis.domain, lang) : ''}
        ${analysis.children.map((child) => childHtml(child, true)).join('')}`;
        }
        const pair = analysis.pairs.find((entry) => entry.edge.id === selected) ?? readable[0];
        if (!pair || !pair.reading)
            return '';
        const reading = pair.reading;
        const names = { first: pair.first.person.label, second: pair.second.person.label };
        if (analysis.domain === 'romantic')
            return romanticBody(analysis, pair, art, model, content);
        const overview = reading.sections.find((section) => section.id === 'overview');
        const rest = reading.sections.filter((section) => section.id !== 'overview');
        const child = pair.child ? analysis.children.find((entry) => entry.person === pair.child?.person) : null;
        const noticed = model.flow.context.length ? `<p class="cx-noticed"><span>${e(ui('cx.result.noticed'))}:</span> ${model.flow.context.map((code) => `<span class="cx-tag">${e(ui(`cx.observed.${code}`))}</span>`).join(' ')}</p>` : '';
        return `
      <section class="cx-panel cx-hero">
        ${art}
        <p class="cx-between">${e(uif('cx.result.between', { a: names.first, b: names.second }))} · ${e(kindLabel(pair.edge.kind))}</p>
        <h1 class="cx-title cx-headline">${e(reading.headline)}</h1>
        ${overview ? `<div class="cx-prose">${paragraphsHtml(overview.paragraphs)}</div>` : ''}
        ${glance(reading, content)}
        ${noticed}
      </section>
      ${explore(reading, model.focus, names)}
      ${rest.length ? `<section class="cx-panel cx-reading" aria-label="${a(ui('cx.section.reading'))}"><h2>${e(ui('cx.section.reading'))}</h2>${rest.map(sectionHtml).join('')}</section>` : ''}
      ${practicesHtml(reading, content, pair.edge.domain, lang)}
      ${child ? childHtml(child, true, choices.some((choice) => choice.id === 'household') ? { dynamic: reading.narrative.central } : null) : ''}
      ${evidenceHtml(pair, reading, content, lang)}`;
    })();
    return `
    <div class="cx" data-cx-level="result" data-domain="${a(analysis.domain)}">
      ${backBar()}
      ${pills}
      ${body}
    </div>`;
}
/* ------------------------------------------------------------------- sheet -- */
export function renderSheet(model) {
    const sheet = model.sheet;
    if (!sheet)
        return '';
    const d = sheet.draft;
    const err = (field) => {
        const found = sheet.errors.find((entry) => entry.field === field);
        return found ? `<p class="cx-error" id="cx-err-${field}" role="alert">${e(found.message)}</p>` : '';
    };
    const invalid = (field) => (sheet.errors.some((entry) => entry.field === field) ? ` aria-invalid="true" aria-describedby="cx-err-${field}"` : '');
    const title = ui(`cx.sheet.${sheet.slot === 'other' ? 'person' : sheet.slot}`);
    const timeField = d.precision === 'unknown' ? '' : `
        <div class="cx-field"><label for="cx-time">${e(ui('cx.field.time'))}</label><input id="cx-time" type="time" data-cx-field="birthTime" value="${a(d.birthTime)}"${invalid('birthTime')}/>${err('birthTime')}</div>`;
    const places = sheet.places.length ? `<ul class="cx-places" role="listbox" aria-label="${a(ui('cx.field.place'))}">${sheet.places.map((place) => `<li role="option"><button type="button" class="cx-place" data-cx-place="${place.index}">${e(place.label)}<span>${e(place.meta)}</span></button></li>`).join('')}</ul>` : '';
    const placeNote = sheet.placeState === 'none' ? ui('cx.place.none') : sheet.placeState === 'error' ? ui('cx.place.error') : sheet.placeState === 'resolving' ? ui('cx.place.resolving') : sheet.placeState === 'unresolved' ? ui('cx.place.unresolved') : sheet.placeState === 'chosen' ? sheet.chosen : '';
    return `
    <div class="cx-backdrop" data-cx-backdrop>
      <form class="cx-sheet" role="dialog" aria-modal="true" aria-labelledby="cx-sheet-title" data-cx-sheet novalidate>
        <header><h2 id="cx-sheet-title">${e(title)}</h2></header>
        <div class="cx-field"><label for="cx-label">${e(ui('cx.field.label'))}</label><input id="cx-label" type="text" maxlength="40" autocomplete="off" data-cx-field="label" value="${a(d.label)}"${invalid('label')}/><p class="cx-hint">${e(ui('cx.field.label.hint'))}</p>${err('label')}</div>
        <div class="cx-field"><label for="cx-bname">${e(ui('cx.field.birthName'))}</label><input id="cx-bname" type="text" autocomplete="off" data-cx-field="birthName" value="${a(d.birthName)}"${invalid('names')}/></div>
        <div class="cx-field"><label for="cx-bsur">${e(ui('cx.field.birthSurname'))}</label><input id="cx-bsur" type="text" autocomplete="off" data-cx-field="birthSurname" value="${a(d.birthSurname)}"${invalid('names')}/><p class="cx-hint">${e(ui('cx.field.names.hint'))}</p>${err('names')}</div>
        <div class="cx-field"><label for="cx-date">${e(ui('cx.field.date'))}</label><input id="cx-date" type="date" data-cx-field="birthDate" value="${a(d.birthDate)}"${invalid('birthDate')}/>${sheet.age ? `<p class="cx-hint">${e(sheet.age)}</p>` : ''}${err('birthDate')}</div>
        <fieldset class="cx-field"><legend>${e(ui('cx.field.time'))}</legend><div class="cx-chips" role="group">${['exact', 'approximate', 'unknown'].map((p) => chip(`data-cx-precision="${p}"`, ui(`cx.time.${p}`), d.precision === p)).join('')}</div><p class="cx-hint">${e(ui('cx.time.hint'))}</p></fieldset>
        ${timeField}
        <div class="cx-field"><label for="cx-place">${e(ui('cx.field.place'))}</label><input id="cx-place" type="search" autocomplete="off" role="combobox" aria-expanded="${sheet.places.length > 0}" placeholder="${a(ui('cx.place.search'))}" data-cx-field="placeQuery" value="${a(d.placeQuery)}"${invalid('place')}/>${places}<p class="cx-hint" role="status">${e(placeNote)}</p>${err('place')}</div>
        <label class="cx-keep"><input type="checkbox" data-cx-field="keep" ${d.keep ? 'checked' : ''}/><span>${e(ui('cx.keep'))}<small>${e(ui('cx.keep.hint'))}</small></span></label>
        <div class="cx-actions"><button type="button" class="cx-button" data-cx-sheet-cancel>${e(ui('cx.sheet.cancel'))}</button><button type="submit" class="cx-button cx-primary" ${sheet.busy ? 'disabled' : ''}>${e(ui('cx.sheet.add'))}</button></div>
      </form>
    </div>`;
}
/** The screen for the flow's level (the intake sheet is rendered separately, into its own host above the screen). */
export function renderLevel(model) {
    const level = model.flow.level;
    return level === 'domains' ? renderDomains(model) : level === 'setup' ? renderSetup(model) : renderResult(model);
}
export { OWNER_ID, MAX_CONTEXT, ageBandOf };
