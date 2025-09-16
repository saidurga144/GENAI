'use server';
/**
 * @fileOverview A flow that summarizes a student's skills and experiences for a given career path to be added to a resume.
 *
 * - summarizeSkillsForResume - A function that handles the summarization process.
 * - SummarizeSkillsForResumeInput - The input type for the summarizeSkillsForResume function.
 * - SummarizeSkillsForResumeOutput - The return type for the summarizeSkillsForResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSkillsForResumeInputSchema = z.object({
  skills: z.string().describe('The skills and experiences of the student.'),
  careerPath: z.string().describe('The career path the student is applying for.'),
  backgroundDetails: z.string().optional().describe('Any background details to take into account.'),
});
export type SummarizeSkillsForResumeInput = z.infer<typeof SummarizeSkillsForResumeInputSchema>;

const SummarizeSkillsForResumeOutputSchema = z.object({
  summary: z.string().describe('A summary of the student\'s skills and experiences for the given career path.'),
  progress: z.string().describe('Shows the progess of the running flow.'),
});
export type SummarizeSkillsForResumeOutput = z.infer<typeof SummarizeSkillsForResumeOutputSchema>;

export async function summarizeSkillsForResume(input: SummarizeSkillsForResumeInput): Promise<SummarizeSkillsForResumeOutput> {
  return summarizeSkillsForResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSkillsForResumePrompt',
  input: {schema: SummarizeSkillsForResumeInputSchema},
  output: {schema: SummarizeSkillsForResumeOutputSchema},
  prompt: `You are a career counselor who specializes in helping students write resumes.

You will receive a list of skills and experiences, and a career path the student is applying for.

Your job is to write a summary of the student\'s skills and experiences that is tailored to the career path.

Skills and Experiences: {{{skills}}}
Career Path: {{{careerPath}}}
Background Details: {{{backgroundDetails}}}
`,
});

const summarizeSkillsForResumeFlow = ai.defineFlow(
  {
    name: 'summarizeSkillsForResumeFlow',
    inputSchema: SummarizeSkillsForResumeInputSchema,
    outputSchema: SummarizeSkillsForResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Skills and experiences have been summarized for the specified career path.',
    };
  }
);
