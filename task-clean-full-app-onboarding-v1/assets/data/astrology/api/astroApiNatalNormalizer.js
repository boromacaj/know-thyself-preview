import { astroApiHouseDefinitions, normalizedHouseNameFromNumber, normalizeAstroApiHouseName } from './astroApiHouseMapping.js?v=f9ab0a6';
import { astroApiPointDefinitions, getAstroApiPointDefinitionById, normalizeAstroApiPointName, normalizeAstroApiPointToken, } from './astroApiPointMapping.js?v=f9ab0a6';
import { normalizeAstroApiSign } from './astroApiSignMapping.js?v=f9ab0a6';
const sourceProvider = 'astroapi';
const sourceEndpoint = '/api/v3/charts/natal';
const aspectTypeBySourceName = {
    conjunction: 'conjunction',
    conj: 'conjunction',
    opposition: 'opposition',
    opp: 'opposition',
    trine: 'trine',
    square: 'square',
    sextile: 'sextile',
    quintile: 'quintile',
    quincunx: 'quincunx',
    inconjunct: 'quincunx',
    semisquare: 'semi_square',
    semi_square: 'semi_square',
    'semi-square': 'semi_square',
    sesquiquadrate: 'sesquiquadrate',
    sesquisquare: 'sesquiquadrate',
};
export function isAstroApiNatalResponseLike(value) {
    if (!isRecord(value)) {
        return false;
    }
    return isRecord(value.subject_data) || isRecord(value.subjectData) || isRecord(value.chart_data) || isRecord(value.chartData);
}
export function normalizeAstroApiNatalResponse(response) {
    if (!isAstroApiNatalResponseLike(response)) {
        throw new Error('Invalid AstroAPI natal response: expected subject_data or chart_data object.');
    }
    const warnings = [];
    const subjectData = getSubjectData(response);
    const chartData = getChartData(response);
    const meta = getMeta(chartData);
    if (!subjectData) {
        warnings.push('Missing subject_data object.');
    }
    if (!chartData) {
        warnings.push('Missing chart_data object.');
    }
    return {
        source: sourceProvider,
        endpoint: sourceEndpoint,
        birthContext: normalizeBirthContext(subjectData, meta),
        points: normalizePoints(subjectData, chartData, warnings),
        houseCusps: normalizeHouseCusps(subjectData, chartData, warnings),
        aspects: normalizeAspects(chartData, warnings),
        lunarPhase: normalizeLunarPhase(getLunarPhase(subjectData, chartData)),
        meta: normalizeMeta(meta, subjectData),
        warnings,
        passthrough: normalizePassthrough(chartData),
    };
}
function normalizeBirthContext(subjectData, meta) {
    return {
        name: readString(subjectData, 'name'),
        year: readNumber(subjectData, 'year'),
        month: readNumber(subjectData, 'month'),
        day: readNumber(subjectData, 'day'),
        hour: readNumber(subjectData, 'hour'),
        minute: readNumber(subjectData, 'minute'),
        second: readNumber(subjectData, 'second'),
        city: readString(subjectData, 'city'),
        countryCode: readString(subjectData, 'country_code', 'countryCode'),
        latitude: readNumber(subjectData, 'latitude'),
        longitude: readNumber(subjectData, 'longitude'),
        timezone: readStringOrNumber(subjectData, 'timezone'),
        zodiacType: readString(subjectData, 'zodiac_type', 'zodiacType') ?? readString(meta, 'zodiac_type', 'zodiacType'),
        siderealMode: readString(subjectData, 'sidereal_mode', 'siderealMode') ?? readString(meta, 'sidereal_mode', 'siderealMode'),
        houseSystemIdentifier: readString(subjectData, 'house_system_identifier', 'houseSystemIdentifier') ??
            readString(meta, 'house_system_identifier', 'houseSystemIdentifier') ??
            readString(subjectData, 'house_system', 'houseSystem') ??
            readString(meta, 'house_system', 'houseSystem'),
        houseSystemName: readString(subjectData, 'house_system_name', 'houseSystemName') ??
            readString(meta, 'house_system_name', 'houseSystemName') ??
            readString(subjectData, 'house_system', 'houseSystem') ??
            readString(meta, 'house_system', 'houseSystem'),
        perspectiveType: readString(subjectData, 'perspective_type', 'perspectiveType') ?? readString(meta, 'perspective_type', 'perspectiveType'),
        localIsoDatetime: readString(subjectData, 'local_iso_datetime', 'localIsoDatetime'),
        utcIsoDatetime: readString(subjectData, 'utc_iso_datetime', 'utcIsoDatetime'),
        julianDay: readNumber(subjectData, 'julian_day', 'julianDay'),
        utcTime: readString(subjectData, 'utc_time', 'utcTime'),
        localTime: readString(subjectData, 'local_time', 'localTime'),
    };
}
function normalizePoints(subjectData, chartData, warnings) {
    const sourcePoints = getPlanetaryPositions(chartData);
    const normalizedPoints = {};
    for (const sourcePoint of sourcePoints) {
        const sourceName = readString(sourcePoint, 'name', 'full_name', 'label');
        if (sourceName && !normalizeAstroApiPointName(sourceName)) {
            warnings.push(`Unknown chart_data point preserved outside normalized points: ${sourceName}`);
        }
    }
    for (const definition of astroApiPointDefinitions) {
        const subjectPoint = getSubjectPoint(subjectData, definition.id);
        const chartPoint = getPositionPoint(sourcePoints, definition.id);
        if (!subjectPoint && !chartPoint) {
            continue;
        }
        const source = chartPoint ? 'chart_data' : 'subject_data';
        const sourceRecord = chartPoint && subjectPoint ? mergePointRecords(subjectPoint, chartPoint) : chartPoint ?? subjectPoint;
        if (!sourceRecord) {
            continue;
        }
        collectPointConflictWarnings(definition.id, subjectPoint, chartPoint, warnings);
        normalizedPoints[definition.id] = normalizePoint(definition.id, sourceRecord, source, warnings);
    }
    return normalizedPoints;
}
function normalizePoint(pointId, point, source, warnings) {
    const definition = getAstroApiPointDefinitionById(pointId);
    const sourceSign = readString(point, 'sign', 'sign_name');
    const signMapping = normalizeAstroApiSign(sourceSign);
    if (sourceSign && !signMapping) {
        warnings.push(`Unknown sign for ${definition.sourceName}: ${sourceSign}`);
    }
    const houseNumber = normalizeAstroApiHouseName(readStringOrNumber(point, 'house') ?? readStringOrNumber(point, 'house_number'));
    return {
        id: definition.id,
        label: definition.label,
        sourceName: readString(point, 'name', 'full_name', 'label') ?? definition.sourceName,
        sign: signMapping?.sign ?? null,
        signLabel: signMapping?.label ?? null,
        sourceSign: sourceSign ?? null,
        signNumber: readNumber(point, 'sign_num', 'sign_number') ?? signMapping?.signNumber ?? null,
        degreeInSign: readNumber(point, 'position', 'degree', 'degree_in_sign'),
        absoluteLongitude: readNumber(point, 'abs_pos', 'absolute_longitude', 'longitude'),
        houseNumber,
        houseName: houseNumber ? normalizedHouseNameFromNumber(houseNumber) : null,
        element: signMapping?.element ?? null,
        modality: signMapping?.modality ?? null,
        pointType: definition.pointType,
        retrograde: readBoolean(point, 'retrograde', 'is_retrograde'),
        speed: readNumber(point, 'speed'),
        source,
        sourceRecord: point,
    };
}
function normalizeHouseCusps(subjectData, chartData, warnings) {
    const sourceCusps = getChartHouseCusps(chartData);
    const cusps = [];
    for (const definition of astroApiHouseDefinitions) {
        const cusp = getSubjectHouseCusp(subjectData, definition.sourceKey) ?? getChartHouseCusp(sourceCusps, definition.houseNumber);
        if (!cusp) {
            warnings.push(`Missing house cusp: ${definition.sourceName}`);
            continue;
        }
        cusps.push(normalizeHouseCusp(definition.houseNumber, definition.sourceName, cusp, warnings));
    }
    return cusps;
}
function normalizeHouseCusp(houseNumber, fallbackSourceName, cusp, warnings) {
    const sourceSign = readString(cusp, 'sign', 'sign_name');
    const signMapping = normalizeAstroApiSign(sourceSign);
    if (sourceSign && !signMapping) {
        warnings.push(`Unknown sign for ${fallbackSourceName}: ${sourceSign}`);
    }
    return {
        houseNumber,
        sourceName: readString(cusp, 'name', 'house') ?? fallbackSourceName,
        sign: signMapping?.sign ?? null,
        signLabel: signMapping?.label ?? null,
        sourceSign: sourceSign ?? null,
        signNumber: readNumber(cusp, 'sign_num', 'sign_number') ?? signMapping?.signNumber ?? null,
        degreeInSign: readNumber(cusp, 'position', 'degree', 'degree_in_sign'),
        absoluteLongitude: readNumber(cusp, 'abs_pos', 'absolute_longitude', 'longitude'),
        element: signMapping?.element ?? null,
        modality: signMapping?.modality ?? null,
        sourceRecord: cusp,
    };
}
function normalizeAspects(chartData, warnings) {
    const aspects = readArray(chartData, 'aspects');
    if (!aspects) {
        return [];
    }
    return aspects.filter(isRecord).map((aspect) => {
        const sourceAspectType = readString(aspect, 'aspect_type', 'aspect', 'type');
        const aspectType = normalizeAspectType(sourceAspectType);
        if (sourceAspectType && aspectType.startsWith('unknown:')) {
            warnings.push(`Unknown aspect type preserved from source: ${sourceAspectType}`);
        }
        return {
            point1: normalizeAspectPoint(readString(aspect, 'point1')),
            point2: normalizeAspectPoint(readString(aspect, 'point2')),
            aspectType,
            sourceAspectType: sourceAspectType ?? null,
            orb: readNumber(aspect, 'orb'),
            sourceRecord: aspect,
        };
    });
}
function normalizeLunarPhase(sourceRecord) {
    if (!sourceRecord) {
        return null;
    }
    return {
        degreesBetweenSunMoon: readNumber(sourceRecord, 'degrees_between_sun_moon', 'degreesBetweenSunMoon'),
        moonPhase: readStringOrNumber(sourceRecord, 'moon_phase', 'moonPhase'),
        sunPhase: readStringOrNumber(sourceRecord, 'sun_phase', 'sunPhase'),
        moonEmoji: readString(sourceRecord, 'moon_emoji', 'moonEmoji'),
        moonPhaseName: readString(sourceRecord, 'moon_phase_name', 'moonPhaseName'),
        sourceRecord,
    };
}
function normalizeMeta(meta, subjectData) {
    return {
        chartType: readString(meta, 'chart_type', 'chartType'),
        calculationTime: readString(meta, 'calculation_time', 'calculationTime'),
        houseSystem: readString(meta, 'house_system', 'houseSystem') ?? readString(subjectData, 'house_system', 'houseSystem'),
        zodiacType: readString(meta, 'zodiac_type', 'zodiacType') ?? readString(subjectData, 'zodiac_type', 'zodiacType'),
        activePoints: readStringArray(meta, 'active_points', 'activePoints') ?? [],
        precision: readPrecision(meta),
        sourceProvider,
        sourceEndpoint,
    };
}
function normalizePassthrough(chartData) {
    const fixedStars = readRecord(chartData, 'fixed_stars', 'fixedStars', 'fixed_stars_data');
    const antisciaAspects = readArray(chartData, 'antiscia_aspects', 'antisciaAspects');
    return { ...(fixedStars ? { fixedStars } : {}), ...(antisciaAspects ? { antisciaAspects: [...antisciaAspects] } : {}) };
}
function collectPointConflictWarnings(pointId, subjectPoint, chartPoint, warnings) {
    if (!subjectPoint || !chartPoint) {
        return;
    }
    const definition = getAstroApiPointDefinitionById(pointId);
    const subjectSign = readString(subjectPoint, 'sign', 'sign_name');
    const chartSign = readString(chartPoint, 'sign', 'sign_name');
    const subjectLongitude = readNumber(subjectPoint, 'abs_pos', 'absolute_longitude', 'longitude');
    const chartLongitude = readNumber(chartPoint, 'abs_pos', 'absolute_longitude', 'longitude');
    if (subjectSign && chartSign && subjectSign !== chartSign) {
        warnings.push(`Conflicting sign values for ${definition.sourceName}; chart_data value was preferred.`);
    }
    if (typeof subjectLongitude === 'number' && typeof chartLongitude === 'number' && subjectLongitude !== chartLongitude) {
        warnings.push(`Conflicting longitude values for ${definition.sourceName}; chart_data value was preferred.`);
    }
}
function mergePointRecords(subjectPoint, chartPoint) {
    return { ...subjectPoint, ...chartPoint };
}
function getSubjectData(response) {
    const subjectData = response.subject_data ?? response.subjectData;
    return isRecord(subjectData) ? subjectData : undefined;
}
function getChartData(response) {
    const chartData = response.chart_data ?? response.chartData;
    return isRecord(chartData) ? chartData : undefined;
}
function getMeta(chartData) {
    const meta = chartData?.meta;
    return isRecord(meta) ? meta : undefined;
}
function getLunarPhase(subjectData, chartData) {
    const lunarPhase = subjectData?.lunar_phase ?? subjectData?.lunarPhase ?? chartData?.lunar_phase ?? chartData?.lunarPhase;
    return isRecord(lunarPhase) ? lunarPhase : undefined;
}
function getPlanetaryPositions(chartData) {
    return readArray(chartData, 'planetary_positions', 'planetaryPositions') ?? [];
}
function getChartHouseCusps(chartData) {
    return readArray(chartData, 'house_cusps', 'houseCusps') ?? [];
}
function getSubjectPoint(subjectData, pointId) {
    const definition = getAstroApiPointDefinitionById(pointId);
    const directPoint = subjectData?.[definition.id] ?? subjectData?.[definition.sourceName];
    return isRecord(directPoint) ? directPoint : undefined;
}
function getPositionPoint(positions, pointId) {
    return positions.find((position) => normalizeAstroApiPointName(readString(position, 'name', 'full_name', 'label')) === pointId);
}
function getSubjectHouseCusp(subjectData, sourceKey) {
    const directCusp = subjectData?.[sourceKey];
    return isRecord(directCusp) ? directCusp : undefined;
}
function getChartHouseCusp(cusps, houseNumber) {
    return cusps.find((cusp) => {
        const cuspHouseNumber = normalizeAstroApiHouseName(readStringOrNumber(cusp, 'house_number', 'number')) ?? normalizeAstroApiHouseName(readString(cusp, 'name', 'house'));
        return cuspHouseNumber === houseNumber;
    });
}
function normalizeAspectPoint(sourceName) {
    if (!sourceName) {
        return null;
    }
    return normalizeAstroApiPointName(sourceName) ?? sourceName;
}
function normalizeAspectType(sourceAspectType) {
    if (!sourceAspectType) {
        return 'unknown:missing';
    }
    const normalizedKey = normalizeAstroApiPointToken(sourceAspectType);
    return aspectTypeBySourceName[normalizedKey] ?? `unknown:${normalizedKey}`;
}
function readString(record, ...keys) {
    const value = readValue(record, ...keys);
    return typeof value === 'string' && value.trim().length > 0 ? value : null;
}
function readNumber(record, ...keys) {
    const value = readValue(record, ...keys);
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string' && value.trim().length > 0) {
        const parsedValue = Number(value);
        return Number.isFinite(parsedValue) ? parsedValue : null;
    }
    return null;
}
function readBoolean(record, ...keys) {
    const value = readValue(record, ...keys);
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'string') {
        const normalizedValue = value.trim().toLowerCase();
        if (normalizedValue === 'true' || normalizedValue === 'r' || normalizedValue === 'retrograde') {
            return true;
        }
        if (normalizedValue === 'false' || normalizedValue === 'd' || normalizedValue === 'direct') {
            return false;
        }
    }
    return null;
}
function readStringOrNumber(record, ...keys) {
    const value = readValue(record, ...keys);
    return typeof value === 'string' || typeof value === 'number' ? value : null;
}
function readStringArray(record, ...keys) {
    const value = readValue(record, ...keys);
    if (!Array.isArray(value)) {
        return null;
    }
    const strings = value.filter((item) => typeof item === 'string');
    return strings.length === value.length ? strings : null;
}
function readArray(record, ...keys) {
    const value = readValue(record, ...keys);
    return Array.isArray(value) ? value : null;
}
function readRecord(record, ...keys) {
    const value = readValue(record, ...keys);
    return isRecord(value) ? value : null;
}
function readPrecision(meta) {
    const precision = meta?.precision;
    return typeof precision === 'string' || isRecord(precision) ? precision : null;
}
function readValue(record, ...keys) {
    if (!record) {
        return undefined;
    }
    for (const key of keys) {
        if (key in record) {
            return record[key];
        }
    }
    return undefined;
}
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
