
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const channels = [
    { name: "Learn Engineering", url: "https://www.youtube.com/channel/UCsm2OHyG9Mzf7UtfjUf6QTw", description: "This channel focuses on engineering topics, especially explaining how things around us work, using CAD/CAE visualization tools. It often breaks down complex mechanical, electrical, structural engineering phenomena into intuitive animations." },
    { name: "Gate Smashers", url: "https://www.youtube.com/channel/UCJihyK0A38SZ6SdJirEdIOw", description: "Gate Smashers is an Indian EdTech YouTube channel/community that provides free lectures for B.Tech CSE, GATE CSE, and other entrance exams. They aim to help students preparing for competitive exams by giving strong foundational lectures and problem-solving." },
    { name: "Neso Academy", url: "https://www.youtube.com/channel/UCQYMhOMi_Cdj1CEAU-fv80A", description: "Neso Academy offers high-quality free educational videos primarily in Computer Science and Engineering subjects. It covers theory and practice with lectures on core topics like algorithms, data structures, automata theory, etc." },
    { name: "Edu9 Career Guidance", url: "https://www.youtube.com/channel/UCLx0Y5AJpHhoh-PjH7EAp1Q", description: "Edu9 is a channel that gives information and guidance across fields like engineering, medical, pharma, agriculture, etc. They cover topics like admissions, exam info, career paths, comparisons, tips for choosing courses." },
    { name: "Mark Rober", url: "https://www.youtube.com/c/MarkRober/videos", description: "Mark Rober is a science & tech content creator (former NASA engineer) who makes entertaining, high-production videos showing engineering pranks, experiments, inventions, and creative builds. His videos are very well produced, fun and accessible." },
    { name: "SmarterEveryDay", url: "https://www.youtube.com/c/smartereveryday/videos", description: "Hosted by Destin Sandlin, this channel is about exploring the world through science. He dives deep into how things work, often with experiments, slow-motion, detailed exploration and a sense of wonder." },
    { name: "MinutePhysics", url: "https://www.youtube.com/user/minutephysics/videos", description: "Quick and easy-to-understand physics explanations." },
    { name: "Veritasium", url: "https://www.youtube.com/veritasium", description: "Veritasium (Derek Muller) presents science/engineering with a mix of experiments, interviews, and explorations of common misconceptions. He tries to reveal surprising truths and explain things in a deep but engaging way." },
    { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", description: "Despite the name, this channel offers much more than organic chemistry alone. It provides tutorial videos across general chemistry, physics, algebra, trigonometry, precalculus, and calculus. Very detailed problem-solving, step by step." },
    { name: "EEVblog", url: "https://www.youtube.com/@EEVblog", description: "EEVblog stands for “Electronics Engineering Video Blog”. Run by Dave Jones from Australia, it is mostly unscripted, hands-on content about electronics engineering: test equipment reviews, repair, electronics design, hobby circuits, plus insightful commentaries." },
    { name: "Intellipaat", url: "https://youtube.com/@intellipaat", description: "Intellipaat is a global online professional training platform. On its YouTube channel, it provides video tutorials, full-courses, and certification prep in tech and business skills." },
    { name: "Tech With Tim", url: "https://youtube.com/@techwithtim", description: "Tech With Tim is run by Tim Ruscica, a self-taught developer. He creates educational programming content that is clear, step-by-step, focused on making complex topics accessible without much fluff." },
    { name: "Student Tribe", url: "https://youtube.com/@studenttribe", description: "Study tips and student success strategies." },
    { name: "Programming with Mosh", url: "https://youtube.com/@programmingwithmosh", description: "Coding fundamentals and software development." },
    { name: "Pratap Hari Chandan", url: "https://youtube.com/@pratapharichandan", description: "Data science and analytics learning." },
];

export default function ResourcesPage() {
    return (
        <>
            <div className="flex justify-start mb-8">
                    <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
            <PageHeader
                title="Helpful Resources"
                description="A curated list of excellent YouTube channels for learning and career exploration."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
                {channels.map((channel) => (
                    <Card key={channel.name} className="flex flex-col transition-transform duration-500 ease-in-out hover:-rotate-y-6 hover:rotate-x-6 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
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
        </>
    );
}
