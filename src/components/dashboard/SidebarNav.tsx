
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
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Component,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Table,
  BarChart,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SidebarNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mainNavOpen, setMainNavOpen] = useState(true);
  const [userNavOpen, setUserNavOpen] = useState(false);

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
                  href="/dashboard"
                  isActive={pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/generator" isActive={pathname === '/dashboard/generator'} tooltip="Career Generator">
                  <FileText />
                  Career Generator
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="UI Elements">
                  <Component />
                  UI Elements
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/resources" isActive={pathname === '/resources'} tooltip="Resources">
                  <Table />
                  Resources
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Presentations">
                  <BarChart />
                  Presentations
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
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
                    href="/dashboard?view=profile"
                    isActive={pathname === "/dashboard" && new URLSearchParams(window.location.search).get('view') === 'profile'}
                    tooltip="Profile"
                >
                    <User />
                    Profile
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Settings">
                    <Settings />
                    Settings
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut} tooltip="Logout">
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
