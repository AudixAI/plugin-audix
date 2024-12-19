import { DirectoryTraversal } from './DirectoryTraversal';
import { TypeScriptFileIdentifier } from './TypeScriptFileIdentifier';
import { TypeScriptParser } from './TypeScriptParser';
import { JsDocAnalyzer } from './JsDocAnalyzer';
import { JsDocGenerator } from './JsDocGenerator';
import type { TSESTree } from '@typescript-eslint/types';
import { ASTQueueItem } from './types';

export class DocumentationGenerator {
    private astQueue: ASTQueueItem[] = [];

    constructor(
        public directoryTraversal: DirectoryTraversal,
        public typeScriptFileIdentifier: TypeScriptFileIdentifier,
        public typeScriptParser: TypeScriptParser,
        public jsDocAnalyzer: JsDocAnalyzer,
        public jsDocGenerator: JsDocGenerator,
        public gitManager: GitManager,
        public githubActionsWorkflow: GithubActionsWorkflow,
        // public configuration: Configuration
    ) { }

    public async generate(): Promise<void> {
        // Traverse the directory and get TypeScript files
        const typeScriptFiles = this.directoryTraversal.traverse();

        // Process each TypeScript file
        for (const file of typeScriptFiles) {
            const ast = this.typeScriptParser.parse(file);
            if (ast) {
                // Analyze JSDoc comments
                this.jsDocAnalyzer.analyze(ast);

                // Enqueue missing JSDoc nodes
                for (const node of this.jsDocAnalyzer.missingJsDocNodes) {
                    if (node.type === 'ClassDeclaration') {
                        console.log('ClassDeclaration', node.id);
                    }
                    const queueItem: ASTQueueItem = {
                        filePath: file,
                        startLine: node.loc?.start.line || 0,
                        endLine: node.loc?.end.line || 0,
                        hasJSDoc: false,//todo add logic in missingJsDoc to paramterize "generate or gen&Improve" JSDoc
                        nodeType: node.type,
                        functionName: node.type === 'FunctionDeclaration' || node.type === 'MethodDefinition'
                            ? (node as TSESTree.FunctionDeclaration).id?.name
                            : undefined,
                        className: node.type === 'ClassDeclaration'
                            ? (node as TSESTree.ClassDeclaration).id?.name
                            : undefined,
                        parameters: node.type === 'FunctionDeclaration' || node.type === 'MethodDefinition'
                            ? (node as TSESTree.FunctionDeclaration).params.map(param => param.type === 'Identifier' ? param.name : '')
                            : undefined,
                        returnType: node.type === 'FunctionDeclaration' || node.type === 'MethodDefinition'
                            ? this.jsDocGenerator.getReturnType(node as TSESTree.FunctionDeclaration)
                            : undefined,
                    };
                    this.astQueue.push(queueItem);
                }
            }
        }

        // Process the AST queue
        while (this.astQueue.length > 0) {
            const queueItem = this.astQueue.shift();
            if (queueItem) {
                const comment = await this.jsDocGenerator.generateComment(queueItem);
                console.log(`Generated JSDoc comment for ${queueItem.nodeType} in ${queueItem.filePath}:`);
                console.log(comment);
            }
        }
    }

    public createWorkflow(): void {
        // Create the GitHub Actions workflow
    }

    public runTests(): void {
        // Run tests to ensure the generated documentation is accurate
    }

    public validate(): void {
        // Validate the generated documentation
    }

    public document(): void {
        // Generate documentation for the codebase
    }

    public communicate(): void {
        // Communicate the availability and usage instructions to the team
    }
}