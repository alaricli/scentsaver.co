// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use the full Shopify account URL format with your shop ID
const SHOPIFY_ACCOUNT_URL = 'https://shopify.com/60912861270/account';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get everything after /account in the original request
  const accountPath = pathname.replace('/account', '');

  // Construct the full Shopify URL
  let shopifyUrl = `${SHOPIFY_ACCOUNT_URL}${accountPath}`;

  // Add any query parameters
  const searchParams = request.nextUrl.searchParams.toString();
  if (searchParams) {
    shopifyUrl += `?${searchParams}`;
  }

  // Add any hash fragments
  const hash = request.nextUrl.hash;
  if (hash) {
    shopifyUrl += hash;
  }

  return NextResponse.redirect(shopifyUrl);
}

export const config = {
  matcher: '/account/:path*',
};
