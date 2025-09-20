
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
        description: "Build a strong base in Mathematics, Statistics, and Programming before entering graduation.",
        tasks: [
            "Complete 12th with MPC (Maths, Physics, Chemistry).",
            "Ensure strong performance in Mathematics (linear algebra, probability, calculus).",
            "Entrance Exams: JEE Main & JEE Advanced, BITSAT, VITEEE, SRMJEEE, State-level exams.",
            "Build early skills in basic Python, Excel, and introductory statistics."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree (3–4 years)",
        description: "Gain academic foundation and hands-on exposure through a relevant B.Tech or B.Sc degree.",
        tasks: [
            "Best Degrees: B.Tech CSE (Data Science/AI/ML), B.Sc Data Science / Statistics.",
            "Core Subjects: Data Structures & Algorithms, SQL/NoSQL Databases, Statistics, Machine Learning, Data Visualization.",
            "Technical Skills: Master Python/R, libraries like NumPy, Pandas, Scikit-learn, TensorFlow/PyTorch, and tools like Jupyter & GitHub."
        ]
    },
    {
        title: "Step 3 – Internships & Real-World Exposure",
        description: "Apply your knowledge in a practical setting and gain invaluable industry experience.",
        tasks: [
            "Target roles like Data Analyst, Machine Learning, or Business Analyst Intern.",
            "Learn data preprocessing, feature engineering, and model deployment (Flask, Docker).",
            "Build a strong portfolio with at least 5 significant Data Science projects on GitHub and a Kaggle profile."
        ]
    },
    {
        title: "Step 4 – Higher Studies & Specialization (Optional but Valuable)",
        description: "Deepen your expertise in advanced Data Science and AI for better career prospects.",
        tasks: [
            "Consider M.Tech in Data Science/AI, an M.S. abroad, or an MBA in Business Analytics.",
            "Earn certifications from Google, IBM, Microsoft, or AWS.",
            "Specialize in areas like NLP, Computer Vision, or Big Data Engineering."
        ]
    },
    {
        title: "Step 5 – Career Path & Growth",
        description: "Launch your career as a Data Science Engineer and grow into senior roles in top companies.",
        tasks: [
            "Entry Roles: Data Analyst, Junior Data Scientist, ML Engineer Intern.",
            "Mid to Senior Roles: Data Scientist, AI/ML Engineer, Lead Data Scientist, Chief Data Officer (CDO).",
            "Top Recruiters: Google, Microsoft, Amazon, Meta, as well as consulting firms and startups."
        ]
    }
];

export default function DataScienceEngineerPage() {
    const { user } = useAuth();
    const roadmapTitle = "Data Science Engineer";

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
                        Back
                    </Link>
                </Button>
            </div>
            <PageHeader
                title="Roadmap: Data Science Engineer"
                description="Your 5-step guide to becoming a Data Science Engineer."
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
