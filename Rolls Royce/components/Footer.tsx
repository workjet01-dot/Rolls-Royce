import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl tracking-widest text-brand-light uppercase mb-6">Rolls-Royce</h3>
          <p className="font-sans text-brand-light/60 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Inspiring Greatness. The world's pinnacle luxury house, creating the most exceptional
            motor cars for the most exceptional people.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-brand-gold text-xs tracking-[0.2em] uppercase mb-6">Experience</h4>
          <ul className="space-y-4 font-sans text-sm text-brand-light/70">
            <li><Link href="#" className="hover:text-brand-light transition-colors">Find a Dealer</Link></li>
            <li><Link href="#" className="hover:text-brand-light transition-colors">Whispers</Link></li>
            <li><Link href="#" className="hover:text-brand-light transition-colors">Art Programme</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-brand-gold text-xs tracking-[0.2em] uppercase mb-6">Legal</h4>
          <ul className="space-y-4 font-sans text-sm text-brand-light/70">
            <li><Link href="#" className="hover:text-brand-light transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-brand-light transition-colors">Terms of Use</Link></li>
            <li><Link href="#" className="hover:text-brand-light transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-light/10 text-center font-sans text-xs text-brand-light/40 tracking-widest">
        &copy; {new Date().getFullYear()} Rolls-Royce Motor Cars Limited. All Rights Reserved.
      </div>
    </footer>
  );
}
