import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received POST data:', body);

    return NextResponse.json({
      success: true,
      message: 'Test POST received',
      receivedData: body,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed', details: String(error) },
      { status: 500 }
    );
  }
}
