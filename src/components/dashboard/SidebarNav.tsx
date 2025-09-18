
"use client";

import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Map,
  Book,
  Bot,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();
  const [mainNavOpen, setMainNavOpen] = useState(true);
  const [userNavOpen, setUserNavOpen] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <SidebarHeader>
        {/* Placeholder for a logo or title if needed */}
      </SidebarHeader>
      <SidebarContent>
        <Collapsible open={mainNavOpen} onOpenChange={setMainNavOpen}>
          <CollapsibleTrigger className="w-full">
            <SidebarGroup>
                <div className="flex items-center justify-between w-full">
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", mainNavOpen && "rotate-180")} />
                </div>
            </SidebarGroup>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip="Dashboard"
                  onClick={handleLinkClick}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard/generator'} tooltip="Career Generator" onClick={handleLinkClick}>
                  <Link href="/dashboard/generator">
                    <FileText />
                    Career Generator
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                 <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/chatbot'} tooltip="AI Chatbot" onClick={handleLinkClick}>
                  <Link href="/chatbot">
                    <Bot />
                    AI Chatbot
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/roadmaps')} tooltip="Roadmap" onClick={handleLinkClick}>
                  <Link href="/roadmaps">
                    <Map />
                    Roadmap
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/resources'} tooltip="Resources" onClick={handleLinkClick}>
                  <Link href="/resources">
                    <Book />
                    Resources
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>


        <SidebarSeparator />

         <Collapsible open={userNavOpen} onOpenChange={setUserNavOpen}>
          <CollapsibleTrigger className="w-full">
             <SidebarGroup>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                         <Avatar className="h-8 w-8 border-2 border-primary-foreground/50">
                            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?pid=Api&P=0&h=220" alt="User Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium group-data-[collapsible=icon]:hidden">
                            <p>{user?.displayName || user?.email || "User"}</p>
                        </div>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden", userNavOpen && "rotate-180")} />
                </div>
            </SidebarGroup>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenu className="mt-2">
                <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard" && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('view') === 'profile'}
                    tooltip="Profile"
                    onClick={handleLinkClick}
                >
                  <Link href="/dashboard?view=profile">
                    <User />
                    Profile
                  </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Settings">
                    <Settings />
                    Settings
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  signOut();
                  handleLinkClick();
                }} tooltip="Logout">
                    <LogOut />
                    Logout
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
           </CollapsibleContent>
        </Collapsible>
      </SidebarContent>
    </>
  );
}
