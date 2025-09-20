
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
import { Eye, EyeOff } from 'lucide-react';

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  
  const loginForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
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
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                      placeholder="Email" 
                      {...field} 
                      className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-full h-12 px-6 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Password" 
                      {...field} 
                      className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-full h-12 px-6 focus:ring-primary focus:border-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex items-center justify-between text-xs px-2">
            <FormField
              control={loginForm.control}
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
            <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-gray-400 hover:text-white hover:underline text-xs"
                asChild
            >
                <Link href="/forgot-password">
                    Forgot Password?
                </Link>
            </Button>
          </div>
          
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
