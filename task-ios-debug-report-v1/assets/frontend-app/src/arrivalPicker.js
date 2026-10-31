import { activeLocale, LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=b5ef5ed';
import { t } from './app/i18n/uiStrings.js?v=b5ef5ed';
import { ARRIVAL_DAY_CHOSEN } from './arrivalDayChoice.js?v=b5ef5ed';
import { birthTimePrecisionOfInput, birthTimeText, setBirthTimePrecision } from './birthTimeInput.js?v=b5ef5ed';
const profileFlow = document.querySelector('.profile-flow');
const arrivalForm = document.querySelector('#profile-arrival-form');
const birthDateInput = document.querySelector('#profile-birth-date');
const birthTimeInput = document.querySelector('#profile-birth-time');
if (profileFlow && arrivalForm && birthDateInput && birthTimeInput) {
    const dateField = birthDateInput.closest('.profile-field-dated');
    const timeField = birthTimeInput.closest('.profile-field-dated');
    const fields = arrivalForm.querySelector('.profile-fields-arrival');
    const arrivalBack = arrivalForm.querySelector('#profile-arrival-back');
    if (dateField && timeField && fields) {
        /* CALENDAR NAMES COME FROM Intl, NOT FROM A TABLE.
           A month name has to decline with the sentence it sits in: Slovak heads a
           calendar with "august" but writes a date as "28. augusta 1987". A string
           table can hold one of those two forms, never both, so the names are asked
           for in the shape they are needed.
           English is pinned to en-GB rather than plain 'en' so the existing
           day-first "28 August 1987" is preserved exactly; plain 'en' resolves to
           US order and would silently restyle every date on screen. */
        const dateLocale = () => (activeLocale() === 'en' ? 'en-GB' : activeLocale());
        const monthName = (month) => new Intl.DateTimeFormat(dateLocale(), { month: 'long' }).format(new Date(2000, month, 1));
        const capitalised = (word) => word.charAt(0).toUpperCase() + word.slice(1);
        /* 2024-01-01 was a Monday, so index 0 is Monday in every locale. */
        const weekdayNames = () => Array.from({ length: 7 }, (unused, index) => new Intl.DateTimeFormat(dateLocale(), { weekday: 'narrow' })
            .format(new Date(2024, 0, 1 + index)).toUpperCase());
        const today = new Date();
        const todayStamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        const minYear = 1900;
        const maxYear = today.getFullYear();
        let visibleYear = today.getFullYear();
        let visibleMonth = today.getMonth();
        let activePicker = null;
        let yearGridOpen = false;
        /* How certain the time is, as the open time picker is set. Read from the
           input each time the picker opens, so it starts from the committed
           answer; an unanswered question starts at Exact. */
        let timeMode = 'exact';
        const pickerHost = document.createElement('div');
        pickerHost.className = 'arrival-picker-host';
        pickerHost.setAttribute('aria-live', 'polite');
        fields.insertAdjacentElement('afterend', pickerHost);
        /*
         * The caption and the placeholder are rebuilt here, which is why they
         * survived a language switch in English: the markup vesselOrbit stamped is
         * replaced by these elements before the reader ever sees it. So the keys
         * come through rather than the finished strings, and the stamp goes on the
         * element that actually ends up in the DOM. See the `data-i18n` note in
         * i18n/onboardingStaticTargets.ts.
         *
         * The VALUE is stamped only while it is still the placeholder. Once a date
         * is chosen the element holds the reader's own date, and re-applying a
         * dictionary string over it would erase the answer.
         */
        const makeRow = (field, input, captionKey, placeholderKey) => {
            const captionText = t(captionKey);
            const placeholder = t(placeholderKey);
            input.type = 'text';
            input.readOnly = true;
            input.tabIndex = -1;
            input.classList.add('arrival-native-value');
            input.setAttribute('aria-hidden', 'true');
            const caption = document.createElement('span');
            caption.className = 'profile-field-caption';
            caption.dataset.i18n = captionKey;
            caption.textContent = captionText;
            const value = document.createElement('span');
            value.className = 'arrival-field-value is-placeholder';
            value.dataset.i18nPlaceholderText = placeholderKey;
            value.textContent = placeholder;
            const chevron = document.createElement('span');
            chevron.className = 'arrival-field-chevron';
            chevron.setAttribute('aria-hidden', 'true');
            chevron.textContent = '⌄';
            field.replaceChildren(caption, value, chevron, input);
            field.classList.add('profile-field-picker');
            field.setAttribute('role', 'button');
            field.tabIndex = 0;
            return value;
        };
        const dateValue = makeRow(dateField, birthDateInput, 'onb.arrival.date', 'onb.arrival.chooseDate');
        const timeValue = makeRow(timeField, birthTimeInput, 'onb.arrival.time', 'onb.arrival.chooseTime');
        const style = document.createElement('style');
        style.dataset.arrivalPicker = 'true';
        style.textContent = `
      .profile-field-picker {
        grid-template-columns: auto minmax(0, 1fr) 18px !important;
        align-items: center;
        gap: 12px;
        padding: 0 18px 0 19px;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }

      .profile-field-picker.is-open {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.7);
        background: rgba(7, 10, 11, 0.72);
        box-shadow:
          0 0 0 1px rgba(var(--profile-energy-rgb), 0.08) inset,
          0 0 30px rgba(var(--profile-energy-rgb), 0.12),
          0 18px 48px rgba(0, 0, 0, 0.28);
      }

      .arrival-native-value {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      .arrival-field-value {
        min-width: 0;
        overflow: hidden;
        color: rgba(248, 247, 242, 0.94);
        font-size: 14px;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .arrival-field-value.is-placeholder {
        color: rgba(244, 241, 233, 0.38);
      }

      .arrival-field-chevron {
        color: rgba(var(--profile-energy-soft-rgb), 0.66);
        font-size: 16px;
        line-height: 1;
        transform: translateY(-1px);
        transition: transform 220ms ease;
      }

      .profile-field-picker.is-open .arrival-field-chevron {
        transform: rotate(180deg) translateY(1px);
      }

      .arrival-picker-host {
        width: 100%;
        max-height: 0;
        margin-top: 0;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-8px);
        transition:
          max-height 420ms cubic-bezier(0.16, 0.72, 0.22, 1),
          margin-top 320ms ease,
          opacity 260ms ease,
          transform 360ms ease;
      }

      .arrival-picker-host.is-open {
        max-height: 430px;
        margin-top: 12px;
        overflow: visible;
        opacity: 1;
        transform: translateY(0);
      }

      .arrival-glass-picker {
        width: 100%;
        padding: 15px;
        overflow: hidden;
        border: 1px solid rgba(var(--profile-energy-soft-rgb), 0.26);
        border-radius: 26px;
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.025) 42%, rgba(0, 0, 0, 0.11)),
          rgba(8, 12, 13, 0.58);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.035) inset,
          0 24px 70px rgba(0, 0, 0, 0.42),
          0 0 42px rgba(var(--profile-energy-rgb), 0.08);
        backdrop-filter: blur(26px) saturate(1.18) brightness(1.04);
        -webkit-backdrop-filter: blur(26px) saturate(1.18) brightness(1.04);
      }

      .arrival-period-row {
        display: grid;
        grid-template-columns: 52px 38px minmax(0, 1fr) 38px;
        gap: 7px;
        align-items: center;
      }

      .arrival-period-row + .arrival-period-row {
        margin-top: 7px;
      }

      .arrival-period-label {
        color: rgba(244, 241, 233, 0.42);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.17em;
        text-align: left;
        text-transform: uppercase;
      }

      .arrival-period-button,
      .arrival-period-main,
      .arrival-calendar-day-disc,
      .arrival-year-option,
      .arrival-time-quick {
        border: 1px solid rgba(255, 255, 255, 0.09);
        color: rgba(248, 247, 242, 0.92);
        background: rgba(255, 255, 255, 0.035);
        -webkit-tap-highlight-color: transparent;
      }

      .arrival-period-button {
        width: 38px;
        height: 34px;
        border-radius: 12px;
        font-size: 20px;
        line-height: 1;
      }

      .arrival-period-main {
        min-width: 0;
        height: 34px;
        padding: 0 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 650;
        letter-spacing: 0.02em;
      }

      .arrival-period-main.year-main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .arrival-period-hint {
        color: rgba(var(--profile-energy-soft-rgb), 0.52);
        font-size: 7px;
        font-weight: 700;
        letter-spacing: 0.11em;
        text-transform: uppercase;
      }

      /* PRESSED IS PAINT ONLY.
         These four selectors once opened a group that a later edit spliced the
         time picker's confirm row into, so every PRESSED day, arrow and year
         took that row's layout: display grid, a 108px column and a 12px top
         margin. On a phone :active arrives while the finger is still down; the
         pressed day's margin grew every row of the calendar, the card - pinned
         by its bottom edge - rose by about 70px, and the tap resolved on the day
         below the one under the finger (19 selected 26, 5 selected 12). A
         pressed control may change colour. It must never change size or place. */
      .arrival-period-button:active,
      .arrival-period-main:active,
      .arrival-year-option:active,
      .arrival-calendar-day:active .arrival-calendar-day-disc {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.55);
        background: rgba(var(--profile-energy-rgb), 0.12);
      }

      /* The same confirm row the DATE picker already uses, so the two pickers
         end the same way: a summary capsule of what is about to be committed
         and a capsule button that commits it. Nothing new is invented here. */
      .profile-flow .arrival-time-confirm-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 108px;
        gap: 10px;
        align-items: center;
        margin-top: 12px;
      }

      .profile-flow .arrival-time-summary {
        display: grid;
        align-content: center;
        min-width: 0;
        min-height: 46px;
        padding: 6px 15px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.025);
        text-align: left;
      }

      .profile-flow .arrival-time-summary-label {
        color: rgba(244,241,233,.34);
        font-size: 7px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
      }

      .profile-flow .arrival-time-summary-value {
        min-width: 0;
        overflow: hidden;
        color: rgba(250,249,245,.94);
        font-size: 12px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .profile-flow .arrival-time-summary-value.is-placeholder {
        color: rgba(244,243,238,.34);
        font-weight: 500;
      }

      .profile-flow .arrival-time-ok {
        width: 108px;
        height: 46px;
        padding: 0 6px;
        border: 1px solid rgba(var(--profile-energy-soft-rgb), .86);
        border-radius: 999px;
        color: rgba(250,249,245,.96);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .06em;
        background: transparent;
        box-shadow:
          0 0 2px rgba(255,255,255,.60),
          0 0 14px rgba(var(--profile-energy-rgb), .16);
      }

      .profile-flow .arrival-time-ok:disabled {
        border-color: rgba(255,255,255,.13);
        color: rgba(244,243,238,.28);
        box-shadow: none;
      }

      /* The second answer. Quieter than the confirm capsule because it is the
         fallback, but a full-width target rather than a footnote. */
      .profile-flow .arrival-time-unknown {
        width: 100%;
        min-height: 44px;
        margin-top: 8px;
        padding: 0 14px;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 999px;
        color: rgba(244,241,233,.62);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .05em;
        background: rgba(255,255,255,.022);
      }

      .profile-flow .arrival-time-unknown:active {
        border-color: rgba(var(--profile-energy-soft-rgb), .58);
        color: rgba(250,249,245,.92);
      }

      /* HOW CERTAIN THE TIME IS. Three capsules in the picker's own material -
         the quiet one for the choices, the confirm capsule's rim for the chosen
         one - so the question reads as part of the picker, not a new panel. */
      .profile-flow .arrival-time-precision {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
        margin: 0 0 10px;
      }

      .profile-flow .arrival-time-precision-option {
        min-width: 0;
        min-height: 44px;
        padding: 0 6px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 999px;
        color: rgba(244,241,233,.62);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .04em;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgba(255,255,255,.022);
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }

      .profile-flow .arrival-time-precision-option[aria-checked="true"] {
        border-color: rgba(var(--profile-energy-soft-rgb), .86);
        color: rgba(250,249,245,.96);
        box-shadow:
          0 0 2px rgba(255,255,255,.60),
          0 0 14px rgba(var(--profile-energy-rgb), .16);
      }

      /* Pressed is paint only, like every other control in the picker. */
      .profile-flow .arrival-time-precision-option:active {
        border-color: rgba(var(--profile-energy-soft-rgb), .58);
        color: rgba(250,249,245,.92);
      }

      .profile-flow .arrival-time-precision-note {
        margin: 0 6px 10px;
        color: rgba(244,241,233,.66);
        font-size: 10px;
        line-height: 1.45;
        text-align: center;
        text-wrap: pretty;
      }

      /* Each certainty shows only what it needs. Named with both card classes
         and !important because the time editor's layer modules pin the entry
         row to display:grid with !important; an unknown time has no clock. */
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="exact"] .arrival-time-precision-note,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="exact"] .arrival-time-unknown,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="approximate"] .arrival-time-unknown,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-entry,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-labels,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-quick-row,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-confirm-row {
        display: none !important;
      }

      /* In Unknown mode the "I don't know" capsule is the answer's own
         confirmation, so it takes the confirm capsule's weight. */
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-unknown {
        margin-top: 0;
        border-color: rgba(var(--profile-energy-soft-rgb), .86);
        color: rgba(250,249,245,.96);
        box-shadow:
          0 0 2px rgba(255,255,255,.60),
          0 0 14px rgba(var(--profile-energy-rgb), .16);
      }

      /* An approximate time reads as the reader's estimate, not as a record. */
      .profile-field-picker .arrival-field-value.is-approximate {
        color: rgba(250,249,245,.88);
      }

      /* An estimated time is not a placeholder: it reads as a committed value. */
      .profile-field-picker .arrival-field-value.is-estimated {
        color: rgba(250,249,245,.82);
        font-style: italic;
      }

      @media (max-width: 680px) {
        .profile-flow .arrival-time-confirm-row {
          grid-template-columns: minmax(0, 1fr) 100px;
          gap: 8px;
        }

        .profile-flow .arrival-time-ok {
          width: 100px;
        }
      }

      .arrival-time-quick:active {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.55);
        background: rgba(var(--profile-energy-rgb), 0.12);
      }

      .arrival-year-grid {
        display: none;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
        max-height: 172px;
        margin-top: 11px;
        padding: 8px;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 18px;
        background: rgba(0, 0, 0, 0.18);
        scrollbar-width: thin;
      }

      /* The grid and the calendar occupy the same box; only one of them is ever
         visible. flow-root so the calendar's own top margin stays inside the
         wrapper instead of collapsing through it and moving the whole body. */
      .arrival-date-body {
        position: relative;
        display: flow-root;
      }

      /* OPEN: laid OVER the calendar's area, all the way to the bottom of the
         card, rather than wedged in above it.
         It used to be an in-flow strip capped at 172px (118px on a short screen),
         which left the weekday header and the day grid showing underneath it -
         two competing grids of numbers at once, and only three rows of years
         visible. Filling the wrapper instead gives roughly four times the rows
         and leaves nothing to read behind them.
         Anchored rather than sized: no height is stated anywhere, so the panel is
         exactly as tall as the calendar it replaces on any screen. */
      .arrival-year-grid.is-open {
        display: grid;
        position: absolute;
        inset: 0;
        z-index: 3;
        margin-top: 0;
        /* Beats the 172px base and the 118px short-screen override, both of
           which are single-class selectors. */
        max-height: none;
        /* Years pack from the top, so a short list does not stretch its rows down
           the whole panel. */
        align-content: start;
      }

      /* The calendar keeps its SPACE but paints nothing, which is what the open
         grid is measured against. visibility rather than display: display would
         collapse the wrapper and leave the panel with no area to fill, and it
         also takes the day buttons out of the tab order for free - they must not
         be reachable behind a panel covering them. */
      .arrival-date-picker.is-year-open .arrival-calendar {
        visibility: hidden;
      }

      .arrival-year-option {
        min-height: 34px;
        border-radius: 11px;
        font-size: 11px;
      }

      .arrival-year-option.is-active {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.68);
        color: white;
        background: rgba(var(--profile-energy-rgb), 0.18);
        box-shadow: 0 0 18px rgba(var(--profile-energy-rgb), 0.12);
      }

      .arrival-calendar {
        margin-top: 12px;
      }

      /* ONE CELL, ONE DAY, NO GAPS.
         The day button IS its grid cell: seven equal columns with nothing
         between them, so the cells tile the grid edge to edge, never overlap,
         and a tap anywhere inside a cell - centre, edge or corner - is that
         day. The visible circle is drawn inside the cell, centred by layout
         rather than a transform, so the circle and the target share one centre.
         The weekday row uses the same columns, so the letters stay aligned. */
      .arrival-weekdays,
      .arrival-calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 0;
      }

      /* A tap in the calendar is a tap: no double-tap zoom deciding what the
         second of two quick taps meant. Panning and pinch-zoom stay available. */
      .arrival-calendar-grid {
        touch-action: manipulation;
      }

      .arrival-weekday {
        padding: 3px 0 5px;
        color: rgba(244, 241, 233, 0.3);
        font-size: 8px;
        font-weight: 700;
        text-align: center;
      }

      /* The target: the whole cell, transparent, square. Every size here is
         fixed by the column, so no state can move a neighbour. */
      .arrival-calendar-day {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        aspect-ratio: 1;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        color: inherit;
        font: inherit;
        background: transparent;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
      }

      /* The circle the reader sees: 3px smaller than its cell, which is the
         spacing the grid gap used to provide. Decorative - the button under it
         owns every touch. */
      .arrival-calendar-day-disc {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: calc(100% - 3px);
        aspect-ratio: 1;
        border-color: transparent;
        border-radius: 50%;
        font-size: 11px;
        line-height: 1;
        pointer-events: none;
      }

      /* Blank cells before and after the month hold the six-week frame and
         nothing else: not buttons, not hit targets. */
      .arrival-calendar-spacer {
        display: block;
        aspect-ratio: 1;
        pointer-events: none;
      }

      .arrival-calendar-day.is-today .arrival-calendar-day-disc {
        border-color: rgba(255, 255, 255, 0.16);
      }

      /* The rim marks the chosen day; the glass layer owns every circle's fill
         and keeps it transparent, so the number stays light. A dark number
         here was written for a solid fill the glass never lets through, and
         left the chosen day's number almost invisible. */
      .arrival-calendar-day.is-selected .arrival-calendar-day-disc {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.78);
        color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 0 20px rgba(var(--profile-energy-rgb), 0.24);
      }

      .arrival-calendar-day:disabled {
        cursor: default;
      }

      .arrival-calendar-day:disabled .arrival-calendar-day-disc {
        opacity: 0.18;
      }

      .arrival-time-picker {
        padding: 18px 16px 16px;
      }

      .arrival-time-caption {
        margin: 0 0 13px;
        color: rgba(244, 241, 233, 0.42);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-align: center;
        text-transform: uppercase;
      }

      .arrival-time-entry {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr);
        gap: 8px;
        align-items: center;
        width: min(100%, 270px);
        margin: 0 auto;
      }

      .arrival-time-input {
        width: 100%;
        height: 58px;
        padding: 0 8px;
        border: 1px solid rgba(255, 255, 255, 0.11);
        border-radius: 18px;
        outline: 0;
        color: rgba(250, 249, 245, 0.98);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 27px;
        text-align: center;
        background: rgba(255, 255, 255, 0.045);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
      }

      .arrival-time-input:focus {
        border-color: rgba(var(--profile-energy-soft-rgb), 0.68);
        background: rgba(var(--profile-energy-rgb), 0.08);
        box-shadow: 0 0 24px rgba(var(--profile-energy-rgb), 0.12);
      }

      .arrival-time-separator {
        color: rgba(var(--profile-energy-soft-rgb), 0.72);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 28px;
        text-align: center;
      }

      .arrival-time-labels {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr);
        gap: 8px;
        width: min(100%, 270px);
        margin: 6px auto 0;
      }

      .arrival-time-labels span {
        color: rgba(244, 241, 233, 0.32);
        font-size: 7px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-align: center;
        text-transform: uppercase;
      }

      .arrival-time-quick-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-top: 14px;
      }

      .arrival-time-quick {
        min-height: 32px;
        border-radius: 12px;
        font-size: 9px;
        letter-spacing: 0.04em;
      }

      @media (max-width: 680px) {
        .arrival-picker-host.is-open {
          max-height: 400px;
        }

        .arrival-glass-picker {
          padding: 12px;
          border-radius: 22px;
        }

        .arrival-period-row {
          grid-template-columns: 47px 36px minmax(0, 1fr) 36px;
          gap: 5px;
        }

        .arrival-period-button {
          width: 36px;
          height: 32px;
        }

        .arrival-period-main {
          height: 32px;
          padding: 0 8px;
          font-size: 11px;
        }

        .arrival-calendar-day-disc {
          font-size: 10px;
        }
      }

      @media (max-height: 690px) {
        .arrival-picker-host.is-open {
          max-height: 330px;
        }

        .arrival-glass-picker {
          padding: 10px;
        }

        .arrival-year-grid {
          max-height: 118px;
        }

        .arrival-calendar {
          margin-top: 8px;
        }


        .arrival-time-input {
          height: 48px;
          font-size: 23px;
        }
      }

      /* Seven 44px days need 308px. At 375px the date card's own 12px sides
         left 304, so on narrow phones the DATE card gives back 4px a side; the
         calendar is the only thing in it that needed the room. */
      @media (max-width: 400px) {
        .arrival-glass-picker.arrival-date-picker {
          padding-right: 8px;
          padding-left: 8px;
        }
      }

      /* Only a genuinely short screen shortens the cells, and then the days are
         never squeezed: the target keeps the full column width and a 38px
         height, and the circle stays round inside it. This replaces a 29px cap
         that applied from 690px down and turned every day into a 29px dot. */
      @media (max-height: 600px) {
        .arrival-calendar-day,
        .arrival-calendar-spacer {
          aspect-ratio: auto;
          height: 38px;
        }

        .arrival-calendar-day-disc {
          width: auto;
          height: calc(100% - 3px);
        }
      }

      @media (max-height: 580px) {
        .arrival-calendar-day,
        .arrival-calendar-spacer {
          height: 36px;
        }
      }
    `;
        document.head.append(style);
        const pad = (value) => String(value).padStart(2, '0');
        const isoDate = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;
        /* Six weeks, always: the calendar never changes height between months. */
        const CALENDAR_CELLS = 42;
        const parseDateValue = (value) => {
            const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
            if (!match)
                return null;
            const year = Number(match[1]);
            const month = Number(match[2]) - 1;
            const day = Number(match[3]);
            const parsed = new Date(year, month, day);
            if (parsed.getFullYear() !== year || parsed.getMonth() !== month || parsed.getDate() !== day)
                return null;
            return parsed;
        };
        const selectedDate = () => parseDateValue(birthDateInput.value);
        const formatDate = (date) => new Intl.DateTimeFormat(dateLocale(), {
            day: 'numeric', month: 'long', year: 'numeric',
        }).format(date);
        const updateDateDisplay = () => {
            const date = selectedDate();
            dateValue.textContent = date ? formatDate(date) : t('onb.arrival.chooseDate');
            dateValue.classList.toggle('is-placeholder', !date);
        };
        const validTimeParts = (hourText, minuteText) => {
            if (!/^\d{1,2}$/.test(hourText) || !/^\d{1,2}$/.test(minuteText))
                return null;
            const hour = Number(hourText);
            const minute = Number(minuteText);
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59)
                return null;
            return { hour, minute };
        };
        const updateTimeDisplay = () => {
            /* Three answers and an open question. An unknown time is a real answer,
               so the row shows it as one - never as 12:00, and never as the "choose a
               time" placeholder it no longer is - and an approximate time never looks
               like an exact one. */
            const precision = birthTimePrecisionOfInput(birthTimeInput);
            if (precision === 'unknown') {
                timeValue.textContent = birthTimeText({ birthTime: '', birthTimePrecision: 'unknown' });
                timeValue.classList.remove('is-placeholder', 'is-approximate');
                timeValue.classList.add('is-estimated');
                return;
            }
            const match = /^(\d{2}):(\d{2})$/.exec(birthTimeInput.value);
            timeValue.textContent = match && precision
                ? birthTimeText({ birthTime: `${match[1]}:${match[2]}`, birthTimePrecision: precision })
                : t('onb.arrival.chooseTime');
            timeValue.classList.toggle('is-placeholder', !match);
            timeValue.classList.toggle('is-approximate', Boolean(match) && precision === 'approximate');
            timeValue.classList.remove('is-estimated');
        };
        const dispatchInput = (input) => {
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        };
        const closePicker = () => {
            activePicker = null;
            yearGridOpen = false;
            pickerHost.classList.remove('is-open');
            pickerHost.replaceChildren();
            dateField.classList.remove('is-open');
            timeField.classList.remove('is-open');
            arrivalForm.classList.remove('has-custom-picker');
        };
        const renderYearGrid = (container) => {
            container.replaceChildren();
            for (let year = maxYear; year >= minYear; year -= 1) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'arrival-year-option';
                button.textContent = String(year);
                button.dataset.year = String(year);
                if (year === visibleYear)
                    button.classList.add('is-active');
                button.addEventListener('click', () => {
                    visibleYear = year;
                    if (visibleYear === maxYear && visibleMonth > today.getMonth())
                        visibleMonth = today.getMonth();
                    yearGridOpen = false;
                    renderDatePicker();
                });
                container.append(button);
            }
            window.requestAnimationFrame(() => {
                container.querySelector('.arrival-year-option.is-active')?.scrollIntoView({ block: 'center' });
            });
        };
        /*
         * A day was chosen. The date is the button's own. A confirmation step, if
         * one is installed, claims the choice by cancelling the event and keeps it
         * as a draft until OK; otherwise the date is committed straight away.
         */
        const chooseDay = (button) => {
            const date = button.dataset.date ?? '';
            if (button.disabled || !parseDateValue(date))
                return;
            const detail = { date };
            const unclaimed = button.dispatchEvent(new CustomEvent(ARRIVAL_DAY_CHOSEN, {
                bubbles: true, cancelable: true, detail,
            }));
            if (!unclaimed)
                return;
            birthDateInput.value = date;
            dispatchInput(birthDateInput);
            updateDateDisplay();
            closePicker();
        };
        const shiftMonth = (delta) => {
            const next = new Date(visibleYear, visibleMonth + delta, 1);
            if (next.getFullYear() < minYear || next.getFullYear() > maxYear)
                return;
            if (next.getFullYear() === maxYear && next.getMonth() > today.getMonth())
                return;
            visibleYear = next.getFullYear();
            visibleMonth = next.getMonth();
            renderDatePicker();
        };
        const shiftYear = (delta) => {
            visibleYear = Math.max(minYear, Math.min(maxYear, visibleYear + delta));
            if (visibleYear === maxYear && visibleMonth > today.getMonth())
                visibleMonth = today.getMonth();
            renderDatePicker();
        };
        const renderDatePicker = () => {
            pickerHost.replaceChildren();
            const card = document.createElement('div');
            card.className = `arrival-glass-picker arrival-date-picker${yearGridOpen ? ' is-year-open' : ''}`;
            const controls = document.createElement('div');
            controls.innerHTML = `
        <div class="arrival-period-row">
          <span class="arrival-period-label">${t('onb.picker.year')}</span>
          <button class="arrival-period-button" type="button" data-date-action="year-prev" aria-label="${t('onb.picker.prevYear')}">‹</button>
          <button class="arrival-period-main year-main" type="button" data-date-action="year-grid">
            <strong>${visibleYear}</strong><span class="arrival-period-hint">${t('onb.picker.changeYear')}</span>
          </button>
          <button class="arrival-period-button" type="button" data-date-action="year-next" aria-label="${t('onb.picker.nextYear')}">›</button>
        </div>
        <div class="arrival-period-row">
          <span class="arrival-period-label">${t('onb.picker.month')}</span>
          <button class="arrival-period-button" type="button" data-date-action="month-prev" aria-label="${t('onb.picker.prevMonth')}">‹</button>
          <button class="arrival-period-main" type="button" tabindex="-1" aria-hidden="true">${capitalised(monthName(visibleMonth))}</button>
          <button class="arrival-period-button" type="button" data-date-action="month-next" aria-label="${t('onb.picker.nextMonth')}">›</button>
        </div>
      `;
            card.append(controls);
            /* The year grid and the calendar share one positioned box so the open grid
               can be laid over the calendar's exact area rather than pushing it down
               the card. The wrapper exists whether or not the grid is open, so opening
               it cannot move anything. */
            const body = document.createElement('div');
            body.className = 'arrival-date-body';
            card.append(body);
            const yearGrid = document.createElement('div');
            yearGrid.className = `arrival-year-grid${yearGridOpen ? ' is-open' : ''}`;
            body.append(yearGrid);
            if (yearGridOpen)
                renderYearGrid(yearGrid);
            const calendar = document.createElement('div');
            calendar.className = 'arrival-calendar';
            const weekdays = document.createElement('div');
            weekdays.className = 'arrival-weekdays';
            for (const weekday of weekdayNames()) {
                const item = document.createElement('span');
                item.className = 'arrival-weekday';
                item.textContent = weekday;
                weekdays.append(item);
            }
            calendar.append(weekdays);
            const grid = document.createElement('div');
            grid.className = 'arrival-calendar-grid';
            grid.setAttribute('role', 'group');
            grid.setAttribute('aria-label', `${capitalised(monthName(visibleMonth))} ${visibleYear}`);
            const first = new Date(visibleYear, visibleMonth, 1);
            const mondayOffset = (first.getDay() + 6) % 7;
            const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
            const selected = selectedDate();
            const spacer = () => {
                const cell = document.createElement('span');
                cell.className = 'arrival-calendar-spacer';
                cell.setAttribute('aria-hidden', 'true');
                return cell;
            };
            for (let index = 0; index < mondayOffset; index += 1)
                grid.append(spacer());
            /*
             * ONE BUTTON, ONE DATE, ONE HANDLER.
             * Each day is rendered with the exact date it stands for, and its click
             * hands over that date and nothing else. Nothing downstream reads the
             * date back out of the header text, the number printed on the circle or
             * the button's position in the grid - the ways a tap on 19 could be
             * turned into some other day.
             */
            for (let day = 1; day <= daysInMonth; day += 1) {
                const date = new Date(visibleYear, visibleMonth, day);
                const stamp = date.getTime();
                const isSelected = selected !== null && selected.getTime() === stamp;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'arrival-calendar-day';
                button.dataset.date = isoDate(visibleYear, visibleMonth, day);
                button.setAttribute('aria-label', formatDate(date));
                button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
                button.disabled = stamp > todayStamp;
                if (stamp === todayStamp) {
                    button.classList.add('is-today');
                    button.setAttribute('aria-current', 'date');
                }
                if (isSelected)
                    button.classList.add('is-selected');
                const disc = document.createElement('span');
                disc.className = 'arrival-calendar-day-disc';
                disc.setAttribute('aria-hidden', 'true');
                disc.textContent = String(day);
                button.append(disc);
                button.addEventListener('click', () => chooseDay(button));
                grid.append(button);
            }
            while (grid.childElementCount < CALENDAR_CELLS)
                grid.append(spacer());
            calendar.append(grid);
            body.append(calendar);
            pickerHost.append(card);
            controls.querySelector('[data-date-action="year-prev"]')?.addEventListener('click', () => shiftYear(-1));
            controls.querySelector('[data-date-action="year-next"]')?.addEventListener('click', () => shiftYear(1));
            controls.querySelector('[data-date-action="month-prev"]')?.addEventListener('click', () => shiftMonth(-1));
            controls.querySelector('[data-date-action="month-next"]')?.addEventListener('click', () => shiftMonth(1));
            controls.querySelector('[data-date-action="year-grid"]')?.addEventListener('click', () => {
                yearGridOpen = !yearGridOpen;
                renderDatePicker();
            });
        };
        const commitTime = (hourInput, minuteInput) => {
            /* Unknown has no clock. A late blur from a field that has just been
               hidden must not bring a time back. */
            if (timeMode === 'unknown')
                return;
            const parts = validTimeParts(hourInput.value, minuteInput.value);
            if (!parts)
                return;
            // Typing a real time answers the question differently, so "unknown" is
            // withdrawn here rather than left to shadow a value the user can see -
            // and the time is committed with the certainty the picker is set to.
            setBirthTimePrecision(birthTimeInput, timeMode);
            birthTimeInput.value = `${pad(parts.hour)}:${pad(parts.minute)}`;
            dispatchInput(birthTimeInput);
            updateTimeDisplay();
        };
        const commitUnknownTime = () => {
            timeMode = 'unknown';
            setBirthTimePrecision(birthTimeInput, 'unknown');
            dispatchInput(birthTimeInput);
            updateTimeDisplay();
            closePicker();
        };
        const renderTimePicker = () => {
            pickerHost.replaceChildren();
            const card = document.createElement('div');
            card.className = 'arrival-glass-picker arrival-time-picker';
            const existing = /^(\d{2}):(\d{2})$/.exec(birthTimeInput.value);
            timeMode = birthTimePrecisionOfInput(birthTimeInput) ?? 'exact';
            const precisionOption = (precision, key) => (`<button class="arrival-time-precision-option" type="button" role="radio" data-precision="${precision}">${t(key)}</button>`);
            card.innerHTML = `
        <div class="arrival-time-precision" role="radiogroup" aria-label="${t('onb.time.precisionAria')}">
          ${precisionOption('exact', 'onb.time.precision.exact')}
          ${precisionOption('approximate', 'onb.time.precision.approximate')}
          ${precisionOption('unknown', 'onb.time.precision.unknown')}
        </div>
        <p class="arrival-time-precision-note" aria-live="polite"></p>
        <p class="arrival-time-caption">${t('onb.picker.timeCaption')}</p>
        <div class="arrival-time-entry">
          <input class="arrival-time-input" id="arrival-hour" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" placeholder="HH" aria-label="${t('onb.picker.hourAria')}" value="${existing?.[1] ?? ''}" />
          <span class="arrival-time-separator">:</span>
          <input class="arrival-time-input" id="arrival-minute" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" placeholder="MM" aria-label="${t('onb.picker.minuteAria')}" value="${existing?.[2] ?? ''}" />
        </div>
        <div class="arrival-time-labels"><span>${t('onb.picker.hour')}</span><span></span><span>${t('onb.picker.minute')}</span></div>
        <div class="arrival-time-quick-row" aria-label="${t('onb.picker.quickMinutes')}">
          <button class="arrival-time-quick" type="button" data-minute="00">:00</button>
          <button class="arrival-time-quick" type="button" data-minute="15">:15</button>
          <button class="arrival-time-quick" type="button" data-minute="30">:30</button>
          <button class="arrival-time-quick" type="button" data-minute="45">:45</button>
        </div>
        <div class="arrival-time-confirm-row">
          <div class="arrival-time-summary">
            <span class="arrival-time-summary-label">${t('onb.picker.selectedTime')}</span>
            <strong class="arrival-time-summary-value"></strong>
          </div>
          <button class="arrival-time-ok" type="button" data-time-action="confirm">${t('onb.picker.confirmTime')}</button>
        </div>
        <button class="arrival-time-unknown" type="button" data-time-action="unknown">${t('onb.picker.unknownTime')}</button>
      `;
            pickerHost.append(card);
            const hourInput = card.querySelector('#arrival-hour');
            const minuteInput = card.querySelector('#arrival-minute');
            if (!hourInput || !minuteInput)
                return;
            const clean = (input) => {
                input.value = input.value.replace(/\D/g, '').slice(0, 2);
            };
            const normalizeHour = () => {
                clean(hourInput);
                if (!hourInput.value)
                    return;
                hourInput.value = pad(Math.max(0, Math.min(23, Number(hourInput.value))));
                commitTime(hourInput, minuteInput);
            };
            const normalizeMinute = () => {
                clean(minuteInput);
                if (!minuteInput.value)
                    return;
                minuteInput.value = pad(Math.max(0, Math.min(59, Number(minuteInput.value))));
                commitTime(hourInput, minuteInput);
            };
            hourInput.addEventListener('input', () => {
                clean(hourInput);
                if (hourInput.value.length === 2) {
                    const value = Number(hourInput.value);
                    if (value > 23)
                        hourInput.value = '23';
                    minuteInput.focus();
                }
                commitTime(hourInput, minuteInput);
            });
            minuteInput.addEventListener('input', () => {
                clean(minuteInput);
                if (minuteInput.value.length === 2 && Number(minuteInput.value) > 59)
                    minuteInput.value = '59';
                commitTime(hourInput, minuteInput);
            });
            hourInput.addEventListener('blur', normalizeHour);
            minuteInput.addEventListener('blur', normalizeMinute);
            /* The picker used to have no visible way out: it closed when the user
               happened to tap elsewhere, which is not an action anyone can see. The
               summary mirrors what will be committed, and the two buttons below are
               the only two answers the question has. */
            const summaryValue = card.querySelector('.arrival-time-summary-value');
            const confirmButton = card.querySelector('[data-time-action="confirm"]');
            const syncConfirmRow = () => {
                const parts = validTimeParts(hourInput.value, minuteInput.value);
                if (summaryValue) {
                    summaryValue.textContent = parts
                        ? birthTimeText({ birthTime: `${pad(parts.hour)}:${pad(parts.minute)}`, birthTimePrecision: timeMode })
                        : t('onb.arrival.chooseTime');
                    summaryValue.classList.toggle('is-placeholder', !parts);
                }
                if (confirmButton)
                    confirmButton.disabled = !parts;
            };
            /*
             * THE CERTAINTY CHOICE.
             * Choosing it commits it, the same way typing a time does, so what the
             * picker shows is always what the profile holds - no Unknown on screen
             * over an exact time underneath. Unknown is a complete answer by itself.
             * Exact or Approximate re-commit the time in the fields with the new
             * certainty; with nothing typed they keep the last time the reader gave,
             * now marked the new way - or, where the answer was "unknown", withdraw
             * it and leave the question open until a time is entered.
             */
            const precisionNote = card.querySelector('.arrival-time-precision-note');
            const precisionOptions = [...card.querySelectorAll('[data-precision]')];
            const syncTimeMode = () => {
                card.dataset.timeMode = timeMode;
                for (const option of precisionOptions) {
                    const chosen = option.dataset.precision === timeMode;
                    option.setAttribute('aria-checked', chosen ? 'true' : 'false');
                    option.tabIndex = chosen ? 0 : -1;
                }
                if (precisionNote) {
                    precisionNote.textContent = timeMode === 'approximate'
                        ? t('onb.time.approximateNote')
                        : timeMode === 'unknown' ? t('onb.time.unknownNote') : '';
                }
                syncConfirmRow();
            };
            const chooseTimeMode = (mode) => {
                if (mode === timeMode)
                    return;
                timeMode = mode;
                syncTimeMode();
                if (mode !== 'unknown' && validTimeParts(hourInput.value, minuteInput.value)) {
                    commitTime(hourInput, minuteInput);
                    return;
                }
                /* Unknown hides the clock, so a clock field still holding the caret -
                   and the phone keyboard with it - lets go. Its blur cannot commit a
                   time any more: the mode is already Unknown. */
                if (mode === 'unknown') {
                    for (const clockField of [hourInput, minuteInput]) {
                        if (document.activeElement === clockField)
                            clockField.blur();
                    }
                }
                setBirthTimePrecision(birthTimeInput, mode === 'unknown' || birthTimeInput.value ? mode : null);
                dispatchInput(birthTimeInput);
                updateTimeDisplay();
            };
            for (const option of precisionOptions) {
                option.addEventListener('click', () => chooseTimeMode(option.dataset.precision));
                /* A radio group moves with the arrow keys and holds one tab stop. */
                option.addEventListener('keydown', (event) => {
                    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1
                        : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
                    if (step === 0)
                        return;
                    event.preventDefault();
                    const index = precisionOptions.indexOf(option);
                    const next = precisionOptions[(index + step + precisionOptions.length) % precisionOptions.length];
                    chooseTimeMode(next.dataset.precision);
                    next.focus({ preventScroll: true });
                });
            }
            hourInput.addEventListener('input', syncConfirmRow);
            minuteInput.addEventListener('input', syncConfirmRow);
            confirmButton?.addEventListener('click', () => {
                const parts = validTimeParts(hourInput.value, minuteInput.value);
                if (!parts)
                    return;
                hourInput.value = pad(parts.hour);
                minuteInput.value = pad(parts.minute);
                commitTime(hourInput, minuteInput);
                closePicker();
            });
            card.querySelector('[data-time-action="unknown"]')
                ?.addEventListener('click', commitUnknownTime);
            for (const quick of card.querySelectorAll('[data-minute]')) {
                quick.addEventListener('click', () => {
                    minuteInput.value = quick.dataset.minute ?? '00';
                    if (!hourInput.value)
                        hourInput.value = '12';
                    normalizeHour();
                    normalizeMinute();
                    syncConfirmRow();
                    minuteInput.focus();
                });
            }
            syncTimeMode();
            /* A user tap on the time value still puts the caret straight in the hour
               field. An OVERVIEW "Change time" edit opens this same picker
               programmatically, and there the editor must appear with the Android
               keyboard closed so the user can see the whole menu first; that path
               sets the flag below and the keyboard opens only on an explicit tap. */
            const suppressAutofocus = arrivalForm.dataset.suppressPickerAutofocus === 'true';
            delete arrivalForm.dataset.suppressPickerAutofocus;
            if (suppressAutofocus)
                return;
            /* An unknown time has no clock to type into, so no keyboard either. */
            if (timeMode === 'unknown')
                return;
            window.setTimeout(() => hourInput.focus({ preventScroll: true }), 120);
        };
        const openPicker = (kind) => {
            if (activePicker === kind) {
                closePicker();
                return;
            }
            activePicker = kind;
            yearGridOpen = false;
            dateField.classList.toggle('is-open', kind === 'date');
            timeField.classList.toggle('is-open', kind === 'time');
            arrivalForm.classList.add('has-custom-picker');
            pickerHost.classList.add('is-open');
            if (kind === 'date') {
                const selected = selectedDate();
                if (selected) {
                    visibleYear = selected.getFullYear();
                    visibleMonth = selected.getMonth();
                }
                renderDatePicker();
            }
            else {
                renderTimePicker();
            }
        };
        const activateOnKeyboard = (field, kind) => {
            field.addEventListener('click', () => openPicker(kind));
            field.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ')
                    return;
                event.preventDefault();
                openPicker(kind);
            });
        };
        activateOnKeyboard(dateField, 'date');
        activateOnKeyboard(timeField, 'time');
        arrivalBack?.addEventListener('click', closePicker);
        profileFlow.addEventListener('transitionend', () => {
            if (profileFlow.dataset.step !== 'arrival')
                closePicker();
        });
        document.addEventListener('pointerdown', (event) => {
            if (!activePicker)
                return;
            const target = event.target;
            if (pickerHost.contains(target) || dateField.contains(target) || timeField.contains(target))
                return;
            closePicker();
        });
        /* The time can change from outside the picker - a restored profile, a QA
           preset, an edit rolled back - and every one of those announces it on the
           input. Without this the row kept saying "Choose time" over a restored
           time. The language switch re-words the answer too ("Approx.", "Not
           known"), which no dictionary stamp may do over a reader's own value. */
        birthTimeInput.addEventListener('input', updateTimeDisplay);
        birthTimeInput.addEventListener('change', updateTimeDisplay);
        document.addEventListener(LOCALE_CHANGED_EVENT, updateTimeDisplay);
        updateDateDisplay();
        updateTimeDisplay();
    }
}
