/*
 * REPORT BUILDER (pure). One message a tester can paste anywhere:
 *   1. a human-readable summary (device, viewport, state, ranked findings, recent events);
 *   2. the machine-readable evidence as minified JSON (schema ktdiag/1);
 *   3. a trailer with the JSON length and a checksum, so a chat app that silently truncated or re-wrapped the message is detectable.
 *
 * Chat apps cap message length (Messenger ~20,000 characters). The default budget keeps the whole report under it by dropping the
 * OLDEST and LEAST diagnostic detail first and saying exactly what it dropped. "full" lifts the cap for WhatsApp, e-mail or AirDrop.
 */
import { analyze } from './analysis.js?v=2ea79e9';
import { PrivacyGuard, redactPatterns, scrubDeep } from './redact.js?v=2ea79e9';
import { CATEGORY_LABEL } from './types.js?v=2ea79e9';
export const SCHEMA = 'ktdiag/1';
/** Messenger caps a text message at 20,000 characters; the rest is room for what the tester types around the paste. */
export const MESSENGER_BUDGET = 19_000;
/** 32-bit FNV-1a over UTF-16 code units, hex. Cheap and good enough to notice truncation or re-wrapping. */
export function fnv1a(text) {
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
}
/** Index to slice from to keep the LAST `count` items; slice(-0) would keep everything, so zero is handled here. */
const tailFrom = (length, count) => Math.max(0, length - Math.max(0, count));
const round = (n) => Math.round(n * 10) / 10;
/** Only what differs from the browser default, as one short string: a quiet element costs a few bytes. */
function styleString(s) {
    const parts = [];
    if (s.pos !== 'static')
        parts.push(s.pos);
    if (s.z !== 'auto')
        parts.push(`z${s.z}`);
    if (s.disp !== 'block')
        parts.push(`d:${s.disp}`);
    if (s.vis !== 'visible')
        parts.push(`v:${s.vis}`);
    if (s.op !== '1')
        parts.push(`o:${s.op}`);
    if (s.pe !== 'auto')
        parts.push(`pe:${s.pe}`);
    if (s.tf !== 'none')
        parts.push(`tf:${s.tf.slice(0, 40)}`);
    if (s.bf !== 'none')
        parts.push(`bf:${s.bf.slice(0, 24)}`);
    if (s.filter !== 'none')
        parts.push(`filter:${s.filter.slice(0, 24)}`);
    if (s.will !== 'auto')
        parts.push(`will:${s.will}`);
    if (s.contain !== 'none')
        parts.push(`contain:${s.contain}`);
    if (s.ovf !== 'visible')
        parts.push(`ovf:${s.ovf}`);
    if (s.touchAction !== 'auto')
        parts.push(`ta:${s.touchAction}`);
    return parts.join(' ') || '-';
}
function compactElement(e, detail) {
    if (e.matches === 0)
        return { k: e.key, n: 0 };
    const out = { k: e.key, n: e.matches, r: e.rect ? e.rect.map(round) : null };
    if (e.inVisual !== null)
        out.vv = round(e.inVisual);
    const flags = [e.inert ? 'inert' : '', e.ariaHidden ? 'aria-hidden' : '', e.hiddenAttr ? 'hidden' : '', e.disabled ? 'disabled' : ''].filter(Boolean).join(',');
    if (flags)
        out.f = flags;
    if (e.hitOk === false)
        out.hit = e.hitChain;
    if (e.fixedBreaker)
        out.breaker = e.fixedBreaker;
    if (e.clippedBy)
        out.clip = e.clippedBy;
    if (detail >= 1 && e.style)
        out.st = styleString(e.style);
    if (detail >= 2) {
        const fixed = e.style?.pos === 'fixed';
        if (e.stacking?.length && (e.interactive || fixed))
            out.sc = e.stacking.slice(0, 3);
        if (e.hitChain && e.hitOk !== false && e.interactive)
            out.hitChain = e.hitChain.slice(0, 3);
    }
    return out;
}
function compactSnapshot(s, detail) {
    return {
        t: s.t, why: s.reason, vp: s.viewport, focus: s.focus, kb: s.keyboardInset, state: s.state,
        el: s.elements.filter((e) => e.matches > 0).map((e) => compactElement(e, detail)),
        absent: s.elements.filter((e) => e.matches === 0).map((e) => e.key),
        ...(s.grid && detail >= 1 ? { grid: s.grid.map((g) => ({ p: g.p, top: g.top })) } : {}),
    };
}
/** A viewport sample as one short row: layout w,h | visual w,h,offsetTop,offsetLeft,scale | scrollY. */
const vpRow = (v) => [v.inner[0], v.inner[1], v.vv ? round(v.vv.w) : null, v.vv ? round(v.vv.h) : null, v.vv ? round(v.vv.ot) : null, v.vv ? round(v.vv.ol) : null, v.vv ? v.vv.scale : null, v.scroll[1]];
/**
 * The geometry history as DELTAS. The first snapshot is whole; each later one lists only what moved or changed state since the one
 * before it, so a stable layout costs a few bytes and a layout that drifts shows exactly which element moved and when.
 */
