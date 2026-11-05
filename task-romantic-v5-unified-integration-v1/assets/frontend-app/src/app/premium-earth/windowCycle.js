/*
 * THE WINDOW CARDS' SHARED CLOCK - ONE CYCLE FOR ALL FOUR, AND A STILL MOMENT TOGETHER.
 *
 * The four pillar cards of the main menu (Human Design, BaZi, Numerology, Astrology) each play a different number of pictures in their window - nine centres, ten characters (the five elements, twice),
 * nine numbers (in the other script on the next loop), eight moons - but they are one row, and should breathe together. THE PACE IS HUMAN DESIGN'S (the owner's reference): a centre takes 3.6 s, so nine
 * of them 32.4 s, and the other cards' pictures are timed to fit the same 32.4 s. So all four take THE SAME TIME to play all their pictures once (WINDOW_ACTIVE), each picture
 * taking its card's share of it (its SLOT); then all four STAND STILL TOGETHER for WINDOW_HOLD seconds, the last picture of each staying in its window; then all four begin again at once. The loop
 * of every card is WINDOW_LOOP. (The cards' animations start together because they are drawn together, and the menu's lifecycle pauses and resumes them together.)
 *
 * HOW A PICTURE GOES: it is drawn, it stands, and then it FADES OUT SOFTLY (a plain fade of the whole picture, WINDOW_FADE seconds) - it is not wiped away backwards. The fade ends WINDOW_GAP seconds
 * before the end of the picture's slot, so there is a breath of empty window before the next picture is drawn. The LAST picture of a card has the hold added to its stand: its fade begins WINDOW_HOLD
 * seconds later, so that it fades just before the loop begins again, while the other cards' last pictures fade with it.
 */
/** How long every card takes to play all its pictures once, and how long all four stand still together after it; the loop is the two. */
export const WINDOW_ACTIVE = 32.4;
export const WINDOW_HOLD = 2;
export const WINDOW_LOOP = WINDOW_ACTIVE + WINDOW_HOLD;
/** The soft fade-out of a picture, and the empty moment between its end and the next picture's slot. */
export const WINDOW_FADE = 0.7;
export const WINDOW_GAP = 0.1;
const clamp01 = (u) => Math.min(1, Math.max(0, u));
const ease = (u) => { const t = clamp01(u); return t * t * (3 - 2 * t); };
/** A picture's slot, in seconds, on a card with `count` pictures. */
export const slotSeconds = (count) => WINDOW_ACTIVE / count;
/** When a picture's fade-out begins and ends, in the picture's own time (seconds from the start of its slot); the last picture's is moved by the hold. */
export function fadeWindow(slot, last) {
    const end = slot - WINDOW_GAP + (last ? WINDOW_HOLD : 0);
    return { start: end - WINDOW_FADE, end };
}
/** How much of a picture is left, 1 to 0, `t` seconds into its slot: all of it until its fade begins, then an ease to nothing. */
export function fadeAt(t, slot, last) {
    const { start, end } = fadeWindow(slot, last);
    return 1 - ease((t - start) / (end - start));
}
/** Where a card with `count` pictures is at a moment of its loop: which picture's slot (the last one's slot lasts through the hold) and how far into it. */
export function slotAt(seconds, count) {
    const wrapped = ((seconds % WINDOW_LOOP) + WINDOW_LOOP) % WINDOW_LOOP;
    const slot = slotSeconds(count);
    const index = Math.min(count - 1, Math.floor(wrapped / slot));
    return { index, t: wrapped - index * slot };
}
