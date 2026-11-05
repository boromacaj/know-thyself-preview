import { dbGet, dbGetAll, dbPut, dbDelete } from './db.js?v=4cd804d';
import { getSetting, setSetting } from './settingsStore.js?v=4cd804d';
const STORE = 'profiles';
const ACTIVE_PROFILE_KEY = 'activeProfileId';
function computeCalculationInputVersion(profile) {
    const relevant = [
        profile.birthGivenNames,
        profile.birthSurname,
        profile.birthDay,
        profile.birthMonth,
        profile.birthYear,
        profile.birthTime ?? '',
        profile.birthCountry ?? '',
        profile.birthRegion ?? '',
        profile.birthCity ?? '',
        profile.birthPostalCode ?? '',
    ].join('|');
    let hash = 0;
    for (let i = 0; i < relevant.length; i++) {
        const ch = relevant.charCodeAt(i);
        hash = ((hash << 5) - hash + ch) | 0;
    }
    return `v1-${(hash >>> 0).toString(36)}`;
}
export async function createProfile(data) {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const profile = {
        ...data,
        id,
        createdAt: now,
        updatedAt: now,
        version: 1,
        calculationInputVersion: '',
    };
    profile.calculationInputVersion = computeCalculationInputVersion(profile);
    await dbPut(STORE, profile);
    return id;
}
export async function getProfile(profileId) {
    return dbGet(STORE, profileId);
}
export async function updateProfile(profileId, updates) {
    const existing = await getProfile(profileId);
    if (!existing)
        throw new Error(`Profile ${profileId} not found`);
    const updated = {
        ...existing,
        ...updates,
        id: existing.id,
        createdAt: existing.createdAt,
        version: existing.version + 1,
        updatedAt: new Date().toISOString(),
        calculationInputVersion: existing.calculationInputVersion,
    };
    updated.calculationInputVersion = computeCalculationInputVersion(updated);
    await dbPut(STORE, updated);
}
export async function deleteProfile(profileId) {
    const activeId = await getActiveProfileId();
    await dbDelete(STORE, profileId);
    if (activeId === profileId) {
        await setSetting(ACTIVE_PROFILE_KEY, '');
    }
}
export async function listProfiles() {
    const profiles = await dbGetAll(STORE);
    return profiles.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
export async function getActiveProfileId() {
    const value = await getSetting(ACTIVE_PROFILE_KEY);
    return value || null;
}
export async function setActiveProfileId(profileId) {
    const profile = await getProfile(profileId);
    if (!profile)
        throw new Error(`Profile ${profileId} not found`);
    await setSetting(ACTIVE_PROFILE_KEY, profileId);
}
export async function getActiveProfile() {
    const activeId = await getActiveProfileId();
    if (!activeId)
        return null;
    return getProfile(activeId);
}
export async function getOrCreateGuestProfile(defaults) {
    const active = await getActiveProfile();
    if (active)
        return active;
    const profiles = await listProfiles();
    const guestProfile = profiles.find((p) => p.ownerUserId === null);
    if (guestProfile) {
        await setActiveProfileId(guestProfile.id);
        return guestProfile;
    }
    const id = await createProfile({ ...defaults, ownerUserId: null });
    await setActiveProfileId(id);
    const created = await getProfile(id);
    if (!created)
        throw new Error('Failed to create guest profile');
    return created;
}
export async function migrateGuestToUser(profileId, userId) {
    const profile = await getProfile(profileId);
    if (!profile)
        throw new Error(`Profile ${profileId} not found`);
    if (profile.ownerUserId && profile.ownerUserId !== userId) {
        throw new Error('Cannot reassign a profile owned by another user');
    }
    await updateProfile(profileId, { ownerUserId: userId });
}
