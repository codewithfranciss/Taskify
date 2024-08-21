"use client"

import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi"; 
import work from "@/public/working-at-home.png";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="p-6 border shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span className="font-extrabold text-2xl">Taskify</span>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <GiHamburgerMenu size={24} />
            </button>
          </div>

          {/* Links Section */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:space-x-9 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
          >
            <Link href="#" className="text-black hover:text-slate-300">
              Home
            </Link>
            <Link href="#" className="text-black hover:text-slate-300">
              About
            </Link>
            <Link href="#" className="text-black hover:text-slate-300">
              Contact
            </Link>
          </div>

          {/* Button Section */}
          <div className="hidden md:block">
            <Link href="/auth/signup"><button className="bg-black flex items-center gap-2 text-white font-extrabold px-4 py-2 mr-4 rounded-full hover:bg-slate-600 transition">
              <CgProfile /> Get Started
            </button></Link>
          </div>
        </div>
      </nav>

      <main className="mt-28 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Write, Plan and <br />
            Organize
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Manage your tasks effectively and boost your productivity with Taskify.
          </p>
          <button className="bg-black text-white font-extrabold px-6 py-3 rounded-full hover:bg-slate-600 transition">
            Learn More
          </button>
        </div>
        <div>
          <Image src={work} alt="Working at home" width={350} height={450} />
        </div>
      </main>
    </>
  );
}
