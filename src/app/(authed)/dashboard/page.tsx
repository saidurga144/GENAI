
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Mail, Phone, KeyRound, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function ProfileDashboard() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
          <User className="w-10 h-10 text-primary" />
        </div>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Here are your account details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-md">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">{user.email || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-md">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Phone Number</p>
            <p className="text-muted-foreground">{user.phoneNumber || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-md">
          <KeyRound className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">User ID</p>
            <p className="text-muted-foreground break-all">{user.uid}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button asChild className="w-full">
          <Link href="/dashboard/generator">
            Explore Career Paths
            <ArrowRight />
          </Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={signOut}>
          <LogOut />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="flex items-center justify-center h-full">
      {view === 'profile' ? (
        <ProfileDashboard />
      ) : (
        <div className="text-center animate-in fade-in-50 duration-500">
            <div className="relative flex justify-center items-center mb-8" style={{ perspective: '1000px' }}>
                <div className="bg-secondary/50 rounded-lg p-4 border transition-transform duration-500 ease-in-out hover:-rotate-y-12 hover:rotate-x-12 hover:scale-105 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
                    <Image
                        src="https://www.reliablesoft.net/wp-content/uploads/2019/08/digital-marketing-courses.png"
                        alt="Career Path"
                        width={600}
                        height={400}
                        className="max-w-md w-full h-auto object-contain"
                        quality={100}
                    />
                </div>
            </div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mt-2">Select an option from the sidebar to get started.</p>
           <Button asChild className="mt-6">
                <Link href="/dashboard/generator">
                    Explore Career Paths
                    <ArrowRight />
                </Link>
            </Button>
        </div>
      )}
    </div>
  );
}
