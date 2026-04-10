'use client';
import React, { useState } from 'react';
import { cars } from '@/data/cars';
import { CanvasSequence } from './CanvasSequence';
import { motion, AnimatePresence } from 'framer-motion';

export function Showroom() {
  const [index, setIndex] = useState(0);
  const car = cars[index];

  const handleNext = () => setIndex((prev) => (prev + 1) % cars.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <CanvasSequence imagePathPrefix={`/frames/${car.id.toLowerCase()}/frame_`}>
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 xl:p-24 pointer-events-none">
        
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 mb-10 pointer-events-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={car.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h2 className="text-brand-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                {car.tagline}
              </h2>
              <h1 className="font-serif text-5xl md:text-8xl text-brand-light mb-6 uppercase tracking-wider">
                {car.name}
              </h1>
              <p className="font-sans text-brand-light/80 text-sm md:text-base leading-relaxed">
                {car.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mb-4 md:mb-0">
            <button 
              onClick={handlePrev}
              className="w-14 h-14 flex items-center justify-center border border-brand-light/20 hover:border-brand-gold text-brand-light hover:text-brand-gold transition-colors duration-300 rounded-full text-xl font-light"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext}
              className="w-14 h-14 flex items-center justify-center border border-brand-light/20 hover:border-brand-gold text-brand-light hover:text-brand-gold transition-colors duration-300 rounded-full text-xl font-light"
            >
              &rarr;
            </button>
          </div>
        </div>
        
      </div>
    </CanvasSequence>
  );
}
