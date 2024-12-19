/**
 * Tests type narrowing by processing either a number or string input
 * @param x - Input value that can be either a number or string
 * @returns For number input, returns double the value. For string input, returns uppercase version
 */
function has_jsdoc(x: number | string): number | string {
    //comment
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}


function does_not_have_jsdoc(x: number | string): number | string {
    //comment
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

/**
 * Tests type narrowing by processing either a number or string input
 * @param x - Input value that can be either a number or string
 * @returns For number input, returns double the value. For string input, returns uppercase version
 */
function does_not_have_jsdoc_2(x: number | string): number | string {
    //comment
    if (typeof x === 'number') {
        return x * 2;
    }
    return x.toUpperCase();
}

class SimpleClass {
    /**
     * Simple constructor for testing
     * @param x - Input value that can be either a number or string
     */
    constructor(public x: number) { }

    simpleMethod(x: number): number {
        return x * 2;
    }
}

