const PLACES = {
    focus: { name: 'Focus' },
    past: { name: 'Past' },
    present: { name: 'Present' },
    future: { name: 'Future' },
    situation: { name: 'Situation' },
    action: { name: 'Action' },
    outcome: { name: 'Outcome' },
    problem: { name: 'Problem', gloss: 'shows the difficulty as it presents itself' },
    cause: { name: 'Cause' },
    solution: { name: 'Solution' },
    self: { name: 'Self', gloss: 'shows your own part in this' },
    other: { name: 'Other' },
    relationship: { name: 'Relationship' },
    'option-a': { name: 'Option A' },
    'option-b': { name: 'Option B' },
    guidance: { name: 'Guidance' },
    body: { name: 'Body' },
    mind: { name: 'Mind' },
    spirit: { name: 'Spirit' },
    standing: { name: 'Standing', gloss: 'shows where you stand' },
    weight: { name: 'Weight', gloss: 'shows what weighs on this' },
    support: { name: 'Support' },
    supports: { name: 'Support' },
    resists: { name: 'Resistance' },
    key: { name: 'Key' },
    seen: { name: 'Seen', gloss: 'shows what you can already see' },
    unseen: { name: 'Unseen', gloss: 'points to what may be outside your view' },
    shift: { name: 'Shift' },
    carried: { name: 'Carried', gloss: 'shows what you already carry' },
    available: { name: 'Available', gloss: 'shows what is available to you' },
    use: { name: 'Use' },
};
/** A place of a spread as the card-first reading names it. `label` is the spread's own label, used only for a position this table does not know. */
export function cardPositionOf(positionId, fn, label) {
    const known = PLACES[positionId];
    const name = known?.name ?? label.replace(/^(The|A|An) /, '').replace(/^./, (letter) => letter.toUpperCase());
    return { id: positionId, name, fn, ...(known?.gloss ? { gloss: known.gloss } : {}) };
}
