/**
 * Takes a number or string and performs different operations based on the type.
 * If the input is a number, it returns the input multiplied by 2.
 * If the input is a string, it returns the input converted to uppercase.
 * 
 * @param {number | string} x - The input value, can be a number or a string.
 * @returns {number | string} The result of the operation on the input value.
 */

function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}