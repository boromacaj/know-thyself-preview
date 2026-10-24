export function escapeHtml(value) {
    return formatDisplayText(value).replace(/[&<>'\"]/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
    })[character] ?? character);
}
export function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
}
export function formatDisplayText(value) {
    return value.replace(/\b(\d{1,2})\s+deg\s+(\d{1,2})\s+min\b/g, (_match, degrees, minutes) => (`${degrees}°${minutes.padStart(2, '0')}′`));
}
export function escapeDisplayText(value) {
    return escapeHtml(value);
}
export function formatList(values) {
    return values.length > 0 ? values.join(', ') : 'None available';
}
export function pillarLabel(pillarId) {
    const labels = {
        numerology: 'Numerology',
        'western-astrology': 'Western Astrology',
        'bazi-tcm': 'BaZi / TCM',
        'human-design': 'Human Design',
    };
    return labels[pillarId];
}
export function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
