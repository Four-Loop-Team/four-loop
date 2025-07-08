/**
 * @fileoverview Timeline component exports
 * @component Timeline
 *
 * @description
 * Export module for Timeline component showing chronological events and progress.
 * Provides flexible timeline visualization for displaying chronological data and process steps.
 *
 * @example
 * ```tsx
 * import { Timeline, TimelineItem } from '@/components/ui/Timeline';
 * import type { TimelineItemType } from '@/components/ui/Timeline';
 *
 * const items: TimelineItemType[] = [
 *   { timestamp: new Date(), title: 'Event 1', description: 'Description' },
 *   { timestamp: new Date(), title: 'Event 2', description: 'Description' }
 * ];
 *
 * <Timeline items={items} orientation="vertical" />
 * ```
 */

export { Timeline, TimelineItemComponent as TimelineItem } from './Timeline';
export type {
  TimelineAction,
  TimelineItemProps,
  TimelineItem as TimelineItemType,
  TimelineProps,
} from './types';
