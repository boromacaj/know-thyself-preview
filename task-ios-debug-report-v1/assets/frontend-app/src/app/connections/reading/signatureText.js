import { fill, pick, say } from './languages.js?v=b5ef5ed';
const MAX_SIGNATURES = 4;
const WEIGHT_RANK = { defining: 0, notable: 1, quiet: 2 };
/** The key a signature's phrase is stored under. Specific first, then generic; a phrase for neither means the signature is not narrated. */
export function signatureKeys(signature) {
    const form = signature.form;
    switch (signature.kind) {
        case 'inter-aspect': return [`astrology.inter-aspect.${signature.topic}.${signature.flavour}`, `astrology.inter-aspect.${signature.flavour}`];
        case 'day-master': return [`bazi.day-master.${signature.flavour}`];
        case 'channel': return [`human-design.channel.${String(form.class)}`];
        case 'type-pair': return [`human-design.type-pair.${signature.flavour === 'mirroring' ? 'same' : 'different'}`];
        default:
            if (signature.system === 'numerology')
                return [`numerology.${signature.kind}.${signature.flavour}`];
            return [`${signature.system}.${signature.kind}`];
    }
}
export function signatureViews(req, names) {
    const { shared } = req.content;
    const lang = req.lang;
    const vocab = (key, fallback) => (shared.vocabulary[key] ? say(shared.vocabulary[key], lang) : fallback);
    const eligible = req.evidence.signatures.filter((signature) => signatureKeys(signature).some((key) => shared.signatures[key]));
    /* One per system first (the strongest), then the next strongest overall, so the paragraph draws on the traditions rather than on whichever has the most contacts. */
    const bySystem = new Map();
    for (const signature of eligible)
        if (!bySystem.has(signature.system))
            bySystem.set(signature.system, signature);
    const firstPass = [...bySystem.values()].sort((a, b) => WEIGHT_RANK[a.weight] - WEIGHT_RANK[b.weight] || (a.id < b.id ? -1 : 1));
    const rest = eligible.filter((signature) => !firstPass.includes(signature));
    const chosen = [...firstPass, ...rest].slice(0, MAX_SIGNATURES);
    return chosen.map((signature) => {
        const key = signatureKeys(signature).find((candidate) => shared.signatures[candidate]);
        const form = signature.form;
        const direction = signature.direction;
        const forward = direction === 'a-to-b';
        const vars = {
            aBody: vocab(`body.${signature.a}`, signature.a), bBody: vocab(`body.${signature.b}`, signature.b),
            aspect: vocab(`aspect.${String(form.aspect ?? '')}`, String(form.aspect ?? '')),
            aElement: vocab(`element.${String(form.aElement ?? '')}`, String(form.aElement ?? '')),
            bElement: vocab(`element.${String(form.bElement ?? '')}`, String(form.bElement ?? '')),
            element: vocab(`element.${String(form.element ?? '')}`, String(form.element ?? '')),
            aPillar: vocab(`pillar.${String(form.aPillar ?? '')}`, String(form.aPillar ?? '')),
            bPillar: vocab(`pillar.${String(form.bPillar ?? '')}`, String(form.bPillar ?? '')),
            channel: String(form.channel ?? ''),
            typeA: vocab(`hdtype.${signature.a}`, signature.a), typeB: vocab(`hdtype.${signature.b}`, signature.b),
            position: vocab(`position.${signature.kind}`, signature.kind),
            numA: signature.system === 'numerology' ? signature.a : '', numB: signature.system === 'numerology' ? signature.b : '',
            /* Direction-bearing roles, always as nominative subjects. */
            giver: forward ? names.first : names.second, receiver: forward ? names.second : names.first,
            steerer: forward ? names.first : names.second, steered: forward ? names.second : names.first,
            holder: forward ? names.first : names.second, other: forward ? names.second : names.first,
            first: names.first, second: names.second,
        };
        const template = say(shared.signatures[key], lang);
        /* Variants of one phrase are separated by a vertical bar; the seed picks one, so two readings of the same kind do not open the same way. */
        const variants = template.split(' || ');
        const text = fill(pick(variants, req.seed, signature.id), new Proxy(vars, { get: (target, prop) => target[prop] ?? '' }));
        return {
            id: signature.id,
            system: signature.system,
            weight: signature.weight,
            text,
            chips: chipsOf(signature, names, vars, vocab),
        };
    });
}
/**
 * The technical chips of the evidence view. Every word on them is in the reader's language: the tradition's own token is looked up in the vocabulary (a branch clash, a channel class, a
 * five-phase relation), never printed as the engine's English key.
 */
function chipsOf(signature, names, vars, vocab) {
    switch (signature.system) {
        case 'astrology': return { first: `${names.first}: ${vars.aBody}`, second: `${names.second}: ${vars.bBody}`, relation: vars.aspect };
        case 'bazi': return signature.kind === 'day-master'
            ? { first: `${names.first}: ${vars.aElement}`, second: `${names.second}: ${vars.bElement}`, relation: vocab(`signature.flavour.${signature.flavour}`, signature.flavour) }
            : { first: `${names.first}: ${vars.aPillar}`, second: `${names.second}: ${vars.bPillar}`, relation: vocab(`signature.kind.${signature.kind}`, signature.kind.replace(/-/g, ' ')) };
        case 'human-design': return signature.kind === 'channel'
            ? { first: names.first, second: names.second, relation: `${vocab('signature.channel', 'channel')} ${String(signature.form.channel)} · ${vocab(`signature.class.${String(signature.form.class)}`, String(signature.form.class))}` }
            : { first: `${names.first}: ${vars.typeA}`, second: `${names.second}: ${vars.typeB}`, relation: vocab('signature.type', 'type') };
        default: return { first: `${names.first}: ${signature.a}`, second: `${names.second}: ${signature.b}`, relation: vars.position };
    }
}
