
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Rocket, LogIn } from 'lucide-react';


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full border">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground flex-grow">{description}</p>
  </div>
);


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Image src="/loader.gif" alt="Loading..." width={100} height={100} unoptimized />
      </div>
    );
  }

  return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="absolute top-0 left-0 right-0 p-4 z-20">
             <div className="container mx-auto px-4 flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-widest uppercase">CareerGuide</h2>
                <Button asChild variant="outline" className="text-primary text-base md:text-lg font-semibold border-2 border-primary bg-transparent rounded-lg px-4 py-2 md:px-6 md:py-3 hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <Link href="/login">
                        Log In
                        <LogIn className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                </Button>
            </div>
        </header>
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left animate-fade-in-up">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-foreground">
                    Navigate Your Career with Confidence
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                    CareerGuide uses AI to analyze your skills, interests, and background to recommend personalized career paths and create a tailored roadmap for your success.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started for Free <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="relative flex justify-center items-center animate-fade-in-up" style={{ perspective: '1000px', animationDelay: '0.2s' }}>
                     <div className="bg-secondary/50 rounded-lg p-4 border transition-transform duration-500 ease-in-out hover:-translate-y-12 hover:rotate-x-12 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
                      <Image
                        src="https://www.swarnprastha.com/wp-content/uploads/2020/06/2-Career-Guidance-12-4.jpg"
                        alt="A woman holding a laptop and thinking about career guidelines."
                        width={600}
                        height={400}
                        className="rounded-md max-w-lg w-full h-auto object-cover"
                        quality={100}
                        data-ai-hint="woman laptop guidelines"
                      />
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 md:py-28 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How It Works</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Three simple steps to unlock your future potential.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon={<Rocket size={24} />}
                    title="1. Tell Us About You"
                    description="Input your skills, academic background, and interests, or simply upload your resume to get started."
                  />
                  <FeatureCard
                    icon={<CheckCircle size={24} />}
                    title="2. Get AI Recommendations"
                    description="Our advanced AI analyzes your profile to generate a list of suitable career paths, complete with a suitability score."
                  />
                  <FeatureCard
                    icon={<ArrowRight size={24} />}
                    title="3. Receive Your Roadmap"
                    description="Get a step-by-step, actionable roadmap for each recommendation to guide you on your journey."
                  />
              </div>
            </div>
          </section>
        </main>
        <footer className="text-center p-6 text-muted-foreground text-sm border-t">
          <p>CareerGuide &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
  );
}
