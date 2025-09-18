
"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPlus } from "lucide-react";

const compassLogoSvg = `
    <svg width="200" height="200" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F97316" />
          <stop offset="100%" stop-color="#EC4899" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" stroke="url(#logo-gradient)" stroke-width="2" stroke-opacity="0.5" />
      <circle cx="20" cy="20" r="12" stroke="url(#logo-gradient)" stroke-width="1.5" stroke-opacity="0.7" />
      <path d="M20 16L22.5 20L20 24L17.5 20L20 16Z" stroke="url(#logo-gradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 10V12" stroke="url(#logo-gradient)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M20 28V30" stroke="url(#logo-gradient)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M10 20H12" stroke="url(#logo-gradient)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M28 20H30" stroke="url(#logo-gradient)" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
`;
const compassLogoDataUri = `data:image/svg+xml;base64,${typeof window !== 'undefined' ? window.btoa(compassLogoSvg) : ''}`;

const AuthHeader = () => (
    <header className="absolute top-0 left-0 right-0 p-6 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                CareerGuide
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">Download</Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link>
                <Link href="/login" className="text-white/80 hover:text-white transition-colors">Login</Link>
            </nav>
        </div>
    </header>
);

export default function SignupPage() {
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
                                <UserPlus className="w-8 h-8 text-primary-foreground" />
                            </div>
                        </div>
                        <SignupForm />
                    </div>
                     {/* Right Panel: Welcome Message */}
                    <div className="hidden md:flex flex-col items-center justify-center p-12 bg-black/20 relative overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-no-repeat bg-center"
                            style={{
                                backgroundImage: `url("${compassLogoDataUri}")`,
                                backgroundSize: '60%',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-5xl font-extrabold text-white tracking-tight">Create Account.</h1>
                             <p className="mt-4 text-white/80">
                                Join us and start building your future. A world of opportunity awaits.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
