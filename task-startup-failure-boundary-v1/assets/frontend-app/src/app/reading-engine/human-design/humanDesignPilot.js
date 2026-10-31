import { setHumanDesignRealizer } from '../../pillar-reading/human-design-narrative/humanDesignRealizerPort.js?v=2ea79e9';
import { realizeHumanDesignPilot } from './humanDesignPilotRealizer.js?v=2ea79e9';
/**
 * THE PILOT'S SWITCH, FOR TESTS, QA, AND THE ISOLATED ALL-LATEST REVIEW PREVIEW.
 *
 * Registers the pilot realizer with the Human Design narrative layer; `deactivate` puts the shipped composition back.
 * Only the review-preview entrypoint can activate it, through an exact pathname gate. The default registry is empty,
 * canonical never activates it, and tests can turn it on and off explicitly.
 */
export function activateHumanDesignPilot() {
    setHumanDesignRealizer(realizeHumanDesignPilot);
}
export function deactivateHumanDesignPilot() {
    setHumanDesignRealizer(null);
}
