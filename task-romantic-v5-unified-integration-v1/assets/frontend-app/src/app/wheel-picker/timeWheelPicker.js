import { formatClockTime, parseClockTime } from './calendarMath.js?v=d9a1a90';
import { createWheel } from './wheel.js?v=d9a1a90';
import { ensureWheelStyle } from './wheelStyle.js?v=d9a1a90';
const two = (value) => String(value).padStart(2, '0');
export function createTimeWheelPicker(options) {
    ensureWheelStyle();
    const initial = parseClockTime(options.value ?? '') ?? parseClockTime(options.start ?? '12:00') ?? { hour: 12, minute: 0 };
    let hour = initial.hour;
    let minute = initial.minute;
    const root = document.createElement('div');
    root.className = 'kt-wheel-picker kt-time-wheel-picker';
    /* no time yet: the wheels rest on a neutral starting place, which must not read as an answer until a wheel is turned */
    if (parseClockTime(options.value ?? '') === null)
        root.classList.add('is-unset');
    root.style.setProperty('--kt-wheel-columns', '1fr 1fr');
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', options.labels.group);
    const heads = document.createElement('div');
    heads.className = 'kt-wheel-heads';
    heads.setAttribute('aria-hidden', 'true');
    for (const text of [options.labels.hour, options.labels.minute]) {
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
    const value = () => formatClockTime(hour, minute);
    const changed = (committed) => {
        root.classList.remove('is-unset');
        options.onLive?.(value());
        if (committed) {
            live.textContent = value();
            options.onChange?.(value());
        }
    };
    let quiet = 0;
    const hourWheel = createWheel({
        label: options.labels.hour,
        count: 24,
        index: hour,
        className: 'kt-wheel-hour',
        pageStep: 6,
        render: (index, item) => { item.textContent = two(index); },
        valueText: (index) => two(index),
        valueNow: (index) => index,
        onTick: (index) => { if (quiet > 0)
            return; hour = index; changed(false); },
        onSettle: (index) => { if (quiet > 0)
            return; hour = index; changed(true); },
    });
    const minuteWheel = createWheel({
        label: options.labels.minute,
        count: 60,
        index: minute,
        className: 'kt-wheel-minute',
        pageStep: 10,
        render: (index, item) => { item.textContent = two(index); },
        valueText: (index) => two(index),
        valueNow: (index) => index,
        onTick: (index) => { if (quiet > 0)
            return; minute = index; changed(false); },
        onSettle: (index) => { if (quiet > 0)
            return; minute = index; changed(true); },
    });
    const separator = document.createElement('span');
    separator.className = 'kt-time-separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = ':';
    wheels.append(hourWheel.element, minuteWheel.element, separator);
    live.textContent = value();
    return {
        element: root,
        value,
        setValue(next) {
            const parsed = parseClockTime(next);
            if (parsed === null)
                return;
            root.classList.remove('is-unset');
            quiet += 1;
            hour = parsed.hour;
            minute = parsed.minute;
            hourWheel.setIndex(hour, false);
            minuteWheel.setIndex(minute, false);
            quiet -= 1;
            live.textContent = value();
        },
        focus: () => hourWheel.focus(),
        destroy() {
            hourWheel.destroy();
            minuteWheel.destroy();
            root.remove();
        },
    };
}
