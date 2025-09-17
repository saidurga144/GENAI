import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { RoadmapGraphic } from "@/components/futurepath/RoadmapGraphic";

const roadmap = [
    {
        title: "Stage 1: Foundational IT Skills (Months 0-6)",
        description: "Build a strong understanding of IT fundamentals.",
        tasks: [
            "Master computer hardware, software, and operating systems (Windows, Linux).",
            "Learn networking concepts: TCP/IP, DNS, DHCP, routing, and switching.",
            "Get a foundational certification like CompTIA A+ or Network+.",
            "Practice using command-line interfaces (CLI) in both Windows and Linux."
        ]
    },
    {
        title: "Stage 2: Security Fundamentals (Months 6-12)",
        description: "Dive into the core principles of cybersecurity.",
        tasks: [
            "Study for and pass the CompTIA Security+ certification.",
            "Learn about common threats, vulnerabilities, and risk management.",
            "Understand cryptography, access control, and identity management.",
            "Set up a home lab using virtual machines (e.g., VirtualBox) to practice."
        ]
    },
    {
        title: "Stage 3: Hands-On Skills & Tools (Months 12-18)",
        description: "Gain practical experience with industry-standard tools.",
        tasks: [
            "Learn to use tools like Wireshark for packet analysis and Nmap for network scanning.",
            "Explore vulnerability scanning with tools like Nessus or OpenVAS.",
            "Understand Security Information and Event Management (SIEM) systems like Splunk.",
            "Practice ethical hacking techniques on platforms like HackTheBox or TryHackMe."
        ]
    },
    {
        title: "Stage 4: Specialization & Career Launch (Months 18-24)",
        description: "Choose a specialization and prepare for your first role.",
        tasks: [
            "Specialize in areas like Penetration Testing, Security Operations (SOC), or Cloud Security.",
            "Consider advanced certifications like CySA+ or Pentest+.",
            "Build a portfolio of projects, write-ups from CTF challenges, or a blog.",
            "Network with professionals in the field and apply for entry-level analyst roles."
        ]
    }
];

export default function CybersecuritySpecialistPage() {
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
            <div className="relative flex justify-center items-center animate-fade-in mb-8">
                <RoadmapGraphic />
            </div>
            <PageHeader
                title="Roadmap: Cybersecurity Specialist"
                description="Your step-by-step guide to a career in Cybersecurity."
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
