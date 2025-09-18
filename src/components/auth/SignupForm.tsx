
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Mail, Lock } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
});

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { signUp, signOut } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await signUp(data.email, data.password);
      await signOut();
      setMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm text-gray-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="Email" 
                        {...field}
                        className="w-full bg-black/40 border-gray-600 text-gray-200 pl-10 focus:ring-offset-gray-800 focus:border-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        type="password"
                        placeholder="Password" 
                        {...field} 
                        className="w-full bg-black/40 border-gray-600 text-gray-200 pl-10 focus:ring-offset-gray-800 focus:border-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            {message && <p className="text-sm text-green-400 text-center">{message}</p>}
            <Button type="submit" className="w-full bg-gray-400 text-black hover:bg-gray-300 font-bold tracking-wider" disabled={loading}>
              {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
              SIGN UP
            </Button>
            <div className="text-center text-xs">
                <span className="text-gray-500">Already have an account? </span>
                <Link href="/login" className="font-semibold text-gray-400 hover:text-white">
                    Log in
                </Link>
            </div>
          </form>
        </Form>
    </div>
  );
}
