/**
 * This function takes a number or string as input and returns a modified value based on the type of the input.
 * If the input is a number, it will return double the value of the number.
 * If the input is a string, it will return the uppercase version of the string.
 *
 * @param {number | string} x - The input value that can be a number or a string.
 * @returns {number | string} The modified value based on the type of the input.
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * Takes a number or string as input and returns either the doubled number
 * or the input string converted to uppercase.
 * 
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The doubled number or the input string in uppercase
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or string as input and returns either the number multiplied by 2 or the string converted to uppercase.
 * @param {number | string} x - The input number or string
 * @returns {number | string} Either the number multiplied by 2 or the string converted to uppercase
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Represents a simple class.
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

