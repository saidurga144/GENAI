
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
        title: "Step 1: Choose a Paramedical Course",
        description: "Options: B.Sc. Nursing, B.Sc. Radiology, BPT (Physiotherapy), BMLT (Lab Tech), D.Pharm/B.Pharm. Pick specialization based on interest.",
        tasks: [
            "Pick specialization based on interest."
        ]
    },
    {
        title: "Step 2: Learn Core Medical Subjects",
        description: "Anatomy, Physiology, Pathology, Biochemistry, Patient Care. Develop practical lab & equipment handling skills.",
        tasks: [
            "Develop practical lab & equipment handling skills."
        ]
    },
    {
        title: "Step 3: Certifications",
        description: "First Aid, CPR, Medical Lab Techniques. Advanced: Specialization in Radiology, Dialysis, Emergency Care.",
        tasks: [
            "Advanced: Specialization in Radiology, Dialysis, Emergency Care."
        ]
    },
    {
        title: "Step 4: Practical Exposure",
        description: "Compulsory hospital internships & clinical postings. Work in labs, clinics, diagnostic centers. Research/field training experience.",
        tasks: [
            "Research/field training experience."
        ]
    },
    {
        title: "Step 5: Career Growth",
        description: "Jobs: Lab Technician, Physiotherapist, Nurse, Radiology Assistant. Higher: Hospital Administrator, Senior Consultant, Research Specialist. Can pursue M.Sc. / MPT / M.Pharm for advanced roles.",
        tasks: [
            "Can pursue M.Sc. / MPT / M.Pharm for advanced roles."
        ]
    }
];


export default function ParamedicalSpecialistPage() {
    const { user } = useAuth();
    const roadmapTitle = "Paramedical Specialist";

    useEffect(() => {
        if (user) {
            logUserActivity(user.uid, `Visited the ${roadmapTitle} roadmap`);
        }
    }, [user?.uid]);

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
                title="Roadmap: Paramedical Specialist"
                description="Your guide to a career in paramedical sciences, from choosing a course to advanced clinical roles."
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
