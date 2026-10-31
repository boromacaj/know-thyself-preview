import { t } from './app/i18n/uiStrings.js?v=d9f39e7';
const arrivalForm = document.querySelector('#profile-arrival-form');
const profileFlow = document.querySelector('.profile-flow');
const confirmButton = document.querySelector('#profile-create');
if (arrivalForm && profileFlow && confirmButton) {
    // The final step must be an explicit tap. Mobile keyboard actions such as Go,
    // Done or Enter are only for finishing the HH:MM edit; they must never create
    // the profile implicitly.
    confirmButton.type = 'button';
    confirmButton.textContent = t('onb.action.confirm');
    confirmButton.setAttribute('aria-label', t('onb.action.confirmAria'));
    let manualConfirmDispatch = false;
    confirmButton.addEventListener('click', () => {
        if (confirmButton.disabled)
            return;
        manualConfirmDispatch = true;
        arrivalForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        manualConfirmDispatch = false;
    });
    arrivalForm.addEventListener('submit', (event) => {
        if (manualConfirmDispatch)
            return;
        event.preventDefault();
        event.stopImmediatePropagation();
    }, true);
    const prepareTimeInputs = () => {
        const hourInput = arrivalForm.querySelector('#arrival-hour');
        const minuteInput = arrivalForm.querySelector('#arrival-minute');
        if (hourInput)
            hourInput.enterKeyHint = 'next';
        if (minuteInput)
            minuteInput.enterKeyHint = 'done';
    };
    const closeTimeEditor = (target) => {
        target.blur();
        const currentTimeField = arrivalForm.querySelector('.profile-field-picker.is-open');
        if (currentTimeField) {
            window.setTimeout(() => currentTimeField.click(), 0);
        }
        window.setTimeout(() => {
            confirmButton.focus({ preventScroll: true });
        }, 140);
    };
    const handleTimeKeyboardAction = (event) => {
        if (event.key !== 'Enter')
            return;
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.classList.contains('arrival-time-input'))
            return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const minuteInput = arrivalForm.querySelector('#arrival-minute');
        if (target.id === 'arrival-hour' && minuteInput && minuteInput.value.length === 0) {
            minuteInput.focus({ preventScroll: true });
            return;
        }
        closeTimeEditor(target);
    };
    const pickerObserver = new MutationObserver(prepareTimeInputs);
    pickerObserver.observe(arrivalForm, { childList: true, subtree: true });
    prepareTimeInputs();
    arrivalForm.addEventListener('keydown', handleTimeKeyboardAction, true);
    window.addEventListener('pagehide', () => {
        pickerObserver.disconnect();
        arrivalForm.removeEventListener('keydown', handleTimeKeyboardAction, true);
    }, { once: true });
}
