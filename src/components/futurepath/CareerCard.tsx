import type { DetailedCareerPath } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, HeartPulse, Code, Landmark, Atom, Palette, Mic, Leaf, LucideProps, GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
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
    <Card className="flex flex-col h-full hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 print-break-inside-avoid group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl font-semibold">{careerPath.jobTitle}</CardTitle>
            <div className="p-3 rounded-lg bg-secondary flex-shrink-0 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <CardDescription><Badge variant="outline">{careerPath.industry}</Badge></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-muted-foreground">Suitability Score</h4>
            <span className="font-bold text-primary text-lg">{confidencePercent}%</span>
          </div>
          <Progress value={confidencePercent} aria-label={`${confidencePercent}% suitability`} />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2"><GraduationCap className="w-4 h-4"/>Your Skill Alignment</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{careerPath.summary}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Accordion type="single" collapsible className="w-full px-6 pb-6">
          <AccordionItem value="next-steps">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:no-underline">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Actionable Next Steps</div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80 pt-2">
                {careerPath.nextSteps.map((step, index) => <li key={index}>{step}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="learning-resources" className="border-b-0">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:no-underline">
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Learning Resources</div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80 pt-2">
                {careerPath.learningResources.map((resource, index) => <li key={index}>{resource}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
