'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function DesignTokensPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const router = useRouter();

  // Hide body overflow and apply full-screen styles
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Escape':
          prevSlide();
          break;
        case 'q':
        case 'Q':
          router.push('/demo');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, router]);

  const slides = [
    {
      title: 'Design Tokens System',
      subtitle: 'Four Loop Digital Brand Standards',
      content: (
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '5rem',
              fontWeight: '800',
              background: 'linear-gradient(45deg, #e2e891, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
            }}
          >
            Design Tokens
          </div>
          <div
            style={{
              fontSize: '2.5rem',
              opacity: 0.9,
              marginBottom: '3rem',
              fontWeight: '300',
              letterSpacing: '0.01em',
            }}
          >
            Four Loop Digital Brand System
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              maxWidth: '700px',
              lineHeight: 1.6,
              opacity: 0.8,
              fontWeight: '400',
            }}
          >
            A comprehensive system of design decisions translated into reusable,
            platform-agnostic tokens that maintain consistency across all
            digital touchpoints.
          </div>
        </div>
      ),
    },
    {
      title: 'Color Palette',
      content: (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '4rem',
              marginBottom: '4rem',
              textAlign: 'center',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            }}
          >
            Brand Colors
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#e2e891',
                  borderRadius: '16px',
                  margin: '0 auto 2rem',
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(226, 232, 145, 0.3)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                Primary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.2rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                }}
              >
                #e2e891
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#353535',
                  borderRadius: '16px',
                  margin: '0 auto 2rem',
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(53, 53, 53, 0.3)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                Secondary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.2rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                }}
              >
                #353535
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#232323',
                  borderRadius: '16px',
                  margin: '0 auto 2rem',
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(35, 35, 35, 0.3)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                Tertiary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.2rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                }}
              >
                #232323
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Typography',
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
            Typography Scale
          </h2>
          <div
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Display
              </div>
              <div style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                64px / 4rem
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Heading 1
              </div>
              <div style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                48px / 3rem
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Heading 2
              </div>
              <div style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                32px / 2rem
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'normal',
                  marginBottom: '0.5rem',
                }}
              >
                Body Large
              </div>
              <div style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                24px / 1.5rem
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                Body Regular
              </div>
              <div style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                16px / 1rem
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Implementation',
      content: (
        <div style={{ padding: '2rem' }}>
          <h2
            style={{
              fontSize: '3rem',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Token Implementation
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: '#e2e891',
                }}
              >
                CSS Custom Properties
              </h3>
              <pre
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  margin: 0,
                  fontFamily: 'monospace',
                  color: '#ffffff',
                }}
              >{`--brand-primary: #e2e891;
--brand-secondary: #353535;
--spacing-md: 1rem;
--border-radius: 8px;`}</pre>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: '#e2e891',
                }}
              >
                SCSS Variables
              </h3>
              <pre
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  margin: 0,
                  fontFamily: 'monospace',
                  color: '#ffffff',
                }}
              >{`$brand-primary: #e2e891;
$brand-secondary: #353535;
$spacing-md: 1rem;
$border-radius: 8px;`}</pre>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>
              Press{' '}
              <kbd
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                Q
              </kbd>{' '}
              to exit presentation
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Full screen presentation container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          zIndex: 999999,
        }}
      >
        {/* Main slide content area */}
        <div
          style={{
            width: '100%',
            height: '100%',
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
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Bottom navigation bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Slide counter */}
          <div
            style={{
              fontSize: '1rem',
              opacity: 0.8,
              fontWeight: '500',
            }}
          >
            {currentSlide + 1} of {totalSlides}
          </div>

          {/* Dot navigation */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  background:
                    currentSlide === i ? '#e2e891' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: currentSlide === i ? 'scale(1.2)' : 'scale(1)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
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
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              style={{
                background:
                  currentSlide === totalSlides - 1
                    ? 'rgba(255,255,255,0.1)'
                    : '#e2e891',
                border: 'none',
                color:
                  currentSlide === totalSlides - 1
                    ? 'rgba(255,255,255,0.4)'
                    : '#000',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor:
                  currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
            >
              Next
            </button>
          </div>
        </div>

        {/* Exit button */}
        <button
          onClick={() => router.push('/demo')}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          Exit (Q)
        </button>
      </div>
    </>
  );
}
