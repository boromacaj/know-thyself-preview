const resultsShell = document.getElementById('place-results-shell');
if (resultsShell instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.placeResultsPolish = 'true';
    style.textContent = `
    /* Keep the birthplace suggestion panel compact above the mobile keyboard:
       show three clean result rows at a time and scroll for the rest. */
    .place-results-shell {
      max-height: 206px !important;
      overflow-y: auto !important;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      -webkit-overflow-scrolling: touch;
    }

    .place-results > li {
      min-height: 64px;
    }

    .place-results button {
      height: 64px;
      min-height: 64px !important;
      padding: 8px 13px !important;
    }

    .place-results button > span:first-child {
      display: -webkit-box;
      overflow: hidden;
      line-height: 1.3;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    /* A suggestion that names what it is: the name on one line, the kind and the place on a quiet line under it. */
    .place-results button > span.result-text {
      display: block;
      -webkit-line-clamp: unset;
    }

    .place-results .result-title,
    .place-results .result-detail {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .place-results .result-title {
      line-height: 1.3;
    }

    .place-results .result-detail {
      margin-top: 2px;
      font-size: 11.5px;
      line-height: 1.25;
      letter-spacing: 0.01em;
      opacity: 0.62;
    }

    @media (max-height: 690px) {
      .place-results-shell {
        max-height: 206px !important;
      }
    }
  `;
    document.head.append(style);
    window.addEventListener('pagehide', () => {
        style.remove();
    }, { once: true });
}
export {};
