'use client';

import { GridSystemDemo } from '@/components/system';
import {
  Accordion,
  Button,
  ButtonPrimary,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DataTable,
  Input,
  Timeline,
  useToast,
} from '@/components/ui';
import {
  Box,
  Chip,
  Container,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function ComponentSection({
  title,
  description,
  status,
  children,
}: {
  title: string;
  description: string;
  status: 'stable' | 'beta' | 'experimental';
  children: React.ReactNode;
}) {
  const statusColors = {
    stable: 'success',
    beta: 'warning',
    experimental: 'info',
  } as const;

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 1 }}>
          <Typography variant='h5' component='h3'>
            {title}
          </Typography>
          <Chip
            label={status}
            color={statusColors[status]}
            size='small'
            variant='outlined'
          />
        </Stack>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {description}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
}

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const toast = useToast();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Sample data for DataTable
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ];

  // Sample data for Accordion
  const accordionItems = [
    {
      id: 'getting-started',
      trigger: 'Getting Started',
      content:
        'Learn how to use our component library with TypeScript, React 19, and Tailwind CSS.',
    },
    {
      id: 'customization',
      trigger: 'Customization',
      content:
        'Components can be customized using Tailwind CSS classes and Material-UI theming.',
    },
    {
      id: 'accessibility',
      trigger: 'Accessibility Features',
      content:
        'All components include proper ARIA labels and keyboard navigation support.',
    },
  ];

  // Sample data for Timeline
  const timelineItems = [
    {
      id: '1',
      title: 'Project Initialization',
      content: 'Set up Next.js 15 with React 19 and TypeScript',
      timestamp: '2025-01-01',
    },
    {
      id: '2',
      title: 'Component Library Development',
      content: 'Built comprehensive UI component library with accessibility',
      timestamp: '2025-03-15',
    },
    {
      id: '3',
      title: 'Testing Implementation',
      content: 'Achieved 1,215 tests with 85.44% coverage',
      timestamp: '2025-06-01',
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h2' component='h1' gutterBottom>
          Component Showcase
        </Typography>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          Interactive demonstration of all UI components in the Four Loop
          Digital design system
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          This showcase demonstrates all available components with their various
          states, configurations, and usage examples. All components are built
          with accessibility, performance, and developer experience in mind.
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <MuiTabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label='component categories'
        >
          <MuiTab label='Basic Components' />
          <MuiTab label='Form Components' />
          <MuiTab label='Data Display' />
          <MuiTab label='Grid System' />
          <MuiTab label='Feedback' />
        </MuiTabs>
      </Box>

      {/* Basic Components */}
      <CustomTabPanel value={activeTab} index={0}>
        <ComponentSection
          title='Buttons'
          description='Primary and secondary button components with multiple variants and states'
          status='stable'
        >
          <Stack spacing={2} direction='column'>
            <Typography variant='h6' component='h3'>
              Standard Button Variants
            </Typography>
            <Stack spacing={2} direction='row' flexWrap='wrap'>
              <Button variant='primary'>Primary Button</Button>
              <Button variant='secondary'>Secondary Button</Button>
              <Button variant='outline'>Outline Button</Button>
              <Button variant='ghost'>Ghost Button</Button>
            </Stack>

            <Typography variant='h6' component='h3' sx={{ mt: 3 }}>
              Specialized Primary Button (CTA)
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              The ButtonPrimary component is a specialized call-to-action button
              with built-in arrow icon. Note: Button variant=&quot;primary&quot;
              now uses ButtonPrimary internally.
            </Typography>
            <Stack spacing={2} direction='row' flexWrap='wrap'>
              <ButtonPrimary>Let&apos;s Collaborate</ButtonPrimary>
              <ButtonPrimary disabled>Disabled CTA</ButtonPrimary>
            </Stack>

            <Typography variant='h6' component='h3' sx={{ mt: 3 }}>
              Button Sizes
            </Typography>
            <Stack spacing={2} direction='row' flexWrap='wrap'>
              <Button variant='secondary' size='sm'>
                Small
              </Button>
              <Button variant='secondary' size='md'>
                Medium
              </Button>
              <Button variant='secondary' size='lg'>
                Large
              </Button>
            </Stack>
          </Stack>
        </ComponentSection>

        <ComponentSection
          title='Cards'
          description='Flexible container components with header, content, and footer sections'
          status='stable'
        >
          <Stack spacing={3} direction='row' flexWrap='wrap'>
            <Box sx={{ maxWidth: 300 }}>
              <Card variant='elevated'>
                <CardHeader
                  title='Elevated Card'
                  subtitle='With shadow elevation'
                />
                <CardContent>
                  <Typography variant='body2'>
                    This is an elevated card with a subtle shadow effect.
                  </Typography>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' size='sm'>
                    Action
                  </Button>
                </CardFooter>
              </Card>
            </Box>

            <Box sx={{ maxWidth: 300 }}>
              <Card variant='outlined'>
                <CardHeader
                  title='Outlined Card'
                  subtitle='With border outline'
                />
                <CardContent>
                  <Typography variant='body2'>
                    This is an outlined card with a clean border design.
                  </Typography>
                </CardContent>
                <CardFooter>
                  <Button variant='primary' size='sm'>
                    Primary Action
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          </Stack>
        </ComponentSection>

        <ComponentSection
          title='Input Fields'
          description='Form input components with validation states and icons'
          status='stable'
        >
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <Input label='Basic Input' placeholder='Enter some text...' />
            <Input
              label='Email Address'
              type='email'
              placeholder='user@example.com'
              helperText="We'll never share your email"
            />
            <Input
              label='Password'
              type='password'
              placeholder='Enter password'
              error='Password must be at least 8 characters'
            />
            <Input
              label='Disabled Input'
              value='Cannot edit this field'
              disabled
            />
          </Stack>
        </ComponentSection>
      </CustomTabPanel>

      {/* Form Components */}
      <CustomTabPanel value={activeTab} index={1}>
        <ComponentSection
          title='Calendar & Date Picker'
          description='Date selection components with range support and constraints'
          status='stable'
        >
          <Box sx={{ maxWidth: 400 }}>
            <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date as Date | null)}
            />
          </Box>
        </ComponentSection>
      </CustomTabPanel>

      {/* Data Display */}
      <CustomTabPanel value={activeTab} index={2}>
        <ComponentSection
          title='Data Table'
          description='Feature-rich table with sorting, filtering, and pagination'
          status='stable'
        >
          <DataTable
            data={tableData}
            columns={[
              { id: 'name', header: 'Name', accessor: 'name' },
              { id: 'email', header: 'Email', accessor: 'email' },
              { id: 'role', header: 'Role', accessor: 'role' },
            ]}
          />
        </ComponentSection>

        <ComponentSection
          title='Timeline'
          description='Vertical timeline component for displaying chronological events'
          status='stable'
        >
          <Timeline items={timelineItems} orientation='vertical' />
        </ComponentSection>

        <ComponentSection
          title='Accordion'
          description='Collapsible content panels with smooth animations'
          status='stable'
        >
          <Accordion
            items={accordionItems}
            variant='minimal'
            multiple={false}
            collapsible={true}
          />
        </ComponentSection>
      </CustomTabPanel>

      {/* Grid System */}
      <CustomTabPanel value={activeTab} index={3}>
        <ComponentSection
          title='Dual Grid System'
          description='12-column responsive layout combined with 8px spacing system'
          status='stable'
        >
          <GridSystemDemo />
        </ComponentSection>
      </CustomTabPanel>

      {/* Feedback */}
      <CustomTabPanel value={activeTab} index={4}>
        <ComponentSection
          title='Toast Notifications'
          description='Global notification system with context provider'
          status='stable'
        >
          <Typography variant='body2' sx={{ mb: 2 }}>
            Toast notifications appear automatically and support different types
            (success, warning, error, info) with customizable duration and
            actions.
          </Typography>
          <Stack spacing={2} direction='row' flexWrap='wrap'>
            <Button
              variant='outline'
              onClick={() => {
                toast?.success?.('This is a success notification');
              }}
            >
              Show Success Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                toast?.warning?.('This is a warning message');
              }}
            >
              Show Warning Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                toast?.info?.('This is an informational message');
              }}
            >
              Info Toast
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                toast?.error?.('Something went wrong');
              }}
            >
              Error Toast
            </Button>
          </Stack>
        </ComponentSection>
      </CustomTabPanel>
    </Container>
  );
}
