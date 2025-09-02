import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/global/Header/Header';
import  { Toaster } from 'react-hot-toast';
import CheckAuth from '@/components/tests/CheckAuth';
import AuthInitializer from '@/hooks/use-auth-initializer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NobleWood - Premium Handcrafted Wooden Furniture',
  description: 'Discover NobleWood\'s exclusive collection of handcrafted wooden furniture. Premium chairs, tables, bookcases, and decorative items made from the finest natural woods.',
  keywords: 'wooden furniture, handcrafted chairs, wooden tables, bookcases, wooden decor, premium furniture, walnut furniture, oak furniture',
  authors: [{ name: 'NobleWood Team' }],
  openGraph: {
    title: 'NobleWood - Premium Handcrafted Wooden Furniture',
    description: 'Premium handcrafted wooden furniture with exceptional quality',
    url: 'https://noblewood.com',
    siteName: 'NobleWood',
    images: [
      {
        url: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg',
        width: 1200,
        height: 630,
        alt: 'NobleWood - Premium Wooden Furniture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NobleWood - Premium Handcrafted Wooden Furniture',
    description: 'Premium handcrafted wooden furniture with exceptional quality',
    images: ['https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="en" dir="ltr">
      <body cz-shortcut-listen="true" className={inter.className}>
        {/* <CheckAuth/> */}
        <AuthInitializer/>
        <CartProvider>
        <Toaster containerStyle={{fontSize:"13px"}}/>
          <Header />
          <main >{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}