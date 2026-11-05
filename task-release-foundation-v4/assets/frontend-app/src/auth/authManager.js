export class AuthManager {
    provider = null;
    currentSession = null;
    state = 'loading';
    listeners = new Set();
    providerUnsubscribe = null;
    async initialize(provider) {
        this.provider = provider;
        this.setState('loading', null);
        await provider.initialize();
        this.providerUnsubscribe = provider.onAuthStateChange((session) => {
            this.handleSessionChange(session);
        });
        const session = await provider.getCurrentSession();
        this.handleSessionChange(session);
    }
    getState() {
        return this.state;
    }
    async getSession() {
        this.requireProvider();
        return this.currentSession;
    }
    isGuest() {
        return this.currentSession?.user.isGuest === true;
    }
    getUserId() {
        return this.currentSession?.user.userId ?? null;
    }
    async signUp(email, password) {
        return this.requireProvider().signUp(email, password);
    }
    async signIn(email, password) {
        return this.requireProvider().signIn(email, password);
    }
    async signOut() {
        await this.requireProvider().signOut();
    }
    async deleteAccount() {
        await this.requireProvider().deleteAccount();
    }
    async resetPassword(email) {
        await this.requireProvider().resetPassword(email);
    }
    onStateChange(callback) {
        this.listeners.add(callback);
        return () => {
            this.listeners.delete(callback);
        };
    }
    destroy() {
        if (this.providerUnsubscribe) {
            this.providerUnsubscribe();
            this.providerUnsubscribe = null;
        }
        this.listeners.clear();
        this.provider = null;
        this.currentSession = null;
        this.state = 'unauthenticated';
    }
    requireProvider() {
        if (!this.provider) {
            throw new Error('AuthManager not initialized. Call initialize() first.');
        }
        return this.provider;
    }
    handleSessionChange(session) {
        this.currentSession = session;
        if (!session) {
            this.setState('unauthenticated', null);
        }
        else if (session.user.isGuest) {
            this.setState('guest', session);
        }
        else {
            this.setState('authenticated', session);
        }
    }
    setState(state, session) {
        this.state = state;
        for (const listener of this.listeners) {
            try {
                listener(state, session);
            }
            catch {
                // Listener errors must not break state transitions
            }
        }
    }
}
