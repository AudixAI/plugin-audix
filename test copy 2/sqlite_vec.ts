
/**
 * A function that takes a number or a string as input and performs different operations based on the data type.
 * If the input is a number, it will multiply the number by 2.
 * If the input is a string, it will convert the string to uppercase.
 * @param {number | string} x - The input number or string to be processed
 * @return {number | string} The result of the operation based on the input data type
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
 * This is a simple class that serves as an example.
 */
```
class SimpleClass {

/**
 * Constructor for creating an instance with a given value for x.
 * @param {number} x - The value of x for the instance
 */
    constructor(public x: number) { }

/**
 * Takes a number and doubles it.
 * 
 * @param {number} x - The number to be multiplied by 2.
 * @returns {number} The result of multiplying the input number by 2.
 */
    simpleMethod(x: number): number {
        return x * 2;
    }

/**
 * Converts a number to a string.
 * 
 * @param {number} x - The number to be converted to a string.
 * @returns {string} The number converted to a string.
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

