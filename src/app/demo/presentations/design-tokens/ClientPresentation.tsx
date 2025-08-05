'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from './Presentation.module.scss';

export default function ClientPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  // Hide body overflow to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore body overflow when component unmounts
      document.body.style.overflow = 'auto';
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
        <div className={styles.textCenter}>
          <div className={styles.logoMain}>
            <Image
              src='/logo.png'
              alt='Four Loop Digital Logo'
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
          <p className={styles.description}>
            Four Loop Digital&apos;s Comprehensive Token Architecture
          </p>
          <div className={styles.navigation}>
            Press → or Space to navigate • July 2025
          </div>
        </div>
      ),
    },
    {
      title: 'What are Design Tokens?',
      content: (
        <div>
          <blockquote className={styles.blockquote}>
            Design tokens are named entities that store visual design
            attributes.
            <br />
            They are the smallest atoms of a design system.
          </blockquote>
          <div className={styles.grid}>
            <div className={styles.iconItems}>
              <div className={styles.iconItem}>
                <div className={`${styles.icon} ${styles.iconGradient}`}></div>
                <span>Colors: Brand, semantic, state colors</span>
              </div>
              <div className={styles.iconItem}>
                <div className={`${styles.icon} ${styles.iconText}`}>Aa</div>
                <span>Typography: Families, sizes, weights</span>
              </div>
            </div>
            <div className={styles.iconItems}>
              <div className={styles.iconItem}>
                <div className={`${styles.icon} ${styles.iconBorder}`}></div>
                <span>Spacing: Margins, padding, gaps</span>
              </div>
              <div className={styles.iconItem}>
                <div className={`${styles.icon} ${styles.iconShadow}`}></div>
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
          <div className={styles.grid}>
            <div>
              <h3 className={styles.sectionTitle}>Color Palette</h3>
              <div className={styles.colorSection}>
                <div className={styles.colorItem}>
                  <div
                    className={`${styles.colorSwatch} ${styles.colorSwatchYellow}`}
                  ></div>
                  <div className={styles.colorInfo}>
                    <div className={styles.colorCode}>#e2e891</div>
                    <div className={styles.colorLabel}>Primary Yellow</div>
                  </div>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={`${styles.colorSwatch} ${styles.colorSwatchGray}`}
                  ></div>
                  <div className={styles.colorInfo}>
                    <div className={styles.colorCode}>#353535</div>
                    <div className={styles.colorLabel}>Dark Gray</div>
                  </div>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={`${styles.colorSwatch} ${styles.colorSwatchBlack}`}
                  ></div>
                  <div className={styles.colorInfo}>
                    <div className={styles.colorCode}>#232323</div>
                    <div className={styles.colorLabel}>Deep Black</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Typography Scale</h3>
              <div className={styles.typographyScale}>
                <div className={styles.typeHeadingLarge}>Heading Large</div>
                <div className={styles.typeHeadingMedium}>Heading Medium</div>
                <div className={styles.typeHeadingSmall}>Heading Small</div>
                <div className={styles.typeBody}>Body Text</div>
                <div className={styles.typeCaption}>Caption Text</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Thank You',
      content: (
        <div className={styles.textCenter}>
          <div className={styles.logoMain}>
            <Image
              src='/logo.png'
              alt='Four Loop Digital Logo'
              width={100}
              height={100}
              className={styles.logo}
            />
          </div>
          <h2 className={styles.thankYouTitle}>Questions?</h2>
          <p className={styles.thankYouDescription}>
            Thank you for your attention!
          </p>
          <div className={styles.companyInfo}>
            <p>Four Loop Digital</p>
            <p>Design Token Architecture • 2025</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={styles.presentation}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        margin: 0,
        padding: 0,
      }}
    >
      <div className={styles.slideContainer}>
        {/* Navigation Controls */}
        <div className={styles.navigationControls}>
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`${styles.navDot} ${currentSlide === i ? styles.active : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide Navigation */}
        <div className={styles.slideNavigation}>
          <button
            onClick={prevSlide}
            className={styles.navButton}
            aria-label='Previous slide'
          >
            <svg
              width='24'
              height='24'
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
            className={styles.navButton}
            aria-label='Next slide'
          >
            <svg
              width='24'
              height='24'
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
        <div className={styles.slideCounter}>
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Main Slide Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.slideContent}>
              {slides[currentSlide].title && (
                <h1 className={styles.title}>{slides[currentSlide].title}</h1>
              )}
              {slides[currentSlide].subtitle && (
                <h2 className={styles.subtitle}>
                  {slides[currentSlide].subtitle}
                </h2>
              )}
              <div className={styles.content}>
                {slides[currentSlide].content}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
