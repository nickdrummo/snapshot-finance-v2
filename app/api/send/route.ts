import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set in environment variables.");
    }
    const resend = new Resend(resendApiKey);

    const { email, content } = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'Reports <reports@reports.snapshotfinance.com.au>',
      to: email,
      subject: 'Your Subscription Report',
      html: content
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ message: 'Error sending email.', error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Internal Server Error:', errorMessage);
    return NextResponse.json({ message: 'Failed to send email.', error: errorMessage }, { status: 500 });
  }
}