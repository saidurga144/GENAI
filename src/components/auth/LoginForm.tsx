
"use client";

import { useState, useRef, useEffect } from "react";
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

// Schema for email/password login
const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Schema for phone number login
const phoneFormSchema = z.object({
  countryCode: z.string().min(2),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  otp: z.string().optional(),
});


export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { signIn, sendOtp } = useAuth();
  
  // Separate forms for each tab
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { countryCode: "+91", phone: "" },
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
  
  const handlePhoneSubmit = async (data: z.infer<typeof phoneFormSchema>) => {
    setLoading(true);
    setError(null);
    const fullPhoneNumber = data.countryCode + data.phone;
    try {
      await sendOtp(fullPhoneNumber, data.otp as string);
       // The onAuthStateChanged listener in useAuth will handle the redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendOtp = async () => {
    const { countryCode, phone } = phoneForm.getValues();
    if (phone.length < 10) {
      phoneForm.setError("phone", { message: "Please enter a valid phone number." });
      return;
    }
    setLoading(true);
    setError(null);
    const fullPhoneNumber = countryCode + phone;
    try {
      await sendOtp(fullPhoneNumber);
      setOtpSent(true);
    } catch (err) {
       setError(err instanceof Error ? err.message : "Failed to send OTP. Please check the number or try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-full">
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
              {error && !otpSent && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized className="mr-2" />}
                Sign In with Email
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="phone">
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6 mt-6">
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="flex gap-2">
                   <FormField
                      control={phoneForm.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormControl>
                          <Input {...field} disabled={otpSent} className="w-20" />
                        </FormControl>
                      )}
                    />
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormControl>
                          <Input placeholder="123 456 7890" {...field} disabled={otpSent} className="flex-1" />
                      </FormControl>
                    )}
                  />
                  {!otpSent && (
                    <Button type="button" onClick={handleSendOtp} disabled={loading}>
                      {loading ? <Image src="/loader.gif" alt="Loading..." width={24} height={24} unoptimized /> : 'Send OTP'}
                    </Button>
                  )}
                </div>
                 <FormMessage>
                  {phoneForm.formState.errors.phone?.message}
                </FormMessage>
              </FormItem>

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
                  Verify OTP & Sign In
                </Button>
              )}
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
