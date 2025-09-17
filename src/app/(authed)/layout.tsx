
"use client";

import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/Header';
import { SidebarNav } from '@/components/dashboard/SidebarNav';

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
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="bg-muted/40">
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-grow p-4 md:p-8">
            {children}
          </main>
          <footer className="text-center p-6 text-muted-foreground text-sm no-print border-t">
            <p>CarrierGuide &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
