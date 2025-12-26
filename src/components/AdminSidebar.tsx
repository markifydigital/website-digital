'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, FileText, LogOut, Settings, Newspaper } from 'lucide-react';
import { MarkifyLogo } from './icons';
import { useAuth } from '@/firebase';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/content', label: 'Content', icon: Newspaper },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '#', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="p-4 border-b">
        <Link href="/admin">
          <MarkifyLogo />
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
