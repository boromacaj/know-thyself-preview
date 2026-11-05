const LOCAL_LOCATIONS = [
    {
        id: 'bundled-levice-sk',
        label: 'Levice, Nitra Region, Slovakia',
        latitude: 48.2156,
        longitude: 18.6071,
        country: 'Slovakia',
        region: 'Nitra Region',
        source: 'bundled-local-gazetteer',
        precision: 'searched',
        timeZone: 'Europe/Bratislava',
        timeZoneSource: 'bundled-local-gazetteer-record',
        aliases: ['levice', 'levice slovakia', 'levice sk', 'levice nitra region slovakia'],
    },
];
export const localLocationSearchProvider = {
    id: 'bundled-local-gazetteer',
    label: 'Bundled local gazetteer',
    mode: 'bundled-demo',
    limitation: 'Only explicitly bundled locations can be resolved. No network geocoder is called.',
    async searchPlaces(query) {
        const normalizedQuery = normalizeQuery(query);
        if (!normalizedQuery)
            return [];
        return LOCAL_LOCATIONS
            .filter((location) => location.aliases.some((alias) => alias.includes(normalizedQuery)))
            .map(({ aliases: _aliases, ...result }) => result);
    },
};
function normalizeQuery(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
