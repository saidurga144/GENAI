
'use client';

import { useEffect } from 'react';
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/hooks/use-auth';
import { logUserActivity } from '@/app/actions';

const roadmap = [
    {
        title: "Step 1: Foundation (Intermediate → UG Degree)",
        description: "Choose a B.Tech or B.E. in EEE and build a strong foundation in physics, mathematics, and electrical circuits.",
        tasks: [
            "Choose B.Tech / BE in Electrical & Electronics Engineering (EEE).",
            "Build basics in Physics, Mathematics, Electrical Circuits."
        ]
    },
    {
        title: "Step 2: Core EEE Knowledge",
        description: "Dive into core topics like power systems, electronics, and programming languages relevant to engineering.",
        tasks: [
            "Power Systems, Machines, Control Systems, Signal Processing.",
            "Electronics: Analog, Digital, Microprocessors, VLSI basics.",
            "Programming for engineers: MATLAB, C, Python for IoT/Robotics."
        ]
    },
    {
        title: "Step 3: Hands-On Skills & Certifications",
        description: "Gain practical skills in PLC/SCADA, embedded systems, and earn relevant certifications to enhance your profile.",
        tasks: [
            "Learn PLC/SCADA, Embedded Systems, IoT.",
            "Certifications:",
            "AutoCAD Electrical",
            "MATLAB Simulation",
            "Electrical Safety Standards",
            "Industry 4.0 tools: Renewable Energy, Smart Grids, Robotics."
        ]
    },
    {
        title: "Step 4: Internships & Industry Exposure",
        description: "Apply your knowledge through internships and hands-on projects in areas like solar energy and smart home automation.",
        tasks: [
            "Do internships in Power Plants, Electronics Companies, Core Manufacturing Firms.",
            "Projects like:",
            "Solar energy systems",
            "Smart home automation",
            "Motor control using IoT"
        ]
    },
    {
        title: "Step 5: Career Opportunities",
        description: "Explore diverse career roles in core electrical, electronics, and advanced fields, with options for further education.",
        tasks: [
            "Core roles: Electrical Design Engineer, Power Engineer, Control Systems Engineer.",
            "Electronics roles: Embedded Engineer, VLSI Engineer, Robotics Engineer.",
            "Advanced: M.Tech/MS in Power Systems, Renewable Energy, Automation → Research or Govt jobs."
        ]
    }
];

export default function EeeEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Electrical & Electronics Engineer";

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
                title="Roadmap: Electrical & Electronics Engineer"
                description="Your step-by-step guide to becoming a licensed and successful EEE Engineer."
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
