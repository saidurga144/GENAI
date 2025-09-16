export type RoadmapStage = {
  title: string;
  duration: string;
  description: string;
  tasks: string[];
};

export type CareerPath = {
  jobTitle: string;
  industry: string;
  confidenceScore: number;
  nextSteps: string[];
  learningResources: string[];
};

export type DetailedCareerPath = CareerPath & {
  summary: string;
  roadmap: RoadmapStage[];
};

export type FormInput = {
  email: string;
  skills: string;
  academicBackground: string;
  interests: string;
};
