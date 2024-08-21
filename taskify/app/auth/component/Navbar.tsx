import React from 'react'
import Image from 'next/image'
import logo from "@/public/logo.png"
import Link from 'next/link'
export default function Navbar() {
  return (

    <nav className="p-6 border">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="logo" width={40} height={40} />
            <Link href='/'><span className="font-extrabold text-2xl">Taskify</span></Link>
          </div>    
        </div>
      </nav>
  )
}
