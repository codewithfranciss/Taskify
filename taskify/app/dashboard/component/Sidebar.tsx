"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Utility for conditional classnames
import Link from 'next/link';
import { FaHome, FaClock, FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { PiCardsLight } from "react-icons/pi";
import { IoSchoolSharp, IoPeopleSharp } from "react-icons/io5";
import { FaSun, FaMoon } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSchoolDropdown = () => {
    setIsSchoolDropdownOpen(!isSchoolDropdownOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={cn(
        "h-screen bg-white dark:bg-gray-800 shadow-lg",
        isCollapsed ? "w-20" : "w-60",
        "transition-all duration-300",
        "fixed sm:relative z-30"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1 className={cn("text-xl font-extrabold dark:text-white", isCollapsed && "hidden")}>Taskify</h1>
        <Button variant="ghost" onClick={toggleSidebar} className="text-black dark:text-white">
          {isCollapsed ? <FaBars className="text-2xl" /> : <FaTimes className="text-2xl" />}
        </Button>
      </div>
      <nav className="flex flex-col mt-8 flex-grow">
        <Link href="/dashboard" className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700", isCollapsed && "justify-center")}>
          <FaHome className="text-xl dark:text-white" />
          {!isCollapsed && <span className="ml-4 text-slate-500 dark:text-gray-400">Dashboard</span>}
        </Link>
        <Link href="/dashboard/flashcards" className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700", isCollapsed && "justify-center")}>
          <PiCardsLight className="text-xl dark:text-white" />
          {!isCollapsed && <span className="ml-4 text-slate-500 dark:text-gray-400">Flashcards</span>}
        </Link>
        <Link href="/dashboard/pomodoro" className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700", isCollapsed && "justify-center")}>
          <FaClock className="text-xl dark:text-white" />
          {!isCollapsed && <span className="ml-4 text-slate-500 dark:text-gray-400">Pomodoro</span>}
        </Link>
        <div className="relative flex flex-col">
          <button
            onClick={toggleSchoolDropdown}
            className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700 w-full", isCollapsed && "justify-center")}
          >
            <IoSchoolSharp className="text-xl dark:text-white" />
            {!isCollapsed && (
              <>
                <span className="ml-4 text-slate-500 dark:text-gray-400">School</span>
                <span className="ml-auto">
                  {isSchoolDropdownOpen ? <FaChevronUp className="dark:text-white" /> : <FaChevronDown className="dark:text-white" />}
                </span>
              </>
            )}
          </button>

          {/* Dropdown Side Box */}
          {isSchoolDropdownOpen && (
            <div
              className={cn(
                "absolute left-full top-0 mt-4 ml-2 w-40 bg-white dark:bg-gray-800 shadow-lg border rounded-lg",
                isCollapsed ? "block" : "hidden",
                "transition-all duration-300 ease-in-out"
              )}
            >
              <Link href="goals" className="block p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
                <span className="text-slate-500 dark:text-gray-400">Semester Goals</span>
              </Link>
              <Link href="/dashboard/school/timetable" className="block p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
                <span className="text-slate-500 dark:text-gray-400">Timetable</span>
              </Link>
              <Link href="/dashboard/school/assignment-task" className="block p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
                <span className="text-slate-500 dark:text-gray-400">Assignment/Tasks</span>
              </Link>
              <Link href="/dashboard/school/materials" className="block p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
                <span className="text-slate-500 dark:text-gray-400">Materials</span>
              </Link>
              <Link href="/dashboard/school/school-events" className="block p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
                <span className="text-slate-500 dark:text-gray-400">School events</span>
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown Menu for Expanded Sidebar */}
        <div
          className={cn(
            "ml-8 flex flex-col overflow-hidden transition-max-height duration-300 ease-in-out",
            isSchoolDropdownOpen && !isCollapsed ? "max-h-screen" : "max-h-0"
          )}
        >
          <Link href="goals" className="flex items-center p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
            <span className="ml-4 text-slate-500 dark:text-gray-400">Semester Goals</span>
          </Link>
          <Link href="/dashboard/school/timetable" className="flex items-center p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
            <span className="ml-4 text-slate-500 dark:text-gray-400">Timetable</span>
          </Link>
          <Link href="/dashboard/school/assignment-task" className="flex items-center p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
            <span className="ml-4 text-slate-500 dark:text-gray-400">Assignment/Task</span>
          </Link>
          <Link href="/dashboard/school/materials" className="flex items-center p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
            <span className="ml-4 text-slate-500 dark:text-gray-400">Materials</span>
          </Link>
          <Link href="/dashboard/school/school-events" className="flex items-center p-2 hover:bg-slate-300 dark:hover:bg-gray-700">
            <span className="ml-4 text-slate-500 dark:text-gray-400">School events</span>
          </Link>
        </div>
        <Link href="/dashboard/todo" className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700", isCollapsed && "justify-center")}>
        <LuListTodo className="text-xl dark:text-white" />
          {!isCollapsed && <span className="ml-4 text-slate-500 dark:text-gray-400">Daily Todos</span>}
        </Link>
        <Link href="/dashboard/study-groups" className={cn("flex items-center p-4 hover:bg-slate-300 dark:hover:bg-gray-700", isCollapsed && "justify-center")}>
          <IoPeopleSharp className="text-xl dark:text-white" />
          {!isCollapsed && <span className="ml-4 text-slate-500 dark:text-gray-400">Study Groups</span>}
        </Link>
      </nav>
      <div className="mt-24 p-4 border-t">
        <Button variant="ghost" onClick={toggleDarkMode} className="w-full text-black dark:text-white">
          {isDarkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
          {!isCollapsed && <span className="ml-4">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </Button>
      </div>
    </div>
  );
}
