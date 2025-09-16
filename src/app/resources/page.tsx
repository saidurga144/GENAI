import { Header } from "@/components/futurepath/Header";
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const channels = [
    { name: "Learn Engineering", url: "https://www.youtube.com/channel/UCsm2OHyG9Mzf7UtfjUf6QTw", description: "Complex engineering concepts made simple through animations." },
    { name: "Gate Smashers", url: "https://www.youtube.com/channel/UCJihyK0A38SZ6SdJirEdIOw", description: "Computer science and GATE exam preparation resources." },
    { name: "Neso Academy", url: "https://www.youtube.com/channel/UCQYMhOMi_Cdj1CEAU-fv80A", description: "Comprehensive lectures on engineering and computer science subjects." },
    { name: "Edu9 Career Guidance", url: "https://www.youtube.com/channel/UCLx0Y5AJpHhoh-PjH7EAp1Q", description: "Career guidance and counseling for students." },
    { name: "Mark Rober", url: "https://www.youtube.com/c/MarkRober/videos", description: "Fun science experiments and engineering projects." },
    { name: "SmarterEveryDay", url: "https://www.youtube.com/c/smartereveryday/videos", description: "Exploring the world of science and engineering through curiosity." },
    { name: "MinutePhysics", url: "https://www.youtube.com/user/minutephysics/videos", description: "Quick and easy-to-understand physics explanations." },
    { name: "Veritasium", url: "https://www.youtube.com/veritasium", description: "An element of truth - videos about science, education, and more." },
    { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", description: "Tutorials on chemistry, math, and physics." },
    { name: "EEVblog", url: "https://www.youtube.com/@EEVblog", description: "An electronics engineering video blog for experts and beginners." },
];

export default function ResourcesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header showResourcesLink={false} />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
                <div className="flex justify-start mb-8">
                     <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft />
                            Back to Home
                        </Link>
                    </Button>
                </div>
                <PageHeader
                    title="Helpful Resources"
                    description="A curated list of excellent YouTube channels for learning and career exploration."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {channels.map((channel) => (
                        <Card key={channel.name} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{channel.name}</CardTitle>
                                <CardDescription>{channel.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button asChild className="w-full">
                                    <Link href={channel.url} target="_blank">
                                        Visit Channel
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
             <footer className="text-center p-6 text-muted-foreground text-sm border-t">
                <p>FuturePath Navigator &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
