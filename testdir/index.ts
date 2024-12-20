/**
 * Takes a number or string as input and returns a modified version of the input.
 * If the input is a number, it doubles the number and returns it.
 * If the input is a string, it converts the string to uppercase and returns it.
 *
 * @param {number | string} x - The input value to be processed.
 * @returns {number | string} The modified value based on the input type.
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}