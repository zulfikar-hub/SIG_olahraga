'use client';

import { useState } from 'react';
import { Search, Menu, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AboutModal } from '@/components/about-modal';

interface NavbarProps {
  onToggleSidebar: () => void;
  onSearch: (query: string) => void;
}

export function Navbar({ onToggleSidebar, onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <>
      {/* 🚀 Modern Glassmorphism & System Border */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60 transition-colors duration-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Logo B-Sport Lebih Estetik dengan Aksen Dot Emerald */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-foreground">
                B<span className="text-emerald-500">-</span>Sport
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Bogor
              </span>
            </div>
          </div>

          {/* Center: Search Bar Ringkas & Responsif */}
          <div className="hidden sm:flex flex-1 max-w-sm mx-4 md:mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
              <Input
                type="text"
                placeholder="Cari GOR atau stadion..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 h-9 text-xs bg-muted/40 hover:bg-muted/70 focus:bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 shadow-sm transition-all placeholder:text-muted-foreground/70"
              />
            </div>
          </div>

          {/* Right: Menu Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAboutModal(true)}
              className="text-xs h-9 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Tentang</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search - Tampil tipis hanya di device kecil */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari fasilitas..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-4 h-9 text-xs bg-muted/50 border-border rounded-lg focus-visible:ring-1 focus-visible:ring-emerald-500 text-foreground"
            />
          </div>
        </div>
      </nav>

      <AboutModal open={showAboutModal} onOpenChange={setShowAboutModal} />
    </>
  );
}