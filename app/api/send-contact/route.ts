import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, workplace, need } = await request.json();

    if (!email || !workplace || !need) {
      return NextResponse.json(
        { error: 'Email, workplace, and need are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Antrop Kontakt <onboarding@resend.dev>', // Resend's test domain
      to: ['sara.nero@antrop.se'],
      replyTo: email,
      subject: 'nyfiken på samarbete',
      text: `Hej!

Jag kommer från ${workplace} och behöver hjälp med ${need}.

Kontakta mig på ${email}.

Med vänliga hälsningar`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
