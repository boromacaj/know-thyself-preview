import { t } from './app/i18n/uiStrings.js?v=f9ab0a6';
const profileFlow = document.querySelector('.profile-flow');
const birthDateInput = document.querySelector('#profile-birth-date');
if (profileFlow instanceof HTMLElement && birthDateInput instanceof HTMLInputElement) {
    const dateField = birthDateInput.closest('.profile-field-picker');
    const pickerHost = profileFlow.querySelector('.arrival-picker-host');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const weekdayNames = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const parseStoredDate = (value) => {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
        if (!match)
            return null;
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);
        const stamp = new Date(Date.UTC(year, month, day));
        if (stamp.getUTCFullYear() !== year
            || stamp.getUTCMonth() !== month
            || stamp.getUTCDate() !== day)
            return null;
        return { year, month, day };
    };
    const formatDateWithWeekday = ({ year, month, day }) => {
        const weekday = weekdayNames[new Date(Date.UTC(year, month, day)).getUTCDay()];
        return `${day} ${monthNames[month]} ${year}, ${weekday}`;
    };
    const parseVisibleDate = (value) => {
        const clean = value.split(',')[0]?.trim() ?? '';
        const match = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(clean);
        if (!match)
            return null;
        const day = Number(match[1]);
        const month = monthNames.indexOf(match[2]);
        const year = Number(match[3]);
        if (month < 0)
            return null;
        return parseStoredDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    };
    let committedFrame = 0;
    const syncCommittedDate = () => {
        window.cancelAnimationFrame(committedFrame);
        committedFrame = window.requestAnimationFrame(() => {
            const parsed = parseStoredDate(birthDateInput.value);
            if (!parsed || !(dateField instanceof HTMLElement))
                return;
            const value = dateField.querySelector('.arrival-field-value');
            if (!(value instanceof HTMLElement))
                return;
            const formatted = formatDateWithWeekday(parsed);
            value.textContent = formatted;
            value.classList.remove('is-placeholder');
            dateField.setAttribute('aria-label', `Date of arrival: ${formatted}`);
        });
    };
    const syncDraftSummary = () => {
        if (!(pickerHost instanceof HTMLElement))
            return;
        const summary = pickerHost.querySelector('.arrival-date-summary-value');
        if (!(summary instanceof HTMLElement))
            return;
        const text = summary.textContent?.trim() ?? '';
        if (!text || text === t('onb.picker.chooseDay'))
            return;
        const parsed = parseVisibleDate(text);
        if (!parsed)
            return;
        const formatted = formatDateWithWeekday(parsed);
        if (text !== formatted)
            summary.textContent = formatted;
    };
    const observer = pickerHost instanceof HTMLElement
        ? new MutationObserver(() => syncDraftSummary())
        : null;
    observer?.observe(pickerHost, { childList: true, subtree: true, characterData: true });
    birthDateInput.addEventListener('input', syncCommittedDate);
    birthDateInput.addEventListener('change', syncCommittedDate);
    syncCommittedDate();
    syncDraftSummary();
    window.addEventListener('pagehide', () => {
        window.cancelAnimationFrame(committedFrame);
        observer?.disconnect();
        birthDateInput.removeEventListener('input', syncCommittedDate);
        birthDateInput.removeEventListener('change', syncCommittedDate);
    }, { once: true });
}
