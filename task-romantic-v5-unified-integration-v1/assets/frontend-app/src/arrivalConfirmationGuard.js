import { t } from './app/i18n/uiStrings.js?v=d9a1a90';
const arrivalForm = document.querySelector('#profile-arrival-form');
const profileFlow = document.querySelector('.profile-flow');
const confirmButton = document.querySelector('#profile-create');
if (arrivalForm && profileFlow && confirmButton) {
    // The final step must be an explicit tap. A keyboard action such as Go, Done or
    // Enter (the birth place and the name are typed) must never create the profile
    // implicitly. (The time is no longer typed: it is turned on two wheels.)
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
}
