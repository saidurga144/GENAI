
'use client';

import { useEffect } from 'react';
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { logUserActivity } from '@/app/actions';

const roadmap = [
    {
        title: "Step 1 – Foundation (Intermediate Completion)",
        description: "Complete 12th with BiPC (Biology, Physics, Chemistry) or MPC with Biology as optional. Strong base in Biology, Chemistry & Mathematics is essential.",
        tasks: [
            "Entrance Exams: NEET (for biotech-medical route), or Engineering/State-level exams (for B.Tech Biotechnology)."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree (3–4 years)",
        description: "Choose B.Sc Biotechnology / B.Tech Biotechnology.",
        tasks: [
            "Core Subjects: Cell Biology, Genetics, Microbiology, Molecular Biology, Bioprocess Engineering.",
            "Key Skills: Lab techniques (PCR, CRISPR, Tissue culture), Data analysis, Bioinformatics."
        ]
    },
    {
        title: "Step 3 – Postgraduate Specialization (2 years)",
        description: "Go for M.Sc Biotechnology / M.Tech Biotechnology / Biomedical Engineering.",
        tasks: [
            "Choose Specialization:",
            "Genetic Engineering",
            "Industrial Biotech",
            "Medical Biotechnology",
            "Agricultural Biotechnology"
        ]
    },
    {
        title: "Step 4 – Research & Professional Training",
        description: "Pursue PhD / Research Fellowships for advanced roles. Internships in R&D labs, pharmaceutical companies, biotech startups.",
        tasks: [
            "Certifications in Bioinformatics, Clinical Research, Drug Design."
        ]
    },
    {
        title: "Step 5 – Career & Growth",
        description: "Job Roles: Biotech Scientist, Clinical Researcher, Genetic Engineer, Bioinformatics Specialist. Industries: Pharma (Pfizer, Biocon), Agriculture (Monsanto, Bayer), Healthcare, Environmental.",
        tasks: [
            "Future Scope: Gene Therapy, Artificial Organs, Stem Cell Research, Personalized Medicine."
        ]
    }
];


export default function BiotechnologySpecialistPage() {
    const { user } = useAuth();
    const roadmapTitle = "Biotechnology Specialist";

    useEffect(() => {
        if (user) {
            logUserActivity(user.uid, `Visited the ${roadmapTitle} roadmap`);
        }
    }, [user]);

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
                title="Roadmap: Biotechnology Specialist"
                description="Your step-by-step guide to a career in Biotechnology."
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
