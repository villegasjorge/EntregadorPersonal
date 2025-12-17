'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon, ClipboardDocumentIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const tabsByRole = {
  TRAINER: [
    { href: '/trainer', label: 'Dashboard', icon: HomeIcon },
    { href: '/trainer/clientes', label: 'Clientes', icon: UsersIcon },
    { href: '/trainer/rutinas', label: 'Rutinas', icon: ClipboardDocumentIcon },
    { href: '/trainer/mensajes', label: 'Mensajes', icon: ChatBubbleLeftIcon },
  ],
  CLIENT: [
    { href: '/client/hoy', label: 'Hoy', icon: HomeIcon },
    { href: '/client/progreso', label: 'Progreso', icon: ClipboardDocumentIcon },
    { href: '/client/pagos', label: 'Pagos', icon: UsersIcon },
    { href: '/client/mensajes', label: 'Mensajes', icon: ChatBubbleLeftIcon },
  ],
};

export function BottomNav({ role }: { role?: 'TRAINER' | 'CLIENT' }) {
  const pathname = usePathname();

  if (!role) return null;
  const tabs = tabsByRole[role];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-800 bg-slate-900/80 p-2 backdrop-blur">
      {tabs.map((tab) => {
        const isActive = pathname?.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs ${
              isActive ? 'bg-slate-800 text-teal-300' : 'text-slate-200'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
