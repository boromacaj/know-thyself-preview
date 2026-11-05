import { listProfiles, updateProfile } from '../persistence/profileStore.js?v=4cd804d';
import { dbGetAll, dbPut } from '../persistence/db.js?v=4cd804d';
export async function checkMigrationConflicts(guestUserId, authenticatedUserId) {
    const allProfiles = await listProfiles();
    const guestProfiles = allProfiles.filter((p) => p.ownerUserId === guestUserId || (guestUserId === '' && p.ownerUserId === null));
    const existingProfiles = allProfiles.filter((p) => p.ownerUserId === authenticatedUserId);
    return {
        hasConflicts: existingProfiles.length > 0,
        guestProfiles: guestProfiles.length,
        existingProfiles: existingProfiles.length,
    };
}
export async function migrateGuestToAccount(guestUserId, authenticatedUserId) {
    if (!authenticatedUserId) {
        return {
            profilesMigrated: 0,
            readingsMigrated: 0,
            acknowledgmentsMigrated: 0,
            errors: ['Authenticated user ID is required'],
            migratedAt: new Date().toISOString(),
        };
    }
    const errors = [];
    let profilesMigrated = 0;
    let acknowledgmentsMigrated = 0;
    const allProfiles = await listProfiles();
    const guestProfiles = allProfiles.filter((p) => p.ownerUserId === guestUserId || (guestUserId === '' && p.ownerUserId === null));
    for (const profile of guestProfiles) {
        try {
            await updateProfile(profile.id, { ownerUserId: authenticatedUserId });
            profilesMigrated++;
        }
        catch (err) {
            errors.push(`Profile ${profile.id}: ${err instanceof Error ? err.message : 'unknown error'}`);
        }
    }
    const allAcks = await dbGetAll('legal_acknowledgments');
    const guestAcks = allAcks.filter((a) => a.userId === guestUserId || (guestUserId === '' && a.userId === null));
    for (const ack of guestAcks) {
        try {
            const updated = { ...ack, userId: authenticatedUserId };
            await dbPut('legal_acknowledgments', updated);
            acknowledgmentsMigrated++;
        }
        catch (err) {
            errors.push(`Acknowledgment ${ack.id}: ${err instanceof Error ? err.message : 'unknown error'}`);
        }
    }
    return {
        profilesMigrated,
        readingsMigrated: 0,
        acknowledgmentsMigrated,
        errors,
        migratedAt: new Date().toISOString(),
    };
}
