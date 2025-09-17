"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { CareerPath, DetailedCareerPath, FormInput, RoadmapStage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Map, BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import { getCareerPathDetails } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { RoadmapTimeline } from './RoadmapTimeline';
import { Skeleton } from '../ui/skeleton';

type ResultsDashboardProps = {
  results: CareerPath[];
  onReset: () => void;
  formInput: FormInput;
};

export function ResultsDashboard({ results, onReset, formInput }: ResultsDashboardProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [detailedPath, setDetailedPath] = useState<DetailedCareerPath | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Memoize the details to avoid re-fetching
  const detailsCache = useMemo(() => new Map<string, DetailedCareerPath>(), []);

  const fetchDetails = useCallback(async (path: CareerPath) => {
    if (detailsCache.has(path.jobTitle)) {
      setDetailedPath(detailsCache.get(path.jobTitle)!);
      return;
    }

    setIsDetailLoading(true);
    setDetailError(null);
    try {
      const details = await getCareerPathDetails(path, formInput);
      detailsCache.set(path.jobTitle, details);
      setDetailedPath(details);
    } catch (err) {
      setDetailError("Failed to load details for this career path. Please try again.");
      console.error(err);
    } finally {
      setIsDetailLoading(false);
    }
  }, [detailsCache, formInput]);
  
  useEffect(() => {
    if (results.length > 0 && !selectedPath) {
      const topResult = results.sort((a,b) => b.confidenceScore - a.confidenceScore)[0];
      setSelectedPath(topResult);
      fetchDetails(topResult);
    }
  }, [results, selectedPath, fetchDetails]);

  const handleSelectPath = (path: CareerPath) => {
    setSelectedPath(path);
    fetchDetails(path);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const DetailSkeleton = () => (
    <div className="space-y-8">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 no-print">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold tracking-tight">Your Personalized Career Plan</h2>
          <p className="text-muted-foreground mt-2">Based on your unique profile, here are our top AI-powered recommendations. Select a path to see your detailed roadmap.</p>
        </div>
        <div className="flex gap-2 self-start md:self-center flex-shrink-0">
          <Button variant="outline" onClick={onReset}>
            <ArrowLeft />
            Start Over
          </Button>
          <Button onClick={handlePrint} disabled={!selectedPath}>
            <Printer />
            Print Plan
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left-side List */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-3 no-print">
          <h3 className="text-lg font-semibold px-2">Recommended Paths</h3>
          {results.map((path, index) => (
            <button
              key={index}
              onClick={() => handleSelectPath(path)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedPath?.jobTitle === path.jobTitle ? 'bg-primary/10 border-primary' : 'hover:bg-accent'}`}
            >
              <div className="font-semibold">{path.jobTitle}</div>
              <div className="text-sm text-muted-foreground">{path.industry}</div>
            </button>
          ))}
        </aside>

        {/* Right-side Details */}
        <main className="md:col-span-8 lg:col-span-9 printable-area">
          {selectedPath && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedPath.jobTitle}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{selectedPath.industry}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="font-semibold mb-2">Suitability Score</h4>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedPath.confidenceScore * 100} className="w-full" />
                    <span className="font-bold text-lg text-primary">{Math.round(selectedPath.confidenceScore * 100)}%</span>
                  </div>
                </div>

                {isDetailLoading && <DetailSkeleton />}
                
                {detailError && <p className="text-destructive">{detailError}</p>}

                {detailedPath && !isDetailLoading && (
                  <div className="space-y-8 animate-in fade-in-50">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Your Skill Alignment</h4>
                      <p className="text-muted-foreground leading-relaxed">{detailedPath.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-primary" />Your Career Roadmap</h4>
                      <RoadmapTimeline roadmap={detailedPath.roadmap} />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" />Actionable Next Steps</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {detailedPath.nextSteps.map((step, index) => <li key={index}>{step}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Learning Resources</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {detailedPath.learningResources.map((resource, index) => <li key={index}>{resource}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          )}

          {!selectedPath && !isDetailLoading && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <p>Select a career path to see the details.</p>
            </div>
          )}
        </main>
      </div>

       {/* Printable-only version */}
      <div className="hidden print:block">
         <div className="mb-8 border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">CarrierGuide</h1>
            </div>
            <h2 className="text-xl font-semibold">Your Personalized Career Plan</h2>
            <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        {detailedPath ? (
           <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{detailedPath.jobTitle}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{detailedPath.industry}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Your Skill Alignment</h4>
                      <p className="text-muted-foreground leading-relaxed">{detailedPath.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-primary" />Your Career Roadmap</h4>
                      <RoadmapTimeline roadmap={detailedPath.roadmap} />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" />Actionable Next Steps</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {detailedPath.nextSteps.map((step, index) => <li key={index}>{step}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Learning Resources</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {detailedPath.learningResources.map((resource, index) => <li key={index}>{resource}</li>)}
                      </ul>
                    </div>
              </CardContent>
            </Card>
        ) : (
          <p>No career path selected for printing.</p>
        )}
      </div>
    </div>
  );
}
