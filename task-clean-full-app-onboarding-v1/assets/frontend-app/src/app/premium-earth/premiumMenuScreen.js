import { escapeAttribute, escapeHtml } from '../format.js?v=f9ab0a6';
import { t } from '../i18n/uiStrings.js?v=f9ab0a6';
import { CARD_HEIGHT, CARD_RADIUS, CARD_WIDTH, heartPath, } from './connectionsHeartGeometry.js?v=f9ab0a6';
import { astrologyMenuArt } from './astrologyMenuArt.js?v=f9ab0a6';
import { baziMenuArt } from './baziMenuArt.js?v=f9ab0a6';
import { forecastMenuArt } from './forecastMenuArt.js?v=f9ab0a6';
import { humanDesignMenuArt } from './humanDesignMenuArt.js?v=f9ab0a6';
import { numerologyMenuArt } from './numerologyMenuArt.js?v=f9ab0a6';
import { synthesisMenuArt } from './synthesisMenuArt.js?v=f9ab0a6';
import { synthesisTraceArt } from './synthesisTraceArt.js?v=f9ab0a6';
import { tarotMenuArt } from './tarotMenuArt.js?v=f9ab0a6';
/** The four systems, in the order the strip gives them: astrology first, as the reader's order has it. */
export const MENU_PILLARS = [
    { id: 'western-astrology', labelKey: 'menu.pillar.western-astrology', shortKey: 'menu.pillarShort.western-astrology' },
    { id: 'numerology', labelKey: 'menu.pillar.numerology', shortKey: 'menu.pillarShort.numerology' },
    { id: 'human-design', labelKey: 'menu.pillar.human-design', shortKey: 'menu.pillarShort.human-design' },
    { id: 'bazi-tcm', labelKey: 'menu.pillar.bazi-tcm', shortKey: 'menu.pillarShort.bazi-tcm' },
];
export const MENU_TILES = [
    { id: 'tarot', labelKey: 'nav.tarot', attribute: 'data-tarot-open' },
    { id: 'connections', labelKey: 'menu.connections', attribute: 'data-connections-open' },
    { id: 'forecast', labelKey: 'nav.forecast', attribute: 'data-forecast-open' },
];
/* ------------------------------------------------------------------ art -- */
/**
 * ASTROLOGY: THE PHASES OF THE MOON, GLIDING THROUGH A WINDOW. The Human Design card's circle on the middle of the card, and through it, from the right to the left, the eight phases of the Moon one after
 * another - new, waxing crescent, first quarter, waxing gibbous, full, waning gibbous, last quarter, waning crescent - each fading up as it comes in and fading out as it goes; 3 s each, 24 s the month.
 * The markup is astrologyMenuArt.ts, the shapes astrologyMenuGeometry.ts, the clock astrologyMenuTimeline.ts and the motion astrologyMenuStyle.ts.
 */
const astrologyArt = () => astrologyMenuArt();
/**
 * NUMEROLOGY: THE NUMBERS 1 TO 9 IN A WINDOW. The Human Design card's circle on the middle of the card, and in it, one at a time, a number as a thin line of light with round ends - in the first round
 * the odd ones Roman and the even ones Arabic, in the second the other way about; 3.5 s each, 63 s the loop. The markup is numerologyMenuArt.ts, the lines numerologyMenuGeometry.ts, the clock
 * numerologyMenuTimeline.ts and the motion numerologyMenuStyle.ts.
 */
const numerologyArt = () => numerologyMenuArt();
/**
 * HUMAN DESIGN: A WINDOW ON THE BODYGRAPH, ONE CENTRE AT A TIME. A circle on the middle of the card, and in it, for three and a half seconds each, the nine energy centres one after another - each
 * at the geometric middle of the circle, in the silhouette the Human Design page draws, with the channels that leave it (and only those) grown out to the circle's edge along their real routes; thirty-two
 * seconds the loop. The markup is humanDesignMenuArt.ts, the geometry humanDesignMenuGeometry.ts (the page's own paths), the clock humanDesignMenuTimeline.ts and the motion humanDesignMenuStyle.ts.
 */
const humanDesignArt = () => humanDesignMenuArt();
/**
 * BAZI: THE FIVE ELEMENTS AS THEIR CHINESE CHARACTERS, ONE AT A TIME, IN A WINDOW. The Human Design card's circle on the middle of the card, and in it, for three and a half seconds each, Wood 木, Fire 火,
 * Earth 土, Metal 金 and Water 水 - in the order in which each gives rise to the next - as a large character in a line of light; eighteen seconds the loop. The markup is baziMenuArt.ts, the geometry
 * baziMenuGeometry.ts, the clock baziMenuTimeline.ts and the motion baziMenuStyle.ts.
 */
const baziArt = () => baziMenuArt();
const PILLAR_ART = {
    'western-astrology': astrologyArt,
    numerology: numerologyArt,
    'human-design': humanDesignArt,
    'bazi-tcm': baziArt,
};
/**
 * TAROT: ONE GESTURE OF CARDS. One card opens into an arc fan of five, three are chosen and spread, and the three close back into the one card, six
 * seconds, and again. The markup is tarotMenuArt.ts, the shapes tarotMenuGeometry.ts and the motion tarotMenuStyle.ts. The card names nothing but itself: TAROT, the tile's own label under it.
 */
const tarotArt = () => tarotMenuArt();
/**
 * FORECAST: ONE LARGE PICTOGRAM AT A TIME, AND A SHORT GAUGE UNDER IT. A portrait card that cycles, over ten seconds, through the five Life Dynamics
 * areas - Mind & Focus, Career & Purpose, Love & Connection, Health & Recovery, Money & Resources - each drawn with the pictogram the Forecast panels
 * use (Love & Connection with the Connections heart). The markup is forecastMenuArt.ts and the motion is forecastMenuStyle.ts. The card names nothing
 * but itself: FORECAST, the tile's own label under it.
 */
