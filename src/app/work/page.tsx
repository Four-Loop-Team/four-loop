import { ContactSection } from '@/components/sections/ContactSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ServicesSection } from '@/components/sections/ServicesSection';

/**
 * Work page component.
 *
 * This page showcases Four Loop Digital's work, featuring modular sections
 * for intro, services, partners, and contact. This is the main content page
 * that displays the company's portfolio and capabilities.
 *
 * @component
 * @example
 * ```tsx
 * // Rendered automatically by Next.js at the /work route
 * // No direct usage required - this is the page component for "/work"
 * ```
 *
 * @returns {JSX.Element} The work page layout with modular sections
 *
 * @accessibility
 * - Semantic HTML structure with proper landmarks
 * - Skip navigation support via section IDs
 * - Responsive design for all screen sizes
 * - High contrast design for visibility
 *
 * @performance
 * - Modular section components for efficient rendering
 * - Optimized image loading via Next.js Image component
 * - Minimal JavaScript bundle for fast page loads
 */
export default function WorkPage() {
  return (
    <main
      style={{
        background:
          'linear-gradient(to bottom, transparent 0%, #1a2332 40%, #1a2332 100%)',
        minHeight: '100vh',
      }}
    >
      <IntroSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
    </main>
  );
}
