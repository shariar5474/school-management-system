'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { ProgramsSection } from '@/components/home/ProgramsSection';

export default function AcademicProgramsPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'শিক্ষাক্রম ও একাডেমিক বিভাগ' : 'Academic Programs & Curriculum'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত বিস্তারিত পাঠক্রম' : 'Full academic spectrum from early learning to pre-university'}
          </p>
        </div>
      </div>
      <ProgramsSection />
      <Footer />
    </>
  );
}
