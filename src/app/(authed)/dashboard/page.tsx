"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getCareerRecommendations, getCareerPathDetails, parseResume } from '@/app/actions';
import { CareerForm } from '@/components/futurepath/CareerForm';
import { ResultsDashboard } from '@/components/futurepath/ResultsDashboard';
import type { CareerPath, DetailedCareerPath, FormInput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Shield, Atom } from 'lucide-react';
import Link from 'next/link';


const popularPaths = [
    {
        title: "Software Engineer",
        description: "Build applications and systems by writing, testing, and deploying code.",
        icon: <Code className="w-8 h-8 text-primary" />,
        href: "/software-engineer",
    },
    {
        title: "Cybersecurity Specialist",
        description: "Protect computer systems and networks from security breaches and cyber attacks.",
        icon: <Shield className="w-8 h-8 text-primary" />,
        href: "/cybersecurity-specialist",
    },
    {
        title: "EEE Engineer",
        description: "Design, develop, and test electrical equipment and electronic systems.",
        icon: <Atom className="w-8 h-8 text-primary" />,
        href: "/eee-engineer",
    },
];

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
            <div className="my-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground/80">Or, explore a popular career path</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {popularPaths.map(path => (
                         <Card key={path.href} className="flex flex-col">
                             <CardHeader className="flex-row items-center gap-4">
                                {path.icon}
                                <div>
                                    <CardTitle className="text-xl">{path.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{path.description}</p>
                            </CardContent>
                             <CardContent>
                                 <Button asChild className="w-full">
                                    <Link href={path.href}>
                                        View Roadmap
                                        <ArrowRight className="ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                         </Card>
                    ))}
                </div>
            </div>
        </>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
      {renderContent()}
    </main>
  );
}
