/**
 * This function takes in a number or a string and returns either the number multiplied by 2 if the input is a number,
 * or returns the input string converted to uppercase if the input is a string.
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The number multiplied by 2 if input is number, or the string in uppercase if input is string
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * A function that either doubles a number input or converts a string input to uppercase.
 * @param {number | string} x - The input value to process.
 * @return {number | string} - The processed value (doubled number or uppercased string).
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * This function takes in a number or string as input and returns either 
 * the input multiplied by 2 if it is a number, or the input converted to 
 * uppercase if it is a string.
 * 
 * @param {number | string} x - The input number or string to be processed
 * @returns {number | string} - The processed output based on the type of input
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

class SimpleClass {

/**
 * Constructor for creating an instance with a specified value for x.
 * @param {number} x - The initial value for x.
 */
    constructor(public x: number) { }

/**
 * Multiplies the input number by 2.
 * @param {number} x - The number to be multiplied.
 * @returns {number} The resulting value after multiplying by 2.
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * A simple method that converts a number to a string.
 *
 * @param {number} x - The number to convert to a string.
/**
 * Class representing a SimpleClass.
 */
 */
 * @return {string} The number converted to a string.
 */
    simpleMethod2(x: number): string {
        return x.toString();
    }

/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to convert to a string.
 * @returns {string} The string representation of the input number.
 */
    simpleMethod3(x: number): string {
        return x.toString();
    }
}

