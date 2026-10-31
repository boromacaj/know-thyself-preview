/*
 * Shapes shared by the collector (browser), the analysis and the report builder (pure). Everything here is already sanitized
 * structure or a number: no field may carry user input.
 */
export const CATEGORY_LABEL = Object.freeze({
    1: 'positioning calculation',
    2: 'CSS layout / stacking',
    3: 'WebKit rendering / compositing',
    4: 'hit target / overlay',
    5: 'viewport / toolbar / keyboard',
    6: 'JavaScript runtime',
    7: 'browser difference',
});
