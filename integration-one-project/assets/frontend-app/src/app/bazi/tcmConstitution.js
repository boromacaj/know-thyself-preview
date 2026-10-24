import { TCM_PHASE_CORRESPONDENCES } from './data/tcmCorrespondence.js';
const NON_DIAGNOSTIC_DISCLAIMER = 'This is a traditional, symbolic correspondence layer derived from your calculated Five Phase chart structure. It is not a medical diagnosis, not a clinical assessment, and not treatment advice. If you have a health concern, please consult a qualified clinician.';
export function buildTcmConstitution(rawBalance, dayMasterElement, seasonalContext) {
    const mostRepresentedPhases = rawBalance.dominantPhases;
    const leastRepresentedPhases = rawBalance.absentPhases.length > 0
        ? rawBalance.absentPhases
        : leastCount(rawBalance);
    const emphasisNotes = [];
    if (mostRepresentedPhases.length > 0) {
        emphasisNotes.push(`${mostRepresentedPhases.join(' and ')} ${mostRepresentedPhases.length > 1 ? 'are' : 'is'} relatively more represented in this symbolic chart model (${rawBalance.counts[mostRepresentedPhases[0]]} of ${rawBalance.totalCounted} counted positions).`);
    }
    if (leastRepresentedPhases.length > 0) {
        emphasisNotes.push(`${leastRepresentedPhases.join(' and ')} ${leastRepresentedPhases.length > 1 ? 'are' : 'is'} relatively less represented in this symbolic chart model. Less represented is not automatically a weakness, and abundant is not automatically harmful — traditional correspondence only.`);
    }
    const dayMasterCorrespondence = TCM_PHASE_CORRESPONDENCES[dayMasterElement];
    emphasisNotes.push(`Your Day Master phase, ${dayMasterElement}, traditionally corresponds to the ${dayMasterCorrespondence.yinOrgan}/${dayMasterCorrespondence.yangOrgan} system pair.`);
    const seasonalNote = `The active solar month is seasonally ${seasonalContext.stateByPhase[dayMasterElement]} for the ${dayMasterElement} phase (month governed by ${seasonalContext.rulingPhase}). This is a structural seasonal correspondence, not a strength or health verdict.`;
    const reflectionPrompts = [
        ...mostRepresentedPhases.map((phase) => TCM_PHASE_CORRESPONDENCES[phase].reflectionPrompt),
        dayMasterCorrespondence.reflectionPrompt,
    ].filter((prompt, index, all) => all.indexOf(prompt) === index).slice(0, 3);
    return {
        mostRepresentedPhases,
        leastRepresentedPhases,
        dayMasterPhase: dayMasterElement,
        dayMasterCorrespondence,
        emphasisNotes,
        seasonalNote,
        reflectionPrompts,
        disclaimer: NON_DIAGNOSTIC_DISCLAIMER,
        evidenceType: 'symbolic-interpretation',
    };
}
function leastCount(rawBalance) {
    const minCount = Math.min(...Object.values(rawBalance.counts));
    return Object.entries(rawBalance.counts)
        .filter(([, count]) => count === minCount)
        .map(([phase]) => phase);
}
