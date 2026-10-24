export function formatCoordinate(value) {
    return value === null ? '' : value.toFixed(4);
}
export function precisionLabel(precision) {
    if (precision === 'map-selected')
        return 'Map selected';
    if (precision === 'searched')
        return 'Searched';
    return 'Text only';
}
export function sourceLabel(source) {
    if (source === 'map-click')
        return 'Map click';
    if (source === 'provider-search')
        return 'Location provider search';
    if (source === 'map-search')
        return 'Local demo search';
    return 'User input';
}
