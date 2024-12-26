import { TSESTree } from "@typescript-eslint/types";

export interface ASTQueueItem {
    name: string;
    filePath: string;
    startLine: number;
    endLine: number;
    nodeType: string;
    code: string;
    className?: string;
    methodName?: string;
    jsDoc?: string;
}

export interface Repository {
    owner: string;
    name: string;
    pullNumber?: number;
}

export interface FullModeFileChange {
    filename: string;
    status: string;
}

export interface PrModeFileChange extends FullModeFileChange {
    additions: number;
    deletions: number;
    changes: number;
    contents_url: string;
}

export interface PluginDocumentation {
    overview: string;
    installation: string;
    configuration: string;
    usage: string;
    apiReference: string;
    troubleshooting: string;
    todos: string;
}

export interface TodoItem {
    comment: string;
    code: string;
    fullContext: string;
    node: TSESTree.Node;
    location: {
        start: { line: number; column: number };
        end: { line: number; column: number };
    };
    contextLocation: {
        start: { line: number; column: number };
        end: { line: number; column: number };
    };
}

export interface EnvUsage {
    code: string;
    context: string;
    fullContext: string;
    node: TSESTree.Node;
    location: {
        start: { line: number; column: number };
        end: { line: number; column: number };
    };
    contextLocation: {
        start: { line: number; column: number };
        end: { line: number; column: number };
    };
}