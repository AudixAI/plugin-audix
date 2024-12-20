/**
 * Checks if the input is a number or a string, and performs a specific operation based on the type.
 * If the input is a number, it will be multiplied by 2.
 * If the input is a string, it will be converted to uppercase.
 * @param {number | string} x - The input value, which can be either a number or a string.
 * @return {number | string} The resulting value after applying the operation based on the type of input.
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Takes a number or a string and either doubles the number or converts the string to uppercase.
 * @param {number | string} x - The input number or string
 * @return {number | string} The result of doubling the number or converting the string to uppercase
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or string as input and either multiplies the number by 2
 * if it is a number, or converts the string to uppercase if it is a string.
 * @param {number | string} x - The number or string input to be processed.
 * @returns {number | string} Returns the result of doubling the number or
 * converting the string to uppercase.
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

class SimpleClass {

/**
 * Constructor for initializing an instance of the class with a specified value for 'x'.
 * 
 * @param {number} x - The value to assign to the 'x' property of the instance.
 */
    constructor(public x: number) { }

/**
 * Takes a number and returns the result of multiplying it by 2.
 * 
 * @param {number} x - The input number to be multiplied by 2.
 * @returns {number} The result of multiplying the input number by 2.
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Convert a number to a string representation.
 *
 * @param {number} x - The number to convert to a string.
/**
 * Class representing a SimpleClass.
 * 
 * @class
 */
 * @method constructor
 * Constructor for initializing an instance of the class with a specified value for 'x'.
 * 
 * @param {number} x - The value to assign to the 'x' property of the instance.
 * 
 * @method simpleMethod
 * Takes a number and returns the result of multiplying it by 2.
 * 
 * @param {number} x - The input number to be multiplied by 2.
 * @returns {number} The result of multiplying the input number by 2.
 * 
 * @method simpleMethod2
 * Convert a number to a string representation.
 *
 * @param {number} x - The number to convert to a string.
 * @returns {string} The string representation of the input number.
 * 
 * @method simpleMethod3
 * Converts a number to a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */
 * @returns {string} The string representation of the input number.
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

