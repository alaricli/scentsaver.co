import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // For demonstration purposes, we'll assume a hardcoded user
  const validEmail = 'test@example.com';
  const validPassword = 'password123';

  if (email === validEmail && password === validPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
