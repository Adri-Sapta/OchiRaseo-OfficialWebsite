'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-ochi-light/60 py-3'
          : 'bg-white border-b border-ochi-light py-4'
      }`}
    >
      {/* Container dibuat w-full dan relative */}
      <nav className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo / Title */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="font-bold text-lg md:text-xl text-ochi-dark flex items-center gap-1 hover:text-ochi-primary transition"
        >
          Ochi Rasheo <span className="text-xs font-normal text-ochi-dark/50">ch.</span>
        </a>

        {/* Desktop Menu Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold tracking-wider text-ochi-dark">
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-ochi-primary transition">
            TOP
          </a>
          <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-ochi-primary transition">
            SCHEDULE
          </a>
          <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="hover:text-ochi-primary transition">
            VIDEOS
          </a>
          <a href="#music" onClick={(e) => scrollToSection(e, 'music')} className="hover:text-ochi-primary transition">
            MUSIC
          </a>
          <a href="#data" onClick={(e) => scrollToSection(e, 'data')} className="hover:text-ochi-primary transition">
            DATA
          </a>

          <Link
            href="/dashboard"
            className="ml-2 px-3 py-1.5 rounded-lg bg-ochi-primary/10 hover:bg-ochi-primary text-ochi-primary hover:text-white transition-all text-xs flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>ADMIN</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button (Dipertegas warna stroke & ukuran) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-ochi-dark hover:bg-gray-100 focus:outline-none flex items-center justify-center border border-gray-200"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? (
            /* Icon Close (X) */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-ochi-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Icon Hamburger (☰) */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-ochi-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu (Penyesuaian posisi absolute di bawah header) */}
        {isOpen && (
          <div className="absolute top-[120%] left-0 right-0 bg-white border-b border-ochi-light shadow-xl py-6 px-6 flex flex-col gap-3 text-center text-sm font-bold tracking-wider text-ochi-dark md:hidden z-50 rounded-b-2xl">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="py-2.5 hover:text-ochi-primary hover:bg-gray-50 rounded-lg transition">
              TOP
            </a>
            <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="py-2.5 hover:text-ochi-primary hover:bg-gray-50 rounded-lg transition">
              SCHEDULE
            </a>
            <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="py-2.5 hover:text-ochi-primary hover:bg-gray-50 rounded-lg transition">
              VIDEOS
            </a>
            <a href="#music" onClick={(e) => scrollToSection(e, 'music')} className="py-2.5 hover:text-ochi-primary hover:bg-gray-50 rounded-lg transition">
              MUSIC
            </a>
            <a href="#data" onClick={(e) => scrollToSection(e, 'data')} className="py-2.5 hover:text-ochi-primary hover:bg-gray-50 rounded-lg transition">
              DATA
            </a>

            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-ochi-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>AKSES ADMIN</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}