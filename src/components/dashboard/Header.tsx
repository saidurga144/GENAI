
"use-client";

import { Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-primary px-4 md:px-6 text-primary-foreground no-print">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-lg font-bold">CarrierGuide</h1>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className="transition-colors hover:text-primary-foreground/80"
        >
          Home
        </Link>
        <Link
          href="/roadmaps"
          className="transition-colors hover:text-primary-foreground/80"
        >
          Roadmaps
        </Link>
         <Link
          href="/resources"
          className="transition-colors hover:text-primary-foreground/80"
        >
          Resources
        </Link>
      </nav>

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto">
         <Button variant="outline" onClick={signOut} className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
