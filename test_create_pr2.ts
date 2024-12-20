/**
 * Takes a number or string as input and either multiplies the number by 2
 * or returns the input string in uppercase.
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The result of either multiplying the number
 * by 2 or returning the input string in uppercase.
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or string as input and returns double the number if a number is provided,
 * or returns the input string in uppercase if a string is provided.
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The result which is either the input number doubled or the input string in uppercase
 */
function test_pr2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}