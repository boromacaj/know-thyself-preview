import { LOCALE_CHANGED_EVENT, activeLocale } from '../../i18n/locale.js?v=f9ab0a6';
import { tf, t } from '../../i18n/uiStrings.js?v=f9ab0a6';
import { locationProviderConfiguration } from '../../location/locationProviderConfig.js?v=f9ab0a6';
import { timeZoneResolverConfiguration } from '../../timezone/timeZoneResolverConfig.js?v=f9ab0a6';
import { readPremiumResult } from '../../premium-earth/premiumResultStore.js?v=f9ab0a6';
import { analyse, AnalysisError } from '../analysis.js?v=f9ab0a6';
import { PersonNotCalculable, computePerson, computedPersonFromExperience, forgetComputedPeople } from '../evidence/personEngine.js?v=f9ab0a6';
import { ageBandOf, ageOn } from '../model/ageBands.js?v=f9ab0a6';
import { langOf } from '../reading/languages.js?v=f9ab0a6';
import { browserStorages, forgetEverything, newPersonId, profileInputOf, readFlowRecord, readPeople, removePerson, savePerson, writeFlowRecord, } from '../state/connectionsStore.js?v=f9ab0a6';
import { INITIAL_FLOW, OWNER_ID, chooseDomain, chooseKind, graphFromFlow, isReady, sanitizeFlow, toggleContext, withCaregiver, withChild, withoutPerson, } from '../state/flow.js?v=f9ab0a6';
import { CONNECTIONS_CONTENT } from '../reading/content/index.js?v=f9ab0a6';
import { ageLabel, renderLevel, renderSheet } from './connectionsScreen.js?v=f9ab0a6';
const ui = (key) => t(key);
const uif = (key, params) => tf(key, params);
const emptyDraft = () => ({ label: '', birthName: '', birthSurname: '', birthDate: '', birthTime: '', precision: 'exact', placeQuery: '', keep: false });
export function mountConnections(args) {
    const { mount, scrollHost, sheetHost } = args;
    const storages = browserStorages();
    let flow = INITIAL_FLOW;
    let people = readPeople(storages);
    let analysis = null;
    let busy = false;
    let error = null;
    let sheet = null;
    let focus = null;
    let pair = null;
    let forgotten = false;
    let active = false;
    const scrollByLevel = new Map();
    let searchTimer = 0;
    let searchSequence = 0;
    let depth = 0;
    /* ------------------------------------------------------------- the people -- */
    const owner = () => {
        const experience = readPremiumResult().experience;
        if (!experience)
            return null;
        const label = (experience.input.givenNames.trim().split(/\s+/)[0] ?? '').trim() || ui('cx.you');
        const person = { id: OWNER_ID, source: 'owner', label, retention: 'session' };
        let computed;
        try {
            computed = computedPersonFromExperience(experience);
        }
        catch {
            return null;
        }
        return { person, analysisPerson: { person, birthDate: experience.input.birthDate, computed } };
    };
    const storedPeople = () => {
        const today = new Date();
        return people.map((person) => {
            const age = ageOn(person.birthDate, today);
            return { id: person.id, label: person.label, retention: person.retention, age: age && ageBandOf(age) !== 'adult' ? ageLabel(age) : '' };
        });
    };
    const persistFlow = () => { writeFlowRecord(storages, { ...flow, level: flow.level === 'domains' ? 'domains' : flow.level }); };
    /* ---------------------------------------------------------------- render -- */
    const viewModel = () => ({
        flow, ownerLabel: owner()?.person.label ?? ui('cx.you'), people: storedPeople(), content: CONNECTIONS_CONTENT, analysis, busy, error,
        sheet: sheet ? {
            slot: sheet.slot, draft: sheet.draft, placeState: sheet.placeState, chosen: sheet.chosenLabel, errors: sheet.errors, busy: sheet.busy,
            places: sheet.results.map((result, index) => ({ index, label: result.label, meta: [result.region, result.country].filter(Boolean).join(', ') })),
            age: (() => { const a = sheet.draft.birthDate ? ageOn(sheet.draft.birthDate, new Date()) : null; return a ? ageLabel(a) : ''; })(),
        } : null,
        canResume: flow.level === 'domains' && resumable(), forgotten, focus, pair, today: new Date(),
    });
    const resumable = () => {
        const stored = readFlowRecord(storages);
        if (!stored?.flow)
            return false;
        const restored = sanitizeFlow(stored.flow, new Set([OWNER_ID, ...people.map((person) => person.id)]));
        return restored.level === 'result';
    };
    const remember = () => { scrollByLevel.set(flow.level, scrollHost.scrollTop); };
    /** A control keeps keyboard focus across a redraw: the same control, found again by the attribute that names it. */
    const FOCUS_ATTRIBUTES = ['data-cx-domain', 'data-cx-kind', 'data-cx-role', 'data-cx-notice', 'data-cx-focus', 'data-cx-pair', 'data-cx-add', 'data-cx-run', 'data-cx-pick-other', 'data-cx-pick-adult', 'data-cx-pick-child', 'data-cx-drop', 'data-cx-back'];
    const focusedControl = () => {
        const active = document.activeElement;
        if (!(active instanceof HTMLElement) || !mount.contains(active))
            return null;
        for (const attribute of FOCUS_ATTRIBUTES) {
            if (active.hasAttribute(attribute))
                return `[${attribute}="${CSS.escape(active.getAttribute(attribute) ?? '')}"]`;
        }
        return null;
    };
    const render = (restoreScroll = false) => {
        const refocus = focusedControl();
        mount.innerHTML = renderLevel(viewModel());
        mount.dataset.cxLevel = flow.level;
        if (refocus)
            mount.querySelector(refocus)?.focus({ preventScroll: true });
        if (restoreScroll) {
            const top = scrollByLevel.get(flow.level) ?? 0;
            window.requestAnimationFrame(() => { scrollHost.scrollTop = top; });
        }
    };
    const renderSheetOnly = (focusSelector) => {
        sheetHost.innerHTML = renderSheet(viewModel());
        if (focusSelector)
            sheetHost.querySelector(focusSelector)?.focus({ preventScroll: true });
    };
    /* ------------------------------------------------------------- navigation -- */
    const stateOf = (level, sheetOpen, atDepth) => ({ ktDestination: 'connections', ktCx: { depth: atDepth, level, sheet: sheetOpen } });
    const levelDepth = { domains: 0, setup: 1, result: 2 };
    const enter = (next) => {
        remember();
        flow = { ...flow, level: next };
        depth = levelDepth[next];
        window.history.pushState(stateOf(next, false, depth), '', window.location.hash || '#/connections');
        persistFlow();
        render();
        scrollHost.scrollTop = 0;
        focusHeading();
    };
    const focusHeading = () => {
        window.requestAnimationFrame(() => {
            const heading = mount.querySelector('h1');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus({ preventScroll: true });
            }
        });
    };
    const goBack = () => {
        const current = window.history.state?.ktCx;
        if (current && current.depth > 0) {
            window.history.back();
            return;
        }
        /* No entry to go back to (a restored page): step the level down in place. */
        stepDown();
    };
    const stepDown = () => {
        if (sheet) {
            closeSheet();
            return;
        }
        const next = flow.level === 'result' ? 'setup' : 'domains';
        flow = { ...flow, level: next };
        depth = levelDepth[next];
        window.history.replaceState(stateOf(next, false, depth), '', window.location.hash || '#/connections');
        persistFlow();
        render(true);
        focusHeading();
    };
    const onPopState = () => {
        if (!active)
            return;
        const state = window.history.state?.ktCx;
        if (!state) {
            if (flow.level !== 'domains' || sheet) {
                sheet = null;
                flow = { ...flow, level: 'domains' };
                depth = 0;
                render(true);
            }
            return;
        }
        if (sheet && !state.sheet) {
            closeSheet(true);
        }
        if (state.sheet && !sheet)
            return; // forward into a sheet we no longer hold: ignore
        if (state.level !== flow.level) {
            remember();
            flow = { ...flow, level: state.level };
            depth = state.depth;
            persistFlow();
            if (flow.level === 'result' && !analysis) {
                void runAnalysis(false);
                return;
            }
            render(true);
        }
    };
    /* --------------------------------------------------------------- analysis -- */
    const runAnalysis = async (push = true) => {
        const me = owner();
        if (!me) {
            error = ui('cx.error.generic');
            render();
            return;
        }
        busy = true;
        error = null;
        render();
        await new Promise((resolve) => window.requestAnimationFrame(() => window.setTimeout(resolve, 0)));
        try {
            const known = new Map();
            const analysisPeople = new Map([[OWNER_ID, me.analysisPerson]]);
            const needed = new Set([...(flow.other ? [flow.other] : []), ...flow.caregivers, ...flow.children]);
            for (const id of needed) {
                const stored = people.find((person) => person.id === id);
                if (!stored)
                    throw new AnalysisError('unknown-person');
                const input = profileInputOf(stored);
                if (!input)
                    throw new PersonNotCalculable('engine-failed');
                const computed = computePerson(input);
                const connectionsPerson = { id: stored.id, source: 'entered', label: stored.label, retention: stored.retention };
                known.set(id, connectionsPerson);
                analysisPeople.set(id, { person: connectionsPerson, birthDate: stored.birthDate, computed });
            }
            const graph = graphFromFlow(flow, me.person, known);
            if (!graph)
                throw new AnalysisError('bad-graph');
            analysis = analyse({ lang: langOf(activeLocale()), graph, people: analysisPeople, context: flow.context, today: new Date(), content: CONNECTIONS_CONTENT });
            busy = false;
            pair = null;
            focus = null;
            if (push)
                enter('result');
            else {
                flow = { ...flow, level: 'result' };
                persistFlow();
                render(true);
            }
        }
        catch (caught) {
            busy = false;
            analysis = null;
            error = caught instanceof AnalysisError && caught.code === 'child-is-adult' ? ui('cx.error.child-adult')
                : caught instanceof PersonNotCalculable ? ui('cx.error.person') : ui('cx.error.generic');
            render();
        }
    };
    const reanalyseForLanguage = () => {
        if (!analysis || flow.level !== 'result')
            return;
        void (async () => { const keep = { focus, pair }; await runAnalysisSilently(); focus = keep.focus; pair = keep.pair; render(true); })();
    };
    const runAnalysisSilently = async () => {
        const me = owner();
        if (!me)
            return;
        try {
            const known = new Map();
            const analysisPeople = new Map([[OWNER_ID, me.analysisPerson]]);
            for (const id of new Set([...(flow.other ? [flow.other] : []), ...flow.caregivers, ...flow.children])) {
                const stored = people.find((person) => person.id === id);
                const input = stored ? profileInputOf(stored) : null;
                if (!stored || !input)
                    return;
                const connectionsPerson = { id: stored.id, source: 'entered', label: stored.label, retention: stored.retention };
                known.set(id, connectionsPerson);
                analysisPeople.set(id, { person: connectionsPerson, birthDate: stored.birthDate, computed: computePerson(input) });
            }
            const graph = graphFromFlow(flow, me.person, known);
            if (graph)
                analysis = analyse({ lang: langOf(activeLocale()), graph, people: analysisPeople, context: flow.context, today: new Date(), content: CONNECTIONS_CONTENT });
        }
        catch { /* the screen keeps what it had */ }
    };
    /* ------------------------------------------------------------------ sheet -- */
    const openSheet = (slot, opener) => {
        sheet = { slot, draft: emptyDraft(), results: [], placeState: 'idle', chosen: null, chosenLabel: '', errors: [], busy: false, opener };
        window.history.pushState(stateOf(flow.level, true, depth + 1), '', window.location.hash || '#/connections');
        renderSheetOnly('#cx-label');
    };
    const closeSheet = (fromHistory = false) => {
        const opener = sheet?.opener ?? null;
        sheet = null;
        window.clearTimeout(searchTimer);
        searchSequence += 1;
        sheetHost.innerHTML = '';
        if (!fromHistory && window.history.state?.ktCx?.sheet)
            window.history.back();
        if (opener && opener.isConnected)
            opener.focus({ preventScroll: true });
    };
    const scheduleSearch = () => {
        if (!sheet)
            return;
        window.clearTimeout(searchTimer);
        const query = sheet.draft.placeQuery.trim();
        sheet.chosen = null;
        sheet.chosenLabel = '';
        if (query.length < 2) {
            sheet.results = [];
            sheet.placeState = 'idle';
            updatePlaceUi();
            return;
        }
        sheet.placeState = 'searching';
        const mine = (searchSequence += 1);
        searchTimer = window.setTimeout(async () => {
            try {
                const results = await locationProviderConfiguration.provider.searchPlaces(query);
                if (!sheet || mine !== searchSequence)
                    return;
                sheet.results = [...results].slice(0, 6);
                sheet.placeState = results.length ? 'idle' : 'none';
            }
            catch {
                if (!sheet || mine !== searchSequence)
                    return;
                sheet.results = [];
                sheet.placeState = 'error';
            }
            updatePlaceUi();
        }, 300);
    };
    const updatePlaceUi = () => {
        if (!sheet)
            return;
        const html = renderSheet(viewModel());
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const nextField = doc.querySelector('#cx-place')?.closest('.cx-field');
        const field = sheetHost.querySelector('#cx-place')?.closest('.cx-field');
        if (nextField && field) {
            const input = field.querySelector('#cx-place');
            const keep = input ? { value: input.value, start: input.selectionStart, end: input.selectionEnd, focused: document.activeElement === input } : null;
            field.replaceWith(document.importNode(nextField, true));
            const fresh = sheetHost.querySelector('#cx-place');
            if (fresh && keep) {
                fresh.value = keep.value;
                if (keep.focused) {
                    fresh.focus({ preventScroll: true });
                    try {
                        fresh.setSelectionRange(keep.start, keep.end);
                    }
                    catch { /* not supported on this input type */ }
                }
            }
            /* The suggestions open below the field; keep them clear of the buttons that stay at the foot of the sheet. */
            sheetHost.querySelector('.cx-places')?.scrollIntoView({ block: 'nearest' });
        }
    };
    const chooseMatch = async (index) => {
        if (!sheet)
            return;
        const result = sheet.results[index];
        if (!result)
            return;
        sheet.placeState = 'resolving';
        sheet.results = [];
        sheet.draft = { ...sheet.draft, placeQuery: result.label };
        updatePlaceUi();
        const location = {
            rawText: result.label, resolvedLabel: result.label, latitude: result.latitude, longitude: result.longitude, country: result.country, region: result.region,
            precision: 'searched', source: 'provider-search', provider: result.source, timeZoneHint: result.timeZone ?? null, timeZoneHintSource: result.timeZoneSource ?? result.source,
        };
        try {
            const resolution = await timeZoneResolverConfiguration.resolver.resolveTimeZone(location, sheet.draft.birthDate || '2000-01-01', sheet.draft.birthTime || '12:00');
            if (!sheet)
                return;
            if (!resolution.timeZone) {
                sheet.placeState = 'unresolved';
                sheet.chosen = null;
                updatePlaceUi();
                return;
            }
            sheet.chosen = {
                candidate: {
                    label: result.label, latitude: result.latitude, longitude: result.longitude, country: result.country, region: result.region, provider: result.source,
                    precision: 'searched', source: 'provider-search', timeZoneHint: result.timeZone ?? null, timeZoneHintSource: result.timeZoneSource ?? result.source,
                },
                timeZone: resolution.timeZone, timeZoneSource: resolution.source, timeZoneConfidence: resolution.confidence, timeZoneLimitations: [...resolution.limitations], moveCameraOnPresent: false,
            };
            sheet.chosenLabel = uif('cx.place.chosen', { place: result.label, zone: resolution.timeZone });
            sheet.placeState = 'chosen';
        }
        catch {
            if (!sheet)
                return;
            sheet.placeState = 'unresolved';
            sheet.chosen = null;
        }
        updatePlaceUi();
    };
    const submitSheet = async () => {
        if (!sheet || sheet.busy)
            return;
        const d = sheet.draft;
        const errors = [];
        const label = d.label.replace(/\s+/g, ' ').trim();
        if (!label)
            errors.push({ field: 'label', message: ui('cx.err.label') });
        if (!d.birthName.trim() || !d.birthSurname.trim())
            errors.push({ field: 'names', message: ui('cx.err.names') });
        const age = d.birthDate ? ageOn(d.birthDate, new Date()) : null;
        if (!d.birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(d.birthDate))
            errors.push({ field: 'birthDate', message: ui('cx.err.date') });
        else if (!age)
            errors.push({ field: 'birthDate', message: ui('cx.err.future') });
        else if (sheet.slot === 'child' && ageBandOf(age) === 'adult')
            errors.push({ field: 'birthDate', message: ui('cx.err.adult') });
        else if (sheet.slot !== 'child' && flow.domain && (flow.domain === 'romantic' || flow.domain === 'work') && age.years < 18)
            errors.push({ field: 'birthDate', message: ui('cx.err.minor') });
        else if (sheet.slot === 'adult' && age.years < 18)
            errors.push({ field: 'birthDate', message: ui('cx.err.minor') });
        if (d.precision !== 'unknown' && !/^\d{2}:\d{2}$/.test(d.birthTime))
            errors.push({ field: 'birthTime', message: ui('cx.err.time') });
        if (!sheet.chosen)
            errors.push({ field: 'place', message: ui('cx.err.place') });
        sheet.errors = errors;
        if (errors.length) {
            renderSheetOnly();
            const first = errors[0].field;
            sheetHost.querySelector(first === 'names' ? '#cx-bname' : first === 'birthDate' ? '#cx-date' : first === 'birthTime' ? '#cx-time' : first === 'place' ? '#cx-place' : '#cx-label')?.focus({ preventScroll: false });
            return;
        }
        sheet.busy = true;
        const stored = {
            id: newPersonId(), label: label.slice(0, 40), retention: d.keep ? 'device' : 'session', birthName: d.birthName.trim(), birthSurname: d.birthSurname.trim(),
            birthDate: d.birthDate, birthTime: d.precision === 'unknown' ? '' : d.birthTime, birthTimePrecision: d.precision, placeQuery: d.placeQuery.trim() || sheet.chosen.candidate.label,
            placeSelection: sheet.chosen,
        };
        const input = profileInputOf(stored);
        try {
            if (!input)
                throw new PersonNotCalculable('engine-failed');
            computePerson(input);
        }
        catch {
            sheet.busy = false;
            sheet.errors = [{ field: 'place', message: ui('cx.error.person') }];
            renderSheetOnly();
            return;
        }
        savePerson(storages, stored);
        people = readPeople(storages);
        const slot = sheet.slot;
        closeSheet();
        flow = slot === 'child' ? withChild(flow, stored.id) : slot === 'adult' ? withCaregiver(flow, stored.id) : { ...flow, other: stored.id };
        persistFlow();
        render(true);
    };
    /* ------------------------------------------------------------------ events -- */
    const onClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const control = target.closest('[data-cx-domain],[data-cx-back],[data-cx-kind],[data-cx-role],[data-cx-notice],[data-cx-add],[data-cx-drop],[data-cx-pick-other],[data-cx-pick-adult],[data-cx-pick-child],[data-cx-run],[data-cx-focus],[data-cx-pair],[data-cx-resume],[data-cx-forget],[data-cx-remove],[data-cx-sheet-cancel],[data-cx-place],[data-cx-precision],[data-cx-backdrop]');
        if (!control)
            return;
        if (control.hasAttribute('data-cx-backdrop')) {
            if (target === control)
                closeSheet();
            return;
        }
        const data = control.dataset;
        if (data.cxDomain) {
            flow = chooseDomain({ ...INITIAL_FLOW }, data.cxDomain);
            analysis = null;
            error = null;
            enter('setup');
            return;
        }
        if (data.cxBack !== undefined) {
            goBack();
            return;
        }
        if (data.cxKind) {
            flow = chooseKind(flow, data.cxKind);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxRole) {
            flow = { ...flow, ownerIsFirst: data.cxRole === 'first' };
            persistFlow();
            render(true);
            return;
        }
        if (data.cxNotice) {
            flow = toggleContext(flow, data.cxNotice);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxAdd) {
            openSheet(data.cxAdd, control);
            return;
        }
        if (data.cxDrop) {
            flow = withoutPerson(flow, data.cxDrop);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxPickOther) {
            flow = { ...flow, other: data.cxPickOther };
            persistFlow();
            render(true);
            return;
        }
        if (data.cxPickAdult) {
            flow = flow.caregivers.includes(data.cxPickAdult) ? withoutPerson(flow, data.cxPickAdult) : withCaregiver(flow, data.cxPickAdult);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxPickChild) {
            flow = flow.children.includes(data.cxPickChild) ? withoutPerson(flow, data.cxPickChild) : withChild(flow, data.cxPickChild);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxRun !== undefined) {
            if (isReady(flow))
                void runAnalysis();
            return;
        }
        if (data.cxFocus) {
            focus = data.cxFocus;
            const top = scrollHost.scrollTop;
            render();
            scrollHost.scrollTop = top;
            mount.querySelector(`[data-cx-dimension]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            return;
        }
        if (data.cxPair) {
            pair = data.cxPair;
            focus = null;
            render();
            scrollHost.scrollTop = 0;
            return;
        }
        if (data.cxResume !== undefined) {
            const stored = readFlowRecord(storages);
            flow = sanitizeFlow(stored?.flow, new Set([OWNER_ID, ...people.map((person) => person.id)]));
            if (flow.level === 'result') {
                flow = { ...flow, level: 'setup' };
                depth = 1;
                window.history.pushState(stateOf('setup', false, 1), '', window.location.hash || '#/connections');
                void runAnalysis(true);
            }
            else
                render();
            return;
        }
        if (data.cxForget !== undefined) {
            forgetEverything(storages);
            forgetComputedPeople();
            people = [];
            flow = INITIAL_FLOW;
            analysis = null;
            forgotten = true;
            render();
            return;
        }
        if (data.cxRemove) {
            removePerson(storages, data.cxRemove);
            people = readPeople(storages);
            flow = withoutPerson(flow, data.cxRemove);
            persistFlow();
            render(true);
            return;
        }
        if (data.cxSheetCancel !== undefined) {
            closeSheet();
            return;
        }
        if (data.cxPlace) {
            void chooseMatch(Number(data.cxPlace));
            return;
        }
        if (data.cxPrecision && sheet) {
            sheet.draft = { ...sheet.draft, precision: data.cxPrecision, birthTime: data.cxPrecision === 'unknown' ? '' : sheet.draft.birthTime };
            renderSheetOnly(`[data-cx-precision="${data.cxPrecision}"]`);
        }
    };
    const onInput = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !sheet)
            return;
        const field = target.dataset.cxField;
        if (!field)
            return;
        if (field === 'keep') {
            sheet.draft = { ...sheet.draft, keep: target.checked };
            return;
        }
        sheet.draft = { ...sheet.draft, [field]: target.value };
        if (field === 'placeQuery')
            scheduleSearch();
        if (field === 'birthDate') {
            const hint = sheetHost.querySelector('#cx-date')?.parentElement?.querySelector('.cx-hint');
            const age = target.value ? ageOn(target.value, new Date()) : null;
            if (hint)
                hint.textContent = age ? ageLabel(age) : '';
        }
    };
    const onSubmit = (event) => {
        if (!(event.target instanceof HTMLFormElement) || !event.target.hasAttribute('data-cx-sheet'))
            return;
        event.preventDefault();
        void submitSheet();
    };
    const onKeyDown = (event) => {
        if (!sheet)
            return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closeSheet();
            return;
        }
        if (event.key !== 'Tab')
            return;
        const dialog = sheetHost.querySelector('[data-cx-sheet]');
        if (!dialog)
            return;
        const focusable = [...dialog.querySelectorAll('input,button,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };
    const onLocale = () => {
        if (!active)
            return;
        if (flow.level === 'result')
            reanalyseForLanguage();
        else
            render(true);
        if (sheet)
            renderSheetOnly();
    };
    for (const host of [mount, sheetHost]) {
        host.addEventListener('click', onClick);
        host.addEventListener('input', onInput);
        host.addEventListener('submit', onSubmit);
        host.addEventListener('keydown', onKeyDown);
    }
    window.addEventListener('popstate', onPopState);
    document.addEventListener(LOCALE_CHANGED_EVENT, onLocale);
    return {
        setActive(on) { active = on; },
        open(_restore) {
            active = true;
            people = readPeople(storages);
            const historyState = window.history.state?.ktCx;
            forgotten = false;
            if (historyState && historyState.depth > 0) {
                const stored = readFlowRecord(storages);
                flow = sanitizeFlow(stored?.flow, new Set([OWNER_ID, ...people.map((person) => person.id)]));
                flow = { ...flow, level: historyState.level === 'result' && flow.level === 'result' ? 'result' : flow.level === 'result' ? 'setup' : flow.level };
                depth = historyState.depth;
                if (flow.level === 'result') {
                    void runAnalysis(false);
                    return;
                }
            }
            else {
                flow = INITIAL_FLOW;
                analysis = null;
                error = null;
                depth = 0;
            }
            render();
        },
        destroy() {
            for (const host of [mount, sheetHost]) {
                host.removeEventListener('click', onClick);
                host.removeEventListener('input', onInput);
                host.removeEventListener('submit', onSubmit);
                host.removeEventListener('keydown', onKeyDown);
            }
            window.removeEventListener('popstate', onPopState);
            document.removeEventListener(LOCALE_CHANGED_EVENT, onLocale);
            window.clearTimeout(searchTimer);
        },
    };
}
