import React from 'react';
import { Button } from '@/components/Button';
import { cars } from '@/data/cars';
import { FadeIn } from '@/components/FadeIn';
import { Showroom } from '@/components/Showroom';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Showroom />

      {/* Models Placeholder Section */}
      <section id="models" className="py-32 px-6 bg-brand-darker border-t border-brand-light/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-brand-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">The Collection</h2>
            </FadeIn>
            <FadeIn>
              <h3 className="font-serif text-4xl md:text-5xl text-brand-light">Masterpieces in Motion</h3>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <FadeIn key={car.id} className="group cursor-pointer">
                <div className="w-full aspect-[4/3] bg-brand-dark mb-4 border border-brand-light/10 group-hover:border-brand-gold/50 transition-colors duration-500 rounded-sm">
                  {/* Placeholder for the image */}
                </div>
                <h4 className="font-serif text-2xl text-brand-light mb-1">{car.name}</h4>
                <p className="font-sans text-brand-light/50 text-sm tracking-wide mb-3">{car.tagline}</p>
                <p className="font-sans text-brand-light/70 text-xs mb-4 leading-relaxed line-clamp-3 md:line-clamp-2">{car.description}</p>
                <span className="text-brand-gold text-xs tracking-widest uppercase font-sans group-hover:text-brand-light transition-colors duration-300">Explore &rsaquo;</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
