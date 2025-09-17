
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const roadmap = [
    {
        title: "Stage 1: University & Core Concepts (Years 1-2)",
        description: "Build a solid foundation in mathematics, physics, and fundamental engineering principles.",
        tasks: [
            "Excel in calculus, differential equations, and linear algebra.",
            "Master circuit theory (Ohm's law, Kirchhoff's laws) and digital logic.",
            "Learn about electromagnetism and semiconductor physics.",
            "Get hands-on with basic lab equipment like oscilloscopes and multimeters."
        ]
    },
    {
        title: "Stage 2: Specialization & Core EEE Topics (Years 2-3)",
        description: "Dive deeper into specialized areas of electrical and electronics engineering.",
        tasks: [
            "Study analog and digital electronics, microprocessors, and control systems.",
            "Learn about power systems, signal processing, and telecommunications.",
            "Gain proficiency in simulation software like MATLAB, Simulink, or SPICE.",
            "Participate in university clubs or competitions (e.g., Robotics, IEEE)."
        ]
    },
    {
        title: "Stage 3: Practical Skills & Internships (Year 3-4)",
        description: "Apply your knowledge in practical settings and gain industry experience.",
        tasks: [
            "Learn a programming language relevant to EEE, such as C/C++ or Python for automation.",
            "Master PCB design software like Altium Designer or Eagle.",
            "Secure an internship to gain real-world engineering experience.",
            "Work on a significant final year project that showcases your skills."
        ]
    },
    {
        title: "Stage 4: Career Launch & Lifelong Learning (Post-Graduation)",
        description: "Enter the workforce and continue to develop your expertise.",
        tasks: [
            "Pass the Fundamentals of Engineering (FE) exam as a step towards a Professional Engineer (PE) license.",
            "Tailor your resume to highlight key projects, internships, and technical skills.",
            "Join professional organizations like IEEE to network and stay updated.",
            "Pursue a Master's degree for highly specialized roles or research positions."
        ]
    }
];

export default function EeeEngineerPage() {
    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
            <div className="flex justify-start mb-8">
                 <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft />
                        Back to Home
                    </Link>
                </Button>
            </div>
            <div className="relative flex justify-center items-center mb-8">
                <div className="bg-secondary/50 rounded-lg p-4 border">
                     <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuATJDJXKBj9uyX0WIaZrUZ2C-r7GGcLRiQ&s"
                        alt="EEE Engineer"
                        width={600}
                        height={200}
                        className="max-w-md w-full h-auto object-contain"
                        quality={100}
                    />
                </div>
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
