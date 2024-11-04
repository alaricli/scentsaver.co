// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SHOPIFY_ACCOUNT_BASE_URL = 'http://scentsaver.co';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Construct the full Shopify URL
  const searchParams = request.nextUrl.searchParams.toString();
  const hash = request.nextUrl.hash;

  let shopifyUrl = `${SHOPIFY_ACCOUNT_BASE_URL}${pathname}`;
  if (searchParams) {
    shopifyUrl += `?${searchParams}`;
  }
  if (hash) {
    shopifyUrl += hash;
  }

  // Perform the redirect
  return NextResponse.redirect(shopifyUrl);
}

// Configure middleware to match any path starting with /account
export const config = {
  matcher: '/account/:path*',
};
