import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const roadmap = [
    {
        title: "Stage 1: Foundational Knowledge (Months 0-6)",
        description: "Build a strong base in computer science and programming fundamentals.",
        tasks: [
            "Learn a core programming language like Python or JavaScript.",
            "Understand data structures (Arrays, Linked Lists, Trees) and algorithms (Sorting, Searching).",
            "Get comfortable with Git and GitHub for version control.",
            "Complete introductory courses on platforms like Coursera or freeCodeCamp."
        ]
    },
    {
        title: "Stage 2: Core Skills & Frontend (Months 6-12)",
        description: "Focus on the skills needed to build modern web applications.",
        tasks: [
            "Master HTML, CSS, and JavaScript.",
            "Learn a frontend framework like React, Vue, or Angular.",
            "Understand how to make API calls to fetch data.",
            "Build 2-3 personal projects to create a portfolio (e.g., a to-do app, a weather app)."
        ]
    },
    {
        title: "Stage 3: Backend & Databases (Months 12-18)",
        description: "Dive into server-side logic and learn how to manage data.",
        tasks: [
            "Learn a backend framework like Node.js/Express, Django, or Ruby on Rails.",
            "Understand RESTful APIs and how to design them.",
            "Learn SQL and work with a relational database like PostgreSQL.",
            "Explore NoSQL databases like MongoDB."
        ]
    },
    {
        title: "Stage 4: Specialization & Job Prep (Months 18-24)",
        description: "Specialize in an area of interest and prepare for the job market.",
        tasks: [
            "Explore areas like cloud computing (AWS, Azure), mobile development, or DevOps.",
            "Contribute to an open-source project to gain real-world experience.",
            "Practice coding challenges on platforms like LeetCode or HackerRank.",
            "Refine your resume, build your network on LinkedIn, and start applying for junior roles."
        ]
    }
];

export default function SoftwareEngineerPage() {
    const heroImage = PlaceHolderImages[1];
    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
            <div className="flex justify-start mb-8">
                 <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
             <div className="relative flex justify-center items-center animate-fade-in mb-8">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl z-10"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            </div>
            <PageHeader
                title="Roadmap: Software Engineer"
                description="Your step-by-step guide to becoming a successful Software Engineer."
            />
            <div className="space-y-8">
                {roadmap.map((stage) => (
                    <Card key={stage.title} className="print-break-inside-avoid">
                        <CardHeader>
                            <CardTitle>{stage.title}</CardTitle>                            <CardDescription>{stage.description}</CardDescription>
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
