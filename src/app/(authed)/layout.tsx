"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Image src="/loader.gif" alt="Loading..." width={100} height={100} unoptimized />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        {children}
      <footer className="text-center p-6 text-muted-foreground text-sm no-print border-t">
        <p>CarrierGuide &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
