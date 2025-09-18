
"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        <div className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
            <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
                {/* Login Info Panel */}
                <div className="flex-1 p-10 text-center bg-[#e0ecff] flex-col justify-center items-center hidden md:flex animate-slide-in-left">
                     <Image 
                        src="https://img.freepik.com/free-vector/access-control-system-abstract-concept-illustration-security-system-authorisation-biometric-identification-entering-permission-pass-verification-code_335657-3330.jpg?w=740&t=st=1718182903~exp=1718183503~hmac=591945115598642168903c746e01a8848b6d36e765582236594246835d0a6496"
                        alt="Sign Up Concept"
                        width={400}
                        height={300}
                        className="mb-6 rounded-lg object-cover"
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
