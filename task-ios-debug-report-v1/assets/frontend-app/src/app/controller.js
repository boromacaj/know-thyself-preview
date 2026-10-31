import { createBorisBenchmarkExperience, createInitialAppState, createProfileExperience } from './model.js?v=b5ef5ed';
import { birthLocationFromProfile } from './location/birthLocation.js?v=b5ef5ed';
import { inputFromLocationSearchResult, inputFromMapClick, inputFromReverseGeocodeResult } from './location/locationSelection.js?v=b5ef5ed';
import { LocationSearchProviderError } from './location/locationSearchProvider.js?v=b5ef5ed';
import { ReverseGeocodingProviderError } from './location/reverseGeocodingProvider.js?v=b5ef5ed';
import { canSelectExactMapPoint } from './map/mapProvider.js?v=b5ef5ed';
import { renderApp } from './render.js?v=b5ef5ed';
import { FLOW_STAGES } from './types.js?v=b5ef5ed';
import { addDays, clampToDetailedRange, loadEnergyForecast, monthKeyOf } from './energy-forecast/forecastDataset.js?v=b5ef5ed';
import { buildCrossPillarExport, buildPillarExport } from './export/exportBuilder.js?v=b5ef5ed';
import { buildExportFilename, copyTextToClipboard, downloadJsonFile } from './export/exportClipboardDownload.js?v=b5ef5ed';
import { serializeCrossPillarExportToText, serializePillarExportToText } from './export/exportTextSerializer.js?v=b5ef5ed';
import { devProfilePresetsEnabled } from './config/runtimeConfig.js?v=b5ef5ed';
import { buildBlankIntakeDraft, buildIntakeDraftFromPreset, findIntakeProfilePreset, intakeProfilePresetStatusMessage, } from './dev/intakeProfilePresets.js?v=b5ef5ed';
import { clearIntakeDraftSession, loadIntakeDraftFromSession, saveIntakeDraftToSession } from './session/intakeSessionPersistence.js?v=b5ef5ed';
export class AppController {
    root;
    locationSearchProvider;
    reverseGeocodingProvider;
    timeZoneResolver;
    mapProvider;
    state = createInitialAppState();
    mapSession = null;
    mapCamera = null;
    renderRevision = 0;
    locationSearchTimeout = null;
    locationSearchRevision = 0;
    constructor(root, locationSearchProvider, reverseGeocodingProvider, timeZoneResolver, mapProvider) {
        this.root = root;
        this.locationSearchProvider = locationSearchProvider;
        this.reverseGeocodingProvider = reverseGeocodingProvider;
        this.timeZoneResolver = timeZoneResolver;
        this.mapProvider = mapProvider;
        this.root.addEventListener('click', (event) => this.handleClick(event));
        this.root.addEventListener('input', (event) => this.handleInput(event));
        this.root.addEventListener('submit', (event) => { void this.handleSubmit(event); });
        this.root.addEventListener('focusin', (event) => this.handleDateFieldFocusChange(event));
        this.root.addEventListener('focusout', (event) => this.handleDateFieldFocusChange(event));
        this.restoreIntakeDraftFromSession();
    }
    /**
     * Development-convenience refresh persistence, not a saved-profile feature:
     * restores whatever was in the intake form before the last reload (same
     * tab/session only - sessionStorage, not localStorage) so re-running the
     * calculation after a code change does not require retyping birth data.
     * Reuses the exact same "is this input calculation-ready" check and the
     * exact same calculation call as a normal submit, rather than inventing a
     * second path - if the restored draft is not resolved enough to submit, it
     * still repopulates the form fields, it just does not auto-calculate.
     */
    restoreIntakeDraftFromSession() {
        const restoredDraft = loadIntakeDraftFromSession();
        if (!restoredDraft)
            return;
        this.state = {
            ...this.state,
            intakeDraft: restoredDraft,
            locationSearchQuery: restoredDraft.birthPlaceText,
        };
        if (isResolvedBirthLocation(restoredDraft)) {
            this.state = {
                ...this.state,
                stage: 'numerology',
                unlockedStages: ['intake', 'numerology', 'western-astrology', 'bazi-tcm', 'human-design', 'human-design-v2', 'themes', 'energy-forecast'],
                experience: createProfileExperience(restoredDraft),
            };
        }
    }
    start() {
        // A hash-only change does not reload the document, so the deep link has to be
        // re-applied on hashchange as well as on first load.
        window.addEventListener('hashchange', () => {
            if (this.applyEnergyForecastDeepLink())
                this.render();
        });
        this.applyEnergyForecastDeepLink();
        this.render();
    }
    /**
     * Optional deep link for the experimental Energy Forecast pillar, e.g.
     *   #energy-forecast/year
     *   #energy-forecast/month/2026-10
     *   #energy-forecast/week/2026-08-24
     *   #energy-forecast/day/2026-08-28
     * Used for shareable links and for reproducible review screenshots. Any other
     * hash is ignored, so the normal intake flow is unaffected.
     */
    applyEnergyForecastDeepLink() {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash.startsWith('energy-forecast'))
            return false;
        const [, rawView, param] = hash.split('/');
        const view = ['year', 'month', 'week', 'day'].find((candidate) => candidate === rawView) ?? 'year';
        // A month-only param also moves the date anchor, because the load step
        // re-derives selectedMonth from selectedDate after clamping.
        const isMonthParam = Boolean(param) && /^\d{4}-\d{2}$/.test(param);
        const selectedDate = param && /^\d{4}-\d{2}-\d{2}$/.test(param)
            ? param
            : isMonthParam ? `${param}-01` : this.state.energyForecast.selectedDate;
        const selectedMonth = isMonthParam ? param : monthKeyOf(selectedDate);
        this.state = {
            ...this.state,
            stage: 'energy-forecast',
            energyForecast: { ...this.state.energyForecast, view, selectedDate, selectedMonth },
        };
        void this.ensureEnergyForecastLoaded();
        return true;
    }
    render(options = {}) {
        saveIntakeDraftToSession(this.state.intakeDraft);
        const searchFocus = options.preserveSearchFocus ? this.captureSearchFocus() : null;
        const preserveMapCamera = options.preserveMapCamera ?? true;
        if (preserveMapCamera) {
            const camera = this.mapSession?.getCamera();
            if (camera)
                this.mapCamera = camera;
        }
        this.mapSession?.destroy();
        this.mapSession = null;
        const revision = ++this.renderRevision;
        this.root.innerHTML = renderApp(this.state, this.mapProvider.descriptor, this.locationSearchProvider);
        this.restoreSearchFocus(searchFocus);
        this.syncDateEmptyState();
        const mapHost = this.root.querySelector('[data-map-provider-host]');
        if (!mapHost)
            return;
        const selectedCoordinates = this.state.intakeDraft.birthLatitude !== null
            && this.state.intakeDraft.birthLongitude !== null
            ? {
                latitude: this.state.intakeDraft.birthLatitude,
                longitude: this.state.intakeDraft.birthLongitude,
            }
            : null;
        void this.mapProvider.mount(mapHost, {
            selectedCoordinates,
            resolvedPlaceLabel: this.state.intakeDraft.resolvedPlaceLabel,
            initialZoom: selectedCoordinates ? 16 : 2,
            initialCamera: preserveMapCamera ? this.mapCamera : null,
            requestedMapStyle: 'hybrid',
            onMapClick: (coordinates, camera) => {
                if (canSelectExactMapPoint(this.mapProvider.descriptor)) {
                    void this.handleMapSelection(coordinates, camera ?? null);
                }
            },
        }).then((session) => {
            if (revision !== this.renderRevision) {
                session.destroy();
                return;
            }
            this.mapSession = session;
        });
    }
    async handleSubmit(event) {
        const form = event.target;
        if (!(form instanceof HTMLFormElement) || form.id !== 'intake-form')
            return;
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const input = await this.resolveTimeZone(this.readIntakeInput(form));
        if (!isResolvedBirthLocation(input)) {
            this.state = {
                ...this.state,
                stage: 'intake',
                intakeDraft: input,
                locationSearchFeedback: 'Birth place is required. Select a search result or click the map so coordinates and timezone are resolved before continuing.',
                locationSearchResults: [],
            };
            this.render({ preserveMapCamera: true });
            requestAnimationFrame(() => {
                this.root.querySelector('#location-search')?.focus({ preventScroll: false });
            });
            return;
        }
        this.state = {
            ...this.state,
            stage: 'numerology',
            unlockedStages: ['intake', 'numerology', 'western-astrology', 'bazi-tcm', 'human-design', 'human-design-v2', 'themes', 'energy-forecast'],
            intakeDraft: input,
            experience: createProfileExperience(input),
        };
        this.renderAndFocus();
    }
    handleClick(event) {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const button = target.closest('[data-action]');
        if (!button)
            return;
        const action = button.dataset.action;
        if (action === 'go-stage') {
            const stage = button.dataset.stage;
            if (stage && this.state.unlockedStages.includes(stage)) {
                event.preventDefault();
                this.state = { ...this.state, stage };
                if (stage === 'energy-forecast')
                    void this.ensureEnergyForecastLoaded();
                this.renderAndFocus();
            }
            return;
        }
        if (action === 'ef-set-view') {
            const view = button.dataset.view;
            if (view)
                this.updateEnergyForecast({ view });
            return;
        }
        if (action === 'ef-select-date') {
            const date = button.dataset.date;
            if (date) {
                this.updateEnergyForecast({ view: 'day', selectedDate: date, selectedMonth: date.slice(0, 7) });
            }
            return;
        }
        if (action === 'ef-select-month') {
            const month = button.dataset.month;
            if (month)
                this.updateEnergyForecast({ view: 'month', selectedMonth: month, selectedDate: this.firstForecastDateIn(month) });
            return;
        }
        if (action === 'ef-step') {
            this.stepEnergyForecastPeriod(Number(button.dataset.step ?? '1'));
            return;
        }
        if (action === 'ef-focus-system') {
            const raw = button.dataset.system ?? '';
            const system = ['astrology', 'numerology', 'human-design', 'bazi']
                .find((candidate) => candidate === raw) ?? null;
            // Selecting the already-focused node clears it, so the graph toggles.
            this.updateEnergyForecast({
                constellationFocus: system === this.state.energyForecast.constellationFocus ? null : system,
            }, { scrollToTop: false });
            return;
        }
        if (action === 'edit-profile') {
            this.state = { ...this.state, stage: 'intake' };
            this.renderAndFocus();
            return;
        }
        if (action === 'close-reference') {
            button.closest('details')?.removeAttribute('open');
            return;
        }
        if (action === 'load-benchmark') {
            const experience = createBorisBenchmarkExperience();
            this.state = {
                ...this.state,
                stage: 'numerology',
                unlockedStages: ['intake', 'numerology', 'western-astrology', 'bazi-tcm', 'human-design', 'human-design-v2', 'themes', 'energy-forecast'],
                intakeDraft: { ...experience.input },
                locationSearchQuery: experience.input.birthPlaceText,
                locationSearchFeedback: '',
                locationSearchResults: [],
                experience,
            };
            this.renderAndFocus();
            return;
        }
        if (action === 'search-location') {
            this.clearPendingLocationSearch();
            void this.handleLocationSearch();
            return;
        }
        if (action === 'select-location-suggestion') {
            const suggestionId = button.dataset.suggestionId;
            if (suggestionId)
                void this.handleLocationSelection(suggestionId);
            return;
        }
        if (action === 'clear-location') {
            const intakeDraft = this.readIntakeInput();
            this.mapCamera = null;
            this.state = {
                ...this.state,
                intakeDraft: {
                    ...intakeDraft,
                    birthLatitude: null,
                    birthLongitude: null,
                    birthLocationPrecision: 'text-only',
                    birthLocationSource: 'user-input',
                    resolvedPlaceLabel: null,
                    birthCountry: null,
                    birthRegion: null,
                    birthLocationProvider: null,
                    birthTimeZoneHint: null,
                    birthTimeZoneHintSource: null,
                    birthTimeZone: null,
                    birthTimeZoneSource: 'timezone resolver unavailable',
                    birthTimeZoneConfidence: 'unavailable',
                    birthTimeZoneLimitations: ['Coordinates were cleared, so no timezone can be resolved.'],
                },
                locationSearchFeedback: 'Coordinates and resolved timezone cleared. Raw birth place text is preserved.',
                locationSearchResults: [],
            };
            this.render({ preserveMapCamera: false });
            return;
        }
        if (action === 'export-pillar-clipboard') {
            const pillarId = button.dataset.pillarId;
            if (pillarId)
                void this.handleExportPillarClipboard(pillarId);
            return;
        }
        if (action === 'export-pillar-download') {
            const pillarId = button.dataset.pillarId;
            if (pillarId)
                this.handleExportPillarDownload(pillarId);
            return;
        }
        if (action === 'export-all-clipboard') {
            void this.handleExportAllClipboard();
            return;
        }
        if (action === 'export-all-download') {
            this.handleExportAllDownload();
            return;
        }
        if (action === 'next-stage')
            this.advanceStage();
        if (action === 'load-dev-preset') {
            // Defense in depth: the button only renders when devPresetsEnabled is true
            // (intakeScreen.ts), but the handler re-checks the same flag independently.
            if (!devProfilePresetsEnabled)
                return;
            const presetId = button.dataset.presetId;
            const preset = presetId ? findIntakeProfilePreset(presetId) : undefined;
            if (preset)
                this.loadDevProfilePreset(preset);
            return;
        }
        if (action === 'reset-dev-preset') {
            if (!devProfilePresetsEnabled)
                return;
            this.resetDevProfilePreset();
        }
    }
    /**
     * Development-only: populates Intake from a predefined test profile. Behaves like
     * editing the source data from scratch (never patches an already-resolved
     * profile): every location/timezone field is reset to the unresolved baseline via
     * buildIntakeDraftFromPreset, then the existing search pathway is used to fetch
     * real results for the preset's location query. No result is auto-selected —
     * the user still clicks the correct suggestion through the normal, unmodified
     * select-location-suggestion action, and still submits manually.
     */
    loadDevProfilePreset(preset) {
        this.clearPendingLocationSearch();
        this.mapCamera = null;
        const intakeDraft = buildIntakeDraftFromPreset(this.readIntakeInput(), preset);
        this.state = {
            ...this.state,
            intakeDraft,
            locationSearchQuery: preset.birthLocationQuery,
            locationSearchFeedback: intakeProfilePresetStatusMessage(preset),
            locationSearchResults: [],
            exportFeedback: null,
        };
        this.render({ preserveMapCamera: false });
        void this.handleLocationSearch(preset.birthLocationQuery);
    }
    resetDevProfilePreset() {
        this.clearPendingLocationSearch();
        this.mapCamera = null;
        this.state = {
            ...this.state,
            intakeDraft: buildBlankIntakeDraft(this.readIntakeInput()),
            locationSearchQuery: '',
            locationSearchFeedback: '',
            locationSearchResults: [],
            exportFeedback: null,
        };
        this.render({ preserveMapCamera: false });
        clearIntakeDraftSession();
    }
    async handleExportPillarClipboard(pillarId) {
        if (!this.state.experience)
            return;
        let feedback;
        try {
            const exportDocument = buildPillarExport(this.state.experience, pillarId);
            const text = serializePillarExportToText(exportDocument);
            const result = await copyTextToClipboard(text);
            feedback = { scope: pillarId, action: 'clipboard', tone: result.ok ? 'success' : 'error', message: result.ok ? 'Complete pillar data copied.' : result.message };
        }
        catch (error) {
            feedback = { scope: pillarId, action: 'clipboard', tone: 'error', message: error instanceof Error ? error.message : 'Export failed.' };
        }
        this.state = { ...this.state, exportFeedback: feedback };
        this.render();
    }
    handleExportPillarDownload(pillarId) {
        if (!this.state.experience)
            return;
        let feedback;
        try {
            const exportDocument = buildPillarExport(this.state.experience, pillarId);
            const filename = buildExportFilename(pillarId, this.state.experience.coreResult.profile.identity.displayName, this.state.experience.input.birthDate);
            downloadJsonFile(filename, exportDocument);
            feedback = { scope: pillarId, action: 'download', tone: 'success', message: 'Pillar JSON downloaded.' };
        }
        catch (error) {
            feedback = { scope: pillarId, action: 'download', tone: 'error', message: error instanceof Error ? error.message : 'Download failed.' };
        }
        this.state = { ...this.state, exportFeedback: feedback };
        this.render();
    }
    async handleExportAllClipboard() {
        if (!this.state.experience)
            return;
        let feedback;
        try {
            const exportDocument = buildCrossPillarExport(this.state.experience);
            const text = serializeCrossPillarExportToText(exportDocument);
            const result = await copyTextToClipboard(text);
            feedback = { scope: 'all', action: 'clipboard', tone: result.ok ? 'success' : 'error', message: result.ok ? 'Complete cross-pillar export copied.' : result.message };
        }
        catch (error) {
            feedback = { scope: 'all', action: 'clipboard', tone: 'error', message: error instanceof Error ? error.message : 'Export failed.' };
        }
        this.state = { ...this.state, exportFeedback: feedback };
        this.render();
    }
    handleExportAllDownload() {
        if (!this.state.experience)
            return;
        let feedback;
        try {
            const exportDocument = buildCrossPillarExport(this.state.experience);
            const filename = buildExportFilename('complete-cross-pillar-export', this.state.experience.coreResult.profile.identity.displayName, this.state.experience.input.birthDate);
            downloadJsonFile(filename, exportDocument);
            feedback = { scope: 'all', action: 'download', tone: 'success', message: 'Complete cross-pillar JSON downloaded.' };
        }
        catch (error) {
            feedback = { scope: 'all', action: 'download', tone: 'error', message: error instanceof Error ? error.message : 'Download failed.' };
        }
        this.state = { ...this.state, exportFeedback: feedback };
        this.render();
    }
    handleInput(event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement))
            return;
        if (target.form?.id === 'intake-form') {
            // Keystrokes in plain text fields (name/date/time/place-text) never
            // touch this.state.intakeDraft directly - see readIntakeInput(). Persist
            // the live merged view on every keystroke so session storage stays in
            // sync immediately, without changing that deliberate no-rerender-per-
            // keystroke behavior.
            saveIntakeDraftToSession(this.readIntakeInput());
        }
        if (target.id === 'birth-date') {
            this.updateDateEmptyState(target);
            return;
        }
        if (target.id !== 'location-search')
            return;
        this.clearPendingLocationSearch();
        this.locationSearchRevision += 1;
        const query = target.value.trim();
        if (!query) {
            this.state = {
                ...this.state,
                intakeDraft: this.readIntakeInput(),
                locationSearchQuery: '',
                locationSearchFeedback: '',
                locationSearchResults: [],
            };
            this.render({ preserveSearchFocus: true });
            return;
        }
        if (this.locationSearchProvider.mode !== 'live')
            return;
        this.locationSearchTimeout = window.setTimeout(() => {
            this.locationSearchTimeout = null;
            void this.handleLocationSearch(query);
        }, 350);
    }
    handleDateFieldFocusChange(event) {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.id === 'birth-date') {
            this.updateDateEmptyState(target);
        }
    }
    syncDateEmptyState() {
        const dateInput = this.root.querySelector('#birth-date');
        if (dateInput)
            this.updateDateEmptyState(dateInput);
    }
    updateDateEmptyState(input) {
        const body = input.closest('.source-pill-body');
        body?.classList.toggle('is-date-empty', !input.value && document.activeElement !== input);
    }
    advanceStage() {
        const currentIndex = FLOW_STAGES.findIndex((stage) => stage.id === this.state.stage);
        const nextStage = FLOW_STAGES[currentIndex + 1]?.id;
        if (!nextStage || !this.state.experience)
            return;
        this.state = {
            ...this.state,
            stage: nextStage,
            unlockedStages: this.state.unlockedStages.includes(nextStage)
                ? this.state.unlockedStages
                : [...this.state.unlockedStages, nextStage],
        };
        this.renderAndFocus();
    }
    readIntakeInput(form = this.root.querySelector('#intake-form')) {
        if (!form)
            return { ...this.state.intakeDraft };
        const data = new FormData(form);
        const givenNames = String(data.get('givenNames') ?? '').trim();
        const birthSurname = String(data.get('birthSurname') ?? '').trim();
        return {
            ...this.state.intakeDraft,
            givenNames,
            birthSurname,
            fullName: `${givenNames} ${birthSurname}`.trim(),
            birthDate: String(data.get('birthDate') ?? ''),
            birthTime: String(data.get('birthTime') ?? ''),
            birthPlaceText: String(data.get('birthPlaceText') ?? '').trim(),
        };
    }
    async handleMapSelection(coordinates, camera) {
        if (!canSelectExactMapPoint(this.mapProvider.descriptor))
            return;
        this.mapCamera = camera;
        let mapInput = inputFromMapClick(this.readIntakeInput(), coordinates);
        let reverseGeocodeFeedback = 'Reverse geocoding not attempted.';
        try {
            const reverseGeocodeResult = await this.reverseGeocodingProvider.reverseGeocode(coordinates);
            mapInput = inputFromReverseGeocodeResult(mapInput, reverseGeocodeResult);
            reverseGeocodeFeedback = reverseGeocodeResult.label
                ? `Resolved place metadata: ${reverseGeocodeResult.label}.`
                : 'Reverse geocoding completed without a place label.';
        }
        catch (error) {
            reverseGeocodeFeedback = error instanceof ReverseGeocodingProviderError
                ? error.userMessage
                : 'Exact map point was stored, but reverse geocoding could not be completed.';
        }
        const intakeDraft = await this.resolveTimeZone(mapInput);
        this.state = {
            ...this.state,
            intakeDraft,
            locationSearchFeedback: [
                'Exact map point selected. Coordinates were stored.',
                reverseGeocodeFeedback,
                intakeDraft.birthTimeZoneConfidence === 'resolved'
                    ? 'Birth timezone resolved automatically.'
                    : intakeDraft.birthTimeZoneLimitations[0] ?? 'Timezone could not be resolved.',
            ].join(' '),
            locationSearchResults: [],
        };
        this.render({ preserveMapCamera: true });
    }
    async handleLocationSearch(queryOverride) {
        const intakeDraft = this.readIntakeInput();
        const searchInput = this.root.querySelector('#location-search');
        const query = queryOverride ?? searchInput?.value.trim() ?? '';
        const searchRevision = ++this.locationSearchRevision;
        this.state = {
            ...this.state,
            intakeDraft,
            locationSearchQuery: query,
            locationSearchFeedback: this.locationSearchProvider.mode === 'live'
                ? 'Searching live place suggestions...'
                : 'Searching available birth-place records...',
            locationSearchResults: [],
        };
        this.render({ preserveSearchFocus: true });
        let results;
        try {
            results = await this.locationSearchProvider.searchPlaces(query);
        }
        catch (error) {
            if (searchRevision !== this.locationSearchRevision)
                return;
            this.state = {
                ...this.state,
                locationSearchFeedback: error instanceof LocationSearchProviderError
                    ? `${error.userMessage} Coordinates were not changed.`
                    : 'Birth-place search could not be completed. Coordinates were not changed.',
                locationSearchResults: [],
            };
            this.render({ preserveSearchFocus: true });
            return;
        }
        if (searchRevision !== this.locationSearchRevision)
            return;
        this.state = {
            ...this.state,
            intakeDraft,
            locationSearchQuery: query,
            locationSearchResults: [...results],
            locationSearchFeedback: results.length > 0
                ? this.locationSearchProvider.mode === 'bundled-demo'
                    ? `${results.length} bundled demo result found. Select it to add documented location metadata.`
                    : `${results.length} birth-place result found. Select it to add resolved location metadata.`
                : this.locationSearchProvider.mode === 'adapter-pending'
                    ? `${this.locationSearchProvider.limitation} Coordinates were not changed.`
                    : this.locationSearchProvider.mode === 'live'
                        ? 'No matching live place suggestions. Coordinates were not changed.'
                        : 'No matching bundled demo place. Coordinates were not changed.',
        };
        this.render({ preserveSearchFocus: true });
    }
    async handleLocationSelection(suggestionId) {
        const result = this.state.locationSearchResults.find((suggestion) => suggestion.id === suggestionId);
        if (!result)
            return;
        const resolvedInput = await this.resolveTimeZone(inputFromLocationSearchResult(this.readIntakeInput(), result));
        this.mapCamera = null;
        this.state = {
            ...this.state,
            intakeDraft: resolvedInput,
            locationSearchQuery: result.label,
            locationSearchResults: [],
            locationSearchFeedback: `${result.label} selected from ${this.locationSearchProvider.mode === 'bundled-demo'
                ? 'bundled demo source data'
                : 'the configured location provider'}. ${resolvedInput.birthTimeZoneConfidence === 'resolved'
                ? 'Birth timezone resolved automatically.'
                : resolvedInput.birthTimeZoneLimitations[0] ?? 'Birth timezone is unavailable.'}`,
        };
        this.render({ preserveMapCamera: false });
    }
    clearPendingLocationSearch() {
        if (this.locationSearchTimeout === null)
            return;
        window.clearTimeout(this.locationSearchTimeout);
        this.locationSearchTimeout = null;
    }
    captureSearchFocus() {
        const activeElement = document.activeElement;
        if (!(activeElement instanceof HTMLInputElement) || activeElement.id !== 'location-search') {
            return null;
        }
        return {
            selectionStart: activeElement.selectionStart,
            selectionEnd: activeElement.selectionEnd,
            selectionDirection: activeElement.selectionDirection,
        };
    }
    restoreSearchFocus(snapshot) {
        if (!snapshot)
            return;
        const input = this.root.querySelector('#location-search');
        if (!input)
            return;
        input.focus({ preventScroll: true });
        if (snapshot.selectionStart !== null && snapshot.selectionEnd !== null) {
            input.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd, snapshot.selectionDirection ?? 'none');
        }
    }
    async resolveTimeZone(input) {
        const resolution = await this.timeZoneResolver.resolveTimeZone(birthLocationFromProfile(input), input.birthDate, input.birthTime);
        if (resolution.confidence !== 'resolved') {
            if (input.birthTimeZoneConfidence === 'resolved' && input.birthTimeZone && isValidIanaTimeZone(input.birthTimeZone)) {
                return input;
            }
            if (input.birthTimeZoneHint && isValidIanaTimeZone(input.birthTimeZoneHint)) {
                return {
                    ...input,
                    birthTimeZone: input.birthTimeZoneHint,
                    birthTimeZoneSource: input.birthTimeZoneHintSource ?? 'selected-location-timezone-metadata',
                    birthTimeZoneConfidence: 'resolved',
                    birthTimeZoneLimitations: [],
                };
            }
        }
        return {
            ...input,
            birthTimeZone: resolution.timeZone,
            birthTimeZoneSource: resolution.source,
            birthTimeZoneConfidence: resolution.confidence,
            birthTimeZoneLimitations: resolution.limitations,
        };
    }
    renderAndFocus() {
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        requestAnimationFrame(() => document.querySelector('.stage-view h1')?.focus({ preventScroll: true }));
    }
    // -------------------------------------------------------------------------
    // Energy Forecast (experimental pillar)
    //
    // The dataset is a precomputed prototype artefact, fetched once on first entry
    // to the pillar. Selection changes re-render in place; nothing here computes a
    // forecast value.
    // -------------------------------------------------------------------------
    async ensureEnergyForecastLoaded() {
        if (this.state.energyForecast.status === 'loading' || this.state.energyForecast.status === 'ready')
            return;
        this.state = { ...this.state, energyForecast: { ...this.state.energyForecast, status: 'loading', error: null } };
        try {
            const index = await loadEnergyForecast();
            const selectedDate = clampToDetailedRange(this.state.energyForecast.selectedDate, index);
            this.state = {
                ...this.state,
                energyForecast: {
                    ...this.state.energyForecast,
                    status: 'ready',
                    error: null,
                    index,
                    selectedDate,
                    selectedMonth: monthKeyOf(selectedDate),
                },
            };
        }
        catch (error) {
            this.state = {
                ...this.state,
                energyForecast: {
                    ...this.state.energyForecast,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'The forecast dataset could not be loaded.',
                },
            };
        }
        if (this.state.stage === 'energy-forecast')
            this.render();
    }
    /** Focusing a constellation node keeps the reader's scroll position; every
     *  other selection is a period change, which starts again from the top. */
    updateEnergyForecast(patch, options = {}) {
        const scrollToTop = options.scrollToTop ?? true;
        const offset = scrollToTop ? 0 : window.scrollY;
        this.state = { ...this.state, energyForecast: { ...this.state.energyForecast, ...patch } };
        this.render();
        if (scrollToTop)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        else
            window.scrollTo({ top: offset });
    }
    /** First date in the month that actually has a detailed record, else its 1st. */
    firstForecastDateIn(monthKey) {
        const index = this.state.energyForecast.index;
        const match = index?.detailedDates.find((date) => date.startsWith(monthKey));
        return match ?? `${monthKey}-01`;
    }
    stepEnergyForecastPeriod(direction) {
        const ef = this.state.energyForecast;
        if (!ef.index || direction === 0)
            return;
        const step = direction > 0 ? 1 : -1;
        if (ef.view === 'month') {
            const [year, month] = ef.selectedMonth.split('-').map(Number);
            const shifted = new Date(Date.UTC(year, month - 1 + step, 1));
            const monthKey = `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, '0')}`;
            this.updateEnergyForecast({ selectedMonth: monthKey, selectedDate: this.firstForecastDateIn(monthKey) });
            return;
        }
        const days = ef.view === 'week' ? 7 : 1;
        const next = addDays(ef.selectedDate, step * days);
        this.updateEnergyForecast({ selectedDate: next, selectedMonth: monthKeyOf(next) });
    }
}
function isResolvedBirthLocation(input) {
    return input.birthLatitude !== null
        && input.birthLongitude !== null
        && input.birthLocationPrecision !== 'text-only'
        && Boolean(input.birthTimeZone)
        && input.birthTimeZoneConfidence === 'resolved'
        && isValidIanaTimeZone(input.birthTimeZone ?? '');
}
function isValidIanaTimeZone(value) {
    try {
        new Intl.DateTimeFormat('en', { timeZone: value }).format();
        return true;
    }
    catch {
        return false;
    }
}
