import { redirect } from 'next/navigation';

/**
 * Homepage component that redirects to the work page.
 *
 * This serves as the root page that immediately redirects users to the
 * main work showcase page where all the content and portfolio is displayed.
 * This approach keeps the navigation structure clean and logical.
 *
 * @component
 * @example
 * ```tsx
 * // Rendered automatically by Next.js at the root route "/"
 * // Automatically redirects to "/work"
 * ```
 *
 * @returns {null} No JSX is returned as this component redirects
 *
 * @performance
 * - Server-side redirect for immediate navigation
 * - No unnecessary content loading on root route
 */
export default function HomePage() {
  redirect('/work');
  return null; // This won't be reached, but helps with TypeScript
}
