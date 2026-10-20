'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Calendar } from 'lucide-react';

export default function AcademicCalendarPage() {
  const { isBengali } = useTranslation();

  const calendarEvents = [
    { month: 'January 2026', title: isBengali ? 'বই উৎসব ও নতুন শিক্ষাবর্ষ শুরু' : 'Textbook Festival & Academic Session Commencement', date: 'Jan 01, 2026' },
    { month: 'February 2026', title: isBengali ? 'আন্তর্জাতিক মাতৃভাষা দিবস উদ্‌যাপন' : 'International Mother Language Day Observance', date: 'Feb 21, 2026' },
    { month: 'March 2026', title: isBengali ? 'প্রথম টিউটোরিয়াল পরীক্ষা ও স্বাধীনতা দিবস' : 'First Tutorial Exam & Independence Day', date: 'Mar 26, 2026' },
    { month: 'June 2026', title: isBengali ? 'অর্ধ-বার্ষিক পরীক্ষা ২০২৬' : 'Half-Yearly Examination 2026', date: 'Jun 01 - Jun 18, 2026' },
    { month: 'November 2026', title: isBengali ? 'বার্ষিক পরীক্ষা ২০২৬' : 'Annual Examination 2026', date: 'Nov 15 - Dec 05, 2026' },
    { month: 'December 2026', title: isBengali ? 'ফলাফল প্রকাশ ও বার্ষিক ছুটি' : 'Result Publication & Winter Vacation', date: 'Dec 25 - Dec 31, 2026' },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'একাডেমিক ক্যালেন্ডার ২০২৬' : 'Academic Calendar Session 2026'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'পরীক্ষা, ছুটি ও বাৎসরিক একাডেমিক সময়সূচি' : 'Official dates for examinations, holidays, and events'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="divide-y divide-gray-100">
            {calendarEvents.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                    <div className="text-xs text-gray-500">{item.month}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
