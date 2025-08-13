'use client';

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { Modal, ModalBody } from '@/components/ui/Modal/Modal';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Contact Modal Component
 *
 * A branded contact modal that matches the Four Loop design system,
 * featuring the yellow accent styling and external close button.
 *
 * @component
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ContactModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */

interface ContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    project: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);

    // Close modal after submission
    onClose();

    // Reset form
    setFormData({
      email: '',
      project: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
      aria-label='Contact Form Modal'
    >
      <ModalBody>
        {/* Header Section matching Form component styling */}
        <Box
          sx={{
            borderBottom: `1px solid #666`,
            mb: { xs: '16px', md: '24px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
              gap: { xs: '8px', md: '24px' },
              mb: { xs: '12px', md: '16px' },
            }}
          >
            <Typography
              variant='h2'
              component='h2'
              sx={{
                fontSize: {
                  xs: '2rem', // 4xl
                  md: '3.75rem', // 6xl
                },
                fontWeight: 400, // normal
                color: '#1a1a1a',
                lineHeight: 1.2, // tight
                margin: 0,
              }}
            >
              Get in Touch
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: '1rem', // base
                  md: '1.25rem', // xl
                },
                color: '#666',
                fontWeight: 300, // light
              }}
            >
              /&nbsp;&nbsp;&nbsp;&nbsp;Tell us about your project
            </Typography>
          </Box>
        </Box>

        {/* Form Section */}
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            pt: '24px',
            pb: '12px',
          }}
        >
          {/* Form Fields */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& > *:not(:last-child)': {
                mb: '12px',
                mt: '24px',
              },
            }}
          >
            <Input
              type='email'
              label='Where can we reach you?'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder='your.email@example.com'
              variant='filled'
            />

            <Input
              label='What can we help you build?'
              multiline
              variant='filled'
              value={formData.project}
              onChange={(e) => handleInputChange('project', e.target.value)}
              required
              placeholder='Tell us about your project...'
              rows={1}
            />
          </Box>

          {/* Submit Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: '32px',
            }}
          >
            <Button type='submit' variant='primary' colorVariant='secondary'>
              Let&apos;s Talk
            </Button>
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default ContactModal;
