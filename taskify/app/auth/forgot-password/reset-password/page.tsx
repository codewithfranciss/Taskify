"use client";
import React, { useState, FormEvent } from 'react';
import Navbar from '../../component/Navbar';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const { toast } = useToast(); // Initialize the toast hook
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
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
          description: "Password has been reset successfully!",
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
      setPassword("");
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-center mt-16'>
        <h1 className='text-center text-2xl font-extrabold'>Reset Password</h1>
        <form onSubmit={handleResetPassword} className='mt-5 w-full max-w-md px-4'>
          <label htmlFor="password" className='text-sm'>
            New Password:
          </label>
          <Input
            type='password'
            placeholder='Enter your new password...'
            className='w-full mb-4 shadow-sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit' className='w-full bg-black' disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </>
  );
}
