
"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);
    
    useEffect(() => {
      document.body.classList.add("auth-body");
      return () => {
          document.body.classList.remove("auth-body");
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
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
                {/* Login Info Panel */}
                <div className="flex-1 p-10 text-center bg-[#e0ecff] flex flex-col justify-center items-center animate-slide-in-left">
                     <Image 
                        src="https://img.freepik.com/free-vector/man-sitting-desk-unlocking-computer-with-fingerprint-personal-data-security-cyber-security-online-education-online-learning-concept_1150-69275.jpg"
                        alt="Welcome Animation"
                        width={300}
                        height={300}
                        className="mb-6"
                    />
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h1>
                    <p className="mb-6 text-gray-600">Already have an account? Login to access your dashboard.</p>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                </div>

                {/* Signup Form Panel */}
                <div className="flex-1 p-10 bg-white flex flex-col justify-center items-center animate-slide-in-right">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}
