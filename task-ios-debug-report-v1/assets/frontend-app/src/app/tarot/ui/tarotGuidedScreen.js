import { escapeHtml } from '../../format.js?v=b5ef5ed';
import { pickLocalized } from '../../i18n/locale.js?v=b5ef5ed';
const EN = {
    modeGroup: 'Kind of Tarot reading',
    daily: 'Daily Tarot',
    guided: 'Guided Tarot',
    areaTitle: 'Choose an area of life',
    areaLead: 'A guided reading begins with the part of life you want to look at.',
    intentionTitle: 'What would you like to explore?',
    back: 'Back',
    changeArea: 'Change area',
    ritualBreath: 'Take a deep breath.',
    ritualQuiet: 'Let your mind grow quiet, and focus your energy on the guidance you seek from the universe.',
    ritualReady: 'When you feel ready, choose your cards.',
    chooseCards: 'Choose my cards',
    focusOn: 'Your focus',
    resumeTitle: 'Your last guided reading',
    resumeDraw: 'Cards still to choose',
    resumeReading: 'Finished',
    resume: 'Continue',
    startNew: 'Start a new one',
    yourReading: 'Your guided reading',
    newReading: 'New guided reading',
    toDaily: 'Daily Tarot',
    loading: 'Preparing your guided reading',
    pickLine: (step, total, place) => `Card ${step} of ${total} · ${place}`,
    reversed: 'Reversed',
    upright: 'Upright',
};
const SK = {
    modeGroup: 'Druh tarotového čítania',
    daily: 'Denný tarot',
    guided: 'Tematický tarot',
    areaTitle: 'Vyber oblasť života',
    areaLead: 'Tematické čítanie začína oblasťou života, na ktorú sa chceš pozrieť.',
    intentionTitle: 'Čo chceš preskúmať?',
    back: 'Späť',
    changeArea: 'Zmeniť oblasť',
    ritualBreath: 'Zhlboka sa nadýchni.',
    ritualQuiet: 'Nechaj myšlienky utíchnuť a sústreď svoju energiu na to, v čom hľadáš odpoveď.',
    ritualReady: 'Keď to tak budeš cítiť, vyber si karty.',
    chooseCards: 'Vybrať karty',
    focusOn: 'Tvoje zameranie',
    resumeTitle: 'Tvoje posledné tematické čítanie',
    resumeDraw: 'Ešte treba vybrať karty',
    resumeReading: 'Dokončené',
    resume: 'Pokračovať',
    startNew: 'Začať nové',
    yourReading: 'Tvoje tematické čítanie',
    newReading: 'Nové tematické čítanie',
    toDaily: 'Denný tarot',
    loading: 'Pripravujem tematické čítanie',
    pickLine: (step, total, place) => `Karta ${step} z ${total} · ${place}`,
    reversed: 'Obrátená',
    upright: 'Základná poloha',
};
export const tarotGuidedStrings = () => pickLocalized({ en: EN, sk: SK });
/** The choice between the two modes. `selected` is the one that is on; Daily Tarot is the first and the default. */
export function modeSwitchMarkup(selected) {
    const strings = tarotGuidedStrings();
    const button = (mode, label) => `<button type="button" class="tg-mode${selected === mode ? ' is-on' : ''}" data-tg-mode="${mode}" aria-pressed="${selected === mode ? 'true' : 'false'}">${escapeHtml(label)}</button>`;
    return `<div class="tg-modes" role="group" aria-label="${escapeHtml(strings.modeGroup)}">${button('daily', strings.daily)}${button('guided', strings.guided)}</div>`;
}
