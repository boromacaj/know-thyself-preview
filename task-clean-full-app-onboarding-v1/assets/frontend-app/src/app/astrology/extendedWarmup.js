import { EXTENDED_OBJECT_IDS, extendedObjectApparentPositionAt } from './extended/extendedObjectProvider.js?v=f9ab0a6';
import { MOTION_SAMPLE_HOURS } from './ephemerisEngine.js?v=f9ab0a6';
export function scheduleExtendedObjectWarmup(moment, timeKnown) {
    if (!timeKnown || moment.status !== 'ready' || !moment.utcDateTime)
        return;
    if (typeof window === 'undefined')
        return;
    const birth = new Date(moment.utcDateTime).getTime();
    if (!Number.isFinite(birth))
        return;
    const offset = MOTION_SAMPLE_HOURS * 3_600_000;
    const instants = [birth, birth - offset, birth + offset].map((ms) => new Date(ms));
    const idle = window.requestIdleCallback;
    EXTENDED_OBJECT_IDS.forEach((id, index) => {
        const work = () => { for (const instant of instants)
            extendedObjectApparentPositionAt(id, instant); };
        if (idle)
            idle(work, { timeout: 6000 + index * 400 });
        else
            window.setTimeout(work, 1200 + index * 450);
    });
}
