import { birthTimeAnswer } from './app/birthTimePrecision.js?v=d9f39e7';
import { dateLocale } from './app/i18n/dateLocale.js?v=d9f39e7';
import { birthTimeIsAnswered, birthTimePrecisionOfInput, birthTimeText, writeBirthTime, } from './birthTimeInput.js?v=d9f39e7';
import { t } from './app/i18n/uiStrings.js?v=d9f39e7';
import { cardTargets, runCardTransition } from './onboardingCardTransition.js?v=d9f39e7';
import { publishPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js?v=d9f39e7';
import { writeStoredProfile } from './app/premium-earth/profilePersistence.js?v=d9f39e7';
import { LOCALE_CHANGED_EVENT } from './localeControl.js?v=d9f39e7';
import { readPlaceSelectionBridge, } from './app/premium-earth/placeSelectionBridge.js?v=d9f39e7';
/* The approved final call to action. Declared once so the overview template and
   every re-entry into OVERVIEW use the same product copy. This module is the
   canonical owner: nothing repaints this label afterwards. */
const finalActionLabel = () => t('onb.overview.finalAction');
const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
const birthplaceCard = document.getElementById('birthplace-card');
const birthplaceName = document.getElementById('birthplace-name');
const birthplaceMeta = document.getElementById('birthplace-meta');
const placeQuery = document.getElementById('place-query');
const changePlace = document.getElementById('change-place');
const confirmPlace = document.getElementById('confirm-place');
const vesselStage = document.getElementById('vessel-stage');
const vesselOrbit = document.getElementById('vessel-orbit');
const confirmVessel = document.getElementById('confirm-vessel');
const experienceStatus = document.getElementById('experience-status');
if (experience instanceof HTMLElement
    && interactionDock instanceof HTMLElement
    && birthplaceCard instanceof HTMLElement
    && birthplaceName instanceof HTMLElement
    && birthplaceMeta instanceof HTMLElement
    && placeQuery instanceof HTMLInputElement
    && changePlace instanceof HTMLButtonElement
    && confirmPlace instanceof HTMLButtonElement
    && vesselStage instanceof HTMLElement
    && vesselOrbit instanceof HTMLElement
    && confirmVessel instanceof HTMLButtonElement) {
    const profileFlow = vesselStage.querySelector('.profile-flow');
    const identityForm = vesselStage.querySelector('#profile-identity-form');
    const arrivalForm = vesselStage.querySelector('#profile-arrival-form');
    const completePanel = vesselStage.querySelector('#profile-complete');
    const birthName = vesselStage.querySelector('#profile-birth-name');
    const birthSurname = vesselStage.querySelector('#profile-birth-surname');
    const birthDate = vesselStage.querySelector('#profile-birth-date');
    const birthTime = vesselStage.querySelector('#profile-birth-time');
    const identityBack = vesselStage.querySelector('.profile-identity-back');
    const identityNext = vesselStage.querySelector('#profile-identity-next');
    const arrivalBack = vesselStage.querySelector('#profile-arrival-back');
    const arrivalConfirm = vesselStage.querySelector('#profile-create');
    const vesselBack = vesselStage.querySelector('.vessel-back');
    const vesselActions = vesselStage.querySelector('.vessel-actions');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (profileFlow instanceof HTMLElement
        && identityForm instanceof HTMLFormElement
        && arrivalForm instanceof HTMLFormElement
        && completePanel instanceof HTMLElement
        && birthName instanceof HTMLInputElement
        && birthSurname instanceof HTMLInputElement
        && birthDate instanceof HTMLInputElement
        && birthTime instanceof HTMLInputElement
        && identityNext instanceof HTMLButtonElement
        && arrivalConfirm instanceof HTMLButtonElement) {
        profileFlow.setAttribute('aria-label', t('onb.review.flowAria'));
        const palette = {
            male: { rgb: '104, 184, 255', soft: '182, 224, 255' },
            female: { rgb: '255, 118, 154', soft: '255, 164, 184' },
            undefined: { rgb: '250, 252, 255', soft: '255, 255, 255' },
        };
        const previewGlyphs = {
            male: `
        <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="10"></circle>
          <path d="M31.1 16.9 L39 9"></path>
          <path d="M33 9 H39 V15"></path>
        </svg>
      `,
            female: `
        <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="10"></circle>
          <path d="M24 34 V43"></path>
          <path d="M19 39 H29"></path>
        </svg>
      `,
            undefined: `
        <svg class="kt-vessel-neighbor-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="10"></circle>
        </svg>
      `,
        };
        const vesselLabel = (vessel) => {
            if (vessel === 'male')
                return t('onb.vessel.male');
            if (vessel === 'female')
                return t('onb.vessel.female');
            return t('onb.vessel.undefined');
        };
        /* Assigning textContent ALWAYS produces a childList mutation record, even
           when the string is unchanged. editChromeObserver watches the confirm
           buttons with childList: true and its callback rewrites those very labels,
           so an unconditional write re-entered the observer from inside its own
           callback and the microtask queue never drained - the tab froze hard on
           every OVERVIEW -> Change Vessel and Change Place. Writing only on a real
           change breaks that feedback loop. */
        const setText = (element, text) => {
            if (element.textContent !== text)
                element.textContent = text;
        };
        const normalizeVessel = (value) => {
            if (value === 'male' || value === 'female')
                return value;
            return 'undefined';
        };
        const readActiveVessel = () => {
            const active = vesselOrbit.querySelector('.vessel-choice.is-carousel-active, .vessel-choice[data-carousel-slot="active"], .vessel-choice.is-focused');
            return normalizeVessel(active?.dataset.vessel ?? experience.dataset.vesselSelection);
        };
        const readPlaceSelection = () => (readPlaceSelectionBridge()?.snapshot() ?? null);
        const readSnapshot = () => ({
            vessel: readActiveVessel(),
            birthName: birthName.value.trim(),
            birthSurname: birthSurname.value.trim(),
            birthDate: birthDate.value,
            birthTime: birthTime.value,
            birthTimePrecision: birthTimePrecisionOfInput(birthTime),
            placeLabel: birthplaceName.textContent?.trim() ?? '',
            placeMeta: birthplaceMeta.textContent?.trim() ?? '',
            placeQuery: placeQuery.value,
            placeSelection: readPlaceSelection(),
        });
        let committed = readSnapshot();
        /* The engine binding reads the CONFIRMED profile from here, so there is one
           owner of that state and no second copy that could drift from it. Vessel is
           carried for completeness but is presentation-only: no engine module reads
           it (see premiumProfileAdapter). */
        /*
         * QA ONLY: fill everything from a preset, as though the onboarding had just
         * been completed with those answers.
         *
         * It deliberately writes through the ORDINARY doors - the same inputs, the
         * same place bridge, the same vessel applier, the same readSnapshot() - and
         * then hands over to enterOverview(), which is the state the onboarding
         * itself ends in. Nothing here shortcuts the commit: a preset produces a
         * committed profile that is indistinguishable from a typed one, which is
         * what lets "Review details" edit it afterwards.
         *
         * Declared before the bridge is published so the published object can carry
         * it, and returns a boolean because a caller has no other way to tell that
         * the place bridge was not up yet.
         */
        /*
         * ONE RESTORE, TWO CALLERS.
         *
         * A QA preset and a profile coming back from localStorage are the same
         * operation: take a finished set of answers, put them through the ordinary
         * inputs, and end in the state the onboarding itself ends in. Writing that
         * twice would be two paths into the committed profile that could drift, and
         * the whole reason this module owns one snapshot is so that cannot happen.
         */
        const applyProfileSnapshot = (source) => {
            const place = readPlaceSelectionBridge();
            if (!place || !source.placeSelection)
                return false;
            birthName.value = source.birthName;
            birthSurname.value = source.birthSurname;
            birthDate.value = source.birthDate;
            /* The time and its certainty resolved by the shared rule and written in
               one step, through the same helper the picker uses - so an unknown time
               lands as the empty answer "I don't know" leaves, and 12:00 can never
               be taken to mean unknown. */
            const answer = birthTimeAnswer(source.birthTime, source.birthTimePrecision);
            writeBirthTime(birthTime, answer.birthTime, answer.birthTimePrecision);
            place.restore(source.placeSelection);
            placeQuery.value = source.placeQuery;
            setText(birthplaceName, source.placeLabel);
            setText(birthplaceMeta, source.placeMeta);
            applyProfileVessel(source.vessel);
            /* Announced the way a cancelled edit announces its rollback, so the
               arrival rows show the restored date and time rather than their
               placeholders when the reader opens one to change it. */
            for (const input of [birthName, birthSurname, birthDate, birthTime]) {
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
            /* Read back rather than assembled from the source: whatever the fields
               and the place bridge actually now hold IS the committed profile, so the
               two cannot drift. */
            committed = readSnapshot();
            enterOverview();
            return true;
        };
        const loadQaProfile = (preset) => applyProfileSnapshot(preset);
        /*
         * THE COMMITTED PROFILE, MIRRORED TO THE DEVICE.
         *
         * Called wherever `committed` becomes final - the Create action and every
         * saved edit - rather than on every keystroke: a draft is not a profile, and
         * writing one would mean a reload could restore a half-answered form.
         *
         * Only input is written. The engines are deterministic, so a stored result
         * would add nothing and could serve a stale reading after a deploy.
         */
        /* The committed time and its certainty, by the one rule. The committed
           profile always holds an answer, so the null of an unanswered question
           never reaches storage or the engines. */
        const committedBirthTime = () => birthTimeAnswer(committed.birthTime, committed.birthTimePrecision ?? undefined);
        const persistCommitted = () => {
            writeStoredProfile({
                vessel: committed.vessel,
                birthName: committed.birthName,
                birthSurname: committed.birthSurname,
                birthDate: committed.birthDate,
                ...committedBirthTime(),
                placeLabel: committed.placeLabel,
                placeMeta: committed.placeMeta,
                placeQuery: committed.placeQuery,
                placeSelection: committed.placeSelection,
            });
        };
        publishPremiumProfileBridge({
            readCommittedProfile: () => ({
                vessel: committed.vessel,
                birthName: committed.birthName,
                birthSurname: committed.birthSurname,
                birthDate: committed.birthDate,
                ...committedBirthTime(),
                placeQuery: committed.placeQuery,
                placeSelection: committed.placeSelection,
            }),
            restoreProfile: applyProfileSnapshot,
            commitProfile: persistCommitted,
            loadQaProfile,
        });
        let editTarget = null;
        let editSnapshot = null;
        let transitionLocked = false;
        completePanel.replaceChildren();
        completePanel.classList.add('profile-overview-panel');
        completePanel.innerHTML = `
      <p class="profile-kicker" data-i18n="onb.overview.kicker">${t('onb.overview.kicker')}</p>
      <h2 class="profile-overview-title" data-i18n="onb.review.title">${t('onb.review.title')}</h2>
      <p class="profile-overview-copy" data-i18n="onb.overview.copy">${t('onb.overview.copy')}</p>

      <div class="profile-overview-list" role="list" aria-label="${t('onb.overview.listAria')}">
        <div class="profile-overview-row profile-overview-row-place" role="listitem">
          <div class="profile-overview-value-wrap">
            <span class="profile-overview-label" data-i18n="onb.review.placeOfBirth">${t('onb.review.placeOfBirth')}</span>
            <strong class="profile-overview-value" id="overview-place"></strong>
            <span class="profile-overview-meta" id="overview-place-meta"></span>
          </div>
          <button class="profile-overview-change" type="button" data-overview-edit="place">data-i18n="onb.birthplace.change">${t('onb.birthplace.change')}</button>
        </div>

        <div class="profile-overview-row" role="listitem">
          <div class="profile-overview-value-wrap">
            <span class="profile-overview-label" data-i18n="onb.review.vessel">${t('onb.review.vessel')}</span>
            <strong class="profile-overview-value" id="overview-vessel"></strong>
          </div>
          <button class="profile-overview-change" type="button" data-overview-edit="vessel">data-i18n="onb.birthplace.change">${t('onb.birthplace.change')}</button>
        </div>

        <div class="profile-overview-row" role="listitem">
          <div class="profile-overview-value-wrap">
            <span class="profile-overview-label" data-i18n="onb.review.name">${t('onb.review.name')}</span>
            <strong class="profile-overview-value" id="overview-name"></strong>
          </div>
          <button class="profile-overview-change" type="button" data-overview-edit="identity">data-i18n="onb.birthplace.change">${t('onb.birthplace.change')}</button>
        </div>

        <div class="profile-overview-row" role="listitem">
          <div class="profile-overview-value-wrap">
            <span class="profile-overview-label" data-i18n="onb.review.dateOfBirth">${t('onb.review.dateOfBirth')}</span>
            <strong class="profile-overview-value" id="overview-date"></strong>
          </div>
          <button class="profile-overview-change" type="button" data-overview-edit="date">data-i18n="onb.birthplace.change">${t('onb.birthplace.change')}</button>
        </div>

        <div class="profile-overview-row" role="listitem">
          <div class="profile-overview-value-wrap">
            <span class="profile-overview-label" data-i18n="onb.review.timeOfBirth">${t('onb.review.timeOfBirth')}</span>
            <strong class="profile-overview-value" id="overview-time"></strong>
            <span class="profile-overview-meta" id="overview-time-meta" hidden></span>
          </div>
          <button class="profile-overview-change" type="button" data-overview-edit="time">data-i18n="onb.birthplace.change">${t('onb.birthplace.change')}</button>
          <!-- Its own line under the whole row, not inside the value column:
               beside the Change button it squeezed into a narrow column and
               collided with it. -->
          <span class="kt-time-fallback-note" id="overview-time-fallback" hidden></span>
        </div>
      </div>

      <div class="profile-overview-actions">
        <button class="profile-primary profile-overview-create" id="profile-overview-create" type="button" data-i18n="onb.overview.finalAction">${t('onb.overview.finalAction')}</button>
      </div>
    `;
        const overviewVessel = completePanel.querySelector('#overview-vessel');
        const overviewName = completePanel.querySelector('#overview-name');
        const overviewPlace = completePanel.querySelector('#overview-place');
        const overviewPlaceMeta = completePanel.querySelector('#overview-place-meta');
        const overviewDate = completePanel.querySelector('#overview-date');
        const overviewTime = completePanel.querySelector('#overview-time');
        const overviewTimeMeta = completePanel.querySelector('#overview-time-meta');
        const overviewTimeFallback = completePanel.querySelector('#overview-time-fallback');
        const overviewCreate = completePanel.querySelector('#profile-overview-create');
        const overviewChangeButtons = [...completePanel.querySelectorAll('[data-overview-edit]')];
        const createEditActions = (owner, scope) => {
            const actions = document.createElement('div');
            actions.className = `profile-actions profile-overview-edit-actions profile-overview-edit-actions-${scope}`;
            actions.hidden = true;
            /* These two are dedicated to editing and their labels never change, so
               unlike the place and vessel buttons they are safe to stamp. */
            const cancel = document.createElement('button');
            cancel.type = 'button';
            cancel.className = 'profile-secondary profile-overview-edit-cancel';
            cancel.dataset.i18n = 'onb.action.cancel';
            cancel.textContent = t('onb.action.cancel');
            const save = document.createElement('button');
            save.type = 'button';
            save.className = 'profile-primary profile-overview-edit-save';
            save.dataset.i18n = 'onb.action.saveChange';
            save.textContent = t('onb.action.saveChange');
            actions.append(cancel, save);
            owner.append(actions);
            return { actions, cancel, save };
        };
        const identityEdit = createEditActions(identityForm, 'identity');
        const arrivalEdit = createEditActions(arrivalForm, 'arrival');
        const parseDateParts = (value) => {
            const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
            if (!match)
                return null;
            const year = Number(match[1]);
            const month = Number(match[2]);
            const day = Number(match[3]);
            if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day))
                return null;
            return { year, month, day };
        };
        const formatDate = (value) => {
            const parts = parseDateParts(value);
            if (!parts)
                return value || t('onb.overview.notSet');
            const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
            const longDate = new Intl.DateTimeFormat(dateLocale(), {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(date);
            const weekday = new Intl.DateTimeFormat(dateLocale(), {
                weekday: 'long',
                timeZone: 'UTC',
            }).format(date);
            return `${longDate} · ${weekday}`;
        };
        const renderOverview = () => {
            if (overviewVessel)
                overviewVessel.textContent = vesselLabel(committed.vessel);
            if (overviewName) {
                overviewName.textContent = `${committed.birthName} ${committed.birthSurname}`.trim() || t('onb.overview.notSet');
            }
            if (overviewPlace)
                overviewPlace.textContent = committed.placeLabel || t('onb.overview.notSet');
            if (overviewPlaceMeta)
                overviewPlaceMeta.textContent = committed.placeMeta || t('onb.overview.coordsTimezone');
            if (overviewDate)
                overviewDate.textContent = formatDate(committed.birthDate);
            /* The three answers stay three before the profile is created: a time
               as recorded ("12:05"), the reader's estimate ("Approx. 03:00", with a
               line saying whose estimate it is), and a time they do not know ("Not
               known"). 12:00 never appears here as though it had been entered - and
               a question nobody has answered yet reads "Not set". */
            const timeUnknown = committed.birthTimePrecision === 'unknown';
            const timeApproximate = committed.birthTimePrecision === 'approximate';
            if (overviewTime) {
                overviewTime.textContent = committed.birthTimePrecision === null
                    ? t('onb.overview.notSet')
                    : birthTimeText(committed);
                overviewTime.classList.toggle('is-estimated', timeUnknown);
                overviewTime.classList.toggle('is-approximate', timeApproximate);
            }
            if (overviewTimeMeta) {
                overviewTimeMeta.textContent = timeUnknown
                    ? t('onb.time.unknownEstimate')
                    : timeApproximate ? t('onb.time.approximateMeta') : '';
                overviewTimeMeta.hidden = !timeUnknown && !timeApproximate;
            }
            /* The full sentence, on the screen where the profile is confirmed. The
               row above already says the time is unknown; this says what is used
               instead and that the results can be wrong because of it - which is the
               part a reader cannot infer, and the part that matters before they go
               and read a chart built on a time nobody gave. */
            if (overviewTimeFallback) {
                overviewTimeFallback.textContent = t('time.unknownFallbackNotice');
                overviewTimeFallback.hidden = !timeUnknown;
            }
        };
        const setProfileEnergy = (vessel) => {
            const energy = palette[vessel];
            profileFlow.style.setProperty('--profile-energy-rgb', energy.rgb);
            profileFlow.style.setProperty('--profile-energy-soft-rgb', energy.soft);
        };
        const getOrderedVesselChoices = () => {
            const all = [...vesselOrbit.querySelectorAll('.vessel-choice')];
            const male = all.find((choice) => choice.dataset.vessel === 'male');
            const undefinedChoice = all.find((choice) => choice.dataset.vessel === 'undefined');
            const female = all.find((choice) => choice.dataset.vessel === 'female');
            return male && undefinedChoice && female ? [male, undefinedChoice, female] : all;
        };
        const renderNeighborPreviews = (vessel) => {
            const ordered = getOrderedVesselChoices();
            const activeIndex = ordered.findIndex((choice) => normalizeVessel(choice.dataset.vessel) === vessel);
            if (activeIndex < 0 || ordered.length < 2)
                return;
            const previous = ordered[(activeIndex - 1 + ordered.length) % ordered.length];
            const next = ordered[(activeIndex + 1) % ordered.length];
            const previousPreview = vesselStage.querySelector('.kt-vessel-neighbor-preview-left');
            const nextPreview = vesselStage.querySelector('.kt-vessel-neighbor-preview-right');
            const paint = (target, choice) => {
                if (!target)
                    return;
                const key = normalizeVessel(choice.dataset.vessel);
                const energy = palette[key];
                target.dataset.vessel = key;
                target.style.setProperty('--kt-neighbor-rgb', energy.rgb);
                target.style.setProperty('--kt-neighbor-soft-rgb', energy.soft);
                target.innerHTML = previewGlyphs[key];
            };
            paint(previousPreview, previous);
            paint(nextPreview, next);
        };
        const applyCarouselVessel = (vessel) => {
            const choices = getOrderedVesselChoices();
            const selected = choices.find((choice) => normalizeVessel(choice.dataset.vessel) === vessel) ?? null;
            if (!selected)
                return null;
            for (const choice of choices) {
                const active = choice === selected;
                choice.classList.toggle('is-carousel-active', active);
                choice.dataset.carouselSlot = active ? 'active' : 'hidden';
                choice.setAttribute('aria-pressed', active ? 'true' : 'false');
                choice.disabled = false;
            }
            experience.dataset.vesselSelection = vessel;
            experience.dataset.vessel = vessel;
            const energy = palette[vessel];
            // The glow ring is mounted on the stage, not inside the carousel, so that
            // the profile/pillar chrome fades cannot take it with them. Look it up from
            // the stage or its vessel colours would stop following the selection.
            const glowRing = vesselStage.querySelector('.kt-vessel-glow-ring');
            glowRing?.style.setProperty('--kt-vessel-glow-rgb', energy.rgb);
            glowRing?.style.setProperty('--kt-vessel-glow-soft-rgb', energy.soft);
            confirmVessel.style.setProperty('--kt-confirm-vessel-rgb', energy.rgb);
            confirmVessel.style.setProperty('--kt-confirm-vessel-soft-rgb', energy.soft);
            renderNeighborPreviews(vessel);
            return selected;
        };
        const applyProfileVessel = (vessel) => {
            const selected = applyCarouselVessel(vessel);
            if (!selected)
                return;
            for (const choice of vesselOrbit.querySelectorAll('.vessel-choice')) {
                const focused = choice === selected;
                choice.classList.toggle('is-focused', focused);
                choice.setAttribute('aria-pressed', focused ? 'true' : 'false');
            }
            vesselOrbit.classList.add('is-focused');
            vesselOrbit.dataset.focusedVessel = vessel;
            experience.classList.add('vessel-focused');
            /* `is-vessel-focused` belongs to the VESSEL step's action row - Confirm
               and the undefined option - and vesselTransitionStability clears it for
               every card after the confirm, which is every card this function paints.
               Adding it here only to have the card's owner take it off again put two
               writes on screen for a class nothing in this state shows. */
            setProfileEnergy(vessel);
        };
        const prepareVesselEditor = () => {
            const selected = applyCarouselVessel(committed.vessel);
            vesselOrbit.classList.remove('is-focused', 'is-dragging');
            experience.classList.remove('vessel-focused');
            vesselActions?.classList.remove('is-vessel-focused');
            for (const choice of vesselOrbit.querySelectorAll('.vessel-choice')) {
                choice.classList.remove('is-focused');
                choice.disabled = false;
            }
            if (selected)
                selected.setAttribute('aria-pressed', 'true');
            profileFlow.hidden = true;
            profileFlow.inert = true;
            vesselStage.classList.remove('is-profile-flow', 'is-confirmed');
            vesselStage.inert = false;
            vesselStage.setAttribute('aria-hidden', 'false');
            experience.classList.remove('profile-flow-active');
            experience.classList.add('vessel-active');
            experience.dataset.state = 'vessel';
            confirmVessel.disabled = false;
            setText(confirmVessel, t('onb.action.saveChange'));
            if (vesselBack) {
                vesselBack.hidden = false;
                setText(vesselBack, t('onb.action.cancel'));
            }
        };
        const preparePlaceEditor = () => {
            profileFlow.hidden = true;
            profileFlow.inert = true;
            vesselStage.classList.remove('is-profile-flow');
            vesselStage.inert = true;
            // 'vessel-active' must go as well: the PLACE editor's layer rules are
            // written against :not(.vessel-active), and the post-PLACE camera clamps
            // are keyed off it so birthplace selection regains real zoom.
            experience.classList.remove('profile-flow-active', 'vessel-focused', 'vessel-active');
            experience.classList.add('overview-place-edit');
            experience.dataset.state = 'ready';
            /* No camera write here. Opening the PLACE editor is UI navigation, and
               this used to fly the globe back to the canonical world pose - the
               reported reset on OVERVIEW -> Change birthplace. The Earth is already a
               world backdrop at this point and simply keeps drifting; a real
               birthplace selection still moves the camera, from wherever it now is. */
            interactionDock.inert = false;
            birthplaceCard.hidden = false;
            birthplaceName.textContent = committed.placeLabel;
            birthplaceMeta.textContent = committed.placeMeta;
            placeQuery.value = committed.placeQuery || committed.placeLabel;
            setText(changePlace, t('onb.action.cancel'));
            setText(confirmPlace, t('onb.action.saveChange'));
            confirmPlace.disabled = committed.placeLabel.length === 0 || /Locating|unavailable/i.test(committed.placeMeta);
            // No autofocus. Entering an editor from OVERVIEW must show the complete
            // menu with the keyboard closed; Android opens the soft keyboard as soon
            // as a text field is focused, which hid the menu the user came to read.
            // The search field receives focus only when the user taps it.
        };
        const restoreNormalActions = () => {
            identityEdit.actions.hidden = true;
            arrivalEdit.actions.hidden = true;
            if (identityBack)
                identityBack.hidden = false;
            identityNext.hidden = false;
            if (arrivalBack)
                arrivalBack.hidden = false;
            arrivalConfirm.hidden = false;
            setText(arrivalConfirm, t('onb.action.reviewDetails'));
            arrivalConfirm.setAttribute('aria-label', t('onb.review.aria'));
            setText(changePlace, t('onb.birthplace.change'));
            setText(confirmPlace, t('onb.birthplace.confirm'));
            if (vesselBack)
                setText(vesselBack, t('onb.action.back'));
            setText(confirmVessel, t('onb.vessel.confirm'));
        };
        const showIdentityEditor = () => {
            profileFlow.hidden = false;
            profileFlow.inert = false;
            vesselStage.classList.add('is-profile-flow', 'is-confirmed');
            vesselStage.inert = false;
            experience.classList.add('vessel-active', 'profile-flow-active', 'vessel-focused');
            profileFlow.dataset.step = 'identity';
            experience.dataset.state = 'identity';
            applyProfileVessel(committed.vessel);
            identityEdit.actions.hidden = false;
            if (identityBack)
                identityBack.hidden = true;
            identityNext.hidden = true;
            syncEditValidity();
            // No autofocus - see preparePlaceEditor. The name field is focused only
            // when the user taps it.
        };
        const closeArrivalPicker = () => {
            const openField = arrivalForm.querySelector('.profile-field-picker.is-open');
            if (openField)
                openField.click();
        };
        const showArrivalEditor = (target) => {
            profileFlow.hidden = false;
            profileFlow.inert = false;
            vesselStage.classList.add('is-profile-flow', 'is-confirmed');
            vesselStage.inert = false;
            experience.classList.add('vessel-active', 'profile-flow-active', 'vessel-focused');
            profileFlow.dataset.step = 'arrival';
            experience.dataset.state = 'arrival';
            applyProfileVessel(committed.vessel);
            arrivalEdit.actions.hidden = false;
            if (arrivalBack)
                arrivalBack.hidden = true;
            arrivalConfirm.hidden = true;
            syncEditValidity();
            const input = target === 'date' ? birthDate : birthTime;
            const field = input.closest('.profile-field-picker');
            window.setTimeout(() => {
                if (editTarget !== target || !field || field.classList.contains('is-open'))
                    return;
                // This open is programmatic, not a user tap, so arrivalPicker must not
                // focus its hour field: the editor has to appear with the keyboard
                // closed and open it only when the user taps the value themselves.
                arrivalForm.dataset.suppressPickerAutofocus = 'true';
                field.click();
            }, reducedMotion.matches ? 20 : 520);
        };
        const enterOverview = () => {
            closeArrivalPicker();
            interactionDock.inert = true;
            experience.classList.remove('overview-place-edit');
            /* And no camera write on the way back either. Re-applying the pose that
               was captured on the way in snapped the planet backwards over however
               far it had drifted during the edit. */
            profileFlow.hidden = false;
            profileFlow.inert = false;
            vesselStage.inert = false;
            vesselStage.setAttribute('aria-hidden', 'false');
            vesselStage.classList.add('is-profile-flow', 'is-confirmed');
            experience.classList.add('vessel-active', 'profile-flow-active', 'vessel-focused');
            applyProfileVessel(committed.vessel);
            profileFlow.dataset.step = 'complete';
            experience.dataset.state = 'overview';
            delete experience.dataset.overviewEdit;
            editTarget = null;
            editSnapshot = null;
            restoreNormalActions();
            renderOverview();
            birthName.disabled = false;
            birthSurname.disabled = false;
            birthDate.disabled = false;
            birthTime.disabled = false;
            if (overviewCreate) {
                overviewCreate.disabled = false;
                setText(overviewCreate, finalActionLabel());
            }
            for (const button of overviewChangeButtons)
                button.disabled = false;
            if (experienceStatus instanceof HTMLElement) {
                experienceStatus.textContent = t('onb.status.reviewBeforeCreate');
            }
        };
        const syncEditValidity = () => {
            identityEdit.save.disabled = birthName.value.trim().length === 0 || birthSurname.value.trim().length === 0;
            arrivalEdit.save.disabled = birthDate.value.length === 0 || !birthTimeIsAnswered(birthTime);
        };
        const beginEdit = (target) => {
            if (transitionLocked || editTarget)
                return;
            // Drop any retained focus before the state switch. Without this the field
            // that was focused in the previous step keeps the Android soft keyboard
            // open across the transition into the new editor.
            const active = document.activeElement;
            if (active instanceof HTMLElement && active !== document.body)
                active.blur();
            transitionLocked = true;
            editTarget = target;
            editSnapshot = { ...committed };
            experience.dataset.overviewEdit = target;
            delete experience.dataset.profileState;
            /* The SHARED onboarding card transition - the same 2 s out, invisible
               swap, 2 s in that every Next/Back uses. This route previously faded the
               overview out and then removed the inline opacity immediately, so the
               editor appeared at full opacity with no fade at all: the reported
               "it just replaced the content". */
            void runCardTransition({
                outgoing: () => cardTargets([completePanel]),
                swap: () => {
                    if (target === 'place')
                        preparePlaceEditor();
                    else if (target === 'vessel')
                        prepareVesselEditor();
                    else if (target === 'identity')
                        showIdentityEditor();
                    else
                        showArrivalEditor(target);
                },
                incoming: () => cardTargets([editorSurface()]),
                unlock: () => { transitionLocked = false; },
            });
        };
        const editorSurface = () => {
            if (editTarget === 'place')
                return interactionDock;
            if (editTarget === 'vessel') {
                return vesselStage.querySelector('.vessel-content') ?? vesselStage;
            }
            if (editTarget === 'identity')
                return identityForm;
            return arrivalForm;
        };
        const returnFromEdit = (save) => {
            if (!editTarget || transitionLocked)
                return;
            const target = editTarget;
            const snapshot = editSnapshot ? { ...editSnapshot } : { ...committed };
            if (save) {
                if (target === 'identity') {
                    if (birthName.value.trim().length === 0 || birthSurname.value.trim().length === 0)
                        return;
                    committed.birthName = birthName.value.trim();
                    committed.birthSurname = birthSurname.value.trim();
                }
                else if (target === 'date' || target === 'time') {
                    if (!birthDate.value || !birthTimeIsAnswered(birthTime))
                        return;
                    committed.birthDate = birthDate.value;
                    committed.birthTime = birthTime.value;
                    committed.birthTimePrecision = birthTimePrecisionOfInput(birthTime);
                }
                else if (target === 'place') {
                    if (confirmPlace.disabled || /Locating|unavailable/i.test(birthplaceMeta.textContent ?? ''))
                        return;
                    committed.placeLabel = birthplaceName.textContent?.trim() ?? committed.placeLabel;
                    committed.placeMeta = birthplaceMeta.textContent?.trim() ?? committed.placeMeta;
                    committed.placeQuery = placeQuery.value || committed.placeLabel;
                    // Commit the REAL selection the PLACE controller resolved, so the
                    // coordinates and timezone behind the label are genuinely updated.
                    committed.placeSelection = readPlaceSelection() ?? committed.placeSelection;
                }
                else if (target === 'vessel') {
                    committed.vessel = readActiveVessel();
                }
            }
            else {
                // Cancel restores the canonical PLACE selection first, so the candidate,
                // coordinates and resolved timezone roll back with the visible label
                // instead of leaving a label that no longer matches the real state.
                if (target === 'place' && snapshot.placeSelection) {
                    readPlaceSelectionBridge()?.restore(snapshot.placeSelection);
                }
                committed = snapshot;
                birthName.value = snapshot.birthName;
                birthSurname.value = snapshot.birthSurname;
                birthDate.value = snapshot.birthDate;
                writeBirthTime(birthTime, snapshot.birthTime, snapshot.birthTimePrecision);
                birthplaceName.textContent = snapshot.placeLabel;
                birthplaceMeta.textContent = snapshot.placeMeta;
                placeQuery.value = snapshot.placeQuery;
                applyCarouselVessel(snapshot.vessel);
                for (const input of [birthName, birthSurname, birthDate, birthTime]) {
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
            transitionLocked = true;
            const surface = editorSurface();
            /* Same shared transition in reverse: the overview is rebuilt with the new
               value while completely invisible, so no old/new value ever pops in. */
            void runCardTransition({
                outgoing: () => cardTargets([surface]),
                swap: () => {
                    if (target === 'vessel')
                        applyProfileVessel(committed.vessel);
                    enterOverview();
                    /* The committed profile has just changed, so the engine runs again
                       while the card is still invisible. A full recompute is used rather
                       than a dependency-scoped one: createProfileExperience is
                       synchronous and derives every pillar from the same birth moment, so
                       partial invalidation would add risk without saving real time - and
                       this way no pillar can be left holding a superseded value. */
                    if (save) {
                        const recompute = window
                            .knowThyselfRecomputePillars;
                        recompute?.();
                        /* And the device gets the new value too. Without this a saved edit
                           would survive the session and then come back as the old profile
                           on the next load - a reading that silently disagrees with the
                           review screen, which is worse than not persisting at all. */
                        persistCommitted();
                    }
                },
                incoming: () => cardTargets([completePanel]),
                unlock: () => { transitionLocked = false; },
            });
        };
        const syncPlaceEditControls = () => {
            if (editTarget !== 'place')
                return;
            setText(changePlace, t('onb.action.cancel'));
            setText(confirmPlace, t('onb.action.saveChange'));
        };
        const syncVesselEditControls = () => {
            if (editTarget !== 'vessel')
                return;
            if (vesselBack) {
                vesselBack.hidden = false;
                setText(vesselBack, t('onb.action.cancel'));
            }
            setText(confirmVessel, t('onb.action.saveChange'));
        };
        const handleEditNavigationCapture = (event) => {
            if (!editTarget)
                return;
            const target = event.target;
            if (!(target instanceof Element))
                return;
            if (editTarget === 'place') {
                if (target.closest('#change-place')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    returnFromEdit(false);
                    return;
                }
                if (target.closest('#confirm-place')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    returnFromEdit(true);
                    return;
                }
            }
            if (editTarget === 'vessel') {
                if (target.closest('.vessel-back')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    returnFromEdit(false);
                    return;
                }
                if (target.closest('#confirm-vessel')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    returnFromEdit(true);
                }
            }
        };
        // Window capture runs before the existing document-level navigation capture.
        // That lets PLACE/VESSEL use their real controls in edit mode without the
        // normal linear onboarding handlers sending the user around the flow again.
        window.addEventListener('click', handleEditNavigationCapture, true);
        for (const button of overviewChangeButtons) {
            button.addEventListener('click', () => {
                const target = button.dataset.overviewEdit;
                if (target)
                    beginEdit(target);
            });
        }
        identityEdit.cancel.addEventListener('click', () => returnFromEdit(false));
        identityEdit.save.addEventListener('click', () => returnFromEdit(true));
        arrivalEdit.cancel.addEventListener('click', () => returnFromEdit(false));
        arrivalEdit.save.addEventListener('click', () => returnFromEdit(true));
        birthName.addEventListener('input', syncEditValidity);
        birthSurname.addEventListener('input', syncEditValidity);
        birthDate.addEventListener('input', syncEditValidity);
        birthTime.addEventListener('input', syncEditValidity);
        window.addEventListener('knowthyself:vessel-carousel-change', syncVesselEditControls);
        const editChromeObserver = new MutationObserver(() => {
            syncPlaceEditControls();
            syncVesselEditControls();
        });
        editChromeObserver.observe(experience, { attributes: true, attributeFilter: ['data-state'] });
        editChromeObserver.observe(confirmPlace, { childList: true, attributes: true, attributeFilter: ['disabled'] });
        editChromeObserver.observe(confirmVessel, { childList: true, attributes: true, attributeFilter: ['disabled'] });
        // ARRIVAL's existing Confirm button already participates in the approved
        // 2 s OUT / 2 s IN card transition. It leads to OVERVIEW, which is where
        // the profile is created.
        arrivalConfirm.textContent = t('onb.action.reviewDetails');
        arrivalConfirm.setAttribute('aria-label', t('onb.review.aria'));
        arrivalForm.addEventListener('submit', (event) => {
            if (editTarget)
                return;
            if (!birthDate.value || !birthTimeIsAnswered(birthTime)
                || !birthName.value.trim() || !birthSurname.value.trim())
                return;
            event.preventDefault();
            event.stopImmediatePropagation();
            committed = readSnapshot();
            enterOverview();
        }, true);
        overviewCreate?.addEventListener('click', () => {
            committed.birthName = birthName.value.trim();
            committed.birthSurname = birthSurname.value.trim();
            committed.birthDate = birthDate.value;
            committed.birthTime = birthTime.value;
            committed.birthTimePrecision = birthTimePrecisionOfInput(birthTime);
            committed.vessel = normalizeVessel(experience.dataset.vesselSelection || committed.vessel);
            renderOverview();
            const metaParts = committed.placeMeta.split(' · ').map((part) => part.trim()).filter(Boolean);
            const latitudeText = metaParts[0] ?? '';
            const longitudeText = metaParts[1] ?? '';
            const timeZone = metaParts.slice(2).join(' · ');
            const coordinateValue = (text, positive, negative) => {
                const match = /^([\d.]+)°\s*([NSEW])$/i.exec(text);
                if (!match)
                    return null;
                const magnitude = Number(match[1]);
                if (!Number.isFinite(magnitude))
                    return null;
                const direction = match[2].toUpperCase();
                return direction === negative ? -magnitude : direction === positive ? magnitude : null;
            };
            /* The canonical selection is authoritative. The formatted card text is
               only a display fallback for provider builds that never published the
               bridge, so the handed-off profile always carries real numbers. */
            const selection = committed.placeSelection ?? readPlaceSelection();
            const selectedCandidate = selection?.candidate ?? null;
            const profileDraft = Object.freeze({
                birthName: committed.birthName,
                birthSurname: committed.birthSurname,
                birthDate: committed.birthDate,
                ...committedBirthTime(),
                vessel: committed.vessel,
                birthplace: Object.freeze({
                    label: selectedCandidate?.label ?? committed.placeLabel,
                    latitude: selectedCandidate?.latitude ?? coordinateValue(latitudeText, 'N', 'S'),
                    longitude: selectedCandidate?.longitude ?? coordinateValue(longitudeText, 'E', 'W'),
                    timeZone: selection?.timeZone ?? (timeZone || null),
                    country: selectedCandidate?.country ?? null,
                    region: selectedCandidate?.region ?? null,
                    precision: selectedCandidate?.precision ?? null,
                    source: selectedCandidate?.source ?? null,
                    provider: selectedCandidate?.provider ?? null,
                }),
            });
            experience.dataset.profileState = 'ready';
            /*
             * NOTE: nothing below here currently runs. premiumPillarExperience claims
             * `#profile-overview-create` on a window CAPTURE listener and calls
             * stopImmediatePropagation, so this bubble-phase handler is never
             * reached. That is pre-existing and is left exactly as it is - untangling
             * which controller owns the final action is not this change.
             *
             * It is written down because the persistence deliberately does NOT live
             * here for that reason. It is published on the bridge as `commitProfile`
             * and called from the controller that actually handles the tap.
             */
            if (overviewCreate) {
                overviewCreate.disabled = true;
                overviewCreate.textContent = t('onb.complete.kicker');
            }
            if (experienceStatus instanceof HTMLElement) {
                experienceStatus.textContent = t('onb.complete.reviewedCopy');
            }
        });
        const style = document.createElement('style');
        style.dataset.profileOverviewFlow = 'true';
        style.textContent = `
      /* OVERVIEW is the fifth tab of the same visual system: transparent glossy
         capsules, the selected vessel colour only as a restrained rim/bloom,
         and the live Earth left untouched behind the UI. */
      .profile-overview-panel {
        width: var(--kt-control-width, min(88vw, 510px)) !important;
        max-width: var(--kt-control-width, min(88vw, 510px)) !important;
        padding: 0 !important;
      }

      .profile-overview-title {
        margin: 0 !important;
        color: rgba(244, 241, 233, .72) !important;
        font-family: Georgia, "Times New Roman", serif !important;
        font-size: clamp(17px, 4.2vw, 21px) !important;
        font-style: italic;
        font-weight: 400 !important;
        line-height: 1.2 !important;
        letter-spacing: .01em !important;
        text-shadow: 0 3px 24px rgba(0,0,0,.46) !important;
      }

      .profile-overview-copy {
        max-width: 410px;
        margin: 7px auto 13px;
        color: rgba(244, 241, 233, .40);
        font-size: 10px;
        line-height: 1.4;
        letter-spacing: .025em;
        text-wrap: balance;
      }

      .profile-overview-list {
        display: grid;
        gap: var(--kt-control-gap, 10px);
        width: 100%;
        max-height: min(47dvh, 430px);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: none;
      }

      .profile-overview-list::-webkit-scrollbar { display: none; }

      .profile-overview-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        min-height: var(--kt-control-height, 56px);
        padding: 9px 10px 9px 18px;
        overflow: hidden;
        border: 1px solid rgba(var(--profile-energy-soft-rgb), .26);
        border-radius: 999px;
        background: transparent;
        box-shadow: var(--kt-glass-shadow, 0 14px 38px rgba(0,0,0,.24));
        backdrop-filter: var(--kt-glass-backdrop, blur(18px) saturate(1.08));
        -webkit-backdrop-filter: var(--kt-glass-backdrop, blur(18px) saturate(1.08));
      }

      .profile-overview-row-place {
        min-height: 68px;
        border-radius: 34px;
      }

      .profile-overview-value-wrap {
        min-width: 0;
        text-align: left;
      }

      .profile-overview-label {
        display: block;
        margin-bottom: 2px;
        color: rgba(244, 241, 233, .40);
        font-size: 7px;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .profile-overview-value {
        display: block;
        min-width: 0;
        overflow: hidden;
        color: rgba(250, 249, 245, .96);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.25;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .profile-overview-meta {
        display: block;
        margin-top: 3px;
        overflow: hidden;
        color: rgba(244, 241, 233, .34);
        font-size: 8px;
        line-height: 1.3;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .profile-overview-change {
        min-width: 72px;
        min-height: 38px;
        padding: 0 15px;
        border: 1px solid rgba(248, 252, 255, .60);
        border-radius: 999px;
        color: rgba(250,250,247,.82);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .09em;
        text-transform: uppercase;
        background: transparent;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.035) inset,
          0 0 11px rgba(235,244,246,.10);
        backdrop-filter: var(--kt-glass-backdrop, blur(18px) saturate(1.08));
        -webkit-backdrop-filter: var(--kt-glass-backdrop, blur(18px) saturate(1.08));
        -webkit-tap-highlight-color: transparent;
      }

      .profile-overview-change:active {
        border-color: rgba(var(--profile-energy-soft-rgb), .84);
        box-shadow:
          0 0 2px rgba(255,255,255,.62),
          0 0 16px rgba(var(--profile-energy-rgb), .20);
      }

      .profile-overview-actions {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        width: 100%;
        margin-top: var(--kt-control-gap, 10px);
      }

      .profile-overview-create {
        width: 100% !important;
        height: var(--kt-action-height, 50px) !important;
        min-height: var(--kt-action-height, 50px) !important;
      }

      .profile-overview-edit-actions {
        grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr) !important;
        width: 100% !important;
        margin-top: var(--kt-control-gap, 10px) !important;
      }

      .profile-overview-edit-actions[hidden] { display: none !important; }

      .place-experience[data-overview-edit="identity"] .profile-panel-identity > .profile-actions:not(.profile-overview-edit-actions),
      .place-experience[data-overview-edit="date"] .profile-panel-arrival > .profile-actions:not(.profile-overview-edit-actions),
      .place-experience[data-overview-edit="time"] .profile-panel-arrival > .profile-actions:not(.profile-overview-edit-actions) {
        display: none !important;
      }

      /* PLACE edit deliberately reuses the existing search + selected-location
         card. Only the layer ownership changes; the Earth and card visuals do not. */
      .place-experience.overview-place-edit .interaction-dock {
        z-index: 720 !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .place-experience.overview-place-edit .vessel-stage {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      .place-experience.overview-place-edit .earth-map {
        opacity: 1 !important;
        filter: none !important;
      }

      @media (max-width: 680px) {
        .profile-overview-copy { margin-bottom: 10px; }
        .profile-overview-list { max-height: min(45dvh, 390px); }
        .profile-overview-row {
          gap: 8px;
          padding-left: 16px;
        }
        .profile-overview-change {
          min-width: 66px;
          padding-inline: 12px;
        }
        .profile-overview-value { font-size: 13px; }
      }

      @media (max-height: 690px) {
        .profile-overview-title { font-size: 16px !important; }
        .profile-overview-copy { display: none; }
        .profile-overview-list {
          gap: 7px;
          max-height: min(43dvh, 320px);
        }
        .profile-overview-row {
          min-height: 48px;
          padding-block: 7px;
        }
        .profile-overview-row-place { min-height: 60px; }
        .profile-overview-actions { margin-top: 8px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .profile-overview-row,
        .profile-overview-change,
        .profile-overview-create {
          transition-duration: 1ms !important;
        }
      }
    `;
        document.head.append(style);
        renderOverview();
        syncEditValidity();
        /*
         * THE LANGUAGE SWITCH HAS TO REACH THE VALUES TOO.
         *
         * The static labels in this card carry `data-i18n` and are re-applied by
         * onboardingStaticText.ts. These cannot be: „Nezadané" is a FALLBACK that
         * stands where the reader has not filled a field in, and the action buttons
         * are rewritten to „Uložiť zmenu" and back as the flow moves. Stamping
         * either would overwrite real state on a language change, so their own
         * module re-derives them instead - which is also the only place that knows
         * whether an editor is currently open.
         */
        document.addEventListener(LOCALE_CHANGED_EVENT, () => {
            renderOverview();
            if (!experience.dataset.overviewEdit)
                restoreNormalActions();
        });
        window.addEventListener('pagehide', () => {
            editChromeObserver.disconnect();
            window.removeEventListener('click', handleEditNavigationCapture, true);
            window.removeEventListener('knowthyself:vessel-carousel-change', syncVesselEditControls);
            style.remove();
        }, { once: true });
    }
}
