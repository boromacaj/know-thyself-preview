/*
 * CONSTRAINED-DEVICE MODE
 * -----------------------
 * A pillar reading can put THIRTY-FOUR live backdrop-filter surfaces on screen
 * at once, over a live WebGL globe. On a desktop GPU that is free. On an older
 * WebKit tablet each one is a separate backdrop snapshot plus a blur pass every
 * frame, and the compositor falls off a cliff: input latency, stuttering
 * scroll, and a keyboard that misses taps.
 *
 * So this reduces the COST of the effects without redesigning them. Same
 * layout, same colours, same glass, same glows - a smaller blur radius and
 * fewer stacked shadow passes. Side by side the difference is hard to name;
 * the frame time is not.
 *
 * DETECTED BY CAPABILITY, NOT BY NAME. A device string tells you what someone
 * called the hardware, not what it can do, and it is wrong on exactly the
 * devices that matter - iPadOS reports itself as a Mac. Three signals are used:
 *
 *   1. Core count. A low-core device is constrained on any platform.
 *   2. The iOS/iPadOS WebKit family, which is the one place backdrop-filter is
 *      reliably the dominant cost. Chrome and Firefox on iOS are WebKit too,
 *      so this is deliberately a rendering-engine test, not a browser test.
 *   3. A live frame-time probe, which is the only signal that measures the
 *      actual machine. It can turn the mode ON for hardware the first two
 *      missed, and it can turn it OFF again for a device that is coping.
 *
 * The first two arm the mode immediately, so a slow device never has to render
 * one expensive frame to be recognised. The probe then corrects that guess.
 */
