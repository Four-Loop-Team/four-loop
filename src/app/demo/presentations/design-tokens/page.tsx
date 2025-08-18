'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

// Force client-side rendering to avoid SSR issues
export const runtime = 'edge';

const DesignTokensPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simple slide data - moved outside component to avoid SSR issues
  const slides = [
    {
      title: 'Design Tokens',
      content: 'Four Loop Digital Design System',
    },
    {
      title: 'What Are Design Tokens?',
      content: 'Named entities that store visual design attributes',
    },
    {
      title: 'Four Loop Brand Foundation',
      content: 'Our brand colors and design system',
    },
    {
      title: 'Thank You!',
      content: 'Questions?',
    },
  ];

  // Navigation functions with useCallback to prevent dependency issues
  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentSlide, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col relative overflow-hidden'>
      {/* Progress bar */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gray-800 z-50'>
        <div
          className='h-full bg-gradient-to-r from-yellow-300 to-yellow-400 transition-all duration-300 ease-out'
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className='flex justify-between items-center p-6 relative z-40'>
        <div className='flex items-center gap-3'>
          <Image
            src='/logo.png'
            alt='Four Loop Digital'
            width={32}
            height={32}
            className='rounded'
          />
          <span className='text-sm text-gray-400'>
            Design Tokens Presentation
          </span>
        </div>

        <div className='text-sm text-gray-400'>
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* Main content */}
      <main className='flex-1 flex items-center justify-center px-6 py-8'>
        <div className='max-w-6xl w-full text-center'>
          {/* Slide title */}
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400'>
            {currentSlideData.title}
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 mx-auto rounded-full mb-12'></div>

          {/* Slide content */}
          <div className='min-h-[300px] flex items-center justify-center'>
            <p className='text-xl text-gray-300'>{currentSlideData.content}</p>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className='flex justify-between items-center p-6 relative z-40'>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentSlide === 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          ← Previous
        </button>

        <div className='flex items-center gap-2'>
          {slides.map((_, i) => (
            <button
              key={`slide-indicator-${i}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(i);
                    setIsTransitioning(false);
                  }, 150);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentSlide
                  ? 'bg-yellow-300 shadow-lg scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentSlide === slides.length - 1
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl'
          }`}
        >
          Next →
        </button>
      </footer>

      {/* Help text */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-50'>
        ←→ Navigate • Space: Next
      </div>
    </div>
  );
};

// Use dynamic import to prevent SSR issues
export default dynamic(() => Promise.resolve(DesignTokensPresentation), {
  ssr: false,
});
