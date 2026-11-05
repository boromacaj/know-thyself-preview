const profileFlow = document.querySelector('.profile-flow');
if (profileFlow instanceof HTMLElement) {
    const identityInputs = [
        ...profileFlow.querySelectorAll('.profile-panel-identity input[type="text"]'),
    ];
    const syncIdentityField = (input) => {
        const field = input.closest('.profile-field');
        if (!(field instanceof HTMLElement))
            return;
        field.classList.toggle('is-filled', input.value.trim().length > 0);
    };
    const syncAllIdentityFields = () => {
        for (const input of identityInputs)
            syncIdentityField(input);
    };
    const handleIdentityInput = (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement)
            syncIdentityField(target);
    };
    for (const input of identityInputs) {
        input.addEventListener('input', handleIdentityInput);
        input.addEventListener('change', handleIdentityInput);
        input.addEventListener('blur', handleIdentityInput);
    }
    // Autofill can populate values before regular input/change events fire on mobile.
    // Re-check a few times after mount so those fields receive the same persistent glow.
    window.requestAnimationFrame(syncAllIdentityFields);
    window.setTimeout(syncAllIdentityFields, 260);
    window.setTimeout(syncAllIdentityFields, 1100);
    const style = document.createElement('style');
    style.dataset.identityFieldPolish = 'true';
    style.textContent = `
    /* Identity stays as dark transparent glass. Filled/focused fields are marked
       by the same bright vessel-coloured rim as the Earth, never by a solid fill. */
    .profile-flow .profile-panel-identity .profile-field {
      border-color: rgba(255, 255, 255, 0.13) !important;
      background:
        linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.014) 45%, rgba(0, 0, 0, 0.1)),
        rgba(6, 10, 11, 0.42) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.022) inset,
        0 13px 36px rgba(0, 0, 0, 0.26),
        0 0 18px rgba(var(--profile-energy-rgb), 0.035) !important;
      backdrop-filter: blur(24px) saturate(1.12) brightness(1.02) !important;
      -webkit-backdrop-filter: blur(24px) saturate(1.12) brightness(1.02) !important;
    }

    .profile-flow .profile-panel-identity .profile-field:focus-within,
    .profile-flow .profile-panel-identity .profile-field.is-filled,
    .profile-flow .profile-panel-identity .profile-field:has(input:not(:placeholder-shown)) {
      border-color: rgba(var(--profile-energy-soft-rgb), 0.92) !important;
      background:
        radial-gradient(circle at 19% 18%, rgba(255, 255, 255, 0.085), transparent 31%),
        linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(var(--profile-energy-rgb), 0.024) 48%, rgba(0, 0, 0, 0.085)),
        rgba(6, 10, 11, 0.43) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.14) inset,
        0 0 3px rgba(246, 252, 255, 0.82),
        0 0 12px rgba(var(--profile-energy-soft-rgb), 0.56),
        0 0 30px rgba(var(--profile-energy-rgb), 0.36),
        0 0 62px rgba(var(--profile-energy-rgb), 0.18),
        0 13px 36px rgba(0, 0, 0, 0.26) !important;
    }

    .profile-flow .profile-panel-identity .profile-field input {
      background: transparent !important;
      box-shadow: none !important;
      color: rgba(248, 247, 242, 0.97) !important;
      caret-color: rgba(var(--profile-energy-soft-rgb), 0.96) !important;
    }

    /* Chrome/Android autofill otherwise paints an opaque blue slab inside the
       rounded field. Keep the browser value, but suppress that native fill so the
       parent glass material remains visible. */
    .profile-flow .profile-panel-identity .profile-field input:-webkit-autofill,
    .profile-flow .profile-panel-identity .profile-field input:-webkit-autofill:hover,
    .profile-flow .profile-panel-identity .profile-field input:-webkit-autofill:focus,
    .profile-flow .profile-panel-identity .profile-field input:-webkit-autofill:active {
      -webkit-text-fill-color: rgba(248, 247, 242, 0.97) !important;
      caret-color: rgba(var(--profile-energy-soft-rgb), 0.96) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset !important;
      box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset !important;
      transition: background-color 99999s ease-out 0s, color 99999s ease-out 0s !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        for (const input of identityInputs) {
            input.removeEventListener('input', handleIdentityInput);
            input.removeEventListener('change', handleIdentityInput);
            input.removeEventListener('blur', handleIdentityInput);
        }
        style.remove();
    }, { once: true });
}
export {};
