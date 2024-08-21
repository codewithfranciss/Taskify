"use client";
import React, { useState, FormEvent } from 'react';
import Navbar from '../component/Navbar';
import { Input } from '@/components/ui/input';
import { FaGoogle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 
  const { toast } = useToast();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Sign-in successful!",
          variant: "default",
        });
       
      }
    } catch (err) {
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-center mt-16'>
        <h1 className='text-center text-2xl font-extrabold'>Sign in</h1>
        <form onSubmit={handleSignIn} className='mt-5 w-full max-w-md px-4'>
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
          <label htmlFor="password" className='text-sm'>
            Password:
          </label>
          <Input
            type='password'
            placeholder='Enter your password...'
            className='w-full mb-1 shadow-sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link href="/auth/forgot-password" className='text-sm underline'>Forgot password?</Link>
          <Button type='submit' className='w-full mt-6 bg-black text-white' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className='py-1 font-extrabold text-slate-300'>Or</p>
        <Button className='gap-2 bg-white text-black py-4 hover:bg-slate-300 hover:text-black'>
          Continue with Google <FaGoogle />
        </Button>
        <p className='py-2 font-bold text-black text-sm text-left'>
          Don't have an account? <Link href="/auth/signup" className='underline'>Create</Link>
        </p>
      </div>
    </>
  );
}
