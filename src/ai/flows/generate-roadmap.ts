'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a personalized career roadmap.
 *
 * - generateRoadmap - A function that takes user's profile and a career path to generate a roadmap.
 * - GenerateRoadmapInput - The input type for the generateRoadmap function.
 * - GenerateRoadmapOutput - The return type for the generateRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoadmapInputSchema = z.object({
    skills: z.string().describe("The user's current skills."),
    academicBackground: z.string().describe("The user's academic background."),
    interests: z.string().describe("The user's interests."),
    jobTitle: z.string().describe("The target job title for the roadmap."),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

const RoadmapStageSchema = z.object({
    title: z.string().describe("Title of the roadmap stage (e.g., 'Foundation', 'Specialization')."),
    duration: z.string().describe("Estimated duration for this stage (e.g., '0-6 months')."),
    description: z.string().describe("A brief description of the stage's goal."),
    tasks: z.array(z.string()).describe("A list of specific, actionable tasks for this stage."),
});

const GenerateRoadmapOutputSchema = z.object({
    roadmap: z.array(RoadmapStageSchema).describe("A list of stages that form the career roadmap."),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;


export async function generateRoadmap(input: GenerateRoadmapInput): Promise<GenerateRoadmapOutput> {
    return generateRoadmapFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateRoadmapPrompt',
    input: {schema: GenerateRoadmapInputSchema},
    output: {schema: GenerateRoadmapOutputSchema},
    model: 'googleai/gemini-1.5-flash',
    prompt: `You are a career development expert. Based on the user's profile and their target job title, create a detailed, actionable roadmap to help them achieve their career goal.

The roadmap should be broken down into logical stages (e.g., Foundation, Specialization, Gaining Experience). For each stage, provide a title, an estimated duration, a brief description, and a list of 2-4 specific, actionable tasks.

The tasks should be tailored to the user's current skills, background, and interests.

User Profile:
- Skills: {{{skills}}}
- Academic Background: {{{academicBackground}}}
- Interests: {{{interests}}}

Target Job Title: {{{jobTitle}}}
`,
});

const generateRoadmapFlow = ai.defineFlow(
    {
        name: 'generateRoadmapFlow',
        inputSchema: GenerateRoadmapInputSchema,
        outputSchema: GenerateRoadmapOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
