'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdmissionInfoPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'ভর্তি তথ্য ও নির্দেশিকা' : 'Admission Guidelines & Criteria'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? '২০২৬ শিক্ষাবর্ষে ভর্তির নিয়মাবলী ও প্রয়োজনীয় তথ্যাবলী' : 'Admission procedure, eligibility, and fee details'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm text-gray-700 leading-relaxed">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#1e3a5f]">
            {isBengali ? '১. ভর্তি প্রক্রিয়া' : '1. Admission Procedure'}
          </h2>
          <p>
            {isBengali
              ? 'প্লে গ্রুপ ও নার্সারি শ্রেণিতে মৌখিক সাক্ষাৎকারের মাধ্যমে শিক্ষার্থী ভর্তি করা হয়। কেজি থেকে দ্বাদশ শ্রেণি পর্যন্ত লিখিত ও মৌখিক ভর্তি পরীক্ষার মাধ্যমে মেধা অনুযায়ী শিক্ষার্থী নির্বাচন করা হয়।'
              : 'Admissions for Play Group and Nursery are conducted via friendly oral interviews. For KG to Class 12, written assessment tests in English, Bengali, and Mathematics are conducted.'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#1e3a5f]">
            {isBengali ? '২. প্রয়োজনীয় ডকুমেন্টস' : '2. Required Documents'}
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'অনলাইন আবেদন ফরমের প্রিন্ট কপি' : 'Printed copy of online application form'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'ডিজিটাল জন্ম নিবন্ধন সনদের সত্যায়িত ফটোকপি' : 'Certified photocopy of Digital Birth Certificate'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'শিক্ষার্থীর সদ্যতোলা পাসপোর্ট সাইজের ৩ কপি ছবি' : '3 passport-sized color photographs of applicant'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'পিতা-মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি' : 'Photocopies of parents National ID cards'}</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 text-center">
          <Link href="/apply">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 shadow-md">
              {isBengali ? 'অনলাইন ভর্তি ফরম পূরণ করুন' : 'Apply Online Now'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
