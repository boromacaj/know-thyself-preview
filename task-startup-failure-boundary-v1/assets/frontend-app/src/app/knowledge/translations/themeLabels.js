import { activeLocale } from '../../i18n/locale.js?v=2ea79e9';
/*
 * THE NAMES OF THE CROSS-PILLAR THEMES.
 *
 * A theme label is not chrome and it is not reading prose. It is a short name
 * the synthesis prints in half a dozen places - as a section title, inside a
 * sentence, lowercased mid-clause - and it has to be one word-for-word constant
 * in every one of them or the same theme appears under two names on one screen.
 *
 * WHY IT IS NOT IN uiStrings
 * Because it belongs to the knowledge base, not the interface. The English
 * label is authored beside the theme's prose in crossPillarCommentary.ts, and
 * keeping the Slovak in the translations folder puts the pair in the same
 * place as every other translated piece of that knowledge.
 *
 * WHY IT IS KEYED BY THE ENGLISH LABEL
 * The theme objects carry their label but not a stable separate id at the point
 * the composer prints them. Keying on the label is therefore the join that
 * exists; the coverage helper below turns a renamed English label into a
 * reported gap rather than a silent fallback.
 *
 * LOWERCASING
 * The composer lowercases some of these mid-sentence. Slovak lowercases the
 * same way for these phrases - none of them begins with a proper noun - so the
 * existing `.toLowerCase()` call stays correct and is left alone.
 */
/*
 * WHY SEVERAL OF THESE WERE RENAMED IN THE 2026-09 SLOVAK EDITORIAL PASS
 *
 * A theme label is the shortest reader-facing string in the whole app and the
 * one repeated most often, so a label that has to be mentally translated back
 * into English costs the reader on every screen it appears on. The first pass
 * produced dictionary equivalents - „Hlboké vnútorné spracovanie“, „Vytrvalá
 * stálosť“, „Pojmová abstrakcia“, „Tvorivé vytváranie“ - which are accurate,
 * abstract, and not how anybody in Slovak names these qualities.
 *
 * The test each replacement had to pass: would a Slovak reader with no interest
 * in astrology understand it at a glance, and is it a phrase Slovak actually
 * has? „Dlhý dych“ is exactly the quality `Steady endurance` names and is
 * idiomatic; „Vytrvalá stálosť“ is two synonyms stacked. „Tvorivé vytváranie“
 * says creative creating.
 *
 * Every one of these is also lowercased mid-sentence by the composer, so each
 * was checked in that position too - „užšie než premýšľanie do hĺbky“ reads,
 * „užšie než hlboké vnútorné spracovanie“ does not.
 */
const SK = {
    /* ------------------------------------------------------ the twelve themes */
    'Deep internal processing': 'Premýšľanie do hĺbky',
    'Independent direction': 'Vlastný smer',
    'Relational orientation': 'Zameranie na vzťahy',
    'Structured method': 'Štruktúrovaný postup',
    'Flexible improvisation': 'Pružná improvizácia',
    'Emotional permeability': 'Citová priepustnosť',
    'Emotional containment': 'Citová zdržanlivosť',
    'Outward expression': 'Prejav navonok',
    'Making and expressing': 'Tvoriť a dať to von',
    'Appetite for risk': 'Chuť riskovať',
    'Careful consolidation': 'Budovanie na istotu',
    'Conceptual abstraction': 'Myslenie v pojmoch',
    'Steady endurance': 'Dlhý dych',
    'Social visibility': 'Viditeľnosť medzi ľuďmi',
    /* The drives. Named the way a Slovak reader would name a want, not a
       dictionary equivalent of the English abstraction. */
    'Mastery and depth': 'Vedieť to poriadne',
    'Results and ambition': 'Výsledok a ambícia',
    'Being seen for it': 'Byť za to videný',
    'Meaning and purpose': 'Zmysel a smerovanie',
    'Closeness and belonging': 'Blízkosť a patrenie niekam',
    'Room to move': 'Priestor na pohyb',
    'Looking after things': 'Starať sa o to, čo to potrebuje',
    'Wanting to understand': 'Chcieť rozumieť',
    'Form and craft': 'Tvar a remeslo',
    'Inner focus': 'Sústredenie dovnútra',
    /* ------------------------------------------------------------- the axes */
    'Reasoning mode': 'Spôsob uvažovania',
    Autonomy: 'Samostatnosť',
    Structure: 'Štruktúra',
    'Risk posture': 'Postoj k riziku',
    'Emotional expression': 'Prejavovanie emócií',
    Visibility: 'Viditeľnosť',
    'Appetite for change': 'Chuť na zmenu',
    Initiative: 'Iniciatíva',
    Abstraction: 'Miera abstrakcie',
    /* ------------------------------------------- the method notes, as headings */
    'What agreement between systems means': 'Čo znamená, keď sa systémy zhodujú',
    'What disagreement between systems means': 'Čo znamená, keď sa systémy nezhodujú',
    'How support is weighed': 'Ako sa váži opora',
    'When only one system says it': 'Keď to hovorí len jeden systém',
    'When nothing converges strongly': 'Keď sa nič výrazne nezbieha',
    'Reading this without a birth time': 'Čítanie bez času narodenia',
    'Reading this with a system missing': 'Čítanie, keď jeden systém chýba',
};
const TABLES = { sk: SK };
/**
 * The theme's name in the reader's language, or the English one.
 *
 * Falls back to the label it was given rather than to a key or an empty string,
 * so an untranslated theme prints its real English name and reads as a gap
 * rather than as a bug.
 */
export function themeLabel(englishLabel) {
    return TABLES[activeLocale()]?.[englishLabel] ?? englishLabel;
}
/** English labels with no Slovak. Used by the localisation coverage report. */
export function untranslatedThemeLabels(labels) {
    const table = TABLES.sk;
    return labels.filter((label) => table[label] === undefined);
}
