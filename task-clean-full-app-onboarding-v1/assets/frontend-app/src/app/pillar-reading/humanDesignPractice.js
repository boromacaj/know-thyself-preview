import { engineProse } from '../i18n/engineProse.js?v=f9ab0a6';
import { t, tf } from '../i18n/uiStrings.js?v=f9ab0a6';
const PRACTICES = {
    Sacral: {
        signal: 'reading.hdPractice.sacral.signal',
        steps: [
            'reading.hdPractice.sacral.step1',
            'reading.hdPractice.sacral.step2',
            'reading.hdPractice.sacral.step3',
            'reading.hdPractice.sacral.step4',
        ],
        concepts: ['interoception', 'bodily-signal', 'cognitive-rationalisation'],
    },
    'Emotional / Solar Plexus': {
        signal: 'reading.hdPractice.emotional.signal',
        steps: [
            'reading.hdPractice.emotional.step1',
            'reading.hdPractice.emotional.step2',
            'reading.hdPractice.emotional.step3',
            'reading.hdPractice.emotional.step4',
        ],
        concepts: ['autonomic-arousal', 'bodily-signal', 'cognitive-rationalisation'],
    },
    Splenic: {
        signal: 'reading.hdPractice.splenic.signal',
        steps: [
            'reading.hdPractice.splenic.step1',
            'reading.hdPractice.splenic.step2',
            'reading.hdPractice.splenic.step3',
            'reading.hdPractice.splenic.step4',
        ],
        concepts: ['interoception', 'bodily-signal', 'cognitive-rationalisation'],
    },
    'Ego Manifested': {
        signal: 'reading.hdPractice.egoManifested.signal',
        steps: [
            'reading.hdPractice.egoManifested.step1',
            'reading.hdPractice.egoManifested.step2',
            'reading.hdPractice.egoManifested.step3',
            'reading.hdPractice.egoManifested.step4',
        ],
        concepts: ['bodily-signal', 'cognitive-rationalisation'],
    },
    'Ego Projected': {
        signal: 'reading.hdPractice.egoProjected.signal',
        steps: [
            'reading.hdPractice.egoProjected.step1',
            'reading.hdPractice.egoProjected.step2',
            'reading.hdPractice.egoProjected.step3',
            'reading.hdPractice.egoProjected.step4',
        ],
        concepts: ['cognitive-rationalisation'],
    },
    'Self-Projected': {
        signal: 'reading.hdPractice.selfProjected.signal',
        steps: [
            'reading.hdPractice.selfProjected.step1',
            'reading.hdPractice.selfProjected.step2',
            'reading.hdPractice.selfProjected.step3',
            'reading.hdPractice.selfProjected.step4',
        ],
        concepts: ['cognitive-rationalisation'],
    },
    'Mental / Environmental': {
        signal: 'reading.hdPractice.mental.signal',
        steps: [
            'reading.hdPractice.mental.step1',
            'reading.hdPractice.mental.step2',
            'reading.hdPractice.mental.step3',
            'reading.hdPractice.mental.step4',
        ],
        concepts: ['cognitive-rationalisation'],
    },
    Lunar: {
        signal: 'reading.hdPractice.lunar.signal',
        steps: [
            'reading.hdPractice.lunar.step1',
            'reading.hdPractice.lunar.step2',
            'reading.hdPractice.lunar.step3',
            'reading.hdPractice.lunar.step4',
        ],
        concepts: ['autonomic-arousal', 'cognitive-rationalisation'],
    },
};
/** What each type is asked to do about other people, once it has decided. */
const INFORMING = {
    'Manifesting Generator': 'reading.hdPractice.inform.manifestingGenerator',
    Manifestor: 'reading.hdPractice.inform.manifestor',
};
export function composePractice(type, authority, strategy) {
    if (!authority)
        return null;
    const practice = PRACTICES[authority];
    if (!practice)
        return null;
    const entries = [{
            id: 'practice-authority',
            /* The authority's NAME is canonical and stays as the engine prints it. */
            title: tf('reading.hdPractice.authorityTitle', { authority }),
            infoKey: 'hd-authority',
            paragraphs: [
                tf('reading.hdPractice.opening', { signal: t(practice.signal) }),
                ...practice.steps.map((step, index) => `${index + 1}. ${t(step)}`),
            ],
        }];
    const informing = type ? INFORMING[type] : undefined;
    if (informing || strategy) {
        entries.push({
            id: 'practice-strategy',
            title: strategy
                ? tf('reading.hdPractice.strategyTitle', { strategy: engineProse(strategy) })
                : t('reading.hdPractice.strategyTitlePlain'),
            infoKey: 'hd-strategy',
            paragraphs: [
                ...(strategy
                    ? [tf('reading.hdPractice.strategyBody', { strategy: engineProse(strategy).toLowerCase() })]
                    : []),
                ...(informing ? [t(informing)] : []),
            ],
        });
    }
    /* The boundary, stated once at the end of the practice rather than attached to
       each step, so it reads as a position rather than as a nervous tic. */
    entries.push({
        id: 'practice-boundary',
        title: t('reading.hdPractice.boundaryTitle'),
        infoKey: 'bodily-signal',
        paragraphs: [
            t('reading.hdPractice.boundary.1'),
            t('reading.hdPractice.boundary.2'),
        ],
    });
    return {
        standfirst: t('reading.hdPractice.standfirst'),
        entries,
        concepts: practice.concepts,
    };
}
