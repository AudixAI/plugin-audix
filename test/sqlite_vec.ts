/**
 * Takes a number or string as input and returns either the input multiplied by 2 if it is a number,
 * or the input converted to uppercase if it is a string.
 * @param {number | string} x - The number or string input
 * @returns {number | string} - The result of the operation based on the input type
 */

function has_jsdoc(x: number | string): number | string {
/**
 * Takes a number or string as input and returns either the input multiplied by 2 if it's a number,
 * or the input converted to uppercase if it's a string.
 * 
 * @param {number | string} x - The input value, can be a number or a string.
 * @returns {number | string} The processed output value.
 */
/**
 * Takes a number or a string and returns either the number multiplied by 2 if a number is provided,
 * or the string converted to uppercase if a string is provided.
 * 
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The result of the operations
 */


/**
 * Represents a constructor for a class with a specified value for x.
/**
 * Multiplies the input number by 2.
 * 
 * @param {number} x - The number to be multiplied.
/**
 * Takes a number and converts it to a string representation.
 * 
 * @param {number} x - The number to be converted to a string.
/**
 * Takes a number and returns it as a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The number converted to a string.
 */

 * @returns {string} The string representation of the input number.
 */

/**
 * Represents a constructor for a class with a specified value for x.
 * @param {number} x - The value for the x property.
 */

/**
 * Multiplies the input number by 2.
 * 
 * @param {number} x - The number to be multiplied.
 * @returns {number} The result of multiplying the input number by 2.
 */

/**
 * Takes a number and converts it to a string representation.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */

/**
 * Takes a number and returns it as a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The number converted to a string.
 */
 */

 * @returns {number} The result of multiplying the input number by 2.
 */

 * @param {number} x - The value for the x property.
 */

    if (typeof x === 'number') {
        return x * 2;
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

