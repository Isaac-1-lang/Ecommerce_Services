import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from './providers';
import { ToastContainer } from '../components/ui/ToastContainer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Now Store - Premium E-commerce Experience',
  description: 'Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping, quality products, and excellent customer service.',
  keywords: 'ecommerce, online shopping, fashion, electronics, home & garden, deals, free shipping',
  authors: [{ name: 'Now Store Team' }],
  openGraph: {
    title: 'Now Store - Premium E-commerce Experience',
    description: 'Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping, quality products, and excellent customer service.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Now Store - Premium E-commerce Experience',
    description: 'Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping, quality products, and excellent customer service.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white text-neutral-800 font-sans antialiased">
        <Providers>
          <ToastContainer>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ToastContainer>
        </Providers>
      </body>
    </html>
  );
}
