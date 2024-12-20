import { DirectoryTraversal } from './DirectoryTraversal.js';
import { TypeScriptFileIdentifier } from './TypeScriptFileIdentifier.js';
import { TypeScriptParser } from './TypeScriptParser.js';
import { JsDocAnalyzer } from './JsDocAnalyzer.js';
import { JsDocGenerator } from './JsDocGenerator.js';
import type { TSESTree } from '@typescript-eslint/types';
import { ASTQueueItem, FullModeFileChange, PrModeFileChange } from './types/index.js';
import { GitManager } from './GitManager.js';
import fs from 'fs';
import { Configuration } from './Configuration.js';
import path from 'path';


export class DocumentationGenerator {
    public missingJsDocQueue: ASTQueueItem[] = [];
    public existingJsDocQueue: ASTQueueItem[] = [];
    private hasChanges: boolean = false;
    private fileContents: Map<string, string> = new Map();


    constructor(
        public directoryTraversal: DirectoryTraversal,
        // public typeScriptFileIdentifier: TypeScriptFileIdentifier,
        public typeScriptParser: TypeScriptParser,
        public jsDocAnalyzer: JsDocAnalyzer,
        public jsDocGenerator: JsDocGenerator,
        public gitManager: GitManager,
        // public githubActionsWorkflow: GithubActionsWorkflow,
        public configuration: Configuration
    ) { }

    public async generate(pullNumber?: number): Promise<void> {
        let fileChanges: PrModeFileChange[] | FullModeFileChange[] = [];


        // If in PR mode, only process files from the PR
        if (pullNumber) {
            // PR mode: @note get files from the PR
            fileChanges = await this.gitManager.getFilesInPullRequest(pullNumber);
            console.log('prFiles', fileChanges);
        } else {
            // Normal mode: process all TypeScript files in the root directory, besides excluded files
            const typeScriptFiles = this.directoryTraversal.traverse();
            console.log('Full ModetypeScriptFiles', typeScriptFiles);
            fileChanges = typeScriptFiles.map((file) => ({
                filename: file,
                status: 'modified',
            }));
        }

        // Process each TypeScript file
        for (const fileChange of fileChanges) {
            if (fileChange.status === 'deleted') {
                continue; // Skip deleted files
            }

            const filePath = path.join(fileChange.filename); // todo - need? this.configuration.rootDirectory,

            // Load and store file content
            if (fileChange.status === 'added' && 'contents_url' in fileChange) {
                const fileContent = await this.getFileContent(fileChange.contents_url);
                this.fileContents.set(filePath, fileContent);
            } else {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                this.fileContents.set(filePath, fileContent);
            }


            const ast = this.typeScriptParser.parse(filePath);
            if (!ast) continue;
            // Analyze JSDoc comments
            this.jsDocAnalyzer.analyze(ast);

            for (const node of ast.body) {

                if (!this.jsDocAnalyzer.shouldHaveJSDoc(node)) {
                    continue;
                }

                const jsDocComment = this.jsDocAnalyzer.getJSDocComment(node, ast.comments || []);
                const queueItem: ASTQueueItem = {
                    filePath: filePath,
                    startLine: node.loc?.start.line || 0,
                    endLine: node.loc?.end.line || 0,
                    nodeType: node.type,
                    className: node.type === 'ClassDeclaration' ? node.id?.name : undefined,
                    methodName: node.type === 'MethodDefinition' ? node.key.name : undefined,
                    code: this.getNodeCode(filePath, node),
                };

                if (jsDocComment) {
                    queueItem.jsDoc = jsDocComment;
                    this.existingJsDocQueue.push(queueItem);
                } else {
                    this.missingJsDocQueue.push(queueItem);
                }
            }
        }

        // Process the AST queue
        if (this.missingJsDocQueue.length > 0) {
            // Only create branch if we have missing JSDoc comments
            // @note Create a new branch based off this.configuration.branch for documentation updates
            const branchName = `JSDoc-update-PR#${pullNumber || 'full'}`;
            await this.gitManager.createBranch(branchName, this.configuration.branch);

            // Process the AST queue
            while (this.missingJsDocQueue.length > 0) {

                const queueItem = this.missingJsDocQueue.shift();
                if (!queueItem) continue;

                let comment = '';
                if (queueItem.nodeType === 'ClassDeclaration') {
                    const methodComments = await this.processClassMethods(queueItem);
                    comment = await this.jsDocGenerator.generateClassComment(queueItem, methodComments);
                } else {
                    comment = await this.jsDocGenerator.generateComment(queueItem);
                }
                console.log(`Generated JSDoc comment for ${queueItem.nodeType} in ${queueItem.filePath}:`);
                console.log(comment);

                // Update file content with new JSDoc
                await this.updateFileWithJSDoc(queueItem.filePath, comment, queueItem.startLine);
                this.hasChanges = true;
            }

            // Commit changes if any updates were made
            if (this.hasChanges) {
                for (const [filePath, content] of this.fileContents) {
                    await this.gitManager.commitFile(
                        branchName,
                        filePath,
                        content,
                        `Add JSDoc documentation to ${path.basename(filePath)}`
                    );
                }
            }

        }
    }

    private async updateFileWithJSDoc(filePath: string, jsDoc: string, insertLine: number): Promise<void> {
        const content = this.fileContents.get(filePath) || '';
        const lines = content.split('\n');
        lines.splice(insertLine - 1, 0, jsDoc);
        this.fileContents.set(filePath, lines.join('\n'));
    }

    private async processClassMethods(queueItem: ASTQueueItem): Promise<Record<string, string>> {
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
        return methodComments;
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

    private async getFileContent(contentsUrl: string): Promise<string> {
        const response = await fetch(contentsUrl);
        const data = await response.json();
        return Buffer.from(data.content, 'base64').toString('utf-8');
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