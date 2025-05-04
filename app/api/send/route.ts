import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, content } = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'Reports <reports@reports.snapshotfinance.com.au>',
      to: email,
      subject: 'Your Subscription Report',
      html: content
    });

    return error 
      ? NextResponse.json({ error }, { status: 500 })
      : NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}