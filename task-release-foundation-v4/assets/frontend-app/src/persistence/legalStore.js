import { dbPut, dbGetAllByIndex, dbGetAll } from './db.js?v=4cd804d';
const STORE = 'legal_acknowledgments';
export async function recordAcknowledgment(data) {
    const id = crypto.randomUUID();
    const record = {
        ...data,
        id,
        acknowledgedAt: new Date().toISOString(),
    };
    await dbPut(STORE, record);
    return id;
}
export async function getAcknowledgments(userId) {
    if (userId) {
        return dbGetAllByIndex(STORE, 'userId', userId);
    }
    const all = await dbGetAll(STORE);
    return all.filter((a) => a.userId === null);
}
export async function getLatestAcknowledgment(userId, documentType) {
    const acknowledgments = await getAcknowledgments(userId);
    const matching = acknowledgments
        .filter((a) => a.documentType === documentType)
        .sort((a, b) => b.acknowledgedAt.localeCompare(a.acknowledgedAt));
    return matching[0] ?? null;
}
export async function hasAcknowledgedVersion(userId, documentType, requiredVersion) {
    const latest = await getLatestAcknowledgment(userId, documentType);
    return latest !== null && latest.documentVersion === requiredVersion;
}
