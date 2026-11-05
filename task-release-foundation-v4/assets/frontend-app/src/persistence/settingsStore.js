import { dbGet, dbPut, dbDelete, dbGetAll } from './db.js?v=4cd804d';
const STORE = 'settings';
export async function getSetting(key) {
    const entry = await dbGet(STORE, key);
    return entry?.value ?? null;
}
export async function setSetting(key, value) {
    const entry = {
        key,
        value,
        updatedAt: new Date().toISOString(),
    };
    await dbPut(STORE, entry);
}
export async function deleteSetting(key) {
    await dbDelete(STORE, key);
}
export async function getAllSettings() {
    return dbGetAll(STORE);
}
