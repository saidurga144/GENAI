
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
        description: "Complete MPC (Maths, Physics, Chemistry).",
        tasks: [
            "Entrance Exams: JEE Main/Advanced, State CETs, private university exams."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Enroll in B.Tech/B.E Civil Engineering (4 years).",
        tasks: [
            "Core Subjects: Structural Engineering, Surveying, Geotechnical Engineering, Transportation Engineering, Construction Management.",
            "Key Skills: AutoCAD, STAAD Pro, Revit, Project Management (Primavera/MS Project)."
        ]
    },
    {
        title: "Step 3 – Higher Studies / Specialization",
        description: "M.Tech/MS Civil Engineering (2 years).",
        tasks: [
            "Specializations: Structural, Environmental, Water Resources, Transportation, Construction Technology."
        ]
    },
    {
        title: "Step 4 – Practical Training",
        description: "Internships in L&T, GMR, DLF, Government PWD, NHAI.",
        tasks: [
            "Certifications: BIM (Building Information Modeling), Project Planning, Green Building Design."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Job Roles: Structural Engineer, Site Engineer, Project Manager, Environmental Engineer. Work Sectors: Construction, Infrastructure, Urban Development, Government Projects.",
        tasks: [
            "Future Scope: Smart Cities, Sustainable Construction, Earthquake-resistant structures."
        ]
    }
];


export default function CivilEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Civil Engineer";

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
                title="Roadmap: Civil Engineer"
                description="Your step-by-step guide to a career in Civil Engineering."
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
