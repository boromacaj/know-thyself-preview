import { listProfiles } from './profileStore.js?v=4cd804d';
import { getReadingsForProfile } from './readingStore.js?v=4cd804d';
import { getAllSettings } from './settingsStore.js?v=4cd804d';
import { getAcknowledgments } from './legalStore.js?v=4cd804d';
import { dbGetAll } from './db.js?v=4cd804d';
/** Everything in the database, whoever owns it: a device export must not miss a record held by an older identity. */
export async function exportEverything() {
    const profiles = await listProfiles();
    const readings = await dbGetAll('readings');
    const settings = await getAllSettings();
    const acknowledgments = await dbGetAll('legal_acknowledgments');
    let pendingSyncEntries = [];
    try {
        pendingSyncEntries = await dbGetAll('sync_queue');
    }
    catch {
        // sync_queue may not exist in some contexts
    }
    return { exportedAt: new Date().toISOString(), profiles, readings, settings, acknowledgments, pendingSyncEntries };
}
export async function exportAllUserData(userId) {
    const allProfiles = await listProfiles();
    const profiles = userId
        ? allProfiles.filter((p) => p.ownerUserId === userId)
        : allProfiles.filter((p) => p.ownerUserId === null);
    const readingArrays = await Promise.all(profiles.map((p) => getReadingsForProfile(p.id)));
    const readings = readingArrays.flat();
    const settings = await getAllSettings();
    const acknowledgments = await getAcknowledgments(userId);
    let pendingSyncEntries = [];
    try {
        pendingSyncEntries = await dbGetAll('sync_queue');
    }
    catch {
        // sync_queue may not exist in some contexts
    }
    return {
        exportedAt: new Date().toISOString(),
        profiles,
        readings,
        settings,
        acknowledgments,
        pendingSyncEntries,
    };
}
