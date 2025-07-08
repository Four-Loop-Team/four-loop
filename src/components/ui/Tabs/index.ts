/**
 * @fileoverview Tabs component exports
 * @component Tabs
 *
 * @description
 * Export module for Tabs component and related types.
 * Provides flexible tabbed interface navigation with multiple variants and orientations.
 *
 * @example
 * ```tsx
 * import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';
 *
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *   </TabList>
 *   <TabPanel value="tab1">Content for tab 1</TabPanel>
 *   <TabPanel value="tab2">Content for tab 2</TabPanel>
 * </Tabs>
 * ```
 */

export { Tab, TabList, TabPanel, Tabs } from './Tabs';
export type {
  TabItem,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsContextValue,
  TabsProps,
} from './types';
