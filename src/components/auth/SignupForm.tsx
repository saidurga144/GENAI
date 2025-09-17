
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
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// Schema for email/password signup
const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
});

// Schema for phone number signup
const phoneFormSchema = z.object({
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  otp: z.string().optional(),
});


export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { signUp, sendOtp } = useAuth();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  });

  const handleEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await signUp(data.email, data.password);
      setSuccessMessage("Account created! A verification email has been sent. Please check your inbox.");
      // The redirect is handled by the page and layout based on auth state
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (data: z.infer<typeof phoneFormSchema>) => {
    setLoading(true);
    setError(null);
    try {
      await sendOtp(data.phone, data.otp as string);
       // The onAuthStateChanged listener in useAuth will handle the redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up with OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendOtp = async () => {
    const phone = phoneForm.getValues("phone");
    if (phone.length < 10) {
      phoneForm.setError("phone", { message: "Please enter a valid phone number." });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await sendOtp(phone);
      setOtpSent(true);
    } catch (err) {
       setError(err instanceof Error ? err.message : "Failed to send OTP. Please check the number or try again.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="w-full">
        {successMessage ? (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h3 className="font-bold">Success!</h3>
            <p>{successMessage}</p>
          </div>
        ) : (
          <>
            <div id="recaptcha-container"></div>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6 mt-6">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
                      Create Account
                    </Button>
                  </form>
                </Form>
              </TabsContent>
               <TabsContent value="phone">
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6 mt-6">
                      <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input placeholder="+1 123 456 7890" {...field} disabled={otpSent} />
                                {!otpSent && (
                                  <Button type="button" onClick={handleSendOtp} disabled={loading}>
                                    {loading ? <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized /> : 'Send OTP'}
                                  </Button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {otpSent && (
                        <FormField
                          control={phoneForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>6-Digit OTP</FormLabel>
                              <FormControl>
                                <Input placeholder="123456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {error && <p className="text-sm text-destructive">{error}</p>}
                      {otpSent && (
                          <Button type="submit" className="w-full" disabled={loading}>
                          {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
                          Verify OTP & Sign Up
                        </Button>
                      )}
                    </form>
                  </Form>
              </TabsContent>
            </Tabs>
          </>
        )}
    </div>
  );
}
