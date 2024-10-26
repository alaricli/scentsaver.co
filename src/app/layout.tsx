import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/navigation/footer/Footer';

// Font configurations
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap', // Optimize font loading
  preload: true,
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://scentsaver.co'), // Replace with your actual domain
  title: {
    default: 'scentsaver.co',
    template: '%s | scentsaver.co',
  },
  description:
    'Your destination for discount fragrance decants, samples, full bottles, and home goods',
  keywords: ['fragrance', 'decants', 'samples', 'home goods', 'scents'],
  authors: [{ name: 'Alaric Li' }],
  openGraph: {
    type: 'website',
    title: 'scentsaver.co',
    description:
      'Your destination for discount fragrance decants, samples, full bottles, and home goods',
    siteName: 'scentsaver.co',
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="light"
      // Suppress hydration warnings for theme
      suppressHydrationWarning
    >
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {/* Skip to main content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
            >
              Skip to main content
            </a>

            <Navbar />

            <main
              id="main-content"
              className="flex-grow"
              // Important to identify the main content area
              role="main"
            >
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>

        {/* Accessibility announcement region for dynamic content */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {/* Dynamic announcements can be inserted here */}
        </div>
      </body>
    </html>
  );
}
