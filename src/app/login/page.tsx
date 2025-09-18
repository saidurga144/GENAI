
"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    useEffect(() => {
      document.body.classList.add("auth-body-alt");
      return () => {
          document.body.classList.remove("auth-body-alt");
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
        <div className="flex flex-col min-h-screen">
             <header className="absolute top-0 left-0 right-0 p-4 z-20 bg-transparent">
                 <div className="container mx-auto px-4 flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white tracking-widest uppercase">CareerGuide</h2>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                       <Link href="/" className="text-white transition-colors hover:text-white/80">Home</Link>
                       <Link href="#" className="text-white transition-colors hover:text-white/80">About</Link>
                       <Link href="#" className="text-white transition-colors hover:text-white/80">Team</Link>
                       <Button asChild variant="outline" className="text-white border-white bg-transparent rounded-full px-6 py-2 hover:bg-white hover:text-primary">
                           <Link href="/login">Log In</Link>
                       </Button>
                   </nav>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto">
                        {/* Login Form Panel */}
                        <div className="flex-1 p-10 bg-white flex flex-col justify-center items-center animate-slide-in-right">
                             <div className="text-left w-full max-w-sm">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h2>
                                <p className="text-muted-foreground mb-6">Enter your e-mail address and your password</p>
                            </div>
                            <LoginForm />
                             <div className="mt-6 text-center w-full max-w-sm">
                                <p className="text-muted-foreground text-sm">© Copyright by CareerGuide</p>
                            </div>
                        </div>

                         {/* Image Panel */}
                        <div className="flex-1 p-10 text-center bg-transparent md:flex flex-col justify-center items-center hidden animate-slide-in-left">
                            <Image 
                                src="https://picsum.photos/seed/business-woman/600/400"
                                alt="Woman working on laptop"
                                width={500}
                                height={400}
                                className="mb-6 rounded-lg object-cover"
                                data-ai-hint="woman laptop business"
                            />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
