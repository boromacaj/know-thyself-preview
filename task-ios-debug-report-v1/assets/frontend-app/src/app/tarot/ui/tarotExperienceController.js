import { buildTarotCardTitles, TAROT_TITLE_LEXICON_EN, TAROT_TITLE_LEXICON_SK } from '../content/tarotCardTitles.js?v=b5ef5ed';
import { activeLocale, LOCALE_CHANGED_EVENT } from '../../i18n/locale.js?v=b5ef5ed';
import { chooseTarotPosition, decideTarotJumper, getTodayTarotSession, } from '../tarotDailySession.js?v=b5ef5ed';
import { resolveTarotJumper, selectTarotPosition, startTarotSession, tarotSessionPhase, } from '../tarotDrawSession.js?v=b5ef5ed';
import { appHaptics } from '../../haptics/hapticsService.js?v=b5ef5ed';
import { DEFAULT_TAROT_JUMPER_POLICY, TAROT_JUMPER_NEVER } from '../tarotJumperPolicy.js?v=b5ef5ed';
import { guidedBundle, loadGuided } from '../guided/guidedRuntime.js?v=b5ef5ed';
import { DEFAULT_TAROT_ORIENTATION_POLICY } from '../tarotOrientationPolicy.js?v=b5ef5ed';
import { commitTarotDeck } from '../tarotShuffle.js?v=b5ef5ed';
import { createBrowserMotionPort } from '../motion/motionPort.js?v=b5ef5ed';
import { HERO_COMPLETE_MS, HERO_REVEAL_MS, HERO_SPREAD_MS, HERO_GATHER_STAGGER_MS, HERO_SPREAD_STAGGER_MS } from './tarotHero.js?v=b5ef5ed';
import { heroScreenOf, heroStageOf } from './tarotHeroStage.js?v=b5ef5ed';
import { applyDealerMotion } from './tarotDealerSpread.js?v=b5ef5ed';
import { systemTarotClock } from '../tarotClock.js?v=b5ef5ed';
import { readingForSession } from './tarotSessionReading.js?v=b5ef5ed';
import { attachCardPicker } from './tarotCardPicker.js?v=b5ef5ed';
import { createTarotHaptics } from './tarotHaptics.js?v=b5ef5ed';
import { loadReaderDescriptions, readerDescriptionsLoaded } from '../content/reader/readerDescriptionLoader.js?v=b5ef5ed';
import { renderTarotDetail, renderTarotExperience, tarotExperienceStrings, } from './tarotExperienceScreen.js?v=b5ef5ed';
/**
 * THE TAROT SCREEN'S CONTROLLER. THE ENGINE REMAINS THE ONLY SOURCE OF TRUTH.
 *
 * Two kinds of draw, and the difference is the point:
 *
 *   daily      today's deck, committed once, kept on the device and restored on
 *              reload (tarotDailySession.ts). It is not a thing to be re-rolled:
 *              rejecting a card or reloading the page never produces another deck.
 *   practice   a fresh deck for "Draw again". It is committed by the same shuffle
 *              (the same secure source, the same policies) and played with the same
 *              pure moves, but it lives in memory only and writes nothing. It never
 *              touches the day's record, so it cannot be used to shop for a
 *              better day; reloading brings the day's draw back.
 *
 * The controller holds a session and a kind, and re-renders. A phase, a counter or a
 * list of taken positions would be a second copy of what the session already says.
 */
/** How long a chosen card rises out of the deck before it is chosen. */
const PICK_LIFT_MS = 170;
/** About a second and a fifth of mixing - two quick riffles: long enough to read as a shuffle, short enough not to be waited out. */
export const SHUFFLE_PRESENTATION_MS = 1200;
/** For people who asked for less movement: no motion, a brief still moment so that the change of screen is still explained. */
export const SHUFFLE_REDUCED_MOTION_MS = 700;
/** The hero's shuffle: two quick riffles of the pile (tarotHero.ts: the last card of sixteen finishes 1.27 s after the shake) - brisk, and the picking comes straight out of it. */
export const HERO_SHUFFLE_MS = 1350;
export const HERO_SHUFFLE_REDUCED_MS = 600;
/**
 * A card taken from the deck is SHOWN before it is placed (tarotHero.ts, HERO_REVEAL_MS): it comes forward to the middle of the screen, is turned over, is held
 * a moment and goes to its place in the row. It arrives in front at the 26 % mark (the pulse that says so), lands at the end (the pulse that says that), and
 * until then nothing else is taken. The third card keeps the deck on the screen until it has landed; then the deck goes.
 */
export const HERO_REVEAL_ARRIVES_MS = Math.round(HERO_REVEAL_MS * 0.26);
export const HERO_LANDING_MS = HERO_REVEAL_MS;
/** The reveal is over by now: the markup lets go of it, so a later display does not play it again. */
export const HERO_FLIGHT_MS = HERO_REVEAL_MS + 200;
/** With motion reduced nothing is shown moving: the card simply appears in its place and the pulses follow at once. */
export const HERO_REVEAL_REDUCED_MS = 150;
/**
 * THE DEALER'S SPREAD follows the shuffle: the pile opens into the strip in HERO_SPREAD_MS (and a beat to be sure the last card is in), nothing can be taken meanwhile, and
 * a soft pulse says it has settled. Where there is no shuffle to show (a screen outside a browser) or motion is reduced, there is no spread either: the strip is simply there.
 * After the third card has landed the deck gathers and goes and the reading rises (HERO_COMPLETE_MS); then it is the reading alone.
 */
