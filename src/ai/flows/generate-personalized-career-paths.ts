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
  prompt: `You are a career path recommendation expert. Given the following information about a student, generate personalized career path recommendations, including potential job titles and industries that align with their profile. Include a confidence score for each recommendation to gauge suitability. The confidence score should be between 0 and 1.

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
