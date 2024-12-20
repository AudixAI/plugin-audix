import * as fs from 'fs';
import * as path from 'path';

/**
 * A class to identify TypeScript files.
 */
export class TypeScriptFileIdentifier {
/**
 * Check if the given file is a TypeScript file based on its extension.
 * @param {string} file - The file to be checked.
 * @returns {boolean} - True if the file is a TypeScript file, false otherwise.
 */
    public isTypeScriptFile(file: string): boolean {
        const extension = path.extname(file);
        return extension === '.ts' || extension === '.tsx';
    }

/**
 * Retrieves an array of TypeScript files within a specified directory.
 *
 * @param {string} directory - The directory to search for TypeScript files.
 * @returns {string[]} An array of TypeScript files within the specified directory.
 */
    public getTypeScriptFiles(directory: string): string[] {
        const files = fs.readdirSync(directory);
        return files.filter((file) => this.isTypeScriptFile(file));
    }
}