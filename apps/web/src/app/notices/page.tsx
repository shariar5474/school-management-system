'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { FileText, Calendar, Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function NoticesPage() {
  const { isBengali } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const notices = [
    {
      id: '1',
      title: isBengali
        ? '২০২৬ শিক্ষাবর্ষে প্লে থেকে নবম শ্রেণিতে ভর্তি পরীক্ষার সময়সূচি'
        : 'Admission Test Schedule for Session 2026 (Play to Class 9)',
      date: '2026-10-18',
      category: isBengali ? 'ভর্তি' : 'Admission',
      desc: isBengali
        ? 'সকল আবেদনকারীকে নির্ধারিত সময়ে প্রবেশপত্রসহ উপস্থিত থাকার নির্দেশ দেওয়া হলো।'
        : 'All applicants are requested to report with their printed admit cards.',
      isImportant: true,
    },
    {
      id: '2',
      title: isBengali
        ? 'বার্ষিক পরীক্ষা ২০২৬ এর সংশোধিত রুটিন প্রকাশ'
        : 'Revised Routine for Annual Examination 2026 Published',
      date: '2026-10-15',
      category: isBengali ? 'পরীক্ষা' : 'Exam',
      desc: isBengali
        ? 'শ্রেণি ৬ষ্ঠ থেকে ৯ম শ্রেণির বার্ষিক পরীক্ষার সংশোধিত রুটিন ওয়েবসাইটে প্রকাশ করা হয়েছে।'
        : 'The updated examination routine for Class 6 to 9 is now active.',
      isImportant: true,
    },
    {
      id: '3',
      title: isBengali
        ? 'আন্তঃশ্রেণি বিতর্ক ও বিজ্ঞান মেলা আয়োজন সংক্রান্ত নোটিশ'
        : 'Notice Regarding Inter-Class Debate & Science Fair 2026',
      date: '2026-10-10',
      category: isBengali ? 'ইভেন্ট' : 'Event',
      desc: isBengali
        ? 'আগামী ১৫ নভেম্বর স্কুল অডিটোরিয়ামে বার্ষিক বিজ্ঞান মেলা ও বিজ্ঞান অলিম্পিয়াড অনুষ্ঠিত হবে।'
        : 'The annual science festival and Olympiad will be hosted at the main auditorium.',
      isImportant: false,
    },
    {
      id: '4',
      title: isBengali
        ? 'অভিভাবক সমাবেশ ও প্রথম প্রান্তিক ফলাফল বিতরণ'
        : 'Parent-Teacher Meeting & Term-1 Result Distribution',
      date: '2026-10-05',
      category: isBengali ? 'সাধারণ' : 'General',
      desc: isBengali
        ? 'সকল শ্রেণির অভিভাবকদের নির্ধারিত কক্ষে উপস্থিত থাকার জন্য অনুরোধ জানানো হচ্ছে।'
        : 'Parents of all sections are cordially invited to review student progress.',
      isImportant: false,
    },
  ];

  const filtered = notices.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'নোটিশ বোর্ড ও জরুরি বিজ্ঞপ্তি' : 'Notice Board & Announcements'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'বিদ্যালয়ের সাম্প্রতিক সকল প্রাতিষ্ঠানিক নোটিশ' : 'Official notices and announcements'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="max-w-md">
          <Input
            placeholder={isBengali ? 'নোটিশ খুঁজুন...' : 'Search notices...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    n.isImportant ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {n.category}
                    </span>
                    {n.isImportant && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700">
                        {isBengali ? 'জরুরি' : 'Important'}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {n.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900">{n.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{n.desc}</p>
                </div>
              </div>

              <button
                onClick={() => alert(isBengali ? 'নোটিশ পিডিএফ ডাউনলোড শুরু হয়েছে।' : 'Notice PDF downloaded.')}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
