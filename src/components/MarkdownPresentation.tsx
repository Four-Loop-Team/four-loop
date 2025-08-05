'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Slide {
  content: string;
  isTitle?: boolean;
}

interface PresentationProps {
  markdownContent: string;
  title?: string;
}

export default function MarkdownPresentation({
  markdownContent,
  title: _title = 'Presentation',
}: PresentationProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  // Parse markdown into slides
  useEffect(() => {
    const slideTexts = markdownContent
      .split('---')
      .map((slide) => slide.trim());
    const parsedSlides: Slide[] = slideTexts.map((slideText, index) => ({
      content: slideText,
      isTitle: index === 0,
    }));
    setSlides(parsedSlides);
  }, [markdownContent]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [slides.length]
  );

  // Fullscreen functions
  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault();
          prevSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          if (isFullscreen) {
            exitFullscreen();
          } else {
            enterFullscreen();
          }
          break;
        case 'Escape':
          event.preventDefault();
          if (isFullscreen) {
            exitFullscreen();
          } else {
            router.push('/demo');
          }
          break;
        default:
          // Number keys for direct slide navigation
          const num = parseInt(event.key);
          if (!isNaN(num) && num >= 1 && num <= slides.length) {
            event.preventDefault();
            goToSlide(num - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    nextSlide,
    prevSlide,
    goToSlide,
    enterFullscreen,
    exitFullscreen,
    isFullscreen,
    router,
    slides.length,
  ]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Convert markdown content to JSX
  const renderSlideContent = (content: string) => {
    const lines = content.split('\n').filter((line) => line.trim());

    return lines
      .map((line, index) => {
        const trimmedLine = line.trim();

        // Headers
        if (trimmedLine.startsWith('# ')) {
          return (
            <h1
              key={index}
              style={{
                fontSize: '4rem',
                fontWeight: '800',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #e2e891, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {trimmedLine.slice(2)}
            </h1>
          );
        }

        if (trimmedLine.startsWith('## ')) {
          return (
            <h2
              key={index}
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#e2e891',
              }}
            >
              {trimmedLine.slice(3)}
            </h2>
          );
        }

        // Code blocks
        if (trimmedLine.startsWith('```')) {
          const _language = trimmedLine.slice(3);
          const codeLines: string[] = [];
          let i = index + 1;

          while (i < lines.length && !lines[i].trim().startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
          }

          return (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                marginBottom: '2rem',
              }}
            >
              <pre
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: 'monospace',
                  color: '#ffffff',
                }}
              >
                {codeLines.join('\n')}
              </pre>
            </div>
          );
        }

        // Bold text
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
          return (
            <p
              key={index}
              style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'monospace',
              }}
            >
              {trimmedLine.slice(2, -2)}
            </p>
          );
        }

        // Regular paragraphs
        if (trimmedLine && !trimmedLine.startsWith('```')) {
          return (
            <p
              key={index}
              style={{
                fontSize: '1.4rem',
                lineHeight: 1.6,
                marginBottom: '1rem',
                opacity: 0.9,
              }}
            >
              {trimmedLine}
            </p>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  if (slides.length === 0) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          fontSize: '1.5rem',
        }}
      >
        Loading presentation...
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Main slide content */}
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            textAlign: slides[currentSlide]?.isTitle ? 'center' : 'left',
          }}
        >
          {renderSlideContent(slides[currentSlide]?.content || '')}
        </div>
      </div>

      {/* Navigation controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3rem',
          borderTop: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Slide counter */}
        <div
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            opacity: 0.9,
          }}
        >
          {currentSlide + 1} of {slides.length}
        </div>

        {/* Dot navigation */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background:
                  currentSlide === index ? '#e2e891' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Control buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            style={{
              background:
                currentSlide === 0
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.2)',
              border: 'none',
              color: currentSlide === 0 ? 'rgba(255,255,255,0.4)' : 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
            }}
          >
            Previous
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            style={{
              background:
                currentSlide === slides.length - 1
                  ? 'rgba(255,255,255,0.1)'
                  : '#e2e891',
              border: 'none',
              color:
                currentSlide === slides.length - 1
                  ? 'rgba(255,255,255,0.4)'
                  : '#000',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor:
                currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '700',
            }}
          >
            Next
          </button>

          <button
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
            }}
          >
            {isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          </button>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={() => router.push('/demo')}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
        }}
      >
        Exit (ESC)
      </button>
    </div>
  );
}
