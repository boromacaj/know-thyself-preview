import { activeLocale } from '../../../i18n/locale.js?v=2ea79e9';
import { TAROT_CARD_DETAIL_EN } from './tarotCardDetailEn.js?v=2ea79e9';
import { TAROT_CARD_DETAIL_SK } from './tarotCardDetailSk.js?v=2ea79e9';
const TABLES = {
    en: TAROT_CARD_DETAIL_EN,
    sk: TAROT_CARD_DETAIL_SK,
};
/** The paragraph for a card in an orientation, in the application's language unless one is given. Null for an unknown card. */
export function tarotCardDetailText(cardId, orientation, locale = activeLocale()) {
    const entry = TABLES[locale]?.[cardId];
    return entry ? entry[orientation] : null;
}
