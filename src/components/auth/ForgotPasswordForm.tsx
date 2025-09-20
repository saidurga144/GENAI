
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
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { sendPasswordReset } = useAuth();
  
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleForgotPasswordSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
        await sendPasswordReset(data.email);
        setSuccess("A password reset link has been sent to your email address.");
        form.reset();
    } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm text-gray-300 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPasswordSubmit)} className="space-y-6">
          <FormField
            control={form.control}
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
          
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          {success && <p className="text-sm text-green-400 text-center">{success}</p>}

          <Button 
            type="submit" 
            className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-fuchsia-600 text-white hover:opacity-90 font-bold tracking-wider transition-opacity" 
            disabled={loading}
          >
            {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
            Send Reset Link
          </Button>
            <div className="text-center text-xs">
                <Link href="/login" className="font-semibold text-gray-400 hover:text-white">
                    Back to Login
                </Link>
            </div>
        </form>
      </Form>
    </div>
  );
}
