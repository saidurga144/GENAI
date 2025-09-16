"use client";

import type { DetailedCareerPath } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { CareerCard } from "./CareerCard";
import { Target } from 'lucide-react';

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
          <p className="text-muted-foreground mt-2">Based on your unique profile, here are our top AI-powered recommendations to guide your next steps.</p>
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
      
      <div className="printable-area">
        <div className="hidden print:block mb-8 border-b pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">FuturePath Navigator</h1>
          </div>
          <h2 className="text-xl font-semibold">Your Personalized Career Plan</h2>
          <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDate-String()}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((path, index) => (
            <CareerCard key={index} careerPath={path} />
          ))}
        </div>
      </div>
    </div>
  );
}
