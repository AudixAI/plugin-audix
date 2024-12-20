import { AIService } from './AIService.js';
import { ASTQueueItem } from './types/index.js';

export class JsDocGenerator {
    constructor(public aiService: AIService) { }

    public async generateComment(queueItem: ASTQueueItem): Promise<string> {
        const prompt = this.buildPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return comment;
    }

    public async generateClassComment(
        queueItem: ASTQueueItem,
    ): Promise<string> {
        const prompt = this.buildClassPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return comment;
    }

    private buildPrompt(queueItem: ASTQueueItem): string {
        return `Generate JSDoc comment for the following code:


        \`\`\`typescript
        ${queueItem.code}
        \`\`\`
        
        Only return the JSDoc comment, not the code itself.
        `;
    }

    private buildClassPrompt(
        queueItem: ASTQueueItem,
    ): string {
        return `Generate JSDoc comment for the following Class:

        Class name: ${queueItem.code.match(/class (\w+)/)?.[1]}

        Only return the JSDoc for the Class itself, not the methods or anything in the class.
        
        Only return the JSDoc comment for the class, no other text or code.

        Example:
        \`\`\`
        /**
         * This is a class that does something. It has a method that does something.
         */
        \`\`\`
        `;
    }
}