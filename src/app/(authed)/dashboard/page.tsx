
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Shield, CircuitBoard, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Welcome to CarrierGuide</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Start by exploring our popular career roadmaps, or create your own personalized plan with our AI-powered generator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" style={{ perspective: '1000px' }}>
        <Card className="transition-transform duration-500 ease-in-out hover:-rotate-y-6 hover:rotate-x-6 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Software Engineer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">The architects of the digital world. Learn to build applications and systems.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/software-engineer">View Roadmap</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="transition-transform duration-500 ease-in-out hover:-rotate-y-6 hover:rotate-x-6 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Cybersecurity Specialist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Protect digital assets from threats. A field with high demand and impact.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/cybersecurity-specialist">View Roadmap</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="transition-transform duration-500 ease-in-out hover:-rotate-y-6 hover:rotate-x-6 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-primary" />
              EEE Engineer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Design and develop electrical equipment, from microchips to power grids.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/eee-engineer">View Roadmap</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

       <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Ready for a Personal Touch?</h2>
            <p className="text-muted-foreground mb-6">Use our AI generator to create a roadmap tailored specifically to your skills and interests.</p>
            <Button asChild size="lg">
                <Link href="/dashboard/generator">
                    Create Your Own Path <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
    </main>
  );
}
