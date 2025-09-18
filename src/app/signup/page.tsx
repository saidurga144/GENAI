
"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);
    
    useEffect(() => {
      document.body.classList.add("auth-body-dark");
      return () => {
          document.body.classList.remove("auth-body-dark");
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
        <main className="flex-grow flex items-center justify-center min-h-screen">
            <div className="relative max-w-sm w-full animate-fade-in-up">
                 <Avatar className="w-24 h-24 absolute left-1/2 -translate-x-1/2 -top-12 border-4 border-gray-600 bg-gray-700/80">
                    <AvatarFallback>
                        <UserPlus className="w-10 h-10 text-gray-400" />
                    </AvatarFallback>
                </Avatar>
                <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-2xl p-8 pt-16">
                    <SignupForm />
                </div>
            </div>
        </main>
    );
}
