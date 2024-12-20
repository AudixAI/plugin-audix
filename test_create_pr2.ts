/**
 * Generate JSDoc comment for the following code:
 * 
 *         ```typescript
 *         function test_pr(x: number | string): number | string {
 *     if (typeof x === 'number') {
 *         return x * 2;
 *     }
 *     return x.toUpperCase();
 * }
 *         ```
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * /**
 * * Takes a number or string as input and returns either the input multiplied by 2 if it is a number,
 * * or the input converted to uppercase if it is a string.
 * * @param {number | string} x - The input number or string.
 * * @return {number | string} - The result of the operation depending on the type of the input.
 * */
 */
function test_pr2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}