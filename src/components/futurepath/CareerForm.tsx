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
import { FileText, Lightbulb, User, Briefcase, Rocket, Upload } from "lucide-react";

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
    <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Discover Your Future Path</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tell us a bit about yourself, and our AI will generate personalized career recommendations for you.</p>
      </div>

      <Card className="border-2 border-primary/10 shadow-lg shadow-primary/5">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              
              <Card className="bg-secondary/50 border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5" />
                    Upload Your Resume (Optional)
                  </CardTitle>
                   <CardDescription>
                    For the best results, upload a .txt or .md file. This automatically fills in your skills and background.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="flex items-center gap-4">
                    <Button asChild variant="secondary" className="border">
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </label>
                    </Button>
                    <Input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.md" />
                    {fileName && <p className="text-sm text-muted-foreground">{fileName}</p>}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="academicBackground"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Briefcase className="w-4 h-4" />Academic Background</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Bachelor's in Computer Science, focusing on AI and machine learning." {...field} disabled={!!resumeText} rows={5}/>
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
                      <FormLabel className="flex items-center gap-2"><Lightbulb className="w-4 h-4" />Skills</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Python, React, data analysis, project management." {...field} disabled={!!resumeText} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Lightbulb className="w-4 h-4" />Interests & Hobbies</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Building mobile apps, competitive gaming, reading sci-fi novels." {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><User className="w-4 h-4" />Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll use this to potentially send your results in the future (feature coming soon!).
                    </FormDescription>
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
