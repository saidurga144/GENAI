
"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
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
        <div className="flex items-center justify-center min-h-screen bg-secondary/50 p-4">
            <div className="container w-full max-w-4xl flex-grow flex rounded-xl shadow-2xl overflow-hidden">
                 <div className="hidden md:block relative flex-1">
                    <Image
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2574&auto=format&fit=crop"
                        alt="Welcome to CarrierGuide"
                        fill
                        className="object-cover"
                        quality={100}
                    />
                </div>
                <div className="w-full md:flex-1 bg-background p-8 sm:p-12 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight">Login</h1>
                            <p className="text-muted-foreground mt-2">Sign in to continue to your dashboard.</p>
                        </div>
                        <LoginForm />
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
