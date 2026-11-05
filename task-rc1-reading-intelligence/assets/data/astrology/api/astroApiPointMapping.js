export const astroApiPointDefinitions = [
    { id: 'sun', sourceName: 'Sun', label: 'Sun', pointType: 'luminary' },
    { id: 'moon', sourceName: 'Moon', label: 'Moon', pointType: 'luminary' },
    { id: 'mercury', sourceName: 'Mercury', label: 'Mercury', pointType: 'planet' },
    { id: 'venus', sourceName: 'Venus', label: 'Venus', pointType: 'planet' },
    { id: 'mars', sourceName: 'Mars', label: 'Mars', pointType: 'planet' },
    { id: 'jupiter', sourceName: 'Jupiter', label: 'Jupiter', pointType: 'planet' },
    { id: 'saturn', sourceName: 'Saturn', label: 'Saturn', pointType: 'planet' },
    { id: 'uranus', sourceName: 'Uranus', label: 'Uranus', pointType: 'planet' },
    { id: 'neptune', sourceName: 'Neptune', label: 'Neptune', pointType: 'planet' },
    { id: 'pluto', sourceName: 'Pluto', label: 'Pluto', pointType: 'dwarf_planet_interpretive_body' },
    { id: 'chiron', sourceName: 'Chiron', label: 'Chiron', pointType: 'minor_body' },
    { id: 'ascendant', sourceName: 'Ascendant', label: 'Ascendant', pointType: 'angle' },
    { id: 'descendant', sourceName: 'Descendant', label: 'Descendant', pointType: 'angle' },
    { id: 'medium_coeli', sourceName: 'Medium_Coeli', label: 'Medium Coeli', pointType: 'angle', aliases: ['MC'] },
    { id: 'imum_coeli', sourceName: 'Imum_Coeli', label: 'Imum Coeli', pointType: 'angle', aliases: ['IC'] },
    { id: 'mean_lilith', sourceName: 'Mean_Lilith', label: 'Mean Lilith', pointType: 'calculated_point' },
    { id: 'true_lilith', sourceName: 'True_Lilith', label: 'True Lilith', pointType: 'calculated_point' },
    { id: 'mean_node', sourceName: 'Mean_Node', label: 'Mean Node', pointType: 'calculated_point' },
    { id: 'true_node', sourceName: 'True_Node', label: 'True Node', pointType: 'calculated_point' },
    { id: 'mean_south_node', sourceName: 'Mean_South_Node', label: 'Mean South Node', pointType: 'calculated_point' },
    { id: 'true_south_node', sourceName: 'True_South_Node', label: 'True South Node', pointType: 'calculated_point' },
    { id: 'part_of_fortune', sourceName: 'Part_of_Fortune', label: 'Part of Fortune', pointType: 'calculated_point' },
    { id: 'part_of_spirit', sourceName: 'Part_of_Spirit', label: 'Part of Spirit', pointType: 'calculated_point' },
    { id: 'ceres', sourceName: 'Ceres', label: 'Ceres', pointType: 'asteroid' },
    { id: 'pallas', sourceName: 'Pallas', label: 'Pallas', pointType: 'asteroid' },
    { id: 'juno', sourceName: 'Juno', label: 'Juno', pointType: 'asteroid' },
    { id: 'vesta', sourceName: 'Vesta', label: 'Vesta', pointType: 'asteroid' },
];
export const astroApiPointDefinitionById = astroApiPointDefinitions.reduce((lookup, pointDefinition) => ({ ...lookup, [pointDefinition.id]: pointDefinition }), {});
export const astroApiPointDefinitionBySourceName = astroApiPointDefinitions.reduce((lookup, pointDefinition) => {
    const tokens = [pointDefinition.id, pointDefinition.sourceName, pointDefinition.label, ...(pointDefinition.aliases ?? [])];
    for (const token of tokens) {
        lookup[normalizeAstroApiPointToken(token)] = pointDefinition;
    }
    return lookup;
}, {});
export function normalizeAstroApiPointName(sourceName) {
    if (typeof sourceName !== 'string') {
        return null;
    }
    return astroApiPointDefinitionBySourceName[normalizeAstroApiPointToken(sourceName)]?.id ?? null;
}
export function getAstroApiPointDefinitionById(id) {
    return astroApiPointDefinitionById[id];
}
export function normalizeAstroApiPointToken(value) {
    return value.trim().toLowerCase().replace(/[\s-]+/g, '_');
}
