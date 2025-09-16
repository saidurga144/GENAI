"use server";

import { generatePersonalizedCareerPaths } from '@/ai/flows/generate-personalized-career-paths';
import { summarizeSkillsForResume } from '@/ai/flows/summarize-skills-for-resume';
import { parseResume as parseResumeFlow, type ParseResumeInput } from '@/ai/flows/parse-resume';
import type { DetailedCareerPath, FormInput } from '@/lib/types';

export async function getCareerRecommendations(
  data: FormInput,
  isResumeUpload: boolean,
): Promise<DetailedCareerPath[]> {
  const { skills, academicBackground, interests } = data;

  if (!isResumeUpload && (!skills || !academicBackground)) {
    throw new Error("Skills and Academic Background are required when not uploading a resume.");
  }
  if (!interests) {
    throw new Error("Interests are required.");
  }

  const careerPaths = await generatePersonalizedCareerPaths({
    skills,
    academicBackground,
    interests,
  });

  if (!careerPaths || careerPaths.length === 0) {
    return [];
  }
  
  const detailedCareerPaths = await Promise.all(
    careerPaths.map(async (path) => {
      try {
        const { summary } = await summarizeSkillsForResume({
          skills: skills,
          careerPath: path.jobTitle,
          backgroundDetails: `The user has the following academic background: ${academicBackground}. They are also interested in ${interests}.`,
        });

        return {
          ...path,
          summary: summary,
        };
      } catch (error) {
        console.error(`Error summarizing skills for ${path.jobTitle}:`, error);
        return {
          ...path,
          summary: "Could not generate a skill alignment summary for this career path.",
        };
      }
    })
  );

  return detailedCareerPaths;
}

export async function parseResume(input: ParseResumeInput) {
  return await parseResumeFlow(input);
}
