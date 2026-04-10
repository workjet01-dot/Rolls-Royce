'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CanvasSequenceProps {
  frameCount?: number;
  imagePathPrefix?: string;
  imagePathSuffix?: string;
  children?: React.ReactNode;
}

export function CanvasSequence({
  frameCount = 60,
  imagePathPrefix = '/frames/frame_',
  imagePathSuffix = '.webp',
  children,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Adjust padding based on your actual file names (e.g. frame_001 vs frame_1)
      const indexStr = i.toString().padStart(4, '0');
      img.src = `${imagePathPrefix}${indexStr}${imagePathSuffix}`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      // Important to push to array so they retain correct index orders
      preloadedImages.push(img);
    }
    
    setImages(preloadedImages);
  }, [frameCount, imagePathPrefix, imagePathSuffix]);

  // Handle drawing and scroll animation
  useEffect(() => {
    // Only bind scroll after all images are loaded
    if (imagesLoaded < frameCount || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    let lastFrameIndex = -1;

    const renderFrame = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !img.width) return;

      // Scale to cover the entire canvas (mimics object-fit: cover)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Force re-render of current frame on resize
      let currentFrame = Math.max(0, lastFrameIndex);
      lastFrameIndex = -1; // reset comparison map
      renderFrame(currentFrame);
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        
        if (scrollDistance <= 0) return;
        
        // Calculate scroll progress exclusively inside the container limits
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
        let frameIndex = Math.floor(scrollProgress * (frameCount - 1));
        
        if (frameIndex !== lastFrameIndex) {
          renderFrame(frameIndex);
          lastFrameIndex = frameIndex;
        }
      });
    };

    // Initial setups
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    resizeCanvas(); // Will draw frame 0

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [images, imagesLoaded, frameCount]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-brand-darker">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Simple loader overlay */}
        {imagesLoaded < frameCount && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-darker z-10 font-sans text-brand-gold text-xs tracking-[0.2em] uppercase">
            Loading Experience {Math.round((imagesLoaded / frameCount) * 100)}%
          </div>
        )}

        {imagesLoaded === frameCount && children}
      </div>
    </div>
  );
}
