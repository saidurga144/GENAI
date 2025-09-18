
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
                {/* Registration Info Panel */}
                <div className="flex-1 p-10 text-center bg-white flex flex-col justify-center items-center animate-slide-in-left">
                    <Image 
                        src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?t=st=1718182998~exp=1718186598~hmac=8f3d64117b3a1b32f26702e5b15b3c3b53fca87d46c82306d1c68e7f1a53239a&w=740"
                        alt="Welcome Animation"
                        width={400}
                        height={300}
                        className="mb-6 rounded-lg"
                    />
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">New User?</h1>
                    <p className="mb-6 text-gray-600">Sign up and discover a great amount of new opportunities!</p>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                        <Link href="/signup">
                            Sign Up
                        </Link>
                    </Button>
                </div>

                {/* Login Form Panel */}
                <div className="flex-1 p-10 bg-[#e0ecff] flex flex-col justify-center items-center animate-slide-in-right">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
