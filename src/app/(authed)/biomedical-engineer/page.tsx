
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
        description: "Complete BiPC (Biology, Physics, Chemistry) or MPC with Biology as optional.",
        tasks: [
            "Entrance Exams: JEE, NEET (for bio-heavy institutes), state CETs, private university exams."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Pursue B.Tech/B.E Biomedical Engineering (4 years).",
        tasks: [
            "Core Subjects: Human Anatomy & Physiology, Medical Imaging Systems, Biomechanics, Biomaterials, Bioinstrumentation.",
            "Key Skills: Lab techniques, MATLAB, Python, Embedded Systems, AI in Healthcare, 3D Bioprinting."
        ]
    },
    {
        title: "Step 3 – Higher Studies / Specialization",
        description: "Go for M.Tech/MS in Biomedical Engineering / Biotechnology / Medical Robotics.",
        tasks: [
            "Focus areas: Tissue Engineering, Neural Engineering, Medical Devices, Bioinformatics."
        ]
    },
    {
        title: "Step 4 – Research & Training",
        description: "Internships in Hospitals, MedTech Companies (Siemens Healthineers, Philips, GE Healthcare, Medtronic).",
        tasks: [
            "Certifications in Medical Imaging, Artificial Organs, Biomedical Instrumentation."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Job Roles: Biomedical Engineer, Clinical Engineer, Medical Device Designer, Research Scientist.",
        tasks: [
            "Industries: Hospitals, Pharma, Medical Equipment Companies, R&D Labs.",
            "Future Scope: AI in Healthcare, Prosthetics, Regenerative Medicine, Smart Medical Devices."
        ]
    }
];


export default function BiomedicalEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Biomedical Engineer";

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
                title="Roadmap: Biomedical Engineer"
                description="Your step-by-step guide to a career at the intersection of medicine and engineering."
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
