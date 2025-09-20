'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized career path recommendations based on user input.
 *
 * - generatePersonalizedCareerPaths - A function that takes user skills, academic background, and interests as input and returns personalized career path recommendations.
 * - GeneratePersonalizedCareerPathsInput - The input type for the generatePersonalizedCareerPaths function.
 * - GeneratePersonalizedCareerPathsOutput - The return type for the generatePersonalizedCareerPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedCareerPathsInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma separated list of the user skills.'),
  academicBackground: z.string().describe('The academic background of the user.'),
  interests: z.string().describe('A comma separated list of the user interests.'),
});
export type GeneratePersonalizedCareerPathsInput = z.infer<
  typeof GeneratePersonalizedCareerPathsInputSchema
>;

const CareerPathRecommendationSchema = z.object({
  jobTitle: z.string().describe('The recommended job title.'),
  industry: z.string().describe('The industry the job title belongs to.'),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the suitability of the recommendation.'
    ),
  nextSteps: z.array(z.string()).describe('A list of actionable next steps for the user to pursue this career path.'),
  learningResources: z.array(z.string()).describe('A list of books or online resources to learn more about this career path.'),
});

const GeneratePersonalizedCareerPathsOutputSchema = z.array(
  CareerPathRecommendationSchema
);
export type GeneratePersonalizedCareerPathsOutput = z.infer<
  typeof GeneratePersonalizedCareerPathsOutputSchema
>;

export async function generatePersonalizedCareerPaths(
  input: GeneratePersonalizedCareerPathsInput
): Promise<GeneratePersonalizedCareerPathsOutput> {
  return generatePersonalizedCareerPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedCareerPathsPrompt',
  input: {schema: GeneratePersonalizedCareerPathsInputSchema},
  output: {schema: GeneratePersonalizedCareerPathsOutputSchema},
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are a career path recommendation expert. Given the following information about a student, generate personalized career path recommendations. For each recommendation, include:
1. The job title and industry.
2. A confidence score between 0 and 1 for suitability.
3. A list of 2-3 actionable next steps (e.g., 'Take a course on...', 'Build a project that...').
4. A list of 2-3 specific books or online resources for learning.

Skills: {{{skills}}}
Academic Background: {{{academicBackground}}}
Interests: {{{interests}}}`,
});

const generatePersonalizedCareerPathsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedCareerPathsFlow',
    inputSchema: GeneratePersonalizedCareerPathsInputSchema,
    outputSchema: GeneratePersonalizedCareerPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
