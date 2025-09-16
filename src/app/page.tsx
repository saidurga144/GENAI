"use client";

import { useState } from 'react';
import { getCareerRecommendations, parseResume } from './actions';
import { CareerForm } from '@/components/futurepath/CareerForm';
import { ResultsDashboard } from '@/components/futurepath/ResultsDashboard';
import { Header } from '@/components/futurepath/Header';
import type { DetailedCareerPath, FormInput } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [results, setResults] = useState<DetailedCareerPath[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: FormInput, resumeText?: string) => {
    setIsLoading(true);
    setError(null);
    let submissionData = data;

    try {
      if (resumeText) {
        const parsedData = await parseResume({ resumeText });
        submissionData = {
          ...data,
          skills: parsedData.skills,
          academicBackground: parsedData.academicBackground,
        };
      }
      
      const recommendations = await getCareerRecommendations(submissionData);
      if (recommendations.length === 0) {
        setError("We couldn't find any career paths that match your profile. Please try adjusting your inputs.");
      } else {
        setResults(recommendations);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(`Failed to generate recommendations: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while generating recommendations. Please try again.`,
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full pt-16">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Analyzing your profile...</h2>
          <p className="text-muted-foreground">Our AI is crafting your personalized career paths. This may take a moment.</p>
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

    if (results) {
      return <ResultsDashboard results={results} onReset={handleReset} />;
    }

    return <CareerForm onSubmit={handleFormSubmit} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm no-print">
        <p>FuturePath Navigator &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
