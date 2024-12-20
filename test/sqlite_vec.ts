/**
 * Takes a number or string as input and either doubles the number if it is a number or converts the string to uppercase if it is a string.
 * 
 * @param {number | string} x - The input number or string
 * @returns {number | string} The result of the operation based on the type of input
 */
function has_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


/**
 * This function takes in a number or a string as input and performs different operations based on the type:
 * - If the input is a number, it multiplies the number by 2 and returns the result.
 * - If the input is a string, it converts the string to uppercase and returns it.
 * @param {number | string} x - The input number or string
 * @returns {number | string} - The result of the operation
 */
function does_not_have_jsdoc(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Takes a number or a string and either doubles the number
 * or returns the uppercase version of the string.
 * @param {number | string} x - The input value to be processed.
 * @returns {number | string} The processed value.
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Class representing a SimpleClass.
 */
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

