export function createIdentityContract(authManager) {
    return {
        getUserId() {
            return authManager.getUserId();
        },
        isAuthenticated() {
            return authManager.getState() === 'authenticated';
        },
        isGuest() {
            return authManager.isGuest();
        },
        getEntitlementToken() {
            // Entitlement tokens are issued server-side after purchase verification.
            // This returns null until a real auth provider and entitlement service are connected.
            return null;
        },
        canAccessPaidContent() {
            // Guest users cannot access paid content.
            // Authenticated users require server-side entitlement verification.
            // Until a real entitlement service is connected, no paid content is accessible.
            if (authManager.isGuest())
                return false;
            if (authManager.getState() !== 'authenticated')
                return false;
            return false;
        },
        getAccountCreatedAt() {
            // This is synchronous but reads the last known session state.
            // A real implementation would cache this from the session.
            return null;
        },
    };
}
