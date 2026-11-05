import { TCM_PHASE_CORRESPONDENCES } from '../bazi/data/tcmCorrespondence.js';
function hiddenStemsExport(pillar) {
    return pillar.hiddenStems.map((contribution) => {
        const match = pillar.hiddenStemTenGods.find((entry) => (entry.contribution.stem.index === contribution.stem.index && entry.contribution.role === contribution.role));
        return {
            stem: contribution.stem.name,
            character: contribution.stem.character,
            role: contribution.role,
            weightPercent: contribution.conventionalWeightPercent,
            weightModel: contribution.sourceModel,
            tenGod: match ? match.tenGod.tenGod : null,
        };
    });
}
function pillarExport(key, pillar) {
    if (!pillar)
        return null;
    return {
        key,
        stem: { name: pillar.stem.name, character: pillar.stem.character, phase: pillar.stem.element, polarity: pillar.stem.polarity },
        branch: { name: pillar.branch.name, character: pillar.branch.character, animal: pillar.branch.animal, phase: pillar.branch.element, polarity: pillar.branch.polarity },
        ganzhiIndex: pillar.sexagenaryIndex,
        label: pillar.label,
        symbolicLabel: pillar.symbolicLabel,
        hiddenStems: hiddenStemsExport(pillar),
        tenGod: pillar.tenGod ? {
            tenGod: pillar.tenGod.tenGod,
            category: pillar.tenGod.category,
            relation: pillar.tenGod.relation,
            samePolarity: pillar.tenGod.samePolarity,
        } : null,
        evidenceType: 'calculated',
        sourcePath: `${key.toLowerCase()}Pillar`,
    };
}
function blockedSection(blockedReason) {
    return {
        status: 'blocked',
        timePipeline: { civilLocalDateTime: null, timezone: null, utcDateTime: null, longitude: null, trueSolarTime: null, birthTimePrecision: 'estimated-local-noon' },
        methodology: {
            calendarBasis: 'Unavailable: calculation blocked',
            yearBoundary: 'Unavailable: calculation blocked',
            monthBoundary: 'Unavailable: calculation blocked',
            solarTermSource: 'Unavailable: calculation blocked',
            birthTimeBasis: 'Unavailable: calculation blocked',
            dayRolloverRule: 'Unavailable: calculation blocked',
            ziHourRule: 'Unavailable: calculation blocked',
            timezoneSource: 'Unavailable: calculation blocked',
            trueSolarTimeEnabled: false,
            longitudeCorrectionEnabled: false,
            equationOfTimeEnabled: false,
            hiddenStemModel: 'Unavailable: calculation blocked',
            elementWeightingModel: 'Unavailable: calculation blocked',
            tenGodsModel: 'Unavailable: calculation blocked',
            luckCycleDirectionRule: 'Unavailable: calculation blocked',
            luckCycleStartRule: 'Unavailable: calculation blocked',
            version: 'Unavailable: calculation blocked',
        },
        pillars: { year: null, month: null, day: null, hour: null },
        dayMaster: null,
        dayMasterStrength: null,
        fivePhase: { raw: null, hidden: null, seasonal: null },
        relationships: [],
        luckPillars: null,
        tcmCorrespondence: Object.values(TCM_PHASE_CORRESPONDENCES),
        tcmConstitution: null,
        activeSolarTerm: null,
        warnings: [],
        limitations: blockedReason,
        unsupportedFields: [],
        blockedReason,
    };
}
export function buildBaziExport(pillar) {
    const chartData = pillar.baziChart;
    if (!chartData) {
        return blockedSection([`No BaZi / TCM chart data is available for this pillar (status: ${pillar.status}).`, ...pillar.limitations]);
    }
    const bazi = chartData.bazi;
    if (bazi.status === 'blocked' || !bazi.dayMaster) {
        return blockedSection([...bazi.limitations, ...pillar.limitations]);
    }
    return {
        status: 'calculated',
        timePipeline: {
            civilLocalDateTime: bazi.trueSolarTime?.civilLocalDateTime ?? null,
            timezone: null,
            utcDateTime: bazi.birthMomentUtc,
            longitude: bazi.trueSolarTime?.longitude ?? null,
            trueSolarTime: bazi.trueSolarTime,
            birthTimePrecision: bazi.birthTimePrecision,
        },
        methodology: bazi.methodology,
        pillars: {
            year: pillarExport('Year', bazi.yearPillar),
            month: pillarExport('Month', bazi.monthPillar),
            day: pillarExport('Day', bazi.dayPillar),
            hour: pillarExport('Hour', bazi.hourPillar),
        },
        dayMaster: {
            stem: bazi.dayMaster.name,
            character: bazi.dayMaster.character,
            phase: bazi.dayMaster.element,
            polarity: bazi.dayMaster.polarity,
        },
        dayMasterStrength: bazi.dayMasterStrength,
        fivePhase: {
            raw: bazi.rawPhaseBalance,
            hidden: bazi.hiddenStemBalance,
            seasonal: bazi.seasonalContext,
        },
        relationships: bazi.relationships,
        luckPillars: bazi.luckPillars,
        tcmCorrespondence: Object.values(TCM_PHASE_CORRESPONDENCES),
        tcmConstitution: bazi.tcmConstitution,
        activeSolarTerm: bazi.activeSolarTerm,
        warnings: bazi.warnings,
        limitations: [...bazi.limitations, ...pillar.limitations],
        unsupportedFields: bazi.hourPillar ? [] : ['Hour Pillar (birth time not supplied; never fabricated from the local-noon fallback)'],
        blockedReason: null,
    };
}
