'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { CheckCircle2, History, Award, Users } from 'lucide-react';

export default function AboutPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'আমাদের সম্পর্কে' : 'About the Institution'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isBengali ? '১৯৯৫ সাল থেকে জ্ঞানের আলো ছড়াচ্ছে অগ্রণী মডেল স্কুল' : 'A premier institution since 1995'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">
              {isBengali ? 'আমাদের গৌরবগাথা' : 'Our Legacy of Excellence'}
            </h2>
            <p>
              {isBengali
                ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ ১৯৯৫ সালে প্রতিষ্ঠিত হয়ে দেশের অন্যতম শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠানে পরিণত হয়েছে। প্লে গ্রুপ থেকে শুরু করে দ্বাদশ শ্রেণি পর্যন্ত আধুনিক পাঠ্যক্রম, শৃঙ্খলা ও মানবিক মূল্যবোধের চমৎকার সমন্বয় নিশ্চিত করা হয়।'
                : 'Agrani Model High School & College was founded in 1995 with a mission to deliver world-class schooling grounded in disciplinary integrity and human values.'}
            </p>
            <p>
              {isBengali
                ? 'আমাদের সুপরিসর ক্যাম্পাস, আধুনিক বিজ্ঞানাগার, শীতাতপ নিয়ন্ত্রিত কম্পিউটার ল্যাব, সমৃদ্ধ গ্রন্থাগার এবং ডিজিটাল মাল্টিমিডিয়া ক্লাসরুম শিক্ষার্থীদের পড়াশোনাকে আনন্দময় করে তোলে।'
                : 'Our sprawling campus features multimedia-enabled smart classrooms, fully equipped physics, chemistry, biology, and computer laboratories, alongside an expansive library.'}
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 space-y-4">
            <div className="flex items-center gap-3">
              <History className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">{isBengali ? 'প্রতিষ্ঠা সাল' : 'Founded'}</div>
                <div className="text-xs text-gray-600">1995 AD</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">{isBengali ? 'স্বীকৃতি ও অধিভুক্তি' : 'Affiliation'}</div>
                <div className="text-xs text-gray-600">Dhaka Board of Intermediate & Secondary Education</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">{isBengali ? 'শিক্ষার্থী ও শিক্ষক' : 'Community'}</div>
                <div className="text-xs text-gray-600">2,500+ Students | 120+ Teachers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
