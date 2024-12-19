export interface ASTQueueItem {
    filePath: string;
    startLine: number;
    endLine: number;
    hasJSDoc: boolean;
    nodeType: string;
    functionName?: string;
    parameters?: string[];
    returnType?: string;
    className?: string;
}