function compactHistory(list, detail) {
    const out = [];
    let previous = null;
    for (const snap of list) {
        if (!previous) {
            out.push({ ...compactSnapshot(snap, Math.min(detail, 0)), vp: undefined, vpRow: vpRow(snap.viewport) });
        }
        else {
            const before = new Map(previous.elements.map((e) => [e.key, e]));
            const changed = snap.elements.filter((e) => {
                const old = before.get(e.key);
                if (!old)
                    return true;
                if (old.matches !== e.matches || old.inert !== e.inert || old.hiddenAttr !== e.hiddenAttr || old.rendered !== e.rendered)
                    return true;
                if (!old.rect || !e.rect)
                    return old.rect !== e.rect;
                return old.rect.some((n, index) => Math.abs(n - e.rect[index]) > 1) || Math.abs((old.inVisual ?? 0) - (e.inVisual ?? 0)) > 0.05;
            }).map((e) => compactElement(e, Math.min(detail, 1)));
            const stateChanged = Object.entries(snap.state).filter(([k, val]) => previous?.state[k] !== val);
            out.push({ t: snap.t, why: snap.reason, vpRow: vpRow(snap.viewport), kb: snap.keyboardInset, focus: snap.focus.active, ...(stateChanged.length ? { state: Object.fromEntries(stateChanged) } : {}), changed, same: snap.elements.length - changed.length });
        }
        previous = snap;
    }
    return out;
}
const PLANS = [
    { now: 2, events: 220, history: 8, detail: 2, overlays: 10, perfWindows: 24, previousTail: 40, errors: 20, label: 'full detail' },
    { now: 2, events: 120, history: 5, detail: 1, overlays: 6, perfWindows: 12, previousTail: 25, errors: 12, label: 'older events and snapshots thinned' },
    { now: 1, events: 70, history: 3, detail: 0, overlays: 4, perfWindows: 6, previousTail: 12, errors: 8, label: 'element styles reduced' },
    { now: 1, events: 40, history: 2, detail: 0, overlays: 3, perfWindows: 3, previousTail: 6, errors: 6, label: 'history reduced to the last moments' },
    { now: 0, events: 22, history: 1, detail: 0, overlays: 2, perfWindows: 0, previousTail: 0, errors: 4, label: 'reduced: geometry, findings and the last events' },
    { now: 0, events: 12, history: 0, detail: 0, overlays: 1, perfWindows: 0, previousTail: 0, errors: 3, label: 'minimum: geometry and findings; paste the bigger report if you can' },
];
const FULL_PLAN = { now: 2, events: 600, history: 12, detail: 2, overlays: 20, perfWindows: 60, previousTail: 120, errors: 50, label: 'full report (no message-size cap)' };
function evidenceDocument(input, findings, plan, guard) {
    const c = input.compositing;
    const prev = input.lifetime.previous;
    const { css, apis, media, ...envRest } = input.env;
    const missing = (table) => Object.entries(table).filter(([, ok]) => !ok).map(([name]) => name);
    const doc = {
        schema: SCHEMA,
        id: input.reportId,
        iso: input.isoTime,
        epochMs: input.generatedAtEpochMs,
        build: input.build,
        env: { ...envRest, mediaOn: Object.entries(media).filter(([, on]) => on).map(([name]) => name), cssMissing: missing(css), apisMissing: missing(apis) },
        life: {
            ...input.lifetime,
            previous: prev ? { ...prev, tailEvents: prev.tailEvents.slice(tailFrom(prev.tailEvents.length, plan.previousTail)) } : null,
        },
        now: compactSnapshot(input.snapshot, plan.now),
        // the full wording (title, evidence, hint) is in the readable summary above; the JSON keeps the machine-readable keys
        findings: findings.map((f) => ({ id: f.id, cat: f.cat, sev: f.sev })),
        counters: input.counters,
        errors: input.errors.slice(tailFrom(input.errors.length, plan.errors)),
        markers: input.markers,
        events: { buffer: input.eventStats, list: input.events.slice(tailFrom(input.events.length, plan.events)) },
        history: compactHistory(input.snapshotsHistory.slice(tailFrom(input.snapshotsHistory.length, plan.history)), Math.min(plan.detail, 1)),
        gpu: {
            scanned: c.elementsScanned, backdropFilter: c.backdropFilter, filter: c.filter, willChange: c.willChange, fixed: c.fixed, transformed: c.transformed,
            animations: c.animationsRunning, animationTargets: c.animationTargets.slice(0, 8), canvases: c.canvases, videos: c.videos,
            overlays: c.largeOverlays.slice(0, plan.overlays), overflow: c.overflowOffenders.slice(0, 6),
        },
        perf: { ...input.perf, windows: input.perf.windows.slice(tailFrom(input.perf.windows.length, plan.perfWindows)) },
        mutations: { peakPerSecond: input.mutationPeakPerSecond, top: input.mutationTop.slice(0, 8) },
        resources: input.resources,
        startup: input.startup,
        privacy: { fieldValuesRead: false, textContentRead: false, storageContentsRead: false, cookiesRead: false, uploaded: false, note: 'Structure, geometry and state identifiers only. Free-text strings were pattern-sanitized and scrubbed of the words currently held by form fields.' },
        detail: plan.label,
    };
    return scrubDeep(doc, guard);
}
const sevMark = { high: 'HIGH', med: 'MED ', low: 'low ', info: 'info' };
function formatEvent(e) {
    const { t, k, ...rest } = e;
    const fields = Object.entries(rest)
        .map(([key, value]) => `${key}=${typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}`)
        .join(' ');
    const line = `+${t}ms ${k}${fields ? ` ${fields}` : ''}`;
    return line.length > 200 ? `${line.slice(0, 199)}…` : line;
}
function summaryText(input, findings, guard) {
    const s = input.snapshot;
    const v = s.viewport;
    const e = input.env;
    const state = Object.entries(s.state).filter(([k]) => k.startsWith('data-')).map(([k, val]) => `${k.replace('data-', '')}=${val}`).join(' ');
    const lines = [];
    lines.push('KNOW THYSELF - QA DEBUG REPORT (ktdiag/1)');
    lines.push(`Report ${input.reportId} | ${input.isoTime} | build ${input.build.stamp} | ${input.build.slug || input.build.path} | up ${Math.round(input.lifetime.uptimeMs / 1000)}s`);
    lines.push(`DEVICE: ${e.device ?? 'non-iOS'} | iOS ${e.iosVersion ?? '-'} | ${e.browser}${e.browserVersion ? ` ${e.browserVersion}` : ''}${e.inAppBrowser ? ' (IN-APP BROWSER)' : ''} | ${e.engine} | dpr ${v.dpr} | ${v.orientation} | touch ${e.maxTouchPoints}`);
    lines.push(`VIEWPORT: layout ${v.inner.join('x')} | visual ${v.vv ? `${round(v.vv.w)}x${round(v.vv.h)} at ${round(v.vv.ol)},${round(v.vv.ot)} scale ${round(v.vv.scale)}` : 'API missing'} | screen ${v.screen.join('x')} | 100svh/dvh/lvh ${v.units.svh ?? '-'}/${v.units.dvh ?? '-'}/${v.units.lvh ?? '-'} | safe t${v.safeArea[0]} r${v.safeArea[1]} b${v.safeArea[2]} l${v.safeArea[3]} | scrollY ${v.scroll[1]}`);
    lines.push(`STATE: ${state || '(no app state attributes found)'}`);
    if (input.startup) {
        const st = input.startup;
        lines.push(`STARTUP: entries running ${st.expected.map((name) => `${name}${st.alive[name] === undefined ? ' NO' : ` +${st.alive[name]}ms`}`).join(', ')} | failures ${st.failures.length ? st.failures.slice(0, 4).map((f) => `${f.kind} ${f.url || '-'}`).join('; ') : 'none'} | reloaded once ${st.reloadedOnce ? 'yes' : 'no'} | screen ${st.screen}`);
    }
    lines.push(`FOCUS: ${s.focus.active}${s.focus.textField ? ` | text field, ${s.focus.hasValue ? 'has a value (not recorded)' : 'empty'}` : ''} | keyboard inset ~${s.keyboardInset}px`);
    if (input.markers.length)
        lines.push(`TESTER MARKS: ${input.markers.map((m) => `+${m.t}ms ${String(m.what ?? 'mark')}`).join('; ')}`);
    lines.push('');
    lines.push(findings.length ? `FINDINGS (${findings.length}, ranked; each is a lead, not a verdict):` : 'FINDINGS: none triggered');
    findings.slice(0, 12).forEach((f, index) => {
        lines.push(`${index + 1}. [${sevMark[f.sev]}][${f.cat} ${CATEGORY_LABEL[f.cat]}] ${f.title}`);
        lines.push(`   ${f.evidence}`);
    });
    if (findings.length > 12)
        lines.push(`   ... ${findings.length - 12} more ids in the JSON`);
    lines.push('');
    lines.push(`RECENT EVENTS (last ${Math.min(10, input.events.length)} of ${input.eventStats.pushed}):`);
    for (const ev of input.events.slice(-10))
        lines.push(`  ${formatEvent(ev)}`);
    if (input.lifetime.previous && !input.lifetime.previous.cleanExit)
        lines.push('NOTE: the previous page life in this tab ended WITHOUT a clean exit (see life.previous in the JSON).');
    lines.push('');
    lines.push('FOR THE ASSISTANT: this is a client-side diagnostic from a QA preview of a web app. The section below is JSON (schema ktdiag/1). Use findings as leads, geometry in "now.el" (rect = x,y,w,h in CSS px of the layout viewport; vv = fraction inside the visual viewport), "events.list" as the timeline before the report, and "life.previous" if the tab was reloaded. It contains no personal data. Say plainly what the evidence cannot show.');
    // Defence in depth: the collector already sanitizes at capture time, but the readable text goes through the same pattern rules and the
    // deny-list again. Line 2 carries the generation time, the one line the date/time rules would only damage.
    return guard.scrub(lines.map((line, index) => (index === 1 ? line : redactPatterns(line))).join('\n'));
}
/** Builds the pasteable report. `budget` null = no cap. */
export function buildReport(input, options = { budget: MESSENGER_BUDGET }) {
    const guard = options.guard ?? new PrivacyGuard();
    const findings = analyze(input);
    const plans = options.budget === null ? [FULL_PLAN] : PLANS;
    let chosen = 0;
    let json = '';
    let summary = '';
    for (let level = options.onlyLevel ?? 0; level < plans.length; level += 1) {
        chosen = level;
        json = JSON.stringify(evidenceDocument(input, findings, plans[level], guard));
        summary = summaryText(input, findings, guard);
        const total = summary.length + json.length + 260;
        if (options.budget === null || options.onlyLevel !== undefined || total <= options.budget)
            break;
    }
    const checksum = fnv1a(json);
    const trimmed = options.budget === null ? [] : chosen === 0 ? [] : [`level ${chosen}: ${plans[chosen].label}`];
    const text = [
        summary,
        '',
        `=== JSON BEGIN (ktdiag/1, ${plans[chosen].label}) ===`,
        json,
        `=== JSON END chars=${json.length} fnv1a=${checksum} ===`,
    ].join('\n');
    return { text, chars: text.length, jsonChars: json.length, checksum, findings, trimmed, level: chosen };
}
/** Receiver-side check: does the pasted text still contain the whole JSON the sender checksummed? */
export function verifyReportText(text) {
    const begin = text.indexOf('=== JSON BEGIN');
    const end = text.lastIndexOf('=== JSON END');
    if (begin < 0 || end < 0 || end < begin)
        return { ok: false, reason: 'markers missing: the message was truncated' };
    const json = text.slice(text.indexOf('\n', begin) + 1, end).replace(/\n$/, '');
    const trailer = /chars=(\d+) fnv1a=([0-9a-f]{8})/.exec(text.slice(end));
    if (!trailer)
        return { ok: false, reason: 'trailer missing' };
    if (json.length !== Number(trailer[1]))
        return { ok: false, reason: `length ${json.length} != ${trailer[1]}` };
    if (fnv1a(json) !== trailer[2])
        return { ok: false, reason: 'checksum mismatch: text was altered or re-wrapped' };
    try {
        JSON.parse(json);
    }
    catch {
        return { ok: false, reason: 'JSON does not parse' };
    }
    return { ok: true };
}
