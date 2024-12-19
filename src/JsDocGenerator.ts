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

    public async generateClassComment(
        queueItem: ASTQueueItem,
        methodComments: Record<string, string>
    ): Promise<string> {
        const prompt = this.buildClassPrompt(queueItem, methodComments);
        const comment = await this.aiService.generateComment(prompt);
        const formattedComment = this.formatComment(comment);
        return formattedComment;
    }

    private buildPrompt(queueItem: ASTQueueItem): string {
        return `Generate JSDoc comment for the following code:

        \`\`\`typescript
        ${queueItem.code}
        \`\`\`
        `;
    }

    private buildClassPrompt(
        queueItem: ASTQueueItem,
        methodComments: Record<string, string>
    ): string {
        const methodCommentsString = Object.entries(methodComments)
            .map(([methodName, comment]) => `@method ${methodName}\n${comment}`)
            .join('\n');

        return `Generate JSDoc comment for the following class:

        Class name: ${queueItem.code.match(/class (\w+)/)?.[1]}

        Methods:
        ${methodCommentsString}
        `;
    }

    private formatComment(comment: string): string {
        // Format the comment to adhere to the project's coding style
        return `/**\n * ${comment.trim().replace(/\n/g, '\n * ')}\n */`;
    }
}