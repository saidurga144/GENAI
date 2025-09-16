import type { RoadmapStage } from "@/lib/types";
import { Check, Rocket, Trophy } from "lucide-react";

type RoadmapTimelineProps = {
    roadmap: RoadmapStage[];
};

const getIconForStage = (index: number, total: number) => {
    if (index === 0) return <Rocket className="w-5 h-5"/>;
    if (index === total - 1) return <Trophy className="w-5 h-5" />;
    return <Check className="w-5 h-5"/>;
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
    if (!roadmap || roadmap.length === 0) {
        return (
            <div className="text-center py-10 px-4 border rounded-lg bg-secondary/50">
                <p className="text-muted-foreground">No roadmap could be generated for this career path.</p>
            </div>
        );
    }

    return (
        <div className="relative pl-8 max-w-3xl mx-auto">
             <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2"></div>
            {roadmap.map((stage, index) => (
                <div key={index} className="relative pb-10 last:pb-0">
                    <div className="absolute left-4 -translate-x-1/2 -top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-8 ring-background">
                       {getIconForStage(index, roadmap.length)}
                    </div>
                    <div className="pl-8">
                        <div className="font-bold text-lg">{stage.title}</div>
                        <div className="text-sm text-muted-foreground mb-4">{stage.duration}</div>
                        <p className="text-foreground/80 mb-4">{stage.description}</p>
                        <ul className="list-none space-y-2">
                            {stage.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-3">
                                    <div className="w-4 h-4 mt-1 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                                         <Check className="w-3 h-3 text-primary"/>
                                    </div>
                                    <span className="text-sm">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
