import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from './components/navigation/footer/footer';
import TopNavbar from './components/navigation/navbar/TopNavbar';
import BotNavbar from './components/navigation/navbar/BotNavbar';
import { AuthProvider } from './context/AuthContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title:
    'scentsaver.net Your destination for discount fragrance decants, samples, full bottles, and home goods',
  description:
    'scentsaver.net Your destination for discount fragrance decants, samples, full bottles, and home goods',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <TopNavbar />
          <BotNavbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
