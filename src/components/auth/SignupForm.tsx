
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
import { Eye, EyeOff } from 'lucide-react';

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await signUp(data.email, data.password);
      setSuccessMessage("Account created! A verification email has been sent. Please check your inbox and verify your email before logging in.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm font-sans">
        {successMessage ? (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h3 className="font-bold">Success!</h3>
            <p>{successMessage}</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input 
                        placeholder="Email" 
                        {...field}
                        className="w-full pl-5 pr-10 py-3 border-none rounded-lg bg-[#f0f0f0] outline-none"
                      />
                    </FormControl>
                     <i className='bx bx-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'></i>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                       <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Password" 
                          {...field} 
                          className="w-full pl-5 pr-10 py-3 border-none rounded-lg bg-[#f0f0f0] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full rounded-lg py-3 text-base bg-primary hover:bg-primary/90" disabled={loading}>
                {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
                Register
              </Button>
            </form>
          </Form>
        )}
    </div>
  );
}
