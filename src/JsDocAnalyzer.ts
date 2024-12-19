import type { TSESTree } from '@typescript-eslint/types';

interface Location {
    start: number;
    end: number;
}

export class JsDocAnalyzer {

    public missingJsDocNodes: TSESTree.Node[] = [];

    public analyze(ast: TSESTree.Program): void {
        this.traverse(ast, ast.comments || []);
    }

    private traverse(node: TSESTree.Node, comments?: TSESTree.Comment[]): void {
        if (this.isMissingJsDoc(node, comments || [])) {
            this.missingJsDocNodes.push(node);
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

    public isMissingJsDoc(node: TSESTree.Node, comments: any[]): boolean {
        if (
            node.type === 'FunctionDeclaration' ||
            node.type === 'ClassDeclaration' ||
            node.type === 'MethodDefinition'
        ) {
            const functionStartLine = node.loc?.start.line;
            const functionEndLine = node.loc?.end.line;

            const jsDocComment = comments.find((comment) => {
                const commentEndLine = comment.loc?.end.line;
                return (
                    comment.type === 'Block' &&
                    comment.value.startsWith('*') &&
                    commentEndLine === functionStartLine - 1
                );
            });

            console.log(jsDocComment + ' ' + functionStartLine + ' ' + functionEndLine);

            return !jsDocComment;
        }
        return false;
    }

    public getNodeLocation(node: TSESTree.Node): Location {
        return {
            start: node.loc.start.line,
            end: node.loc.end.line,
        };
    }
}