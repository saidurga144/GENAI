
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const roadmap = [
    {
        title: "Step 1: Join BBA Program",
        description: "Choose reputed colleges with placement support. Specializations: Finance, HR, Marketing, Analytics, International Business.",
        tasks: [
            "Specializations: Finance, HR, Marketing, Analytics, International Business."
        ]
    },
    {
        title: "Step 2: Master Core Subjects",
        description: "Economics, Accounting, Business Law, HR, Marketing, Operations. Build soft skills: communication, leadership, decision-making.",
        tasks: [
            "Build soft skills: communication, leadership, decision-making."
        ]
    },
    {
        title: "Step 3: Add Certifications",
        description: "Digital Marketing, Excel/Power BI, Business Analytics, Tally/Finance tools. Learn Data-driven decision making.",
        tasks: [
            "Learn Data-driven decision making."
        ]
    },
    {
        title: "Step 4: Practical Exposure",
        description: "Do internships in banks, startups, corporates. Join college clubs & case study competitions.",
        tasks: [
            "Join college clubs & case study competitions."
        ]
    },
    {
        title: "Step 5: Career Growth",
        description: "Jobs: Business Analyst, Marketing Executive, HR Assistant, Management Trainee. Higher path: Pursue MBA for management roles.",
        tasks: [
            "Higher path: Pursue MBA for management roles."
        ]
    }
];


export default function BBAPage() {
    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
            <div className="flex justify-start mb-8">
                 <Button asChild variant="outline">
                    <Link href="/roadmaps">
                        <ArrowLeft />
                        Back to Roadmaps
                    </Link>
                </Button>
            </div>
            <PageHeader
                title="Roadmap: BBA Program"
                description="Your step-by-step guide to a successful career with a Bachelor of Business Administration."
            />
            <div className="space-y-8">
                {roadmap.map((stage) => (
                    <Card key={stage.title} className="print-break-inside-avoid">
                        <CardHeader>
                            <CardTitle>{stage.title}</CardTitle>
                            <CardDescription>{stage.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {stage.tasks.map((task, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                                             <CheckCircle className="w-3.5 h-3.5 text-primary"/>
                                        </div>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
