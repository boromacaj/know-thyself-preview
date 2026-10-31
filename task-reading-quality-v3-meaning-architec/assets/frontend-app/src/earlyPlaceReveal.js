const experience = document.getElementById('place-experience');
const interactionDock = document.getElementById('interaction-dock');
if (experience instanceof HTMLElement && interactionDock instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.earlyPlaceReveal = 'true';
    style.textContent = `
    /* The search bar starts fading in while the live Earth is still arriving. */
    .place-experience[data-intro-state="earth-zooming"].intro-ui-visible .interaction-dock,
    .place-experience[data-intro-state="search-revealing"].intro-ui-visible .interaction-dock {
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Once the opening camera movement has finished, remove the old dead wait:
       search and Earth gestures are immediately available during search-revealing. */
    .place-experience[data-intro-state="search-revealing"] .interaction-dock {
      pointer-events: auto !important;
    }

    .place-experience[data-intro-state="search-revealing"] .earth-map {
      pointer-events: auto !important;
    }
  `;
    document.head.append(style);
    const syncEarlyPlaceReveal = () => {
        const introState = experience.dataset.introState;
        if (introState === 'earth-zooming'
            || introState === 'search-revealing'
            || introState === 'complete') {
            experience.classList.add('intro-ui-visible');
        }
        if (introState === 'search-revealing' || introState === 'complete') {
            interactionDock.inert = false;
        }
    };
    const introObserver = new MutationObserver(syncEarlyPlaceReveal);
    introObserver.observe(experience, {
        attributes: true,
        attributeFilter: ['data-intro-state'],
    });
    syncEarlyPlaceReveal();
    window.addEventListener('pagehide', () => {
        introObserver.disconnect();
        style.remove();
    }, { once: true });
}
export {};
