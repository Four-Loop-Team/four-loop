'use client';

import {
  // Advanced Components
  Accordion,
  // Basic UI Components
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chart,
  DataTable,
  Dropdown,
  FileUpload,
  Form,
  Input,
  Modal,
  RichTextEditor,
  Sticky,
  StickyHeader,
  Tabs,
  Timeline,
} from '@/components/ui';
import { useState } from 'react';

export default function ComponentsDemo() {
  const [showModal, setShowModal] = useState(false);
  const [_formData, setFormData] = useState({});
  const [richTextContent, setRichTextContent] = useState('');

  // Sample data for components
  const accordionItems = [
    {
      id: '1',
      trigger: 'Getting Started',
      content:
        'Learn how to use our component library with TypeScript and Tailwind CSS.',
    },
    {
      id: '2',
      trigger: 'Advanced Features',
      content:
        'Explore advanced features like keyboard navigation and accessibility.',
    },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  ];

  const tableColumns = [
    { id: 'name', header: 'Name', accessor: 'name' as const, sortable: true },
    {
      id: 'email',
      header: 'Email',
      accessor: 'email' as const,
      sortable: true,
    },
    { id: 'role', header: 'Role', accessor: 'role' as const, sortable: false },
  ];

  const chartData = [
    {
      label: 'Sales',
      data: [
        { x: 'Jan', y: 65 },
        { x: 'Feb', y: 59 },
        { x: 'Mar', y: 80 },
        { x: 'Apr', y: 81 },
        { x: 'May', y: 56 },
        { x: 'Jun', y: 55 },
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
    },
  ];

  const timelineItems = [
    {
      id: '1',
      title: 'Project Started',
      description: 'Initial project setup and planning',
      timestamp: new Date('2024-01-01'),
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'First Release',
      description: 'Released v1.0 with basic components',
      timestamp: new Date('2024-06-01'),
      status: 'completed' as const,
    },
  ];

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <StickyHeader className='bg-white shadow-sm border-b'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <h1 className='text-3xl font-bold text-gray-900'>
            🧩 Component Showcase
          </h1>
          <p className='text-lg text-gray-600 mt-2'>
            Interactive demonstration of all UI components
          </p>
        </div>
      </StickyHeader>

      <div className='max-w-6xl mx-auto px-4 mt-8'>
        <div className='grid gap-8'>
          {/* Basic Components */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>
              📱 Advanced Components
            </h2>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {/* Buttons */}
              <Card variant='elevated'>
                <CardHeader
                  title='Buttons'
                  subtitle='Various button styles and states'
                />
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex flex-wrap gap-2'>
                      <Button variant='primary'>Primary</Button>
                      <Button variant='secondary'>Secondary</Button>
                      <Button variant='outline'>Outline</Button>
                      <Button variant='ghost'>Ghost</Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <Button size='sm'>Small</Button>
                      <Button size='md'>Medium</Button>
                      <Button size='lg'>Large</Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <Button loading>Loading...</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs */}
              <Card variant='elevated'>
                <CardHeader
                  title='Form Inputs'
                  subtitle='Input fields with validation'
                />
                <CardContent>
                  <div className='space-y-4'>
                    <Input
                      label='Email Address'
                      placeholder='Enter your email'
                      type='email'
                    />
                    <Input
                      label='Password'
                      type='password'
                      helperText='Must be at least 8 characters'
                    />
                    <Input
                      label='Username'
                      error='This username is already taken'
                      defaultValue='invalid-username'
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dropdown */}
              <Card variant='elevated'>
                <CardHeader
                  title='Dropdown'
                  subtitle='Select components with search'
                />
                <CardContent>
                  <div className='space-y-4'>
                    <Dropdown
                      options={dropdownOptions}
                      placeholder='Select an option'
                      onChange={(value) => {
                        // eslint-disable-next-line no-console
                        console.log('Selected:', value);
                      }}
                    />
                    <Dropdown
                      options={dropdownOptions}
                      multiple
                      placeholder='Multi-select'
                      onChange={(values) => {
                        // eslint-disable-next-line no-console
                        console.log('Selected:', values);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Interactive Components */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>
              🎛️ Interactive Components
            </h2>
            <div className='grid gap-8 md:grid-cols-2'>
              {/* Accordion */}
              <Card variant='elevated'>
                <CardHeader
                  title='Accordion'
                  subtitle='Collapsible content sections'
                />
                <CardContent>
                  <Accordion items={accordionItems} />
                </CardContent>
              </Card>

              {/* Tabs */}
              <Card variant='elevated'>
                <CardHeader
                  title='Tabs'
                  subtitle='Tabbed interface component'
                />
                <CardContent>
                  <Tabs
                    items={[
                      {
                        id: 'tab1',
                        label: 'Overview',
                        content: <p>Overview content goes here.</p>,
                      },
                      {
                        id: 'tab2',
                        label: 'Features',
                        content: <p>Features and capabilities.</p>,
                      },
                      {
                        id: 'tab3',
                        label: 'Settings',
                        content: <p>Configuration options.</p>,
                      },
                    ]}
                    defaultActiveTab='tab1'
                  />
                </CardContent>
              </Card>

              {/* Modal */}
              <Card variant='elevated'>
                <CardHeader title='Modal' subtitle='Dialog and modal windows' />
                <CardContent>
                  <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                  <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    aria-label='Example Modal'
                  >
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold mb-2'>
                        Example Modal
                      </h3>
                      <p>
                        This is a modal dialog with proper focus management and
                        accessibility.
                      </p>
                      <div className='mt-4 flex gap-2'>
                        <Button
                          variant='primary'
                          onClick={() => setShowModal(false)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant='outline'
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card variant='elevated'>
                <CardHeader
                  title='Timeline'
                  subtitle='Event timeline component'
                />
                <CardContent>
                  <Timeline items={timelineItems} />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Data Components */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>📊 Data Display</h2>
            <div className='grid gap-8'>
              {/* DataTable */}
              <Card variant='elevated'>
                <CardHeader
                  title='Data Table'
                  subtitle='Advanced table with sorting and filtering'
                />
                <CardContent>
                  <DataTable
                    data={tableData}
                    columns={tableColumns}
                    sortable
                    filterable
                    pagination={{
                      page: 0,
                      pageSize: 5,
                      total: tableData.length,
                    }}
                  />
                </CardContent>
              </Card>

              {/* Chart */}
              <Card variant='elevated'>
                <CardHeader
                  title='Charts'
                  subtitle='Data visualization components'
                />
                <CardContent>
                  <Chart
                    type='line'
                    data={chartData}
                    options={{ responsive: true }}
                    width={600}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Form Components */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>📝 Form Components</h2>
            <div className='grid gap-8 md:grid-cols-2'>
              {/* Calendar */}
              <Card variant='elevated'>
                <CardHeader
                  title='Calendar'
                  subtitle='Date picker and calendar'
                />
                <CardContent>
                  <Calendar
                    value={new Date()}
                    onChange={(date) => {
                      // eslint-disable-next-line no-console
                      console.log('Selected date:', date);
                    }}
                  />
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card variant='elevated'>
                <CardHeader
                  title='File Upload'
                  subtitle='File drag-and-drop upload'
                />
                <CardContent>
                  <FileUpload
                    accept='image/*,.pdf'
                    maxSize={10 * 1024 * 1024}
                    multiple
                    dragAndDrop
                    showProgress
                    onUpload={(files) => {
                      // eslint-disable-next-line no-console
                      console.log('Uploaded files:', files);
                    }}
                  />
                </CardContent>
              </Card>

              {/* Rich Text Editor */}
              <Card variant='elevated' className='md:col-span-2'>
                <CardHeader
                  title='Rich Text Editor'
                  subtitle='Rich text editing capabilities'
                />
                <CardContent>
                  <RichTextEditor
                    value={richTextContent}
                    onChange={setRichTextContent}
                    toolbar={{
                      formatting: true,
                      alignment: true,
                      lists: true,
                    }}
                    height={200}
                  />
                </CardContent>
              </Card>

              {/* Form */}
              <Card variant='elevated' className='md:col-span-2'>
                <CardHeader
                  title='Advanced Form'
                  subtitle='Complete form with validation'
                />
                <CardContent>
                  <Form
                    onSubmit={(data) => {
                      setFormData(data);
                      // eslint-disable-next-line no-console
                      console.log('Form submitted:', data);
                    }}
                  >
                    <div className='grid md:grid-cols-2 gap-4'>
                      <Input name='name' label='Full Name' />
                      <Input name='email' label='Email Address' type='email' />
                      <Input
                        name='message'
                        label='Message'
                        type='textarea'
                        className='md:col-span-2'
                      />
                    </div>
                    <div className='mt-6'>
                      <Button type='submit' variant='primary'>
                        Submit Form
                      </Button>
                    </div>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Navigation Components */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>🧭 Navigation</h2>
            <div className='grid gap-8'>
              <Card variant='elevated'>
                <CardHeader
                  title='Sticky Header'
                  subtitle='Navigation that sticks to the top of the page'
                />
                <CardContent>
                  <div className='border rounded-lg overflow-hidden'>
                    <StickyHeader className='bg-blue-600 text-white'>
                      <div className='flex items-center justify-between px-4 py-3'>
                        <div className='flex items-center gap-4'>
                          <h3 className='font-semibold'>Brand</h3>
                          <nav className='hidden md:flex gap-4'>
                            <Button variant='ghost' size='sm'>
                              Home
                            </Button>
                            <Button variant='ghost' size='sm'>
                              About
                            </Button>
                            <Button variant='ghost' size='sm'>
                              Services
                            </Button>
                            <Button variant='ghost' size='sm'>
                              Contact
                            </Button>
                          </nav>
                        </div>
                        <Button variant='ghost' size='sm'>
                          Menu
                        </Button>
                      </div>
                    </StickyHeader>
                    <div className='p-4 bg-gray-50 text-center'>
                      <p className='text-gray-600'>Page content goes here...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sticky Demo */}
          <section>
            <h2 className='text-2xl font-semibold mb-6'>
              🎨 Layout & Structure
            </h2>
            <Card variant='elevated'>
              <CardHeader
                title='Sticky Component'
                subtitle='Elements that stick to viewport'
              />
              <CardContent>
                <Sticky position='top' offset={20}>
                  <div className='bg-blue-100 border border-blue-300 rounded p-4'>
                    This element will stick to the top when scrolling
                  </div>
                </Sticky>
                <div className='mt-4 h-96 bg-gray-100 rounded p-4'>
                  <p>Scroll down to see the sticky element in action...</p>
                  <div className='space-y-4 mt-8'>
                    {Array.from({ length: 10 }, (_, i) => (
                      <p key={i} className='text-gray-600'>
                        This is some content to demonstrate scrolling. Line{' '}
                        {i + 1}.
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Path Aliases Demo */}
          <Card variant='elevated'>
            <CardHeader
              title='Path Aliases'
              subtitle='Clean imports with TypeScript'
            />
            <CardContent>
              <div className='bg-gray-100 p-4 rounded-md'>
                <code className='text-sm'>
                  <div className='text-green-600'>{`// ✅ Clean imports`}</div>
                  <div>
                    import {`{ Button, Card }`} from
                    &apos;@/components/ui&apos;;
                  </div>
                  <div>import {`{ ROUTES }`} from &apos;@/constants&apos;;</div>
                  <div>
                    import {`{ formatCurrency }`} from &apos;@/utils&apos;;
                  </div>
                  <br />
                  <div className='text-red-600'>{`// ❌ Old relative paths`}</div>
                  <div>
                    import Button from
                    &apos;../../../components/ui/Button&apos;;
                  </div>
                </code>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='outline'
                onClick={() =>
                  window.open('/docs/architecture/UI_COMPONENT_LIBRARY.md')
                }
              >
                View Documentation
              </Button>
            </CardFooter>
          </Card>

          {/* Footer */}
          <div className='mt-12 text-center'>
            <Card variant='default'>
              <CardContent>
                <h2 className='text-xl font-semibold mb-2'>
                  Enterprise-Ready Component Library
                </h2>
                <p className='text-gray-600 mb-4'>
                  Built with TypeScript, tested with Jest, and documented
                  comprehensively. All components support theming. Built with
                  accessibility in mind. Responsive design included for all
                  screen sizes.
                </p>
                <div className='flex justify-center gap-4'>
                  <Button
                    variant='primary'
                    onClick={() => (window.location.href = '/')}
                  >
                    Back to Home
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() =>
                      window.open('https://github.com/fourloop/digital')
                    }
                  >
                    View Source
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
