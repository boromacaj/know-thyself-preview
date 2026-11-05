const DB_NAME = 'know-thyself-pro';
const DB_VERSION = 1;
let dbInstance = null;
let dbFailed = false;
function runMigrations(db, oldVersion) {
    if (oldVersion < 1) {
        const profiles = db.createObjectStore('profiles', { keyPath: 'id' });
        profiles.createIndex('ownerUserId', 'ownerUserId', { unique: false });
        profiles.createIndex('updatedAt', 'updatedAt', { unique: false });
        const readings = db.createObjectStore('readings', { keyPath: 'id' });
        readings.createIndex('profileId', 'profileId', { unique: false });
        readings.createIndex('readingType', 'readingType', { unique: false });
        readings.createIndex('createdAt', 'createdAt', { unique: false });
        db.createObjectStore('settings', { keyPath: 'key' });
        const acknowledgments = db.createObjectStore('legal_acknowledgments', { keyPath: 'id' });
        acknowledgments.createIndex('userId', 'userId', { unique: false });
        acknowledgments.createIndex('documentType', 'documentType', { unique: false });
        const syncQueue = db.createObjectStore('sync_queue', { keyPath: 'id' });
        syncQueue.createIndex('status', 'status', { unique: false });
        syncQueue.createIndex('entityType', 'entityType', { unique: false });
    }
}
export function getDb() {
    if (dbInstance)
        return Promise.resolve(dbInstance);
    if (dbFailed)
        return Promise.reject(new Error('IndexedDB is not available in this browser context'));
    return new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (event) => {
                const db = request.result;
                runMigrations(db, event.oldVersion);
            };
            request.onsuccess = () => {
                dbInstance = request.result;
                dbInstance.onclose = () => {
                    dbInstance = null;
                };
                resolve(dbInstance);
            };
            request.onerror = () => {
                dbFailed = true;
                reject(new Error(`IndexedDB open failed: ${request.error?.message ?? 'unknown error'}`));
            };
            request.onblocked = () => {
                reject(new Error('IndexedDB open blocked — close other tabs using this application'));
            };
        }
        catch (error) {
            dbFailed = true;
            reject(error instanceof Error ? error : new Error('IndexedDB is not available'));
        }
    });
}
export function dbTransaction(storeNames, mode) {
    return getDb().then((db) => db.transaction(storeNames, mode));
}
export function dbGet(storeName, key) {
    return dbTransaction(storeName, 'readonly').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).get(key);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
    }));
}
export function dbGetAll(storeName) {
    return dbTransaction(storeName, 'readonly').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    }));
}
export function dbGetAllByIndex(storeName, indexName, key) {
    return dbTransaction(storeName, 'readonly').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).index(indexName).getAll(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    }));
}
export function dbPut(storeName, value) {
    return dbTransaction(storeName, 'readwrite').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).put(value);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    }));
}
export function dbDelete(storeName, key) {
    return dbTransaction(storeName, 'readwrite').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    }));
}
export function dbClear(storeName) {
    return dbTransaction(storeName, 'readwrite').then((tx) => new Promise((resolve, reject) => {
        const request = tx.objectStore(storeName).clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    }));
}
export function dbDeleteByIndex(storeName, indexName, key) {
    return dbTransaction(storeName, 'readwrite').then((tx) => new Promise((resolve, reject) => {
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const cursorRequest = index.openCursor(key);
        let count = 0;
        cursorRequest.onsuccess = () => {
            const cursor = cursorRequest.result;
            if (cursor) {
                cursor.delete();
                count += 1;
                cursor.continue();
            }
            else {
                resolve(count);
            }
        };
        cursorRequest.onerror = () => reject(cursorRequest.error);
    }));
}
export function closeDb() {
    if (dbInstance) {
        dbInstance.close();
        dbInstance = null;
    }
}
export function deleteDatabase() {
    closeDb();
    return new Promise((resolve, reject) => {
        try {
            const request = indexedDB.deleteDatabase(DB_NAME);
            request.onsuccess = () => {
                dbFailed = false;
                resolve();
            };
            request.onerror = () => reject(request.error);
            request.onblocked = () => reject(new Error('Database deletion blocked'));
        }
        catch (error) {
            reject(error instanceof Error ? error : new Error('Failed to delete database'));
        }
    });
}
