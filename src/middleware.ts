// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SHOPIFY_DOMAIN = 'scentsaver.co';
const SHOPIFY_ACCOUNT_BASE_URL = `http://${SHOPIFY_DOMAIN}`;

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;

  // Only redirect if we're not already on the Shopify domain
  if (!host.includes(SHOPIFY_DOMAIN)) {
    const searchParams = request.nextUrl.searchParams.toString();
    const hash = request.nextUrl.hash;

    let shopifyUrl = `${SHOPIFY_ACCOUNT_BASE_URL}${pathname}`;
    if (searchParams) {
      shopifyUrl += `?${searchParams}`;
    }
    if (hash) {
      shopifyUrl += hash;
    }

    return NextResponse.redirect(shopifyUrl);
  }

  // If we're already on the Shopify domain, just continue normally
  return NextResponse.next();
}

export const config = {
  matcher: '/account/:path*',
};
