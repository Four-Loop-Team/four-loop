/**
 * @fileoverview Accordion component exports
 * @component Accordion
 *
 * @description
 * Export module for Accordion, AccordionItem, Collapsible components and related types.
 * Provides expandable content sections with single or multiple expansion modes.
 *
 * @example
 * ```tsx
 * import { Accordion, AccordionItem, Collapsible } from '@/components/ui/Accordion';
 *
 * <Accordion>
 *   <AccordionItem title="Section 1">
 *     <p>Content for section 1</p>
 *   </AccordionItem>
 *   <AccordionItem title="Section 2">
 *     <p>Content for section 2</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

export { Accordion, AccordionItem, Collapsible } from './Accordion';
export type {
  AccordionContextValue,
  AccordionItemProps,
  AccordionItem as AccordionItemType,
  AccordionProps,
  CollapsibleProps,
} from './types';
