
import { PageHeader } from "@/components/futurepath/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, LifeBuoy, Mail } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const adminEmail = "careerguidecustomercare@gmail.com";
    const mailtoLink = `mailto:${adminEmail}?subject=Customer Support Inquiry`;

    return (
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
            <PageHeader
                title="Settings"
                description="Manage your account settings and get help."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                        <History className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle>Your History</CardTitle>
                            <CardDescription>Review your past generated career paths and recommendations.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">This feature is coming soon! You will be able to see a log of your previous activity here.</p>
                    </CardContent>
                    <CardFooter>
                         <Button disabled>View History</Button>
                    </CardFooter>
                </Card>
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
