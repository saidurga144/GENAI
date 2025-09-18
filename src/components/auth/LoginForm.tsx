
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import Link from "next/link";
import { User, Lock } from 'lucide-react';
import { useRouter } from "next/navigation";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false, terms: false },
  });

  const handleEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-sm text-gray-300 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                      placeholder="Mail ID" 
                      {...field} 
                      className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-full h-12 px-6 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="Password" 
                    {...field} 
                    className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-full h-12 px-6 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex items-center justify-between text-xs px-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-slate-600"
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-gray-400">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link href="#" className="text-gray-400 hover:text-white hover:underline">
                Forgot Password?
            </Link>
          </div>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-slate-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-gray-400">
                     I accept the <Link href="#" className="underline hover:text-white">Terms and Conditions</Link>
                  </FormLabel>
                   <FormMessage className="text-red-400" />
                </div>
              </FormItem>
            )}
          />
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <Button 
            type="submit" 
            className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-fuchsia-600 text-white hover:opacity-90 font-bold tracking-wider transition-opacity" 
            disabled={loading}
          >
            {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
            Log In
          </Button>
            <div className="text-center text-xs">
                <span className="text-gray-500">Not a member? </span>
                <Link href="/signup" className="font-semibold text-gray-400 hover:text-white">
                    Sign up now
                </Link>
            </div>
        </form>
      </Form>
    </div>
  );
}
