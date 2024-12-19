// src/JsDocGenerator.ts
import type { TSESTree } from '@typescript-eslint/types';
import { AIService } from './AIService';
import { ASTQueueItem } from './types';

export class JsDocGenerator {
    constructor(public aiService: AIService) { }

    public async generateComment(queueItem: ASTQueueItem): Promise<string> {
        const prompt = this.buildPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        const formattedComment = this.formatComment(comment);
        return formattedComment;
    }

    private buildPrompt(queueItem: ASTQueueItem): string {
        let prompt = '';

        if (queueItem.nodeType === 'FunctionDeclaration' || queueItem.nodeType === 'MethodDefinition') {
            prompt += `Generate JSDoc comment for the following ${queueItem.nodeType}:\n`;
            prompt += `${queueItem.nodeType} name: ${queueItem.functionName}\n`;
            prompt += `Parameters: ${queueItem.parameters?.join(', ') || ''}\n`;
            prompt += `Returns: ${queueItem.returnType || 'void'}\n`;
        } else if (queueItem.nodeType === 'ClassDeclaration') {
            prompt += `Generate JSDoc comment for the following ${queueItem.nodeType}:\n`;
            prompt += `${queueItem.nodeType} name: ${queueItem.className}\n`;
        }

        return prompt;
    }

    public getReturnType(node: TSESTree.FunctionDeclaration): string {
        const returnType = node.returnType;
        if (returnType && returnType.typeAnnotation) {
            return this.getTypeAnnotationString(returnType.typeAnnotation);
        }
        return 'void';
    }

    private getTypeAnnotationString(typeAnnotation: TSESTree.TypeNode): string {
        switch (typeAnnotation.type) {
            case 'TSAnyKeyword':
                return 'any';
            case 'TSBooleanKeyword':
                return 'boolean';
            case 'TSNumberKeyword':
                return 'number';
            case 'TSStringKeyword':
                return 'string';
            case 'TSVoidKeyword':
                return 'void';
            default:
                return 'unknown';
        }
    }

    private formatComment(comment: string): string {
        // Format the comment to adhere to the project's coding style
        return `/**\n * ${comment.trim().replace(/\n/g, '\n * ')}\n */`;
    }
}