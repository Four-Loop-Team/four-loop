'use client';

import { Button } from '@/components/ui';
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';

interface PresentationCardProps {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  filename: string;
  status: 'ready' | 'draft' | 'planned';
}

const presentations: PresentationCardProps[] = [
  {
    title: 'Design Tokens System',
    description:
      'Comprehensive overview of our design token system, including brand colors, typography scale, and implementation guidelines.',
    duration: '15-20 minutes',
    topics: [
      'Design Tokens',
      'Brand Colors',
      'Typography',
      'CSS/SCSS Implementation',
    ],
    filename: 'design-tokens',
    status: 'ready',
  },
  {
    title: 'Design Tokens: Complete Guide',
    description:
      'Comprehensive presentation covering token architecture, business value, implementation strategies, and developer experience.',
    duration: '30-35 minutes',
    topics: [
      'Token Architecture',
      'Business Value',
      'Multi-Platform Output',
      'Developer Experience',
    ],
    filename: 'design-tokens-presentation',
    status: 'ready',
  },
  {
    title: 'Design System Overview',
    description:
      "Complete guide to Four Loop's design system architecture, components, and best practices.",
    duration: '25-30 minutes',
    topics: ['Design System', 'Components', 'Architecture', 'Best Practices'],
    filename: 'design-system',
    status: 'ready',
  },
  {
    title: 'Color Guidelines',
    description:
      'Detailed exploration of our brand color palette, usage guidelines, and accessibility considerations.',
    duration: '15-20 minutes',
    topics: [
      'Brand Colors',
      'Accessibility',
      'Usage Guidelines',
      'Color Theory',
    ],
    filename: 'color-guidelines',
    status: 'ready',
  },
];

function PresentationCard({
  title,
  description,
  duration,
  topics,
  filename,
  status,
}: PresentationCardProps) {
  const statusColors = {
    ready: 'success',
    draft: 'warning',
    planned: 'info',
  } as const;

  const statusLabels = {
    ready: 'Ready to Present',
    draft: 'In Development',
    planned: 'Planning Phase',
  } as const;

  const handlePresentationClick = () => {
    // Map filename to static HTML file
    const staticFileMap: Record<string, string> = {
      'design-tokens': 'design-tokens-reveal.html',
      'design-tokens-presentation': 'design-tokens-comprehensive.html',
      'design-system': 'design-system-reveal.html',
      'color-guidelines': 'color-guidelines-reveal.html',
    };

    const staticFile = staticFileMap[filename] || 'design-tokens-reveal.html';
    const staticUrl = `/presentations/${staticFile}`;
    window.open(staticUrl, '_blank', 'width=1200,height=800');
  };

  const handleStaticClick = () => {
    const staticUrl = `/presentations/design-tokens-reveal.html`;
    window.open(staticUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          {/* Left side - Main info */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h4' component='h3' gutterBottom>
                {title}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: `${statusColors[status]}.light`,
                  color: `${statusColors[status]}.contrastText`,
                  display: 'inline-block',
                  fontWeight: 600,
                }}
              >
                {statusLabels[status]}
              </Typography>
            </Box>

            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              {description}
            </Typography>

            <Typography variant='body1' sx={{ mb: 2 }}>
              <strong>Duration:</strong> {duration}
            </Typography>

            <Box>
              <Typography variant='body1' sx={{ mb: 1 }}>
                <strong>Topics:</strong>
              </Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                {topics.map((topic) => (
                  <Typography
                    key={topic}
                    variant='body2'
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: 'grey.100',
                      borderRadius: 1,
                    }}
                  >
                    {topic}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Right side - Actions */}
          <Box sx={{ flexShrink: 0 }}>
            <Stack spacing={2}>
              <Button
                variant='primary'
                size='lg'
                onClick={handlePresentationClick}
                disabled={status === 'planned'}
              >
                Start Presentation
              </Button>
              {filename === 'design-tokens' && (
                <Button variant='outline' size='lg' onClick={handleStaticClick}>
                  Static Version
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function PresentationsPage() {
  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign='center'>
          <Typography variant='h2' component='h1' gutterBottom>
            Design System Presentations
          </Typography>
          <Typography variant='h6' color='text.secondary' sx={{ mb: 4 }}>
            Interactive reveal.js presentations generated from our documentation
          </Typography>
        </Box>

        {/* Presentations List */}
        <Stack spacing={3}>
          {presentations.map((presentation) => (
            <PresentationCard key={presentation.filename} {...presentation} />
          ))}
        </Stack>

        {/* Additional Info */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            borderRadius: 2,
            bgcolor: 'grey.50',
            textAlign: 'center',
          }}
        >
          <Typography variant='h6' gutterBottom>
            🎯 Professional Presentation Features
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            All presentations include: Keyboard navigation (←/→/↑/↓), fullscreen
            mode (F), slide counter, progress bar, and smooth transitions.
            Perfect for client meetings, team training, and stakeholder reviews.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
