'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Target, Compass, CheckCircle2 } from 'lucide-react';

export default function MissionVisionPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission & Vision'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'আমাদের প্রাতিষ্ঠানিক লক্ষ্য ও ভবিষ্যৎ পরিকল্পনা' : 'Our core purpose and guiding principles'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Vision */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isBengali ? 'আমাদের ভিশন (Vision)' : 'Our Vision'}
            </h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {isBengali
              ? 'একটি আদর্শ ও মডেল শিক্ষাপ্রতিষ্ঠান হিসেবে আত্মপ্রকাশ করা, যা প্রতিটি শিক্ষার্থীর বুদ্ধিবৃত্তিক, শারীরিক, সামাজিক ও নৈতিক বিকাশ ঘটিয়ে তাদের একবিংশ শতাব্দীর বৈশ্বিক চ্যালেঞ্জ মোকাবেলায় দক্ষ, দেশপ্রেমিক ও আলোকিত নাগরিক হিসেবে গড়ে তুলবে।'
              : 'To be a beacon of premier education that cultivates intellectual agility, moral discernment, and compassionate leadership in every student.'}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isBengali ? 'আমাদের মিশন (Mission)' : 'Our Mission'}
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {isBengali
                  ? 'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত মানসম্মত, প্রযুক্তিভিত্তিক ও সমন্বিত শিক্ষাদান।'
                  : 'Delivering comprehensive, technology-enabled learning from Play Group through Class 12.'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {isBengali
                  ? 'শিক্ষার্থীদের মধ্যে সৃজনশীল চিন্তাভাবনা, বিজ্ঞানমনস্কতা ও মানবিক মূল্যবোধ সৃষ্টি।'
                  : 'Nurturing scientific inquiry, creative expression, and empathetic social responsibility.'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {isBengali
                  ? 'সুশৃঙ্খল, নিরাপদ ও রাজনীতিমুক্ত আধুনিক ক্যাম্পাস পরিবেশ নিশ্চিতকরণ।'
                  : 'Maintaining a disciplined, safe, politics-free, and inspiring campus ecosystem.'}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
