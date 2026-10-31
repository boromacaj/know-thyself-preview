import { QA_PROFILE_PRESETS } from './qaProfilePresets.js?v=b5ef5ed';
/** A display name from the address: letters (any script), spaces and hyphens, 1 to 24 of them; otherwise the preset's own first name. */
export function sanitizedLabel(raw, fallback) {
    const cleaned = (raw ?? '').normalize('NFC').replace(/[^\p{L} -]/gu, '').trim().slice(0, 24);
    return cleaned.length > 0 ? cleaned : fallback;
}
/** The two presets and the label, the ids that are missing, or null when this address is not the QA Connections route, the dev shortcuts are off, or the build has fewer than two presets. */
export function qaConnectionsEntry(search, devPresetsEnabled, presets = QA_PROFILE_PRESETS) {
    if (!devPresetsEnabled)
        return null;
    const params = new URLSearchParams(search);
    if (params.get('qa') !== 'connections')
        return null;
    const askedOwner = (params.get('qaProfile') ?? '').trim();
    const askedPartner = (params.get('qaPartner') ?? '').trim();
    const byId = (id) => (id === '' ? null : presets.find((preset) => preset.id === id) ?? null);
    const missing = [askedOwner, askedPartner].filter((id) => id !== '' && byId(id) === null);
    if (missing.length > 0)
        return { ok: false, missing };
    const owner = byId(askedOwner) ?? presets[0] ?? null;
    const partner = byId(askedPartner) ?? presets.find((preset) => preset !== owner) ?? null;
    if (!owner || !partner || owner === partner)
        return null;
    return { ok: true, route: { owner, partner, partnerLabel: sanitizedLabel(params.get('qaPartnerLabel'), partner.birthName.split(' ')[0]), explicit: askedOwner !== '' || askedPartner !== '' } };
}
