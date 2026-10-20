'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Home, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function NotFound() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-gray-50">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#1e3a5f]">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mt-2">
          {isBengali ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mt-1 mb-6">
          {isBengali
            ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে বা বর্তমান নেই।'
            : 'The requested URL was not found on this server. Please return to homepage.'}
        </p>
        <Link href="/">
          <Button variant="primary" className="bg-[#1e3a5f]">
            <Home className="w-4 h-4 mr-2" />
            {isBengali ? 'হোমপেজে ফিরে যান' : 'Back to Home'}
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
