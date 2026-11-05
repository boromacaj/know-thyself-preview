const defaultRequirement = 'Choose an approved map provider and supply its browser configuration through the runtime environment.';
export function createPlaceholderMapProvider(configurationRequirement = defaultRequirement, runtimeDiagnostic) {
    return {
        descriptor: {
            id: 'map-provider-unconfigured',
            label: 'Map provider unavailable',
            status: 'placeholder',
            adapterStatus: 'unavailable',
            mapStyle: 'none',
            supportsTileMap: false,
            supportsExactPointSelection: false,
            configurationRequirement,
            runtimeDiagnostic,
        },
        async mount(container) {
            container.dataset.mapProviderState = 'placeholder';
            return {
                focusLocation() { },
                getCamera() { return null; },
                destroy() { },
            };
        },
    };
}
export const placeholderMapProvider = createPlaceholderMapProvider();
