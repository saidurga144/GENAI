
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Mail, KeyRound, ArrowRight, UserCircle, Check, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";
import { checkUsernameAvailability, setUsername, getUsername } from "@/app/(authed)/profile/actions";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

function ProfileDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const debouncedUsername = useDebounce(username, 500);

  const usernameRegex = /^[a-zA-Z]{4}[0-9]{3}$/;

  const checkAvailability = useCallback(async (name: string) => {
    if (!usernameRegex.test(name)) {
      setIsValid(false);
      setIsAvailable(null);
      return;
    }
    setIsValid(true);
    setIsChecking(true);
    try {
      const available = await checkUsernameAvailability(name);
      setIsAvailable(available);
    } catch (error) {
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  }, [usernameRegex]);

  useEffect(() => {
    if (debouncedUsername) {
      checkAvailability(debouncedUsername);
    } else {
      setIsValid(null);
      setIsAvailable(null);
    }
  }, [debouncedUsername, checkAvailability]);

  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        const current = await getUsername(user.uid);
        if (current) {
          setCurrentUsername(current);
          setUsername(current);
        }
      };
      fetchUsername();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    if (!isValid || !isAvailable || !user) return;
    setIsLoading(true);
    try {
      await setUsername(user.uid, username);
      setCurrentUsername(username);
      toast({
        title: "Success",
        description: "Username updated successfully!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFeedbackIcon = () => {
    if (isChecking) return <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />;
    if (debouncedUsername && isValid === false) return <X className="w-5 h-5 text-destructive" />;
    if (isAvailable === true) return <Check className="w-5 h-5 text-green-500" />;
    if (isAvailable === false) return <X className="w-5 h-5 text-destructive" />;
    return null;
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader className="text-center items-center">
         <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?pid=Api&P=0&h=220" alt="User Avatar" />
            <AvatarFallback>
                <User className="w-10 h-10 text-muted-foreground" />
            </AvatarFallback>
        </Avatar>
        <CardTitle>{currentUsername || "Your Profile"}</CardTitle>
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
          <UserCircle className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm w-full">
            <p className="font-medium">Username</p>
            <div className="flex items-center gap-2 mt-1 relative">
                <Input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="4 letters, 3 numbers" 
                  className="text-muted-foreground pr-10"
                />
                 <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFeedbackIcon()}
                </div>
            </div>
            <div className="h-4 mt-1">
                {debouncedUsername && isValid === false && <p className="text-xs text-destructive">Username must be 4 letters followed by 3 numbers.</p>}
                {isAvailable === false && <p className="text-xs text-destructive">Username already taken.</p>}
                {isAvailable === true && <p className="text-xs text-green-500">Username is available!</p>}
            </div>
             <Button onClick={handleSave} disabled={isLoading || !isValid || !isAvailable || username === currentUsername} size="sm" className="w-full mt-2">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Username
            </Button>
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
          <Link href="/roadmaps">
            Roadmap
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

    