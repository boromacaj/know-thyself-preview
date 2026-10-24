import { buildTarotCardTitles, TAROT_TITLE_LEXICON_EN, TAROT_TITLE_LEXICON_SK } from '../content/tarotCardTitles.js';
import { activeLocale, LOCALE_CHANGED_EVENT } from '../../i18n/locale.js';
import { chooseTarotPosition, decideTarotJumper, getTodayTarotSession, reconcileTarotSession, } from '../tarotDailySession.js';
import { TAROT_SESSION_STORAGE_KEY } from '../tarotSessionPersistence.js';
import { readingForSession, renderTarotDrawScreen } from './tarotDrawScreen.js';
const titlesFor = () => buildTarotCardTitles(activeLocale() === 'sk' ? TAROT_TITLE_LEXICON_SK : TAROT_TITLE_LEXICON_EN);
export class TarotDrawController {
    session = null;
    diagnostic = null;
    options;
    constructor(options) {
        this.options = options;
    }
    /** Commit or restore today's deck and draw the screen. */
    start() {
        const state = getTodayTarotSession(this.options);
        this.session = state.session ?? null;
        this.diagnostic = state.diagnostic?.detail ?? null;
        this.render();
        if (this.options.listen !== false)
            this.attach();
    }
    attach() {
        this.options.mount.addEventListener('click', this.handleClick);
        this.options.mount.addEventListener('keydown', this.handleKeydown);
        /*
         * CONVERGE ON THE STORED RECORD WHEN ANOTHER TAB WRITES, AND WHEN WE COME BACK.
         *
         * The `storage` event fires in the OTHER tabs, which is exactly what is wanted:
         * the tab that did not write learns that it should re-read. `visibilitychange`
         * covers the case where the event was missed because the tab was discarded.
         *
         * Reconciling always moves towards the stored session, never away from it, so
         * this cannot be used to obtain a different deck - see the note on
         * reconcileTarotSession.
         */
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.handleStorage);
            document.addEventListener('visibilitychange', this.handleVisibility);
            window.addEventListener(LOCALE_CHANGED_EVENT, this.handleLocale);
        }
    }
    /** Detach every listener. Tests and any future unmount need this to be honest. */
    destroy() {
        this.options.mount.removeEventListener('click', this.handleClick);
        this.options.mount.removeEventListener('keydown', this.handleKeydown);
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.handleStorage);
            document.removeEventListener('visibilitychange', this.handleVisibility);
            window.removeEventListener(LOCALE_CHANGED_EVENT, this.handleLocale);
        }
    }
    handleStorage = (event) => {
        if (event.key !== null && event.key !== TAROT_SESSION_STORAGE_KEY)
            return;
        this.reconcile();
    };
    handleVisibility = () => {
        if (document.visibilityState === 'visible')
            this.reconcile();
    };
    handleLocale = () => this.render();
    reconcile() {
        if (!this.session)
            return;
        const state = reconcileTarotSession(this.session, this.options);
        this.session = state.session ?? this.session;
        this.diagnostic = state.diagnostic?.detail ?? null;
        this.render();
    }
    handleClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const jumper = target.closest('[data-tarot-jumper]');
        if (jumper) {
            const decision = jumper.dataset.tarotJumper;
            if (decision === 'accept' || decision === 'reject')
                this.decide(decision);
            return;
        }
        const slot = target.closest('[data-tarot-position]');
        if (slot) {
            const position = Number(slot.dataset.tarotPosition);
            if (Number.isInteger(position))
                this.choose(position);
        }
    };
    /**
     * ARROW KEYS ACROSS THE DECK.
     *
     * 78 buttons is 78 tab stops, which is not usable by keyboard. The accessible
     * pattern for a grid of buttons is one tab stop into the group and arrows
     * inside it, so Tab reaches the deck and arrows move within it.
     *
     * The column count is read from the rendered layout rather than assumed,
     * because it is set by CSS and changes with the viewport - a hard-coded 6 would
     * move focus diagonally on a desktop.
     */
    handleKeydown = (event) => {
        const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
        if (!keys.includes(event.key))
            return;
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const slot = target.closest('[data-tarot-position]');
        if (!slot)
            return;
        const deck = slot.closest('.kt-tarot-deck');
        if (!deck)
            return;
        const slots = [...deck.querySelectorAll('[data-tarot-position]')];
        const index = slots.indexOf(slot);
        if (index < 0)
            return;
        const columns = this.columnCount(deck, slots);
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
        /* Move the tab stop with the focus, so leaving and re-entering the deck comes
           back to where the reader was rather than to the start. */
        for (const other of slots)
            other.tabIndex = -1;
        slots[next].tabIndex = 0;
        slots[next].focus();
    };
    /** How many slots share the first row, from their rendered positions. */
    columnCount(deck, slots) {
        if (slots.length === 0)
            return 1;
        const firstTop = slots[0].getBoundingClientRect().top;
        let columns = 0;
        for (const slot of slots) {
            if (Math.abs(slot.getBoundingClientRect().top - firstTop) > 1)
                break;
            columns += 1;
        }
        return Math.max(1, columns);
    }
    choose(position) {
        if (!this.session)
            return;
        const result = chooseTarotPosition(this.session, position, this.options);
        if (result.ok) {
            this.session = result.session;
            this.diagnostic = result.diagnostic?.detail ?? null;
        }
        else {
            /* A refusal is information, not a failure. Rendering it is what keeps a
               disabled position distinguishable from a broken one. */
            this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        this.render();
    }
    decide(decision) {
        if (!this.session)
            return;
        const result = decideTarotJumper(this.session, decision, this.options);
        if (result.ok) {
            this.session = result.session;
            this.diagnostic = result.diagnostic?.detail ?? null;
        }
        else {
            this.diagnostic = `Not available: ${result.refusal.replace(/-/g, ' ')}.`;
        }
        this.render();
    }
    render() {
        this.options.mount.innerHTML = renderTarotDrawScreen({
            session: this.session,
            cardTitles: titlesFor(),
            reading: this.session ? readingForSession(this.session) : null,
            diagnostic: this.diagnostic,
        });
    }
}
/** Mount the draw on an element. One call, for the harness page. */
export function mountTarotDraw(options) {
    const controller = new TarotDrawController(options);
    controller.start();
    return controller;
}
