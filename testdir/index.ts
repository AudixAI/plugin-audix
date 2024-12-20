/**
 * /**
 *  * Takes a number or a string as input and if it's a number, returns the input multiplied by 2,
 *  * otherwise returns the input in uppercase.
 *  * 
 *  * @param {number | string} x - The input number or string
 *  * @returns {number | string} The result after applying the operation based on the input type
 *  */
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}