"use client";

import { useState } from "react";
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
import { Rocket, Upload } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  academicBackground: z.string().max(500, { message: "Please keep your background under 500 characters." }).optional(),
  skills: z.string().max(500, { message: "Please keep your skills under 500 characters." }).optional(),
  interests: z.string().min(10, { message: "Please describe your interests in at least 10 characters." }).max(500, { message: "Please keep your interests under 500 characters." }),
}).refine(data => !!data.skills || !!data.academicBackground, {
  message: "Either Skills or Academic Background must be filled in if not uploading a resume.",
  path: ["skills"], 
});

type CareerFormProps = {
  onSubmit: (data: FormInput, resumeText?: string) => void;
};

export function CareerForm({ onSubmit }: CareerFormProps) {
  const [resumeText, setResumeText] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      academicBackground: "",
      skills: "",
      interests: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        // Clear existing values and errors for skills and academic background
        form.setValue('skills', 'Extracted from resume.');
        form.setValue('academicBackground', 'Extracted from resume.');
        form.clearErrors('skills');
        form.clearErrors('academicBackground');
      };
      reader.readAsText(file);
    }
  };

  const handleFormSubmit = (data: FormInput) => {
    onSubmit(data, resumeText);
  };
  
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Discover Your Future Path</CardTitle>
          <CardDescription>Tell us a bit about yourself, and our AI will generate personalized career recommendations for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <Card className="p-4">
                <FormLabel htmlFor="resume-upload">Upload Your Resume (optional)</FormLabel>
                <div className="flex items-center gap-4 mt-2">
                  <Button asChild variant="outline">
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </label>
                  </Button>
                  <Input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.md" />
                  {fileName && <p className="text-sm text-muted-foreground">{fileName}</p>}
                </div>
                <FormDescription className="mt-2">
                  Upload a .txt or .md file. This will automatically fill in your skills and background.
                </FormDescription>
              </Card>

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
                      <Textarea placeholder="e.g., Bachelor's in Computer Science, focusing on AI and machine learning." {...field} disabled={!!resumeText} />
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
                      <Textarea placeholder="e.g., Python, React, data analysis, project management." {...field} disabled={!!resumeText} />
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
