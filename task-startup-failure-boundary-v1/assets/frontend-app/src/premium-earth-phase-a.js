import { t, tf } from './app/i18n/uiStrings.js?v=2ea79e9';
import { activateHumanDesignPilot } from './app/reading-engine/human-design/humanDesignPilot.js?v=2ea79e9';
/* Applies the stored language before this screen renders a single
   label. It is imported here as well as in vesselOrbit.ts because this
   script is the FIRST module the page loads: waiting for the other one
   would paint the search screen in English and then correct it. */
import './localeControl.js?v=2ea79e9';
import './onboardingStaticText.js?v=2ea79e9';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=2ea79e9';
import { LocationSearchProviderError } from './app/location/locationSearchProvider.js?v=2ea79e9';
import { presentCandidateOnMap, } from './app/premium-earth/candidateMapPresentation.js?v=2ea79e9';
import { publishPlaceSelectionBridge, } from './app/premium-earth/placeSelectionBridge.js?v=2ea79e9';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=2ea79e9';
import { afterTunnel, describeError, markEntryAlive, releaseTunnel, reportStartupFailure, urlFromImportError } from './startupBridge.js?v=2ea79e9';
// This is the actual owner-preview entrypoint. Never activate the pilot on canonical or unrelated previews.
if (window.location.pathname.startsWith('/know-thyself-preview/task-all-latest-review-20261027/')
    || window.location.pathname.startsWith('/know-thyself-preview/task-ios-webkit-stability-20261028/')
    || window.location.pathname.startsWith('/know-thyself-preview/task-ios-debug-report-v1/')
    || window.location.pathname.startsWith('/know-thyself-preview/task-startup-failure-boundary-v1/')) {
    activateHumanDesignPilot();
}
const searchCandidatePresentation = Object.freeze({ moveCamera: true });
const manualCandidatePresentation = Object.freeze({ moveCamera: false });
const mapRevealDurationMillis = 400;
const searchRevealDurationMillis = 3_000;
const vesselTransitionDurationMillis = 650;
const experience = requiredElement('place-experience');
const mapContainer = requiredElement('earth-map');
const loadingCover = requiredElement('earth-loading-cover');
const interactionDock = requiredElement('interaction-dock');
const form = requiredElement('place-search');
const input = requiredElement('place-query');
const resultShell = requiredElement('place-results-shell');
const resultList = requiredElement('place-results');
const birthplaceCard = requiredElement('birthplace-card');
const birthplaceName = requiredElement('birthplace-name');
const birthplaceMeta = requiredElement('birthplace-meta');
const confirmPlace = requiredElement('confirm-place');
const changePlace = requiredElement('change-place');
const vesselStage = requiredElement('vessel-stage');
const vesselUndefined = requiredElement('vessel-undefined');
const confirmVessel = requiredElement('confirm-vessel');
const vesselChoices = [...document.querySelectorAll('.vessel-choice')];
const experienceStatus = requiredElement('experience-status');
const searchProvider = locationProviderConfiguration.provider;
let earthMap = null;
let results = [];
let focusedResult = -1;
let requestSequence = 0;
let searchTimer = 0;
let selectedCandidate = null;
let selectedTimeZone = null;
/* The resolver's provenance for the selected zone. Previously discarded, but
   the engine gates the birth moment on confidence and reports the limitations. */
let selectedTimeZoneSource = null;
let selectedTimeZoneConfidence = null;
let selectedTimeZoneLimitations = [];
let selectedCandidatePresentation = manualCandidatePresentation;
let selectedVessel = null;
let introStarted = false;
let introFinished = false;
let earthJourneyStarted = false;
let earthFailureHandled = false;
let mapRevealTimer = 0;
let searchRevealTimer = 0;
let vesselTransitionTimer = 0;
/* OVERVIEW's targeted "Change place" edit rolls back the REAL selection, so the
   canonical candidate, its resolved timezone and the presentation mode are
   exposed through one narrow bridge. No second copy of this state is created:
   these two functions read and write the very same module variables the rest of
   this controller uses. */
