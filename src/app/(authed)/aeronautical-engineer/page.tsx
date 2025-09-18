
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
        description: "Complete 12th with MPC. Aerospace covers space + aircraft, while Aeronautical focuses only on aircraft within Earth’s atmosphere.",
        tasks: [
            "Entrance Exams: JEE Mains/Advanced, State CETs, AME CET (for Aircraft Maintenance)."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Choose B.Tech Aeronautical Engineering (4 years).",
        tasks: [
            "Core Subjects: Aircraft Structures, Aerodynamics, Flight Mechanics, Propulsion, Avionics.",
            "Skills: AutoCAD, CATIA, MATLAB, CFD (Computational Fluid Dynamics)."
        ]
    },
    {
        title: "Step 3 – Higher Studies & Specialization",
        description: "Go for M.Tech Aeronautical / Avionics / Flight Engineering.",
        tasks: [
            "Specialize in: Aircraft Design, Navigation Systems, UAVs, Jet Engines."
        ]
    },
    {
        title: "Step 4 – Practical Training",
        description: "Internships in Airbus, Boeing, HAL, NAL, DRDO.",
        tasks: [
            "DGCA-approved certifications (if aiming for Aircraft Maintenance roles)."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Roles: Aeronautical Engineer, Aircraft Designer, Avionics Engineer, Flight Test Engineer. Industries: Airlines (Indigo, Air India), Defence (IAF, DRDO), Aircraft Manufacturing (Airbus, Boeing).",
        tasks: [
            "Future Scope: Eco-friendly aircrafts, Drones, Hypersonic jets."
        ]
    }
];


export default function AeronauticalEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Aeronautical Engineer";

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
                title="Roadmap: Aeronautical Engineer"
                description="Your step-by-step guide to a career in Aeronautical Engineering."
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
