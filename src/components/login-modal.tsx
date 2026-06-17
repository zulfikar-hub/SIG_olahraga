'use client';

import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      setEmail('');
      setPassword('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <LogIn className="w-6 h-6 text-emerald-600" />
            Login Admin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@bsport.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:border-emerald-500 dark:focus:border-emerald-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Kata Sandi
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:border-emerald-500 dark:focus:border-emerald-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                Sedang masuk...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Masuk
              </>
            )}
          </Button>

          {/* Helper Text */}
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Masukkan kredensial admin untuk mengakses panel manajemen fasilitas.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
