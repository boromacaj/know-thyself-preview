const CENTER_ORDER = [
    'head',
    'ajna',
    'throat',
    'g',
    'ego',
    'solarPlexus',
    'sacral',
    'spleen',
    'root',
];
const MOTOR_CENTERS = [
    'sacral',
    'ego',
    'solarPlexus',
    'root',
];
export function resolveHumanDesignMechanics(channels) {
    const graph = buildCenterGraph(channels);
    const definedCenters = orderedCenters(graph.keys());
    const motorToThroatPath = shortestMotorToThroatPath(graph);
    const motorToThroat = motorToThroatPath.length > 0;
    const type = resolveHumanDesignType(definedCenters, motorToThroat);
    const strategy = strategyForType(type);
    const authority = resolveHumanDesignAuthority(type, definedCenters, graph);
    const definitionGroups = resolveDefinitionGroups(channels, graph);
    const definition = definitionFromGroupCount(definitionGroups.length);
    return {
        type,
        strategy,
        authority,
        definition,
        definitionGroups,
        motorToThroat,
        motorToThroatPath,
    };
}
export function resolveHumanDesignType(definedCenters, motorToThroat) {
    const centers = new Set(definedCenters);
    if (centers.size === 0)
        return 'Reflector';
    const sacralDefined = centers.has('sacral');
    if (sacralDefined)
        return motorToThroat ? 'Manifesting Generator' : 'Generator';
    return motorToThroat ? 'Manifestor' : 'Projector';
}
export function strategyForType(type) {
    switch (type) {
        case 'Manifesting Generator': return 'Respond, then inform';
        case 'Generator': return 'Respond';
        case 'Manifestor': return 'Inform before acting';
        case 'Projector': return 'Wait for recognition and invitation';
        case 'Reflector': return 'Wait through a lunar cycle';
    }
}
export function resolveHumanDesignAuthority(type, definedCenters, graph) {
    const centers = new Set(definedCenters);
    if (type === 'Reflector')
        return 'Lunar';
    if (centers.has('solarPlexus'))
        return 'Emotional / Solar Plexus';
    if (centers.has('sacral'))
        return 'Sacral';
    if (centers.has('spleen'))
        return 'Splenic';
    if (type === 'Manifestor' && centers.has('ego') && hasPath(graph, 'ego', 'throat')) {
        return 'Ego Manifested';
    }
    if (type === 'Projector' && centers.has('ego') && centers.has('g') && hasPath(graph, 'ego', 'g')) {
        return 'Ego Projected';
    }
    if (type === 'Projector' && centers.has('g') && centers.has('throat') && hasPath(graph, 'g', 'throat')) {
        return 'Self-Projected';
    }
    return 'Mental / Environmental';
}
export function buildCenterGraph(channels) {
    const graph = new Map();
    for (const channel of channels) {
        const [left, right] = channel.centers;
        addNeighbor(graph, left, right);
        addNeighbor(graph, right, left);
    }
    return graph;
}
export function findDefinedPath(channels, from, to) {
    return findPath(buildCenterGraph(channels), from, to);
}
export function resolveDefinitionGroups(channels, graph = buildCenterGraph(channels)) {
    const unvisited = new Set(graph.keys());
    const groups = [];
    for (const start of orderedCenters(unvisited)) {
        if (!unvisited.has(start))
            continue;
        const queue = [start];
        const component = new Set();
        unvisited.delete(start);
        while (queue.length > 0) {
            const current = queue.shift();
            if (!current)
                continue;
            component.add(current);
            for (const neighbor of graph.get(current) ?? []) {
                if (!unvisited.has(neighbor))
                    continue;
                unvisited.delete(neighbor);
                queue.push(neighbor);
            }
        }
        const centers = orderedCenters(component);
        const centerSet = new Set(centers);
        const channelIds = channels
            .filter((channel) => channel.centers.every((center) => centerSet.has(center)))
            .map((channel) => channel.id)
            .sort(compareChannelIds);
        groups.push({ centers, channelIds });
    }
    return groups;
}
export function definitionFromGroupCount(groupCount) {
    if (groupCount === 0)
        return 'No Definition';
    if (groupCount === 1)
        return 'Single Definition';
    if (groupCount === 2)
        return 'Split Definition';
    if (groupCount === 3)
        return 'Triple Split Definition';
    if (groupCount === 4)
        return 'Quadruple Split Definition';
    return 'Multiple Split Definition';
}
function shortestMotorToThroatPath(graph) {
    return MOTOR_CENTERS
        .map((motor) => findPath(graph, motor, 'throat'))
        .filter((path) => path.length > 0)
        .sort((left, right) => left.length - right.length)[0] ?? [];
}
function findPath(graph, from, to) {
    if (!graph.has(from) || !graph.has(to))
        return [];
    if (from === to)
        return [from];
    const queue = [[from]];
    const visited = new Set([from]);
    while (queue.length > 0) {
        const path = queue.shift();
        if (!path)
            continue;
        const current = path[path.length - 1];
        for (const neighbor of graph.get(current) ?? []) {
            if (visited.has(neighbor))
                continue;
            const nextPath = [...path, neighbor];
            if (neighbor === to)
                return nextPath;
            visited.add(neighbor);
            queue.push(nextPath);
        }
    }
    return [];
}
function hasPath(graph, from, to) {
    return findPath(graph, from, to).length > 0;
}
function addNeighbor(graph, center, neighbor) {
    const neighbors = graph.get(center) ?? new Set();
    neighbors.add(neighbor);
    graph.set(center, neighbors);
}
function orderedCenters(centers) {
    const centerSet = new Set(centers);
    return CENTER_ORDER.filter((center) => centerSet.has(center));
}
function compareChannelIds(left, right) {
    const [leftA = 0, leftB = 0] = left.split('-').map(Number);
    const [rightA = 0, rightB = 0] = right.split('-').map(Number);
    return leftA - rightA || leftB - rightB;
}
