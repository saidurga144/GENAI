
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { LogOut, Mail, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, signOut, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Image src="/loader.gif" alt="Loading..." width={100} height={100} unoptimized />
            </div>
        );
    }
    
    if (!user) {
        return null; // Or a redirect, but the layout should handle it.
    }

  return (
    <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl transition-transform duration-500 ease-in-out hover:-rotate-y-2 hover:rotate-x-2 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                 <User className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold">Welcome!</CardTitle>
          <CardDescription>
            You are successfully logged in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Your Account Details</h3>
            <ul className="space-y-3 text-sm">
                {user.email && (
                    <li className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{user.email}</span>
                    </li>
                )}
                {user.phoneNumber && (
                     <li className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{user.phoneNumber}</span>
                    </li>
                )}
                <li className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground break-all">UID: {user.uid}</span>
                </li>
            </ul>
          </div>
           <Button asChild className="w-full">
              <Link href="/dashboard/generator">
                  Explore Career Paths
              </Link>
            </Button>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={signOut} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
