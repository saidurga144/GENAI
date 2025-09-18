
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const roadmap = [
    {
        title: "Step 1 – Foundation (Intermediate + Entrance)",
        description: "Stream: MPC (Maths essential). Focus on Statistics, Probability, Linear Algebra (foundation of ML), and Programming basics (Python preferred).",
        tasks: [
            "Entrance Exams: JEE Mains/Advanced, private university exams, State CETs."
        ]
    },
    {
        title: "Step 2 – Undergraduate Degree",
        description: "Choose B.Tech CSE (Machine Learning specialization) / Data Science / IT.",
        tasks: [
            "Core Subjects: Data Structures & Algorithms, Machine Learning Algorithms (Supervised & Unsupervised), Deep Learning (ANN, CNN, RNN), Big Data Analytics, Cloud Computing (AWS, GCP, Azure).",
            "Key Skills: Programming (Python, R, Java, SQL), ML Tools (Scikit-learn, TensorFlow, PyTorch), Visualization (Matplotlib, Seaborn, Tableau), Cloud ML Services (AWS Sagemaker, Google AI Platform)."
        ]
    },
    {
        title: "Step 3 – Higher Studies / Certifications",
        description: "M.Tech/MS in Machine Learning, Data Science, Computational Mathematics.",
        tasks: [
            "Certifications: Andrew Ng’s ML (Coursera), Deep Learning Specialization (Coursera), IBM Machine Learning Certification, Kaggle Competitions (hands-on learning)."
        ]
    },
    {
        title: "Step 4 – Hands-on Projects & Internships",
        description: "Projects: Fraud Detection, Recommendation Systems (Netflix, Amazon style), Stock Prediction, Speech Recognition. Internships: AI/ML Labs in Amazon, Google, IBM, Infosys, Accenture.",
        tasks: [
            "Participate in hackathons & Kaggle competitions."
        ]
    },
    {
        title: "Step 5 – Career Path",
        description: "Job Roles: Machine Learning Engineer, Data Scientist, Computer Vision Engineer, ML Ops Engineer. Work Sectors: E-commerce (Amazon, Flipkart), Finance (Goldman Sachs), Healthcare, Autonomous Vehicles, Social Media (Meta, Twitter).",
        tasks: [
            "Future Scope: ML in Autonomous Cars, ML in Cybersecurity (fraud detection), ML in Personalized Marketing & Finance, Quantum Machine Learning."
        ]
    }
];

export default function MlEngineerPage() {
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
                title="Roadmap: Machine Learning (ML) Engineer"
                description="Your 5-step guide to becoming a Machine Learning Engineer."
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
