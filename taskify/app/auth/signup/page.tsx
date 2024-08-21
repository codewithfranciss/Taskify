"use client";
import React, { useState, FormEvent } from 'react';
import Navbar from '../component/Navbar';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast'; 
import { useRouter } from 'next/navigation';

export default function Page() {
  const { toast } = useToast(); // Initialize the toast hook
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: username,
          },
        },
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
          description: "Sign-up successful!",
          variant: "default",
        });
        router.push('/auth/signin');
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
      setPassword("");
      setUsername("");
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-center mt-11'>
        <h1 className='text-center text-2xl font-extrabold'>Welcome to Taskify</h1>
        <form onSubmit={handleSignUp} className='mt-5 w-full max-w-md px-4'>
          <label htmlFor="username" className='text-sm'>
            Username:
          </label>
          <Input
            type='text'
            placeholder='Enter a username...'
            className='w-full mb-4 shadow-sm'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            className='w-full mb-6 shadow-sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit' className='w-full bg-black' disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>
        <p className='py-1 font-extrabold text-slate-300'>Or</p>
        <Button className='gap-2 bg-white text-black py-4 hover:bg-slate-300 hover:text-black'>
          Continue with Google <FaGoogle />
        </Button>
        <p className='py-2 font-bold text-black text-sm text-left'>
          Already have an account? <Link href="/auth/signin" className='underline'>Login</Link>
        </p>
      </div>
    </>
  );
}
