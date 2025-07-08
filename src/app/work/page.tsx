import { redirect } from 'next/navigation';

/**
 * Work page redirect
 * Since the work page content is now the homepage, redirect to the root
 */
export default function WorkPage() {
  redirect('/');
  return null; // This won't be reached, but helps with TypeScript
}
