const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.onboardingTapHighlightPolish = 'true';
    style.textContent = `
    /* Android/Chromium paints a native tap-highlight rectangle behind clickable
       elements. On rounded glass capsules that rectangle can visibly extend past
       the border radius. Suppress only that transient touch overlay; existing
       button geometry, active effects and keyboard focus-visible styling remain
       untouched. */
    #place-experience button,
    #place-experience a,
    #place-experience [role="button"],
    #place-experience input,
    #place-experience select,
    #place-experience textarea,
    #place-experience label {
      -webkit-tap-highlight-color: transparent !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
