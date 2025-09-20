
'use client';

import { useEffect } from 'react';
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/componentsui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { logUserActivity } from '@/app/actions';

const roadmap = [
    {
        title: "Step 1 – Foundation (Intermediate Completion)",
        description: "Complete MPC (Maths, Physics, Chemistry). Entrance Exams: JEE Main/Advanced, BITSAT, VITEEE, SRMJEEE, or state CETs.",
        tasks: [
            "Entrance Exams: JEE Main/Advanced, BITSAT, VITEEE, SRMJEEE, or state CETs."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Choose B.Tech/B.E Mechanical Engineering (4 years).",
        tasks: [
            "Core Subjects: Thermodynamics, Fluid Mechanics, Strength of Materials, Machine Design, Manufacturing Processes.",
            "Key Skills: CAD/CAM (AutoCAD, SolidWorks, CATIA), MATLAB, ANSYS, Programming (Python/C++)."
        ]
    },
    {
        title: "Step 3 – Higher Studies / Specialization",
        description: "M.Tech/MS in Mechanical Engineering (2 years).",
        tasks: [
            "Specializations: Robotics, Mechatronics, Thermal Engineering, Manufacturing, Automotive."
        ]
    },
    {
        title: "Step 4 – Practical Exposure",
        description: "Internships in Tata, Mahindra, BHEL, L&T, Ashok Leyland. Certifications in Robotics, CAD/CAE, 3D Printing, Six Sigma.",
        tasks: [
            "Certifications in Robotics, CAD/CAE, 3D Printing, Six Sigma."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Job Roles: Design Engineer, Thermal Engineer, Robotics Engineer, Quality Control Engineer. Industries: Automotive, Aerospace, Defence, Power Plants, Manufacturing.",
        tasks: [
            "Future Scope: Electric Vehicles, Renewable Energy, AI-driven Robotics."
        ]
    }
];


export default function MechanicalEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Mechanical Engineer";

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
                title="Roadmap: Mechanical Engineer"
                description="Your step-by-step guide to a career in Mechanical Engineering."
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
