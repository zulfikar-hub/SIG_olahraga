'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'register';

export default function AuthPortal() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  }, [mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validasi password register
  if (
    mode === 'register' &&
    formData.password !== formData.confirmPassword
  ) {
    alert('Konfirmasi password tidak cocok!');
    return;
  }

  setIsLoading(true);

  const endpoint =
    mode === 'login'
      ? '/api/auth/login'
      : '/api/auth/register';

  try {
    const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },

  credentials: 'include', // tambahkan ini

  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
});

    // Ambil response sekali saja
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        responseData?.message || 'Terjadi kesalahan pada server'
      );
    }

// Login berhasil
if (mode === 'login') {
    router.push('/admin/dashboard');
    return;
}

    // Register berhasil
    else {
      alert(responseData.message || 'Registrasi berhasil');

      setMode('login');

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
      });
    }

  } catch (err: any) {
    console.error('AUTH ERROR:', err);
    alert(err.message || 'Terjadi kesalahan');
  } finally {
    setIsLoading(false);
  }
};

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 animate-gradient text-foreground flex overflow-hidden" suppressHydrationWarning> 
       {/* Left Side - Map Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 items-center justify-center relative overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-8">
          {/* Decorative map grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />
          </svg>

          {/* Sports facility markers */}
          <div className="relative z-10 w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg border-2 border-accent/20 opacity-30"></div>
            
            {/* Map representation with facility markers */}
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-center gap-2">
                  <MapPin className="w-6 h-6 text-accent" />
                  GOR Bogor
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sistem Informasi Geografis
                </p>
              </div>

              {/* Facility markers grid */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i % 2 === 0
                        ? 'bg-accent shadow-lg shadow-accent/50'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  ></div>
                ))}
              </div>

              {/* Decorative lines connecting markers */}
              <svg className="absolute w-32 h-32 -z-10 opacity-20" viewBox="0 0 100 100">
                <polyline points="20,20 50,50 80,20" fill="none" stroke="currentColor" strokeWidth="1" />
                <polyline points="20,80 50,50 80,80" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Bottom subtitle */}
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Kelola data spasial dan fasilitas olahraga Kota Bogor
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Admin Portal Alert */}
          <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-sm text-center text-slate-700 dark:text-slate-300 font-medium">
              Portal Khusus Administrator
            </p>
            <p className="text-xs text-center text-slate-600 dark:text-slate-400 mt-1">
              Kelola data spasial dan fasilitas GOR Kota Bogor
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all text-sm ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-800 text-accent shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login Admin
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all text-sm ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-800 text-accent shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name - Register Only */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required={mode === 'register'}
                  className="border-border focus-visible:ring-accent"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@gis-bogor.id"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-border focus-visible:ring-accent"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-border focus-visible:ring-accent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Register Only */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={mode === 'register'}
                    className="border-border focus-visible:ring-accent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me - Login Only */}
            {mode === 'login' && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                />
                <Label htmlFor="rememberMe" className="text-sm font-medium cursor-pointer">
                  Ingat saya
                </Label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-2 mt-6 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : mode === 'login' ? (
                'Masuk'
              ) : (
                'Daftar'
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-xs text-muted-foreground space-y-1">
            {mode === 'login' ? (
              <p>
                Belum memiliki akun?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-accent hover:text-accent/90 font-medium transition-colors"
                >
                  Daftar di sini
                </button>
              </p>
            ) : (
              <p>
                Sudah memiliki akun?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-accent hover:text-accent/90 font-medium transition-colors"
                >
                  Masuk di sini
                </button>
              </p>
            )}
            <p className="text-slate-500 dark:text-slate-500 mt-3">
              © 2024 GIS Bogor. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
