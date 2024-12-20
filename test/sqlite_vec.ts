/**
 * Function that takes in a number or string and either doubles the number or returns the input string in uppercase.
 * @param {number | string} x - The input number or string to be processed
 * @returns {number | string} - The processed output, either a number doubled or a string in uppercase
 */

function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
/**
 * Function that takes a number or string and returns either the number multiplied by 2 or the string converted to uppercase.
 * @param {number | string} x - Input value that can be either a number or a string.
 * @returns {number | string} The result of the operation, either a number or a string.
 */

        return x * 2;
/**
 * This function takes in a number or string and if the input is a number,
 * it multiplies it by 2. If the input is a string, it converts it to uppercase.
 * @param {number|string} x - The input number or string
 * @returns {number|string} The output number or string
 */

/**
 * Constructor for initializing a new instance with a specified value of x.
 * @param {number} x - The value to assign to x.
 */
/**
 * Simple method that multiplies the input by 2.
 * @param {number} x - The number to be multiplied.
 * @returns {number} The result of multiplying the input by 2.
 */
/**
 * Takes a number and converts it to a string.
 * 
 * @param x The number to convert to a string.
 * @returns The string representation of the input number.
 */
/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to convert to a string.
 * @returns {string} The number converted to a string.
 */

/**
 * Constructor for initializing a new instance with a specified value of x.
/**
 * Simple method that multiplies the input by 2.
 * @param {number} x - The number to be multiplied.
 * @returns {number} The result of multiplying the input by 2.
/**
 * Takes a number and converts it to a string.
 * 
 * @param x The number to convert to a string.
/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to convert to a string.
 * @returns {string} The number converted to a string.
 */

 * @returns The string representation of the input number.
 */

 */

 * @param {number} x - The value to assign to x.
 */

    }
    return x.toUpperCase();
}


function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

class SimpleClass {

    constructor(public x: number) { }

    simpleMethod(x: number): number {
        return x * 2;
    }

    simpleMethod2(x: number): string {
        return x.toString();
    }

    simpleMethod3(x: number): string {
        return x.toString();
    }
}

