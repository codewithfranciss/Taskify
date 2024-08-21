"use client";
import React, { useState, FormEvent } from 'react';
import Navbar from '../component/Navbar';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const { toast } = useToast(); 
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/forgot-password/reset-password`, // Redirect after email reset
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Password reset email sent! Please check your inbox.",
          variant: "default",
        });
        setTimeout(() => {
          router.push('/auth/signin'); // Redirect to sign-in page after 3 seconds
        }, 3000);
      }
    } catch (err) {
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-center mt-11'>
        <h1 className='text-center text-2xl font-extrabold'>Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className='mt-5 w-full max-w-md px-4'>
          <label htmlFor="email" className='text-sm'>
            Email:
          </label>
          <Input
            type='email'
            placeholder='Enter your email...'
            className='w-full mb-4 shadow-sm'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type='submit' className='w-full bg-black' disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <p className='py-2 font-bold text-black text-sm text-left'>
          Remembered your password? <Link href="/auth/signin" className='underline'>Sign in</Link>
        </p>
      </div>
    </>
  );
}
