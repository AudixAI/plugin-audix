/**
 * Takes a number or string as input and returns either the number multiplied by 2
 * if a number is passed, or the string converted to uppercase if a string is passed.
 *
 * @param {number | string} x - The input value, which can be either a number or a string.
 * @returns {number | string} - The result of the operation, which will be a number or string.
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}