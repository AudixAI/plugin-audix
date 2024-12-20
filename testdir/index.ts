/**
 * Takes a number or string as input and returns the result of doubling the number or converting the string to uppercase.
 * 
 * @param {number|string} x - The input value to be processed, can be a number or a string.
 * @returns {number|string} - The result of either doubling the number or converting the string to uppercase.
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}