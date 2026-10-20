'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RulesPage() {
  const { isBengali } = useTranslation();

  const rules = [
    isBengali ? 'প্রতিদিন সকাল ৮:০০ ঘটিকার মধ্যে নির্ধারিত স্কুল ইউনিফর্ম পরিধান করে উপস্থিত হতে হবে।' : 'Students must arrive punctually before 8:00 AM wearing the complete prescribed school uniform.',
    isBengali ? 'শ্রেণিকক্ষে মোবাইল ফোন বা যেকোনো প্রকার ইলেকট্রনিক গ্যাজেট আনা সম্পূর্ণ নিষিদ্ধ।' : 'Mobile phones and unauthorized personal electronic devices are strictly prohibited on campus.',
    isBengali ? 'নিয়মিত ক্লাসে উপস্থিতি বাধ্যতামূলক; ন্যূনতম ৭৫% উপস্থিতি না থাকলে পরীক্ষায় অংশগ্রহণের সুযোগ থাকবে না।' : 'A minimum of 75% attendance is mandatory for appearing in term-end and board examinations.',
    isBengali ? 'ক্যাম্পাসে শৃঙ্খলা, ভদ্রতা ও পরিচ্ছন্নতা বজায় রাখতে হবে; শিক্ষকদের যথাযথ সম্মান প্রদর্শন করতে হবে।' : 'High standards of personal decorum, mutual respect, and cleanliness must be observed at all times.',
    isBengali ? 'অনুপস্থিতির ক্ষেত্রে অভিভাবকের লিখিত আবেদনপত্র শ্রেণি শিক্ষকের নিকট জমা দিতে হবে।' : 'Absences must be justified with a signed parental letter submitted to the class teacher.',
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'স্কুল নিয়মাবলী ও আচরণবিধি' : 'School Code of Conduct & Rules'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'সুশৃঙ্খল ও আদর্শ শিক্ষার্থী গঠনে আচরণবিধি' : 'Disciplinary framework ensuring a conducive academic climate'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#1e3a5f] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            {isBengali ? 'সাধারণ আচরণবিধি' : 'General Conduct Guidelines'}
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
