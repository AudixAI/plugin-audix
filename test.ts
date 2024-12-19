import { DirectoryTraversal } from './src/DirectoryTraversal';
import { TypeScriptFileIdentifier } from './src/TypeScriptFileIdentifier';
import { TypeScriptParser } from './src/TypeScriptParser';
import { JsDocAnalyzer } from './src/JsDocAnalyzer';
import { JsDocGenerator } from './src/JsDocGenerator';
import { AIService } from './src/AIService';
import { ASTQueueItem } from './src/types';
import * as fs from 'fs';
import assert from 'assert';

// Define the root directory and excluded paths for testing
const rootDirectory = './test';
const excludedDirectories = ['node_modules'];
const excludedFiles = ['test.ts'];

// Create instances of the classes
const directoryTraversal = new DirectoryTraversal(rootDirectory, excludedDirectories, excludedFiles);
const typeScriptFileIdentifier = new TypeScriptFileIdentifier();
const typeScriptParser = new TypeScriptParser();
const aiService = new AIService("dummy");
const jsDocGenerator = new JsDocGenerator(aiService);


// Traverse the directory and get TypeScript files
const typeScriptFiles = directoryTraversal.traverse();

console.log('TypeScript files found:', typeScriptFiles);

// Test TypeScriptFileIdentifier
typeScriptFiles.forEach((file) => {
    const isTypeScriptFile = typeScriptFileIdentifier.isTypeScriptFile(file);
    console.log(`Is ${file} a TypeScript file?`, isTypeScriptFile);
});

// Test TypeScriptParser
typeScriptFiles.forEach(async (file) => {
    const ast = typeScriptParser.parse(file);
    if (ast) {
        // Write AST to JSON file
        const outputPath = `${file}.ast.json`;
        fs.writeFileSync(outputPath, JSON.stringify(ast, null, 2));

        // Analyze JSDoc comments
        const analyzer = new JsDocAnalyzer();
        analyzer.analyze(ast);

        console.log(`\nMissing JSDoc comments in ${file}:`);
        assert.strictEqual(analyzer.missingJsDocNodes.length, 3,
            `Expected 2 missing JSDoc comments in ${file}, but found ${analyzer.missingJsDocNodes.length}`);
        console.log('✅ JSDoc count assertion passed');
        analyzer.missingJsDocNodes.forEach(node => {
            console.log(`- Line ${node.loc?.start.line}: ${node.type}`);
        });

        for (const node of analyzer.missingJsDocNodes) {
            const queueItem: ASTQueueItem = {
                filePath: file,
                startLine: node.loc?.start.line ?? 0,
                endLine: node.loc?.end.line ?? 0,
                hasJSDoc: false,
                nodeType: node.type,
                functionName: 'FunctionDeclaration' === node.type ? (node as any).id?.name : undefined,
                parameters: 'FunctionDeclaration' === node.type ?
                    (node as any).params.map((param: any) => param.name) :
                    undefined,
                returnType: 'FunctionDeclaration' === node.type ?
                    jsDocGenerator.getReturnType(node as any) :
                    undefined
            };

            const comment = await jsDocGenerator.generateComment(queueItem);
            console.log(`Generated JSDoc comment for ${node.type} on line ${node.loc?.start.line}:`);
            console.log(comment);
        }
    }
});
