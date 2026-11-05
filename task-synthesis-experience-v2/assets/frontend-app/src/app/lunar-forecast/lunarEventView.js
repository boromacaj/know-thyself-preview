import { activeLocale } from '../i18n/locale.js?v=53c0693';
import { clockOf, lunarEventsForDay } from './lunarEvents.js?v=53c0693';
import { lunarEventNatalReading } from './lunarEventNatal.js?v=53c0693';
import { compactEventTitle, followingLine, lunarEventLabel, lunarEventText } from './lunarEventVoice.js?v=53c0693';
/*
 * THE EXACT FULL MOON / NEW MOON, AS THE BLOCK UNDER THE FORECAST'S MOON.
 *
 * One section: which event (the day's own exact one, else the next Full or New Moon, said so in the kicker), when exactly in the reader's time zone, where in the zodiac, the traditional name
 * of a Full Moon, then the short reading - the sky and the tradition, and how it meets THIS natal chart - and one thing to reflect on. Pure: it takes the date, the zone and the natal reading
 * and returns markup, so the screen and the tests call the same thing. Any failure returns nothing, because the Moon above it must never be lost to a fault in the text.
 *
 * TWO SIZES OF THE SAME FACTS. The Forecast Day carries only the compact line (renderLunarEventCompact: which event, its sign, the exact local date and time); the whole reading lives in the Lunar
 * Forecast detail (renderLunarEventPanel with `detail`, which opens the sky-and-tradition part too). Both read the one calculation, lunarEventsForDay, so they cannot disagree.
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
        const name = text.traditionalName
            ? `<p class="kt-fc-moon-event-name">${escapeHtml(text.traditionalName)}<span>${escapeHtml(text.traditionalNote ?? '')}</span></p>`
            : '';
        const personal = text.personal.length
            ? `<div class="kt-fc-moon-event-part"><h4>${escapeHtml(text.headings.inChart)}</h4>${text.caveat ? `<p class="kt-fc-moon-event-caveat">${escapeHtml(text.caveat)}</p>` : ''}${paragraphs(text.personal)}</div>`
            : '';
        return `
    <section class="kt-fc-moon-event" data-lunar-event="${event.kind}" data-lunar-event-on-day="${events.onDay !== null}" data-lunar-event-instant="${event.instant.toISOString()}"
             data-lunar-event-personal="${natal ? natal.certainty : 'none'}" aria-label="${escapeHtml(lunarEventLabel('region'))}">
      <p class="kt-fc-moon-event-kicker">${escapeHtml(text.kicker)}</p>
      <h3 class="kt-fc-moon-event-title">${escapeHtml(text.title)}</h3>
      <p class="kt-fc-moon-event-when"><time datetime="${event.instant.toISOString()}">${escapeHtml(text.when)}</time></p>
      <p class="kt-fc-moon-event-positions">${escapeHtml(text.positions)}</p>
      ${name}
      <details class="kt-fc-moon-event-part kt-fc-moon-event-sky"${options.detail ? ' open' : ''}><summary>${escapeHtml(text.headings.sky)}</summary>${paragraphs([text.astronomy, text.meaning, text.sign])}</details>
      ${personal}
      <div class="kt-fc-moon-event-part"><h4>${escapeHtml(text.headings.reflect)}</h4><p>${escapeHtml(text.reflection)}</p></div>
      <p class="kt-fc-moon-event-then">${escapeHtml(then)}</p>
      <p class="kt-fc-moon-event-note">${escapeHtml(text.disclaimer)}${text.zoneNote ? ` ${escapeHtml(text.zoneNote)}` : ''}</p>
    </section>`;
    }
    catch {
        return '';
    }
}
