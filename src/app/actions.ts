
"use server";

import { generatePersonalizedCareerPaths } from '@/ai/flows/generate-personalized-career-paths';
import { summarizeSkillsForResume } from '@/ai/flows/summarize-skills-for-resume';
import { parseResume as parseResumeFlow, type ParseResumeInput } from '@/ai/flows/parse-resume';
import { generateRoadmap } from '@/ai/flows/generate-roadmap';
import { runChat, type ChatInput, type ChatOutput } from '@/ai/flows/chat';
import type { CareerPath, DetailedCareerPath, FormInput } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function getCareerRecommendations(
  data: FormInput,
  isResumeUpload: boolean,
): Promise<CareerPath[]> {
  let skills = data.skills;
  let academicBackground = data.academicBackground;
  const { interests } = data;

  if (isResumeUpload) {
    const parsedData = await parseResumeFlow({ resumeText: data.resumeText || '' });
    skills = parsedData.skills;
    academicBackground = parsedData.academicBackground;
  }

  if (!skills || !academicBackground) {
    throw new Error("Skills and Academic Background are required.");
  }
  if (!interests) {
    throw new Error("Interests are required.");
  }

  const careerPaths = await generatePersonalizedCareerPaths({
    skills: skills || 'Not provided',
    academicBackground: academicBackground || 'Not provided',
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
        skills: skills || 'Not provided',
        academicBackground: academicBackground || 'Not provided',
        interests: interests || 'Not provided',
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

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return await runChat(input);
}

// History Actions
export async function logUserActivity(userId: string, activity: string) {
  if (!userId) return;
  try {
    const historyCollection = collection(db, 'users', userId, 'history');
    await addDoc(historyCollection, {
      activity,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log user activity:", error);
    // Don't throw error to prevent crashing the client
  }
}

export async function getUserActivity(userId: string) {
  if (!userId) return [];
  try {
    const historyCollection = collection(db, 'users', userId, 'history');
    const q = query(historyCollection, orderBy('timestamp', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        activity: data.activity,
        // Convert Firestore Timestamp to a serializable format (ISO string)
        timestamp: data.timestamp?.toDate().toISOString() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Failed to get user activity:", error);
    return [];
  }
}
