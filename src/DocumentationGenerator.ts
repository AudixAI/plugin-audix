import { DirectoryTraversal } from './DirectoryTraversal';
import { TypeScriptFileIdentifier } from './TypeScriptFileIdentifier';
import { TypeScriptParser } from './TypeScriptParser';
import { JsDocAnalyzer } from './JsDocAnalyzer';
import { JsDocGenerator } from './JsDocGenerator';
import type { TSESTree } from '@typescript-eslint/types';
import { ASTQueueItem } from './types';
import fs from 'fs';
export class DocumentationGenerator {
    public missingJsDocQueue: ASTQueueItem[] = [];
    public existingJsDocQueue: ASTQueueItem[] = [];


    constructor(
        public directoryTraversal: DirectoryTraversal,
        // public typeScriptFileIdentifier: TypeScriptFileIdentifier,
        public typeScriptParser: TypeScriptParser,
        public jsDocAnalyzer: JsDocAnalyzer,
        public jsDocGenerator: JsDocGenerator,
        // public gitManager: GitManager,
        // public githubActionsWorkflow: GithubActionsWorkflow,
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

                for (const node of ast.body) {

                    if (!this.jsDocAnalyzer.shouldHaveJSDoc(node)) {
                        continue;
                    }

                    const jsDocComment = this.jsDocAnalyzer.getJSDocComment(node, ast.comments || []);
                    const queueItem: ASTQueueItem = {
                        filePath: file,
                        startLine: node.loc?.start.line || 0,
                        endLine: node.loc?.end.line || 0,
                        nodeType: node.type,
                        className: node.type === 'ClassDeclaration' ? node.id?.name : undefined,
                        methodName: node.type === 'MethodDefinition' ? node.key.name : undefined,
                        code: this.getNodeCode(file, node),
                    };

                    if (jsDocComment) {
                        queueItem.jsDoc = jsDocComment;
                        this.existingJsDocQueue.push(queueItem);
                    } else {
                        this.missingJsDocQueue.push(queueItem);
                    }
                }
            }
        }

        // Process the AST queue
        while (this.missingJsDocQueue.length > 0) {
            const queueItem = this.missingJsDocQueue.shift();
            if (queueItem) {
                let comment = '';
                if (queueItem.nodeType === 'ClassDeclaration') {
                    const className = queueItem.className;
                    // Generate JSDoc comments for class methods first
                    // Reason: Avoiding sending the entire Class to the AI, instead sending the method JSDoc only to provide context
                    const methodComments: Record<string, string> = {};
                    for (const methodNode of this.jsDocAnalyzer.getClassMethods(queueItem.filePath, className)) {

                        // check if a node on existingJsDocQueue has same class & method name - if Yes, get the jsDoc from there
                        // else pop it from the missingJsDocQueue and generate JSDoc
                        const existingNode = this.existingJsDocQueue.find(node => node.className === className && node.methodName === this.getMethodName(methodNode));
                        if (existingNode && existingNode.jsDoc) {
                            this.addMethodComment(methodNode, existingNode.jsDoc, methodComments);
                        } else {
                            const methodQueueItem: ASTQueueItem = {
                                ...queueItem,
                                nodeType: methodNode.type,
                                code: this.getNodeCode(queueItem.filePath, methodNode),
                            };
                            const methodComment = await this.jsDocGenerator.generateComment(methodQueueItem);
                            this.addMethodComment(methodNode, methodComment, methodComments);
                        }
                    }
                    console.log('methodComments', methodComments);
                    // Generate JSDoc comment for the class itself
                    comment = await this.jsDocGenerator.generateClassComment(queueItem, methodComments);
                } else {
                    // Generate JSDoc comment for small AST nodes
                    comment = await this.jsDocGenerator.generateComment(queueItem);
                }
                console.log(`Generated JSDoc comment for ${queueItem.nodeType} in ${queueItem.filePath}:`);
                console.log(comment);
            }
        }
    }

    private getMethodName(methodNode: TSESTree.MethodDefinition): string {
        return methodNode.key.type === 'Identifier' ? methodNode.key.name : '';
    }

    // Add method comment to the methodComments object
    private addMethodComment(methodNode: TSESTree.MethodDefinition, comment: string, methodComments: Record<string, string>): void {
        const methodName = this.getMethodName(methodNode);
        if (methodName) {
            methodComments[methodName] = comment;
        }
    }

    public getNodeCode(filePath: string, node: TSESTree.Node): string {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        const startLine = node.loc?.start.line || 0;
        const endLine = node.loc?.end.line || 0;
        return lines.slice(startLine - 1, endLine).join('\n');
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