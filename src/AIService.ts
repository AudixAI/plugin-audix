import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Represents a service that interacts with OpenAI API to generate comments.
 */

export class AIService {
    private chatModel: ChatOpenAI;

/**
 * Constructor for a class that initializes a ChatOpenAI instance using the OPENAI_API_KEY environment variable.
 * Throws an error if the OPENAI_API_KEY is not set.
 */
    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }
        this.chatModel = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

/**
 * Asynchronously generates a comment based on the provided prompt.
 * @param {string} prompt - The prompt for generating the comment
 * @returns {Promise<string>} The generated comment as a string
 */
    public async generateComment(prompt: string): Promise<string> {
        try {
            const response = await this.chatModel.invoke(prompt);
            return response.content as string;
        } catch (error) {
            this.handleAPIError(error as Error);
            return '';
        }
    }

/**
 * Handle API errors and log the error message before throwing the error.
 * 
 * @param {Error} error - The error object to handle
 * @returns {void}
 */
    public handleAPIError(error: Error): void {
        console.error('API Error:', error.message);
        throw error;
    }
}