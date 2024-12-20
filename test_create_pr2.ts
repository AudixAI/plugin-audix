/**
 * Takes a number or string as input and returns either the input multiplied by 2 if it's a number,
 * or returns the input in upper case if it's a string.
 * @param {number | string} x - The number or string input.
 * @returns {number | string} The result of the operation based on the type of input.
 */

/**
 * Takes a number or a string as input and returns either the number multiplied by 2
 * or the uppercase version of the string.
 * 
 * @param {number | string} x - The number or string to be processed.
 * @returns {number | string} The processed output.
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