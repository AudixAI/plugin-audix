/**
 * /**
 *  * Takes a number or string as input and either returns the input multiplied by 2 if it's a number,
 *  * or returns the input in uppercase if it's a string.
 *  * 
 *  * @param {number|string} x - The number or string to be processed
 *  * @returns {number|string} - The result of processing x
 *  */
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}