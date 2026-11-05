export class ReverseGeocodingProviderError extends Error {
    userMessage;
    constructor(userMessage) {
        super(userMessage);
        this.userMessage = userMessage;
        this.name = 'ReverseGeocodingProviderError';
    }
}
