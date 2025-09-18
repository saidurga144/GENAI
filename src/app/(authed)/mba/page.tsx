
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const roadmap = [
    {
        title: "Step 1: Entrance Exams",
        description: "Prepare for CAT, XAT, GMAT, MAT. Aim for IIMs, XLRI, ISB, or top B-schools.",
        tasks: [
            "Aim for IIMs, XLRI, ISB, or top B-schools."
        ]
    },
    {
        title: "Step 2: Specialization Choice",
        description: "Finance, Marketing, HR, IT, Operations, International Business. Select based on your BBA background/interest.",
        tasks: [
            "Select based on your BBA background/interest."
        ]
    },
    {
        title: "Step 3: Industry Exposure",
        description: "2 internships in MNCs, consulting firms, banks. Work on live projects, case studies, business plans.",
        tasks: [
            "Work on live projects, case studies, business plans."
        ]
    },
    {
        title: "Step 4: Certifications",
        description: "Finance: CFA. Project Management: PMP, Six Sigma. Marketing: Digital Marketing, Brand Management.",
        tasks: [
            "Finance: CFA.",
            "Project Management: PMP, Six Sigma.",
            "Marketing: Digital Marketing, Brand Management."
        ]
    },
    {
        title: "Step 5: Career Growth",
        description: "Jobs: Manager, Consultant, Product Manager, Investment Banker. Senior: VP, Director, CEO, Entrepreneur.",
        tasks: [
            "Senior: VP, Director, CEO, Entrepreneur."
        ]
    }
];


export default function MBAPage() {
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
                title="Roadmap: MBA (Master of Business Administration)"
                description="Your roadmap for pursuing an MBA and advancing into executive leadership roles."
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
