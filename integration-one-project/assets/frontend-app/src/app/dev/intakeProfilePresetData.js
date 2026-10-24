/**
 * The owner-supplied Intake test profiles, and nothing else. Kept apart from the
 * Intake preset logic so a Cloudflare production-branch build can swap this one
 * file for an empty stub; see strip-dev-fixtures.mjs. Values are the owner's -
 * never change them without an explicit request.
 */
export const INTAKE_PROFILE_PRESETS = [
    {
        id: 'alex-demo',
        label: 'Alex Demo',
        givenNames: 'Alex',
        birthSurname: 'Demo',
        birthDate: '1990-03-14',
        birthTimeAvailable: true,
        birthTime: '12:05',
        birthLocationQuery: 'Bratislava, Slovakia',
    },
    {
        id: 'petra-samplova',
        label: 'Petra Samplova',
        givenNames: 'Petra',
        birthSurname: 'Samplova',
        birthDate: '2000-06-21',
        birthTimeAvailable: true,
        birthTime: '19:45',
        birthLocationQuery: 'Kosice, Slovakia',
    },
    {
        id: 'hana-demova',
        label: 'Hana Demova',
        givenNames: 'Hana',
        birthSurname: 'Demova',
        birthDate: '1965-11-09',
        birthTimeAvailable: false,
        birthLocationQuery: 'Bratislava, Slovakia',
    },
];
