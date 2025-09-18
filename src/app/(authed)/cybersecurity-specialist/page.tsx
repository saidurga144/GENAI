
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const roadmap = [
    {
        title: "Step 1: Build Strong Foundations (6–12 months)",
        description: "Learn computer fundamentals, networking, and Linux commands. Free resources: Cisco NetAcad, Cybrary, TryHackMe (beginner paths).",
        tasks: [
            "Learn Computer Fundamentals → OS (Windows, Linux), networking basics, hardware.",
            "Start with Networking → TCP/IP, DNS, Firewalls, VPNs, Subnetting.",
            "Study Linux commands (most cybersecurity tools run on Linux).",
            "📚 Free Resources: Cisco NetAcad, Cybrary, TryHackMe (beginner paths)."
        ]
    },
    {
        title: "Step 2: Formal Education / Degree (2–4 years)",
        description: "Choose a Bachelor’s degree in CSE, IT, Cybersecurity, or ECE. If a degree isn’t possible, continue with certifications and practical labs.",
        tasks: [
            "Choose a Bachelor’s degree in CSE, IT, Cybersecurity, or ECE (Computer Science is most common).",
            "During degree → focus on subjects like Computer Networks, Cryptography, Operating Systems, and Security Fundamentals.",
            "If degree isn’t possible, you can still continue with Certifications + Practical Labs."
        ]
    },
    {
        title: "Step 3: Earn Core Certifications (Parallel with Degree or Independently)",
        description: "Start with CompTIA Security+ and CCNA, then move to intermediate certs like CEH and OSCP. Consider cloud security certs as well.",
        tasks: [
            "Start small: CompTIA Security+ (Basics of security), CCNA (Networking knowledge).",
            "Intermediate: CEH (Hacking tools & methods), OSCP (Advanced penetration testing).",
            "Optional: Cloud Security certs (AWS, Azure, Google Cloud)."
        ]
    },
    {
        title: "Step 4: Hands-On Practice (Continuous)",
        description: "Create accounts on TryHackMe and HackTheBox. Build your own home lab to practice attacks and defense, and participate in CTFs.",
        tasks: [
            "Create accounts on TryHackMe, HackTheBox, OverTheWire for labs.",
            "Build your own Home Lab (VMware/VirtualBox) to practice attacks & defense.",
            "Participate in CTFs (Capture The Flag) competitions.",
            "Contribute to open-source security projects on GitHub."
        ]
    },
    {
        title: "Step 5: Specialize & Start Career (After 3–5 years)",
        description: "Pick a specialization like Ethical Hacking or SOC Analyst. Apply for internships and entry-level roles and keep upgrading with advanced certifications.",
        tasks: [
            "Pick a specialization: Ethical Hacking, SOC Analyst, Digital Forensics, Malware Analysis, or Cloud Security.",
            "Apply for Internships & Entry-level roles → SOC Analyst, Security Engineer, Junior Pen Tester.",
            "Keep upgrading with advanced certs like CISSP, CISM, OSCE, SANS GIAC as you grow."
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
                        Back to Dashboard
                    </Link>
                </Button>
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
