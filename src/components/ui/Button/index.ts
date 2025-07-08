/**
 * @fileoverview Button component exports
 * @component Button
 *
 * @description
 * Export module for Button component and related types.
 * Re-exports the Button component and its TypeScript definitions for easy importing.
 *
 * @example
 * ```tsx
 * import { Button } from '@/components/ui/Button';
 * import type { ButtonProps } from '@/components/ui/Button';
 *
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

export { default as Button } from './Button';
export type { ButtonProps } from './Button';
