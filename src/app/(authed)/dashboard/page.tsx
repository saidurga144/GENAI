
"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { BarChartCard } from "@/components/dashboard/BarChartCard";
import { DoughnutChartCard } from "@/components/dashboard/DoughnutChartCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUp, BarChart, Calendar, ShoppingBag, Users, Share, Download } from "lucide-react";


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BarChart className="w-8 h-8" />
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Share /> Share</Button>
          <Button variant="outline"><Download /> Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                This Week
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
              title="New Orders"
              value="150"
              icon={ShoppingBag}
              color="bg-blue-500"
          />
          <StatCard 
              title="Bounce Rate"
              value="53%"
              icon={BarChart}
               color="bg-green-500"
          />
          <StatCard 
              title="User Registrations"
              value="44"
              icon={Users}
              color="bg-yellow-500"
          />
          <StatCard 
              title="Unique Visitor"
              value="65"
              icon={ArrowUp}
              color="bg-red-500"
          />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DoughnutChartCard />
        <BarChartCard />
      </div>
    </div>
  );
}
