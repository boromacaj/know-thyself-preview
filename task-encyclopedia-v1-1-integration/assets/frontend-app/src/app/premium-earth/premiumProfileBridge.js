let publishedBridge = null;
export function publishPremiumProfileBridge(bridge) {
    publishedBridge = bridge;
}
export function readPremiumProfileBridge() {
    return publishedBridge;
}
