import { ContactSection } from '@/components/sections/ContactSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ServicesSection } from '@/components/sections/ServicesSection';

/**
 * Main application homepage component.
 *
 * This is the root page component that renders the Four Loop Digital
 * homepage with modular sections for intro, services, partners, and contact.
 * Implements responsive design and accessibility best practices.
 *
 * @component
 * @example
 * ```tsx
 * // Rendered automatically by Next.js at the root route
 * // No direct usage required - this is the page component for "/"
 * ```
 *
 * @returns {JSX.Element} The homepage layout with modular sections
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
export default function App() {
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
