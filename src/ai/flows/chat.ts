'use server';
/**
 * @fileOverview A simple AI chat flow.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {Message, Part} from 'genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.string(),
        content: z.array(z.object({text: z.string()})),
      })
    )
    .describe('The chat history.'),
  message: z.string().describe("The user's message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {history, message} = input;

    // The Gemini 1.5 Flash model used in this app only supports 'user' and 'model' roles.
    const mappedHistory: Message[] = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : h.role,
      content: h.content,
    }));

    // Add a prefix to the user's message to provide context and avoid safety flags.
    const contextualPrompt = `As a career counseling assistant, please answer the following user query: "${message}"`;

    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      system: 'You are a helpful and friendly AI assistant. Your goal is to provide accurate and safe information to the user.',
      history: mappedHistory,
      prompt: contextualPrompt,
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
    });

    if (!output) {
      return {
        message:
          'Sorry, I could not process your request. The response may have been blocked.',
      };
    }

    return {
      message: output.text,
    };
  }
);
