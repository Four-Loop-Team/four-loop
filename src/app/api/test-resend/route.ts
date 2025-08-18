import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('Testing Resend configuration...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log(
      'RESEND_API_KEY length:',
      process.env.RESEND_API_KEY?.length || 0
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Try to send a simple test email
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['scott.kehr@gmail.com'], // Use your verified email address
      subject: 'Test Email from Four Loop Contact Form',
      html: '<h1>This is a test email</h1><p>If you receive this, the Resend integration is working!</p>',
    });

    console.log('Resend test result:', result);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      result: result,
    });
  } catch (error) {
    console.error('Resend test error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send test email',
        details: String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
