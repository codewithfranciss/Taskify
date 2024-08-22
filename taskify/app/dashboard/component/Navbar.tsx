import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-white text-black p-4 border w-full">
      <div className="flex items-center flex-grow space-x-4">
        <Button variant="ghost" className="text-black ml-auto">
          <FaUserCircle className="text-2xl" />
        </Button>
      </div>
    </nav>
  );
}
