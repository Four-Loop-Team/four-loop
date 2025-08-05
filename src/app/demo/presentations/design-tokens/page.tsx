'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const DesignTokensPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simple slide data
  const slides = [
    {
      title: 'Design Tokens',
      content: (
        <div className="text-center space-y-8">
          <Image 
            src="/logo.png" 
            alt="Four Loop Digital" 
            width={96}
            height={96}
            className="mx-auto mb-8 rounded-lg shadow-lg"
          />
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            Design Tokens
          </h1>
          <h2 className="text-3xl mb-8 text-gray-300">
            The Foundation of Modern Design Systems
          </h2>
          <p className="text-xl text-yellow-300 font-medium">
            Four Loop Digital&apos;s Comprehensive Token Architecture
          </p>
        </div>
      )
    },
    {
      title: 'What Are Design Tokens?',
      content: (
        <div className="space-y-8">
          <blockquote className="text-2xl font-light italic border-l-4 border-yellow-300 pl-6 text-gray-200 bg-gray-800/50 p-6 rounded-r-lg">
            Design tokens are <strong className="text-yellow-300">named entities</strong> that store visual design attributes. 
            They are the <strong className="text-yellow-300">smallest atoms</strong> of a design system.
          </blockquote>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">❌ Without Tokens</h3>
              <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400">{/* Scattered hardcoded values */}</div>
                <div><span className="text-blue-300">.button</span> {`{`}</div>
                <div>  <span className="text-green-300">background</span>: <span className="text-yellow-200">#e2e891</span>;</div>
                <div>  <span className="text-green-300">padding</span>: <span className="text-yellow-200">16px 24px</span>;</div>
                <div>{`}`}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">✅ With Tokens</h3>
              <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400">{/* Single source of truth */}</div>
                <div><span className="text-purple-300">BRAND_COLORS</span>.<span className="text-blue-300">primary</span> = <span className="text-yellow-200">&apos;#e2e891&apos;</span>;</div>
                <div className="text-gray-400 mt-2">{/* ✨ Automatic propagation everywhere */}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Four Loop Brand Foundation',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="Four Loop Digital" width={64} height={64} className="mx-auto mb-4 rounded-lg" />
            <p className="text-xl text-gray-300">Our entire design system starts with just 4 core brand colors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Primary', value: '#e2e891', usage: 'Accents, CTAs, Highlights', bg: '#e2e891', text: '#000' },
              { name: 'Secondary', value: '#353535', usage: 'Main backgrounds, Text', bg: '#353535', text: '#fff' },
              { name: 'Tertiary', value: '#232323', usage: 'Cards, Sections', bg: '#232323', text: '#fff' },
              { name: 'Neutral', value: '#ffffff', usage: 'Light backgrounds, Text', bg: '#ffffff', text: '#000' }
            ].map((color, i) => (
              <div key={i} className="text-center">
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-lg shadow-lg border border-gray-600 flex items-center justify-center font-mono text-sm font-medium"
                  style={{ backgroundColor: color.bg, color: color.text }}
                >
                  {color.value}
                </div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-1">{color.name}</h3>
                <p className="text-sm text-gray-400">{color.usage}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Thank You!',
      content: (
        <div className="text-center space-y-8">
          <Image 
            src="/logo.png" 
            alt="Four Loop Digital" 
            width={128}
            height={128}
            className="mx-auto mb-8 rounded-lg shadow-lg"
          />
          <h1 className="text-5xl font-bold mb-4 text-yellow-300">Thank You!</h1>
          <h2 className="text-2xl mb-8 text-gray-300">
            Design Tokens: The Foundation of Modern Design Systems
          </h2>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Key Takeaways</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Design tokens create consistency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">TypeScript-first architecture</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Real business value</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Future-proof foundation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Four Loop Digital - Design Token System</p>
          </div>
        </div>
      )
    }
  ];

  // Navigation functions with useCallback to prevent dependency issues
  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-40">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Four Loop Digital" width={32} height={32} className="rounded" />
          <span className="text-sm text-gray-400">Design Tokens Presentation</span>
        </div>
        
        <div className="text-sm text-gray-400">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-6xl w-full">
          {/* Slide title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
              {currentSlideData.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Slide content */}
          <div className="min-h-[500px] flex items-center justify-center">
            {currentSlideData.content}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="flex justify-between items-center p-6 relative z-40">
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

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-50">
        ←→ Navigate • Space: Next
      </div>
    </div>
  );
};

export default DesignTokensPresentation;
