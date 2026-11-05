export function canSelectExactMapPoint(descriptor) {
    return descriptor.status === 'configured'
        && descriptor.adapterStatus === 'ready'
        && descriptor.supportsTileMap
        && descriptor.supportsExactPointSelection;
}
