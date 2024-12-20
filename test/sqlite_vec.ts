/**
 * Function that takes a number or a string and either doubles the number or converts the string to uppercase.
 * @param {number | string} x - The input number or string
 * @returns {number | string} The output that is either the doubled number or the uppercase string
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Takes a number or a string and returns either the number multiplied by 2
 * or the string converted to uppercase.
 * @param {number | string} x - The input number or string to be processed.
 * @returns {number | string} The processed output value.
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or string as input and returns either the number multiplied by 2 or the string in uppercase.
 * 
 * @param {number|string} x The input to be processed
 * @return {number|string} The processed output
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Constructor for creating an instance of the class with a given value for 'x'.
 * 
 * @param {number} x - The value to assign to the 'x' property of the instance.
 */
/**
 * Multiply a number by 2.
 * 
 * @param {number} x - The input number to be multiplied.
 * @returns {number} The result after multiplying the input number by 2.
 */
/**
 * Takes a number and converts it to a string representation.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The string representation of the input number.
 */
/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to convert to a string.
 * @returns {string} The resulting string representation of the number.
 */
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

