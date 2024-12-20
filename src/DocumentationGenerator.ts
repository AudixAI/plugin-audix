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
import { AIService } from './AIService.js';

export class DocumentationGenerator {
    public missingJsDocQueue: ASTQueueItem[] = [];
    public existingJsDocQueue: ASTQueueItem[] = [];
    private hasChanges: boolean = false;
    private fileContents: Map<string, string> = new Map();
    private branchName: string = '';
    private fileOffsets: Map<string, number> = new Map();

    constructor(
        public directoryTraversal: DirectoryTraversal,
        public typeScriptParser: TypeScriptParser,
        public jsDocAnalyzer: JsDocAnalyzer,
        public jsDocGenerator: JsDocGenerator,
        public gitManager: GitManager,
        public configuration: Configuration,
        public aiService: AIService
    ) { }

    public async generate(pullNumber?: number): Promise<void> {
        let fileChanges: PrModeFileChange[] | FullModeFileChange[] = [];
        this.fileOffsets.clear();

        if (pullNumber) {
            const prFiles = await this.gitManager.getFilesInPullRequest(pullNumber);
            fileChanges = prFiles.filter(file => {
                const normalizedPath = path.normalize(file.filename);
                const rootDir = this.configuration.rootDirectory;
                const isInRootDir = rootDir === './' || rootDir === '.' || normalizedPath.startsWith(rootDir);

                const isExcluded = this.configuration.excludedDirectories.some(dir => {
                    const normalizedExcludeDir = path.normalize(dir);
                    return normalizedPath.includes(normalizedExcludeDir);
                }) || this.configuration.excludedFiles.some(excludedFile => {
                    const normalizedExcludeFile = path.normalize(excludedFile);
                    return normalizedPath.endsWith(normalizedExcludeFile);
                });

                return isInRootDir && !isExcluded;
            });
        } else {
            const typeScriptFiles = this.directoryTraversal.traverse();
            fileChanges = typeScriptFiles.map((file) => ({
                filename: file,
                status: 'modified',
            }));
        }

        // Process each TypeScript file
        for (const fileChange of fileChanges) {
            if (fileChange.status === 'deleted') continue;

            const filePath = path.join(fileChange.filename);
            this.fileOffsets.set(filePath, 0);

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

            this.jsDocAnalyzer.analyze(ast);

            // Process each node in the file
            for (const node of ast.body) {
                if (!this.jsDocAnalyzer.shouldHaveJSDoc(node)) continue;

                // Process the current node
                const jsDocComment = this.jsDocAnalyzer.getJSDocComment(node, ast.comments || []);
                const queueItem: ASTQueueItem = {
                    filePath: filePath,
                    startLine: node.loc?.start.line || 0,
                    endLine: node.loc?.end.line || 0,
                    nodeType: node.type,
                    className: node.type === 'ClassDeclaration' ? node.id?.name : undefined,
                    methodName: node.type === 'MethodDefinition' ? (node.key as TSESTree.Identifier).name : undefined,
                    code: this.getNodeCode(filePath, node),
                };

                if (jsDocComment) {
                    queueItem.jsDoc = jsDocComment;
                    this.existingJsDocQueue.push(queueItem);
                } else {
                    this.missingJsDocQueue.push(queueItem);
                }

                // If this is a class declaration, process its methods
                if (node.type === 'ClassDeclaration') {
                    const classBody = (node as TSESTree.ClassDeclaration).body;
                    for (const classElement of classBody.body) {
                        if (classElement.type === 'MethodDefinition') {
                            const methodJsDocComment = this.jsDocAnalyzer.getJSDocComment(classElement, ast.comments || []);
                            const methodQueueItem: ASTQueueItem = {
                                filePath: filePath,
                                startLine: classElement.loc?.start.line || 0,
                                endLine: classElement.loc?.end.line || 0,
                                nodeType: classElement.type,
                                className: node.id?.name,
                                methodName: (classElement.key as TSESTree.Identifier).name,
                                code: this.getNodeCode(filePath, classElement),
                            };

                            if (methodJsDocComment) {
                                methodQueueItem.jsDoc = methodJsDocComment;
                                this.existingJsDocQueue.push(methodQueueItem);
                            } else {
                                this.missingJsDocQueue.push(methodQueueItem);
                            }
                        }
                    }
                }
            }
        }

        // Process nodes that need JSDoc
        if (this.missingJsDocQueue.length > 0) {
            this.branchName = `docs-update-${pullNumber || 'full'}-${Date.now()}`;
            await this.gitManager.createBranch(this.branchName, this.configuration.branch);

            // Process each node
            for (const queueItem of this.missingJsDocQueue) {
                const comment = await this.jsDocGenerator.generateComment(queueItem);
                await this.updateFileWithJSDoc(queueItem.filePath, comment, queueItem.startLine);
                this.hasChanges = true;
            }

            // Commit changes if any updates were made
            if (this.hasChanges && this.branchName) {
                for (const [filePath, content] of this.fileContents) {
                    await this.gitManager.commitFile(
                        this.branchName,
                        filePath,
                        content,
                        `docs: Add JSDoc documentation to ${path.basename(filePath)}`
                    );
                }

                const prContent = await this.generatePRContent(pullNumber);
                await this.gitManager.createPullRequest({
                    title: prContent.title,
                    body: prContent.body,
                    head: this.branchName,
                    base: this.configuration.branch,
                    labels: ['documentation', 'automated-pr'],
                    reviewers: this.configuration.pullRequestReviewers || []
                });
            }
        }
    }

