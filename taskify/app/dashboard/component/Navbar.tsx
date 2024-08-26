"use client";

import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiNotification4Line } from "react-icons/ri";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [fullName, setFullName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session);

      if (session) {
        const user = session.user;
        console.log('User:', user);
        setFullName(user.user_metadata.full_name || '');  // Handle possible undefined
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <nav className="flex justify-between bg-white text-black p-4 border w-full">
      <div className="flex items-center flex-grow space-x-4">
        <div className='ml-auto flex flex-row items-center'>
          <div className='mr-9 flex items-center space-x-4'>
            {/* Calendar Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <Button variant="ghost" className="text-black">
                    <IoCalendarNumberOutline className="text-2xl" />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent align="center" side="bottom" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)} // Handle potential undefined
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <Button variant="ghost" className="text-black">
                    <RiNotification4Line className="text-2xl" />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent align="center" side="bottom" className="w-auto p-7">
                <h1>Notification</h1>
              </PopoverContent>
            </Popover>
          </div>

          {/* User Information */}
          <p className='text-slate-300'>{fullName}</p>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <Button variant="ghost" className="text-black">
                  <FaUserCircle className="text-2xl" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-2 bg-white border rounded-lg shadow-md">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="text-black w-full text-left" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
