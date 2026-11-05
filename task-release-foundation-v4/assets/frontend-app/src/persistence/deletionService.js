import { listProfiles, deleteProfile } from './profileStore.js?v=4cd804d';
import { deleteReadingsForProfile } from './readingStore.js?v=4cd804d';
import { dbClear, dbGetAll, dbDelete } from './db.js?v=4cd804d';
/**
 * Forgets everything in the database, whoever owns it: the device is one person's, and a deletion that left a record
 * owned by an older identity (a null-owned shadow from before guest ids, a stale guest) behind would not be a deletion.
 * Counts are read first so the report says what was actually there.
 */
export async function deleteEverything() {
    const profiles = await listProfiles();
    const readings = await dbGetAll('readings');
    const acknowledgments = await dbGetAll('legal_acknowledgments');
    let syncQueue = [];
    try {
        syncQueue = await dbGetAll('sync_queue');
    }
    catch {
        // sync_queue may not exist in test environments
    }
    await dbClear('readings');
    await dbClear('profiles');
    await dbClear('legal_acknowledgments');
    await dbClear('settings');
    try {
        await dbClear('sync_queue');
    }
    catch {
        // sync_queue may not exist in test environments
    }
    return {
        deletedAt: new Date().toISOString(),
        profilesDeleted: profiles.length,
        readingsDeleted: readings.length,
        settingsCleared: 1,
        acknowledgmentsDeleted: acknowledgments.length,
        syncQueueCleared: syncQueue.length,
    };
}
export async function deleteAllUserData(userId) {
    const allProfiles = await listProfiles();
    const targetProfiles = userId
        ? allProfiles.filter((p) => p.ownerUserId === userId)
        : allProfiles.filter((p) => p.ownerUserId === null);
    let readingsDeleted = 0;
    for (const profile of targetProfiles) {
        const count = await deleteReadingsForProfile(profile.id);
        readingsDeleted += count;
    }
    for (const profile of targetProfiles) {
        await deleteProfile(profile.id);
    }
    let acknowledgmentsDeleted = 0;
    const allAcks = await dbGetAll('legal_acknowledgments');
    const targetAcks = userId
        ? allAcks.filter((a) => a.userId === userId)
        : allAcks.filter((a) => a.userId === null);
    for (const ack of targetAcks) {
        await dbDelete('legal_acknowledgments', ack.id);
        acknowledgmentsDeleted += 1;
    }
    await dbClear('settings');
    let syncQueueCleared = 0;
    try {
        const allEntries = await dbGetAll('sync_queue');
        for (const entry of allEntries) {
            await dbDelete('sync_queue', entry.id);
            syncQueueCleared += 1;
        }
    }
    catch {
        // sync_queue may not exist in test environments
    }
    return {
        deletedAt: new Date().toISOString(),
        profilesDeleted: targetProfiles.length,
        readingsDeleted,
        settingsCleared: 1,
        acknowledgmentsDeleted,
        syncQueueCleared,
    };
}
