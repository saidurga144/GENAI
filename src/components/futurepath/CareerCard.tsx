import type { DetailedCareerPath } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, HeartPulse, Code, Landmark, Atom, Palette, Mic, Leaf, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from "react";

const getIconForIndustry = (industry: string): ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> => {
  const lowerIndustry = industry.toLowerCase();
  if (lowerIndustry.includes('tech') || lowerIndustry.includes('software') || lowerIndustry.includes('develop')) return Code;
  if (lowerIndustry.includes('health')) return HeartPulse;
  if (lowerIndustry.includes('business') || lowerIndustry.includes('finance') || lowerIndustry.includes('manage')) return Landmark;
  if (lowerIndustry.includes('science') || lowerIndustry.includes('research') || lowerIndustry.includes('engineer')) return Atom;
  if (lowerIndustry.includes('creative') || lowerIndustry.includes('art') || lowerIndustry.includes('design')) return Palette;
  if (lowerIndustry.includes('media') || lowerIndustry.includes('journalism')) return Mic;
  if (lowerIndustry.includes('environment') || lowerIndustry.includes('sustainab')) return Leaf;
  return Briefcase;
};


type CareerCardProps = {
  careerPath: DetailedCareerPath;
};

export function CareerCard({ careerPath }: CareerCardProps) {
  const Icon = getIconForIndustry(careerPath.industry);
  const confidencePercent = Math.round(careerPath.confidenceScore * 100);

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 print-break-inside-avoid">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl">{careerPath.jobTitle}</CardTitle>
            <div className="p-2 rounded-md bg-accent/20 text-accent flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <CardDescription><Badge variant="secondary">{careerPath.industry}</Badge></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">Suitability Score</h4>
          <div className="flex items-center gap-2">
            <Progress value={confidencePercent} aria-label={`${confidencePercent}% suitability`} />
            <span className="font-bold text-sm text-foreground">{confidencePercent}%</span>
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-muted-foreground">Your Skill Alignment</h4>
          <p className="text-sm text-card-foreground/80">{careerPath.summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
