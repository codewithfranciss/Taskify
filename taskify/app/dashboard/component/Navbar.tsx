"use client"

import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiNotification4Line } from "react-icons/ri";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // Import the Calendar component

export default function Navbar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <nav className="flex justify-between bg-white text-black p-4 border w-full">
      <div className="flex items-center flex-grow space-x-4">
        <div className='ml-auto flex flex-row items-center'>
          <div className='mr-9 flex items-center space-x-4'>
            {/* Calendar Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-black">
                  <IoCalendarNumberOutline className="text-2xl" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="center" side="bottom" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
            <PopoverTrigger>
            <Button variant="ghost" className="text-black">
              <RiNotification4Line className="text-2xl" />
            </Button>
            <PopoverContent align="center" side="bottom" className="w-auto p-7">
              <h1>Notification</h1>
            </PopoverContent>
           </PopoverTrigger>
            </Popover>
          </div>

          {/* User Information */}
          <p className='text-slate-300'>Francis</p>
          <Button variant="ghost" className="text-black">
            <FaUserCircle className="text-2xl" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
