/**
 * Takes a number or string as input and returns either the input multiplied by 2 if it's a number, or the input converted to uppercase if it's a string.
 * 
 * @param {number | string} x - The input number or string
 * @returns {number | string} The input multiplied by 2 if it's a number, or the input converted to uppercase if it's a string
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Takes a number or string as input and performs different operations based on the type:
 * - If input is a number, it will multiply it by 2 and return the result.
 * - If input is a string, it will convert it to uppercase and return the result.
 * 
 * @param {number | string} x - The number or string input
 * @returns {number | string} - The result of the operation based on the type of input
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Function that takes a number or string and either doubles the number if it is a number or converts the string to uppercase if it is a string.
 * @param {number | string} x - The number or string input
 * @returns {number | string} - The doubled number or uppercase string
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

class SimpleClass {

/**
 * Constructor for creating an instance of the class.
 * @param x The value of the property 'x'.
 */
    constructor(public x: number) { }

/**
 * A simple method that multiplies the input number by 2.
 * 
 * @param {number} x - The number to be multiplied.
 * @returns {number} The result of multiplying the input number by 2.
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to convert to a string.
/**
 * Class representing a simple class.
 */
class SimpleClass {
    /**
     * Constructor for creating an instance of the class.
     * @param x The value of the property 'x'.
     */
    
    /**
     * A simple method that multiplies the input number by 2.
     * 
     * @param {number} x - The number to be multiplied.
     * @returns {number} The result of multiplying the input number by 2.
     */
    
    /**
     * Converts a number to a string.
     * 
     * @param {number} x - The number to convert to a string.
     * @returns {string} The number as a string.
     */
    
    /**
     * Converts a number to a string representation.
     * 
     * @param {number} x - The number to convert to a string.
     * @returns {string} The number converted to a string.
     */
}
 */
 * @returns {string} The number as a string.
 */
    simpleMethod2(x: number): string {
        return x.toString();
    }

/**
 * Converts a number to a string representation.
 * 
 * @param {number} x - The number to convert to a string.
 * @returns {string} The number converted to a string.
 */
    simpleMethod3(x: number): string {
        return x.toString();
    }
}

