import { activeLocale } from '../i18n/locale.js';
import { clockOf, lunarEventsForDay } from './lunarEvents.js';
import { lunarEventNatalReading } from './lunarEventNatal.js';
import { compactEventTitle, followingLine, lunarEventLabel, lunarEventText } from './lunarEventVoice.js';
/*
 * THE EXACT FULL MOON / NEW MOON, AS THE BLOCK UNDER THE FORECAST'S MOON.
 *
 * One section: which event (the day's own exact one, else the next Full or New Moon, said so in the kicker), when exactly in the reader's time zone, where in the zodiac, the traditional name
 * of a Full Moon, then the short reading - the sky and the tradition, and how it meets THIS natal chart - and one thing to reflect on. Pure: it takes the date, the zone and the natal reading
 * and returns markup, so the screen and the tests call the same thing. Any failure returns nothing, because the Moon above it must never be lost to a fault in the text.
 *
 * TWO SIZES OF THE SAME FACTS. The Forecast Day carries only the compact line (renderLunarEventCompact: which event, its sign, the exact local date and time); the whole reading lives in the Lunar
 * Forecast detail (renderLunarEventPanel with `detail`). Both read the same calculation, lunarEventsForDay; interpretation leads, with evidence in a closed technical disclosure.
 */
const escapeHtml = (text) => text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/** One line of the Forecast Day: "Next Full Moon in Taurus" over the exact local date and time. Empty when the event cannot be worked out. */
export function renderLunarEventCompact(input) {
    try {
        const locale = activeLocale() === 'sk' ? 'sk' : 'en';
        const events = lunarEventsForDay(input.date, input.timeZone ?? 'UTC');
        const event = events.relevant;
        const clock = clockOf(event.instant, input.timeZone, locale);
        const title = compactEventTitle(event.kind, event.moonSign, events.onDay !== null);
        const when = `${clock.date} · ${clock.time} ${clock.zoneName}`;
        return `<p class="kt-fc-moon-next" data-lunar-event="${event.kind}" data-lunar-event-on-day="${events.onDay !== null}" data-lunar-event-instant="${event.instant.toISOString()}"><span class="kt-fc-moon-next-title">${escapeHtml(title)}</span><time datetime="${event.instant.toISOString()}">${escapeHtml(when)}</time></p>`;
    }
    catch {
        return '';
    }
}
export function renderLunarEventPanel(input, options = {}) {
    try {
        const locale = activeLocale() === 'sk' ? 'sk' : 'en';
        const zone = input.timeZone ?? 'UTC';
        const events = lunarEventsForDay(input.date, zone);
        const event = events.relevant;
        const clock = clockOf(event.instant, input.timeZone, locale);
        const natal = input.natal ? lunarEventNatalReading(event, input.natal) : null;
        const text = lunarEventText({ event, clock, onDay: events.onDay !== null, natal });
        const then = followingLine(events.following, clockOf(events.following.instant, input.timeZone, locale));
        const paragraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
        void options;
        const name = text.traditionalName
            ? `<p class="kt-fc-moon-event-name">${escapeHtml(text.traditionalName)}<span>${escapeHtml(text.traditionalNote ?? '')}</span></p>`
            : '';
        const evidence = text.personal.length
            ? `<h4>${escapeHtml(text.headings.inChart)}</h4>${paragraphs(text.personal)}${text.evidenceLine ? `<p class="kt-fc-moon-event-evidence">${escapeHtml(text.evidenceLine)}</p>` : ''}`
            : '';
        /* English closes the reading itself with the question; it is not asked a second time under the details. */
        const reflectBlock = text.reading.some((paragraph) => paragraph.includes(text.reflection)) ? '' : `<h4>${escapeHtml(text.headings.reflect)}</h4><p>${escapeHtml(text.reflection)}</p>`;
        const technical = `<details class="kt-fc-moon-event-part kt-fc-moon-event-sky kt-technical"><summary>${escapeHtml(text.headings.technical)}</summary><p class="kt-fc-moon-event-positions">${escapeHtml(text.positions)}</p>${name}${paragraphs([text.astronomy, text.meaning, text.sign])}${evidence}${reflectBlock}</details>`;
        return `
    <section class="kt-fc-moon-event" data-lunar-event="${event.kind}" data-lunar-event-on-day="${events.onDay !== null}" data-lunar-event-instant="${event.instant.toISOString()}"
             data-lunar-event-personal="${natal ? natal.certainty : 'none'}" aria-label="${escapeHtml(lunarEventLabel('region'))}">
      <p class="kt-fc-moon-event-kicker">${escapeHtml(text.kicker)}</p>
      <h3 class="kt-fc-moon-event-title">${escapeHtml(text.title)}</h3>
      <p class="kt-fc-moon-event-when"><time datetime="${event.instant.toISOString()}">${escapeHtml(text.when)}</time></p>
      ${text.caveat ? `<p class="kt-fc-moon-event-caveat">${escapeHtml(text.caveat)}</p>` : ''}
      <div class="kt-fc-moon-event-part kt-fc-moon-event-reading"><h4>${escapeHtml(text.headings.reading)}</h4>${paragraphs(text.reading)}</div>
      ${technical}
      <p class="kt-fc-moon-event-then">${escapeHtml(then)}</p>
      ${text.zoneNote ? `<p class="kt-fc-moon-event-note">${escapeHtml(text.zoneNote)}</p>` : ''}
    </section>`;
    }
    catch {
        return '';
    }
}
