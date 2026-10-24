let publishedBridge = null;
export function publishPlaceSelectionBridge(bridge) {
    publishedBridge = bridge;
}
export function readPlaceSelectionBridge() {
    return publishedBridge;
}
