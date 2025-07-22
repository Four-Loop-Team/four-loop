/**
 * @fileoverview Button component exports
 * @component Button
 *
 * @description
 * Export module for Button components and related types.
 * Re-exports the Button component and its TypeScript definitions for easy importing.
 * The Button component now includes integrated primary variant functionality.
 *
 * @example
 * ```tsx
 * import { Button } from '@/components/ui/Button';
 * import type { ButtonProps } from '@/components/ui/Button';
 *
 * <Button variant="primary" onClick={handleClick}>
 *   Let's Collaborate
 * </Button>
 *
 * <Button variant="secondary" onClick={handleClick}>
 *   Secondary Action
 * </Button>
 * ```
 */

export { default as Button } from './Button';
export type { ButtonProps } from './Button';
