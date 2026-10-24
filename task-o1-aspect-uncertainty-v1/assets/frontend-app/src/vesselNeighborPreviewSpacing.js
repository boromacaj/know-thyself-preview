const vesselStage = document.getElementById('vessel-stage');
if (vesselStage instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.vesselNeighborPreviewSpacing = 'true';
    style.textContent = `
    /*
     * Keep each inactive/ghost vessel glyph completely outside the Earth and
     * place it at the midpoint of the free horizontal space between the Earth's
     * rim and the corresponding screen edge. The canonical Earth
     * center/diameter variables are already maintained by the VESSEL layout, so
     * this stays correct when the viewport or Earth size changes.
     *
     * --vessel-earth-diameter measures the GLOBE. What the eye reads as the
     * edge of the Earth is the outside of its atmosphere - the bright rim that
     * halos the disc - which sits noticeably further out, so a midpoint taken
     * from the bare globe lands closer to the planet than it looks like it
     * should. The halo factor below widens the footprint to the lit edge, which
     * moves each glyph outward into the true visual middle of its gap.
     */
    .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview-rail {
      --kt-vessel-earth-halo: 1.12;
      --kt-vessel-earth-lit-radius:
        calc((var(--vessel-earth-diameter, 30.4dvh) * var(--kt-vessel-earth-halo)) / 2);
      top: var(--vessel-earth-center-y, 50%) !important;
      left: 0 !important;
      width: 100% !important;
      height: 56px !important;
      display: grid !important;
      grid-template-columns:
        minmax(0, calc(var(--vessel-earth-center-x, 50%) - var(--kt-vessel-earth-lit-radius)))
        minmax(0, calc(var(--vessel-earth-diameter, 30.4dvh) * var(--kt-vessel-earth-halo)))
        minmax(0, calc(100% - var(--vessel-earth-center-x, 50%) - var(--kt-vessel-earth-lit-radius))) !important;
      align-items: center !important;
      transform: translateY(-50%) !important;
    }

    /*
     * The inactive choices are background, not foreground - but at .62 over a
     * near-black sky they had gone past restrained into washed out. Lifted just
     * enough to be noticed at a glance while still reading as translucent.
     *
     * The glow is the glyph's OWN vessel colour: renderPreview() writes
     * --kt-neighbor-rgb per side, so the male mark carries a soft blue and the
     * female mark a soft pink without either being hardcoded here. Two soft
     * shadows only - a tight one for legibility against the sky and a wide,
     * very low-alpha one for the bloom - so it stays a lit glass mark rather
     * than a neon sign.
     */
    .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview {
      opacity: .88 !important;
      filter:
        drop-shadow(0 0 4px rgba(255, 255, 255, .30))
        drop-shadow(0 0 10px rgba(var(--kt-neighbor-rgb, 255, 255, 255), .46))
        drop-shadow(0 0 26px rgba(var(--kt-neighbor-rgb, 255, 255, 255), .22)) !important;
    }

    .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview-left {
      grid-column: 1 !important;
      justify-self: center !important;
    }

    .vessel-stage:not(.is-profile-flow) .kt-vessel-neighbor-preview-right {
      grid-column: 3 !important;
      justify-self: center !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
