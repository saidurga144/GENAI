export type CareerPath = {
  jobTitle: string;
  industry: string;
  confidenceScore: number;
};

export type DetailedCareerPath = CareerPath & {
  summary: string;
};

export type FormInput = {
  email: string;
  skills: string;
  academicBackground: string;
  interests: string;
};
