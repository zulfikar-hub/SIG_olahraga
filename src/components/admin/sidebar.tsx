'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  Map as MapIcon,
  LogOut,
  X,
  Building2,
  Tags,
  Activity
} from 'lucide-react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/peta_editor', label: 'Peta Editor', icon: MapIcon },
  { href: '/admin/fasilitas_olahraga', label: 'Fasilitas Olahraga', icon: Building2 },
  { href: '/admin/data_lapangan', label: 'Data Lapangan', icon: Activity },
  { href: '/admin/kategori', label: 'Kategori Olahraga', icon: Tags },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.replace('/auth');
    router.refresh();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white border border-slate-200"
      >
        {mobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Layers className="w-5 h-5" />
        )}
      </button>

      <aside
        className={`${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 w-64 bg-slate-900 text-white flex flex-col h-screen border-r border-slate-800 z-40 transition-transform duration-300`}
      >
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-slate-300" />
            </div>
            FacilityHub
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tombol Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}