"use client";

import type { DetailedCareerPath } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { CareerCard } from "./CareerCard";
import { Target } from 'lucide-react';
import { RoadmapTimeline } from "./RoadmapTimeline";
import { Separator } from "../ui/separator";

type ResultsDashboardProps = {
  results: DetailedCareerPath[];
  onReset: () => void;
};

export function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 no-print">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold tracking-tight">Your Personalized Career Plan</h2>
          <p className="text-muted-foreground mt-2">Based on your unique profile, here are our top AI-powered recommendations and actionable roadmaps to guide your next steps.</p>
        </div>
        <div className="flex gap-2 self-start md:self-center flex-shrink-0">
          <Button variant="outline" onClick={onReset}>
            <ArrowLeft />
            Start Over
          </Button>
          <Button onClick={handlePrint}>
            <Printer />
            Print Plan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 printable-area">
          {results.map((path, index) => (
            <CareerCard key={index} careerPath={path} />
          ))}
      </div>

      <Separator className="my-12 no-print" />

      <div className="mt-12 printable-area">
          <h2 className="text-3xl font-bold mb-8 text-center no-print">Career Roadmaps</h2>
          {results.map((path, index) => (
              <div key={index} className="mb-16 print-break-inside-avoid">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold">{path.jobTitle}</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">A visual timeline to guide you toward a career as a {path.jobTitle}.</p>
                  </div>
                  <RoadmapTimeline roadmap={path.roadmap} />
              </div>
          ))}
      </div>
      
      {/* Printable-only version */}
      <div className="hidden print:block printable-area">
        <div className="mb-8 border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold">FuturePath Navigator</h1>
            </div>
            <h2 className="text-xl font-semibold">Your Personalized Career Plan</h2>
            <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        <h2 className="text-3xl font-bold mb-8">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((path, index) => (
            <CareerCard key={index} careerPath={path} />
          ))}
        </div>
        <div className="mt-16 pt-12" style={{pageBreakBefore: 'always'}}>
            <h2 className="text-3xl font-bold mb-12">Career Roadmaps</h2>
            {results.map((path, index) => (
                <div key={index} className="mb-12 print-break-inside-avoid">
                    <h3 className="text-2xl font-bold mb-4">{path.jobTitle}</h3>
                    <RoadmapTimeline roadmap={path.roadmap} />
                </div>
            ))}
        </div>
      </div>

    </div>
  );
}
