import { RAIL_TAP_SLOP, coastDistance, coastFinished, coastStartVelocity, dragPosition, releaseVelocity, } from './app/components/railMomentum.js';
import { dayForecastInputFrom } from './app/forecast-v2/dayInputs.js';
import { buildDayForecast } from './app/forecast-v2/dayForecast.js';
import { chartSetForPeriod, isLifeId, selectionFor } from './app/forecast-graph/forecastGraphModel.js';
import { attachForecastGraph } from './app/forecast-graph/forecastGraphInteraction.js';
import { chartBoxFor } from './app/forecast-graph/forecastGraphRender.js';
import { FORECAST_GRAPH_CSS } from './app/forecast-graph/forecastGraphStyle.js';
import { activeLocale } from './app/i18n/locale.js';
import { buildTemporalSynthesis } from './app/temporal-synthesis/buildTemporalSynthesis.js';
import { composeForecastReading, } from './app/temporal-synthesis/composeForecastReading.js';
import { domainWeights, forecastDomainProfile, } from './app/temporal-synthesis/forecastDomains.js';
import { lifeWeights } from './app/temporal-synthesis/lifeDynamics.js';
import { AREA_ORDER, daysOfMonth, daysOfYear, meanWeights, monthSeries, profileFromWeights, yearSeries, yearWeights, } from './app/temporal-synthesis/forecastPeriods.js';
import { monthNarrative, periodFacts, yearNarrative, } from './app/temporal-synthesis/forecastNarrative.js';
import { monthNames } from './app/i18n/dateLocale.js';
import { renderNumerologyForecast, TREND_BOX, } from './app/components/numerologyForecastScreen.js';
import { cardTargets, runCardTransition } from './onboardingCardTransition.js';
import { renderPremiumPillarNav, PREMIUM_FORECAST_STAGE } from './app/premium-earth/premiumPillarScreens.js';
import { centreActiveStop, retireProfileSurfaces, visibleProfileSurfaces, } from './app/premium-earth/profileSurfaces.js';
import { buildForecast } from './app/numerology-forecast/buildForecast.js';
import { daysInMonth, parseCalendarDate, } from './app/numerology-forecast/personalCycles.js';
import { readPremiumProfileBridge } from './app/premium-earth/premiumProfileBridge.js';
import { readPremiumResult } from './app/premium-earth/premiumResultStore.js';
import { t } from './app/i18n/uiStrings.js';
import { LOCALE_CHANGED_EVENT } from './localeControl.js';
/*
 * ENERGY FORECAST — its own surface, beside the reading surface.
 *
 * Deliberately a separate module from premiumPillarExperience: it adds a surface
 * and a delegated click handler, and touches none of that controller's internals.
 * The Earth, the keyboard architecture, the BodyGraph and the other pillars are
 * untouched.
 *
 * IT IS NO LONGER A PAGE UNDER THE HUB. It was reached by a button below the six
 * hub cards and left by a Back capsule, which put "what is happening now" one
 * level below "who you are" in a product where they are two of six equal
 * destinations. The forecast is now a stop in the same strip as the portrait and
 * the four systems - the same renderer, the same capsules, the same position -
 * so it is one tap from any of them and they are one tap from it.
 *
 * The strip is rendered TWICE, once by each controller, and that is deliberate.
 * Both copies come from renderPremiumPillarNav, so they are the same markup with
 * a different capsule marked active; a reader sees one strip that never moves,
 * because the two are identical everywhere except the highlight. The alternative
 * - one shared strip element owned by one of the two modules - would couple the
 * controllers for a difference nobody can see.
 *
 * Everything shown is deterministic from the committed profile's birth date plus
 * the selected date. The clock seeds the default selection, answers the Today
 * button, and decides one word - whether the prose says "today" or "this day".
 * It never enters a calculation.
 */
