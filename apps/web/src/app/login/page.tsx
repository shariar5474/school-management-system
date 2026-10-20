'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { GraduationCap, LogIn, Lock, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { isBengali } = useTranslation();
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success(isBengali ? 'লগইন সফল হয়েছে!' : 'Login successful!');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      toast.error(
        isBengali
          ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়। পুনরায় চেষ্টা করুন।'
          : 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error(isBengali ? 'আপনার ইমেইল লিখুন' : 'Please enter your email');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      toast.success(
        isBengali
          ? 'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে।'
          : 'Password reset link has been sent to your email.'
      );
      setResetModalOpen(false);
      setResetEmail('');
    } catch (err: any) {
      toast.error(
        isBengali
          ? 'পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে। ইমেইল চেক করুন।'
          : 'Failed to send reset email. Please verify the email.'
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#1e3a5f] to-[#2563eb] rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
              <GraduationCap className="w-9 h-9" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-[#1e3a5f]">
              {isBengali ? 'এডমিন ও স্টাফ পোর্টাল' : 'Staff & Admin Portal'}
            </h2>
            <p className="mt-1.5 text-xs text-gray-500">
              {isBengali ? 'আপনার সংরক্ষিত ক্রেডেনশিয়াল দিয়ে প্রবেশ করুন' : 'Sign in to access your administrative dashboard'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              label={isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.com"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span>{isBengali ? 'মনে রাখুন' : 'Remember me'}</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setResetModalOpen(true);
                }}
                className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                {isBengali ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full bg-[#1e3a5f] hover:bg-blue-800 mt-3 font-bold shadow-md"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? (isBengali ? 'যাচাই করা হচ্ছে...' : 'Signing in...') : (isBengali ? 'লগইন করুন' : 'Sign In')}
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isBengali ? 'নিরাপদ ক্লাউড প্রমাণীকরণ (Firebase Auth)' : 'Secured via Firebase Authentication'}</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title={isBengali ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Your Password'}
      >
        <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
          <p className="text-xs text-gray-600 leading-relaxed">
            {isBengali
              ? 'আপনার রেজিস্টার্ড ইমেইল দিন। আমরা একটি পাসওয়ার্ড পরিবর্তনের লিঙ্ক আপনার ইমেইলে পাঠিয়ে দেব।'
              : 'Enter your registered email address and we will send you a secure link to reset your password.'}
          </p>

          <Input
            label={isBengali ? 'ইমেইল' : 'Email Address'}
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="sohel229229@gmail.com"
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResetModalOpen(false)}
            >
              {isBengali ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={resetLoading}
              className="bg-[#1e3a5f]"
            >
              {resetLoading
                ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Sending...')
                : (isBengali ? 'রিসেট লিঙ্ক পাঠান' : 'Send Reset Link')}
            </Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </>
  );
}
