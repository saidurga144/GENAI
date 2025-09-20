
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
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

const forgotPasswordSchema = z.object({
  resetEmail: z.string().email({ message: "Please enter a valid email address." }),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, sendPasswordReset } = useAuth();
  
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState<string | null>(null);
  
  const loginForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { resetEmail: "" },
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
  
  const handleForgotPasswordSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setForgotPasswordLoading(true);
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
    try {
        await sendPasswordReset(data.resetEmail);
        setForgotPasswordSuccess("A password reset link has been sent to your email address.");
    } catch (err) {
        setForgotPasswordError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
        setForgotPasswordLoading(false);
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
                onClick={() => setIsForgotPasswordOpen(true)}
            >
                Forgot Password?
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
      
      {/* Forgot Password Dialog */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900/80 backdrop-blur-sm border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your email address and we will send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)} className="space-y-4">
                 <FormField
                    control={forgotPasswordForm.control}
                    name="resetEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    placeholder="you@example.com" 
                                    {...field} 
                                    className="w-full bg-slate-800/50 border-slate-700 text-gray-200 rounded-md h-10 px-4 focus:ring-primary focus:border-primary"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                 />
                 {forgotPasswordError && <p className="text-sm text-red-400 text-center">{forgotPasswordError}</p>}
                 {forgotPasswordSuccess && <p className="text-sm text-green-400 text-center">{forgotPasswordSuccess}</p>}
                <DialogFooter className="sm:justify-between gap-2">
                    <DialogClose asChild>
                         <Button type="button" variant="secondary" className="border-slate-700 bg-slate-800 hover:bg-slate-700">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={forgotPasswordLoading}>
                         {forgotPasswordLoading && <Image src="/loader.gif" alt="Loading..." width={20} height={20} unoptimized className="mr-2" />}
                        Send Reset Link
                    </Button>
                </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
