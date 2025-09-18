
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const roadmap = [
    {
        title: "Step 1: Foundation (Intermediate → UG Degree)",
        description: "Choose a suitable degree and learn fundamental programming languages with a focus on data structures and algorithms.",
        tasks: [
            "Choose B.Tech CSE / IT / B.Sc Computer Science / BCA.",
            "Learn C, C++, Java, Python → focus on Data Structures & Algorithms.",
            "Build problem-solving skills on LeetCode, HackerRank, Codeforces."
        ]
    },
    {
        title: "Step 2: Core Software Development Skills",
        description: "Master essential concepts like Object-Oriented Programming, databases, and the software development lifecycle.",
        tasks: [
            "Master Object-Oriented Programming (OOPs).",
            "Learn Databases (SQL, MongoDB).",
            "Understand Software Development Life Cycle (SDLC)."
        ]
    },
    {
        title: "Step 3: Specializations",
        description: "Specialize in frontend, backend, or full-stack development, and gain expertise in cloud and DevOps technologies.",
        tasks: [
            "Frontend Development: HTML, CSS, JavaScript, React, Angular.",
            "Backend Development: Node.js, Java Spring Boot, Django, .NET.",
            "Full-Stack Development: Combine both.",
            "Learn Cloud & DevOps (AWS, Docker, Git, CI/CD)."
        ]
    },
    {
        title: "Step 4: Internships & Real-World Projects",
        description: "Gain practical experience by building projects, securing internships, and contributing to open-source software.",
        tasks: [
            "Build projects:",
            "E-commerce site",
            "Chat application",
            "AI/ML project",
            "Internship in tech companies, startups.",
            "Contribute to open source (GitHub)."
        ]
    },
    {
        title: "Step 5: Career Growth",
        description: "Start with entry-level roles and progress towards advanced positions like Tech Lead or Software Architect.",
        tasks: [
            "Entry roles: Software Developer, Web Developer, QA Engineer.",
            "Mid-level: Full Stack Engineer, Cloud Engineer, Mobile App Developer.",
            "Advanced: Tech Lead, Software Architect, CTO."
        ]
    }
];

export default function SoftwareEngineerPage() {
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
