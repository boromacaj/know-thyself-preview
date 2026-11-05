import { dateLocale } from './app/i18n/dateLocale.js?v=53c0693';
import { t } from './app/i18n/uiStrings.js?v=53c0693';
import { ARRIVAL_DAY_CHOSEN } from './arrivalDayChoice.js?v=53c0693';
const profileFlow = document.querySelector('.profile-flow');
const birthDateInput = document.querySelector('#profile-birth-date');
if (profileFlow instanceof HTMLElement && birthDateInput instanceof HTMLInputElement) {
    const dateField = birthDateInput.closest('.profile-field-picker');
    const pickerHost = profileFlow.querySelector('.arrival-picker-host');
    /* Generated, not written out: this list has to match the month names the
       picker header renders, and the header now asks Intl for them. A second
       hand-written English list would read the header correctly in English and
       fail to find any month in every other language. */
    const capitalised = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    const monthNames = () => Array.from({ length: 12 }, (unused, index) => capitalised(new Intl.DateTimeFormat(dateLocale(), { month: 'long' }).format(new Date(2000, index, 1))));
    if (dateField instanceof HTMLElement && pickerHost instanceof HTMLElement) {
        let draftDate = null;
        let dateSessionOpen = false;
        let monthGridOpen = false;
        let decorateFrame = 0;
        const parseStoredDate = (value) => {
            const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
            if (!match)
                return null;
            const year = Number(match[1]);
            const month = Number(match[2]) - 1;
            const day = Number(match[3]);
            if (month < 0 || month > 11 || day < 1 || day > 31)
                return null;
            return { year, month, day };
        };
        const pad = (value) => String(value).padStart(2, '0');
        const isoOf = (draft) => `${draft.year}-${pad(draft.month + 1)}-${pad(draft.day)}`;
        const formatDraft = (draft) => new Intl.DateTimeFormat(dateLocale(), {
            day: 'numeric', month: 'long', year: 'numeric',
        }).format(new Date(draft.year, draft.month, draft.day));
        const getVisiblePeriod = (card) => {
            const rows = [...card.querySelectorAll('.arrival-period-row')];
            const yearText = rows[0]?.querySelector('.year-main strong')?.textContent?.trim() ?? '';
            const monthButton = rows[1]?.querySelector('.arrival-period-main') ?? null;
            const monthText = monthButton?.textContent?.trim() ?? '';
            const year = Number(yearText);
            const month = monthNames().indexOf(monthText);
            return {
                year: Number.isFinite(year) ? year : null,
                month: month >= 0 ? month : null,
                monthButton,
            };
        };
        /* The draft is matched to the button that carries its date - the button's
           own `data-date`, never the printed number or the header text. */
        const syncDraftHighlight = (card) => {
            const draft = draftDate ? isoOf(draftDate) : null;
            for (const dayButton of card.querySelectorAll('.arrival-calendar-day')) {
                const chosen = draft !== null && dayButton.dataset.date === draft;
                dayButton.classList.toggle('is-selected', chosen);
                const pressed = chosen ? 'true' : 'false';
                if (dayButton.getAttribute('aria-pressed') !== pressed)
                    dayButton.setAttribute('aria-pressed', pressed);
            }
        };
        const syncFooter = (card) => {
            let footer = card.querySelector('.arrival-date-confirm-row');
            if (!footer) {
                footer = document.createElement('div');
                footer.className = 'arrival-date-confirm-row';
                footer.innerHTML = `
          <div class="arrival-date-summary">
            <span class="arrival-date-summary-label">${t('onb.picker.selectedDate')}</span>
            <strong class="arrival-date-summary-value">${t('onb.picker.chooseDay')}</strong>
          </div>
          <button class="arrival-date-ok" type="button" disabled>${t('onb.action.ok')}</button>
        `;
                card.append(footer);
            }
            const summary = footer.querySelector('.arrival-date-summary-value');
            const ok = footer.querySelector('.arrival-date-ok');
            /* Written when the draft CHANGES, not on every pass. The weekday module
               appends the day of the week to this text; rewriting it on every
               decoration pass made the two observers undo each other every frame -
               94 rewrites a second, each one re-decorating the whole calendar, for as
               long as it stayed open with a day chosen. */
            const draftKey = draftDate ? isoOf(draftDate) : '';
            if (summary && footer.dataset.draft !== draftKey) {
                summary.textContent = draftDate ? formatDraft(draftDate) : t('onb.picker.chooseDay');
                footer.dataset.draft = draftKey;
            }
            if (ok)
                ok.disabled = !draftDate;
        };
        const renderMonthGrid = (card) => {
            card.querySelector('.arrival-month-grid')?.remove();
            card.classList.toggle('is-month-selecting', monthGridOpen);
            if (!monthGridOpen)
                return;
            const period = getVisiblePeriod(card);
            const grid = document.createElement('div');
            grid.className = 'arrival-month-grid';
            grid.setAttribute('aria-label', t('onb.picker.chooseMonth'));
            monthNames().forEach((month, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'arrival-month-option';
                if (index === period.month)
                    button.classList.add('is-active');
                button.dataset.monthIndex = String(index);
                button.textContent = month;
                grid.append(button);
            });
            const rows = card.querySelectorAll('.arrival-period-row');
            rows[1]?.insertAdjacentElement('afterend', grid);
        };
        const decorateDatePicker = () => {
            const card = pickerHost.querySelector('.arrival-date-picker');
            const isOpen = pickerHost.classList.contains('is-open') && dateField.classList.contains('is-open');
            if (!isOpen || !card) {
                if (dateSessionOpen) {
                    dateSessionOpen = false;
                    draftDate = null;
                    monthGridOpen = false;
                }
                return;
            }
            if (!dateSessionOpen) {
                dateSessionOpen = true;
                draftDate = parseStoredDate(birthDateInput.value);
                monthGridOpen = false;
            }
            const period = getVisiblePeriod(card);
            if (period.monthButton) {
                period.monthButton.tabIndex = 0;
                period.monthButton.removeAttribute('aria-hidden');
                period.monthButton.dataset.dateAction = 'month-grid';
                period.monthButton.setAttribute('aria-label', t('onb.picker.chooseMonth'));
                period.monthButton.setAttribute('aria-expanded', monthGridOpen ? 'true' : 'false');
            }
            syncDraftHighlight(card);
            syncFooter(card);
            renderMonthGrid(card);
        };
        const scheduleDecorate = () => {
            window.cancelAnimationFrame(decorateFrame);
            decorateFrame = window.requestAnimationFrame(decorateDatePicker);
        };
        const shiftToMonth = (targetMonth) => {
            const card = pickerHost.querySelector('.arrival-date-picker');
            if (!card)
                return;
            const period = getVisiblePeriod(card);
            if (period.month === null)
                return;
            const delta = targetMonth - period.month;
            monthGridOpen = false;
            if (delta === 0) {
                scheduleDecorate();
                return;
            }
            const action = delta > 0 ? 'month-next' : 'month-prev';
            for (let step = 0; step < Math.abs(delta); step += 1) {
                const currentButton = pickerHost.querySelector(`[data-date-action="${action}"]`);
                if (!currentButton)
                    break;
                currentButton.click();
            }
            scheduleDecorate();
        };
        const commitDraft = () => {
            if (!draftDate)
                return;
            birthDateInput.value = `${draftDate.year}-${pad(draftDate.month + 1)}-${pad(draftDate.day)}`;
            birthDateInput.dispatchEvent(new Event('input', { bubbles: true }));
            birthDateInput.dispatchEvent(new Event('change', { bubbles: true }));
            const fieldValue = dateField.querySelector('.arrival-field-value');
            if (fieldValue) {
                fieldValue.textContent = formatDraft(draftDate);
                fieldValue.classList.remove('is-placeholder');
            }
            dateSessionOpen = false;
            monthGridOpen = false;
            dateField.click();
        };
        /*
         * A DAY CLICK ONLY CREATES A DRAFT.
         * The picker's own button handler announces the day with the date the
         * button was rendered with; this claims the announcement (so the picker
         * does not commit and close) and keeps that date as the draft until OK.
         * It used to intercept the click itself and rebuild the date from the
         * header's year and month text and the number printed on the button.
         */
        const handleDayChosen = (event) => {
            const detail = event.detail;
            const card = pickerHost.querySelector('.arrival-date-picker');
            const chosen = detail ? parseStoredDate(detail.date) : null;
            if (!card || !chosen)
                return;
            event.preventDefault();
            draftDate = chosen;
            monthGridOpen = false;
            syncDraftHighlight(card);
            syncFooter(card);
        };
        const handleDatePickerClick = (event) => {
            const target = event.target;
            if (!(target instanceof Element))
                return;
            const card = target.closest('.arrival-date-picker');
            if (!card || !pickerHost.contains(card))
                return;
            const monthMain = target.closest('[data-date-action="month-grid"]');
            if (monthMain) {
                event.preventDefault();
                event.stopImmediatePropagation();
                monthGridOpen = !monthGridOpen;
                monthMain.setAttribute('aria-expanded', monthGridOpen ? 'true' : 'false');
                renderMonthGrid(card);
                return;
            }
            const monthOption = target.closest('.arrival-month-option');
            if (monthOption) {
                event.preventDefault();
                event.stopImmediatePropagation();
                const targetMonth = Number(monthOption.dataset.monthIndex);
                if (Number.isInteger(targetMonth) && targetMonth >= 0 && targetMonth <= 11)
                    shiftToMonth(targetMonth);
                return;
            }
            const okButton = target.closest('.arrival-date-ok');
            if (okButton) {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (!okButton.disabled)
                    commitDraft();
            }
        };
        const observer = new MutationObserver(scheduleDecorate);
        observer.observe(pickerHost, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        observer.observe(dateField, { attributes: true, attributeFilter: ['class'] });
        profileFlow.addEventListener('click', handleDatePickerClick, true);
        pickerHost.addEventListener(ARRIVAL_DAY_CHOSEN, handleDayChosen);
        const style = document.createElement('style');
        style.dataset.arrivalDateConfirmationPolish = 'true';
        style.textContent = `
      /* The month value is a real selector, not dead text between two arrows. */
      .profile-flow .arrival-date-picker [data-date-action="month-grid"] {
        cursor: pointer !important;
      }

      .profile-flow .arrival-month-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
        margin-top: 10px;
        padding: 9px;
        border: 1px solid rgba(var(--profile-energy-soft-rgb), .18);
        border-radius: 20px;
        background: rgba(255,255,255,.022);
      }

      .profile-flow .arrival-month-option {
        min-height: 36px;
        padding: 0 8px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 999px;
        color: rgba(248,247,242,.78);
        font-size: 10px;
        background: rgba(255,255,255,.026);
      }

      .profile-flow .arrival-month-option.is-active {
        border-color: rgba(var(--profile-energy-soft-rgb), .76);
        color: rgba(255,255,255,.96);
        box-shadow:
          0 0 2px rgba(255,255,255,.48),
          0 0 16px rgba(var(--profile-energy-rgb), .16);
      }

      .profile-flow .arrival-date-picker.is-month-selecting .arrival-calendar,
      .profile-flow .arrival-date-picker.is-month-selecting .arrival-year-grid {
        display: none !important;
      }

      /* A day click only creates a draft. The date leaves the calendar only after
         the user sees the complete value and explicitly confirms it with OK. */
      .profile-flow .arrival-date-confirm-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 82px;
        gap: 10px;
        align-items: center;
        margin-top: 12px;
      }

      .profile-flow .arrival-date-summary {
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

      .profile-flow .arrival-date-summary-label {
        color: rgba(244,241,233,.34);
        font-size: 7px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
      }

      .profile-flow .arrival-date-summary-value {
        min-width: 0;
        overflow: hidden;
        color: rgba(250,249,245,.94);
        font-size: 12px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .profile-flow .arrival-date-ok {
        width: 82px;
        height: 46px;
        border: 1px solid rgba(var(--profile-energy-soft-rgb), .86);
        border-radius: 999px;
        color: rgba(250,249,245,.96);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
        background: transparent;
        box-shadow:
          0 0 2px rgba(255,255,255,.60),
          0 0 14px rgba(var(--profile-energy-rgb), .16);
      }

      .profile-flow .arrival-date-ok:disabled {
        border-color: rgba(255,255,255,.13);
        color: rgba(244,243,238,.28);
        box-shadow: none;
      }

      @media (max-width: 680px) {
        .profile-flow .arrival-month-grid {
          gap: 6px;
          padding: 8px;
        }

        .profile-flow .arrival-date-confirm-row {
          grid-template-columns: minmax(0, 1fr) 76px;
          gap: 8px;
        }

        .profile-flow .arrival-date-ok {
          width: 76px;
        }
      }
    `;
        document.head.append(style);
        scheduleDecorate();
        window.addEventListener('pagehide', () => {
            window.cancelAnimationFrame(decorateFrame);
            observer.disconnect();
            profileFlow.removeEventListener('click', handleDatePickerClick, true);
            pickerHost.removeEventListener(ARRIVAL_DAY_CHOSEN, handleDayChosen);
            style.remove();
        }, { once: true });
    }
}
