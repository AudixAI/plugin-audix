/**
 * Takes a number or string as input and performs the following operations:
 * - If input is a number, returns the input multiplied by 2.
 * - If input is a string, returns the input converted to uppercase.
 * 
 * @param {number | string} x - The input number or string.
 * @returns {number | string} The result of the operation based on the type of the input.
/**
 * Takes a number or string as input and returns either the input multiplied by 2 if it is a number, or the input converted to uppercase if it is a string.
 * @param {number | string} x - The input number or string
 * @returns {number | string} If input is a number, returns input multiplied by 2. If input is a string, returns input converted to uppercase.
 */
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

function test_pr2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}