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