publishPlaceSelectionBridge({
    snapshot: () => ({
        candidate: selectedCandidate ? { ...selectedCandidate } : null,
        timeZone: selectedTimeZone,
        timeZoneSource: selectedTimeZoneSource,
        timeZoneConfidence: selectedTimeZoneConfidence,
        timeZoneLimitations: [...selectedTimeZoneLimitations],
        moveCameraOnPresent: selectedCandidatePresentation.moveCamera,
    }),
    restore: (snapshot) => {
        // Invalidate any timezone/geocode lookup still in flight for the abandoned
        // place so it cannot resolve later and overwrite the restored selection.
        requestSequence += 1;
        selectedCandidate = snapshot.candidate
            ? {
                ...snapshot.candidate,
                latitude: snapshot.candidate.latitude,
                longitude: snapshot.candidate.longitude,
            }
            : null;
        selectedTimeZone = snapshot.timeZone;
        selectedTimeZoneSource = snapshot.timeZoneSource;
        selectedTimeZoneConfidence = snapshot.timeZoneConfidence;
        selectedTimeZoneLimitations = [...snapshot.timeZoneLimitations];
        selectedCandidatePresentation = snapshot.moveCameraOnPresent
            ? searchCandidatePresentation
            : manualCandidatePresentation;
        if (selectedCandidate) {
            birthplaceCard.hidden = false;
            birthplaceName.textContent = selectedCandidate.label;
            birthplaceMeta.textContent = formatSelectionMeta(selectedCandidate, selectedTimeZone);
            experience.dataset.state = selectedTimeZone ? 'ready' : 'location-only';
            if (earthMap) {
                presentCandidateOnMap(earthMap, selectedCandidate, selectedCandidate.label, selectedCandidatePresentation);
            }
        }
        confirmPlace.disabled = !selectedTimeZone;
    },
});
/* The same module, named as a URL for the failure report. The literal is deliberately repeated: the build stamps both. */
const earthModuleUrl = new URL('./app/premium-earth/ambient/ambientEarthSession.js?v=2ea79e9', import.meta.url).href;
const earthImportRetryDelaysMillis = [800, 2_000];
/* A cold load fetches hundreds of modules over whatever network the phone has, and one dropped request rejects the whole import. Chromium
   will fetch a failed graph again; WebKit remembers the failure, so there this only costs the delays and the startup boundary reloads. */
async function importEarthModule() {
    for (let attempt = 0;; attempt += 1) {
        try {
            return await import('./app/premium-earth/ambient/ambientEarthSession.js?v=2ea79e9');
        }
        catch (error) {
            if (attempt >= earthImportRetryDelaysMillis.length)
                throw error;
            await new Promise((resolve) => window.setTimeout(resolve, earthImportRetryDelaysMillis[attempt]));
        }
    }
}
/* The Earth is this product's own globe (Earth, Moon and Sun), mounted once and never swapped. It is imported dynamically so the
   renderer and the shaders are fetched while the tunnel plays, not before the page can show it. */
let earthImported = false;
const earthReady = importEarthModule()
    .then((ambient) => {
    earthImported = true;
    return ambient.mountAmbientEarth(mapContainer, handleEarthReady);
})
    .then((session) => {
    earthMap = session;
    /* The overlay-route owner occasionally needs the globe back at the world view. The Earth is a passive backdrop that is always at
       it, so this answers and moves nothing. The session is private to this entry, so the capability - not the session - is published. */
    window
        .knowThyselfShowEarthWorld = () => session.showWorld();
    if (selectedCandidate) {
        presentCandidateOnMap(session, selectedCandidate, selectedCandidate.label, selectedCandidatePresentation);
    }
    startLiveEarthIntro();
    if (introFinished)
        beginOpeningJourney(); // ended before the Earth existed
    return session;
});
/* Nothing in this chain may be left unhandled: the page waits on it, and a rejection used to leave the tunnel running into a black screen
   for ever with the intro state still at its HTML default, 'preloading'. */
