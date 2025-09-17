// A D V A N C E D  C O D E  A S S I S T A N T  P R O V I D E D  C O D E
// This component was created by the Advanced Code Assistant.
// It is a custom SVG component that visually represents a 5-step roadmap,
// inspired by the user's request for a more thematic graphic.

import { cn } from "@/lib/utils";

export const RoadmapGraphic = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 800 300"
      className={cn("w-full h-auto max-w-2xl mx-auto", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.2)" />
        </linearGradient>
      </defs>
      
      {/* Background World Map */}
      <path
        d="M400 150 a120 120 0 1 0 0.0001 0"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M300 150 a120 120 0 1 0 0.0001 0"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
        opacity="0.3"
      />
       <path
        d="M500 150 a120 120 0 1 0 0.0001 0"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line x1="0" y1="150" x2="800" y2="150" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
      <line x1="400" y1="0" x2="400" y2="300" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />


      {/* Main timeline path */}
      <path
        d="M 50 150 C 150 150, 150 100, 250 100 S 350 150, 450 150 S 550 200, 650 200 S 750 150, 750 150"
        stroke="url(#line-grad)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Step 1 */}
      <g>
        <circle cx="50" cy="150" r="20" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
        <path d="M45 150 L50 155 L60 145" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      </g>

      {/* Step 2 */}
       <g>
        <circle cx="250" cy="100" r="20" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
        <rect x="242" y="95" width="4" height="10" fill="hsl(var(--primary))" />
        <rect x="248" y="92" width="4" height="13" fill="hsl(var(--primary))" />
        <rect x="254" y="98" width="4" height="7" fill="hsl(var(--primary))" />
      </g>

      {/* Step 3 */}
      <g>
        <circle cx="450" cy="150" r="20" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
        <path d="M445 155 L455 145 M445 145 L455 155" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      </g>

      {/* Step 4 */}
      <g>
        <circle cx="650" cy="200" r="20" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
         <path d="M645 195 l5 5 l5 -10" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M645 205 l10 -5 l-5 -5" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Step 5 */}
       <g>
        <circle cx="750" cy="150" r="24" fill="hsl(var(--primary))" opacity="0.8" />
        <circle cx="750" cy="150" r="20" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
        <path d="M747 145 V155 M753 145 V155 M745 150 H755" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
      </g>

    </svg>
  );
};
