'use client';

import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { Toast } from '@/components/ui/Toast';
import '@/styles/globals.css';

// export const metadata: Metadata = {
//   title: 'CONFESS - Truth or Dare on Stellar',
//   description: 'A 3D psychological party game on the Stellar blockchain.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <div className="w-full h-screen bg-void">
            <Navbar />
            <main className="w-full h-full">{children}</main>
            <Toast />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
