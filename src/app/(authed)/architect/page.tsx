
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
        title: "Step 1 – Foundation (Intermediate + Entrance Preparation)",
        description: "Complete 12th with MPC (Maths, Physics, Chemistry) with a minimum of 50% marks in PCM. Build early skills in drawing, design, math, and basic computer software.",
        tasks: [
            "Eligibility: Complete 12th with MPC (Maths, Physics, Chemistry) with a minimum 50% marks in PCM.",
            "Skills to Build Early: Drawing & Sketching, Basic Design sense, Mathematics & Geometry, Computer Basics (Photoshop, MS Office).",
            "Entrance Exams (India): NATA (for most B.Arch programs), JEE Main Paper 2 (for NITs, SPAs, IITs), State-level exams (KCET, AP EAMCET, etc.)."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree (B.Arch – 5 years)",
        description: "Enroll in a 5-year Bachelor of Architecture (B.Arch) program and master core subjects and key software skills.",
        tasks: [
            "Core Subjects: Architectural Design, Building Construction & Materials, History of Architecture, Environmental Studies, Structural Engineering basics, Urban Design.",
            "Key Skills to Develop: CAD Software (AutoCAD, SketchUp, Revit), Design Software (Photoshop, Illustrator, Lumion), Creative Thinking, Teamwork & Communication.",
            "Activities: Participate in design competitions, workshops, and build a strong portfolio of your projects."
        ]
    },
    {
        title: "Step 3 – Internship & Practical Training",
        description: "Gain mandatory hands-on experience by working under licensed architects, visiting construction sites, and honing your project management skills.",
        tasks: [
            "Internship: Work in an architectural firm to learn site work, design implementation, and client handling.",
            "Practical Exposure: Visit construction sites, create 3D models, and work on Building Information Modeling (BIM) projects.",
            "Soft Skills to Develop: Project management, client interaction, negotiation, and leadership."
        ]
    },
    {
        title: "Step 4 – Professional Licensing & Higher Studies",
        description: "Register with the Council of Architecture (CoA) to legally practice in India and consider specializing with a Master's degree (M.Arch).",
        tasks: [
            "License Requirement (India): Register with the Council of Architecture (CoA) after completing B.Arch.",
            "Higher Studies Options: Pursue M.Arch in specializations like Urban Planning, Landscape Architecture, Interior Design, or Sustainable Architecture.",
            "Certifications: LEED (Green Buildings), PMP (Project Management), BIM Software (Revit)."
        ]
    },
    {
        title: "Step 5 – Career Path & Growth",
        description: "Explore diverse roles from architect and urban planner to project manager, with opportunities in both private and government sectors.",
        tasks: [
            "Job Roles: Architect (Residential/Commercial), Urban Planner, Landscape Architect, Interior Designer, Project Manager, BIM Specialist.",
            "Work Sectors: Architecture Firms, Real Estate Companies, Government (PWD, Smart Cities), NGOs.",
            "Future Scope: Smart Cities, Green & Sustainable Architecture, AI in generative design, VR for architectural visualization."
        ]
    }
];


export default function ArchitectPage() {
    const { user } = useAuth();
    const roadmapTitle = "Architect";

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
                title="Roadmap: Architect"
                description="Your 5-step guide to becoming a licensed Architect."
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