earthReady.then(() => {
    experienceStatus.textContent = t('onb.status.earthReady');
}, (error) => handleEarthFailure(error, earthImported ? 'earth-mount' : 'earth-import'));
form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.clearTimeout(searchTimer);
    void search(input.value);
});
input.addEventListener('input', () => {
    focusedResult = -1;
    const query = input.value.trim();
    if (query.length < 2) {
        clearResults();
        return;
    }
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => void search(query), 280);
});
input.addEventListener('keydown', (event) => {
    if (resultShell.hidden || results.length === 0)
        return;
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        focusResult(Math.min(results.length - 1, focusedResult + 1));
    }
    else if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusResult(Math.max(0, focusedResult < 0 ? 0 : focusedResult - 1));
    }
    else if (event.key === 'Enter' && focusedResult >= 0) {
        event.preventDefault();
        void selectSearchResult(results[focusedResult]);
    }
    else if (event.key === 'Escape') {
        clearResults();
    }
});
document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.interaction-dock'))
        clearResults();
});
confirmPlace.addEventListener('click', () => {
    if (!selectedCandidate || !selectedTimeZone)
        return;
    experience.dataset.state = 'confirmed';
    confirmPlace.textContent = t('onb.birthplace.confirmed');
    confirmPlace.disabled = true;
    changePlace.textContent = t('onb.birthplace.chooseAnother');
    experienceStatus.textContent = tf('onb.status.placeConfirmed', { place: selectedCandidate.label });
    window.clearTimeout(vesselTransitionTimer);
    vesselTransitionTimer = window.setTimeout(beginVesselStage, vesselTransitionDurationMillis);
});
changePlace.addEventListener('click', () => {
    window.clearTimeout(vesselTransitionTimer);
    requestSequence += 1;
    selectedCandidate = null;
    selectedTimeZone = null;
    selectedCandidatePresentation = manualCandidatePresentation;
    experience.dataset.state = 'search';
    birthplaceCard.hidden = true;
    confirmPlace.textContent = t('onb.birthplace.confirm');
    confirmPlace.disabled = true;
    changePlace.textContent = t('onb.birthplace.change');
    input.value = '';
    earthMap?.showWorld();
    experienceStatus.textContent = t('onb.status.earthRestored');
    input.focus({ preventScroll: true });
});
for (const choice of vesselChoices) {
    choice.addEventListener('click', () => {
        const vessel = choice.dataset.vessel;
        if (!vessel)
            return;
        selectVessel(vessel);
    });
}
vesselUndefined.addEventListener('click', () => selectVessel('undefined'));
confirmVessel.addEventListener('click', () => {
    if (!selectedVessel)
        return;
    experience.dataset.vessel = selectedVessel;
    experience.dataset.state = 'vessel-confirmed';
    vesselStage.classList.add('is-confirmed');
    confirmVessel.textContent = t('onb.vessel.confirmed');
    confirmVessel.disabled = true;
    for (const choice of vesselChoices)
        choice.disabled = true;
    vesselUndefined.disabled = true;
    experienceStatus.textContent = tf('onb.status.vesselConfirmed', { vessel: formatVesselLabel(selectedVessel) });
});
window.addEventListener('pagehide', () => {
    window.clearTimeout(mapRevealTimer);
    window.clearTimeout(searchRevealTimer);
    window.clearTimeout(vesselTransitionTimer);
    earthMap?.destroy();
}, { once: true });
function handleEarthReady() {
    mapContainer.dataset.initialSteady = 'true';
}
function startLiveEarthIntro() {
    if (introStarted || introFinished || !earthMap)
        return;
    introStarted = true;
    experience.dataset.introState = 'preloading';
    void earthMap.prepareOpeningIntro().then((readiness) => {
        if (introFinished)
            return;
        experience.dataset.preloadResult = readiness.timedOut ? 'timeout' : 'ready';
        experience.dataset.preloadDuration = String(Math.round(readiness.durationMillis));
        experience.dataset.preloadSteadyEvents = String(readiness.steadyEvents);
        experience.dataset.startRange = String(Math.round(readiness.startRange));
        experience.dataset.startFov = String(readiness.startFov);
        beginMapReveal();
    }, (error) => handleEarthFailure(error, 'earth-preload'));
}
function beginMapReveal() {
    if (introFinished)
        return;
    experience.dataset.introState = 'map-revealing';
    mapRevealTimer = window.setTimeout(beginOpeningJourney, mapRevealDurationMillis);
}
/* The camera always arrives. Ending the intro early (QA preset, restored
   session) used to skip the zoom and leave the Earth parked far away. The flight
   now runs once whenever first asked; only the UI steps defer to introFinished.
   playOpeningZoom awaits the preload itself, so asking early is safe. */
function beginOpeningJourney() {
    if (!earthMap || earthJourneyStarted)
        return;
    earthJourneyStarted = true;
    loadingCover.remove();
    if (!introFinished)
        experience.dataset.introState = 'earth-zooming';
    void earthMap.playOpeningZoom().then(() => {
        if (!introFinished)
            beginSearchReveal();
    }, (error) => handleEarthFailure(error, 'earth-zoom'));
}
/*
 * THE EARTH FAILED: say so, and give the person the screen back.
 *
 * Reported once to the startup boundary, which owns the recovery: it re-fetches what failed and reloads once, because a transient
 * network failure is by far the likeliest cause. Only when that is spent (or cannot help: no WebGL, a renderer that threw) does the
 * onboarding carry on WITHOUT the globe - the birthplace search does not need it - with the same terminal state the outer watchdog
 * would reach after twenty seconds, but now, and with the real reason on the page rather than "ready".
 */
