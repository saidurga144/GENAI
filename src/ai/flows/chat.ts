
'use server';
/**
 * @fileOverview A simple AI chat flow.
 *
 * - runChat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {Message} from 'genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function runChat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    // The Gemini 1.5 Flash model used in this app only supports 'user' and 'model' roles.
    // This mapping correctly transforms the chat history into the format Genkit expects.
    const mappedHistory: Message[] = input.history.map(h => ({
      role: h.role, // role is already 'user' or 'model'
      content: [{text: h.content}],
    }));

    const conversation: Message[] = [
      {
        role: 'system',
        content: [
          {
            text: 'You are an AI assistant embedded within a web application, designed to help users with technical queries related to cybersecurity, cloud computing, programming, and web development. Respond clearly and concisely to each user’s question, providing actionable advice or explanations as needed. If the query includes source code or configuration details, review and suggest improvements or corrections.',
          },
        ],
      },
      ...mappedHistory,
    ];

    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      history: conversation,
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

    if (!output || !output.text) {
      return {
        message:
          'I apologize, but I was unable to generate a response for your request. This might be due to a temporary issue or the query being outside of my capabilities. Please try rephrasing your question or ask something else.',
      };
    }

    return {
      message: output.text,
    };
  }
);
