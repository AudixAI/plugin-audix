/**
 * Takes a number or string as input and performs different operations based on the type.
 * If the input is a number, it returns the input multiplied by 2.
 * If the input is a string, it returns the input converted to upper case. test
 * 
 * @param {number | string} x - The input number or string to be processed.
 * @returns {number | string} The result of the operation based on the type of input.
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Takes a number or a string and either doubles the number if it is a number 
 * or converts the string to uppercase if it is a string.
 * @param {number | string} x - The number or string input
 * @returns {number | string} - The doubled number or the uppercase string
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
 * Constructor for the class with a specified x value.
 * @param {number} x - The value of x to be initialized with.
 */

/**
 * Multiply a number by 2.
 *
 * @param {number} x - The number to be multiplied.
 * @returns {number} The result of multiplying the input number by 2.
 */

/**
 * Convert a number to a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */
 */
class SimpleClass {

    /**
     * Constructor for the class with a specified x value.
     * @param {number} x - The value of x to be initialized with.
     */
    constructor(public x: number) { }

    /**
     * Multiply a number by 2.
     *
     * @param {number} x - The number to be multiplied.
     * @returns {number} The result of multiplying the input number by 2.
     */
    simpleMethod(x: number): number {
        return x * 2;
    }

    /**
     * Convert a number to a string.
     * 
     * @param {number} x - The number to be converted to a string.
     * @returns {string} The string representation of the input number.
     */
    simpleMethod2(x: number): string {
        return x.toString();
    }

/**
 * Takes a number and returns it as a string.
 * 
 * @param {number} x - The input number
 * @returns {string} The input number as a string
 */
    simpleMethod3(x: number): string {
        return x.toString();
    }
}

