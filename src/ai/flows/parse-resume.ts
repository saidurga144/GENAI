'use server';
/**
 * @fileOverview This file defines a Genkit flow for parsing a user's resume text to extract skills and academic background.
 *
 * - parseResume - A function that takes resume text and returns structured data.
 * - ParseResumeInput - The input type for the parseResume function.
 * - ParseResumeOutput - The return type for the parseResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeText: z.string().describe('The full text content of a user\'s resume.'),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  skills: z.string().describe('A comma-separated list of skills extracted from the resume.'),
  academicBackground: z.string().describe('A summary of the academic background extracted from the resume.'),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(input: ParseResumeInput): Promise<ParseResumeOutput> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumePrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParseResumeOutputSchema},
  prompt: `You are an expert resume parser. Analyze the following resume text and extract the user's skills and academic background.

Provide the skills as a comma-separated list.
Summarize the academic background concisely.

Resume Text:
{{{resumeText}}}
`,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
