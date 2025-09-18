
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Shield, ArrowLeft, Dna, Cog, Building2, Plane, HeartPulse, Search, BrainCircuit, BarChartBig, Briefcase, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const roadmapsList = [
    {
        title: "Aeronautical Engineer",
        description: "A step-by-step path to a career in Aeronautical Engineering, from aerodynamics to aircraft design and beyond.",
        url: "/aeronautical-engineer",
        icon: <Plane className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.asHETTJ6fyo4sr_T1ffJXgHaE7?pid=Api&P=0&h=220",
    },
     {
        title: "Artificial Intelligence (AI) Specialist",
        description: "A 5-step roadmap to becoming an AI Specialist, from mathematical foundations to advanced research and development.",
        url: "/ai-specialist",
        icon: <BrainCircuit className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?pid=Api&P=0&h=220",
    },
    {
        title: "BBA Program",
        description: "Your guide to a successful career with a Bachelor of Business Administration, from core subjects to leadership roles.",
        url: "/bba",
        icon: <Briefcase className="w-8 h-8 text-primary" />,
        imageUrl: "https://picsum.photos/seed/bba/600/400",
    },
     {
        title: "Biomedical Engineer",
        description: "Explore the intersection of medicine and engineering, designing devices and systems to improve human health.",
        url: "/biomedical-engineer",
        icon: <HeartPulse className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.M7ct0Vlp9Me0eVPpSEAWcgHaHa?pid=Api&P=0&h=220",
    },
    {
        title: "Biotechnology Specialist",
        description: "A guide to a career in Biotechnology, from BiPC foundations to genetic engineering and bioinformatics.",
        url: "/biotechnology-specialist",
        icon: <Dna className="w-8 h-8 text-primary" />,
        imageUrl: "https://4-hontario.ca/wp-content/uploads/2020/09/Intro-to-Agricultural-Biotechnology_Main-Image-2048x1364.jpeg",
    },
    {
        title: "Civil Engineer",
        description: "Your guide to a career in Civil Engineering, from structural design to project management and sustainable construction.",
        url: "/civil-engineer",
        icon: <Building2 className="w-8 h-8 text-primary" />,
        imageUrl: "https://wonderfulengineering.com/wp-content/uploads/2014/01/civil-engineers-3.jpg",
    },
    {
        title: "Cybersecurity Specialist",
        description: "Follow this guide to a career in Cybersecurity, from foundational IT skills to hands-on security tools.",
        url: "/cybersecurity-specialist",
        icon: <Shield className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse1.mm.bing.net/th/id/OIP.Zf6YLhRpL7la9QnOp0EGOQHaFW?pid=Api&P=0&h=220",
    },
    {
        title: "Electrical & Electronics Engineer",
        description: "Your path to becoming a licensed EEE Engineer, covering core concepts, practical skills, and career launch.",
        url: "/eee-engineer",
        icon: <Cpu className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.BpnBBxHWbDcoF9QcL1aX7AHaEK?pid=Api&P=0&h=220",
    },
     {
        title: "Machine Learning (ML) Engineer",
        description: "A 5-step roadmap for ML Engineers, covering everything from statistics and programming to advanced model deployment.",
        url: "/ml-engineer",
        icon: <BarChartBig className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.AdHBr9rWfNDKsWwd446LZwHaEK?pid=Api&P=0&h=220",
    },
    {
        title: "MBA Program",
        description: "A roadmap for pursuing a Master of Business Administration, from entrance exams to executive leadership.",
        url: "/mba",
        icon: <GraduationCap className="w-8 h-8 text-primary" />,
        imageUrl: "https://picsum.photos/seed/mba/600/400",
    },
    {
        title: "Mechanical Engineer",
        description: "A comprehensive roadmap for aspiring Mechanical Engineers, covering core subjects, skills, and career opportunities.",
        url: "/mechanical-engineer",
        icon: <Cog className="w-8 h-8 text-primary" />,
        imageUrl: "https://wallpaperaccess.com/full/1564707.jpg",
    },
    {
        title: "Paramedical Specialist",
        description: "Your guide to a career in paramedical sciences, from choosing a course to advanced clinical roles.",
        url: "/paramedical-specialist",
        icon: <Stethoscope className="w-8 h-8 text-primary" />,
        imageUrl: "https://picsum.photos/seed/paramedical/600/400",
    },
    {
        title: "Software Engineer",
        description: "A step-by-step guide to becoming a successful Software Engineer, from fundamentals to specialization.",
        url: "/software-engineer",
        icon: <Code className="w-8 h-8 text-primary" />,
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.E19xMrIg0VBd_G9VSyHJmAHaE7?pid=Api&P=0&h=220",
    },
].sort((a, b) => a.title.localeCompare(b.title));

export default function RoadmapsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRoadmaps = roadmapsList.filter(roadmap =>
        roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
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
                    title="Carrier Roadmaps"
                    description="Explore our expert-curated roadmaps for popular career paths. These step-by-step guides provide a clear framework for your journey."
                />
                 <div className="mb-8 max-w-md mx-auto">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search for a roadmap..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
                    {filteredRoadmaps.map((roadmap) => (
                        <Card key={roadmap.title} className="flex flex-col transition-transform duration-500 ease-in-out hover:-rotate-y-6 hover:rotate-x-6 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
                           <CardHeader className="flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    {roadmap.icon}
                                </div>
                                <div>
                                    <CardTitle>{roadmap.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="aspect-[16/9] relative mb-4 rounded-md overflow-hidden">
                                     <Image
                                        src={roadmap.imageUrl}
                                        alt={roadmap.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardDescription>{roadmap.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={roadmap.url}>
                                        View Roadmap
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {filteredRoadmaps.length === 0 && (
                     <div className="text-center col-span-full py-16">
                        <p className="text-muted-foreground">No roadmaps found for &quot;{searchTerm}&quot;.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
