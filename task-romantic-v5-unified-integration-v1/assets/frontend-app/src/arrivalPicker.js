import { activeLocale, LOCALE_CHANGED_EVENT } from './app/i18n/locale.js?v=d9a1a90';
import { t } from './app/i18n/uiStrings.js?v=d9a1a90';
import { createDateWheelPicker } from './app/wheel-picker/dateWheelPicker.js?v=d9a1a90';
import { createTimeWheelPicker } from './app/wheel-picker/timeWheelPicker.js?v=d9a1a90';
import { birthTimePrecisionOfInput, birthTimeText, setBirthTimePrecision } from './birthTimeInput.js?v=d9a1a90';
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
        /* DATES ARE WRITTEN BY Intl, NOT FROM A TABLE.
           A month name has to decline with the sentence it sits in: Slovak names a
           month "august" on its own but writes a date as "28. augusta 1987". English
           is pinned to en-GB rather than plain 'en' so the existing day-first
           "28 August 1987" is preserved exactly; plain 'en' resolves to US order and
           would silently restyle every date on screen. (The wheels name their own
           months and weekdays the same way: app/wheel-picker.) */
        const dateLocale = () => (activeLocale() === 'en' ? 'en-GB' : activeLocale());
        let activePicker = null;
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
         and !important because the layer modules pin their rows with !important;
         an unknown time has no clock, so no wheels. */
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="exact"] .arrival-time-precision-note,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="exact"] .arrival-time-unknown,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="approximate"] .arrival-time-unknown,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-wheels,
      .profile-flow .arrival-glass-picker.arrival-time-picker[data-time-mode="unknown"] .arrival-time-caption,
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

      .arrival-time-picker {
        padding: 18px 16px 16px;
      }

      /* the wheels sit in the card as the clock sat there: a little room above the capsule below */
      .arrival-time-wheels {
        margin: 0 auto;
        max-width: 330px;
      }

      /* the date card's wheels likewise */
      .arrival-date-picker .kt-date-wheel-picker {
        max-width: 360px;
        margin: 0 auto;
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

      @media (max-width: 680px) {
        .arrival-picker-host.is-open {
          max-height: 400px;
        }

        .arrival-glass-picker {
          padding: 12px;
          border-radius: 22px;
        }
      }

      @media (max-height: 690px) {
        .arrival-picker-host.is-open {
          max-height: 330px;
        }

        .arrival-glass-picker {
          padding: 10px;
        }
      }
    `;
        document.head.append(style);
        const pad = (value) => String(value).padStart(2, '0');
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
        /* The wheel pickers the open card holds: released when the card closes (they own observers and listeners). */
        let openWheels = [];
        const closePicker = () => {
            activePicker = null;
            for (const wheel of openWheels)
                wheel.destroy();
            openWheels = [];
            pickerHost.classList.remove('is-open');
            pickerHost.replaceChildren();
            dateField.classList.remove('is-open');
            timeField.classList.remove('is-open');
            arrivalForm.classList.remove('has-custom-picker');
        };
        /*
         * THE DATE: THREE WHEELS - YEAR, MONTH, DAY + WEEKDAY (app/wheel-picker).
         *
         * The wheels always show a real date, so the card keeps what the calendar kept: a DRAFT. Turning a wheel changes the draft and the summary under it; nothing reaches the
         * profile until OK. With no date chosen yet the wheels start on a neutral year and OK stays closed until a wheel has been turned, so a date can never be committed by a
         * tap on OK that the person did not make. The bounds are the form's: 1900 to today, and a date in the future cannot be reached at all.
         */
        const renderDatePicker = () => {
            pickerHost.replaceChildren();
            for (const wheel of openWheels)
                wheel.destroy();
            openWheels = [];
            const card = document.createElement('div');
            card.className = 'arrival-glass-picker arrival-date-picker';
            const stored = selectedDate();
            let touched = stored !== null;
            const wheel = createDateWheelPicker({
                value: birthDateInput.value,
                labels: {
                    group: t('onb.arrival.date'), year: t('onb.picker.year'), month: t('onb.picker.month'), day: t('onb.picker.day'), yearInput: t('onb.picker.yearInputAria'),
                },
                onLive: () => { touched = true; syncDateFooter(); },
                onChange: () => { touched = true; syncDateFooter(); },
            });
            openWheels.push(wheel);
            card.append(wheel.element);
            const footer = document.createElement('div');
            footer.className = 'arrival-time-confirm-row arrival-date-confirm-row';
            footer.innerHTML = `
        <div class="arrival-time-summary arrival-date-summary">
          <span class="arrival-time-summary-label">${t('onb.picker.selectedDate')}</span>
          <strong class="arrival-time-summary-value arrival-date-summary-value"></strong>
        </div>
        <button class="arrival-time-ok arrival-date-ok" type="button">${t('onb.action.ok')}</button>
      `;
            card.append(footer);
            const summary = footer.querySelector('.arrival-date-summary-value');
            const ok = footer.querySelector('.arrival-date-ok');
            function syncDateFooter() {
                if (summary) {
                    summary.textContent = touched ? wheel.describe() : t('onb.picker.chooseDay');
                    summary.classList.toggle('is-placeholder', !touched);
                }
                if (ok)
                    ok.disabled = !touched;
            }
            syncDateFooter();
            ok?.addEventListener('click', () => {
                if (!touched)
                    return;
                birthDateInput.value = wheel.value();
                dispatchInput(birthDateInput);
                updateDateDisplay();
                closePicker();
            });
            pickerHost.append(card);
        };
        const commitTime = (value) => {
            /* Unknown has no clock. A late settle from a wheel that has just been
               hidden must not bring a time back. */
            if (timeMode === 'unknown')
                return;
            const parts = validTimeParts(value.slice(0, 2), value.slice(3, 5));
            if (!parts)
                return;
            // Turning a wheel to a real time answers the question differently, so
            // "unknown" is withdrawn here rather than left to shadow a value the user
            // can see - and the time is committed with the certainty the picker is set to.
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
        /*
         * THE TIME: TWO WHEELS - HOUR, MINUTE, on a 24-hour clock (app/wheel-picker).
         *
         * The certainty choice (exact / approximate / unknown), its notes, the summary and the confirm capsule are the card's own and are unchanged: only the way a time is
         * entered is new. A time is committed when a wheel comes to rest, the way a typed time used to be committed as it was typed, so the profile always holds what the card
         * shows. With no time chosen yet the wheels start at 12:00 as a starting place only: nothing is written - the field stays open as a question - until a wheel is turned.
         */
        const renderTimePicker = () => {
            pickerHost.replaceChildren();
            for (const wheel of openWheels)
                wheel.destroy();
            openWheels = [];
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
        <div class="arrival-time-wheels"></div>
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
            /* has a time been chosen: one was already on the profile, or a wheel has been turned */
            let hasTime = existing !== null;
            const wheel = createTimeWheelPicker({
                value: birthTimeInput.value,
                start: '12:00',
                labels: { group: t('onb.arrival.time'), hour: t('onb.picker.hour'), minute: t('onb.picker.minute') },
                onLive: () => { hasTime = true; syncConfirmRow(); },
                onChange: (value) => { hasTime = true; commitTime(value); syncConfirmRow(); },
            });
            openWheels.push(wheel);
            card.querySelector('.arrival-time-wheels')?.append(wheel.element);
            /* The picker used to have no visible way out: it closed when the user
               happened to tap elsewhere, which is not an action anyone can see. The
               summary mirrors what will be committed, and the two buttons below are
               the only two answers the question has. */
            const summaryValue = card.querySelector('.arrival-time-summary-value');
            const confirmButton = card.querySelector('[data-time-action="confirm"]');
            function syncConfirmRow() {
                const parts = hasTime ? validTimeParts(wheel.value().slice(0, 2), wheel.value().slice(3, 5)) : null;
                if (summaryValue) {
                    summaryValue.textContent = parts
                        ? birthTimeText({ birthTime: `${pad(parts.hour)}:${pad(parts.minute)}`, birthTimePrecision: timeMode })
                        : t('onb.arrival.chooseTime');
                    summaryValue.classList.toggle('is-placeholder', !parts);
                }
                if (confirmButton)
                    confirmButton.disabled = !parts;
            }
            /*
             * THE CERTAINTY CHOICE.
             * Choosing it commits it, the same way turning to a time does, so what the
             * picker shows is always what the profile holds - no Unknown on screen
             * over an exact time underneath. Unknown is a complete answer by itself.
             * Exact or Approximate re-commit the time on the wheels with the new
             * certainty; with nothing chosen they keep the last time the reader gave,
             * now marked the new way - or, where the answer was "unknown", withdraw
             * it and leave the question open until a time is chosen.
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
                if (mode !== 'unknown' && hasTime) {
                    commitTime(wheel.value());
                    return;
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
            confirmButton?.addEventListener('click', () => {
                if (!hasTime)
                    return;
                commitTime(wheel.value());
                closePicker();
            });
            card.querySelector('[data-time-action="unknown"]')
                ?.addEventListener('click', commitUnknownTime);
            syncTimeMode();
            /* An OVERVIEW "Change time" edit opens this same picker programmatically; it used to need to keep the phone keyboard closed. The wheels have no keyboard, so the flag only has
               to be cleared. */
            delete arrivalForm.dataset.suppressPickerAutofocus;
        };
        const openPicker = (kind) => {
            if (activePicker === kind) {
                closePicker();
                return;
            }
            activePicker = kind;
            dateField.classList.toggle('is-open', kind === 'date');
            timeField.classList.toggle('is-open', kind === 'time');
            arrivalForm.classList.add('has-custom-picker');
            pickerHost.classList.add('is-open');
            if (kind === 'date') {
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