function handleEarthFailure(error, kind) {
    if (earthFailureHandled)
        return;
    earthFailureHandled = true;
    mapContainer.dataset.earthMapState = 'unavailable';
    experience.dataset.earthFailure = kind;
    const reloading = reportStartupFailure({
        kind,
        severity: 'degraded',
        url: urlFromImportError(error) ?? (kind === 'earth-import' ? earthModuleUrl : null),
        message: describeError(error),
        reloadHelps: kind === 'earth-import',
    });
    if (reloading)
        return;
    void finishWithoutEarth();
}
async function finishWithoutEarth() {
    /* Let the tunnel finish rather than cutting it in half; the wait is bounded. */
    await afterTunnel();
    releaseTunnel();
    experience.classList.remove('earth-materializing');
    experience.classList.add('intro-ui-visible');
    completeIntro();
    experienceStatus.textContent = t('onb.status.earthUnavailable');
}
function beginSearchReveal() {
    if (introFinished)
        return;
    experience.dataset.introState = 'search-revealing';
    experience.classList.add('intro-ui-visible');
    searchRevealTimer = window.setTimeout(completeIntro, searchRevealDurationMillis);
}
function completeIntro() {
    if (introFinished)
        return;
    introFinished = true;
    /*
     * THE COVER COMES OFF HERE TOO, NOT ONLY IN THE JOURNEY.
     *
     * beginOpeningJourney() removes it, which was enough while the only way to
     * finish the intro was to walk the whole chain. It is not enough now:
     * knowThyselfFinishIntroNow() can end the intro from ANY point, and when it
     * is called before the journey starts - which is exactly what a restored
     * session does, a few milliseconds after load - the chain is cancelled with
     * the black cover still over the page at z-index 8. The result was a finished
     * profile rendered correctly and completely invisible.
     *
     * The watchdog already treats this element as one of "the things standing
     * between the user and a usable screen". So does this. `remove()` on an
     * already-detached node does nothing, so the ordinary path is unaffected.
     */
    loadingCover.remove();
    experience.dataset.introState = 'complete';
    interactionDock.inert = false;
}
/*
 * END THE INTRO NOW, wherever it had got to.
 *
 * The opening sequence is a chain of timers and a promise from the map's zoom,
 * and every step of it begins by checking introFinished - so setting that flag
 * is what makes the whole remaining chain a no-op. The pending timers are
 * cleared as well, because a fired timer that returns immediately is still a
 * frame of work during the very transition this is trying to keep clean.
 *
 * Exposed for the QA presets, which jump to a finished profile from whatever
 * the app happens to be doing. Tapping one two seconds after load used to
 * leave the intro running underneath: it reached beginSearchReveal(), added
 * intro-ui-visible, and put the birthplace step back on screen over the hub
 * that had just been opened.
 *
 * It ends the interface part and never rewinds. The only thing it may start is
 * the Earth's opening flight, if not begun yet - once, forwards to the close-up.
 */
