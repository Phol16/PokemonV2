import './globals.css';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Providers } from '@/libs/store/Provider';

const poppins = Poppins({
  weight: ['200', '400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'A web-based application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} bg-slate-950 text-white`}>
        <Providers>
        <Navbar />
        {children}
        </Providers>
      </body>
    </html>
  );
}
