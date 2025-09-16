"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormInput } from "@/lib/types";
import { Rocket } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  academicBackground: z.string().min(20, { message: "Please describe your background in at least 20 characters." }).max(500, { message: "Please keep your background under 500 characters." }),
  skills: z.string().min(10, { message: "Please list some skills (at least 10 characters)." }).max(500, { message: "Please keep your skills under 500 characters." }),
  interests: z.string().min(10, { message: "Please describe your interests in at least 10 characters." }).max(500, { message: "Please keep your interests under 500 characters." }),
});

type CareerFormProps = {
  onSubmit: (data: FormInput) => void;
};

export function CareerForm({ onSubmit }: CareerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      academicBackground: "",
      skills: "",
      interests: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Discover Your Future Path</CardTitle>
          <CardDescription>Tell us a bit about yourself, and our AI will generate personalized career recommendations for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll use this to potentially send your results in the future.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="academicBackground"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Background</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Bachelor's in Computer Science, focusing on AI and machine learning." {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Python, React, data analysis, project management." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Hobbies</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Building mobile apps, competitive gaming, reading sci-fi novels." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                <Rocket className="mr-2 h-5 w-5" />
                Generate My Career Path
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
