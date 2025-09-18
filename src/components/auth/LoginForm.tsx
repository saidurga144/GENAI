
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

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
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
    <div className="w-full max-w-sm font-sans">
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
                <i className='bx bx-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'></i>
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
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                    className="w-full pl-5 pr-10 py-3 border-none rounded-lg bg-[#f0f0f0] outline-none"
                  />
                </FormControl>
                <i className='bx bx-lock-alt absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'></i>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="text-right">
            <Link href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
            </Link>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full rounded-lg py-3 text-base bg-primary hover:bg-primary/90" disabled={loading}>
            {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
