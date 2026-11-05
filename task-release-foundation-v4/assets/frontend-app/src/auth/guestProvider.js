import { AuthError } from './types.js?v=4cd804d';
const GUEST_SESSION_KEY = 'ktp_guest_session';
function readStorage(key) {
    try {
        return localStorage.getItem(key);
    }
    catch {
        return null;
    }
}
function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Storage full or unavailable — guest session stays in memory only
    }
}
function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    }
    catch {
        // Ignore removal failure
    }
}
function clearAllStorage() {
    try {
        localStorage.clear();
    }
    catch {
        // Ignore clear failure
    }
}
function createGuestUser() {
    const now = new Date().toISOString();
    return {
        userId: crypto.randomUUID(),
        email: null,
        displayName: null,
        isGuest: true,
        createdAt: now,
        lastLoginAt: now,
    };
}
function buildGuestSession(user) {
    return {
        user,
        token: null,
        expiresAt: null,
        isAuthenticated: false,
    };
}
function serializeSession(session) {
    return JSON.stringify(session);
}
function deserializeSession(raw) {
    try {
        const parsed = JSON.parse(raw);
        const user = parsed.user;
        if (!user ||
            typeof user.userId !== 'string' ||
            typeof user.isGuest !== 'boolean' ||
            typeof user.createdAt !== 'string' ||
            typeof user.lastLoginAt !== 'string') {
            return null;
        }
        return {
            user: {
                userId: user.userId,
                email: typeof user.email === 'string' ? user.email : null,
                displayName: typeof user.displayName === 'string' ? user.displayName : null,
                isGuest: user.isGuest,
                createdAt: user.createdAt,
                lastLoginAt: user.lastLoginAt,
            },
            token: typeof parsed.token === 'string' ? parsed.token : null,
            expiresAt: typeof parsed.expiresAt === 'string' ? parsed.expiresAt : null,
            isAuthenticated: parsed.isAuthenticated === true,
        };
    }
    catch {
        return null;
    }
}
/** The guest session on this device, read without creating one. */
export function readGuestSession() {
    const stored = readStorage(GUEST_SESSION_KEY);
    if (!stored)
        return null;
    const restored = deserializeSession(stored);
    return restored && restored.user.isGuest ? restored : null;
}
/**
 * The one stable local identity: restored when the device has one, created exactly once otherwise.
 * Synchronous, so startup code and the persistence bridge can own records by it without a race.
 */
export function ensureGuestSession() {
    const existing = readGuestSession();
    if (existing)
        return existing;
    const session = buildGuestSession(createGuestUser());
    writeStorage(GUEST_SESSION_KEY, serializeSession(session));
    return session;
}
export const readGuestUserId = () => readGuestSession()?.user.userId ?? null;
export class GuestAuthProvider {
    session = null;
    listeners = new Set();
    async initialize() {
        this.session = ensureGuestSession();
    }
    async signUp(_email, _password) {
        throw new AuthError('guest_mode', 'Account creation is not available in guest mode.');
    }
    async signIn(_email, _password) {
        throw new AuthError('guest_mode', 'Sign-in is not available in guest mode.');
    }
    async signOut() {
        removeStorage(GUEST_SESSION_KEY);
        this.session = null;
        this.notifyListeners(null);
    }
    async getCurrentSession() {
        return this.session;
    }
    onAuthStateChange(callback) {
        this.listeners.add(callback);
        return () => {
            this.listeners.delete(callback);
        };
    }
    async deleteAccount() {
        removeStorage(GUEST_SESSION_KEY);
        this.session = null;
        this.notifyListeners(null);
    }
    async resetPassword(_email) {
        throw new AuthError('guest_mode', 'Password reset is not available in guest mode.');
    }
    notifyListeners(session) {
        for (const listener of this.listeners) {
            try {
                listener(session);
            }
            catch {
                // Listener errors must not break notification
            }
        }
    }
}
