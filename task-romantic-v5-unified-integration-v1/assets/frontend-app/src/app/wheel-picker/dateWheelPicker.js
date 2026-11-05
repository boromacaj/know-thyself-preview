import { dateLocale } from '../i18n/dateLocale.js?v=d9a1a90';
import { clampDate, daysInMonth, dayRange, formatIsoDate, monthRange, parseIsoDate, weekdayOf, } from './calendarMath.js?v=d9a1a90';
import { createWheel } from './wheel.js?v=d9a1a90';
import { ensureWheelStyle } from './wheelStyle.js?v=d9a1a90';
const todayLocal = () => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
};
const capitalised = (word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
/** A calendar date written out; the Date is built in UTC and formatted in UTC, so the local zone never touches it. */
const writeOut = (date, locale, options) => (new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(new Date(Date.UTC(date.year, date.month - 1, date.day))));
export function createDateWheelPicker(options) {
    ensureWheelStyle();
    const maxParsed = options.maxDate ? parseIsoDate(options.maxDate) : null;
    const bounds = { min: { year: options.minYear ?? 1900, month: 1, day: 1 }, max: maxParsed ?? todayLocal() };
    const fallbackStart = options.start ?? { year: 1990, month: 1, day: 1 };
    let state = clampDate(parseIsoDate(options.value ?? '') ?? fallbackStart, bounds);
    const locale = () => dateLocale();
    const monthNames = () => Array.from({ length: 12 }, (_, index) => capitalised(new Intl.DateTimeFormat(locale(), { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, index, 15)))));
    /* index 0 is Sunday: 2024-01-07 was a Sunday */
    const weekdayNames = () => Array.from({ length: 7 }, (_, index) => (new Intl.DateTimeFormat(locale(), { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, 7 + index))).replace(/\.$/, '')));
    let months = monthNames();
    let weekdays = weekdayNames();
    const root = document.createElement('div');
    root.className = 'kt-wheel-picker kt-date-wheel-picker';
    /* no date yet: the wheels rest on a neutral starting place, which must not read as an answer until a wheel is turned */
    if (parseIsoDate(options.value ?? '') === null)
        root.classList.add('is-unset');
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', options.labels.group);
    const heads = document.createElement('div');
    heads.className = 'kt-wheel-heads';
    heads.setAttribute('aria-hidden', 'true');
    for (const text of [options.labels.year, options.labels.month, options.labels.day]) {
        const head = document.createElement('span');
        head.textContent = text;
        heads.append(head);
    }
    const wheels = document.createElement('div');
    wheels.className = 'kt-wheels';
    const live = document.createElement('div');
    live.className = 'kt-wheel-live';
    live.setAttribute('aria-live', 'polite');
    root.append(heads, wheels, live);
    /* what each wheel's rows are, for the state it is in */
    const years = () => bounds.max.year - bounds.min.year + 1;
    const firstMonth = () => monthRange(state.year, bounds)[0];
    const lastMonth = () => monthRange(state.year, bounds)[1];
    const firstDay = () => dayRange(state.year, state.month, bounds)[0];
    const lastDay = () => dayRange(state.year, state.month, bounds)[1];
    let yearWheel;
    let monthWheel;
    let dayWheel;
    let quiet = 0;
    const announce = () => { live.textContent = describe(); };
    const describe = () => capitalised(writeOut(state, locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    const value = () => formatIsoDate(state.year, state.month, state.day);
    /**
     * The date changed (a wheel's row, live or at rest): bring the other wheels to match. The structure first - how many months and days there are in this year and month, and
     * which of them the bounds allow - then the weekday on every day row. The day is kept if it still exists, else it becomes the last day that does.
     */
    const reshape = () => {
        quiet += 1;
        const monthCount = lastMonth() - firstMonth() + 1;
        state = clampDate(state, bounds);
        if (monthWheel.count() !== monthCount)
            monthWheel.setCount(monthCount, state.month - firstMonth());
        const dayCount = lastDay() - firstDay() + 1;
        if (dayWheel.count() !== dayCount)
            dayWheel.setCount(dayCount, state.day - firstDay());
        else if (dayWheel.index() + firstDay() !== state.day)
            dayWheel.setIndex(state.day - firstDay(), false);
        dayWheel.refresh();
        quiet -= 1;
    };
    const changed = (committed) => {
        root.classList.remove('is-unset');
        options.onLive?.(value());
        if (committed) {
            announce();
            options.onChange?.(value());
        }
    };
    yearWheel = createWheel({
        label: options.labels.year,
        count: years(),
        index: state.year - bounds.min.year,
        className: 'kt-wheel-year',
        pageStep: 10,
        render: (index, item) => { item.textContent = String(bounds.min.year + index); },
        valueText: (index) => String(bounds.min.year + index),
        valueNow: (index) => bounds.min.year + index,
        onTick: (index) => { if (quiet > 0)
            return; state = { ...state, year: bounds.min.year + index }; reshape(); changed(false); },
        onSettle: (index) => { if (quiet > 0)
            return; state = { ...state, year: bounds.min.year + index }; reshape(); changed(true); },
        onValueTap: (item) => openYearEntry(item),
    });
    monthWheel = createWheel({
        label: options.labels.month,
        count: lastMonth() - firstMonth() + 1,
        index: state.month - firstMonth(),
        className: 'kt-wheel-month',
        pageStep: 3,
        render: (index, item) => { item.textContent = months[firstMonth() + index - 1] ?? ''; },
        valueText: (index) => months[firstMonth() + index - 1] ?? '',
        valueNow: (index) => firstMonth() + index,
        onTick: (index) => { if (quiet > 0)
            return; state = { ...state, month: firstMonth() + index }; reshape(); changed(false); },
        onSettle: (index) => { if (quiet > 0)
            return; state = { ...state, month: firstMonth() + index }; reshape(); changed(true); },
    });
    const dayRow = (index, item) => {
        const day = firstDay() + index;
        let number = item.querySelector('.kt-wheel-day-number');
        let weekday = item.querySelector('.kt-wheel-day-weekday');
        if (number === null || weekday === null) {
            item.classList.add('kt-wheel-day');
            number = document.createElement('span');
            number.className = 'kt-wheel-day-number';
            weekday = document.createElement('span');
            weekday.className = 'kt-wheel-day-weekday';
            item.replaceChildren(number, weekday);
        }
        number.textContent = String(day);
        /* THE WEEKDAY OF THIS ROW, FOR THE YEAR AND MONTH THE WHEELS ARE ON NOW */
        weekday.textContent = weekdays[weekdayOf(state.year, state.month, day)] ?? '';
    };
    dayWheel = createWheel({
        label: options.labels.day,
        count: lastDay() - firstDay() + 1,
        index: state.day - firstDay(),
        className: 'kt-wheel-day-column',
        pageStep: 7,
        render: dayRow,
        valueText: (index) => `${firstDay() + index} ${weekdays[weekdayOf(state.year, state.month, firstDay() + index)] ?? ''}`,
        valueNow: (index) => firstDay() + index,
        onTick: (index) => { if (quiet > 0)
            return; state = { ...state, day: firstDay() + index }; changed(false); },
        onSettle: (index) => { if (quiet > 0)
            return; state = { ...state, day: firstDay() + index }; changed(true); },
    });
    wheels.append(yearWheel.element, monthWheel.element, dayWheel.element);
    /* ------------------------------------------------------------ direct year entry */
    const openYearEntry = (item) => {
        if (item.querySelector('input') !== null)
            return;
        const input = document.createElement('input');
        input.className = 'kt-wheel-year-input';
        input.type = 'text';
        input.inputMode = 'numeric';
        input.maxLength = 4;
        input.value = String(state.year);
        input.setAttribute('aria-label', options.labels.yearInput);
        item.replaceChildren(input);
        let done = false;
        const close = (apply) => {
            if (done)
                return;
            done = true;
            const typed = Number(input.value);
            item.textContent = String(bounds.min.year + yearWheel.index());
            if (apply && /^\d{4}$/.test(input.value) && Number.isFinite(typed)) {
                const year = Math.max(bounds.min.year, Math.min(bounds.max.year, typed));
                yearWheel.setIndex(year - bounds.min.year, true);
            }
            yearWheel.focus();
        };
        input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, '').slice(0, 4); if (input.value.length === 4)
            close(true); });
        input.addEventListener('keydown', (event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
                event.preventDefault();
                close(true);
            }
            else if (event.key === 'Escape') {
                event.preventDefault();
                close(false);
            }
        });
        input.addEventListener('blur', () => close(true));
        input.focus();
        input.select();
    };
    /* ------------------------------------------------------------ handle */
    announce();
    return {
        element: root,
        value,
        describe,
        setValue(next) {
            const parsed = parseIsoDate(next);
            if (parsed === null)
                return;
            state = clampDate(parsed, bounds);
            root.classList.remove('is-unset');
            quiet += 1;
            months = monthNames();
            weekdays = weekdayNames();
            yearWheel.setIndex(state.year - bounds.min.year, false);
            monthWheel.setCount(lastMonth() - firstMonth() + 1, state.month - firstMonth());
            dayWheel.setCount(lastDay() - firstDay() + 1, state.day - firstDay());
            yearWheel.refresh();
            monthWheel.refresh();
            dayWheel.refresh();
            quiet -= 1;
            announce();
        },
        focus: () => yearWheel.focus(),
        destroy() {
            yearWheel.destroy();
            monthWheel.destroy();
            dayWheel.destroy();
            root.remove();
        },
    };
}
export { daysInMonth };
