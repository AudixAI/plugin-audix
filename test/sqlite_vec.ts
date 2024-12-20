/**
 * Takes a number or a string and returns either the number multiplied by 2
 * if the input is a number, or the input string converted to uppercase if it is a string.
 * @param {number | string} x - The input value that can be a number or a string.
 * @returns {number | string} The output value which is either the number multiplied by 2 or the input string converted to uppercase.
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
/**
 * A function that either doubles a number or converts a string to uppercase.
 * @param {number | string} x The input value that can be either a number or a string
 * @returns {number | string} The output value that is either the doubled number (if input is a number) or the input string converted to uppercase
 */
        return x * 2;
    }
/**
 * A function that takes in a number or string as input and performs different operations based on the type.
 * If the input is a number, it returns the input multiplied by 2.
 * If the input is a string, it returns the input converted to uppercase.
 * @param {number | string} x - The input value to be processed.
 * @returns {number | string} The processed value.
 */
/**
 * Constructor for creating an instance of the class with a specified 'x' value.
 * @param {number} x - The value of 'x' to initialize the instance with.
 */
/**
 * A simple method that multiplies the input number by 2.
 * 
 * @param {number} x - The input number to be multiplied.
 * @returns {number} The result of multiplying the input number by 2.
 */
/**
 * Converts a number to a string representation.
 * 
 * @param x - The number to convert to a string.
 * @returns A string representation of the input number.
 */
/**
 * Takes a number as input and returns the number converted to a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The number converted to a string.
 */
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

