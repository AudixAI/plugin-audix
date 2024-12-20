
/**
 * Returns the value multiplied by 2 if it's a number, otherwise returns the value in upper case.
 * 
 * @param {number | string} x - The input value to be processed.
 * @returns {number | string} The processed output value.
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
 * Constructor for creating an instance of the class with the provided value for 'x'.
 * @param {number} x - The value for 'x' property.
 */
    constructor(public x: number) { }

/**
 * Multiplies a number by 2.
 * @param {number} x - The number to be multiplied
 * @returns {number} The result of multiplying the input number by 2
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to be converted to a string
 * @returns {string} The number converted to a string
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

