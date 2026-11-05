import { dbGet, dbPut, dbDelete, dbGetAllByIndex, dbDeleteByIndex } from './db.js?v=4cd804d';
const STORE = 'readings';
export async function saveReading(data) {
    const id = crypto.randomUUID();
    const reading = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
    };
    await dbPut(STORE, reading);
    return id;
}
export async function getReading(readingId) {
    return dbGet(STORE, readingId);
}
export async function getReadingsForProfile(profileId) {
    const readings = await dbGetAllByIndex(STORE, 'profileId', profileId);
    return readings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function deleteReading(readingId) {
    await dbDelete(STORE, readingId);
}
export async function deleteReadingsForProfile(profileId) {
    return dbDeleteByIndex(STORE, 'profileId', profileId);
}
