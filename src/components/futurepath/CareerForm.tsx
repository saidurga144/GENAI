
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
import { cn } from "@/lib/utils";

// This state is managed outside of the form schema
let isResumeUploaded = false;

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  academicBackground: z.string().min(1, { message: "Academic background is required when not uploading a resume." }).max(500, { message: "Please keep your background under 500 characters." }).optional(),
  skills: z.string().min(1, { message: "Skills are required when not uploading a resume." }).max(500, { message: "Please keep your skills under 500 characters." }).optional(),
  interests: z.string().min(10, { message: "Please describe your interests in at least 10 characters." }).max(500, { message: "Please keep your interests under 500 characters." }),
}).superRefine((data, ctx) => {
    if (!isResumeUploaded) {
        if (!data.skills || data.skills.trim().length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Skills are required when not uploading a resume.",
                path: ["skills"],
            });
        }
        if (!data.academicBackground || data.academicBackground.trim().length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Academic background is required when not uploading a resume.",
                path: ["academicBackground"],
            });
        }
    }
});

type CareerFormProps = {
  onSubmit: (data: FormInput, resumeText?: string) => void;
};

export function CareerForm({ onSubmit }: CareerFormProps) {
  const [resumeText, setResumeText] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      academicBackground: "",
      skills: "",
      interests: "",
    },
  });

  const processFile = (file: File) => {
    if (file && file.type === 'text/plain') {
      isResumeUploaded = true;
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        form.setValue('skills', '');
        form.setValue('academicBackground', '');
        form.clearErrors(['skills', 'academicBackground']);
      };
      reader.readAsText(file);
    } else {
        alert('Invalid file type. Please upload a .txt file. PDF and Word document support is coming soon!');
        isResumeUploaded = false;
        setFileName(undefined);
    }
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    } else {
      isResumeUploaded = false;
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleFormSubmit = (data: FormInput) => {
    onSubmit(data, resumeText);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          
          <Card 
            className={cn(
                "bg-secondary/50 border-dashed transition-all duration-300",
                isDragOver ? 'border-primary ring-2 ring-primary' : 'border'
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Upload Your Resume (Optional)
              </CardTitle>
                <CardDescription>
                For the best results, upload a .txt file. Support for PDF and Word documents is coming soon. Drag and drop a file here or click to select one.
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
                <Input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.pdf,.doc,.docx" />
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
    </div>
  );
}
