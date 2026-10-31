export class LocationSearchProviderError extends Error {
    userMessage;
    constructor(userMessage) {
        super(userMessage);
        this.userMessage = userMessage;
        this.name = 'LocationSearchProviderError';
    }
}
