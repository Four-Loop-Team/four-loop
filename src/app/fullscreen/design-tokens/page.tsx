'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function DesignTokensPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const router = useRouter();

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
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Escape':
          event.preventDefault();
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
              fontSize: '6rem',
              fontWeight: '900',
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
              fontSize: '3rem',
              opacity: 0.9,
              marginBottom: '4rem',
              fontWeight: '300',
              letterSpacing: '0.01em',
            }}
          >
            Four Loop Digital Brand System
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              maxWidth: '800px',
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
              fontSize: '5rem',
              marginBottom: '5rem',
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
              gap: '6rem',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#e2e891',
                  borderRadius: '24px',
                  margin: '0 auto 2rem',
                  border: '6px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 16px 64px rgba(226, 232, 145, 0.4)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                }}
              >
                Primary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.4rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                }}
              >
                #e2e891
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#353535',
                  borderRadius: '24px',
                  margin: '0 auto 2rem',
                  border: '6px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 16px 64px rgba(53, 53, 53, 0.4)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                }}
              >
                Secondary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.4rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                }}
              >
                #353535
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#232323',
                  borderRadius: '24px',
                  margin: '0 auto 2rem',
                  border: '6px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 16px 64px rgba(35, 35, 35, 0.4)',
                }}
              ></div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                }}
              >
                Tertiary
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  opacity: 0.8,
                  fontSize: '1.4rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
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
              fontSize: '5rem',
              marginBottom: '4rem',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            }}
          >
            Typography Scale
          </h2>
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
            }}
          >
            <div
              style={{
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
                Display
              </div>
              <div
                style={{
                  opacity: 0.7,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                64px / 4rem
              </div>
            </div>
            <div
              style={{
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                Heading 1
              </div>
              <div
                style={{
                  opacity: 0.7,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                48px / 3rem
              </div>
            </div>
            <div
              style={{
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                Heading 2
              </div>
              <div
                style={{
                  opacity: 0.7,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                32px / 2rem
              </div>
            </div>
            <div
              style={{
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>
                Body Large
              </div>
              <div
                style={{
                  opacity: 0.7,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
                24px / 1.5rem
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '1rem' }}>Body Regular</div>
              <div
                style={{
                  opacity: 0.7,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                }}
              >
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
              fontSize: '5rem',
              marginBottom: '4rem',
              textAlign: 'center',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            }}
          >
            Token Implementation
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4rem',
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '3rem',
                borderRadius: '16px',
                border: '2px solid rgba(255,255,255,0.2)',
                flex: 1,
                maxWidth: '500px',
              }}
            >
              <h3
                style={{
                  fontSize: '2rem',
                  marginBottom: '2rem',
                  color: '#e2e891',
                  fontWeight: '600',
                }}
              >
                CSS Custom Properties
              </h3>
              <pre
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
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
                padding: '3rem',
                borderRadius: '16px',
                border: '2px solid rgba(255,255,255,0.2)',
                flex: 1,
                maxWidth: '500px',
              }}
            >
              <h3
                style={{
                  fontSize: '2rem',
                  marginBottom: '2rem',
                  color: '#e2e891',
                  fontWeight: '600',
                }}
              >
                SCSS Variables
              </h3>
              <pre
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
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
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <div style={{ fontSize: '1.4rem', opacity: 0.8 }}>
              Press{' '}
              <kbd
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
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
      {/* Main slide content area */}
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 100px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          boxSizing: 'border-box',
        }}
      >
        {slides[currentSlide].content}
      </div>

      {/* Bottom navigation bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
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
            opacity: 0.9,
            fontWeight: '600',
          }}
        >
          {currentSlide + 1} of {totalSlides}
        </div>

        {/* Dot navigation */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: 'none',
                background:
                  currentSlide === i ? '#e2e891' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentSlide === i ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
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
              transition: 'all 0.3s ease',
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
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor:
                currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '700',
              transition: 'all 0.3s ease',
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
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        Exit (Q)
      </button>
    </div>
  );
}
