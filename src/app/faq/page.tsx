import { generateMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Frequently Asked Questions',
  description:
    "Find answers to common questions about Four Loop Digital's services, development process, pricing, and project timelines.",
  keywords: ['FAQ', 'questions', 'answers', 'help', 'support', 'information'],
});

export default function FAQPage() {
  const webPageSchema = generateWebPageSchema({
    name: 'FAQ - Four Loop Digital',
    description:
      'Frequently asked questions about our digital consulting services.',
    url: 'https://fourloop.digital/faq',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Four Loop Digital offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Four Loop Digital specializes in three core areas: Web Development (custom web applications, e-commerce, PWAs), Mobile App Development (iOS, Android, cross-platform), and Digital Consulting (strategy, architecture, cloud migration). We use modern technologies like React, Next.js, React Native, and cloud platforms to deliver scalable solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on complexity and scope. Simple websites typically take 4-8 weeks, custom web applications 8-16 weeks, and mobile apps 12-24 weeks. We provide detailed project timelines during our initial consultation and maintain regular communication throughout the development process.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your development process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We follow a proven 4-phase process: 1) Discovery & Planning - understanding your needs and requirements, 2) Design & Architecture - creating user-centered designs and technical architecture, 3) Development & Testing - agile development with continuous testing and feedback, 4) Deployment & Support - production launch with ongoing maintenance and support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide ongoing support and maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance optimization, feature enhancements, and technical support. We provide various maintenance packages to fit different needs and budgets, ensuring your digital solutions remain secure and up-to-date.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms (AWS, Vercel, Firebase). For mobile development, we use React Native, Flutter, Swift, and Kotlin. Our consulting services cover cloud architecture, DevOps, and data analytics platforms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you work with our existing team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! We excel at collaboration and can integrate seamlessly with your existing development team, provide technical leadership, conduct code reviews, offer training, or work as an extension of your team. We adapt our approach to complement your internal processes and team structure.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you ensure project quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quality is ensured through multiple approaches: comprehensive testing (unit, integration, end-to-end), code reviews, automated CI/CD pipelines, performance monitoring, security audits, and regular client feedback sessions. We follow industry best practices and maintain high coding standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Four Loop Digital different?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our unique combination of technical expertise, strategic thinking, and client-focused approach sets us apart. We don't just build software - we solve business problems. Our team brings deep experience in modern technologies, proven methodologies, and a commitment to delivering solutions that drive real business value.",
        },
      },
    ],
  };

  const faqs = [
    {
      question: 'What services does Four Loop Digital offer?',
      answer:
        'Four Loop Digital specializes in three core areas: Web Development (custom web applications, e-commerce, PWAs), Mobile App Development (iOS, Android, cross-platform), and Digital Consulting (strategy, architecture, cloud migration). We use modern technologies like React, Next.js, React Native, and cloud platforms to deliver scalable solutions.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary based on complexity and scope. Simple websites typically take 4-8 weeks, custom web applications 8-16 weeks, and mobile apps 12-24 weeks. We provide detailed project timelines during our initial consultation and maintain regular communication throughout the development process.',
    },
    {
      question: 'What is your development process?',
      answer:
        'We follow a proven 4-phase process: 1) Discovery & Planning - understanding your needs and requirements, 2) Design & Architecture - creating user-centered designs and technical architecture, 3) Development & Testing - agile development with continuous testing and feedback, 4) Deployment & Support - production launch with ongoing maintenance and support.',
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer:
        'Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance optimization, feature enhancements, and technical support. We provide various maintenance packages to fit different needs and budgets, ensuring your digital solutions remain secure and up-to-date.',
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms (AWS, Vercel, Firebase). For mobile development, we use React Native, Flutter, Swift, and Kotlin. Our consulting services cover cloud architecture, DevOps, and data analytics platforms.',
    },
    {
      question: 'Can you work with our existing team?',
      answer:
        'Absolutely! We excel at collaboration and can integrate seamlessly with your existing development team, provide technical leadership, conduct code reviews, offer training, or work as an extension of your team. We adapt our approach to complement your internal processes and team structure.',
    },
    {
      question: 'How do you ensure project quality?',
      answer:
        'Quality is ensured through multiple approaches: comprehensive testing (unit, integration, end-to-end), code reviews, automated CI/CD pipelines, performance monitoring, security audits, and regular client feedback sessions. We follow industry best practices and maintain high coding standards.',
    },
    {
      question: 'What makes Four Loop Digital different?',
      answer:
        "Our unique combination of technical expertise, strategic thinking, and client-focused approach sets us apart. We don't just build software - we solve business problems. Our team brings deep experience in modern technologies, proven methodologies, and a commitment to delivering solutions that drive real business value.",
    },
  ];

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(webPageSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(faqSchema),
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: 3 }, // Add some padding
          py: 8,
        }}
      >
        <Box textAlign='center' sx={{ mb: 8 }}>
          <Typography variant='h1' component='h1' gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant='h5' color='text.secondary' sx={{ mb: 4 }}>
            Find answers to common questions about our services and process
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Get quick answers to the most frequently asked questions about Four
            Loop Digital&apos;s services, development process, timelines, and
            how we can help your business succeed through innovative digital
            solutions.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography variant='h6' component='h2'>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1' color='text.secondary'>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box
          textAlign='center'
          sx={{ mt: 8, py: 6, bgcolor: 'grey.50', borderRadius: 2 }}
        >
          <Typography variant='h3' component='h2' gutterBottom>
            Still Have Questions?
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            Can&apos;t find the answer you&apos;re looking for? We&apos;d love
            to hear from you and discuss how Four Loop Digital can help with
            your specific project needs.
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <strong>Get in touch:</strong> Visit our contact page to send us a
            message or schedule a free consultation to discuss your project
            requirements in detail.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