const experience = document.getElementById('place-experience');
if (experience instanceof HTMLElement) {
    const PERF_ATTRIBUTE = 'ktPerf';
    const CONSTRAINED = 'constrained';
    /* Frames slower than this are the compositor failing to keep up. 22ms is
       comfortably past a 60Hz budget without catching an ordinary hitch. */
    const SLOW_FRAME_MILLIS = 22;
    /* Enough frames to see a trend, short enough to finish inside the intro. */
    const PROBE_FRAMES = 45;
    /* Over half the probe being slow is a device that cannot hold the frame
       rate, not a device that stumbled once. */
    const SLOW_FRAME_SHARE_TO_CONSTRAIN = 0.5;
    /* Demoting needs to be clearly comfortable, or the mode would flap. */
    const SLOW_FRAME_SHARE_TO_RELEASE = 0.12;
    const ua = navigator.userAgent;
    /*
     * The iOS/iPadOS rendering engine. Every browser there is WebKit, so the
     * test is for the engine and against the desktop browsers that also carry
     * "AppleWebKit" in their string. iPadOS claims to be a Mac, so a touch check
     * is what separates a real tablet from a desktop Safari window.
     */
    const isWebKitFamily = () => {
        if (/Chrome\/|Chromium\/|Edg\//.test(ua))
            return false;
        if (!/AppleWebKit/.test(ua))
            return false;
        if (/iPhone|iPad|iPod/.test(ua))
            return true;
        // iPadOS 13+ reports a Mac UA; only a touch-capable one is a tablet.
        return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    };
    const lowCoreCount = () => {
        const cores = navigator.hardwareConcurrency;
        return typeof cores === 'number' && cores > 0 && cores <= 4;
    };
    const constrainedByCapability = () => lowCoreCount() || isWebKitFamily();
    const setConstrained = (on) => {
        const already = experience.dataset[PERF_ATTRIBUTE] === CONSTRAINED;
        if (on === already)
            return;
        if (on) {
            experience.dataset[PERF_ATTRIBUTE] = CONSTRAINED;
            document.documentElement.dataset[PERF_ATTRIBUTE] = CONSTRAINED;
            return;
        }
        delete experience.dataset[PERF_ATTRIBUTE];
        delete document.documentElement.dataset[PERF_ATTRIBUTE];
    };
    setConstrained(constrainedByCapability());
    /*
     * THE PROBE. Frame deltas only - it renders nothing and measures nothing
     * else, so it cannot itself be what makes the device slow.
     *
     * It refuses to run while the page is hidden: rAF is throttled to a crawl in
     * a background tab, so every frame would look catastrophic and the mode
     * would latch on for a machine that is perfectly fast.
     */
    const runProbe = () => {
        if (document.visibilityState !== 'visible')
            return;
        let framesSeen = 0;
        let slowFrames = 0;
        let previous = 0;
        const step = (now) => {
            if (document.visibilityState !== 'visible')
                return;
            if (previous !== 0) {
                framesSeen += 1;
                if (now - previous > SLOW_FRAME_MILLIS)
                    slowFrames += 1;
            }
            previous = now;
            if (framesSeen < PROBE_FRAMES) {
                window.requestAnimationFrame(step);
                return;
            }
            const slowShare = slowFrames / framesSeen;
            if (slowShare >= SLOW_FRAME_SHARE_TO_CONSTRAIN) {
                setConstrained(true);
            }
            else if (slowShare <= SLOW_FRAME_SHARE_TO_RELEASE && !constrainedByCapability()) {
                /* Only ever released for a device the static signals never flagged.
                   A WebKit tablet that happens to probe well still keeps the mode:
                   the probe runs on a nearly empty screen, and the reading it will
                   reach later is the expensive one. */
                setConstrained(false);
            }
            experience.dataset.ktPerfProbe = `${Math.round(slowShare * 100)}%`;
        };
        window.requestAnimationFrame(step);
    };
    /* After the intro, so the probe measures the interface rather than the
       one-off cost of mounting the globe. */
    const armProbe = () => {
        if (experience.dataset.introState === 'complete') {
            runProbe();
            return;
        }
        const observer = new MutationObserver(() => {
            if (experience.dataset.introState !== 'complete')
                return;
            observer.disconnect();
            runProbe();
        });
        observer.observe(experience, { attributes: true, attributeFilter: ['data-intro-state'] });
        window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
    };
    armProbe();
    const style = document.createElement('style');
    style.dataset.deviceCapabilityMode = 'true';
    style.textContent = `
    /*
     * The glass token is the single source for every onboarding surface, so
     * changing it here reaches all of them at once. Radius is the whole cost of
     * a blur - it is a wider sample per pixel - and saturate is nearly free, so
     * the radius comes down and the colour treatment stays exactly as it was.
     */
    #place-experience[data-kt-perf="constrained"] {
      --kt-glass-backdrop: blur(9px) saturate(1.08);
    }

    /*
     * EVERY surface that declares a blur literally rather than through the
     * token. The list is derived from the stylesheets, not guessed: the first
     * attempt named the obvious cards and missed .kt-mark, which is the small
     * chip used for each calculated value - and a single reading puts
     * TWENTY-EIGHT of those on screen, which was 392 of the 463 pixels of
     * blur radius being asked for. The cheap-looking element repeated thirty
     * times is the one that costs, not the big panel.
     */
    #place-experience[data-kt-perf="constrained"] .arrival-calendar-day-disc,
    #place-experience[data-kt-perf="constrained"] .arrival-glass-picker,
    #place-experience[data-kt-perf="constrained"] .arrival-period-button,
    #place-experience[data-kt-perf="constrained"] .arrival-period-main,
    #place-experience[data-kt-perf="constrained"] .arrival-time-input,
    #place-experience[data-kt-perf="constrained"] .arrival-year-grid,
    #place-experience[data-kt-perf="constrained"] .arrival-year-option,
    #place-experience[data-kt-perf="constrained"] .birthplace-actions-detached,
    #place-experience[data-kt-perf="constrained"] .birthplace-card,
    #place-experience[data-kt-perf="constrained"] .change-place,
    #place-experience[data-kt-perf="constrained"] .confirm-place,
    #place-experience[data-kt-perf="constrained"] .confirm-vessel,
    #place-experience[data-kt-perf="constrained"] .hd-centre-frost,
    #place-experience[data-kt-perf="constrained"] .kt-concept-sheet,
    #place-experience[data-kt-perf="constrained"] .kt-fc-block,
    #place-experience[data-kt-perf="constrained"] .kt-fc-graph,
    #place-experience[data-kt-perf="constrained"] .kt-key-outputs,
    #place-experience[data-kt-perf="constrained"] .kt-mark,
    #place-experience[data-kt-perf="constrained"] .kt-orbit-bubble,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-back,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-card,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-nav-button,
    #place-experience[data-kt-perf="constrained"] .kt-portrait-review,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-section,
    #place-experience[data-kt-perf="constrained"] .kt-portrait,
    #place-experience[data-kt-perf="constrained"] .kt-synthesis-summary,
    #place-experience[data-kt-perf="constrained"] .kt-technical,
    #place-experience[data-kt-perf="constrained"] .kt-theme-button,
    #place-experience[data-kt-perf="constrained"] .kt-theme-sheet,
    #place-experience[data-kt-perf="constrained"] .place-results-shell,
    #place-experience[data-kt-perf="constrained"] .place-search,
    #place-experience[data-kt-perf="constrained"] .profile-field,
    #place-experience[data-kt-perf="constrained"] .profile-field-picker,
    #place-experience[data-kt-perf="constrained"] .profile-overview-change,
    #place-experience[data-kt-perf="constrained"] .profile-overview-row,
    #place-experience[data-kt-perf="constrained"] .profile-primary,
    #place-experience[data-kt-perf="constrained"] .profile-secondary,
    #place-experience[data-kt-perf="constrained"] .search-submit,
    #place-experience[data-kt-perf="constrained"] .vessel-back,
    #place-experience[data-kt-perf="constrained"] .vessel-choice,
    #place-experience[data-kt-perf="constrained"] .vessel-symbol {
      backdrop-filter: blur(4px) saturate(1.06) !important;
      -webkit-backdrop-filter: blur(4px) saturate(1.06) !important;
    }

    /*
     * will-change: backdrop-filter pins a compositing layer and its backdrop
     * snapshot for the whole life of the element, whether or not it is moving.
     * It was added to smooth a transition; on a constrained compositor it is
     * simply a permanent bill for every glass surface on screen.
     */
    /* Only static glass is unpromoted. The old universal * selector also
       disabled compositor hints on the animated SVG menu artwork. On iOS this
       forced continuously moving paths to repaint and could cause flicker. */
    #place-experience[data-kt-perf="constrained"] .kt-mark,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-card,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-section,
    #place-experience[data-kt-perf="constrained"] .kt-orbit-bubble,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-nav-button,
    #place-experience[data-kt-perf="constrained"] .birthplace-card,
    #place-experience[data-kt-perf="constrained"] .place-search,
    #place-experience[data-kt-perf="constrained"] .profile-field,
    #place-experience[data-kt-perf="constrained"] .profile-field-picker {
      will-change: auto !important;
    }

    /*
     * The rim is several stacked shadow passes. The outer two are the widest
     * and therefore the most expensive, and they are also the two doing the
     * least visible work, so the light keeps its shape with fewer passes.
     */
    #place-experience[data-kt-perf="constrained"] .kt-pillar-card,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-section,
    #place-experience[data-kt-perf="constrained"] .kt-key-outputs li,
    #place-experience[data-kt-perf="constrained"] .kt-pillar-nav-button {
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.03) inset,
        0 0 12px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.2) !important;
    }

    /*
     * Decorative motion is paused while a field is being filled. The keyboard
     * transition is the moment the compositor is most loaded and the moment the
     * user most needs the tap to land, and nothing here is information.
     */
    #place-experience[data-kt-perf="constrained"][data-keyboard-open="true"] .kt-scene-effects,
    #place-experience[data-kt-perf="constrained"][data-keyboard-open="true"] .kt-earth-rim,
    #place-experience[data-kt-perf="constrained"][data-keyboard-open="true"] .vessel-cosmos {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', (event) => {
        if (event.persisted)
            return;
        style.remove();
    }, { once: true });
}
export {};
