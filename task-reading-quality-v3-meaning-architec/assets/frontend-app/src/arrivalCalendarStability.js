const profileFlow = document.querySelector('.profile-flow');
if (profileFlow instanceof HTMLElement) {
    const calendarCellCount = 42; // Always reserve a full 6-week calendar frame.
    /* The picker renders the full frame itself now; this stays as the guard for
       any grid that arrives short. Padding is inert spacers - never buttons, so
       nothing invisible can sit in a cell and take a tap meant for a day. */
    const stabilizeCalendarGrid = (grid) => {
        const missing = Math.max(0, calendarCellCount - grid.childElementCount);
        for (let index = 0; index < missing; index += 1) {
            const spacer = document.createElement('span');
            spacer.className = 'arrival-calendar-spacer';
            spacer.setAttribute('aria-hidden', 'true');
            grid.append(spacer);
        }
    };
    const stabilizeVisibleCalendar = () => {
        for (const grid of profileFlow.querySelectorAll('.arrival-calendar-grid')) {
            stabilizeCalendarGrid(grid);
        }
    };
    const observer = new MutationObserver(() => {
        stabilizeVisibleCalendar();
    });
    observer.observe(profileFlow, { childList: true, subtree: true });
    stabilizeVisibleCalendar();
    const style = document.createElement('style');
    style.dataset.arrivalCalendarStability = 'true';
    style.textContent = `
    /* Keep the date picker physically fixed while month/year arrows are tapped.
       Every month occupies the same complete 6-week / 42-cell calendar frame,
       so the controls never jump up or down underneath the user's finger. */
    .profile-flow .arrival-calendar-grid {
      grid-template-rows: repeat(6, minmax(0, 1fr));
    }

    .profile-flow .arrival-calendar-spacer {
      pointer-events: none !important;
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        style.remove();
    }, { once: true });
}
export {};
