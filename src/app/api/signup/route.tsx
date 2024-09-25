import { createCustomer } from '@/app/utils/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { firstName, lastName, email, password } = body;

  try {
    const customer = await createCustomer(firstName, lastName, email, password);
    return NextResponse.json({ success: true, customer });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
