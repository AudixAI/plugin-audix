
/**
 * Takes a number or string as input and performs a specific operation based on the type.
 * If the input is a number, it doubles the number value.
 * If the input is a string, it converts the string to uppercase.
 * @param {number | string} x - The input number or string value.
 * @returns {number | string} - The result of the operation, which can be a number or string.
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
 * Convert a number to a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */
class SimpleClass {

/**
 * Constructor for creating an instance of a class with a specified x value.
 * @param {number} x - The value for the x property of the instance.
 */
    constructor(public x: number) { }

/**
 * Multiplies the input number by 2.
 * @param {number} x - The number to be multiplied
 * @returns {number} The result of the multiplication
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Converts a number to a string.
 *
 * @param {number} x - The number to convert to a string.
 * @returns {string} The string representation of the input number.
 */
    simpleMethod2(x: number): string {
        return x.toString();
    }

    /**
     * Convert a number to a string.
     * 
     * @param {number} x - The number to be converted to a string.
     * @returns {string} The string representation of the input number.
     */
    simpleMethod3(x: number): string {
        return x.toString();
    }
}

