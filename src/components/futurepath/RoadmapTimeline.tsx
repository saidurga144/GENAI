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
        <div className="relative pl-6">
             <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2"></div>
            {roadmap.map((stage, index) => (
                <div key={index} className="relative pb-8 last:pb-0">
                    <div className="absolute left-3 -translate-x-1/2 -top-0.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background">
                       {getIconForStage(index, roadmap.length)}
                    </div>
                    <div className="pl-6">
                        <div className="font-semibold text-base">{stage.title}</div>
                        <div className="text-xs text-muted-foreground mb-3">{stage.duration}</div>
                        <p className="text-foreground/80 mb-3 text-sm">{stage.description}</p>
                        <ul className="list-none space-y-1.5">
                            {stage.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-2">
                                    <div className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                                         <Check className="w-2.5 h-2.5 text-primary"/>
                                    </div>
                                    <span className="text-xs">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
