const experience = document.getElementById('place-experience');
const arrivalForm = document.querySelector('#profile-arrival-form');
if (experience instanceof HTMLElement) {
    const padTimePart = (value) => String(value).padStart(2, '0');
    const commitAndCloseTimeEditor = () => {
        const hourInput = document.querySelector('#arrival-hour');
        const minuteInput = document.querySelector('#arrival-minute');
        if (!(hourInput instanceof HTMLInputElement) || !(minuteInput instanceof HTMLInputElement))
            return false;
        const hourText = hourInput.value.replace(/\D/g, '').slice(0, 2);
        const minuteText = minuteInput.value.replace(/\D/g, '').slice(0, 2);
        if (!hourText || !minuteText)
            return false;
        const hour = Number(hourText);
        const minute = Number(minuteText);
        if (!Number.isFinite(hour) || !Number.isFinite(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return false;
        }
        hourInput.value = padTimePart(hour);
        minuteInput.value = padTimePart(minute);
        // Reuse Arrival picker's existing minute-input path so the canonical hidden
        // birth-time value, display text and validation state are updated exactly as
        // they are during normal typing. No duplicate time state is introduced here.
        minuteInput.dispatchEvent(new Event('input', { bubbles: true }));
        const timeField = document.getElementById('profile-birth-time')?.closest('.profile-field-picker');
        window.requestAnimationFrame(() => {
            if (timeField instanceof HTMLElement && timeField.classList.contains('is-open')) {
                // The existing field click toggles the active time picker closed. Removing
                // the focused editor also dismisses the Android numeric keyboard.
                timeField.click();
            }
            else {
                minuteInput.blur();
            }
        });
        return true;
    };
    const handleTimeEditorKeydown = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.classList.contains('arrival-time-input'))
            return;
        if (event.key !== 'Enter')
            return;
        event.preventDefault();
        event.stopPropagation();
        if (commitAndCloseTimeEditor())
            return;
        // If Go/Enter is pressed while only the hour is complete, keep the editor
        // open and move naturally to minutes instead of submitting the Arrival form.
        const minuteInput = document.querySelector('#arrival-minute');
        if (target.id === 'arrival-hour' && minuteInput instanceof HTMLInputElement) {
            minuteInput.focus({ preventScroll: true });
        }
    };
    const handleTimeEditorSubmit = (event) => {
        const active = document.activeElement;
        if (!(active instanceof HTMLInputElement) || !active.classList.contains('arrival-time-input'))
            return;
        // Some Android IMEs expose the action key as Go and submit the parent form.
        // While HH:MM is being edited, that action confirms only the time and closes
        // this editor; it must not trigger the Arrival form's normal submit action.
        event.preventDefault();
        event.stopImmediatePropagation();
        commitAndCloseTimeEditor();
    };
    document.addEventListener('keydown', handleTimeEditorKeydown, true);
    arrivalForm?.addEventListener('submit', handleTimeEditorSubmit, true);
    const style = document.createElement('style');
    style.dataset.arrivalTimeEditorPolish = 'true';
    style.textContent = `
    /* TIME EDITOR — the soft-keyboard state is a tiny HH:MM control, not a
       second full Arrival card. Keep it centred and let it sit directly above
       the keyboard edge. */
    .profile-flow .profile-panel-arrival.time-keyboard-active {
      left: 0 !important;
      right: 0 !important;
      width: var(--kt-control-width) !important;
      max-width: var(--kt-control-width) !important;
      margin-inline: auto !important;
      padding: 0 !important;
      overflow: visible !important;
      background: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      transform: none !important;
    }

    /* Once the numeric keyboard is visible, the closed Date/Time selector rows
       are redundant. Removing them makes the HH:MM editor physically lower and
       prevents the active Time row glow from drawing a rectangular halo behind
       the editor. */
    .profile-panel-arrival.time-keyboard-active .profile-fields-arrival {
      display: none !important;
    }

    .profile-panel-arrival.time-keyboard-active .arrival-picker-host.is-open {
      width: 100% !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 0 4px !important;
      overflow: visible !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    /* THE ROW BEHIND THE TWO CAPSULES HAS NO SURFACE OF ITS OWN.
       The card around it does - it is the picker panel, the same glass the date
       picker opens in - but the HH:MM row inside it must stay a plain grid, or
       a second rectangular tile appears behind the two capsules. Dropping the
       old paint containment here also keeps Android from flattening the two
       blurred capsules into one faint compositor tile. */
    .profile-flow .arrival-time-entry,
    .profile-flow .arrival-time-entry::before,
    .profile-flow .arrival-time-entry::after {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      border: 0 !important;
      box-shadow: none !important;
      filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      contain: none !important;
      isolation: auto !important;
      transform: none !important;
      will-change: auto !important;
      backface-visibility: visible !important;
      -webkit-backface-visibility: visible !important;
    }

    .profile-flow .arrival-time-entry::before,
    .profile-flow .arrival-time-entry::after {
      display: none !important;
      content: none !important;
    }

    /* No extra title/labels in keyboard mode — the interaction is just HOUR :
       MINUTE. This keeps the editor compact and visually obvious. */
    .profile-flow .arrival-time-caption,
    .profile-flow .arrival-time-labels,
    .profile-flow .arrival-time-quick-row {
      display: none !important;
    }

    /* One row inside the panel: HOUR capsule : MINUTE capsule, across the
       panel's own width rather than a narrower measure of its own. */
    .profile-flow .arrival-time-entry {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) 16px minmax(0, 1fr) !important;
      gap: 9px !important;
      align-items: center !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 auto !important;
    }

    /* ------------------------------------------------------------------
       NO SECOND PLATE INSIDE THE PANEL.

       The blur that arrivalMenuTransparencyAndHitFix puts on every arrival menu
       surface is what gives the picker panel its glass, and the time card wants
       it for exactly the same reason the date card does. What must not have it
       is anything INSIDE the panel: a blurred row behind the two capsules and
       the colon reads as a second, misaligned plate on top of the first.

       This rule used to name the card as well, which is why the time picker had
       no panel at all. It now names only the row and the colon, and it still
       wins wherever it is loaded because it carries the id: (1,4,0). */
    #place-experience .profile-flow[data-step="arrival"] .arrival-time-picker .arrival-time-entry,
    #place-experience .profile-flow[data-step="arrival"] .arrival-time-picker .arrival-time-separator {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    /* The colon is a glyph, not a control. Nothing behind it, nothing around
       it - it only has to sit crisp and centred between the two capsules. */
    #place-experience .profile-flow[data-step="arrival"] .arrival-time-picker .arrival-time-separator {
      display: grid !important;
      place-items: center !important;
      filter: none !important;
      border-radius: 0 !important;
    }

    .profile-flow .arrival-time-input {
      box-sizing: border-box !important;
      width: 100% !important;
      height: 52px !important;
      min-height: 52px !important;
      padding: 0 14px !important;
      border: 1px solid rgba(var(--profile-energy-soft-rgb), .34) !important;
      border-radius: 999px !important;
      outline: 0 !important;
      color: rgba(250, 249, 245, .98) !important;
      /* THE CAPSULES HAD NO GLASS AT ALL.
         This used to paint the fill and the blur from two custom properties that
         are not defined anywhere in the app - they were referenced here and
         nowhere else. An undefined custom property with no fallback makes the
         whole declaration invalid at computed-value time, so the background fell
         back to transparent and the filter to none. Verified on the live build:
         both tokens resolved to "", background computed to rgba(0,0,0,0) and the
         backdrop to none. That is why the clock capsules read as empty holes
         while every other input in the flow is frosted glass.

         The material is now the identity field's, literally: the clock is the
         same kind of surface the user types into on the step before, so it
         should not invent a second recipe. The blur stays INSIDE the capsule -
         border-radius clips a backdrop-filter to the padding box, and the row
         and the card behind it are held flat, so no rectangular pane can appear
         around the two shapes. */
      background:
        linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.014) 45%, rgba(0, 0, 0, 0.1)),
        rgba(6, 10, 11, 0.42) !important;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.03) inset,
        0 10px 28px rgba(0,0,0,.18),
        0 0 18px rgba(var(--profile-energy-rgb),.055) !important;
      backdrop-filter: blur(24px) saturate(1.12) brightness(1.02) !important;
      -webkit-backdrop-filter: blur(24px) saturate(1.12) brightness(1.02) !important;
      font-family: Georgia, 'Times New Roman', serif !important;
      font-size: 24px !important;
      line-height: 1 !important;
      text-align: center !important;
    }

    .profile-flow .arrival-time-input::placeholder {
      color: rgba(244, 241, 233, .28) !important;
      opacity: 1 !important;
    }

    .profile-flow .arrival-time-input:focus {
      border-color: rgba(var(--profile-energy-soft-rgb), .94) !important;
      background:
        radial-gradient(circle at 19% 18%, rgba(255, 255, 255, 0.085), transparent 31%),
        linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(var(--profile-energy-rgb), 0.024) 48%, rgba(0, 0, 0, 0.085)),
        rgba(6, 10, 11, 0.43) !important;
      box-shadow:
        0 0 0 1px rgba(var(--profile-energy-soft-rgb), .09) inset,
        0 0 3px rgba(248,252,255,.72),
        0 0 13px rgba(var(--profile-energy-soft-rgb),.38),
        0 0 28px rgba(var(--profile-energy-rgb),.20),
        0 10px 28px rgba(0,0,0,.18) !important;
    }

    .profile-flow .arrival-time-separator {
      color: rgba(var(--profile-energy-soft-rgb), .74) !important;
      font-family: Georgia, 'Times New Roman', serif !important;
      font-size: 24px !important;
      line-height: 1 !important;
      text-align: center !important;
      text-shadow: 0 0 12px rgba(var(--profile-energy-rgb), .16) !important;
    }

    /* Belt-and-suspenders cleanup for browsers that keep a composited layer on
       :has() hosts while the keyboard animates. */
    .profile-flow .arrival-picker-host:has(.arrival-time-picker),
    .profile-flow .arrival-picker-host.is-open:has(.arrival-time-picker) {
      background: transparent !important;
      background-image: none !important;
      box-shadow: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      contain: none !important;
      isolation: auto !important;
      will-change: auto !important;
    }

    @media (max-width: 680px) {
      .profile-flow .arrival-time-entry {
        grid-template-columns: minmax(0, 1fr) 14px minmax(0, 1fr) !important;
        gap: 8px !important;
      }

      .profile-flow .arrival-time-input {
        height: 50px !important;
        min-height: 50px !important;
        font-size: 23px !important;
      }

      .profile-flow .arrival-time-separator {
        font-size: 22px !important;
      }
    }

    @media (max-height: 690px) {
      .profile-flow .arrival-time-input {
        height: 48px !important;
        min-height: 48px !important;
        font-size: 22px !important;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        document.removeEventListener('keydown', handleTimeEditorKeydown, true);
        arrivalForm?.removeEventListener('submit', handleTimeEditorSubmit, true);
        style.remove();
    }, { once: true });
}
export {};
