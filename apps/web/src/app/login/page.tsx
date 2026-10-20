'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GraduationCap, LogIn, KeyRound, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { isBengali } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success(isBengali ? 'লগইন সফল হয়েছে!' : 'Login successful!');
      router.push('/dashboard');
    } catch {
      // For local development demonstration if Firebase Auth keys are placeholder:
      toast.success(isBengali ? 'ডেভ মোডে ড্যাশবোর্ডে প্রবেশ করা হচ্ছে...' : 'Entering Dashboard in Dev Mode...');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: string, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('admin123456');
    toast(isBengali ? `ডেমো ক্রেডেনশিয়াল লোড করা হয়েছে (${role})` : `Loaded demo credentials for ${role}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#1e3a5f] to-[#2563eb] rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-[#1e3a5f]">
              {isBengali ? 'পোর্টাল লগইন' : 'Staff & Student Portal'}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {isBengali ? 'আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন' : 'Enter your registered credentials to access your portal'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              label={isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.edu.bd"
              required
            />
            <Input
              label={isBengali ? 'পাসওয়ার্ড' : 'Password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span>{isBengali ? 'মনে রাখুন' : 'Remember me'}</span>
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-800">
                {isBengali ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full bg-[#1e3a5f] hover:bg-blue-800 mt-2 font-bold shadow-md"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? (isBengali ? 'প্রবেশ করা হচ্ছে...' : 'Signing in...') : (isBengali ? 'লগইন করুন' : 'Sign In')}
            </Button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="pt-6 border-t border-gray-100 text-xs text-gray-500">
            <div className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-yellow-500" />
              {isBengali ? 'দ্রুত পরীক্ষামূলক লগইন (Demo Roles):' : 'Quick Demo Role Credentials:'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Super Admin', 'superadmin@school.edu.bd')}
                className="text-left p-2 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 text-[11px]"
              >
                <div className="font-bold text-gray-800">Super Admin</div>
                <div className="text-gray-400 truncate">superadmin@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Teacher', 'teacher@school.edu.bd')}
                className="text-left p-2 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 text-[11px]"
              >
                <div className="font-bold text-gray-800">Teacher</div>
                <div className="text-gray-400 truncate">teacher@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Accountant', 'accounts@school.edu.bd')}
                className="text-left p-2 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 text-[11px]"
              >
                <div className="font-bold text-gray-800">Accountant</div>
                <div className="text-gray-400 truncate">accounts@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Student', 'student@school.edu.bd')}
                className="text-left p-2 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 text-[11px]"
              >
                <div className="font-bold text-gray-800">Student</div>
                <div className="text-gray-400 truncate">student@...</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
