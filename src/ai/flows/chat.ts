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
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The AI\'s response.'),
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
    const model = ai.getModel();

    // The Gemini 2.5 Flash model used in this app only supports 'user' and 'model' roles.
    const mappedHistory: Message[] = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : h.role,
      content: h.content,
    }));

    const {output} = await ai.generate({
      model,
      history: mappedHistory,
      prompt: message,
    });

    return {
      message: output!.text,
    };
  }
);
