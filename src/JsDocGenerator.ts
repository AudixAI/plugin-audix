import { AIService } from './AIService.js';
import { ASTQueueItem } from './types/index.js';

/**
 * Class for generating JSDoc comments using an AI service.
 */
  */
export class JsDocGenerator {
/**
 * Constructor for creating an instance of a class with an AIService dependency injected.
 * 
 * @param {AIService} aiService - The AIService instance to be injected into the class.
 */
    constructor(public aiService: AIService) { }

/**
 * Generates a comment for the given ASTQueueItem.
 * 
 * @param {ASTQueueItem} queueItem The ASTQueueItem for which to generate a comment.
 * @returns {Promise<string>} A Promise that resolves to the generated comment.
 */
    public async generateComment(queueItem: ASTQueueItem): Promise<string> {
        const prompt = this.buildPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return comment;
    }

/**
 * Generate a comment for a class based on the given ASTQueueItem.
 *
 * @param {ASTQueueItem} queueItem - The ASTQueueItem containing information about the class.
 * @return {Promise<string>} A promise that resolves to the generated comment for the class.
 */
    public async generateClassComment(
        queueItem: ASTQueueItem,
    ): Promise<string> {
        const prompt = this.buildClassPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return comment;
    }

/**
 * Builds a prompt based on the given ASTQueueItem code.
 * 
 * @param {ASTQueueItem} queueItem The ASTQueueItem object containing the code
 * @returns {string} The prompt string with the JSDoc comment
 */ 
private buildPrompt(queueItem: ASTQueueItem): string {
    return `Generate JSDoc comment for the following code:
    
    \`\`\`typescript
    ${queueItem.code}
    \`\`\`
    
    Only return the JSDoc comment, not the code itself.
    `;
}
```
    private buildPrompt(queueItem: ASTQueueItem): string {
        return `Generate JSDoc comment for the following code:


        \`\`\`typescript
        ${queueItem.code}
        \`\`\`
        
        Only return the JSDoc comment, not the code itself.
        `;
    }

/**
 * Builds a JSDoc comment for the given Class.
 * 
 * @param {ASTQueueItem} queueItem - The ASTQueueItem object containing information about the Class.
 * @returns {string} - The JSDoc comment for the Class.
 */
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