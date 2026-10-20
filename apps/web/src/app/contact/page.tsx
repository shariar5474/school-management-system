'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/home/ContactSection';
import { useTranslation } from '@/i18n';

export default function ContactPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'যোগাযোগ ও অবস্থান' : 'Contact Us & Campus Location'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'আমাদের ক্যাম্পাসের ঠিকানা, ফোন নম্বর ও বার্তা পাঠানোর মাধ্যম' : 'Get in touch with our administrative office'}
          </p>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </>
  );
}
