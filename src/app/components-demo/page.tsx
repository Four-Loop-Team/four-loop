import React from 'react';
import { Metadata } from 'next';
import { Button, Card, CardHeader, CardContent, CardFooter, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'UI Components Demo - Four Loop Digital',
  description: 'Demonstration of the Four Loop Digital UI component library',
};

export default function ComponentsDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Four Loop Digital UI Components
          </h1>
          <p className="text-lg text-gray-600">
            A demonstration of our reusable component library with TypeScript path aliases
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Button Examples */}
          <Card variant="elevated">
            <CardHeader title="Button Components" subtitle="Various button styles and states" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button loading>Loading...</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Examples */}
          <Card variant="elevated">
            <CardHeader title="Input Components" subtitle="Form inputs with validation" />
            <CardContent>
              <div className="space-y-4">
                <Input 
                  label="Email Address" 
                  placeholder="Enter your email"
                  type="email"
                />
                
                <Input 
                  label="Password"
                  type="password"
                  helperText="Must be at least 8 characters"
                />
                
                <Input 
                  label="Username"
                  error="This username is already taken"
                  defaultValue="invalid-username"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card Examples */}
          <Card variant="outlined">
            <CardHeader title="Card Variants" subtitle="Different card styles" />
            <CardContent>
              <div className="space-y-4">
                <Card variant="default" padding="sm">
                  <CardContent>Default card with small padding</CardContent>
                </Card>
                
                <Card variant="elevated" padding="md" hoverable>
                  <CardContent>Elevated card with hover effect</CardContent>
                </Card>
                
                <Card variant="outlined" padding="lg">
                  <CardContent>Outlined card with large padding</CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Path Aliases Demo */}
          <Card variant="elevated">
            <CardHeader 
              title="Path Aliases" 
              subtitle="Clean imports with TypeScript"
            />
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-md">
                <code className="text-sm">
                  <div className="text-green-600">// ✅ Clean imports</div>
                  <div>import {`{ Button, Card }`} from '@/components/ui';</div>
                  <div>import {`{ ROUTES }`} from '@/constants';</div>
                  <div>import {`{ formatCurrency }`} from '@/utils';</div>
                  <br />
                  <div className="text-red-600">// ❌ Old relative paths</div>
                  <div>import Button from '../../../components/ui/Button';</div>
                </code>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => window.open('/docs/architecture/UI_COMPONENT_LIBRARY.md')}
              >
                View Documentation
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card variant="default">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Enterprise-Ready Component Library</h2>
              <p className="text-gray-600 mb-4">
                Built with TypeScript, tested with Jest, and documented comprehensively.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="primary" onClick={() => window.location.href = ROUTES.HOME}>
                  Back to Home
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://github.com/fourloop/digital')}
                >
                  View Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
