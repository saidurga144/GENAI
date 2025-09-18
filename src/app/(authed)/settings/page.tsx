
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, LifeBuoy, Mail, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { getUserActivity } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

type Activity = {
    id: string;
    activity: string;
    timestamp: string;
};

function HistoryCard() {
    const { user } = useAuth();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadActivity() {
            if (!user) {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            const userActivities = await getUserActivity(user.uid);
            setActivities(userActivities);
            setIsLoading(false);
        }
        loadActivity();
    }, [user]);

    const handleClearHistory = () => {
        // This is a placeholder for the future clear history functionality
        alert("Clear history functionality will be implemented in the future.");
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                    <History className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle>Your History</CardTitle>
                        <CardDescription>Review your recent activity.</CardDescription>
                    </div>
                </div>
                <Button variant="destructive" size="sm" onClick={handleClearHistory} disabled>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                </Button>
            </CardHeader>
            <CardContent className="flex-grow">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-4/5" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                ) : activities.length > 0 ? (
                    <ul className="space-y-3">
                        {activities.map(item => (
                            <li key={item.id} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                                <span className="text-sm">{item.activity}</span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground text-center py-8">No recent activity found.</p>
                )}
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Showing last 20 activities.</p>
            </CardFooter>
        </Card>
    );
}

export default function SettingsPage() {
    const adminEmail = "careerguidecustomercare@gmail.com";
    const mailtoLink = `mailto:${adminEmail}?subject=Customer Support Inquiry`;

    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
            <PageHeader
                title="Settings"
                description="Manage your account settings and get help."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <HistoryCard />

                <Card className="flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                        <LifeBuoy className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle>Customer Support</CardTitle>
                            <CardDescription>Get help or provide feedback by contacting our support team directly.</CardDescription>
                        </div>
                    </CardHeader>
                     <CardContent className="flex-grow">
                        <p className="text-muted-foreground">Have a question or need assistance? Reach out to us via email.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link href={mailtoLink}>
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Support
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
