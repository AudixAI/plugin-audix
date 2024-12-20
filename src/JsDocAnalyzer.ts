import type { TSESTree } from '@typescript-eslint/types';
import { TypeScriptParser } from './TypeScriptParser.js';

interface Location {
    start: number;
    end: number;
}

/**
 * Checks if a node should have JSDoc documentation
 */
export class JsDocAnalyzer {

    public missingJsDocNodes: TSESTree.Node[] = [];

/**
 * Constructor for a TypeScriptParser instance.
 * 
 * @param {TypeScriptParser} typeScriptParser - The TypeScriptParser object to be used in the constructor.
 */
    constructor(
        public typeScriptParser: TypeScriptParser,
    ) { }



/**
 * Analyzes the AST of a TypeScript program.
 * 
 * @param {TSESTree.Program} ast - The Abstract Syntax Tree of the program.
 * @returns {void}
 */
    public analyze(ast: TSESTree.Program): void {
        this.traverse(ast, ast.comments || []);
    }

/**
 * Traverses the given node and its children, checking for missing JSDoc comments.
 * 
 * @param {TSESTree.Node} node - The node to traverse.
 * @param {TSESTree.Comment[]} [comments] - An optional array of comments associated with the node.
 * @returns {void}
 */
    private traverse(node: TSESTree.Node, comments?: TSESTree.Comment[]): void {
        if (this.shouldHaveJSDoc(node)) {
            const jsDocComment = this.getJSDocComment(node, comments || []);
            if (!jsDocComment) {
                this.missingJsDocNodes.push(node);
            }
        }

        // Handle specific node types that can have children
        if ('body' in node) {
            const body = Array.isArray(node.body) ? node.body : [node.body];
            body.forEach(child => {
                if (child && typeof child === 'object') {
                    this.traverse(child as TSESTree.Node, comments);
                }
            });
        }

        // Handle other common child properties
        ['consequent', 'alternate', 'init', 'test', 'update'].forEach(prop => {
            if (prop in node && node[prop as keyof TSESTree.Node]) {
                this.traverse(node[prop as keyof TSESTree.Node] as TSESTree.Node, comments);
            }
        });
    }

    /**
     * Checks if a node should have JSDoc documentation
     */
    public shouldHaveJSDoc(node: TSESTree.Node): boolean {
        return (
            node.type === 'FunctionDeclaration' ||
            this.isClassNode(node) ||
            node.type === 'MethodDefinition'
        );
    }

/**
 * Determines if the given node is a ClassDeclaration or an export with a named ClassDeclaration.
 * @param {TSESTree.Node} node - The node to check.
 * @returns {boolean} True if the node is a ClassDeclaration or an export with a named ClassDeclaration, false otherwise.
 */
    public isClassNode(node: TSESTree.Node): boolean {
        if (node.type === 'ClassDeclaration') {
            return true;
        }

        if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'ClassDeclaration') {
            return true;
        }

        return false;
    }

    /**
     * Gets the JSDoc comment for a node if it exists
     */
    public getJSDocComment(node: TSESTree.Node, comments: TSESTree.Comment[]): string | undefined {
        if (!this.shouldHaveJSDoc(node)) {
            return undefined;
        }

        const functionStartLine = node.loc?.start.line;
        return comments.find((comment) => {
            const commentEndLine = comment.loc?.end.line;
            return (
                comment.type === 'Block' &&
                comment.value.startsWith('*') &&
                commentEndLine === functionStartLine - 1
            );
        })?.value;
    }

/**
 * Returns the location of the given node within the source code.
 * @param {TSESTree.Node} node - The node to get location for.
 * @returns {Location} - The start and end lines of the node within the source code.
 */
    public getNodeLocation(node: TSESTree.Node): Location {
        return {
            start: node.loc.start.line,
            end: node.loc.end.line,
        };
    }

/**
 * Retrieves all methods of a class in a given TypeScript file.
 * 
 * @param {string} filePath - The path to the TypeScript file.
 * @param {string} [className] - The name of the class to retrieve methods from. If not provided, retrieves methods from all classes.
 * @returns {TSESTree.MethodDefinition[]} An array of MethodDefinition nodes representing the methods of the class(es) found in the file.
 */
    public getClassMethods(filePath: string, className?: string): TSESTree.MethodDefinition[] {
        const ast = this.typeScriptParser.parse(filePath);
        if (!ast) return [];

        // Find all class declarations in the file
        const classNodes = ast.body.filter(
            (node: TSESTree.Node): node is TSESTree.ClassDeclaration =>
                node.type === 'ClassDeclaration' &&
                // If className is provided, match it, otherwise accept any class
                (className ? node.id?.name === className : true)
        );

        // Collect methods from all matching classes
        const methods: TSESTree.MethodDefinition[] = [];
        for (const classNode of classNodes) {
            const classMethods = classNode.body.body.filter(
                (node: TSESTree.Node): node is TSESTree.MethodDefinition =>
                    node.type === 'MethodDefinition'
            );
            methods.push(...classMethods);
        }

        return methods;
    }
}