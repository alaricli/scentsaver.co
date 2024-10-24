import { NextResponse } from 'next/server';

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const DATACENTER = 'us10';

export async function POST(req: Request) {
  if (!API_KEY || !AUDIENCE_ID) {
    return NextResponse.json(
      { error: 'Mailchimp API key or Audience ID is not set' },
      { status: 500 }
    );
  }

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    if (response.status >= 400) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
