import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(3),
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

const HiddenField = styled('input')({
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
});

interface ContactFormWithBackendProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
  website: string;
  mathAnswer: string;
}

interface MathQuestion {
  question: string;
  answer: number;
}

export default function ContactFormWithBackend({
  onSuccess,
  onError,
}: ContactFormWithBackendProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
    website: '',
    mathAnswer: '',
  });

  const [mathQuestion, setMathQuestion] = useState<MathQuestion>({
    question: '',
    answer: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [formStartTime] = useState(Date.now());

  // Generate a simple math question for CAPTCHA
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';

    if (operator === '+') {
      setMathQuestion({
        question: `What is ${num1} + ${num2}?`,
        answer: num1 + num2,
      });
    } else {
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      setMathQuestion({
        question: `What is ${larger} - ${smaller}?`,
        answer: larger - smaller,
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          mathQuestion: mathQuestion.question,
          formStartTime: formStartTime.toString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details && Array.isArray(result.details)) {
          setErrors(result.details);
        } else {
          setErrors([result.error || 'Something went wrong']);
        }
        onError?.(result.error || 'Something went wrong');
        return;
      }

      // Success!
      setSuccessMessage(
        result.message || 'Your message has been sent successfully!'
      );
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
        website: '',
        mathAnswer: '',
      });

      // Generate new math question
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operator = Math.random() > 0.5 ? '+' : '-';

      if (operator === '+') {
        setMathQuestion({
          question: `What is ${num1} + ${num2}?`,
          answer: num1 + num2,
        });
      } else {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        setMathQuestion({
          question: `What is ${larger} - ${smaller}?`,
          answer: larger - smaller,
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(['Network error. Please try again.']);
      onError?.('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant='h4' component='h2' gutterBottom align='center'>
        Get In Touch
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        paragraph
        align='center'
      >
        Ready to start your next project? Let&apos;s discuss how we can help
        bring your vision to life.
      </Typography>

      {/* Honeypot fields - hidden from users but visible to bots */}
      <HiddenField
        type='text'
        name='honeypot'
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete='off'
      />
      <HiddenField
        type='url'
        name='website'
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete='off'
        placeholder='Your website URL'
      />

      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          id='name'
          name='name'
          label='Your Name'
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors.some((error) => error.toLowerCase().includes('name'))}
        />

        <TextField
          fullWidth
          required
          id='email'
          name='email'
          label='Your Email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors.some((error) => error.toLowerCase().includes('email'))}
        />

        <TextField
          fullWidth
          required
          id='subject'
          name='subject'
          label='Subject'
          value={formData.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors.some((error) =>
            error.toLowerCase().includes('subject')
          )}
        />

        <TextField
          fullWidth
          required
          id='message'
          name='message'
          label='Your Message'
          multiline
          rows={6}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors.some((error) =>
            error.toLowerCase().includes('message')
          )}
          helperText='Please describe your project or inquiry in detail'
        />

        {/* Math CAPTCHA */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
          <Typography
            variant='body2'
            component='label'
            htmlFor='mathAnswer'
            sx={{ mb: 1, display: 'block' }}
          >
            Security Question: {mathQuestion.question}
          </Typography>
          <TextField
            required
            id='mathAnswer'
            name='mathAnswer'
            label='Your Answer'
            type='number'
            value={formData.mathAnswer}
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.some(
              (error) =>
                error.toLowerCase().includes('security') ||
                error.toLowerCase().includes('verification')
            )}
            sx={{ '& .MuiInputBase-root': { backgroundColor: 'white' } }}
          />
        </Box>

        {errors.length > 0 && (
          <Alert severity='error' sx={{ mb: 2 }}>
            <Typography variant='body2'>
              {errors.length === 1
                ? errors[0]
                : 'Please fix the following issues:'}
            </Typography>
            {errors.length > 1 && (
              <Box component='ul' sx={{ mt: 1, mb: 0, pl: 2 }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </Box>
            )}
          </Alert>
        )}

        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          disabled={isSubmitting}
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: '#e2e891',
            color: '#000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#d4db7a',
            },
            '&:disabled': {
              backgroundColor: 'grey.400',
            },
          }}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
}
