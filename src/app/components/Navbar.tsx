// components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 font-[Montserrat] transition-all ${scrollY > 0 ? 'backdrop-blur-md bg-black/50' : ''}`}>
      <div className="container mx-auto flex justify-between items-center p-4 sm:p-6">
        <Link href="/" className="text-2xl font-bold text-white z-50 sm:ml-[200px]">
          <span className="text-green-400">Afioniq</span>
        </Link>
        
        <button
          className="sm:hidden p-2 rounded-md focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
        
        <nav className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-center gap-6 absolute sm:relative top-full left-0 w-full sm:w-auto bg-black/95 sm:bg-transparent p-4 sm:p-0`}>
          <Link href="/about" className="text-white hover:text-green-400 transition-colors">
            About
          </Link>
          <Link href="/services" className="text-white hover:text-green-400 transition-colors">
            Services
          </Link>
          <Link href="/contact" className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors sm:mr-[200px]">
            <span>Contact Us</span>
            <ArrowRight size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}