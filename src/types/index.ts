export interface ASTQueueItem {
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