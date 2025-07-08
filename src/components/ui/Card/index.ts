/**
 * @fileoverview Card component exports
 * @component Card
 *
 * @description
 * Export module for Card components (Card, CardHeader, CardContent, CardFooter) and related types.
 * Provides a comprehensive set of card components for creating structured content layouts.
 *
 * @example
 * ```tsx
 * import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
 *
 * <Card>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <button>Action</button>
 *   </CardFooter>
 * </Card>
 * ```
 */

export { default as Card, CardContent, CardFooter, CardHeader } from './Card';
export type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from './Card';
