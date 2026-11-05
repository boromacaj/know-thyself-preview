import { escapeAttribute, escapeHtml } from '../format.js?v=53c0693';
import { engineProse, phaseWord, zodiacAnimalWord } from '../i18n/engineProse.js?v=53c0693';
import { labelText } from '../i18n/labelText.js?v=53c0693';
import { t, tf } from '../i18n/uiStrings.js?v=53c0693';
import { renderScrollCue } from './numerologyOrbit.js?v=53c0693';
import { animalTopicId, dayMasterTopicId, elementTopicId, polarityTopicId } from '../knowledge/bazi/interactive/registry.js?v=53c0693';
import { buildPersonalContext, encodePersonalContext } from '../knowledge/bazi/interactive/personal.js?v=53c0693';
/** The animal's own Chinese character (the sign), not the earthly branch's. The twelve are fixed by the tradition. */
export const ZODIAC_ANIMAL_CHARACTER = Object.freeze({
    Rat: '鼠', Ox: '牛', Tiger: '虎', Rabbit: '兔', Dragon: '龍', Snake: '蛇',
    Horse: '馬', Goat: '羊', Monkey: '猴', Rooster: '雞', Dog: '狗', Pig: '豬',
});
/** The five elements' and the two polarities' own characters: the faint seal behind each circle. */
export const ELEMENT_CHARACTER = Object.freeze({ Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水' });
export const POLARITY_CHARACTER = Object.freeze({ Yin: '陰', Yang: '陽' });
/** Where each satellite stands, clockwise from the top: upper left, upper right, bottom. A triangle that points down at the reading. */
export const BAZI_SLOT_ANGLES = Object.freeze([300, 60, 180]);
/** The attributes that make a circle open its explanation: a button for assistive technology and the keyboard, and the registry topic the sheet opens. */
function topicAttributes(topic, label) {
    return ` role="button" tabindex="0" aria-haspopup="dialog" data-bazi-topic="${escapeAttribute(topic)}" aria-label="${escapeAttribute(tf('bazi.aria.open', { subject: label }))}"`;
}
const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const POLARITIES = ['Yin', 'Yang'];
/**
 * The hero's data, or null when the chart cannot give all of it (the reading then keeps the strip of marks it had). Read from the typed result:
 * the year pillar's branch animal and stem, and the day master. Nothing is parsed out of display strings.
 */
export function baziHeroData(pillar) {
    if (pillar.id !== 'bazi-tcm')
        return null;
    const chart = pillar.baziChart?.bazi;
    if (!chart || chart.status !== 'calculated')
        return null;
    const year = chart.yearPillar;
    const dayMaster = chart.dayMaster;
    if (!year || !dayMaster)
        return null;
    const animal = year.branch.animal;
    if (!(animal in ZODIAC_ANIMAL_CHARACTER))
        return null;
    if (!ELEMENTS.includes(year.stem.element) || !ELEMENTS.includes(dayMaster.element) || !ELEMENTS.includes(year.branch.element))
        return null;
    if (!POLARITIES.includes(year.stem.polarity) || !POLARITIES.includes(dayMaster.polarity))
        return null;
    const window = pillar.baziChart?.timeWindow;
    return {
        animal,
        animalElement: year.branch.element,
        yearElement: year.stem.element,
        yearPolarity: year.stem.polarity,
        dayMasterElement: dayMaster.element,
        dayMasterPolarity: dayMaster.polarity,
        dayMasterCharacter: dayMaster.character,
        yearIsEstimate: window !== undefined && window.year.values.length > 1,
        dayMasterName: dayMaster.name,
        personal: buildPersonalContext(chart, { yearIsEstimate: window !== undefined && window.year.values.length > 1, monthIsEstimate: window !== undefined && window.month.values.length > 1 }),
    };
}
/** Name size, as a share of the central circle's diameter, by the number of letters: a long name takes a smaller share so it stays inside the glass. */
export function nameScale(letters) {
    if (letters <= 3)
        return 0.235;
    if (letters === 4)
        return 0.215;
    if (letters === 5)
        return 0.19;
    if (letters === 6)
        return 0.165;
    return 0.145;
}
/** The words as the reader sees them (localised), from the data. */
export function baziHeroView(data) {
    return {
        animalText: zodiacAnimalWord(data.animal),
        character: ZODIAC_ANIMAL_CHARACTER[data.animal],
        centreElement: data.animalElement,
        centreLabel: labelText('Year animal'),
        centreTopic: animalTopicId(data.animal),
        estimate: data.yearIsEstimate ? t('bazi.hero.estimate') : null,
        satellites: [
            { slot: 'element', label: labelText('Element'), value: phaseWord(data.yearElement), element: data.yearElement, character: ELEMENT_CHARACTER[data.yearElement], topic: elementTopicId(data.yearElement) },
            { slot: 'polarity', label: labelText('Yin / Yang'), value: engineProse(data.yearPolarity), element: null, character: POLARITY_CHARACTER[data.yearPolarity], topic: polarityTopicId(data.yearPolarity) },
            {
                slot: 'day-master',
                label: labelText('Day Master'),
                value: `${engineProse(data.dayMasterPolarity)} ${phaseWord(data.dayMasterElement)}`,
                element: data.dayMasterElement,
                character: data.dayMasterCharacter,
                topic: dayMasterTopicId(data.dayMasterName ?? 'wu'),
            },
        ],
    };
}
/**
 * The markup. Two lists, as in the Numerology hero, so assistive technology reads the sign first and then the three layers; the circles are
 * presentation and take no input. The animal's character is decoration (aria-hidden): the name says it.
 */
export function renderBaziHero(data) {
    const view = baziHeroView(data);
    const letters = Array.from(view.animalText).length;
    const core = `<ul class="kt-orbit-core" role="list" data-element="${escapeAttribute(view.centreElement)}"><li class="kt-orbit-core-slot" data-orbit="Year animal">
        <span class="kt-orbit-bubble kt-bazi-sign" style="--kb-name:${nameScale(letters)}"${topicAttributes(view.centreTopic, `${view.centreLabel}: ${view.animalText}`)}>
          <span class="kt-bazi-glyph" aria-hidden="true">${escapeHtml(view.character)}</span>
          <span class="kt-orbit-label">${escapeHtml(view.centreLabel)}</span>
          <span class="kt-orbit-value">${escapeHtml(view.animalText)}</span>
          ${view.estimate ? `<span class="kt-bazi-hint">${escapeHtml(view.estimate)}</span>` : ''}
        </span>
      </li></ul>`;
    const slots = view.satellites.map((entry, index) => `<li class="kt-orbit-slot" style="--ko-a:${BAZI_SLOT_ANGLES[index]}deg;--kb-i:${index}" data-orbit="${escapeAttribute(entry.slot)}"${entry.element ? ` data-element="${escapeAttribute(entry.element)}"` : ''}>
        <span class="kt-orbit-bubble"${topicAttributes(entry.topic, `${entry.label}: ${entry.value}`)}>
          <span class="kt-bazi-glyph" aria-hidden="true">${escapeHtml(entry.character)}</span>
          <span class="kt-orbit-label">${escapeHtml(entry.label)}</span>
          <span class="kt-orbit-value">${escapeHtml(entry.value)}</span>
        </span>
      </li>`).join('');
    return `<header class="kt-pillar-head kt-orbit-hero kt-bazi-hero" data-orbit-hero="bazi"${data.yearIsEstimate ? ' data-year-estimate="on"' : ''}${data.personal ? ` data-bazi-personal="${escapeAttribute(encodePersonalContext(data.personal))}"` : ''}>
    <div class="kt-orbit-arcs" aria-hidden="true"></div>
    ${core}
    <ul class="kt-orbit" role="list">${slots}</ul>
    ${renderScrollCue()}
  </header>`;
}
/** One revolution of the three circles round the Earth, in seconds (uniform, clockwise). */
export const BAZI_ORBIT_PERIOD_SECONDS = 40;
/**
 * The stylesheet: only what is BaZi's own, on top of the Numerology hero's (numerologyOrbitCss), and more specific than it (one more class),
 * so the two never fight. Injected by numerologyOrbitHero.ts beside it.
 */
export function baziHeroCss() {
    const H = '#place-experience#place-experience .kt-orbit-hero.kt-bazi-hero';
    return `
    /* BAZI HERO (V2). The three circles travel clockwise round the Earth, one revolution in ${BAZI_ORBIT_PERIOD_SECONDS} s, at one steady speed: the Numerology hero's own
       transform-only machinery (ul.kt-orbit spins 0 -> 360deg, each circle counter-spins 0 -> -360deg from the same instant, so every label stays level
       the whole way round) at a third of its period. The three keep their 120 degrees; nothing here changes layout. A device that asks for less motion
       (the base sheet's rule) sees them at rest at their starting places, a balanced triangle. */
    ${H} { --ko-period: ${BAZI_ORBIT_PERIOD_SECONDS}s; --ko-arc: 218, 230, 252; --kb-gold: 255, 224, 160; }
    /* The arcs element is a complete luminous ring through the three circles here (no mask): the three are one layer, framing the Earth. */
    ${H} .kt-orbit-arcs { -webkit-mask-image: none; mask-image: none; opacity: 0.95; }
    /* THE CHART VIEWS. While the pentagon is on screen the three circles step back (the Year Animal stays, as in the approved reference); while the
       seasonal wheel is on screen the whole formation does. Opacity only; set by numerologyOrbitHero.ts from what is on screen. */
    ${H} .kt-orbit, ${H} .kt-orbit-arcs, ${H} .kt-orbit-core { transition: opacity 420ms ease; }
    ${H}[data-chart-view="pentagon"] .kt-orbit, ${H}[data-chart-view="pentagon"] .kt-orbit-arcs { opacity: 0; }
    ${H}[data-chart-view="wheel"] .kt-orbit, ${H}[data-chart-view="wheel"] .kt-orbit-arcs, ${H}[data-chart-view="wheel"] .kt-orbit-core { opacity: 0; }
    /* THE SIGN. Cinnabar and warm gold is the base (the label and the name stay pale); the rim, halo and light take the colour of the element of the animal's
       own branch (the Rabbit is Yin Wood: green), the same colour as its explanation sheet - see the element rules below. The animal is the strongest thing on the screen. */
    ${H} .kt-orbit-core {
      --ko-rim: 242, 178, 140;
      --ko-glow: 206, 98, 72;
      --ko-label: 250, 228, 204;
      --ko-number: 255, 232, 196;
      --ko-hot: 255, 242, 220;
      --ko-sheen: 252, 214, 178;
    }
    /* The sign is drawn a little larger than the Numerology centre (106 %; it was 118 %, which was large against the bubble system of the Numerology
       heroes), so the animal is still the first thing seen. The ring the three circles stand on is unchanged: only this circle is smaller, and it clears them by more. */
    ${H} .kt-orbit-core { --ko-size: calc(var(--ko-bubble, 120px) * 1.06); }
    ${H} .kt-bazi-sign { gap: calc(var(--ko-size, 120px) * 0.05); }
    ${H} .kt-bazi-sign .kt-orbit-value {
      position: relative;
      z-index: 1;
      font-size: calc(var(--ko-size, 120px) * var(--kb-name, 0.18));
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    ${H} .kt-bazi-sign .kt-orbit-label { position: relative; z-index: 1; font-size: clamp(8px, calc(var(--ko-size, 120px) * 0.072), 11px); letter-spacing: 0.17em; }
    /* The animal's character, large and faint behind the name, like a seal. Decoration only. */
    ${H} .kt-bazi-glyph {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Noto Serif CJK TC', 'Noto Serif TC', 'Songti TC', 'PMingLiU', 'Noto Serif CJK SC', 'Noto Sans CJK TC', 'Microsoft JhengHei', serif;
      font-size: calc(var(--ko-size, 120px) * 0.6);
      line-height: 1;
      color: rgba(var(--ko-rim), 0.16);
      text-shadow: 0 0 14px rgba(var(--ko-glow), 0.22);
      pointer-events: none;
    }
    ${H} .kt-bazi-hint {
      position: relative;
      z-index: 1;
      font-size: clamp(6.5px, calc(var(--ko-size, 120px) * 0.052), 8px);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(var(--ko-label), 0.7);
    }
    ${H}[data-year-estimate] .kt-bazi-sign { border-style: dashed; }
    /* THE THREE LAYERS. Words, not numbers: a quieter, wider face. Two-word values (Yin Earth) fold onto two lines inside the glass. */
    ${H} .kt-orbit .kt-orbit-value {
      font-size: clamp(12.5px, calc(var(--ko-size, 120px) * 0.185), 20px);
      letter-spacing: 0.07em;
      text-transform: uppercase;
      line-height: 1.08;
      text-wrap: balance;
      overflow-wrap: anywhere;
    }
    ${H} .kt-orbit .kt-orbit-bubble { padding-inline: 9%; gap: calc(var(--ko-size, 120px) * 0.05); }
    ${H} .kt-orbit .kt-bazi-glyph { font-size: calc(var(--ko-size, 120px) * 0.52); color: rgba(var(--ko-rim), 0.13); }
    ${H} .kt-orbit .kt-orbit-label, ${H} .kt-orbit .kt-orbit-value { position: relative; z-index: 1; }
    /* "Yin Earth" is two words on two lines: a touch smaller so both stay well inside the glass. */
    ${H} .kt-orbit-slot[data-orbit="day-master"] .kt-orbit-value { font-size: clamp(11.5px, calc(var(--ko-size, 120px) * 0.168), 18px); }
    /* Each circle takes the colour of its element: rim, halo and light (the type stays pale). The Yin / Yang circle is pearl. The centre circle takes the element of the animal's branch. */
    ${H} .kt-orbit-slot[data-orbit="polarity"] { --ko-rim: 236, 238, 246; --ko-glow: 172, 184, 208; --ko-sheen: 240, 244, 252; }
    ${H} .kt-orbit-slot[data-element="Wood"], ${H} .kt-orbit-core[data-element="Wood"] { --ko-rim: 123, 255, 143; --ko-glow: 85, 230, 106; --ko-sheen: 176, 250, 188; }
    ${H} .kt-orbit-slot[data-element="Fire"], ${H} .kt-orbit-core[data-element="Fire"] { --ko-rim: 255, 130, 112; --ko-glow: 243, 75, 75; --ko-sheen: 255, 190, 170; }
    ${H} .kt-orbit-slot[data-element="Earth"], ${H} .kt-orbit-core[data-element="Earth"] { --ko-rim: 255, 215, 106; --ko-glow: 244, 198, 91; --ko-sheen: 255, 236, 168; }
    ${H} .kt-orbit-slot[data-element="Metal"], ${H} .kt-orbit-core[data-element="Metal"] { --ko-rim: 234, 243, 251; --ko-glow: 190, 212, 236; --ko-sheen: 248, 252, 255; }
    ${H} .kt-orbit-slot[data-element="Water"], ${H} .kt-orbit-core[data-element="Water"] { --ko-rim: 111, 180, 255; --ko-glow: 57, 143, 255; --ko-sheen: 170, 214, 255; }
    /* THE CIRCLES OPEN THEIR EXPLANATION. The hero takes no input as a whole (the reading and the MENU capsule keep every touch), but each of the four
       circles is a button: a tap opens its explanation (baziKnowledgeSheet.ts). A circle is hit-tested where it IS (the orbit moves it with transforms), it
       is at least 44 px wide on a phone, and a swipe that starts on it still scrolls the page (no touch-action is taken). While a chart is across the
       middle of the page the circles that have faded out take no taps, and a hero that has been faded at the end of the reading (visibility hidden) takes none. */
    ${H} .kt-orbit-bubble[data-bazi-topic] { pointer-events: auto !important; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
    ${H} .kt-orbit-bubble[data-bazi-topic]:focus:not(:focus-visible) { outline: none; }
    ${H} .kt-orbit-bubble[data-bazi-topic]:focus-visible { outline: 2px solid rgba(255, 225, 154, 0.9); outline-offset: 3px; }
    ${H}[data-chart-view="pentagon"] .kt-orbit .kt-orbit-slot .kt-orbit-bubble[data-bazi-topic],
    ${H}[data-chart-view="wheel"] .kt-orbit-core .kt-orbit-core-slot .kt-orbit-bubble[data-bazi-topic],
    ${H}[data-chart-view="wheel"] .kt-orbit .kt-orbit-slot .kt-orbit-bubble[data-bazi-topic] { pointer-events: none !important; }
    body[data-bazi-sheet] ${H} .kt-orbit-bubble[data-bazi-topic] { pointer-events: none !important; }
    /* BREATHING. One halo layer behind each circle, opacity only, very slow and staggered: the only motion on the hero besides the scroll cue.
       The centre has the slowest one and no stagger. A device that asks for less motion sees the halos at rest. */
    ${H} .kt-orbit-bubble::before {
      content: '';
      position: absolute;
      inset: -16%;
      border-radius: 50%;
      background: radial-gradient(circle closest-side, rgba(var(--ko-glow), 0) 62%, rgba(var(--ko-glow), 0.2) 78%, rgba(var(--ko-glow), 0) 100%);
      opacity: 0.55;
      pointer-events: none;
      will-change: opacity;
      animation: kt-bazi-breathe 9s ease-in-out infinite;
      animation-delay: calc(var(--kb-i, 0) * -3s);
    }
    ${H} .kt-bazi-sign::before { animation-duration: 12s; animation-delay: 0s; inset: -14%; }
    @keyframes kt-bazi-breathe { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }
    @media (prefers-reduced-motion: reduce) {
      ${H}:not([data-orbit-motion="on"]) .kt-orbit-bubble::before { animation: none; will-change: auto; opacity: 0.55; }
    }
  `;
}
