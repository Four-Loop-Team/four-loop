'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function PresentationContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key >= '1' && event.key <= '4') {
        goToSlide(parseInt(event.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, goToSlide]);

  const slides = [
    {
      title: 'Design Tokens',
      subtitle: 'Foundation of Modern Design Systems',
      content: (
        <div className='text-center'>
          <div className='mb-8'>
            <Image
              src='/logo.png'
              alt='Four Loop Digital Logo'
              width={120}
              height={120}
              className='mx-auto mb-6'
            />
          </div>
          <p className='text-xl text-gray-300 mb-8'>
            Four Loop Digital&apos;s Comprehensive Token Architecture
          </p>
          <div className='text-sm text-gray-400'>
            Press → or Space to navigate • July 2025
          </div>
        </div>
      ),
    },
    {
      title: 'What are Design Tokens?',
      content: (
        <div>
          <blockquote className='text-lg italic text-center mb-8 p-6 bg-gray-800/50 rounded-lg border-l-4 border-yellow-400'>
            Design tokens are named entities that store visual design
            attributes.
            <br />
            They are the smallest atoms of a design system.
          </blockquote>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-4 h-4 bg-gradient-to-r from-red-500 to-blue-500 rounded'></div>
                <span>Colors: Brand, semantic, state colors</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-4 h-4 bg-gray-600 rounded flex items-center justify-center text-xs'>
                  Aa
                </div>
                <span>Typography: Families, sizes, weights</span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-4 h-4 border-2 border-gray-400 rounded'></div>
                <span>Spacing: Margins, padding, gaps</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-4 h-4 bg-gray-700 rounded shadow-md'></div>
                <span>Shadows & Borders</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Four Loop Brand Foundation',
      content: (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-2xl mb-6 text-yellow-400'>Color Palette</h3>
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div
                    className='w-12 h-12 rounded'
                    style={{ backgroundColor: '#e2e891' }}
                  ></div>
                  <div>
                    <div className='font-mono text-sm'>#e2e891</div>
                    <div className='text-gray-400'>Primary Yellow</div>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gray-800 rounded border border-gray-600'></div>
                  <div>
                    <div className='font-mono text-sm'>#353535</div>
                    <div className='text-gray-400'>Dark Gray</div>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gray-900 rounded'></div>
                  <div>
                    <div className='font-mono text-sm'>#232323</div>
                    <div className='text-gray-400'>Deep Black</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-2xl mb-6 text-yellow-400'>
                Typography Scale
              </h3>
              <div className='space-y-3'>
                <div className='text-3xl font-bold'>Heading Large</div>
                <div className='text-2xl font-semibold'>Heading Medium</div>
                <div className='text-xl'>Heading Small</div>
                <div className='text-base'>Body Text</div>
                <div className='text-sm text-gray-400'>Caption Text</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Thank You',
      content: (
        <div className='text-center'>
          <div className='mb-8'>
            <Image
              src='/logo.png'
              alt='Four Loop Digital Logo'
              width={100}
              height={100}
              className='mx-auto mb-6 opacity-80'
            />
          </div>
          <h2 className='text-3xl mb-6 text-yellow-400'>Questions?</h2>
          <p className='text-xl text-gray-300 mb-8'>
            Thank you for your attention!
          </p>
          <div className='text-gray-400'>
            <p>Four Loop Digital</p>
            <p>Design Token Architecture • 2025</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      {/* Navigation Controls */}
      <div className='fixed top-6 right-6 z-10 flex space-x-2'>
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === i
                ? 'bg-yellow-400 scale-125'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide Navigation */}
      <div className='fixed left-6 top-1/2 transform -translate-y-1/2 z-10 flex flex-col space-y-4'>
        <button
          onClick={prevSlide}
          className='p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors'
          aria-label='Previous slide'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className='p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors'
          aria-label='Next slide'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className='fixed bottom-6 left-6 z-10 text-gray-400 text-sm'>
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Main Slide Content */}
      <div className='relative h-screen flex items-center justify-center p-8'>
        <div className='max-w-4xl w-full'>
          <div className='slide-content transition-all duration-500 ease-in-out'>
            {slides[currentSlide].title && (
              <h1 className='text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent'>
                {slides[currentSlide].title}
              </h1>
            )}
            {slides[currentSlide].subtitle && (
              <h2 className='text-2xl md:text-3xl text-center text-gray-300 mb-12'>
                {slides[currentSlide].subtitle}
              </h2>
            )}
            <div className='text-lg leading-relaxed'>
              {slides[currentSlide].content}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='fixed bottom-0 left-0 right-0 h-1 bg-gray-800'>
        <div
          className='h-full bg-gradient-to-r from-yellow-400 to-yellow-200 transition-all duration-300 ease-out'
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
}
