import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from './components/navigation/footer/footer';
import TopNavbar from './components/navigation/navbar/TopNavbar';
import BotNavbar from './components/navigation/navbar/BotNavbar';
import { CartProvider } from './components/carting/cartContext';
import { getStoredCartId, storeCartId } from './utils/localStorage';
import { fetchOrCreateCart } from './utils/shopify';

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
  title: 'Scent Saver',
  description: 'scentsaver.net',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = getStoredCartId();
  const cartPromise = fetchOrCreateCart(cartId);

  cartPromise.then((cart) => {
    if (cart && cart.id) {
      storeCartId(cart.id);
    }
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <CartProvider cartPromise={cartPromise}>
          <TopNavbar />
          <BotNavbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
