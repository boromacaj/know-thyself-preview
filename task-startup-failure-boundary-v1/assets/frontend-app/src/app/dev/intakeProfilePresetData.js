/**
 * The owner-supplied Intake test profiles, and nothing else. Kept apart from the
 * Intake preset logic so a Cloudflare production-branch build can swap this one
 * file for an empty stub; see strip-dev-fixtures.mjs. Values are the owner's -
 * never change them without an explicit request.
 */
export const INTAKE_PROFILE_PRESETS = [
    {
        id: 'boris-macaj',
        label: 'Boris Macaj',
        givenNames: 'Boris',
        birthSurname: 'Macaj',
        birthDate: '1987-08-28',
        birthTimeAvailable: true,
        birthTime: '12:05',
        birthLocationQuery: 'Levice, Slovakia',
    },
    {
        id: 'pavlina-magnova',
        label: 'Pavlina Magnova',
        givenNames: 'Pavlina',
        birthSurname: 'Magnova',
        birthDate: '2002-01-02',
        birthTimeAvailable: true,
        birthTime: '19:45',
        birthLocationQuery: 'Banska Bystrica, Slovakia',
    },
    {
        id: 'jozefina-macajova',
        label: 'Jozefina Macajova',
        givenNames: 'Jozefina',
        birthSurname: 'Macajova',
        birthDate: '1963-02-05',
        birthTimeAvailable: false,
        birthLocationQuery: 'Levice, Slovakia',
    },
];
