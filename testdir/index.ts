/**
 * /**
 *  * A function that takes a number or a string, and returns either the number multiplied by 2
 *  * if a number is provided, or the string converted to uppercase if a string is provided.
 *  * 
 *  * @param {number | string} x - The number or string input
 *  * @returns {number | string} The output value, which is either a number or string
 *  */
 * function test_pr(x: number | string): number | string {
 *     if (typeof x === 'number') {
 *         return x * 2;
 *     }
 *     return x.toUpperCase();
 * }
 * */
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}