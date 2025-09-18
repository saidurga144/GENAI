
"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";

const AuthHeader = () => (
    <header className="absolute top-0 left-0 right-0 p-6 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 7L12 12L22 7" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M12 12V22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                CareerGuide
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">Download</Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link>
                <Link href="/signup" className="text-white/80 hover:text-white transition-colors">Register</Link>
            </nav>
        </div>
    </header>
);

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    useEffect(() => {
      document.body.classList.add("auth-body-gradient");
      return () => {
          document.body.classList.remove("auth-body-gradient");
      };
    }, []);
    
    if (loading || user) {
        return (
          <div className="flex h-screen items-center justify-center bg-background">
            <Image src="/loader.gif" alt="Loading..." width={100} height={100} unoptimized />
          </div>
        );
    }

    return (
        <>
            <AuthHeader />
            <main className="flex-grow flex items-center justify-center min-h-screen p-4">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden animate-fade-in-up">
                    {/* Left Panel: Form */}
                    <div className="p-8 sm:p-12 text-white">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-slate-800/70 border border-slate-700 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-primary-foreground" />
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                    {/* Right Panel: Welcome Message */}
                    <div className="hidden md:flex flex-col items-center justify-center p-12 bg-black/20 relative overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                            style={{backgroundImage: `url('https://img.freepik.com/free-vector/gradient-background-vector-illustration_460848-14502.jpg')`}}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-5xl font-extrabold text-white tracking-tight">Welcome Back.</h1>
                            <p className="mt-4 text-white/80">
                                Sign in to access your personalized career dashboard and continue your journey.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