export const HERO_SPREAD_WAIT_MS = HERO_SPREAD_MS + 30;
/* The language is the application's: it is read at render time, never chosen or kept here. */
const titlesFor = () => buildTarotCardTitles(activeLocale() === 'sk' ? TAROT_TITLE_LEXICON_SK : TAROT_TITLE_LEXICON_EN);
export class TarotExperienceController {
    view = 'intro';
    kind = 'daily';
    /* GUIDED TAROT sits beside Daily Tarot and never inside it. `mode` says which one the screen is in; `guided` is the pure flow (guided/guidedFlow.ts: two ids and a stage);
       `resume` is what the areas screen offers of an earlier guided reading. A guided draw has a session of its own, held in `session` while it is on screen; the day's
       session (`daily`) is not touched by anything guided and is what the screen goes back to. */
    mode = 'daily';
    guided = { stage: 'area', areaId: null, intentionId: null };
    resume = null;
    guidedLoading = null;
    guidedReadingMemo = null;
    session = null;
    daily = null;
    diagnostic = null;
    freshPosition = null;
    options;
    /* Shake-to-shuffle. Off until a person taps to turn it on, per visit: nothing is asked of the browser on load. */
    shake = 'off';
    shakeNotice = false;
    /** False while another destination is on screen. */
    active = true;
    stopMotion = null;
    destroyed = false;
    /* The shuffle in progress: what will be done when it is over, and its timer. A presentation only - the action is the one
       the button has always run, called when the time is up. */
    pending = null;
    /* The card whose detail is open: where it is (`spread:0`, `jumper`). The card itself is looked up in the session. */
    detailKey = null;
    motion;
    /* The hero flow: three slots on the Earth's limb, filled by the cards the person takes. */
    heroFlow;
    cues;
    /* True for exactly one render: the one that follows a card being taken, so it flies from the strip once and not on every redraw. */
    freshPending = false;
    /* A card is being shown and flown to its place: nothing else is taken until it has landed, and after the THIRD card the deck stays until then. */
    revealing = false;
    /* The deck is opening into the strip (stage spreading). */
    spreading = false;
    /* A card jumped out of the deck first: the deck opens when that has been answered, not before. */
    spreadAfterJumper = false;
    /* The third card has landed: the deck is gathering and going, the reading is rising (stage complete) - until the ritual is over (stage reading). */
    leaving = false;
    /* The landing pulses and the end of each flight, to be cancelled with a new shuffle or the screen. */
    timers = [];
    /* A tick for each card passed in the spread and a firmer one when a card is chosen. Never read by the draw. */
    haptics;
    /* The card picker: the strip's scroll wiring, and the place it last had in the middle (kept across a redraw, so choosing a
       card does not throw the person back to the start of the deck). Presentation only - neither holds a card. */
    picker = null;
    pickFocus = null;
    /* The short moment in which the chosen card rises out of the deck before the draw goes on. Nothing else is read meanwhile. */
    lifting = null;
    constructor(options) {
        this.options = options;
        this.haptics = options.haptics ?? createTarotHaptics();
        this.heroFlow = options.hero === true;
        this.cues = options.cues ?? appHaptics();
        /* In the hero flow the shuffle's own cue is the acknowledgement of a shake, so the port does not add a pulse of its own. */
        this.motion = options.motion !== undefined
            ? options.motion
            : (options.listen !== false && typeof window !== 'undefined'
                ? (this.heroFlow ? createBrowserMotionPort(undefined, {}, { acknowledge: null }) : createBrowserMotionPort())
                : null);
    }
    /** Has today's deck been played from already (a card taken, or the jumper decided)? */
    dailyBegun() {
        return this.daily !== null
            && (this.daily.selections.length > 0 || this.daily.jumper.kind === 'accepted' || this.daily.jumper.kind === 'rejected');
    }
    /**
     * Restore or commit today's deck, and draw. A draw in progress skips the introduction - EXCEPT in the hero flow: the hero always opens on its clean first
     * screen (the Earth, the deck, one line) and never on the cards of an earlier draw. Today's record is still kept on the device, untouched; it is
     * simply not what the screen opens on (see `perform`).
     */
    start() {
        const state = getTodayTarotSession(this.options);
        this.daily = state.session ?? null;
        this.session = this.daily;
        this.diagnostic = state.diagnostic?.detail ?? null;
        this.view = this.dailyBegun() && !this.heroFlow ? 'draw' : 'intro';
        if (this.heroFlow)
            this.autoArmShake();
        this.render();
        if (this.options.listen !== false)
            this.attach();
    }
    destroy() {
        this.destroyed = true;
        this.cancelShuffle();
        this.cancelCues();
        this.picker?.destroy();
        this.picker = null;
        this.cancelLift();
        const overlay = this.options.overlayMount;
        if (overlay) {
            overlay.removeEventListener('click', this.handleClick);
            overlay.removeEventListener('keydown', this.handleKeydown);
            overlay.innerHTML = '';
        }
        this.releaseMotion();
        if (typeof document !== 'undefined')
            document.removeEventListener('visibilitychange', this.handleVisibility);
        this.options.mount.removeEventListener('click', this.handleClick);
        this.options.mount.removeEventListener('keydown', this.handleKeydown);
        if (typeof document !== 'undefined')
            document.removeEventListener(LOCALE_CHANGED_EVENT, this.handleLocale);
    }
    attach() {
        this.options.mount.addEventListener('click', this.handleClick);
        this.options.mount.addEventListener('keydown', this.handleKeydown);
        this.options.overlayMount?.addEventListener('click', this.handleClick);
        this.options.overlayMount?.addEventListener('keydown', this.handleKeydown);
        /* The application announces a language change on the document; the draw in progress is kept as it is. */
        if (typeof document !== 'undefined')
            document.addEventListener(LOCALE_CHANGED_EVENT, this.handleLocale);
        if (typeof document !== 'undefined')
            document.addEventListener('visibilitychange', this.handleVisibility);
    }
    handleLocale = () => this.refresh();
    /* A locked screen or another tab is not a screen waiting for a shake. */
    handleVisibility = () => this.syncMotion();
    /** The host tells the screen whether it is the destination on show. Leaving Tarot releases the sensor. */
    setActive(active) {
        const arrived = active && !this.active;
        this.active = active;
        /* COMING BACK TO TAROT IS STARTING OVER. The hero does not remember the draw that was on screen when the person left: it opens on the clean
           first screen again, with no card in any place. */
        if (arrived && this.heroFlow) {
            this.startOver();
            return;
        }
        /* A dialog does not follow a person to another destination. */
        if (!active && this.detailKey !== null) {
            this.detailKey = null;
            this.render();
            return;
        }
        this.syncMotion();
    }
    /** The hero's clean first screen: nothing shuffled, nothing taken, nothing open, nothing flying. Today's record on the device is not touched. */
    startOver() {
        this.cancelShuffle();
        this.cancelCues();
        this.cancelLift();
        this.detailKey = null;
        this.freshPosition = null;
        this.freshPending = false;
        this.pickFocus = null;
        this.diagnostic = null;
        this.session = this.daily;
        this.kind = 'daily';
        this.mode = 'daily';
        this.guided = { stage: 'area', areaId: null, intentionId: null };
        this.view = 'intro';
        this.shakeNotice = false;
        this.render();
        this.scrollToTop();
    }
    /**
     * SHAKE-TO-SHUFFLE: A TRIGGER FOR THE SHUFFLE THAT ALREADY EXISTS, AND NOTHING MORE.
     *
     * A shake does exactly what the tap does at the same moment - the introduction's "Shuffle and begin" (today's deck was
     * committed when Tarot opened, before anybody touched it, and this only turns to it) or the reading's "Draw again"
     * (a fresh deck from the same secure source, in memory). It is armed only on those two screens, never in the middle of
     * choosing cards. The callback is handed nothing: what the phone felt cannot choose a card, an orientation or a jumper.
     */
    shakeOffered() {
        if (!this.motion || this.motion.support() === 'unsupported')
            return false;
        return this.listeningScreen();
    }
    /** The two screens that are waiting for a shuffle. */
    listeningScreen() {
        if (this.pending !== null || this.detailKey !== null)
            return false;
        /* Guided Tarot listens only on its own shuffle: never while an area is being chosen, and never on a finished reading, where a shake must not start another one. */
        if (this.mode === 'guided')
            return this.guided.stage === 'shuffle';
        if (this.view === 'intro')
            return true;
        return this.session !== null && tarotSessionPhase(this.session) === 'complete';
    }
    releaseMotion() {
        this.stopMotion?.();
        this.stopMotion = null;
    }
    /**
     * SHAKE WITHOUT A BUTTON. Where the browser needs no permission (Android's Chrome, and anything that is not iOS) the screen listens from
     * the moment it opens: nothing is asked and nothing is tapped. Where it does (iOS Safari asks, once, from a tap) the application's own
     * tap that opened Tarot is the gesture - see armFromGesture - and until it has been answered the screen asks for a tap on the deck instead.
     */
    autoArmShake() {
        if (!this.motion || this.shake !== 'off')
            return;
        if (this.motion.support() === 'available')
            this.shake = 'on';
    }
    /**
     * Called by the host from inside the tap that opened Tarot (the only moment iOS will take the question). It asks only where a question
     * exists, only once an answer has not already been given, and never blocks anything: a person who refuses is simply asked to tap the deck.
     */
    armFromGesture() {
        /* Another try is made from any later tap if the last one ended in "unavailable" (a refusal that was only an unanswered question, a sensor that was slow to start): a person is never left on the
           tap-only screen for the rest of the visit because of one miss. */
        if (!this.heroFlow || !this.motion || this.shake === 'on')
            return;
        const support = this.motion.support();
        if (support === 'available') {
            this.shake = 'on';
            this.render();
            return;
        }
        if (support !== 'needs-permission')
            return;
        void this.motion.request().then((permission) => {
            if (this.destroyed)
                return;
            this.shake = permission === 'granted' ? 'on' : 'unavailable';
            this.render();
        });
    }
    /** How the opening line asks for the shuffle: by shaking where the phone is listening, otherwise by a tap on the deck. */
    heroCue() {
        return this.motion !== null && this.motion.support() !== 'unsupported' && this.shake === 'on' ? 'shake' : 'tap';
    }
    /**
     * WHERE THE RITUAL IS, as one named stage (tarotHeroStage.ts), derived from the few facts held here: a shuffle being shown, the cards the session holds, a card being shown,
     * the deck opening, the deck going. The session stays the only record of what was taken; the stage is a view of it.
     */
    heroStage() {
        const session = this.session;
        return heroStageOf({
            shuffling: this.pending !== null,
            opened: this.view !== 'intro',
            spreading: this.spreading,
            taken: session !== null ? session.selections.length : 0,
            revealing: this.revealing,
            jumperPending: session !== null && tarotSessionPhase(session) === 'jumper-decision',
            leaving: this.leaving,
        });
    }
    /** The stage changed without the screen being drawn again (a card landed, the deck has opened, the ritual is over): write it where the stylesheet reads it. */
    syncStage() {
        if (!this.heroFlow || this.destroyed)
            return;
        const mount = this.options.mount;
        /* A mount without a document, or with no hero in it (the tests' stand-in), is simply drawn again. */
        const hero = typeof mount.querySelector === 'function' ? mount.querySelector('.tx-hero') : null;
        if (!hero) {
            this.render();
            return;
        }
        const stage = this.heroStage();
        hero.setAttribute('data-th-stage', stage);
        /* The ritual is over: the deck, which has gathered and faded, is taken off the screen. */
        if (stage === 'reading')
            mount.querySelector('.th-strip')?.remove();
    }
    /** The slot a card has just flown to: its index in the spread, or null. */
    freshSlot() {
        if (!this.session || this.freshPosition === null)
            return null;
        const index = this.session.selections.findIndex((selection) => selection.position === this.freshPosition);
        return index >= 0 ? index : null;
    }
    /**
     * A card was taken and is being shown. The pulses follow the picture: one when it has come forward and is turned over ('reveal': clear, restrained), one when it
     * has landed in its place ('land'; after the third and last card 'complete', a little fuller, and the deck goes). The reveal is taken off the markup afterwards so
     * a later display does not play it again. Haptics are not motion: reduced motion keeps the pulses, and where nothing moves they come at once.
     */
    scheduleLanding(complete) {
        const scheduler = this.scheduler();
        const reduced = this.reducedMotion();
        this.revealing = true;
        this.timers.push(scheduler.set(() => this.cues.cue('reveal'), reduced ? 0 : HERO_REVEAL_ARRIVES_MS));
        this.timers.push(scheduler.set(() => {
            this.revealing = false;
            this.cues.cue(complete ? 'complete' : 'land');
            if (this.destroyed)
                return;
            if (!complete) {
                this.syncStage();
                return;
            }
            /* The third card has landed: the deck gathers back into a pile and goes, the reading rises under the row (stage complete); when that is done, the reading alone (stage
               reading). With motion reduced there is nothing to wait for: the screen is drawn as the finished one. */
            this.leaving = !reduced;
            this.render();
            if (!reduced)
                this.timers.push(scheduler.set(() => { this.leaving = false; this.syncStage(); }, HERO_COMPLETE_MS));
        }, reduced ? HERO_REVEAL_REDUCED_MS : HERO_LANDING_MS));
        const mount = this.options.mount;
        if (typeof mount.querySelector === 'function') {
            this.timers.push(scheduler.set(() => { mount.querySelector('.tx-hero .th-slot[data-th-fresh]')?.removeAttribute('data-th-fresh'); }, reduced ? HERO_REVEAL_REDUCED_MS + 50 : HERO_FLIGHT_MS));
        }
    }
    cancelCues() {
        const scheduler = this.scheduler();
        for (const handle of this.timers)
            scheduler.clear(handle);
        this.timers = [];
        this.revealing = false;
        this.leaving = false;
        this.spreading = false;
        this.spreadAfterJumper = false;
    }
    syncMotion() {
        const visible = typeof document === 'undefined' || document.visibilityState !== 'hidden';
        const want = !this.destroyed && this.motion !== null && this.motion.support() !== 'unsupported'
            && this.shake === 'on' && this.active && visible && this.listeningScreen();
        if (!want) {
            this.releaseMotion();
            return;
        }
        if (this.stopMotion !== null || this.motion === null)
            return;
        this.stopMotion = this.motion.listen({ onShake: this.handleShake, onUnavailable: this.handleNoSignal });
    }
    handleShake = () => {
        this.stopMotion = null; /* the port has already detached: one shake, one shuffle */
        if (this.shake !== 'on' || !this.listeningScreen())
            return;
        /* On the reading, a shake only counts while the hero is in view: a phone shaken in the hand while the text is being read is not a request. */
        if (this.heroFlow && this.view === 'draw' && this.scrolledPastHero()) {
            this.syncMotion();
            return;
        }
        this.shakeNotice = true;
        this.startShuffle(this.view === 'intro' ? 'begin' : 'again');
    };
    handleNoSignal = () => {
        this.stopMotion = null;
        this.shake = 'unavailable';
        this.render();
    };
    /** Tap on the control: turn it on (asking the browser for access from this very tap) or off. */
    toggleShake() {
        if (!this.motion)
            return;
        if (this.shake === 'on') {
            this.shake = 'off';
            this.render();
            return;
        }
        this.releaseMotion();
        void this.motion.request().then((permission) => {
            this.shake = permission === 'granted' ? 'on' : 'unavailable';
            this.render();
        });
    }
    /** Draw the screen again, in the application's current language. */
    refresh() {
        this.render();
    }
    handleClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest('[data-tx-detail-close]')) {
            this.closeDetail();
            return;
        }
        const opener = target.closest('[data-tx-card-open]');
        if (opener) {
            this.openDetail(opener.dataset.txCardOpen ?? '');
            return;
        }
        if (this.detailKey !== null)
            return; /* the dialog is modal: nothing behind it is reached */
        if (this.lifting !== null)
            return; /* a card is on its way out of the deck */
        if (this.handleGuidedClick(target))
            return;
        if (target.closest('[data-tx-shake-toggle]')) {
            this.toggleShake();
            return;
        }
        if (target.closest('[data-tx-begin]')) {
            this.shakeNotice = false;
            this.armFromGesture();
            this.startShuffle('begin');
            return;
        }
        if (target.closest('[data-tx-again]')) {
            this.shakeNotice = false;
            this.armFromGesture();
            this.startShuffle('again');
            return;
        }
        if (target.closest('[data-tx-today]')) {
            this.backToToday();
            return;
        }
        const jumper = target.closest('[data-tx-jumper]');
        if (jumper) {
            const decision = jumper.dataset.txJumper;
            if (decision === 'accept' || decision === 'reject')
                this.decide(decision);
            return;
        }
        if (this.spreading)
            return; /* the deck is opening: nothing in it can be taken yet */
        if (target.closest('[data-tx-pick]')) {
            /* The button chooses the card in the middle of the strip, whatever else was touched. */
            const focused = this.picker?.focusedPosition();
            if (focused !== undefined)
                this.pick(focused);
            return;
        }
        const slot = target.closest('[data-tx-position]');
        if (slot) {
            const position = Number(slot.dataset.txPosition);
            if (!Number.isInteger(position))
                return;
            /* In the strip, a tap on a card that is not in the middle brings it there; a tap on the one in the middle chooses it. */
            if (this.picker && this.picker.focusedPosition() !== position) {
                this.picker.focusPosition(position, true);
                return;
            }
            this.pick(position);
        }
    };
    /** One tab stop into the deck, and arrows inside it. */
    handleKeydown = (event) => {
        if (this.detailKey !== null) {
            /* The dialog is modal: Escape closes it and Tab stays on its one control. */
            if (event.key === 'Escape') {
                event.preventDefault();
                this.closeDetail();
                return;
            }
            if (event.key === 'Tab') {
                event.preventDefault();
                this.focusIn('.tx-detail-close');
            }
            return;
        }
        if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof HTMLElement) {
            const opener = event.target.closest('[data-tx-card-open]');
            if (opener) {
                event.preventDefault();
                this.openDetail(opener.dataset.txCardOpen ?? '');
                return;
            }
        }
        const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
        if (!keys.includes(event.key) || !(event.target instanceof HTMLElement))
            return;
        const slot = event.target.closest('[data-tx-position]');
        const deck = slot?.closest('.tx-deck');
        if (!slot || !deck)
            return;
        const slots = [...deck.querySelectorAll('[data-tx-position]:not([disabled])')];
        const index = slots.indexOf(slot);
        if (index < 0)
            return;
        const firstTop = slots[0].getBoundingClientRect().top;
        let columns = 0;
        for (const entry of slots) {
            if (Math.abs(entry.getBoundingClientRect().top - firstTop) > 1)
                break;
            columns += 1;
        }
        columns = Math.max(1, columns);
        let next = index;
        if (event.key === 'ArrowRight')
            next = index + 1;
        if (event.key === 'ArrowLeft')
            next = index - 1;
        if (event.key === 'ArrowDown')
            next = index + columns;
        if (event.key === 'ArrowUp')
            next = index - columns;
        if (event.key === 'Home')
            next = 0;
        if (event.key === 'End')
            next = slots.length - 1;
        if (next < 0 || next >= slots.length)
            return;
        event.preventDefault();
        for (const other of slots)
            other.tabIndex = -1;
        slots[next].tabIndex = 0;
        slots[next].focus();
    };
    /**
     * A SHUFFLE IS ASKED FOR - by the button or by a shake, which arrive here the same way.
     *
     * The screen shows the deck being mixed for about a second and a fifth and only then runs the action the button has always run:
     * `begin` (today's deck was committed when Tarot opened and is simply turned to) or `drawAgain` (a fresh deck from the
     * same secure source). The wait is a presentation. It draws nothing, reads nothing from the phone and cannot change what
     * the deck is: the action is called once, unchanged, when the time is up.
     */
    startShuffle(action) {
        if (this.pending !== null || this.detailKey !== null)
            return;
        /* The riffle is felt as well as seen: two quick thumps, once, for a tap or a shake alike - on every path, including a screen that shows no shuffle. */
        if (this.heroFlow)
            this.cancelCues();
        this.cues.cue('shuffle');
        const ms = this.shuffleDuration();
        if (ms <= 0) {
            this.perform(action);
            return;
        }
        this.releaseMotion();
        const scheduler = this.options.scheduler ?? { set: (handler, wait) => setTimeout(handler, wait), clear: (handle) => clearTimeout(handle) };
        this.pending = { action, handle: scheduler.set(() => this.finishShuffle(), ms) };
        this.scrollToTop();
        this.render();
    }
    shuffleDuration() {
        const standard = this.heroFlow ? HERO_SHUFFLE_MS : SHUFFLE_PRESENTATION_MS;
        const reduced = this.heroFlow ? HERO_SHUFFLE_REDUCED_MS : SHUFFLE_REDUCED_MOTION_MS;
        const configured = this.options.shuffleMs ?? (typeof window !== 'undefined' ? standard : 0);
        if (configured <= 0)
            return 0;
        return this.reducedMotion() ? Math.min(configured, reduced) : configured;
    }
    /** True when the page has been scrolled so far that the hero is no longer what is on screen. */
    scrolledPastHero() {
        const host = this.options.scrollHost;
        return host !== undefined && host.scrollTop > 40;
    }
    finishShuffle() {
        const pending = this.pending;
        this.pending = null;
        if (pending === null || this.destroyed)
            return;
        this.perform(pending.action);
    }
    perform(action) {
        /* In the hero flow the opening screen is always clean, so a deck of today that has already been played from is not turned to again with its cards sitting
           in their places: the person gets a fresh deck from the same secure source, in memory only, exactly as "Draw again" always gave. The first draw of
           the day is the day's own deck and is kept as before. */
        const spread = this.spreadDuration() > 0;
        this.spreadAfterJumper = false;
        if (spread)
            this.spreading = true;
        if (this.mode === 'guided')
            this.beginGuidedDraw();
        else if (action === 'begin' && !(this.heroFlow && this.dailyBegun()))
            this.begin();
        else
            this.drawAgain();
        if (!spread)
            return;
        if (this.session === null) {
            this.spreading = false;
            return;
        }
        /* A card that jumped out is answered where it is asked; the deck opens after that. */
        if (tarotSessionPhase(this.session) === 'jumper-decision') {
            this.spreading = false;
            this.spreadAfterJumper = true;
            return;
        }
        this.waitForSpread();
    }
    /**
     * THE DEALER'S SPREAD: the pile just shuffled opens into the strip (tarotDealerSpread.ts, run by mountPicker); when it has opened the strip is live and a soft pulse
     * says so. The flag is on before the screen that shows the strip is drawn, so that screen is the spreading one.
     */
    waitForSpread() {
        this.timers.push(this.scheduler().set(() => {
            this.spreading = false;
            this.cues.cue('settle');
            this.syncStage();
        }, HERO_SPREAD_WAIT_MS));
    }
    /** How long the deck takes to open after a shuffle, ms: none where nothing is shown shuffling, or where motion is reduced. */
    spreadDuration() {
        if (!this.heroFlow || this.reducedMotion() || this.shuffleDuration() <= 0)
            return 0;
        return HERO_SPREAD_WAIT_MS;
    }
    cancelShuffle() {
        const pending = this.pending;
        this.pending = null;
        if (pending === null)
            return;
        const scheduler = this.options.scheduler ?? { set: (handler, wait) => setTimeout(handler, wait), clear: (handle) => clearTimeout(handle) };
        scheduler.clear(pending.handle);
    }
    /**
     * THE CARD DETAIL. A tap on a card in the spread, or on the one that jumped, opens one card large with its own paragraph.
     * It is a view of the session: it reads the card the session holds at that place and writes nothing, so the day's record
     * and a practice draw are exactly as they were when it closes.
     */
    detailFor(key) {
        const session = this.session;
        if (!session)
            return null;
        const strings = tarotExperienceStrings();
        if (key === 'jumper') {
            return session.jumper.kind === 'accepted'
                ? { cardId: session.jumper.offer.cardId, orientation: session.jumper.offer.orientation, roleLabel: strings.jumperHeading }
                : null;
        }
        const match = /^spread:([0-9]+)$/.exec(key);
        if (!match)
            return null;
        const selection = session.selections[Number(match[1])];
        const places = this.guidedPlaceLabels();
        return selection ? { cardId: selection.cardId, orientation: selection.orientation, roleLabel: places ? places[Number(match[1])] ?? strings.roleName[selection.role] : strings.roleName[selection.role] } : null;
    }
    openDetail(key) {
        /* While a card is being shown (or flown to its place) no other card's detail opens over it. */
        if (this.pending !== null || this.revealing || this.detailFor(key) === null)
            return;
        this.detailKey = key;
        this.freshPosition = null; /* opening is not a turn-over: the card must not animate again */
        this.render();
        this.focusIn('.tx-detail-close');
    }
    closeDetail() {
        const key = this.detailKey;
        if (key === null)
            return;
        this.detailKey = null;
        this.render();
        this.focusIn(`[data-tx-card-open="${key}"]`);
    }
    focusIn(selector) {
        for (const host of [this.options.overlayMount, this.options.mount]) {
            if (!host || typeof host.querySelector !== 'function')
                continue;
            const target = host.querySelector(selector);
            if (target instanceof HTMLElement && typeof target.focus === 'function') {
                target.focus({ preventScroll: true });
                return;
            }
        }
    }
    begin() {
        this.view = 'draw';
        this.pickFocus = null;
        this.render();
    }
    /** A fresh deck for another draw. In memory only; the day's record is not touched. */
    drawAgain() {
        this.detailKey = null;
        try {
            const deck = commitTarotDeck({
                ...(this.options.random ? { random: this.options.random } : {}),
                orientationPolicy: this.options.orientationPolicy ?? DEFAULT_TAROT_ORIENTATION_POLICY,
                jumperPolicy: this.options.jumperPolicy ?? DEFAULT_TAROT_JUMPER_POLICY,
            });
            const jumperPolicy = this.options.jumperPolicy ?? DEFAULT_TAROT_JUMPER_POLICY;
            const clock = this.options.clock ?? systemTarotClock;
            const at = clock.now();
            this.session = startTarotSession({
                deck, localDate: clock.localDate(at), startedAt: at, timeZone: clock.timeZone(),
                rejectedFate: jumperPolicy.rejectedFate, acceptedFate: jumperPolicy.acceptedFate,
            });
            this.kind = 'practice';
            this.diagnostic = null;
            this.freshPosition = null;
            this.pickFocus = null;
            this.view = 'draw';
        }
        catch (error) {
            this.session = null;
            this.diagnostic = error instanceof Error ? error.message : String(error);
        }
        this.render();
        this.scrollToTop();
    }
    backToToday() {
        this.shakeNotice = false;
        this.detailKey = null;
        this.session = this.daily;
        this.kind = 'daily';
        this.diagnostic = null;
        this.freshPosition = null;
        this.pickFocus = null;
        this.render();
        this.scrollToTop();
    }
    scheduler() {
        return this.options.scheduler ?? { set: (handler, wait) => setTimeout(handler, wait), clear: (handle) => clearTimeout(handle) };
    }
    cancelLift() {
        if (this.lifting === null)
            return;
        this.scheduler().clear(this.lifting);
        this.lifting = null;
    }
    /**
     * A TAP OR THE BUTTON CHOOSES THE CARD IN FOCUS. In the strip the card first rises a little further out of the deck (a
     * moment, and none at all when motion is reduced), then it is chosen exactly as it always was. Without a strip (no layout)
     * it is chosen at once.
     */
    pick(position) {
        /* A card is being shown: nothing else is taken until it has landed. */
        if (this.revealing || this.spreading)
            return;
        if (this.picker === null) {
            this.choose(position);
            return;
        }
        this.haptics.select(); /* a pulse is not motion: it is kept when motion is reduced */
        if (this.reducedMotion()) {
            this.choose(position);
            return;
        }
        this.picker.lift(position);
        this.lifting = this.scheduler().set(() => { this.lifting = null; this.choose(position); }, PICK_LIFT_MS);
    }
    choose(position) {
        if (!this.session)
            return;
        this.shakeNotice = false;
        const before = this.session.selections.length;
        if (this.kind === 'daily') {
            const result = chooseTarotPosition(this.session, position, this.options);
            if (result.ok) {
                this.session = result.session;
                this.daily = result.session;
                this.diagnostic = result.diagnostic?.detail ?? null;
            }
            else
                this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        else {
            const result = selectTarotPosition(this.session, position);
            if (result.ok) {
                this.session = result.session;
                this.diagnostic = null;
            }
            else
                this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        this.freshPosition = this.session.selections.length > before ? position : null;
        /* In the hero flow the card just taken flies from the strip to its slot, on the next render only. */
        if (this.heroFlow && this.freshPosition !== null) {
            this.freshPending = true;
            this.revealing = true;
        }
        if (this.freshPosition !== null)
            this.pickFocus = position; /* the strip stays where the card was taken; the nearest place left is put in the middle */
        if (this.mode === 'guided')
            this.afterGuidedPick();
        this.render();
        if (this.freshPosition !== null)
            this.showSpread();
    }
    decide(decision) {
        if (!this.session)
            return;
        this.shakeNotice = false;
        if (this.kind === 'daily') {
            const result = decideTarotJumper(this.session, decision, this.options);
            if (result.ok) {
                this.session = result.session;
                this.daily = result.session;
                this.diagnostic = result.diagnostic?.detail ?? null;
            }
            else
                this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        else {
            const result = resolveTarotJumper(this.session, decision);
            if (result.ok) {
                this.session = result.session;
                this.diagnostic = null;
            }
            else
                this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        this.freshPosition = null;
        if (this.spreadAfterJumper) {
            this.spreadAfterJumper = false;
            this.spreading = true;
            this.waitForSpread();
        }
        this.render();
    }
    /* ================================================================== GUIDED TAROT */
    /** Resolves when anything the screen was waiting for (the guided module arriving) has been drawn. For tests; nothing in the application waits on it. */
    settled() {
        return this.guidedLoading ?? Promise.resolve();
    }
    /** Read afresh each time: the mode can change while the guided module is on its way. */
    inGuided() {
        return this.mode === 'guided';
    }
    guidedNow() {
        return (this.options.clock ?? systemTarotClock).now();
    }
    /** The three places of the choice being drawn for, in the application's language; null when no guided draw is on screen. */
    guidedPlaceLabels() {
        if (this.mode !== 'guided' || (this.guided.stage !== 'draw' && this.guided.stage !== 'reading'))
            return null;
        const bundle = guidedBundle();
        const choice = bundle ? bundle.flow.choiceOf(this.guided) : null;
        const start = bundle && choice ? bundle.adapter.guidedStartFor(choice) : null;
        if (!start)
            return null;
        const locale = activeLocale();
        const [a, b, c] = start.spread.positions.map((position) => position.label[locale]);
        return a !== undefined && b !== undefined && c !== undefined ? [a, b, c] : null;
    }
    /** The cards the session holds, as the question engine's own drawn cards for the spread of the choice. */
    guidedDrawn(session) {
        const bundle = guidedBundle();
        const choice = bundle ? bundle.flow.choiceOf(this.guided) : null;
        const start = bundle && choice ? bundle.adapter.guidedStartFor(choice) : null;
        if (!start || session.selections.length !== start.spread.positions.length)
            return null;
        return session.selections.map((selection, index) => ({ positionId: start.spread.positions[index].id, cardId: selection.cardId, orientation: selection.orientation }));
    }
    guidedModel(session) {
        if (this.mode !== 'guided')
            return undefined;
        const base = {
            stage: this.guided.stage, areaId: this.guided.areaId, intentionId: this.guided.intentionId,
            resume: this.guided.stage === 'area' ? this.resume : null,
        };
        const bundle = guidedBundle();
        if (!bundle)
            return { ...base, placeLabels: null, reading: null };
        let reading = null;
        const choice = bundle.flow.choiceOf(this.guided);
        if (this.guided.stage === 'reading' && choice && session && tarotSessionPhase(session) === 'complete') {
            const drawn = this.guidedDrawn(session);
            const locale = activeLocale();
            const key = drawn ? `${choice.intentionId}|${locale}|${drawn.map((card) => `${card.cardId}:${card.orientation}`).join(',')}` : '';
            if (this.guidedReadingMemo?.key === key && key !== '')
                reading = this.guidedReadingMemo.reading;
            else if (drawn) {
                reading = bundle.composeGuidedReading(choice, drawn, locale);
                this.guidedReadingMemo = { key, reading };
            }
        }
        return { ...base, placeLabels: this.guidedPlaceLabels(), reading };
    }
    /** What the areas screen offers of an earlier guided reading, from the keeper (guided/guidedPersistence.ts): its own record, never the day's. */
    refreshResume() {
        const bundle = guidedBundle();
        const stored = bundle ? bundle.persistence.readGuided(this.guidedNow(), this.options.storage) : null;
        this.resume = stored
            ? { areaId: stored.choice.areaId, intentionId: stored.choice.intentionId, stage: stored.session.selections.length >= 3 ? 'reading' : 'draw' }
            : null;
    }
    persistGuided() {
        const bundle = guidedBundle();
        const choice = bundle ? bundle.flow.choiceOf(this.guided) : null;
        if (bundle && choice && this.session)
            bundle.persistence.writeGuided(choice, this.session, this.guidedNow(), this.options.storage);
    }
    /** Every card taken in a guided draw is kept, so that a person who leaves in the middle comes back to the same deck and the same cards. */
    afterGuidedPick() {
        const bundle = guidedBundle();
        if (!bundle || !this.session)
            return;
        if (tarotSessionPhase(this.session) === 'complete')
            this.guided = bundle.flow.finishDraw(this.guided);
        this.persistGuided();
    }
    goGuided(next) {
        if (next === this.guided)
            return;
        this.guided = next;
        this.view = 'intro';
        this.shakeNotice = false;
        this.render();
        this.scrollToTop();
    }
    /**
     * ENTER GUIDED TAROT. Nothing of Daily Tarot is read or changed: the day's session stays exactly where it is, and the way back is the same startOver the
     * screen already uses. The large part of Guided Tarot is loaded here, the first time, and a person who cannot load it simply stays in Daily Tarot.
     */
    async enterGuided() {
        if (this.inGuided() || this.pending !== null)
            return;
        if (!(await loadGuided()) || this.destroyed || this.inGuided())
            return;
        this.cancelCues();
        this.cancelLift();
        this.detailKey = null;
        this.freshPosition = null;
        this.freshPending = false;
        this.pickFocus = null;
        this.diagnostic = null;
        this.mode = 'guided';
        this.guided = { stage: 'area', areaId: null, intentionId: null };
        this.session = this.daily;
        this.kind = 'daily';
        this.view = 'intro';
        this.shakeNotice = false;
        this.refreshResume();
        this.render();
        this.scrollToTop();
    }
    /** The click of a guided control. Returns true when it was one, so that the rest of the click handler is not reached. */
    handleGuidedClick(target) {
        const modeButton = target.closest('[data-tg-mode]');
        if (modeButton) {
            if (this.pending !== null)
                return true;
            if (modeButton.dataset.tgMode === 'guided')
                this.guidedLoading = this.enterGuided();
            else if (this.mode === 'guided')
                this.startOver();
            return true;
        }
        if (this.mode !== 'guided')
            return false;
        const bundle = guidedBundle();
        if (!bundle)
            return false;
        const { flow } = bundle;
        if (target.closest('[data-tg-daily]')) {
            this.startOver();
            return true;
        }
        if (this.pending !== null)
            return true; /* a shuffle is being shown: nothing guided is changed under it */
        const area = target.closest('[data-tg-area]');
        if (area) {
            this.goGuided(flow.chooseArea(this.guided, area.dataset.tgArea));
            return true;
        }
        const intention = target.closest('[data-tg-intention]');
        if (intention) {
            this.goGuided(flow.chooseIntention(this.guided, intention.dataset.tgIntention));
            return true;
        }
        if (target.closest('[data-tg-change-area]')) {
            this.goGuided(flow.restart());
            return true;
        }
        if (target.closest('[data-tg-back]')) {
            const previous = flow.stepBack(this.guided);
            if (previous)
                this.goGuided(previous);
            else
                this.startOver();
            return true;
        }
        if (target.closest('[data-tg-ready]')) {
            /* The tap that opens the shuffle is the one moment a phone that asks before it reports its motion (iOS) will take the question. */
            this.armFromGesture();
            this.goGuided(flow.proceedToShuffle(this.guided));
            return true;
        }
        if (target.closest('[data-tg-resume]')) {
            this.resumeGuided();
            return true;
        }
        if (target.closest('[data-tg-restart]')) {
            bundle.persistence.clearGuided(this.options.storage);
            this.resume = null;
            this.render();
            return true;
        }
        if (target.closest('[data-tg-new]')) {
            /* A NEW READING IS ASKED FOR, never implied: the earlier one is let go of here, by this tap and no other. */
            bundle.persistence.clearGuided(this.options.storage);
            this.session = this.daily;
            this.kind = 'daily';
            this.guidedReadingMemo = null;
            this.resume = null;
            this.goGuided(flow.restart());
            return true;
        }
        return false;
    }
    /** Back to a guided reading that was left, from the keeper: the same deck, the same cards, the same two ids. */
    resumeGuided() {
        const bundle = guidedBundle();
        const stored = bundle ? bundle.persistence.readGuided(this.guidedNow(), this.options.storage) : null;
        if (!bundle || !stored) {
            this.resume = null;
            this.render();
            return;
        }
        this.cancelCues();
        this.mode = 'guided';
        this.session = stored.session;
        this.kind = 'guided';
        this.diagnostic = null;
        this.freshPosition = null;
        this.pickFocus = null;
        this.view = 'draw';
        this.guided = bundle.flow.resumeAt(stored.choice, stored.session.selections.length >= 3 ? 'reading' : 'draw');
        this.render();
        this.scrollToTop();
    }
    /**
     * THE GUIDED DECK. A fresh deck from the same secure source and the same shuffle, committed before the first tap, played with the same pure moves and kept
     * in a session of its own: the day's deck is not read, not changed and not consulted. No card jumps out of a guided deck (a fourth card would change what
     * every relation of the three means), and the cards taken are kept so that a draw interrupted is the same draw when it is resumed.
     */
    beginGuidedDraw() {
        const bundle = guidedBundle();
        const choice = bundle ? bundle.flow.choiceOf(this.guided) : null;
        if (!bundle || !choice || this.guided.stage !== 'shuffle')
            return;
        this.detailKey = null;
        try {
            const deck = commitTarotDeck({
                ...(this.options.random ? { random: this.options.random } : {}),
                orientationPolicy: this.options.orientationPolicy ?? DEFAULT_TAROT_ORIENTATION_POLICY,
                jumperPolicy: TAROT_JUMPER_NEVER,
            });
            const clock = this.options.clock ?? systemTarotClock;
            const at = clock.now();
            this.session = startTarotSession({
                deck, localDate: clock.localDate(at), startedAt: at, timeZone: clock.timeZone(),
                rejectedFate: TAROT_JUMPER_NEVER.rejectedFate, acceptedFate: TAROT_JUMPER_NEVER.acceptedFate,
            });
            this.kind = 'guided';
            this.diagnostic = null;
            this.freshPosition = null;
            this.pickFocus = null;
            this.view = 'draw';
            this.guided = bundle.flow.beginDraw(this.guided);
            this.persistGuided();
        }
        catch (error) {
            this.session = null;
            this.diagnostic = error instanceof Error ? error.message : String(error);
        }
        this.render();
        this.scrollToTop();
    }
    reducedMotion() {
        return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    scrollToTop() {
        const behavior = this.reducedMotion() ? 'auto' : 'smooth';
        const host = this.options.scrollHost;
        if (host && typeof host.scrollTo === 'function') {
            host.scrollTo({ top: 0, behavior });
            return;
        }
        if (typeof window !== 'undefined' && typeof window.scrollTo === 'function')
            window.scrollTo({ top: 0, behavior });
    }
    /**
     * Bring the three places into view after a card is chosen, so the turn-over is seen, with the prompt and the
     * deck (or, after the third card, the reading) directly beneath it.
     */
    showSpread() {
        const mount = this.options.mount;
        if (typeof mount.querySelector !== 'function')
            return;
        mount.querySelector('.tx-spread')?.scrollIntoView?.({ behavior: this.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
    /**
     * The longer card descriptions are a separate module, fetched when a card can first be looked at (a finished reading) or is
     * looked at. When they arrive and a card is open, the dialog is drawn again with them in it.
     */
    reader = 'idle';
    ensureReaderText() {
        if (this.reader !== 'idle')
            return;
        if (readerDescriptionsLoaded()) {
            this.reader = 'ready';
            return;
        }
        this.reader = 'loading';
        void loadReaderDescriptions().then(() => {
            this.reader = readerDescriptionsLoaded() ? 'ready' : 'idle';
            if (this.reader === 'ready' && this.detailKey !== null) {
                this.render();
                this.focusIn('.tx-detail-close');
            }
        });
    }
    render() {
        const session = this.session;
        /* A detail that no longer has a card to show is closed, never left holding the screen. */
        const detail = this.detailKey !== null ? this.detailFor(this.detailKey) : null;
        if (detail === null)
            this.detailKey = null;
        if (detail !== null || (session && tarotSessionPhase(session) === 'complete'))
            this.ensureReaderText();
        const overlay = this.options.overlayMount;
        this.picker?.destroy();
        this.picker = null;
        /* A screen drawn again keeps where the hero was placed (the numbers the placement script wrote on it): a new element with none would sit
           unplaced - the deck at the wrong edge - until the next frame. */
        const mount = this.options.mount;
        const previousHero = this.heroFlow && typeof mount.querySelector === 'function' ? mount.querySelector('.tx-hero') : null;
        const carried = previousHero
            ? { style: previousHero.getAttribute('style'), motion: previousHero.getAttribute('data-orbit-motion') }
            : null;
        /* A card's flight plays once: the flag is spent by the render that shows it. */
        const stage = this.heroFlow ? this.heroStage() : 'idle';
        const heroPhase = heroScreenOf(stage);
        const showsSlots = heroPhase === 'picking' || heroPhase === 'complete';
        const fresh = this.heroFlow && this.freshPending && showsSlots ? this.freshSlot() : null;
        this.freshPending = false;
        const hero = this.heroFlow
            ? { phase: heroPhase, stage, fresh, cue: this.heroCue() }
            : undefined;
        this.options.mount.innerHTML = renderTarotExperience({
            hero,
            view: this.pending !== null ? 'shuffling' : this.view,
            session,
            kind: this.kind,
            cardTitles: titlesFor(),
            reading: this.mode === 'daily' && session && tarotSessionPhase(session) === 'complete' ? readingForSession(session) : null,
            guided: this.guidedModel(session),
            diagnostic: this.diagnostic,
            freshPosition: this.freshPosition,
            pickFocus: this.pickFocus,
            shake: { offered: this.shakeOffered(), state: this.shake, notice: this.shakeNotice },
            detail,
            detailExternal: overlay !== undefined,
        });
        if (carried) {
            const next = mount.querySelector('.tx-hero');
            if (next) {
                if (carried.style)
                    next.setAttribute('style', carried.style);
                /* The reading's sheet takes its pulled-up margin from the same place (the placement script writes it on both): without it it would sit a frame below the fold. */
                const sheetMargin = next.style.getPropertyValue('--th-sheet-margin');
                const sheet = mount.querySelector('.tx-sheet');
                if (sheet && sheetMargin)
                    sheet.style.setProperty('--th-sheet-margin', sheetMargin);
                if (carried.motion)
                    next.setAttribute('data-orbit-motion', carried.motion);
            }
        }
        if (overlay)
            overlay.innerHTML = renderTarotDetail(detail, titlesFor());
        if (fresh !== null)
            this.scheduleLanding(session !== null && tarotSessionPhase(session) === 'complete');
        this.mountPicker();
        this.syncMotion();
    }
    /** Wire the strip, if the screen is showing one and the mount is a real element (the tests' stand-in has no layout). */
    mountPicker() {
        const mount = this.options.mount;
        if (typeof mount.querySelector !== 'function')
            return;
        const deck = mount.querySelector('.tx-deck');
        if (!deck)
            return;
        this.picker = attachCardPicker(deck, {
            initialPosition: this.pickFocus,
            reducedMotion: () => this.reducedMotion(),
            onFocus: (position, selectable) => this.showPickFocus(position, selectable),
            onTick: (position) => { this.haptics.tick(position); },
        });
        /* Where the strip starts is not a place it was moved to: no tick for it. */
        if (this.picker)
            this.haptics.arm(this.picker.focusedPosition());
        /* THE DEALER'S MOTION: the strip is where the picker has put it; the cards that can be seen are drawn back into the pile (to open out of it) or told to gather back into it. */
        if (this.heroFlow) {
            const strip = mount.querySelector('.th-strip');
            const stage = this.heroStage();
            if (strip && stage === 'spreading')
                applyDealerMotion(strip, 'spread', HERO_SPREAD_STAGGER_MS);
            else if (strip && stage === 'complete')
                applyDealerMotion(strip, 'gather', HERO_GATHER_STAGGER_MS);
        }
    }
    /** The button says which card it would choose, or why it would choose none. */
    showPickFocus(position, selectable) {
        this.pickFocus = position;
        const button = this.options.mount.querySelector('[data-tx-pick]');
        if (!button)
            return;
        const strings = tarotExperienceStrings();
        const taken = this.session?.selections.some((selection) => selection.position === position) ?? false;
        button.disabled = !selectable;
        button.textContent = selectable ? strings.pickCard(position) : (taken ? strings.pickTaken(position) : strings.pickGone(position));
    }
}
/** Mount the Tarot screen on an element. */
export function mountTarotExperience(options) {
    const controller = new TarotExperienceController(options);
    controller.start();
    return controller;
}
