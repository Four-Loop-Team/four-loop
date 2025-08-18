import { getClientIP, rateLimit } from '@/lib/rate-limit';
import { detectSpam } from '@/lib/security/spam-detection';
import { validateContactForm } from '@/lib/validation/contact-form';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('=== Contact API Called ===');

    // Get client IP
    const clientIP = getClientIP(request);
    console.log('Client IP:', clientIP);

    // Rate limiting - 5 submissions per 15 minutes per IP
    const rateLimitResult = await rateLimit({
      id: clientIP,
      limit: 5,
      window: 15 * 60 * 1000, // 15 minutes
    });
    console.log('Rate limit result:', rateLimitResult);

    if (!rateLimitResult.success) {
      console.log('Rate limit exceeded');
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429 }
      );
    }

    // Get headers for spam detection
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const origin = headersList.get('origin') || '';

    // Parse request body
    const body = await request.json();

    // Validate required fields
    const validation = validateContactForm(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.errors },
        { status: 400 }
      );
    }

    const {
      email,
      message,
      honeypot,
      formStartTime,
      website, // Should be empty (honeypot)
    } = validation.data;

    // Honeypot check - these fields should be empty
    if (honeypot || website) {
      // Silently reject spam - don't tell them why
      return NextResponse.json({ success: true });
    }

    // Time-based validation - must be at least 3 seconds
    const currentTime = Date.now();
    const timeTaken = currentTime - parseInt(formStartTime);
    if (timeTaken < 3000) {
      return NextResponse.json(
        { error: 'Form submitted too quickly. Please try again.' },
        { status: 400 }
      );
    }

    // Comprehensive spam detection
    const spamCheck = detectSpam({
      email,
      message,
      userAgent,
      referer,
      origin,
      ip: clientIP,
    });

    if (spamCheck.isSpam) {
      console.log('Spam detected:', spamCheck.reasons);
      // Log for monitoring but don't reveal detection
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    console.log('Attempting to send email via Resend...');
    console.log('RESEND_API_KEY configured:', !!process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'Four Loop Digital <noreply@fourloopdigital.com>', // Use custom domain
      to: ['hello@fourloopdigital.com'], // Use custom domain email
      replyTo: email, // Reply directly to the form submitter
      subject: `Contact Form Message (from ${email})`, // Clean subject line
      html: generateEmailTemplate({
        email,
        message,
        timestamp: new Date().toISOString(),
        ip: clientIP,
        userAgent,
      }),
    });

    console.log('Resend result:', emailResult);

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully!');

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

function generateEmailTemplate({
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
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Contact Form Submission</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #e2e891, #f0f0aa); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; color: #333; font-size: 24px; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; }
        .value { background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 3px solid #e2e891; }
        .message-content { white-space: pre-wrap; }
        .metadata { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔥 New Contact Form Submission</h1>
          <p style="margin: 0; color: #666;">Four Loop Digital</p>
        </div>

        <div class="content">
          <div class="field">
            <label class="label">Name:</label>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <label class="label">Email:</label>
            <div class="value">${email}</div>
          </div>

          <div class="field">
            <label class="label">Message:</label>
            <div class="value message-content">${message}</div>
          </div>

          <div class="metadata">
            <strong>Submission Details:</strong><br>
            Time: ${new Date(timestamp).toLocaleString()}<br>
            IP Address: ${ip}<br>
            User Agent: ${userAgent}
          </div>
        </div>

        <div class="footer">
          <p>This email was sent from the Four Loop Digital contact form.<br>
          Reply directly to this email to respond to the sender.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
