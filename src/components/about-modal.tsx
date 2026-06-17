'use client';

import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-900 dark:text-slate-50">
            Tentang B-Sport
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            B-Sport Bogor adalah platform peta interaktif yang memudahkan Anda
            menemukan fasilitas olahraga terbaik di Kota Bogor.
          </p>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Fitur Utama:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Peta interaktif dengan lokasi fasilitas olahraga</li>
              <li>Filter kategori olahraga yang lengkap</li>
              <li>Informasi detail tentang setiap fasilitas</li>
              <li>Integrasi dengan Google Maps untuk navigasi</li>
            </ul>
          </div>

          <p className="text-sm">
            Kami berkomitmen untuk memberikan pengalaman terbaik dalam mencari
            fasilitas olahraga di Bogor dengan antarmuka yang modern dan mudah
            digunakan.
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2024 B-Sport Bogor. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