window
    .knowThyselfFinishIntroNow = () => {
    window.clearTimeout(mapRevealTimer);
    window.clearTimeout(searchRevealTimer);
    completeIntro();
    beginOpeningJourney(); // the close-up is still owed
};
/* Last statement of the entry: reaching it proves this whole module graph loaded and evaluated (see startupBridge.ts). */
markEntryAlive('premium-earth-phase-a');
function beginVesselStage() {
    if (!selectedCandidate || !selectedTimeZone)
        return;
    clearResults();
    interactionDock.inert = true;
    vesselStage.inert = false;
    vesselStage.setAttribute('aria-hidden', 'false');
    experience.classList.add('vessel-active');
    experience.dataset.state = 'vessel';
    earthMap?.showWorld();
    experienceStatus.textContent = t('onb.vessel.hint');
}
function selectVessel(vessel) {
    selectedVessel = vessel;
    experience.dataset.vesselSelection = vessel;
    for (const choice of vesselChoices) {
        choice.setAttribute('aria-pressed', String(choice.dataset.vessel === vessel));
    }
    vesselUndefined.setAttribute('aria-pressed', String(vessel === 'undefined'));
    confirmVessel.disabled = false;
    confirmVessel.textContent = t('onb.vessel.confirm');
    experienceStatus.textContent = tf('onb.status.vesselSelected', { vessel: formatVesselLabel(vessel) });
}
async function search(rawQuery) {
    const query = rawQuery.trim();
    if (query.length < 2)
        return;
    const sequence = ++requestSequence;
    form.classList.add('is-searching');
    input.setAttribute('aria-busy', 'true');
    experienceStatus.textContent = t('onb.status.searching');
    try {
        const nextResults = await searchProvider.searchPlaces(query);
        if (sequence !== requestSequence)
            return;
        results = nextResults;
        focusedResult = -1;
        renderResults();
        experienceStatus.textContent = results.length === 0
            ? tf('onb.status.noResults', { query })
            : tf('onb.status.resultsFound', { count: results.length });
    }
    catch (error) {
        if (sequence !== requestSequence)
            return;
        clearResults();
        const message = error instanceof LocationSearchProviderError
            ? error.userMessage
            : t('onb.status.searchUnavailable');
        experienceStatus.textContent = message;
        showSearchNote(message);
    }
    finally {
        if (sequence === requestSequence) {
            form.classList.remove('is-searching');
            input.removeAttribute('aria-busy');
        }
    }
}
function renderResults() {
    resultList.replaceChildren();
    for (const [index, result] of results.entries()) {
        const item = document.createElement('li');
        item.setAttribute('role', 'option');
        item.id = `place-result-${index}`;
        const button = document.createElement('button');
        button.type = 'button';
        const label = document.createElement('span');
        if (result.detail) {
            /* A suggestion that says what it is (a city, a village, a maternity facility) and where: the name, and under it one quiet line. */
            label.className = 'result-text';
            const title = document.createElement('span');
            title.className = 'result-title';
            title.textContent = result.label;
            const detail = document.createElement('small');
            detail.className = 'result-detail';
            detail.textContent = result.detail;
            label.append(title, detail);
        }
        else {
            label.textContent = result.label;
        }
        const arrow = document.createElement('span');
        arrow.className = 'result-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        button.append(label, arrow);
        button.addEventListener('click', () => void selectSearchResult(result));
        item.append(button);
        resultList.append(item);
    }
    resultShell.hidden = results.length === 0;
    input.setAttribute('aria-expanded', String(results.length > 0));
}
function focusResult(index) {
    focusedResult = index;
    const options = [...resultList.querySelectorAll('[role="option"]')];
    options.forEach((option, optionIndex) => option.setAttribute('aria-selected', String(optionIndex === index)));
    const activeOption = options[index];
    input.setAttribute('aria-activedescendant', activeOption?.id ?? '');
    activeOption?.scrollIntoView({ block: 'nearest' });
}
/* Blur the field, then wait for the visual viewport to stop changing, so the
   camera transition and the confirmation layout both start from a settled
   viewport rather than racing the keyboard's dismissal animation. */
