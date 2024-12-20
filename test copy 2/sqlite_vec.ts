
/**
 * Takes in a number or a string and returns either the number multiplied by 2
 * if the input is a number, or the string converted to uppercase if the input is a string.
 * @param {number | string} x - The input value that can be either a number or a string.
 * @returns {number | string} The output value depending on the type of the input provided.
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * A function that takes a number or a string as input and return a number if the input is a number or return the input value converted to uppercase if it is a string.
 * 
 * @param {number | string} x - The input value which can be a number or a string.
 * @returns {number | string} - The value multiplied by 2 if it is a number, or converted to uppercase if it is a string.
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or a string as input and returns either the input multiplied by 2
 * if it is a number, or the input converted to uppercase if it is a string.
 * 
 * @param {number | string} x The input number or string
 * @returns {number | string} The result of the operation
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Class representing a simple class.
 */
 */
class SimpleClass {

/**
* Constructor for creating an instance of this class with a specified value for x.
* @param {number} x - The value for the property x.
*/
    constructor(public x: number) { }

/**
 * A simple method that multiplies the input by 2.
 * 
 * @param {number} x - The number to be multiplied
 * @returns {number} The result of multiplying the input by 2
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Converts a number to a string.
 * 
 * @param x - The number to be converted to a string.
 * @returns A string representation of the input number.
 */
    simpleMethod2(x: number): string {
        return x.toString();
    }

/**
 * Converts a number to a string.
 *
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */
    simpleMethod3(x: number): string {
        return x.toString();
    }
}

