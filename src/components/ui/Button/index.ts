/**
 * @fileoverview Button component exports
 * @component Button, ButtonPrimary
 *
 * @description
 * Export module for Button components and related types.
 * Re-exports the Button and ButtonPrimary components and their TypeScript definitions for easy importing.
 *
 * @example
 * ```tsx
 * import { Button, ButtonPrimary } from '@/components/ui/Button';
 * import type { ButtonProps, ButtonPrimaryProps } from '@/components/ui/Button';
 *
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <ButtonPrimary onClick={handleCTA}>
 *   Let's Collaborate
 * </ButtonPrimary>
 * ```
 */

export { default as Button } from './Button';
export type { ButtonProps } from './Button';
export { default as ButtonPrimary } from './ButtonPrimary';
export type { ButtonPrimaryProps } from './ButtonPrimary';
