import * as fs from 'fs';
import * as path from 'path';

export class DirectoryTraversal {
    constructor(
        public rootDirectory: string,
        public excludedDirectories: string[] = [],
        public excludedFiles: string[] = []
    ) { }

    public traverse(): string[] {
        const typeScriptFiles: string[] = [];

        const traverseDirectory = (currentDirectory: string) => {
            const files = fs.readdirSync(currentDirectory);

            files.forEach((file) => {
                const filePath = path.join(currentDirectory, file);
                const stats = fs.statSync(filePath);

                if (stats.isDirectory()) {
                    if (!this.isExcluded(filePath)) {
                        traverseDirectory(filePath);
                    }
                } else if (stats.isFile() && !this.isExcluded(filePath)) {
                    if (path.extname(file) === '.ts' || path.extname(file) === '.tsx') {
                        typeScriptFiles.push(filePath);
                    }
                }
            });
        };

        traverseDirectory(this.rootDirectory);
        return typeScriptFiles;
    }

    public isExcluded(filePath: string): boolean {
        return (
            this.excludedDirectories.includes(path.dirname(filePath)) ||
            this.excludedFiles.includes(path.basename(filePath))
        );
    }

    public handleError(error: Error): void {
        console.error('Directory Traversal Error:', error);
        // Additional error handling logic
    }
}