import React from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.scss';
import '@/lib/fontawesome';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TFT Data Analytics',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={'bg-gradient'}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
