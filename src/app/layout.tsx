import type { Metadata } from 'next';
import { Syne_Mono } from 'next/font/google';
import './globals.css';

import ClientLayout from '@/component/ClientLayout';

const syneMono = Syne_Mono({
  subsets: ['latin'],
  variable: '--font-syne-mono',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Copytrading | Dash Mon[k]ey',
  description: 'Monkey see, Monkey do! A copytrading platform for the masses!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/circus-monkey.svg" />
      </head>
      <body
        className={`${syneMono.variable} antialiased font-default`}
      >
      <ClientLayout>
        {children}
      </ClientLayout>
      </body>
    </html>
  );
}
