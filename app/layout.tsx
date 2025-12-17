import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import { BottomNav } from '@/components/bottom-nav';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Entrenadora Personal',
  description: 'PWA para entrenadoras y clientes',
  manifest: '/manifest.json',
  themeColor: '#0f172a',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="es" className="h-full bg-slate-950 text-slate-50">
      <body className="min-h-screen font-sans">
        <Providers session={session}>{children}</Providers>
        <BottomNav role={session?.user.role} />
      </body>
    </html>
  );
}
