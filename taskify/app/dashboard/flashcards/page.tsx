'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Course = {
  id: string;
  title: string;
};

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }

      if (session?.user?.id) {
        // Extract user ID
        const userId = session.user.id;

        // Fetch courses for the user
        const { data: courses, error } = await supabase
          .from('courses')
          .select('id, title')
          .eq('user_id', userId);

        if (error) {
          console.error('Error fetching courses:', error);
        } else {
          setCourses(courses || []); // Safeguard for `courses` being potentially null
        }
      } else {
        // If no session, redirect to login
        router.push('/auth/signin');
      }

      setLoading(false);
    };

    fetchCourses();
  }, [router]);

  const handleCreateDeck = async () => {
    if (!title) return; // Skip if no title

    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      console.error('No session found, cannot create deck');
      return;
    }

    const { data, error } = await supabase
      .from('courses')
      .insert({ title, user_id: session.user.id })
      .select();

    if (error) {
      console.error('Error creating course:', error);
    } else {
      // Optionally, update the local state with the new course
      setCourses((prevCourses) => [
        ...prevCourses,
        { id: data[0].id, title }
      ]);
      // Reset the title and close the dialog
      setTitle('');
      setDialogOpen(false);
    }
  };

  return (
    <>
      <div className='m-7 flex justify-between'>
        <h1 className='text-lg font-bold'>Your Flashcards:</h1>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white" variant="outline">Create Deck</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New Deck</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Course code:</Label>
                  <Input
                    id="title"
                    placeholder='e.g., Intro to Computing'
                    className="col-span-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCreateDeck}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='my-4 mx-4 gap-3 flex-wrap flex'>
          {courses.map((course) => (
            <Link href={`/dashboard/flashcards/${course.id}`} key={course.id}>
              <Card className="w-48">
                <CardHeader>
                  <CardTitle className='text-center'>{course.title}</CardTitle>
                  <CardDescription className='text-center text-lg font-bold'>1</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
