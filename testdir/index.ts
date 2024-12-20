/**
 * /**
 *  * This function takes a number or a string as input and performs the following operations:
 *  * - If the input is a number, it returns that number multiplied by 2.
 *  * - If the input is a string, it returns the input string converted to uppercase.
 *  * 
 *  * @param {number | string} x - The input number or string.
 *  * @returns {number | string} The result of the operation, which can be either a number or a string.
 *  */
 */
function test_pr(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}