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
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
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
            </main>
        </div>
    );
}
