import { getClientIP, rateLimit } from '@/lib/rate-limit';
import { detectSpam } from '@/lib/security/spam-detection';
import { validateContactForm } from '@/lib/validation/contact-form';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to conditionally log only in development
const debugLog = (message: string, data?: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    debugLog('=== Contact API Called ===');

    // Get client IP
    const clientIP = getClientIP(request);
    debugLog('Client IP:', clientIP);

    // Rate limiting - 5 submissions per 15 minutes per IP
    const rateLimitResult = await rateLimit({
      id: clientIP,
      limit: 5,
      window: 15 * 60 * 1000, // 15 minutes
    });
    debugLog('Rate limit result:', rateLimitResult);

    if (!rateLimitResult.success) {
      debugLog('Rate limit exceeded');
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
    debugLog('Request body received:', body);

    // Validate required fields
    const validation = validateContactForm(body);
    debugLog('Validation result:', validation);
    if (!validation.valid || !validation.data) {
      debugLog('Validation failed:', validation.errors);
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
      debugLog('Spam detected:', spamCheck.reasons);
      // Log for monitoring but don't reveal detection
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    debugLog('Attempting to send email via Resend...');
    debugLog('RESEND_API_KEY configured:', !!process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's verified domain for testing
      to: ['scott.kehr@gmail.com'], // Use your verified email address
      replyTo: email, // Reply directly to the form submitter
      subject: `Four Loop Contact Form Message (from ${email})`,
      html: generateEmailTemplate({
        email,
        message,
        timestamp: new Date().toISOString(),
        ip: clientIP,
        userAgent,
      }),
    });

    debugLog('Resend result:', emailResult);

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    debugLog('Email sent successfully!');

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
          <img src="https://fourloopdigital.com/logo-email.png" alt="Four Loop Digital Logo" width="65" height="80" style="margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
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
}
