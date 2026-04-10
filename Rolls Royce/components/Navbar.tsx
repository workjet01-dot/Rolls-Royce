import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-darker/70 backdrop-blur-md border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-widest text-brand-light uppercase">
          Rolls-Royce
        </Link>
        <div className="hidden md:flex space-x-8 font-sans text-xs tracking-widest uppercase text-brand-light/80">
          <Link href="#models" className="hover:text-brand-gold transition-colors duration-300">Models</Link>
          <Link href="#bespoke" className="hover:text-brand-gold transition-colors duration-300">Bespoke</Link>
          <Link href="#ownership" className="hover:text-brand-gold transition-colors duration-300">Ownership</Link>
          <Link href="#boutique" className="hover:text-brand-gold transition-colors duration-300">Boutique</Link>
        </div>
        <button className="md:hidden text-brand-gold">
          {/* Simple hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
