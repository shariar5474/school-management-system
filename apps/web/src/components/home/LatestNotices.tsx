'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Calendar, ArrowRight, FileText } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function LatestNotices() {
  const { isBengali } = useTranslation();

  const notices = [
    {
      id: '1',
      title: isBengali
        ? '২০২৬ শিক্ষাবর্ষে প্লে থেকে নবম শ্রেণিতে ভর্তি পরীক্ষার সময়সূচি'
        : 'Admission Test Schedule for Session 2026 (Play to Class 9)',
      date: '2026-10-18',
      category: isBengali ? 'ভর্তি' : 'Admission',
      isImportant: true,
    },
    {
      id: '2',
      title: isBengali
        ? 'বার্ষিক পরীক্ষা ২০২৬ এর সংশোধিত রুটিন প্রকাশ'
        : 'Revised Routine for Annual Examination 2026 Published',
      date: '2026-10-15',
      category: isBengali ? 'পরীক্ষা' : 'Exam',
      isImportant: true,
    },
    {
      id: '3',
      title: isBengali
        ? 'আন্তঃশ্রেণি বিতর্ক ও বিজ্ঞান মেলা আয়োজন সংক্রান্ত নোটিশ'
        : 'Notice Regarding Inter-Class Debate & Science Fair 2026',
      date: '2026-10-10',
      category: isBengali ? 'ইভেন্ট' : 'Event',
      isImportant: false,
    },
    {
      id: '4',
      title: isBengali
        ? 'অভিভাবক সমাবেশ ও প্রথম প্রান্তিক ফলাফল বিতরণ'
        : 'Parent-Teacher Meeting & Term-1 Result Distribution',
      date: '2026-10-05',
      category: isBengali ? 'সাধারণ' : 'General',
      isImportant: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
              {isBengali ? 'বিজ্ঞপ্তি ও ঘোষণা' : 'Notice Board'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] mt-3">
              {isBengali ? 'সর্বশেষ নোটিশসমূহ' : 'Latest Announcements'}
            </h2>
          </div>
          <Link
            href="/notices"
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            <span>{isBengali ? 'সকল নোটিশ দেখুন' : 'View All Notices'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  n.isImportant ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}
              >
                <FileText className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {n.category}
                  </span>
                  {n.isImportant && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700">
                      {isBengali ? 'জরুরি' : 'Important'}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                    <Calendar className="w-3 h-3" />
                    {n.date}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                  <Link href={`/notices`}>{n.title}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
