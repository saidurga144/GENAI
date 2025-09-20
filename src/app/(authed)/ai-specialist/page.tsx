
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
        title: "Step 1 – Foundation (Intermediate + Entrance)",
        description: "Stream: MPC (Maths, Physics, Computer Science preferred). Build strong basics in Mathematics (Linear Algebra, Probability, Calculus, Statistics) and Programming (Python, C++ basics).",
        tasks: [
            "Entrance Exams: JEE Main + Advanced (IITs, NITs), BITSAT, VITEEE, SRMJEEE (private universities), State CETs (TS EAMCET, AP EAMCET, KCET, etc.)."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Choose B.Tech/B.E in AI & Data Science / CSE with AI specialization / CSE (4 years).",
        tasks: [
            "Core Subjects: Data Structures & Algorithms, Artificial Intelligence, Neural Networks & Deep Learning, Natural Language Processing (NLP), Reinforcement Learning.",
            "Key Skills: Programming (Python, R, C++), Libraries (TensorFlow, PyTorch, Keras, OpenCV), Data Handling (SQL, Pandas, NumPy), Soft Skills (Problem-solving, logical reasoning)."
        ]
    },
    {
        title: "Step 3 – Higher Studies / Certifications",
        description: "M.Tech/MS in AI, Robotics, Data Science, Cognitive Computing.",
        tasks: [
            "Certifications: Google AI/ML Specialization, Stanford AI Courses (Coursera), AWS AI/ML Specialty, Microsoft AI Engineer.",
            "Optional: GRE/TOEFL/IELTS (if planning for Masters abroad in AI)."
        ]
    },
    {
        title: "Step 4 – Practical Projects & Internships",
        description: "Build Projects: Chatbots, Face Recognition, Self-driving simulation, AI-based healthcare apps. Internships: Google, Microsoft, TCS, Infosys, Wipro, AI Startups.",
        tasks: [
            "Research Work: Publish papers in AI conferences/journals."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Job Roles: AI Specialist, AI Researcher, Robotics Engineer, NLP Scientist, AI Consultant. Work Areas: IT Companies, Robotics, Healthcare, Autonomous Vehicles, Defence, Finance.",
        tasks: [
            "Future Scope: AI in Robotics & Automation, AI in Healthcare (diagnosis, drug discovery), AGI (Artificial General Intelligence), AI in Climate & Sustainability."
        ]
    }
];

export default function AiSpecialistPage() {
    const { user } = useAuth();
    const roadmapTitle = "Artificial Intelligence (AI) Specialist";

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
                title="Roadmap: Artificial Intelligence (AI) Specialist"
                description="Your 5-step guide to a career in Artificial Intelligence."
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
