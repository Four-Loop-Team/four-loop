'use client';

import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function EmailPreview() {
  const [previewHtml, setPreviewHtml] = useState<string>('');

  const generatePreview = () => {
    const sampleData = {
      email: 'john.smith@example.com',
      message: `Hi there,

I hope this message finds you well. I'm reaching out because I'm impressed with Four Loop Digital's work and would love to discuss a potential project.

I'm looking for a modern, responsive website for my consulting business. The key requirements include:
- Clean, professional design
- Mobile-first approach
- Contact forms and lead generation
- SEO optimization
- Performance-focused development

I'd appreciate the opportunity to schedule a call to discuss this further. Are you available next week for a brief conversation?

Looking forward to hearing from you.

Best regards,
John Smith`,
      timestamp: new Date().toISOString(),
      ip: '192.168.1.100',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    };

    const html = generateEmailTemplate(sampleData);
    setPreviewHtml(html);
  };

  const generateEmailTemplate = ({
    email,
    message,
    timestamp,
    ip,
    userAgent,
  }: {
    email: string;
    message: string;
    timestamp: string;
    ip: string;
    userAgent: string;
  }): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission - Four Loop Digital</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #353535; background-color: #f8f9fa; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);">
                        <div style="background: linear-gradient(135deg, #353535 0%, #232323 100%); padding: 40px 30px; text-align: center; position: relative; border-bottom: 4px solid #e2e891;">
                    <img src="http://localhost:3000/logo-email.png" alt="Four Loop Digital Logo" width="65" height="80" style="margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
          <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.025em;">New Contact Form Submission</h1>
          <p style="color: #e2e891; font-size: 14px; font-weight: 400; margin: 0;">Your website has a new inquiry</p>
        </div>

        <div style="padding: 40px 30px;">
          <div style="font-size: 20px; font-weight: 600; color: #353535; margin-bottom: 24px; text-align: center;">
            📪 You have a new message!
          </div>

          <div style="margin-bottom: 32px;">
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Email</label>
              <div style="background: #f3f4f6; padding: 12px 16px; border-radius: 8px; font-size: 16px; color: #1f2937; border-left: 4px solid #e2e891;">${email}</div>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message</label>
              <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 16px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <div style="height: 1px; background: linear-gradient(90deg, transparent, #d1d5db, transparent); margin: 32px 0;"></div>

          <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">
            💡 <strong>Pro tip:</strong> Simply reply to this email to respond directly to the sender
          </p>
        </div>

        <div style="background: #f9fafb; padding: 24px 30px; border-top: 1px solid #e5e7eb;">
          <div style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 16px; text-align: center;">Submission Details</div>
          <div style="margin-bottom: 12px;">
            <span style="display: inline-block; min-width: 100px; font-size: 14px; font-weight: 600; color: #6b7280;">Time:</span>
            <span style="font-size: 14px; color: #1f2937;">${new Date(
              timestamp
            ).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZoneName: 'short',
            })}</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="display: inline-block; min-width: 100px; font-size: 14px; font-weight: 600; color: #6b7280;">IP Address:</span>
            <span style="font-size: 14px; color: #1f2937;">${ip}</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="display: inline-block; min-width: 100px; font-size: 14px; font-weight: 600; color: #6b7280; vertical-align: top;">User Agent:</span>
            <span style="font-size: 14px; color: #1f2937; word-break: break-all;">${userAgent}</span>
          </div>
        </div>

        <div style="background: #353535; padding: 24px 30px; text-align: center;">
          <p style="font-size: 14px; color: #9ca3af; margin: 0; line-height: 1.5;">
            This email was sent from the <a href="https://fourloopdigital.com" style="color: #e2e891; text-decoration: none; font-weight: 600;">Four Loop Digital</a> contact form.<br>
            <strong style="color: #ffffff;">Reply directly to respond to the sender</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '2rem auto', padding: 2 }}>
      <Typography variant='h4' gutterBottom>
        📧 Email Template Preview
      </Typography>

      <Typography variant='body1' paragraph>
        Preview the new branded email template for contact form submissions.
      </Typography>

      <Button variant='contained' onClick={generatePreview} sx={{ mb: 3 }}>
        Generate Preview
      </Button>

      {previewHtml && (
        <Box
          sx={{
            border: '1px solid #ddd',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderBottom: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#ff5f56',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#ffbd2e',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#27ca3f',
                borderRadius: '50%',
              }}
            />
            <Typography variant='caption' sx={{ ml: 2 }}>
              Email Preview - Four Loop Digital Contact Form
            </Typography>
          </Box>
          <Box
            component='iframe'
            srcDoc={previewHtml}
            sx={{
              width: '100%',
              height: '800px',
              border: 'none',
              display: 'block',
            }}
          />
        </Box>
      )}
    </Box>
  );
}
