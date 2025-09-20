
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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, signOut } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "", terms: false },
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
                        placeholder="Email" 
                        {...field}
                        className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-full h-12 px-6 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-center" />
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
                  <FormMessage className="text-red-400 text-center" />
                </FormItem>
              )}
            />
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
                        I accept the <Link href="/terms" target="_blank" className="underline hover:text-white">Terms and Conditions</Link>
                    </FormLabel>
                    <FormMessage className="text-red-400" />
                    </div>
                </FormItem>
                )}
            />
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            {message && <p className="text-sm text-green-400 text-center">{message}</p>}
            <Button 
                type="submit" 
                className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-fuchsia-600 text-white hover:opacity-90 font-bold tracking-wider transition-opacity" 
                disabled={loading}
            >
              {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
              Sign Up
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
