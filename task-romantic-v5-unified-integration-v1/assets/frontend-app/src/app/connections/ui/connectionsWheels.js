import { t } from '../../i18n/uiStrings.js?v=d9a1a90';
import { createDateWheelPicker } from '../../wheel-picker/dateWheelPicker.js?v=d9a1a90';
import { createTimeWheelPicker } from '../../wheel-picker/timeWheelPicker.js?v=d9a1a90';
const mounted = new WeakMap();
/** Releases the wheels a sheet host holds (call before the host's markup is replaced or emptied). */
export function unmountConnectionsWheels(host) {
    for (const wheel of mounted.get(host) ?? [])
        wheel.destroy();
    mounted.delete(host);
}
const write = (input, value) => {
    if (input.value === value)
        return;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
};
/** Mounts a wheel picker in every `[data-cx-wheel]` host of the sheet. Hosts: `data-cx-wheel="date"` or `"time"`, each followed in its field by the hidden input it writes to. */
export function mountConnectionsWheels(host) {
    unmountConnectionsWheels(host);
    const made = [];
    for (const slot of host.querySelectorAll('[data-cx-wheel]')) {
        const input = slot.parentElement?.querySelector('input[data-cx-field]');
        if (!input)
            continue;
        if (slot.dataset.cxWheel === 'date') {
            const wheel = createDateWheelPicker({
                value: input.value,
                labels: { group: slot.dataset.cxLabel ?? '', year: t('onb.picker.year'), month: t('onb.picker.month'), day: t('onb.picker.day'), yearInput: t('onb.picker.yearInputAria') },
                onLive: (value) => write(input, value),
                onChange: (value) => write(input, value),
            });
            slot.replaceChildren(wheel.element);
            made.push(wheel);
        }
        else if (slot.dataset.cxWheel === 'time') {
            const wheel = createTimeWheelPicker({
                value: input.value,
                start: '12:00',
                labels: { group: slot.dataset.cxLabel ?? '', hour: t('onb.picker.hour'), minute: t('onb.picker.minute') },
                onLive: (value) => write(input, value),
                onChange: (value) => write(input, value),
            });
            slot.replaceChildren(wheel.element);
            made.push(wheel);
        }
    }
    mounted.set(host, made);
}
