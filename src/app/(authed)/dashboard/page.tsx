"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getCareerRecommendations, getCareerPathDetails, parseResume } from '@/app/actions';
import { CareerForm } from '@/components/futurepath/CareerForm';
import { ResultsDashboard } from '@/components/futurepath/ResultsDashboard';
import type { CareerPath, DetailedCareerPath, FormInput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [results, setResults] = useState<CareerPath[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formInput, setFormInput] = useState<FormInput | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: FormInput, resumeText?: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    let submissionData = data;
    const isResumeUpload = !!resumeText;

    try {
      if (isResumeUpload) {
        const parsedData = await parseResume({ resumeText: resumeText! });
        submissionData = {
          ...data,
          skills: parsedData.skills,
          academicBackground: parsedData.academicBackground,
        };
      }

      setFormInput(submissionData);
      
      const recommendations = await getCareerRecommendations(submissionData, isResumeUpload);
      if (recommendations.length === 0) {
        setError("We couldn't find any career paths that match your profile. Please try adjusting your inputs.");
      } else {
        setResults(recommendations);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      
      if (errorMessage.includes("503 Service Unavailable") || errorMessage.includes("overloaded")) {
        setError("Our AI is currently experiencing high demand. Please wait a moment and try again.");
         toast({
          variant: "destructive",
          title: "Service Temporarily Unavailable",
          description: "The career recommendation service is currently overloaded. Please try again in a few moments.",
        });
      } else {
        setError(`Failed to generate recommendations: ${errorMessage}`);
        toast({
          variant: "destructive",
          title: "Error",
          description: `An error occurred while generating recommendations. Please try again.`,
        });
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setFormInput(null);
  };

  const renderContent = () => {
    if (isLoading && !results) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full pt-16">
          <Image src="/loader.gif" alt="Loading..." width={100} height={100} unoptimized />
          <h2 className="text-2xl font-semibold mb-2 tracking-tight mt-6">Crafting Your Career Paths...</h2>
          <p className="text-muted-foreground max-w-sm">Our AI is analyzing your profile to find the best opportunities. This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center pt-16">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={handleReset}>Try Again</Button>
        </div>
      );
    }

    if (results && formInput) {
      return <ResultsDashboard results={results} onReset={handleReset} formInput={formInput}/>;
    }

    return (
        <>
            <CareerForm onSubmit={handleFormSubmit} />
        </>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
      {renderContent()}
    </main>
  );
}
