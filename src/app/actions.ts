"use server";

import { generatePersonalizedCareerPaths } from '@/ai/flows/generate-personalized-career-paths';
import { summarizeSkillsForResume } from '@/ai/flows/summarize-skills-for-resume';
import { parseResume as parseResumeFlow, type ParseResumeInput } from '@/ai/flows/parse-resume';
import { generateRoadmap } from '@/ai/flows/generate-roadmap';
import type { CareerPath, DetailedCareerPath, FormInput } from '@/lib/types';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function getCareerRecommendations(
  data: FormInput,
  isResumeUpload: boolean,
): Promise<CareerPath[]> {
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
  
  return careerPaths;
}

export async function getCareerPathDetails(
  careerPath: CareerPath, 
  userInput: FormInput
): Promise<DetailedCareerPath> {
  const { skills, academicBackground, interests } = userInput;
  try {
    const [summaryResult, roadmapResult] = await Promise.all([
      summarizeSkillsForResume({
        skills: skills,
        careerPath: careerPath.jobTitle,
        backgroundDetails: `The user has the following academic background: ${academicBackground}. They are also interested in ${interests}.`,
      }),
      generateRoadmap({
        skills,
        academicBackground,
        interests,
        jobTitle: careerPath.jobTitle,
      })
    ]);

    return {
      ...careerPath,
      summary: summaryResult.summary,
      roadmap: roadmapResult.roadmap,
    };
  } catch (error) {
    console.error(`Error processing details for ${careerPath.jobTitle}:`, error);
    // Return the basic path with placeholder details on error
    return {
      ...careerPath,
      summary: "Could not generate a skill alignment summary for this career path.",
      roadmap: [],
    };
  }
}


export async function parseResume(input: ParseResumeInput) {
  return await parseResumeFlow(input);
}