const forecastArt = () => forecastMenuArt();
/** A coordinate as the markup writes it: two decimals at most. */
const fmtUnit = (value) => String(+value.toFixed(2));
/*
 * CONNECTIONS: TWO CARDS BECOME A HEART, AND THE HEART BEATS.
 *
 * A short story that loops. Two separate upright cards - the menu's own card silhouette, 7 : 12 with its soft corner - are
 * drawn together like magnets, lean in 45 degrees each and snap together; their union is a geometric heart. The heart then
 * beats, and the cards come apart again for the next time. Connection coming from two separate parts becoming one.
 *
 * The geometry (the cards and the heart they form) is connectionsHeartGeometry.ts; the motion is connectionsHeartStyle.ts.
 * This is only the markup: one SVG, one group that beats, and inside it
 *
 *   card    kt-menu-card-a / -b      a body (the faint fill) and its ink (a glow and a fine line), turned and moved
 *   form    kt-menu-heart-form       the single closed outline of the joined heart, which takes over from the cards' own
 *                                    lines when they have snapped together
 *
 * After the snap the cards' lines drop to a faint trace, so the join stays quietly visible - two cards made this heart -
 * while the heart's own outline is the clean silhouette. (An earlier version also sent heart-shaped sonar pulses out of the
 * heart across the card; the owner asked for it to be taken away, and it is in the history at 57c6013.)
 */
const connectionsArt = () => {
    const x = fmtUnit(-CARD_WIDTH / 2);
    const y = fmtUnit(-CARD_HEIGHT / 2);
    const rect = (className) => `<rect class="${className}" x="${x}" y="${y}" `
        + `width="${fmtUnit(CARD_WIDTH)}" height="${fmtUnit(CARD_HEIGHT)}" rx="${CARD_RADIUS}"/>`;
    const card = (side) => `<g class="kt-menu-card kt-menu-card-${side}">`
        + rect('kt-menu-card-body')
        + `<g class="kt-menu-card-ink">${rect('kt-menu-card-glow')}${rect('kt-menu-card-line')}</g></g>`;
    const heart = heartPath(1);
    return '<svg class="kt-menu-heart" viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round" '
        + 'aria-hidden="true" focusable="false">'
        + '<g class="kt-menu-heart-core">'
        + card('a') + card('b')
        + `<g class="kt-menu-heart-form"><path class="kt-menu-heart-glow" d="${heart}"/><path class="kt-menu-heart-line" d="${heart}"/></g>`
        + '</g></svg>';
};
const TILE_ART = {
    tarot: tarotArt, forecast: forecastArt, connections: connectionsArt,
};
/* --------------------------------------------------------------- screen -- */
function renderPillar(pillar) {
    const label = t(pillar.labelKey);
    return `
      <button class="kt-menu-pillar" type="button" data-pillar-open="${escapeAttribute(pillar.id)}"
        data-menu-item="${escapeAttribute(pillar.id)}" aria-label="${escapeAttribute(label)}">
        <span class="kt-menu-art kt-menu-art-${escapeAttribute(pillar.id)}" aria-hidden="true">${PILLAR_ART[pillar.id]()}</span>
        <span class="kt-menu-label">${escapeHtml(t(pillar.shortKey))}</span>
      </button>`;
}
function renderTile(tile) {
    const label = t(tile.labelKey);
    /* No tile has a backdrop layer any more (the Tarot tile's picture is its animated card). The empty slot is kept so that every tile's markup, the
       Connections tile's byte for byte, is what it was. */
    const background = '';
    const art = `<span class="kt-menu-tile-art" aria-hidden="true">${TILE_ART[tile.id]()}</span>`;
    if (tile.attribute === null) {
        /* Nothing to open yet: a real, disabled control in the row, the same size as its neighbours, saying why. */
        return `
      <button class="kt-menu-tile is-soon" type="button" disabled aria-disabled="true"
        data-menu-item="${escapeAttribute(tile.id)}">
        ${background}
        ${art}
        <span class="kt-menu-tile-label">${escapeHtml(label)}</span>
        <span class="kt-menu-soon">${escapeHtml(t('menu.soon'))}</span>
      </button>`;
    }
    return `
      <button class="kt-menu-tile" type="button" ${tile.attribute}
        data-menu-item="${escapeAttribute(tile.id)}">
        ${background}
        ${art}
        <span class="kt-menu-tile-label">${escapeHtml(label)}</span>
      </button>`;
}
/** The whole menu, as markup for a `.kt-pillar-surface`. Pure: it reads the language and nothing else. */
export function renderPremiumMenuView() {
    const pillars = MENU_PILLARS.map(renderPillar).join('');
    const tiles = MENU_TILES.map(renderTile).join('');
    return `
    <div class="kt-menu" data-menu="main">
      <h1 class="kt-menu-brand">${escapeHtml(t('menu.brand'))}</h1>
      <section class="kt-menu-core" aria-label="${escapeAttribute(t('menu.pillars.aria'))}">
        <div class="kt-menu-pillars">${pillars}
        </div>
        <div class="kt-menu-bridge" aria-hidden="true"></div>
        <button class="kt-menu-synthesis" type="button" data-synthesis-open data-menu-item="synthesis">
          <span class="kt-menu-syn" aria-hidden="true">${synthesisMenuArt()}</span>
          <span class="kt-menu-synthesis-label">${escapeHtml(t('menu.synthesis'))}</span>
        </button>
        ${synthesisTraceArt()}
      </section>
      <section class="kt-menu-tiles" aria-label="${escapeAttribute(t('menu.more.aria'))}">${tiles}
      </section>
    </div>`;
}
