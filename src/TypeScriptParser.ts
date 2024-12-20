import * as fs from 'fs';
import { parse } from '@typescript-eslint/parser';

/**
 * Class representing a TypeScript parser.
 */

export class TypeScriptParser {
/**
 * Parses the content of a file and generates an Abstract Syntax Tree (AST) using the specified parser configuration.
 * 
 * @param {string} file - The path to the file to parse.
 * @returns {any} The generated Abstract Syntax Tree (AST) of the file content, or null if an error occurred.
 */
    public parse(file: string): any {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            const ast = parse(content, {
                sourceType: 'module',
                ecmaVersion: 'latest',
                jsDocParsingMode: 'all',
            });
            return ast;
        } catch (error) {
            if (error instanceof Error) {
                this.handleParseError(error);
            } else {
                console.error('Unknown error:', error);
            }
            return null;
        }
    }

/**
 * Handles a parse error and logs it to the console.
 * 
 * @param {Error} error The error that occurred during parsing.
 * @returns {void}
 */
    public handleParseError(error: Error): void {
        console.error('TypeScript Parsing Error:', error);
    }
}