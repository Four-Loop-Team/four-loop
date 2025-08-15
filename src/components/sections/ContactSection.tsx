'use client';

import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input';
import { useState } from 'react';

/**
 * Contact section component
 * Features contact form using the reusable Form component
 *
 * @component
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
export const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // TODO: Implement form submission logic
    console.log('Form submitted:', { email, project });
  };

  return (
    <Form
      id='contact'
      title='Get in Touch'
      description='/&nbsp;&nbsp;&nbsp;&nbsp;Tell us about your project'
      submitText="Let's Talk"
      onSubmit={handleSubmit}
      contained={true}
      accentBackground={true}
    >
      <Input
        type='email'
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
        label='Where can we reach you?'
        placeholder='your.email@example.com'
        variant='filled'
      />

      <Input
        label='What can we help you build?'
        multiline
        variant='filled'
        value={project}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setProject(e.target.value)
        }
        required
        placeholder='Tell us about your project...'
        rows={1}
      />
    </Form>
  );
};