async function dismissKeyboardAndSettle(field) {
    const wasFocused = document.activeElement === field;
    field.blur();
    if (!wasFocused)
        return;
    const viewport = window.visualViewport;
    const settleTimeoutMillis = 700;
    const quietMillis = 140;
    await new Promise((resolve) => {
        let quietTimer = 0;
        let hardTimer = 0;
        const finish = () => {
            window.clearTimeout(quietTimer);
            window.clearTimeout(hardTimer);
            viewport?.removeEventListener('resize', onChange);
            resolve();
        };
        const onChange = () => {
            window.clearTimeout(quietTimer);
            quietTimer = window.setTimeout(finish, quietMillis);
        };
        viewport?.addEventListener('resize', onChange);
        quietTimer = window.setTimeout(finish, quietMillis);
        hardTimer = window.setTimeout(finish, settleTimeoutMillis);
    });
}
async function selectSearchResult(result) {
    const candidate = {
        label: result.label,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        region: result.region,
        provider: result.source,
        precision: result.precision,
        source: 'provider-search',
        timeZoneHint: result.timeZone ?? null,
        timeZoneHintSource: result.timeZoneSource ?? result.source,
        ...(result.placeKind ? {
            placeId: result.id,
            placeKind: result.placeKind,
            coordinatePrecision: result.coordinatePrecision,
            settlement: result.settlement ?? null,
            dataSource: result.dataSource,
        } : {}),
    };
    input.value = result.label;
    clearResults();
    // The Android keyboard must be gone BEFORE the camera moves. Committing a
    // result while it was still open built the birthplace confirmation layout
    // underneath it and left the card clipped off-screen.
    await dismissKeyboardAndSettle(input);
    await resolveCandidate(candidate, searchCandidatePresentation);
}
async function resolveCandidate(candidate, presentation) {
    const sequence = ++requestSequence;
    showCandidate(candidate, presentation);
    const location = {
        rawText: candidate.label,
        resolvedLabel: candidate.label,
        latitude: candidate.latitude,
        longitude: candidate.longitude,
        country: candidate.country,
        region: candidate.region,
        precision: candidate.precision,
        source: candidate.source,
        provider: candidate.provider,
        timeZoneHint: candidate.timeZoneHint,
        timeZoneHintSource: candidate.timeZoneHintSource,
    };
    try {
        const resolution = await timeZoneResolverConfiguration.resolver.resolveTimeZone(location, '2000-01-01', '12:00');
        if (sequence !== requestSequence)
            return;
        selectedCandidate = candidate;
        selectedTimeZone = resolution.timeZone;
        selectedTimeZoneSource = resolution.source;
        selectedTimeZoneConfidence = resolution.confidence;
        selectedTimeZoneLimitations = [...resolution.limitations];
        birthplaceMeta.textContent = formatSelectionMeta(candidate, resolution.timeZone);
        birthplaceMeta.title = resolution.limitations.join(' ');
        confirmPlace.disabled = !resolution.timeZone;
        experience.dataset.state = resolution.timeZone ? 'ready' : 'location-only';
        experienceStatus.textContent = resolution.timeZone
            ? tf('onb.status.placeReady', { place: candidate.label })
            : t('onb.status.timezoneUnresolved');
    }
    catch {
        if (sequence !== requestSequence)
            return;
        selectedCandidate = candidate;
        selectedTimeZone = null;
        selectedTimeZoneSource = null;
        selectedTimeZoneConfidence = 'unavailable';
        selectedTimeZoneLimitations = [t('onb.place.timezoneLookupFailed')];
        birthplaceMeta.textContent = formatSelectionMeta(candidate, null);
        confirmPlace.disabled = true;
        experience.dataset.state = 'location-only';
        experienceStatus.textContent = t('onb.status.timezoneUnresolved');
    }
}
function showCandidate(candidate, presentation) {
    selectedCandidate = candidate;
    selectedTimeZone = null;
    selectedCandidatePresentation = presentation;
    experience.dataset.state = 'locating';
    birthplaceCard.hidden = false;
    birthplaceName.textContent = candidate.label;
    birthplaceMeta.textContent = `${formatCoordinates(candidate.latitude, candidate.longitude)} · ${t('onb.place.locating')}`;
    confirmPlace.textContent = t('onb.birthplace.confirm');
    confirmPlace.disabled = true;
    changePlace.textContent = t('onb.birthplace.change');
    if (earthMap)
        presentCandidateOnMap(earthMap, candidate, candidate.label, presentation);
}
/* The status line is for assistive technology only (it is visually hidden), so a search that failed is also said in the place
   results shell, where a sighted reader is looking. It is a note, not a result: nothing in it can be chosen. */
function showSearchNote(message) {
    const note = document.createElement('li');
    note.className = 'place-results-note';
    note.setAttribute('role', 'presentation');
    note.textContent = message;
    resultList.replaceChildren(note);
    resultShell.hidden = false;
}
function clearResults() {
    results = [];
    focusedResult = -1;
    resultList.replaceChildren();
    resultShell.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
}
function formatSelectionMeta(candidate, timeZone) {
    return `${formatCoordinates(candidate.latitude, candidate.longitude)} · ${timeZone ?? t('onb.place.timezoneUnavailable')}`;
}
function formatCoordinates(latitude, longitude) {
    const lat = `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}`;
    const lng = `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`;
    return `${lat} · ${lng}`;
}
function formatVesselLabel(vessel) {
    if (vessel === 'male')
        return t('onb.vessel.male');
    if (vessel === 'female')
        return t('onb.vessel.female');
    if (vessel === 'nonbinary')
        return t('onb.vessel.nonbinary');
    return t('onb.vessel.undefinedLabel');
}
function requiredElement(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`Missing birthplace experience element: ${id}`);
    return element;
}
