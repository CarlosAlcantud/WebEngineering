import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Prestige Motors',
  description: 'The car of your dreams in the palm of your hand. ',
};

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body 
      
      className={`${inter.className}`}>{children}
      
      </body>
    </html>
  );
}
