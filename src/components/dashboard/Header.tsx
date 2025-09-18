
"use-client";

import { Menu, LogOut, Bot, Bell, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const notifications = [
    {
        title: "Response from Customer Care",
        description: "We've received your feedback and are looking into the issue. We'll get back to you shortly.",
        time: "5 minutes ago",
    }
];

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-primary px-4 md:px-6 text-primary-foreground no-print">
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-lg font-bold">CareerGuide</h1>
      </div>

      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
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
        <Link
          href="/chatbot"
          className="transition-colors hover:text-primary-foreground/80 flex items-center gap-2"
        >
          <Bot className="w-4 h-4" />
          AI ChatBot
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    <Bell className="h-5 w-5" />
                     <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                 <div className="p-4">
                    <h4 className="font-medium text-sm mb-4">Notifications</h4>
                    {notifications.length > 0 ? (
                        <ul className="space-y-4">
                            {notifications.map((notification, index) => (
                                <li key={index} className="flex items-start gap-3">
                                     <Avatar className="w-8 h-8 border mt-1">
                                        <AvatarFallback className="bg-secondary">
                                            <Info className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center">No new notifications</p>
                    )}
                </div>
            </PopoverContent>
        </Popover>

         <Button variant="outline" onClick={signOut} className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