const experienceHost = document.getElementById('place-experience');
const vesselStage = document.getElementById('vessel-stage');
if (experienceHost instanceof HTMLElement && vesselStage instanceof HTMLElement) {
    const surface = document.createElement('section');
    surface.id = 'forecast-view';
    surface.className = 'kt-pillar-surface kt-forecast-surface';
    surface.hidden = true;
    surface.inert = true;
    /*
     * THE STRIP HANGS OUTSIDE THE SCROLLER.
     *
     * `.kt-pillar-surface` is `position: absolute; inset: 0; overflow-y: auto` -
     * it IS the scrolling element - so anything rendered inside it scrolls away
     * with the forecast. The strip is a SIBLING of the surface, in the same
     * `.kt-pillar-nav` container the readings use, so it takes that container's
     * existing position and style verbatim and stays put.
     *
     * A separate element rather than the readings' `#pillar-nav`: that one is
     * owned by premiumPillarExperience's card transitions, and borrowing it would
     * tie two independent controllers together for no gain. Same class, same CSS,
     * same capsules - shown and hidden with this surface.
     */
    const forecastNav = document.createElement('nav');
    forecastNav.id = 'forecast-nav';
    forecastNav.className = 'kt-pillar-nav';
    forecastNav.hidden = true;
    forecastNav.inert = true;
    /* The forecast's last card would otherwise sit under the strip. The readings
       reserve exactly this much; the rule there is scoped to their own markup, so
       the same clearance is stated here for this surface. */
    const navClearance = document.createElement('style');
    navClearance.dataset.forecastNavClearance = 'true';
    navClearance.textContent = `
    #place-experience #forecast-view {
      padding-bottom: calc(var(--kt-pillar-nav-height, 46px) + 34px);
    }
  `;
    document.head.append(navClearance);
    vesselStage.append(surface, forecastNav);
    const today = () => {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    };
    let selected = today();
    const isToday = () => {
        const now = today();
        return now.year === selected.year && now.month === selected.month && now.day === selected.day;
    };
    /*
     * THE SCREEN OPENS ON THE DAY, BECAUSE THE DAY IS WHAT THE RAIL SELECTS.
     *
     * It used to open on the year, which put a twelve-month bar chart and a
     * general description of a number above anything about today. `day` now means
     * "no wider scale open" - the rail, the active day and the climate, with the
     * month calendar and the year overview one tap away.
     */
    let state = { activeView: 'day' };
    /*
     * THE TIME LEVEL AND THE TREND'S AREA LIVE BESIDE `state`, NOT IN IT.
     *
     * Several existing handlers assign `state = { activeView: ... }` outright, and
     * folding the level into that object would have made every one of them reset
     * it. Kept apart, the Day view's handlers are untouched, and the Forecast opens
     * on the Day exactly as it always has.
     */
    let level = 'day';
    /*
     * WHICH FIVE THE YEAR AND MONTH DRAW.
     *
     * English reads the period on Life Dynamics (lifeDynamics.ts); Slovak keeps the Day
     * profile's five areas until the English work is approved and reviewed. The area
     * on the graph is one of the active model's ids, so it is reset whenever the
     * language has changed it under it.
     */
    const periodModel = () => (activeLocale() === 'en' ? 'life-dynamics' : 'legacy');
    let area = AREA_ORDER[periodModel()][0];
    const areaOrder = () => AREA_ORDER[periodModel()];
    const validArea = () => (areaOrder().includes(area) ? area : areaOrder()[0]);
    const stepArea = (delta) => {
        const order = areaOrder();
        const index = Math.max(0, order.indexOf(area));
        const count = order.length;
        area = order[(index + delta + count) % count];
    };
    /*
     * THE FORECAST GRAPH (app/forecast-graph/), THE FORECAST'S OWN YEAR AND MONTH GRAPH.
     *
     * In English the Year and Month draw the graph block under the Life Dynamics panel (renderGraphBlock) where the older trend used to be, and every level wears the
     * five theme colours. There is no flag and no address parameter: it is the Forecast. The legacy Slovak Forecast has a different model and still draws its own trend.
     * The picked date is this controller's own `selected`; the only state added is whether Compare all is on and the width the plot was last measured at.
     */
    let graphCompare = false;
    let graphWidth = 330;
    let lastPeriod = null;
    /**
     * The birth date and Life Path come from the committed profile through the
     * existing store - no parallel engine, no retyped birth data. If the profile
     * cannot supply a usable birth date the surface says so rather than inventing
     * one.
     */
    const forecastInput = () => {
        const { experience } = readPremiumResult();
        if (!experience)
            return null;
        const birth = parseCalendarDate(String(experience.input.birthDate ?? ''));
        if (!birth)
            return null;
        /*
         * THE LIFE PATH WAS READ FROM A PROPERTY THAT DOES NOT EXIST.
         *
         * `coreResult.lifePathNumber` is undefined on every profile - the numerology
         * engine puts its results under `coreResult.numerologyOutput.rawOutput`. The
         * optional chaining then swallowed it, `lifePath` was null for everybody, and
         * the two resonance notes that are the forecast's ONLY connection to the
         * natal chart have never once fired in production.
         *
         * Read from where the engine actually writes, and keep the guard: a profile
         * whose numerology could not calculate still has to produce a forecast.
         */
        const lifePathRaw = experience.coreResult?.numerologyOutput?.rawOutput?.lifePathNumber?.finalNumber;
        const lifePath = typeof lifePathRaw === 'number' && Number.isFinite(lifePathRaw) ? lifePathRaw : null;
        return { birth, selected, lifePath };
    };
    /**
     * The period read against this chart, or null when it cannot be built.
     *
     * Null is a legitimate answer and the screen handles it: a profile whose
     * pillars could not calculate still gets the numerology cycle views it always
     * had, just without the integrated reading on top. The old forecast is the
     * floor, not the fallback nobody tested.
     *
     * Built on every render rather than cached. It is pure arithmetic over data
     * already in memory, it depends on the selected date, and a stale forecast for
     * yesterday's date would be a worse bug than any of the work this saves.
     */
    /*
     * The prose and the day profile are two readings of ONE synthesis, so it is
     * built once and handed to both. Building it twice would be wasted arithmetic,
     * and it would also let the two drift apart the day a caching change reached
     * one of them and not the other.
     */
    /*
     * ONE BUILDER FOR EVERY DATE.
     *
     * The day view needs the selected date; the year and month views need every
     * day of their period. All of them are this one call with a different date, so
     * the three levels can never be computed from three different sets of inputs.
     *
     * `withAstrology: false` is the one variation: it leaves the natal positions
     * out, so no ephemeris runs. The year's own influences - the Personal Year,
     * the annual and luck pillars - are numerology and BaZi, identical either way,
     * and reading them for 365 days costs milliseconds instead of a second.
     */
    const synthesisOn = (date, withAstrology = true) => {
        const { experience } = readPremiumResult();
        if (!experience)
            return null;
        const birth = parseCalendarDate(String(experience.input.birthDate ?? ''));
        if (!birth)
            return null;
        const astrology = experience.pillars
            .find((pillar) => pillar.id === 'western-astrology')?.westernAstrologyChart?.astrology;
        const bazi = experience.pillars.find((pillar) => pillar.id === 'bazi-tcm')?.baziChart?.bazi;
        try {
            /*
             * THE VESSEL COMES FROM THE PROFILE BRIDGE, NOT FROM ProfileInput.
             *
             * ProfileInput deliberately has no vessel field - premiumProfileAdapter
             * documents why, and changing that would alter what every engine receives.
             * The forecast is the only consumer that needs it, and the committed
             * profile is right here, so it is read from the same place the onboarding
             * wrote it and goes no further than this call.
             */
            const committed = readPremiumProfileBridge()?.readCommittedProfile();
            const vessel = committed?.vessel ?? null;
            const yearStemPolarity = (bazi?.yearPillar?.stem?.polarity ?? null);
            return buildTemporalSynthesis({
                birth,
                selected: date,
                natal: experience.crossPillarReading?.source ?? null,
                natalPositions: withAstrology ? astrology?.ephemeris?.positions ?? [] : [],
                dayMaster: bazi?.dayMaster ?? null,
                vessel,
                yearStemPolarity,
                /* BOTH sequences. Handing over only `forward` was the bug: it answered a
                   question the engine refuses to answer, and answered it wrongly for
                   every Yin-stem male and Yang-stem female. */
                luckPillars: bazi?.luckPillars
                    ? { forward: bazi.luckPillars.forward, reverse: bazi.luckPillars.reverse }
                    : null,
                birthTimeEstimated: Boolean(experience.crossPillarReading?.source?.coverage?.birthTimeEstimated),
            });
        }
        catch {
            /* A pillar that threw must not take the whole forecast down with it. The
               cycle views below do not depend on any of this. */
            return null;
        }
    };
    const temporalView = () => {
        const synthesis = synthesisOn(selected);
        if (!synthesis)
            return null;
        try {
            const { experience } = readPremiumResult();
            return {
                reading: composeForecastReading(synthesis, {
                    natal: experience?.crossPillarReading?.source ?? null,
                    isToday: isToday(),
                }),
                domains: forecastDomainProfile(synthesis),
            };
        }
        catch {
            return null;
        }
    };
    /*
     * FORECAST V2: THE DAY AS A BRIEFING.
     *
     * Built on the device's own local day - the same clock that chose the date this
     * screen opened on - from the committed profile, by the one function the tests
     * and the QA report also call. English only for now: in Slovak this returns null
     * and the Day level is laid out exactly as before, because the Slovak Forecast is
     * frozen until the English plan is approved. Nothing here is translated.
     *
     * Remembered per profile, date, zone and "today" wording, and never across a
     * profile edit (a new experience object is a new key). A day costs about ten
     * milliseconds; the memo is for the reader flicking back and forth along the rail,
     * not for anything slow. A throw degrades to the legacy layout, never to a blank.
     */
    const dayPlans = new WeakMap();
    const dayPlanView = () => {
        if (activeLocale() !== 'en')
            return null;
        const { experience } = readPremiumResult();
        if (!experience)
            return null;
        let deviceTimeZone = null;
        try {
            deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
        }
        catch {
            deviceTimeZone = null;
        }
        const key = `${isoOf(selected)}|${deviceTimeZone ?? '-'}|${isToday() ? 'today' : 'other'}`;
        let known = dayPlans.get(experience);
        if (!known) {
            known = new Map();
            dayPlans.set(experience, known);
        }
        if (known.has(key))
            return known.get(key) ?? null;
        let built = null;
        try {
            const vessel = readPremiumProfileBridge()?.readCommittedProfile()?.vessel ?? null;
            const input = dayForecastInputFrom(experience, { selected, deviceTimeZone, vessel });
            built = input ? buildDayForecast(input, { isToday: isToday() }) : null;
        }
        catch {
            built = null;
        }
        known.set(key, built);
        return built;
    };
    const dayEntries = new WeakMap();
    const yearScale = new WeakMap();
    const isoOf = (date) => `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    const entriesOf = (experience) => {
        let entries = dayEntries.get(experience);
        if (!entries) {
            entries = new Map();
            dayEntries.set(experience, entries);
        }
        return entries;
    };
    const dayEntry = (date) => {
        const { experience } = readPremiumResult();
        if (!experience)
            return null;
        const entries = entriesOf(experience);
        const key = isoOf(date);
        const known = entries.get(key);
        if (known)
            return known;
        const synthesis = synthesisOn(date);
        if (!synthesis)
            return null;
        const entry = { weights: domainWeights(synthesis), life: lifeWeights(synthesis), facts: synthesis.facts };
        entries.set(key, entry);
        return entry;
    };
    const weightsOn = (date) => {
        const entry = dayEntry(date);
        return periodModel() === 'life-dynamics'
            ? entry?.life ?? meanWeights([], AREA_ORDER['life-dynamics'])
            : entry?.weights ?? meanWeights([]);
    };
    /* The year's own influences, over every day of it - numerology and BaZi only. */
    const yearScaleFacts = (year) => {
        const { experience } = readPremiumResult();
        if (!experience)
            return [];
        let byYear = yearScale.get(experience);
        if (!byYear) {
            byYear = new Map();
            yearScale.set(experience, byYear);
        }
        const known = byYear.get(year);
        if (known)
            return known;
        const facts = periodFacts(daysOfYear(year).map((date) => ({
            date: isoOf(date),
            facts: (synthesisOn(date, false)?.facts ?? [])
                .filter((fact) => fact.band === 'long' || fact.sourceEntity.startsWith('annual')),
        }))).filter((entry) => entry.scale === 'year' || entry.scale === 'background');
        byYear.set(year, facts);
        return facts;
    };
    /*
     * THE YEAR IS READ BEFORE ANYBODY ASKS FOR IT.
     *
     * Every day of a year is 365 model runs - a fifth of a second on a desktop,
     * most of a second on a phone. Paid on the tap that opens the Year, that is a
     * visible stall; paid in the idle time after the Forecast opens, in slices
     * short enough never to hold up a frame, it is nothing. If the reader gets
     * there first, the Year simply finishes the remaining days itself.
     */
    let warmToken = 0;
    const whenIdle = (callback) => {
        const idle = window
            .requestIdleCallback;
        if (typeof idle === 'function')
            idle(callback, { timeout: 500 });
        else
            window.setTimeout(callback, 40);
    };
    const warmYear = () => {
        const { experience } = readPremiumResult();
        if (!experience)
            return;
        const token = ++warmToken;
        const entries = entriesOf(experience);
        const pending = daysOfYear(selected.year).filter((date) => !entries.has(isoOf(date)));
        const step = () => {
            if (token !== warmToken || readPremiumResult().experience !== experience)
                return;
            const started = performance.now();
            while (pending.length > 0 && performance.now() - started < 10) {
                const date = pending.shift();
                if (date)
                    dayEntry(date);
            }
            if (pending.length > 0)
                whenIdle(step);
        };
        if (pending.length > 0)
            whenIdle(step);
    };
    const periodView = () => {
        if (level === 'day')
            return null;
        const { experience } = readPremiumResult();
        if (!experience || !dayEntry(selected))
            return null;
        const natal = experience.crossPillarReading?.source ?? null;
        const { year, month } = selected;
        const yearFacts = yearScaleFacts(year);
        const yearRead = yearNarrative(yearFacts, {
            year, natal, bounds: { from: `${year}-01-01`, to: `${year}-12-31` },
        });
        if (level === 'year') {
            return {
                series: yearSeries(weightsOn, year),
                profile: profileFromWeights(yearWeights(weightsOn, year), periodModel()),
                model: periodModel(),
                narrative: yearRead,
                evidence: yearFacts,
            };
        }
        const days = daysOfMonth(year, month);
        const series = monthSeries(weightsOn, year, month);
        const evidence = periodFacts(days.map((date) => ({ date: isoOf(date), facts: dayEntry(date)?.facts ?? [] })))
            .filter((entry) => entry.scale === 'month' || entry.scale === 'transits');
        return {
            series,
            /* The mean of the curve drawn under it - one definition of the month. */
            profile: profileFromWeights(meanWeights(series), periodModel()),
            model: periodModel(),
            narrative: monthNarrative(evidence, {
                monthName: monthNames()[month - 1],
                yearLead: yearRead.lead,
                natal,
                bounds: { from: isoOf(days[0]), to: isoOf(days[days.length - 1]) },
                birthTimeEstimated: Boolean(experience.crossPillarReading?.source?.coverage?.birthTimeEstimated),
            }),
            evidence,
        };
    };
    /** Keeps a selected day valid when the month or year changes under it. */
    const clampDay = (date) => ({
        ...date,
        day: Math.min(date.day, daysInMonth(date.year, date.month)),
    });
    /*
     * THE SELECTED CARD, PUT IN THE MIDDLE AND KEPT THERE.
     *
     * The surface is re-rendered whole on every interaction, so a rail arrives
     * scrolled to its first item - which on the 28th means the selected chip is
     * four screens off to the right and the reader cannot see what they picked.
     *
     * AND THE ENDS USED TO BE UNREACHABLE. Centring is a scrollLeft, and
     * scrollLeft clamps at zero: January could only ever sit at the left edge of
     * the month rail, measured 97px off centre, and the carousel looked broken
     * exactly where a reader is most likely to be. The fix is room to scroll INTO
     * - inline padding of half the rail minus half the end item, written here
     * because it depends on measured widths that vary with the label inside.
     *
     * NOT scrollIntoView. That walks every scrollable ancestor, and the ancestor
     * here is the forecast surface itself: asking the browser to reveal a chip
     * would scroll the PAGE as well, which is the one thing a horizontal control
     * must never do. Setting scrollLeft moves the rail and nothing else. Measured
     * through getBoundingClientRect rather than offsetLeft, which is relative to
     * whichever ancestor happens to be positioned.
     *
     * A hidden surface has no geometry, so the first render inside open() cannot
     * do this and the swap runs it again once the surface is visible.
     */
    /*
     * WHICH WAY EACH RAIL IS TRAVELLING.
     *
     * One capture-phase listener on the surface rather than three per render:
     * scroll does not bubble, but it does capture, and the rails are rebuilt with
     * every innerHTML so anything bound to them directly would have to be rebound
     * each time. Keyed by element in a WeakMap, so a retired rail is collectable.
     *
     * The class is dropped on a short idle rather than on any end-of-scroll
     * event, because momentum scrolling on a phone has no such event.
     */
    const railTravel = new WeakMap();
    let travelReset = 0;
    surface.addEventListener('scroll', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const rail = target.closest('[data-forecast-rail]');
        if (!rail)
            return;
        const previous = railTravel.get(rail) ?? rail.scrollLeft;
        const delta = rail.scrollLeft - previous;
        railTravel.set(rail, rail.scrollLeft);
        const wrap = rail.closest('.kt-fc-rail-wrap');
        if (wrap && Math.abs(delta) > 0.5) {
            wrap.classList.toggle('is-sliding-next', delta > 0);
            wrap.classList.toggle('is-sliding-prev', delta < 0);
        }
        window.clearTimeout(travelReset);
        travelReset = window.setTimeout(() => {
            for (const element of surface.querySelectorAll('.kt-fc-rail-wrap')) {
                element.classList.remove('is-sliding-prev', 'is-sliding-next');
            }
        }, 240);
    }, { capture: true, passive: true });
    let railDrag = null;
    let coastFrame = 0;
    let swallowClickUntil = 0;
    const stopCoast = () => {
        if (coastFrame)
            window.cancelAnimationFrame(coastFrame);
        coastFrame = 0;
        for (const element of surface.querySelectorAll('.kt-fc-rail.is-coasting'))
            element.classList.remove('is-coasting');
    };
    const startCoast = (rail, velocity) => {
        const from = rail.scrollLeft;
        const began = performance.now();
        rail.classList.add('is-coasting');
        const frame = (now) => {
            const elapsed = now - began;
            const target = from + coastDistance(velocity, elapsed);
            rail.scrollLeft = target;
            const atEnd = (velocity > 0 && rail.scrollLeft < target - 1) || (velocity < 0 && rail.scrollLeft > target + 1);
            if (atEnd || coastFinished(velocity, elapsed)) {
                coastFrame = 0;
                rail.classList.remove('is-coasting');
                return;
            }
            coastFrame = window.requestAnimationFrame(frame);
        };
        coastFrame = window.requestAnimationFrame(frame);
    };
    surface.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || !event.isPrimary)
            return;
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const rail = target.closest('[data-forecast-rail]');
        if (!rail)
            return;
        stopCoast();
        railDrag = { rail, pointerId: event.pointerId, startX: event.clientX, startScroll: rail.scrollLeft, moved: false, samples: [{ t: event.timeStamp, position: rail.scrollLeft }] };
    });
    surface.addEventListener('pointermove', (event) => {
        const drag = railDrag;
        if (!drag || event.pointerId !== drag.pointerId)
            return;
        if (!drag.moved) {
            if (Math.abs(event.clientX - drag.startX) < RAIL_TAP_SLOP)
                return;
            drag.moved = true;
            drag.rail.classList.add('is-dragging');
            try {
                drag.rail.setPointerCapture(event.pointerId);
            }
            catch { /* a pointer that is gone cannot be captured; the drag ends on its own */ }
        }
        drag.rail.scrollLeft = dragPosition(drag.startScroll, drag.startX, event.clientX);
        drag.samples.push({ t: event.timeStamp, position: drag.rail.scrollLeft });
        if (drag.samples.length > 12)
            drag.samples.shift();
    });
    const endDrag = (event) => {
        const drag = railDrag;
        if (!drag || event.pointerId !== drag.pointerId)
            return;
        railDrag = null;
        if (!drag.moved)
            return;
        drag.rail.classList.remove('is-dragging');
        try {
            drag.rail.releasePointerCapture(event.pointerId);
        }
        catch { /* already released */ }
        swallowClickUntil = performance.now() + 350;
        if (event.type === 'pointercancel')
            return;
        const velocity = coastStartVelocity(releaseVelocity(drag.samples, event.timeStamp));
        if (velocity !== 0)
            startCoast(drag.rail, velocity);
    };
    surface.addEventListener('pointerup', endDrag);
    surface.addEventListener('pointercancel', endDrag);
    /* A wheel or a trackpad takes over from a coast in progress. */
    surface.addEventListener('wheel', stopCoast, { passive: true });
    /* The click that follows a drag is not a pick, and not a tap to feel either. On the window, capture phase: that runs before the document-level tap feedback (haptics) and
       before the surface's own click handler, so neither sees it. The flag is only ever set by a drag that moved, and the first click after it clears it. */
    window.addEventListener('click', (event) => {
        if (performance.now() < swallowClickUntil) {
            event.stopPropagation();
            event.preventDefault();
            swallowClickUntil = 0;
        }
    }, { capture: true });
    const centreRailsOnce = () => {
        let measured = false;
        for (const rail of surface.querySelectorAll('[data-forecast-rail]')) {
            const items = rail.querySelectorAll('[data-forecast-pick], [data-forecast-day]');
            const chip = rail.querySelector('[data-forecast-rail-active]');
            if (items.length === 0 || !chip || rail.clientWidth === 0)
                continue;
            measured = true;
            /*
             * SPACER ELEMENTS, NOT PADDING - AND THAT IS NOT A PREFERENCE.
             *
             * Something inside the pillar surface resets padding AND margin with
             * !important on everything it contains. Measured on the month rail: an
             * inline `padding-left: 119px !important` computes to 0px and leaves
             * scrollWidth at 738, and a margin on the first chip does the same
             * nothing. A flex item with a width is layout rather than a box property,
             * so no reset reaches it - the same probe put scrollWidth up by 106.
             *
             * The gap comes off the width because the spacer is a flex item like any
             * other and the rail's own column-gap sits between it and the first card.
             */
            const gap = Number.parseFloat(getComputedStyle(rail).columnGap);
            const inset = Number.isFinite(gap) ? gap : 0;
            /* offsetWidth, not the bounding rect: the wheel scales and turns every
               card that is off centre, and an end card measured through its transform
               would size its spacer from a shrunken, rotated box. */
            const half = (item) => Math.max(0, ((rail.clientWidth - item.offsetWidth) / 2) - inset);
            const pads = rail.querySelectorAll('[data-forecast-rail-pad]');
            const size = (pad, item) => {
                if (!pad)
                    return;
                /* width AND flex-basis: flex-basis alone measured zero here, which is
                   the same reset that eats padding and margin reaching flex-basis too.
                   An explicit width is the one the probe proved survives. */
                const width = `${half(item)}px`;
                pad.style.flex = `0 0 ${width}`;
                pad.style.width = width;
                pad.style.minWidth = width;
            };
            size(pads[0], items[0]);
            size(pads[1], items[items.length - 1]);
            /* Layout position, for the same reason. The rail is the chips' offset
               parent, and offsetLeft does not move with scrolling, so this is the
               scroll position that puts the card's centre on the rail's centre -
               whatever the wheel is doing to it visually at the moment of asking. */
            rail.scrollLeft = chip.offsetLeft + (chip.offsetWidth / 2) - (rail.clientWidth / 2);
            /* Programmatic movement must not light an arrow, so the travel tracker is
               told where the rail now is before it can see the jump as a drag. */
            railTravel.set(rail, rail.scrollLeft);
        }
        return measured;
    };
    /*
     * AND IT HAS TO WAIT UNTIL THERE IS SOMETHING TO MEASURE.
     *
     * Opening the forecast runs a card transition, and for the length of it the
     * surface is display:none - every rail measures zero wide. The centring used
     * to give up silently at that point and never came back, so the screen could
     * arrive with all three strips parked at their first item and the end cards
     * unreachable. It looked like a centring bug and it was a timing one.
     *
     * A ResizeObserver rather than a frame loop, because requestAnimationFrame
     * does not run while the document is hidden - a backgrounded tab would never
     * finish centring and would come back wrong. The observer fires on the layout
     * change itself, whatever the tab is doing, and disconnects the moment it has
     * measured once.
     */
    let pendingCentre = null;
    const centreActiveDay = () => {
        pendingCentre?.disconnect();
        pendingCentre = null;
        if (centreRailsOnce())
            return;
        if (typeof ResizeObserver !== 'function')
            return;
        pendingCentre = new ResizeObserver(() => {
            if (!centreRailsOnce())
                return;
            pendingCentre?.disconnect();
            pendingCentre = null;
        });
        pendingCentre.observe(surface);
    };
    const render = () => {
        const input = forecastInput();
        if (!input) {
            surface.innerHTML = `
        <div class="kt-forecast">
          <h1 class="kt-fc-title">${t('fc.title')}</h1>
          <p class="kt-fc-lede">${t('fc.needBirthDate')}</p>
        </div>`;
            return;
        }
        /* The day's reading only when the Day is on screen; the year and month
           views read their own scale instead. */
        const view = level === 'day' ? temporalView() : null;
        lastPeriod = periodView();
        surface.innerHTML = renderNumerologyForecast(buildForecast(input), {
            ...state, level, area: validArea(), today: isToday(),
            ...(activeLocale() === 'en' ? { graph: { compare: graphCompare, width: graphWidth } } : {}),
        }, view?.reading ?? null, view?.domains ?? null, lastPeriod, level === 'day' ? dayPlanView() : null);
        centreActiveDay();
        warmYear();
        fitGraph();
    };
    /** One SVG unit of the graph is one CSS pixel: if the plot is not the width it was drawn for, draw it again at the real one (once; it then matches). */
    const fitGraph = () => {
        const plot = surface.querySelector('[data-fg-plot]');
        const width = plot?.clientWidth ?? 0;
        if (width < 120 || Math.abs(width - graphWidth) <= 2)
            return;
        graphWidth = width;
        render();
    };
    const renderNav = () => {
        const { experience } = readPremiumResult();
        forecastNav.innerHTML = experience
            ? renderPremiumPillarNav(experience, PREMIUM_FORECAST_STAGE) : '';
        /* The active capsule is the last of six, so on a phone it starts off the
           right-hand edge of the scroller. Same reason and same helper as the
           reading side: the reader must be able to see where they are. */
        centreActiveStop(forecastNav);
    };
    /*
     * OPENING RUNS THE SHARED TRANSITION, AT THE DESTINATION PACE.
     *
     * It used to be a synchronous swap, which was right when the forecast was a
     * page reached from a hub that had just been hidden by somebody else. As a
     * peer destination it has to arrive the way the other five do, or switching
     * to it would be the one navigation in the profile that cuts instead of
     * fading. Whatever surface is currently visible is what leaves - the portrait,
     * a pillar, or nothing at all if the forecast is already open.
     *
     * IT DOES NOT RETIRE THE ONBOARDING, AND DOES NOT NEED TO. The reading stages
     * take the onboarding's controls out of the tab order and the accessibility
     * tree with `inert` - premiumPillarExperience's retireOnboardingControls -
     * and every route into this surface has already been through one of them: the
     * strip carrying the Forecast capsule is only rendered on a reading surface,
     * the session restore opens the portrait first and then taps that capsule,
     * and a popstate to #/forecast is by definition already on a reading.
     * Measured here: no invisible tab stop, and no invisible onboarding node in
     * the accessibility tree.
     *
     * A copy of that lock here would be a second owner of the same flag rather
     * than a safety net, and the two modules deliberately do not import each
     * other. A first route into the forecast from OUTSIDE a reading would need
     * the lock; this note is here so that route knows it.
     */
    const open = () => {
        if (experienceHost.dataset.pillarActive === PREMIUM_FORECAST_STAGE)
            return;
        selected = clampDay(selected);
        render();
        renderNav();
        const leaving = visibleProfileSurfaces(vesselStage);
        void runCardTransition({
            pace: 'destination',
            lock: () => { surface.inert = true; forecastNav.inert = true; },
            outgoing: () => cardTargets(leaving),
            swap: () => {
                retireProfileSurfaces(vesselStage, [surface, forecastNav]);
                surface.hidden = false;
                surface.inert = false;
                forecastNav.hidden = false;
                forecastNav.inert = false;
                surface.scrollLeft = 0;
                surface.scrollTop = 0;
                experienceHost.dataset.pillarStage = 'pillar';
                experienceHost.dataset.pillarActive = PREMIUM_FORECAST_STAGE;
                /* The render above ran against a hidden surface, which has no geometry
                   and so could not measure the rail. Now it can. */
                centreActiveDay();
            },
            incoming: () => cardTargets([surface, forecastNav]),
            unlock: () => { surface.inert = false; forecastNav.inert = false; },
        });
    };
    const stepSelection = (unit, delta) => {
        if (unit === 'year') {
            selected = clampDay({ ...selected, year: selected.year + delta });
            return;
        }
        if (unit === 'month') {
            const raw = selected.month - 1 + delta;
            const year = selected.year + Math.floor(raw / 12);
            const month = ((raw % 12) + 12) % 12 + 1;
            selected = clampDay({ ...selected, year, month });
            return;
        }
        /* Day steps roll across month and year ends, which is why this goes through
           a real date rather than adding to the day number. */
        const rolled = new Date(Date.UTC(selected.year, selected.month - 1, selected.day + delta));
        selected = {
            year: rolled.getUTCFullYear(),
            month: rolled.getUTCMonth() + 1,
            day: rolled.getUTCDate(),
        };
    };
    /* LEAVING IS NOT THIS MODULE'S JOB ANY MORE. There is no Back: the other five
       destinations are in the strip, each carrying the attribute the reading
       controller already claims, so it runs the transition and retires this
       surface inside its own swap. What was a close() here is now simply the
       other controller opening something else. */
    /*
     * THE TREND: TAP TO PICK, SWIPE TO CHANGE AREA.
     *
     * A tap picks the point nearest the finger - thirty days across a phone is
     * ten pixels a day, too small to aim a hit box at - using the SAME drawing box
     * the path was drawn in. A sideways swipe changes the area instead, and the
     * click some browsers still send at the end of that swipe is swallowed so it
     * cannot also move the selection.
     */
    const isArea = (value) => typeof value === 'string' && areaOrder().includes(value);
    const trendIndexAt = (figure, clientX) => {
        const svg = figure.querySelector('svg');
        const count = Number(figure.dataset.points);
        if (!svg || !Number.isFinite(count) || count < 1)
            return null;
        const rect = svg.getBoundingClientRect();
        if (rect.width <= 0)
            return null;
        if (count === 1)
            return 0;
        const svgX = ((clientX - rect.left) / rect.width) * TREND_BOX.width;
        const plotWidth = TREND_BOX.width - TREND_BOX.left - TREND_BOX.right;
        const index = Math.round(((svgX - TREND_BOX.left) / plotWidth) * (count - 1));
        return Math.min(count - 1, Math.max(0, index));
    };
    const selectTrendPoint = (kind, index) => {
        if (kind === 'year')
            selected = clampDay({ ...selected, month: index + 1 });
        else if (kind === 'month' && index + 1 <= daysInMonth(selected.year, selected.month)) {
            selected = { ...selected, day: index + 1 };
        }
    };
    let swipeFrom = null;
    let swallowTrendClick = false;
    surface.addEventListener('pointerdown', (event) => {
        const target = event.target;
        swipeFrom = target instanceof Element && target.closest('[data-forecast-trend]')
            ? { x: event.clientX, y: event.clientY } : null;
    });
    surface.addEventListener('pointercancel', () => { swipeFrom = null; });
    surface.addEventListener('pointerup', (event) => {
        if (!swipeFrom)
            return;
        const dx = event.clientX - swipeFrom.x;
        const dy = event.clientY - swipeFrom.y;
        swipeFrom = null;
        /* Clearly sideways and long enough to be meant; anything else is a tap or
           the page scrolling, and is left to them. */
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5)
            return;
        swallowTrendClick = true;
        window.setTimeout(() => { swallowTrendClick = false; }, 0);
        stepArea(dx < 0 ? 1 : -1);
        render();
    });
    surface.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        /* ---------------------------------------------- the three levels -- */
        const levelPick = target.closest('[data-forecast-level]');
        if (levelPick) {
            const value = levelPick.dataset.forecastLevel;
            if (value === 'year' || value === 'month' || value === 'day') {
                level = value;
                render();
            }
            return;
        }
        /* The trend caption's "Open ..." - a month from the year, a day from the month. */
        const openLevel = target.closest('[data-forecast-open-level]');
        if (openLevel) {
            const value = openLevel.dataset.forecastOpenLevel;
            if (value === 'month' || value === 'day') {
                level = value;
                render();
            }
            return;
        }
        /* The graph block: Compare all. (The icons at the ends of the lines are decorative: the theme is picked in the panel's rows, or with Up / Down.) */
        if (target.closest('[data-forecast-graph-compare]')) {
            graphCompare = !graphCompare;
            render();
            surface.querySelector('[data-forecast-graph-compare]')?.focus({ preventScroll: true });
            return;
        }
        const areaPick = target.closest('[data-forecast-area]');
        if (areaPick) {
            if (isArea(areaPick.dataset.forecastArea)) {
                area = areaPick.dataset.forecastArea;
                render();
            }
            return;
        }
        const areaStep = target.closest('[data-forecast-area-step]');
        if (areaStep) {
            stepArea(Number(areaStep.dataset.forecastAreaStep) < 0 ? -1 : 1);
            render();
            return;
        }
        const trend = target.closest('[data-forecast-trend]');
        if (trend) {
            if (swallowTrendClick)
                return;
            const index = trendIndexAt(trend, event.clientX);
            if (index !== null) {
                selectTrendPoint(trend.dataset.forecastTrend, index);
                render();
            }
            return;
        }
        /*
         * THE YEAR AND MONTH RAILS SELECT ABSOLUTELY, NOT RELATIVELY.
         *
         * Deliberately not `data-forecast-month`, which the month calendar already
         * owns and which also OPENS the calendar panel. Tapping a month on the rail
         * should move the selection and nothing else; borrowing that attribute
         * would have made the panel spring open every time somebody scrubbed the
         * months, which is the opposite of what a picker is for.
         */
        const pick = target.closest('[data-forecast-pick]');
        if (pick) {
            const [unit, rawValue] = String(pick.dataset.forecastPick).split(':');
            const value = Number(rawValue);
            if (Number.isFinite(value)) {
                if (unit === 'year')
                    selected = clampDay({ ...selected, year: value });
                else if (unit === 'month' && value >= 1 && value <= 12) {
                    selected = clampDay({ ...selected, month: value });
                }
                render();
            }
            return;
        }
        const step = target.closest('[data-forecast-step]');
        if (step) {
            const [unit, amount] = String(step.dataset.forecastStep).split(':');
            stepSelection(unit, Number(amount));
            render();
            return;
        }
        if (target.closest('[data-forecast-today]')) {
            selected = today();
            state = { activeView: 'day' };
            render();
            return;
        }
        /* Drill-down: a month in the year's marked months opens the Month level. */
        const monthPick = target.closest('[data-forecast-month]');
        if (monthPick) {
            const month = Number(monthPick.dataset.forecastMonth);
            if (month >= 1 && month <= 12) {
                selected = clampDay({ ...selected, month });
                level = 'month';
                render();
            }
            return;
        }
        const dayPick = target.closest('[data-forecast-day]');
        if (dayPick) {
            const day = Number(dayPick.dataset.forecastDay);
            if (day >= 1 && day <= daysInMonth(selected.year, selected.month)) {
                selected = { ...selected, day };
                state = { activeView: 'day' };
                /* A day, chosen, is a request to read that day - on any level. */
                level = 'day';
                render();
            }
        }
    });
    surface.addEventListener('keydown', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        /*
         * THE TREND IS A SLIDER, SO IT ANSWERS LIKE ONE.
         *
         * Left and right move the picked month or day, Home and End jump to the
         * ends, Enter opens it. Focus is put back because the surface re-renders and
         * the element the key arrived at no longer exists.
         */
        const trendKeys = target.closest('[data-forecast-trend]');
        if (trendKeys && ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(event.key)) {
            event.preventDefault();
            const kind = trendKeys.dataset.forecastTrend;
            if (event.key === 'Enter') {
                level = kind === 'year' ? 'month' : 'day';
                render();
                return;
            }
            const count = Number(trendKeys.dataset.points);
            const current = kind === 'year' ? selected.month - 1 : selected.day - 1;
            const next = event.key === 'Home' ? 0
                : event.key === 'End' ? count - 1
                    : current + (event.key === 'ArrowLeft' ? -1 : 1);
            selectTrendPoint(kind, Math.min(count - 1, Math.max(0, next)));
            render();
            surface.querySelector('[data-forecast-trend]')?.focus();
            return;
        }
        /*
         * THE RAIL UNDER THE ARROW KEYS.
         *
         * A horizontal strip that can only be reached by swiping is a control half
         * the people using this screen do not have. Left and right step the
         * selection by one day through the SAME function the day stepper used, so
         * they roll across a month end exactly as it did - the rail is a month at a
         * time, and stepping off its end is how a reader reaches the next one.
         *
         * Focus is restored afterwards because the whole surface is re-rendered and
         * the element the key arrived at no longer exists; without it the second
         * arrow press would go to the document and nothing would move.
         */
        const chip = target.closest('[data-forecast-rail] [data-forecast-day]');
        if (chip && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            event.preventDefault();
            stepSelection('day', event.key === 'ArrowLeft' ? -1 : 1);
            state = { activeView: 'day' };
            level = 'day';
            render();
            surface.querySelector('[data-forecast-day-active]')?.focus();
            return;
        }
    });
    {
        attachForecastGraph(surface, {
            current: () => {
                const kind = level === 'year' || level === 'month' ? level : null;
                const focus = validArea();
                if (!kind || !lastPeriod || lastPeriod.model !== 'life-dynamics' || !isLifeId(focus))
                    return null;
                const period = {
                    series: lastPeriod.series, profile: lastPeriod.profile,
                    birthTimeEstimated: Boolean(lastPeriod.narrative.plan.estimatedTime),
                };
                return {
                    set: chartSetForPeriod(kind, period, selected),
                    selection: selectionFor(kind, focus, selected, graphCompare),
                    box: chartBoxFor(graphWidth, graphCompare),
                };
            },
            select: (index) => selectTrendPoint(level, index),
            commit: () => render(),
            stepTheme: (delta) => { stepArea(delta); render(); },
        });
        if (typeof ResizeObserver === 'function')
            new ResizeObserver(() => fitGraph()).observe(surface);
        window.addEventListener('resize', () => fitGraph());
    }
    /* The entry point lives in the hub, which the pillar controller re-renders on
       its own schedule. A delegated listener on the host catches it whenever it
       exists, so the two modules never have to coordinate. */
    experienceHost.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('[data-forecast-open]')) {
            event.preventDefault();
            open();
        }
    });
    /* The browser's back and forward buttons are handled by the reading
       controller, which owns the history entries. It cannot open this surface
       itself, so it announces the destination and this answers. */
    document.addEventListener('kt-open-forecast', () => { open(); });
    /* A language change re-renders what is on screen, exactly as it does for the
       readings. The strip's labels are chrome and change with it. */
    document.addEventListener(LOCALE_CHANGED_EVENT, () => {
        if (experienceHost.dataset.pillarActive !== PREMIUM_FORECAST_STAGE)
            return;
        render();
        renderNav();
    });
    const style = document.createElement('style');
    style.dataset.numerologyForecast = 'true';
    style.textContent = `
    #place-experience .kt-forecast {
      display: flex;
      flex-direction: column;
      gap: 18px;
      /* No header: the year / month / day picker is the first thing on the screen, at the surface's own top padding: the QA and
         profile controls exist on the Main Menu only, so nothing floats over it. */
      padding: 0 18px 96px;
      color: rgba(244, 241, 233, 0.92);
    }

    /* The title is the screen's heading for assistive technology only - clipped out of sight, not removed. */
    #place-experience .kt-fc-title {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }

    #place-experience .kt-fc-head { display: flex; flex-direction: column; gap: 4px; }
    #place-experience .kt-fc-back {
      align-self: flex-start;
      margin-bottom: 8px;
      padding: 8px 18px;
      border-radius: 999px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.34);
      background: rgba(12, 14, 18, 0.5);
      color: inherit;
      font: inherit;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-size: 11px;
    }
    #place-experience .kt-fc-kicker {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.82);
    }
    #place-experience .kt-fc-head h1 {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: clamp(26px, 7.4vw, 34px);
    }

    /*
     * THE TODAY PILL.
     *
     * All that survives of the old controls row. The year and month steppers it
     * sat beside are gone - the rails replaced them - so this is a shortcut in
     * the header rather than one control among four.
     */
    #place-experience .kt-fc-today {
      min-width: 44px;
      min-height: 40px;
      border: 0;
      background: none;
      color: inherit;
      font: inherit;
      font-size: 17px;
      line-height: 1;
      border-radius: 999px;
    }
    #place-experience .kt-fc-stepper-value {
      min-width: 62px;
      text-align: center;
      font-size: 13px;
      letter-spacing: 0.04em;
    }
    #place-experience .kt-fc-today {
      flex: 0 0 auto;
      padding: 0 16px;
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.4);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.1);
    }

    /*
     * THE ONE THING THAT STOPS THE RAIL FROM SCROLLING AT ALL ON A PHONE.
     *
     * .kt-pillar-surface declares touch-action: pan-y, so that a finger drag
     * over a reading scrolls the text instead of rotating the Earth underneath.
     * touch-action does not cascade - it INTERSECTS down the ancestor chain -
     * so pan-y on the surface means no descendant of it can ever be panned
     * sideways, whatever the descendant itself declares. A horizontal scroller
     * inside that surface is dead to touch, and the rail is exactly that.
     *
     * Measured, not assumed: walking the chain from a rail chip to <html>, this
     * surface is the only node on it that is not touch-action: auto.
     *
     * So the axis is opened HERE, on the forecast's own surface - two IDs, which
     * outranks the class rule - and nowhere else. The readings keep pan-y
     * exactly as they have it, because their surface is a different element and
     * this selector cannot reach it. Adding pan-x costs the forecast nothing: it
     * is overflow-x: hidden, so a sideways drag anywhere but the rail finds no
     * horizontal scroller and does nothing, and the globe below is already
     * pointer-events: none while a pillar stage owns the screen.
     */
    #place-experience #forecast-view { touch-action: pan-x pan-y; }

    /*
     * THREE CAPSULES, NOT ONE BOX.
     *
     * They shared a single sheet of glass, and the three scales read as one
     * merged control: nothing on the screen said that the top line chooses a
     * year, the second a month and the third a day, or that each is dragged on
     * its own. Separation is the thing that says it.
     *
     * So the stack below carries no surface of its own - it is a column and a
     * gap - and each rail is its own rounded panel. The hierarchy is then in the
     * glass itself: the year capsule is the faintest and shortest, the month sits
     * between, the day is the deepest, widest-cornered and tallest. Three steps
     * down the stack, each one heavier than the last, ending in the card.
     *
     * Each panel carries the blur for its own rail. Three compositor layers
     * rather than one, which is the price of the separation and is still far
     * cheaper than the thirty-one per-chip blurs this replaced earlier.
     */
    #place-experience .kt-fc-rails {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /*
     * THE ROW, THE FRAME, AND THE GUTTER.
     *
     * The bordered glass is now .kt-fc-rail-frame and the arrows are siblings
     * of it, so nothing has to be cut out of the strip to make room for them.
     * The row pulls itself 18px wider than the forecast column on each side -
     * exactly the padding .kt-forecast was already spending there - so the
     * arrows stand in free space and the frame keeps the card's full width.
     */
    /*
     * The arrows stand off the frame now rather than touching it: an 8px gap
     * between mark and glass, and the row reaching 26px past the column on each
     * side to pay for it. The frame itself still resolves to exactly the card's
     * width - 26 out, 18 of arrow, 8 of air, back to the same edge.
     */
    #place-experience .kt-fc-rail-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-inline: -26px;
    }
    /*
     * SURFACE ROLES, WITH TODAY'S GLASS AS THE FALLBACK.
     *
     * The frames, chips, rows, tabs and cards of this screen take their edge
     * from the Surface Border role (which Interface Color sets) and keep their
     * OWN alpha, so the year, month and day layers stay three depths of one
     * glass under any choice. With Transparent nothing sets the role, and every
     * fallback is the literal this screen always painted.
     * --kt-glass-fill is deliberately not read: it carries the shared material's
     * alpha, which would thin these panes to the reading's 0.15. The light veils
     * (month chips, area rows) take the fill's wash; an unlit dot or hairline
     * takes the border colour; every lit state already follows the accent, which
     * a customised Highlight replaces at the source.
     */
    #place-experience .kt-fc-rail-frame {
      flex: 1 1 auto;
      min-width: 0;
      padding: 4px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.08);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
    }
    /* Lightest, shortest, least curved. */
    #place-experience .kt-fc-rail-year .kt-fc-rail-frame {
      border-radius: 14px;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.3);
    }
    #place-experience .kt-fc-rail-month .kt-fc-rail-frame {
      border-radius: 16px;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.38);
      border-color: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.1);
      padding: 5px 4px;
    }
    /* Deepest glass, widest corner, and the only one holding two rows. */
    #place-experience .kt-fc-rail-day .kt-fc-rail-frame {
      border-radius: 20px;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.46);
      border-color: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.12);
      padding: 7px 4px;
    }

    /* TODAY under the three, centred, its own small capsule. */
    #place-experience .kt-fc-today-row {
      display: flex;
      justify-content: center;
      margin-top: 2px;
    }

    #place-experience .kt-fc-rail {
      /* The positioned ancestor every chip measures its offsetLeft against, so
         centring can use layout geometry that the wheel transforms below do
         not disturb. */
      position: relative;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      /*
       * THE EDGES DISSOLVE INTO THE GLASS INSTEAD OF STOPPING AT IT.
       *
       * A mask on the scroller, not an overlay: it fades the moving CONTENT and
       * leaves the frame's own glass untouched behind it, so a card leaving the
       * strip thins into the panel rather than being guillotined by its edge.
       * Three stops rather than two so the fall-off eases in instead of
       * starting as a visible line. The middle 56% is fully opaque, which clears
       * the widest centred chip on every rail with room to spare.
       */
      -webkit-mask-image: linear-gradient(to right,
        transparent 0%, rgba(0, 0, 0, 0.35) 7%, #000 22%, #000 78%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
      mask-image: linear-gradient(to right,
        transparent 0%, rgba(0, 0, 0, 0.35) 7%, #000 22%, #000 78%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      /* A horizontal drag belongs to the rail's own finger handling (railMomentum.ts); a vertical one still scrolls the page. */
      touch-action: pan-y;
      -webkit-user-select: none;
      user-select: none;
      /*
       * PROXIMITY, NEVER MANDATORY. Mandatory snapping is the behaviour that
       * makes a strip feel like it has hold of your finger, and it also fights
       * the programmatic centring that runs after every re-render. Proximity
       * settles the rail on a whole item without ever refusing to let go.
       */
      scroll-snap-type: x proximity;
      /*
       * The inline padding is written by the controller, not here: it is half
       * the rail minus half the first and last item, which is what lets the
       * FIRST and LAST cards reach the exact centre instead of stopping against
       * the end of the scroll range. Without it the active card at either end
       * of a strip sits off-centre and the carousel looks broken precisely
       * where the reader is most likely to be.
       */
    }
    #place-experience .kt-fc-rail::-webkit-scrollbar { display: none; }
    /* While a finger drags or the strip coasts, no snapping: the snap would pull the strip back to a chip under the finger. It settles on one afterwards. */
    #place-experience .kt-fc-rail.is-dragging,
    #place-experience .kt-fc-rail.is-coasting { scroll-snap-type: none; }
    #place-experience .kt-fc-rail.is-dragging { cursor: grabbing; }

    /*
     * THE WHEEL.
     *
     * Every card is turned by its own distance from the centre of its strip, so
     * whichever card is in the middle faces the reader and the rest bend away as
     * if the row were wrapped round a soft drum. It follows the thumb exactly
     * while the strip moves, and it costs no JavaScript at all: a scroll-driven
     * animation on a view timeline is run by the compositor, so sixty cards
     * across three strips add nothing to the main thread on a mid-range phone.
     *
     * The view timeline's midpoint is the card sitting dead centre in the
     * scrollport, which is exactly where the keyframes are the identity - so
     * the centred card is geometrically untouched, and nothing that measures it
     * (the centring, the snap) sees a transformed box.
     *
     * DELIBERATELY SMALL. Eighteen degrees, eight per cent of scale, a quarter
     * off the opacity at the very ends - and the ends are already inside the
     * edge fade, so the dimming reads as depth rather than as disabled items.
     *
     * TWO GATES, BOTH ON PURPOSE.
     *   @supports - a browser without view timelines gets the flat strip it had
     *   before, fully working. Nothing here is load-bearing.
     *   no-preference - scroll-linked 3D rotation is precisely the kind of
     *   motion a reduced-motion setting exists to switch off, and the sitewide
     *   rule would otherwise collapse the animation to 0.01ms and leave every
     *   card frozen at its turned-away end state.
     */
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view(inline)) {
        #place-experience .kt-fc-rail .kt-fc-year-chip,
        #place-experience .kt-fc-rail .kt-fc-month-chip,
        #place-experience .kt-fc-rail .kt-fc-day-chip {
          transform-origin: 50% 50%;
          animation: kt-fc-wheel linear both;
          animation-timeline: view(inline);
          animation-range: cover 0% cover 100%;
        }
      }
    }
    @keyframes kt-fc-wheel {
      0% {
        transform: perspective(520px) rotateY(18deg) scale(0.92);
        opacity: 0.74;
      }
      50% {
        transform: perspective(520px) rotateY(0deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: perspective(520px) rotateY(-18deg) scale(0.92);
        opacity: 0.74;
      }
    }
    /* Sized by the controller; zero until it has measured the rail. */
    #place-experience .kt-fc-rail-pad { flex: 0 0 0; align-self: stretch; pointer-events: none; }

    /*
     * THE ARROWS.
     *
     * Outside the frame, in the gutter, and drawn as a stroked polyline so the
     * outer point can be rounded - a font's chevron cannot be. Bigger than the
     * typographic pair they replace and still quiet: no fill, no border, no
     * pill, just a mark that says the strip moves sideways.
     */
    #place-experience .kt-fc-chev {
      flex: 0 0 18px;
      display: grid;
      place-items: center;
      align-self: stretch;
      padding: 0;
      border: 0;
      background: none;
      color: rgba(244, 241, 233, 0.38);
      transition: color 160ms ease, filter 160ms ease;
    }
    #place-experience .kt-fc-chev svg {
      display: block;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /*
     * THE ARROW THAT LIGHTS IS THE WAY THE STRIP IS TRAVELLING.
     *
     * Scrolling back through the list lights the left mark, scrolling on lights
     * the right one - the same direction those marks move the selection when
     * they are tapped, so the glow reads as "this is the way you are going"
     * rather than as an unrelated flicker. The accent and the drop shadow are
     * the glow the selected card already uses.
     */
    #place-experience .kt-fc-rail-wrap.is-sliding-prev .kt-fc-chev-prev,
    #place-experience .kt-fc-rail-wrap.is-sliding-next .kt-fc-chev-next {
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.92);
      filter: drop-shadow(0 0 5px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5));
    }

    /* YEAR - the lightest layer. Numerals, and nothing else until one is on. */
    #place-experience .kt-fc-rail-year .kt-fc-rail { gap: 3px; }
    /*
     * THE METADATA IS A FOOTNOTE, NOT A SECOND HEADLINE.
     *
     * A year chip now carries three things and only one of them is the answer
     * to "which year". The numeral keeps its size; the zodiac drops to nine
     * pixels of tracked small-caps, and the Personal Year is the same small
     * accent numeral the day chips already use for the Personal Day - so the
     * reader meets one visual idea for "your number here" on all three rails
     * rather than learning a new one per row.
     */
    #place-experience .kt-fc-year-chip {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 62px;
      padding: 5px 8px 6px;
      border-radius: 13px;
      border: 1px solid transparent;
      background: none;
      color: rgba(244, 241, 233, 0.46);
      font: inherit;
      line-height: 1.1;
      scroll-snap-align: center;
    }
    #place-experience .kt-fc-chip-lead {
      font-size: 12.5px;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    #place-experience .kt-fc-chip-note {
      font-size: 9px;
      line-height: 1.1;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
      color: rgba(244, 241, 233, 0.34);
    }
    #place-experience .kt-fc-year-chip.is-active .kt-fc-chip-note,
    #place-experience .kt-fc-month-chip.is-active .kt-fc-chip-note {
      color: rgba(244, 241, 233, 0.62);
    }
    #place-experience .kt-fc-year-chip.is-active {
      color: rgba(244, 241, 233, 0.96);
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.07);
      box-shadow: 0 0 10px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.15);
    }

    /* MONTH - the middle layer. A chip, lit a little harder than the year. */
    #place-experience .kt-fc-rail-month .kt-fc-rail { gap: 6px; }
    #place-experience .kt-fc-month-chip {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 56px;
      padding: 6px 12px 7px;
      border-radius: 12px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.09);
      background: rgba(var(--kt-surface-wash-rgb, 255, 255, 255), 0.03);
      color: rgba(244, 241, 233, 0.66);
      font: inherit;
      line-height: 1.15;
      scroll-snap-align: center;
    }
    #place-experience .kt-fc-month-chip .kt-fc-chip-lead { text-transform: capitalize; }
    #place-experience .kt-fc-month-chip.is-active {
      color: rgba(244, 241, 233, 0.98);
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.62);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.13);
      box-shadow: 0 0 14px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.19);
    }

    /*
     * DAY - the strongest layer, and the only one with two rows.
     *
     * The chips and the constellation are one scrolling track, which is what
     * keeps every node under its own chip without a single scroll listener.
     */
    #place-experience .kt-fc-rail-day .kt-fc-rail { align-items: flex-start; }
    #place-experience .kt-fc-rail-track {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    #place-experience .kt-fc-day-chips { display: flex; gap: 8px; }
    #place-experience .kt-fc-day-chip {
      flex: 0 0 56px;
      width: 56px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      min-height: 84px;
      padding: 8px 4px;
      border-radius: 15px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.1);
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.5);
      color: inherit;
      font: inherit;
      scroll-snap-align: center;
    }
    #place-experience .kt-fc-day-chip.is-active {
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.78);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.17);
      box-shadow:
        0 0 18px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.24),
        inset 0 0 0 1px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.16);
    }
    /*
     * THE PHASE DISC.
     *
     * A dark disc with a lit shape over it, both drawn as geometry, so the
     * crescent stays a crescent at any pixel density. The dark side is not
     * black: on a glass chip over a live Earth a true black disc reads as a
     * hole punched in the card, and a trace of cool blue keeps it a moon.
     * The moon is a pictogram, so its disc and rim take the Icons role, with
     * that cool blue as the default; the lit crescent stays moonlight.
     * (Owner decision D2, 2026-09-28.)
     */
    /* THE EXACT MOMENT OF A QUARTER PHASE: a caption under the rail on the day it happens, and a soft light round the moon of that day's chip. */
    #place-experience .kt-fc-rail-moon {
      margin: 8px 0 0;
      text-align: center;
      font-size: 13px;
      letter-spacing: 0.05em;
      color: rgba(236, 242, 252, 0.92);
    }
    #place-experience .kt-fc-rail-moon-note { margin: 2px 0 0; text-align: center; }
    #place-experience .kt-fc-day-chip[data-major-phase] .kt-fc-moon { filter: drop-shadow(0 0 3px rgba(236, 242, 252, 0.6)); }
    #place-experience .kt-fc-moon { display: block; overflow: visible; }
    #place-experience .kt-fc-moon-dark {
      fill: rgba(var(--kt-icon-rgb, 150, 168, 200), 0.16);
      stroke: rgba(var(--kt-icon-rgb, 180, 198, 230), 0.2);
      stroke-width: 0.6;
    }
    #place-experience .kt-fc-moon-lit { fill: rgba(236, 242, 252, 0.82); }
    #place-experience .kt-fc-day-chip.is-active .kt-fc-moon-lit {
      fill: rgba(252, 253, 255, 0.97);
    }

    #place-experience .kt-fc-chip-weekday {
      font-size: 10px;
      line-height: 1;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-day-chip.is-active .kt-fc-chip-weekday {
      color: rgba(244, 241, 233, 0.88);
    }
    #place-experience .kt-fc-chip-date {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 19px;
      line-height: 1;
    }
    #place-experience .kt-fc-chip-cycle {
      font-size: 10.5px;
      line-height: 1;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.85);
    }
    /* Dimmer on an unselected year or month: seventeen lit numerals down the
       year rail would compete with the day rail for the eye. */
    #place-experience .kt-fc-year-chip .kt-fc-chip-cycle,
    #place-experience .kt-fc-month-chip .kt-fc-chip-cycle {
      font-size: 9.5px;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
    }
    #place-experience .kt-fc-year-chip.is-active .kt-fc-chip-cycle,
    #place-experience .kt-fc-month-chip.is-active .kt-fc-chip-cycle {
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      text-shadow: 0 0 8px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.45);
    }

    /*
     * THE CONSTELLATION.
     *
     * Small warm nodes on a thin line, the active one brighter and haloed. It
     * is drawn quietly on purpose: it exists to give the day rail a horizon to
     * sit on, and the moment it competes with the chips above it the rail stops
     * being the thing you look at. No axis, no ticks, no caption - there is no
     * quantity here to label, and a label would invent one.
     */
    #place-experience .kt-fc-constellation {
      display: block;
      flex: 0 0 auto;
      overflow: visible;
    }
    /*
     * WARM, AND NOT THE HIGHLIGHT.
     *
     * Every lit control on this screen follows --kt-accent-rgb, which the
     * themes swing from gold to blue to rose. The constellation is decoration,
     * not a control: it is meant to read as starlight behind the controls rather
     * than as another piece of chrome agreeing with them. So it takes the
     * Secondary Accent role instead, which nothing sets today; it is the same
     * pale gold on every theme.
     * (Owner decision D2, 2026-09-28.)
     */
    #place-experience .kt-fc-constellation-line {
      fill: none;
      stroke: rgba(var(--kt-secondary-accent-rgb, 226, 208, 164), 0.34);
      stroke-width: 0.9;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    /* The field is quieter than it was and the selection brighter. Legibility
       here is the GAP between the two, not the brightness of either: lifting the
       active node alone just made the whole line louder. */
    #place-experience .kt-fc-node { fill: rgba(var(--kt-secondary-accent-rgb, 226, 208, 164), 0.38); }
    #place-experience .kt-fc-node.is-active { fill: rgba(255, 251, 240, 1); }
    #place-experience .kt-fc-node-halo { fill: rgba(var(--kt-secondary-accent-rgb, 240, 222, 178), 0.18); }
    #place-experience .kt-fc-node-stem {
      stroke: rgba(var(--kt-secondary-accent-rgb, 240, 222, 178), 0.3);
      stroke-width: 1;
      stroke-linecap: round;
    }

    /* THE ACTIVE DAY - one card, five answers, in the order they are asked. */
    #place-experience .kt-fc-day-date {
      margin: 0 0 2px;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-day .kt-fc-lede { margin-top: 12px; }
    /* The three cycles: the numbers line in the day-date recipe, the name of a
       repeated number in the accent border .kt-fc-resonance already uses, and
       the composed reading at .kt-fc-lede size, sitting closer to both. */
    #place-experience .kt-fc-numerology { margin-top: 12px; }
    #place-experience .kt-fc-cycles {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }
    #place-experience .kt-fc-cycle-relation {
      display: inline-block;
      margin: 8px 0 0;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.3);
      font-size: 12px;
      line-height: 1.45;
    }
    #place-experience .kt-fc-day .kt-fc-numerology .kt-fc-lede { margin-top: 8px; }
    #place-experience .kt-fc-day-rows { margin: 16px 0 0; display: grid; gap: 12px; }
    #place-experience .kt-fc-day-rows dt {
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }
    #place-experience .kt-fc-day-rows dd { margin: 4px 0 0; font-size: 13.5px; line-height: 1.55; }

    /*
     * THE DAY PROFILE.
     *
     * Five slim rows, under the day card and above the climate: it is a summary
     * of what the card and the reading already say, so it is quieter than both.
     * The surface is .kt-fc-block, which is already on the unified glass list, so
     * it wears the same material as the card above it without restating it here.
     * Everything else is the forecast's existing vocabulary - the accent token
     * for anything lit, the tracked uppercase the kicker uses for the title.
     */
    #place-experience .kt-fc-domains { margin-top: 12px; padding: 13px 12px 11px; }
    #place-experience .kt-fc-domains-title {
      margin: 0 3px 9px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.82);
    }
    /*
     * ONE ROW PER AREA, NOT FIVE TILES ACROSS.
     *
     * Five across was the first layout and it did not survive a 390px phone: the
     * tiles came out 52px wide, and "Communication", "Relationships" and
     * "Atmosphere" are single words wider than that, so they ran out of their
     * tiles (and in Slovak, "Komunikacia" with them). Breaking them mid-word to
     * fit is worse than the overflow. Rows give every label its full width in
     * both languages, and they put the five pip meters in one column, which is
     * the comparison the block exists for.
     */
    #place-experience .kt-fc-domain-grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 5px;
    }
    #place-experience .kt-fc-domain {
      display: grid;
      /* Widths from the text as measured on the preview at 390px - with a Range,
         because scrollWidth never reports less than the box and made a 41px word
         look as if it filled a 72px column. The longest state is 41px (Obvykle),
         so 56px keeps ~15px for a wider phone font. The label is the tight one:
         "Communication" is 91px, and this leaves it a 112px column instead of the
         96px it had when the state column was oversized. */
      grid-template-columns: 20px minmax(0, 1fr) auto 56px;
      align-items: center;
      column-gap: 10px;
      min-height: 34px;
      padding: 6px 10px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.07);
      border-radius: 11px;
      background: rgba(var(--kt-surface-wash-rgb, 255, 255, 255), 0.025);
    }
    #place-experience .kt-fc-domain-icon {
      width: 20px;
      height: 20px;
      color: rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.9);
    }
    #place-experience .kt-fc-domain-icon svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #place-experience .kt-fc-domain-label {
      min-width: 0;
      font-size: 13px;
      line-height: 1.25;
      color: rgba(244, 241, 233, 0.86);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    #place-experience .kt-fc-domain-pips { display: flex; gap: 4px; }
    #place-experience .kt-fc-domain-pips i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.14);
    }
    #place-experience .kt-fc-domain-pips i.is-on {
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      box-shadow: 0 0 6px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.45);
    }
    #place-experience .kt-fc-domain-state {
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      text-align: right;
      white-space: nowrap;
      color: rgba(250, 249, 245, 0.92);
    }
    /* The two ends of the scale are the ones worth a second look, so they are the
       only ones that change the row: a quiet area steps back, a strong one gets
       the accent rim. Nothing in between competes for attention. */
    #place-experience .kt-fc-domain[data-level="1"] .kt-fc-domain-state {
      font-weight: 500;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-domain[data-level="5"] {
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.42);
    }
    #place-experience .kt-fc-domains-note {
      margin: 9px 3px 0;
      font-size: 11px;
      line-height: 1.45;
      color: rgba(244, 241, 233, 0.5);
    }

    /*
     * LIFE DYNAMICS - one compact panel, the same on the Day, the Month and the Year.
     *
     * The owner's approved reference: ONE rounded glass panel, nearly the width of the content, with five
     * dense rows separated by hairlines - a line icon, the theme's name, its emphasis word on the right, five
     * rounded gauge segments, and one muted line on what the theme is about. No card per theme, no dots.
     * It is the first thing under the date picker; the written reading comes after it.
     *
     * The gauge is the emphasis the evidence puts on a theme - never how well the theme goes - so lit segments
     * take one restrained accent (flat, no glow) and unlit ones stay a faint inset; no theme is red or green.
     * A theme with no assessment draws five empty dashed segments: a different gauge, not a shorter one.
     *
     * On the Year and Month a row is a tab for the graph under the panel (data-forecast-area); on the Day it is
     * the summary of a closed disclosure. Both are one row layout.
     */
    #place-experience .kt-fc-life { margin-top: 12px; padding: 16px 14px 12px; }
    #place-experience .kt-fc-life-head {
      margin: 0 4px 2px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.08);
    }
    #place-experience .kt-fc-life-title {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 21px;
      font-weight: 400;
      line-height: 1.2;
      color: rgba(250, 249, 245, 0.96);
    }
    #place-experience .kt-fc-life-sub {
      margin: 3px 0 0;
      font-size: 12.5px;
      line-height: 1.4;
      color: rgba(244, 241, 233, 0.62);
    }
    #place-experience .kt-fc-life-grid { list-style: none; margin: 0; padding: 0; }
    #place-experience .kt-fc-life-item + .kt-fc-life-item {
      border-top: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.07);
    }
    #place-experience .kt-fc-life-card {
      width: 100%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      row-gap: 7px;
      margin: 0;
      padding: 12px 6px 11px;
      border: 0;
      border-radius: 12px;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
      list-style: none;
      -webkit-appearance: none;
      appearance: none;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 160ms ease;
    }
    #place-experience .kt-fc-life-card::-webkit-details-marker { display: none; }
    #place-experience .kt-fc-life-card::marker { content: ''; }
    #place-experience .kt-fc-life-card:focus-visible {
      outline: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.7);
      outline-offset: 1px;
    }
    /* The theme the graph is drawing (Year, Month) or the row that is open (Day). */
    #place-experience .kt-fc-life-card.is-active,
    #place-experience .kt-fc-life-day[open] > .kt-fc-life-card {
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.075);
    }
    #place-experience .kt-fc-life-top {
      display: grid;
      grid-template-columns: 22px minmax(0, 1fr) auto;
      column-gap: 10px;
      align-items: center;
    }
    #place-experience .kt-fc-life-top.has-chevron { grid-template-columns: 22px minmax(0, 1fr) auto 12px; column-gap: 8px; }
    #place-experience .kt-fc-life-icon {
      width: 22px;
      height: 22px;
      color: rgba(var(--kt-icon-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.92);
    }
    #place-experience .kt-fc-life-icon svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #place-experience .kt-fc-life-name {
      min-width: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 1.25;
      color: rgba(250, 249, 245, 0.95);
      overflow-wrap: break-word;
    }
    #place-experience .kt-fc-life-state {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.25;
      text-align: right;
      color: rgba(250, 249, 245, 0.88);
    }
    #place-experience .kt-fc-life-state.is-not-assessed { font-weight: 500; font-style: italic; color: rgba(244, 241, 233, 0.52); }
    /* A short note on how the influences sit (Day only): under the word, never a colour. */
    #place-experience .kt-fc-life-tag {
      display: block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: rgba(244, 241, 233, 0.58);
    }
    #place-experience .kt-fc-life-chevron {
      font-size: 16px;
      line-height: 1;
      color: rgba(244, 241, 233, 0.5);
      transition: transform 160ms ease;
    }
    #place-experience .kt-fc-life-day[open] .kt-fc-life-chevron { transform: rotate(90deg); }
    /* Five rounded segments that share the row's width. */
    #place-experience .kt-fc-life-gauge {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 6px;
    }
    #place-experience .kt-fc-life-gauge i {
      display: block;
      height: 8px;
      border-radius: 5px;
      background: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.11);
    }
    #place-experience .kt-fc-life-gauge i.is-on { background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.8); }
    #place-experience .kt-fc-life-gauge.is-not-assessed i {
      background: transparent;
      border: 1px dashed rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.26);
      box-sizing: border-box;
    }
    #place-experience .kt-fc-life-helper {
      font-size: 12px;
      line-height: 1.42;
      color: rgba(244, 241, 233, 0.58);
      overflow-wrap: break-word;
    }
    #place-experience .kt-fc-life-note {
      margin: 6px 4px 0;
      padding-top: 10px;
      border-top: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.08);
      font-size: 11px;
      line-height: 1.45;
      color: rgba(244, 241, 233, 0.5);
    }
    /* For a screen reader only: what a Day row does. */
    #place-experience .kt-fc-life-sr {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    }
    /* What an open Day row says. */
    #place-experience .kt-fc-life-day { display: block; }
    #place-experience .kt-fc-life-why {
      display: grid;
      gap: 8px;
      margin: 2px 2px 10px;
      padding: 11px 14px 12px;
      border-radius: 14px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.08);
      background: rgba(var(--kt-surface-wash-rgb, 255, 255, 255), 0.03);
    }
    #place-experience .kt-fc-life-why-line {
      margin: 0;
      font-size: 13px;
      line-height: 1.55;
      color: rgba(244, 241, 233, 0.88);
      overflow-wrap: break-word;
    }
    /* The graph names the theme it is drawing, with the same compact line the panel carries. */
    #place-experience .kt-fc-trend-area.has-helper { flex-wrap: wrap; row-gap: 2px; }
    #place-experience .kt-fc-trend-area-helper {
      flex-basis: 100%;
      font-size: 11px;
      line-height: 1.4;
      text-align: center;
      color: rgba(244, 241, 233, 0.56);
    }
    /*
     * ALMOST THE WIDTH OF THE CONTENT, ON A PHONE. The Forecast keeps 18px at each side of its column and its
     * blocks another 18px inside the screen, which on a 393px phone leaves a card 321px wide. Where the screen
     * carries a Life Dynamics panel the column's own side padding is cut to 6px, so the panel (and everything
     * under it) is about 20px wider. A browser without :has() keeps the old width.
     */
    @media (max-width: 699px) {
      #place-experience .kt-forecast:has(.kt-fc-life) { padding-left: 6px; padding-right: 6px; }
    }
    /* On a wide screen the panel and the reading are one centred column, not bars the width of the window.
       The pickers above stay as wide as they are. */
    @media (min-width: 700px) {
      #place-experience .kt-forecast:has(.kt-fc-life) > .kt-fc-block,
      #place-experience .kt-forecast:has(.kt-fc-life) > .kt-fc-method {
        width: 100%;
        max-width: 46rem;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
      }
    }

    /*
     * YEAR / MONTH / DAY.
     *
     * The switch is the tab capsule this screen already uses (.kt-fc-tab carries
     * the border, fill and active state), in its own row above the rails. The
     * period card and the trend are .kt-fc-block, so they wear the forecast glass
     * without restating it; every lit thing is the theme accent token.
     */
    #place-experience .kt-fc-levels { display: flex; gap: 6px; margin: 2px 0 12px; }
    #place-experience .kt-fc-level { letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px; }

    #place-experience .kt-fc-period .kt-fc-period-lede { margin-top: 12px; }

    #place-experience .kt-fc-trend { margin-top: 12px; padding: 12px 12px 10px; }
    #place-experience .kt-fc-trend-head {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) 38px;
      column-gap: 4px;
      align-items: center;
    }
    #place-experience .kt-fc-trend-step {
      width: 38px;
      height: 38px;
      padding: 0;
      border-radius: 50%;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.12);
      background: transparent;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.92);
      font: inherit;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
    }
    #place-experience .kt-fc-trend-area {
      margin: 0;
      min-width: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: clamp(5px, 1.8vw, 9px);
    }
    #place-experience .kt-fc-trend-area-icon { flex: 0 0 auto; }
    /*
     * THE AREA'S NAME IS THE TITLE OF THE CARD, SO IT IS ALWAYS WHOLE.
     *
     * It used to be cut with an ellipsis, and on a phone with a larger system
     * font "Communication" came out as "Communicati...". The size now follows
     * the width instead - 18px on a roomy screen, down to 15px at 320px, where
     * the longest name still fits - and a word that cannot fit even then wraps
     * rather than losing its end.
     */
    #place-experience .kt-fc-trend-area-name {
      min-width: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(15px, 4.6vw, 18px);
      line-height: 1.2;
      text-align: center;
      overflow-wrap: break-word;
      color: rgba(250, 249, 245, 0.94);
    }
    #place-experience .kt-fc-trend-picks { display: flex; justify-content: center; gap: 0; margin: 2px 0 0; }
    /*
     * A SMALL DOT, A FINGER-SIZED TARGET.
     *
     * The dot stays six pixels; the button around it is 44 wide, and its
     * ::after reaches ten pixels above and below, so each area is a 44 x 44
     * target without the row taking a pixel more height than it did.
     */
    #place-experience .kt-fc-trend-pick {
      position: relative;
      width: 44px;
      height: 24px;
      padding: 0;
      border: 0;
      background: transparent;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    #place-experience .kt-fc-trend-pick::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: -10px;
      bottom: -10px;
    }
    #place-experience .kt-fc-trend-step { position: relative; }
    #place-experience .kt-fc-trend-step::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
    }
    #place-experience .kt-fc-trend-pick::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.2);
    }
    #place-experience .kt-fc-trend-pick.is-active::before {
      width: 16px;
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      box-shadow: 0 0 6px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.5);
    }
    /* pan-y: the page still scrolls vertically under a finger, and a sideways
       drag comes to the swipe handler instead of the browser. */
    #place-experience .kt-fc-trend-figure {
      margin: 6px 0 0;
      border-radius: 12px;
      touch-action: pan-y;
      cursor: pointer;
    }
    #place-experience .kt-fc-trend-figure:focus-visible {
      outline: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.6);
      outline-offset: 3px;
    }
    #place-experience .kt-fc-trend-svg { display: block; width: 100%; height: auto; overflow: visible; }
    #place-experience .kt-fc-trend-guide { stroke: rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.07); stroke-width: 1; }
    #place-experience .kt-fc-trend-y {
      fill: rgba(244, 241, 233, 0.42);
      font-size: 8px;
      letter-spacing: 0.04em;
    }
    #place-experience .kt-fc-trend-cursor {
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.38);
      stroke-width: 1;
      stroke-dasharray: 2 3;
    }
    #place-experience .kt-fc-trend-stop-top { stop-color: rgb(var(--kt-accent-rgb, 216, 195, 142)); stop-opacity: 0.28; }
    #place-experience .kt-fc-trend-stop-bottom { stop-color: rgb(var(--kt-accent-rgb, 216, 195, 142)); stop-opacity: 0; }
    #place-experience .kt-fc-trend-line {
      fill: none;
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.55));
    }
    #place-experience .kt-fc-trend-dot { fill: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.75); }
    #place-experience .kt-fc-trend-dot.is-selected {
      fill: rgba(250, 249, 245, 0.98);
      stroke: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
      stroke-width: 2;
      filter: drop-shadow(0 0 5px rgba(var(--kt-accent-rgb, 216, 195, 142), 0.7));
    }
    #place-experience .kt-fc-trend-x { fill: rgba(244, 241, 233, 0.45); font-size: 9px; }
    #place-experience .kt-fc-trend-x.is-selected { fill: rgba(250, 249, 245, 0.96); font-weight: 700; }
    #place-experience .kt-fc-trend-caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;
    }
    #place-experience .kt-fc-trend-caption p {
      margin: 0;
      min-width: 0;
      font-size: 13px;
      color: rgba(244, 241, 233, 0.88);
    }
    #place-experience .kt-fc-trend-caption span { color: rgba(244, 241, 233, 0.62); }
    #place-experience .kt-fc-trend-open {
      flex: 0 0 auto;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 999px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.55);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.12);
      color: rgba(250, 249, 245, 0.96);
      font: inherit;
      font-size: 12px;
      white-space: nowrap;
      cursor: pointer;
    }
    #place-experience .kt-fc-trend-hint {
      margin: 8px 2px 0;
      font-size: 11px;
      line-height: 1.4;
      color: rgba(244, 241, 233, 0.45);
    }
    #place-experience .kt-fc-day-context {
      padding-top: 8px;
      font-size: 12.5px;
      color: rgba(244, 241, 233, 0.68);
    }
    #place-experience .kt-fc-day-context-label {
      display: block;
      margin-bottom: 2px;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.42);
    }
    #place-experience .kt-fc-day .kt-fc-cycle-ref { margin-top: 16px; }
    #place-experience .kt-fc-lunar-fold .kt-fc-lunar { margin-top: 10px; }

    /*
     * THE BACKGROUND CLIMATE.
     *
     * Slower than a day and said once, rather than reprinted under every day on
     * the rail. Lighter than a content block on purpose: it is the ground the
     * day stands on, not another thing to read at the same volume.
     */
    #place-experience .kt-fc-climate {
      border-radius: 18px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.1);
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.36);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
      padding: 14px 15px 15px;
    }
    #place-experience .kt-fc-climate .kt-fc-subhead { margin: 0; }
    #place-experience .kt-fc-climate-lede { margin: 9px 0 0; font-size: 13.5px; line-height: 1.55; }
    #place-experience .kt-fc-climate-kicker {
      margin: 14px 0 0;
      font-size: 10.5px;
      font-weight: 400;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-climate-full { margin-top: 8px; }

    /*
     * THE DAY AS A BRIEFING (Forecast v2).
     *
     * A single card on the shared glass, read top to bottom in the order a morning
     * needs it. Sections that have nothing to say are not drawn at all, so the
     * card is as long as the day has things to tell and no longer. Everything is the
     * forecast's existing vocabulary: the tracked uppercase kicker for a heading,
     * the accent token for the one practical move, quiet body text for the rest.
     */
    #place-experience .kt-fc-dayplan { margin-top: 12px; padding: 15px 15px 12px; }
    #place-experience .kt-fc-advice { padding: 18px 16px 14px; }
    #place-experience .kt-fc-dp-kicker {
      margin: 0 0 6px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.82);
    }
    /* The day's character: the one large line on the card. Serif, as the forecast's other block titles are. */
    #place-experience .kt-fc-dp-headline {
      margin: 0 0 8px;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: 22px;
      line-height: 1.22;
      letter-spacing: 0.005em;
      color: rgba(250, 249, 245, 0.98);
      overflow-wrap: anywhere;
    }
    /* A comfortable measure on a wide screen: the card is as wide as the page, its sentences are not. */
    #place-experience .kt-fc-advice .kt-fc-dp-glance,
    #place-experience .kt-fc-advice .kt-fc-dp-list,
    #place-experience .kt-fc-advice .kt-fc-dp-line,
    #place-experience .kt-fc-advice .kt-fc-dp-move { max-width: 64ch; }
    #place-experience .kt-fc-advice .kt-fc-dp-para { max-width: 64ch; }
    /* The advice and the period block read at a book's width, centred, on a wide screen; on a phone they are the page's width. */
    #place-experience .kt-fc-advice,
    #place-experience .kt-fc-larger-period { max-width: 46rem; margin-left: auto; margin-right: auto; }
    #place-experience .kt-fc-dp-glance { margin: 0; font-size: 15px; line-height: 1.55; color: rgba(250, 249, 245, 0.92); }
    /* The reading: what the day's evidence means. Each paragraph names its source in one small line above it. */
    #place-experience .kt-fc-dp-reading { margin-top: 14px; display: grid; gap: 12px; }
    #place-experience .kt-fc-dp-para { margin: 0; font-size: 14px; line-height: 1.62; color: rgba(244, 241, 233, 0.9); text-shadow: 0 1px 8px rgba(2, 4, 12, 0.6); }
    #place-experience .kt-fc-dp-lead-in {
      display: block;
      margin-bottom: 2px;
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.96);
      /* The card sits over the bright limb of the Earth on a phone: a soft shadow keeps the small label readable there. */
      text-shadow: 0 1px 6px rgba(2, 4, 12, 0.75);
    }
    #place-experience .kt-fc-dp-note { margin: 12px 0 0; font-size: 12px; line-height: 1.45; color: rgba(244, 241, 233, 0.56); }
    #place-experience .kt-fc-larger-period > .kt-fc-dp-note { margin: 8px 0 6px; }
    /* P1.6.5: what stays true for the month or the year, and the birth-time limit, one touch away. Native disclosures: keyboard, screen-reader and touch behaviour come with them. */
    #place-experience .kt-fc-dp-context,
    #place-experience .kt-fc-dp-birth { margin: 10px 0 0; max-width: 64ch; font-size: 12.5px; color: rgba(244, 241, 233, 0.78); }
    #place-experience .kt-fc-dp-context > summary,
    #place-experience .kt-fc-dp-birth > summary { cursor: pointer; min-height: 44px; box-sizing: border-box; padding: 12px 0; line-height: 1.35; overflow-wrap: anywhere; }
    #place-experience .kt-fc-dp-context > summary:focus-visible,
    #place-experience .kt-fc-dp-birth > summary:focus-visible { outline: 2px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9); outline-offset: 2px; border-radius: 4px; }
    #place-experience .kt-fc-dp-context-body { display: grid; gap: 10px; padding: 2px 0 6px; }
    #place-experience .kt-fc-dp-context-body .kt-fc-dp-para,
    #place-experience .kt-fc-dp-birth .kt-fc-dp-note { margin: 0 0 6px; font-size: 13px; line-height: 1.55; color: rgba(244, 241, 233, 0.82); }
    #place-experience .kt-fc-dp-birth .kt-fc-dp-note:last-child { margin-bottom: 4px; }
    #place-experience .kt-fc-dp-section { margin-top: 16px; }
    #place-experience .kt-fc-dp-heading {
      margin: 0 0 6px;
      font-size: 10.5px;
      font-weight: 400;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-dp-sub { margin: 8px 0 3px; font-size: 12px; color: rgba(244, 241, 233, 0.58); }
    #place-experience .kt-fc-dp-sub:first-child { margin-top: 0; }
    #place-experience .kt-fc-dp-list,
    #place-experience .kt-fc-dp-basis-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
    #place-experience .kt-fc-dp-list li {
      position: relative;
      padding-left: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.86);
    }
    #place-experience .kt-fc-dp-list li::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 0.62em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.8);
    }
    #place-experience .kt-fc-dp-line { margin: 0; font-size: 13.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.86); }
    #place-experience .kt-fc-dp-chips { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
    #place-experience .kt-fc-dp-goodnote { margin-top: 8px; }
    #place-experience .kt-fc-dp-chips li {
      padding: 4px 11px;
      border-radius: 999px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.3);
      font-size: 12.5px;
      line-height: 1.4;
      color: rgba(244, 241, 233, 0.9);
    }
    /* The one move is the one thing on the card set apart: a quiet accent-edged panel, not another bullet. */
    #place-experience .kt-fc-dp-movecard {
      padding: 12px 13px;
      border-radius: 14px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.34);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.07);
    }
    #place-experience .kt-fc-dp-movecard .kt-fc-dp-heading { color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.78); }
    #place-experience .kt-fc-dp-move {
      margin: 0;
      font-size: 15px;
      line-height: 1.5;
      color: rgba(250, 249, 245, 0.97);
    }
    #place-experience .kt-fc-dp-basis { margin-top: 14px; }
    #place-experience .kt-fc-dp-basis-list li { font-size: 12px; line-height: 1.45; color: rgba(244, 241, 233, 0.62); }
    #place-experience .kt-fc-larger-period { margin-top: 12px; }

    /*
     * INFLUENCES, BY TIME SCALE.
     *
     * The scale is a small caps label over its group - long-term background,
     * this year, current longer transits, this month - and each influence is its
     * name, then one plain sentence. No chips, no bands: the hierarchy is the
     * order and the labels.
     */
    #place-experience .kt-fc-influences { display: grid; gap: 12px; margin-top: 10px; }
    #place-experience .kt-fc-influence-scale {
      margin: 0 0 6px;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.78);
    }
    #place-experience .kt-fc-influence-group ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    /* Two classes deep, so the folded sections' generic paragraph margin
       (.kt-fc-method p) cannot pull a name and its sentence apart. */
    #place-experience .kt-fc-influences .kt-fc-influence p { margin: 0; }
    #place-experience .kt-fc-influence-name { font-size: 13px; color: rgba(250, 249, 245, 0.94); }
    #place-experience .kt-fc-influence-when { color: rgba(244, 241, 233, 0.5); font-size: 12px; }
    #place-experience .kt-fc-influences .kt-fc-influence-meaning {
      margin-top: 2px;
      font-size: 12.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.74);
    }
    #place-experience .kt-fc-narrative .kt-fc-subhead:first-child { margin-top: 0; }
    #place-experience .kt-fc-narrative .kt-fc-influences { margin-top: 4px; }
    #place-experience .kt-fc-period-refs { padding-top: 4px; padding-bottom: 6px; }
    #place-experience .kt-fc-period-refs .kt-fc-method { margin-top: 0; }
    #place-experience .kt-fc-year-markers .kt-fc-markers { margin-top: 6px; }

    #place-experience .kt-fc-cal-key,
    #place-experience .kt-fc-disclaimer {
      margin: 8px 0 0;
      font-size: 11.5px;
      line-height: 1.5;
      color: rgba(244, 241, 233, 0.55);
    }

    /* THE LEVEL SWITCH'S CAPSULE */
    #place-experience .kt-fc-tab {
      flex: 1 1 0;
      min-height: 42px;
      border-radius: 12px;
      border: 1px solid rgba(var(--kt-surface-border-rgb, 255, 255, 255), 0.12);
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.5);
      color: inherit;
      font: inherit;
      font-size: 12.5px;
    }
    #place-experience .kt-fc-tab.is-active {
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.55);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.14);
    }

    /* BLOCKS */
    #place-experience .kt-fc-block {
      border-radius: 18px;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.1));
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.42);
      backdrop-filter: blur(18px) saturate(1.08);
      -webkit-backdrop-filter: blur(18px) saturate(1.08);
      padding: 16px 15px;
    }
    #place-experience .kt-fc-block-head { display: flex; gap: 14px; align-items: center; }
    #place-experience .kt-fc-block-head h3 {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      font-size: 19px;
    }
    #place-experience .kt-fc-badge {
      flex: 0 0 auto;
      width: 58px;
      height: 58px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      gap: 0;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.4);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.1);
      text-align: center;
    }
    #place-experience .kt-fc-badge-value {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 26px;
      line-height: 1;
    }
    #place-experience .kt-fc-badge-caption { display: none; }
    #place-experience .kt-fc-trace {
      margin: 4px 0 0;
      font-size: 11.5px;
      color: rgba(244, 241, 233, 0.5);
      font-variant-numeric: tabular-nums;
    }
    #place-experience .kt-fc-lede { margin: 14px 0 0; font-size: 14.5px; line-height: 1.55; }
    #place-experience .kt-fc-resonance {
      margin: 12px 0 0;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(var(--kt-accent-rgb, 216, 195, 142), 0.3);
      font-size: 13px;
      line-height: 1.5;
    }
    #place-experience .kt-fc-subhead {
      margin: 18px 0 8px;
      font-size: 12px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.8);
    }

    /*
     * THE INTEGRATED READING.
     *
     * Every declaration below is copied from a class this screen already ships:
     * the card is .kt-fc-block verbatim, the heading is .kt-fc-subhead, the body
     * is .kt-fc-lede's size and leading, the standfirst is the accent treatment
     * .kt-fc-resonance already uses. Nothing here is a new visual recipe - the
     * reading is meant to look like the forecast it sits inside, not like a
     * component that arrived from somewhere else.
     *
     * NO BACKTICKS IN THIS COMMENT. The whole stylesheet is one JS template
     * literal, so a backtick around a class name closes it and the file stops
     * compiling twenty lines further down.
     */
    /* It used to be a panel of its own at the top of the screen. It is now
       inside the climate's disclosure, which already is one - a second border
       and a second blur around the same text would read as a card in a card. */
    #place-experience .kt-fc-temporal { margin: 6px 0 0; }
    #place-experience .kt-fc-tr-section + .kt-fc-tr-section { margin-top: 4px; }
    /* The opening carries no heading label above it: it is the lede, and a
       kicker over the first sentence would push the finding down the page. */
    #place-experience .kt-fc-tr-section.is-lede .kt-fc-subhead { margin-top: 0; }
    #place-experience .kt-fc-tr-section.is-lede .kt-fc-tr-body {
      font-size: 15.5px;
      line-height: 1.6;
    }
    #place-experience .kt-fc-tr-body {
      margin: 8px 0 0;
      font-size: 14.5px;
      line-height: 1.55;
      color: rgba(244, 241, 233, 0.88);
    }
    #place-experience .kt-fc-tr-standfirst {
      margin: 6px 0 0;
      font-size: 12.5px;
      line-height: 1.5;
      color: rgba(var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142)), 0.72);
    }
    #place-experience .kt-fc-tr-evidence { margin-top: 18px; }
    #place-experience .kt-fc-tr-evidence dl { margin: 0; }

    /* FACETS */
    #place-experience .kt-fc-facets { margin: 16px 0 0; display: grid; gap: 12px; }
    #place-experience .kt-fc-facet dt {
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(244, 241, 233, 0.5);
    }
    #place-experience .kt-fc-facet dd { margin: 3px 0 0; font-size: 13.5px; line-height: 1.55; }

    /* MARKERS */
    #place-experience .kt-fc-markers { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    #place-experience .kt-fc-markers button {
      width: 100%;
      display: grid;
      grid-template-columns: auto auto 1fr;
      gap: 10px;
      align-items: baseline;
      text-align: left;
      padding: 11px 12px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.03);
      color: inherit;
      font: inherit;
      font-size: 12.5px;
      line-height: 1.45;
    }
    #place-experience .kt-fc-marker-num {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 16px;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.95);
    }

    /* CALENDAR */
    #place-experience .kt-fc-calendar { margin: 16px 0 0; }
    #place-experience .kt-fc-cal-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    #place-experience .kt-fc-cal-head {
      text-align: center;
      font-size: 10px;
      letter-spacing: 0.1em;
      color: rgba(244, 241, 233, 0.42);
      padding-bottom: 2px;
    }
    #place-experience .kt-fc-cal-blank { aspect-ratio: 1; }
    #place-experience .kt-fc-cal-cell {
      aspect-ratio: 1;
      min-height: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
      color: inherit;
      font: inherit;
      padding: 0;
    }
    #place-experience .kt-fc-cal-cell.is-selected {
      border-color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.75);
      background: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.16);
    }
    #place-experience .kt-fc-cal-date { font-size: 12.5px; line-height: 1; }
    #place-experience .kt-fc-cal-cycle {
      font-size: 9.5px;
      line-height: 1;
      color: rgba(var(--kt-accent-rgb, 216, 195, 142), 0.9);
    }

    /* LUNAR - visually distinct, because it is a different system. */
    #place-experience .kt-fc-lunar {
      margin-top: 4px;
      border-style: dashed;
      border-color: rgba(150, 170, 255, 0.3);
      background: rgba(12, 14, 24, 0.42);
    }
    #place-experience .kt-fc-lunar .kt-fc-kicker { color: rgba(170, 185, 255, 0.9); }
    #place-experience .kt-fc-lunar-list { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 10px; }
    #place-experience .kt-fc-lunar-row {
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(150, 170, 255, 0.16);
      background: rgba(255, 255, 255, 0.025);
    }
    #place-experience .kt-fc-lunar-row.is-favoured { border-color: rgba(150, 170, 255, 0.38); }
    #place-experience .kt-fc-lunar-activity { font-size: 13px; }
    #place-experience .kt-fc-lunar-advice { margin-top: 3px; font-size: 12.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.78); }
    #place-experience .kt-fc-lunar-source { margin-top: 5px; font-size: 10.5px; color: rgba(170, 185, 255, 0.7); }

    #place-experience .kt-fc-method { margin-top: 4px; font-size: 12.5px; color: rgba(244, 241, 233, 0.6); }
    #place-experience .kt-fc-method summary { cursor: pointer; padding: 10px 0; }
    #place-experience .kt-fc-method p { margin: 6px 0 0; line-height: 1.55; }
    #place-experience .kt-fc-empty { margin: 0; font-size: 13px; color: rgba(244, 241, 233, 0.55); }
  `;
    style.textContent += FORECAST_GRAPH_CSS;
    document.head.append(style);
}
