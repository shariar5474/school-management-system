'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Layers } from 'lucide-react';

export default function ClassesPage() {
  const { isBengali } = useTranslation();

  const classList = [
    { name: 'Play Group', age: '3 - 4 Years', sections: 'A, B', subjects: 'Alphabets, Numbers, Rhymes, Drawing' },
    { name: 'Nursery', age: '4 - 5 Years', sections: 'A, B', subjects: 'Basic English, Bengali, Math, General Knowledge' },
    { name: 'KG (Kindergarten)', age: '5 - 6 Years', sections: 'A, B', subjects: 'Reading, Writing, Elementary Math, Arts' },
    { name: 'Class 1 to 5 (Primary)', age: '6 - 11 Years', sections: 'A, B, C', subjects: 'Bangla, English, Math, Science, BGS, Religion' },
    { name: 'Class 6 to 8 (Junior)', age: '11 - 14 Years', sections: 'A, B, C', subjects: 'National Curriculum, ICT, Physical Education, Arts' },
    { name: 'Class 9 & 10 (Secondary)', age: '14 - 16 Years', sections: 'Science, Business Studies, Humanities', subjects: 'SSC Board Curriculum, Practical Labs' },
    { name: 'Class 11 & 12 (College)', age: '16 - 18 Years', sections: 'Science, Business Studies, Humanities', subjects: 'HSC Board Curriculum, Pre-University Coaching' },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'শ্রেণি ও শাখাসমূহ' : 'Classes & Sections Structure'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত বিস্তারিত কাঠামো' : 'Age groups, sections, and curriculum offerings'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classList.map((c, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-gray-900">{c.name}</h3>
              </div>
              <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Age:</span> {c.age}</div>
              <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Sections:</span> {c.sections}</div>
              <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Focus:</span> {c.subjects}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