    private async updateFileWithJSDoc(filePath: string, jsDoc: string, insertLine: number): Promise<void> {
        const content = this.fileContents.get(filePath) || '';
        const lines = content.split('\n');
        const currentOffset = this.fileOffsets.get(filePath) || 0;
        const newLines = (jsDoc.match(/\n/g) || []).length + 1;
        const adjustedLine = insertLine + currentOffset;

        lines.splice(adjustedLine - 1, 0, jsDoc);
        this.fileOffsets.set(filePath, currentOffset + newLines);
        this.fileContents.set(filePath, lines.join('\n'));
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

    private async generatePRContent(pullNumber?: number): Promise<{ title: string; body: string }> {
        const modifiedFiles = Array.from(this.fileContents.keys());
        const filesContext = modifiedFiles.map(file => `- ${file}`).join('\n');

        const prompt = `Generate a pull request title and description for adding JSDoc documentation.
            Context:
            - ${modifiedFiles.length} files were modified
            - Files modified:\n${filesContext}
            - This is ${pullNumber ? `related to PR #${pullNumber}` : 'a full repository documentation update'}
            - This is an automated PR for adding JSDoc documentation

            Generate both a title and description. The description should be detailed and include:
            1. A clear summary of changes
            2. Summary of modified files
            3. Instructions for reviewers

            Format the response as a JSON object with 'title' and 'body' fields.`;

        const response = await this.aiService.generateComment(prompt);
        try {
            const content = JSON.parse(response);
            return {
                title: content.title,
                body: content.body
            };
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                title: `docs: Add JSDoc documentation${pullNumber ? ` for PR #${pullNumber}` : ''}`,
                body: this.generateDefaultPRBody()
            };
        }
    }

    private generateDefaultPRBody(): string {
        const changes = Array.from(this.fileContents.keys())
            .map(filePath => `- Added JSDoc documentation to \`${filePath}\``)
            .join('\n');

        return `## 📝 Documentation Updates
        This PR adds JSDoc documentation to TypeScript files that were missing proper documentation.

        ### 🔍 Changes Made:
        ${changes}

        ### 🤖 Generated by Documentation Bot
        This is an automated PR created by the documentation generator tool.`;
    }
}