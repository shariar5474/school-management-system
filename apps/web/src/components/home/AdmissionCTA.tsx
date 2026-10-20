'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '../ui/Button';

export function AdmissionCTA() {
  const { isBengali } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-tr from-[#1e3a5f] to-[#2563eb] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBengali ? 'ভর্তি তথ্য ২০২৬' : 'Session 2026 Admissions'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {isBengali
            ? 'আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গড়তে আজই ভর্তি আবেদন করুন'
            : 'Give Your Child the Advantage of Excellence and Discipline'}
        </h2>

        <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed font-light">
          {isBengali
            ? 'প্লে গ্রুপ থেকে শুরু করে দ্বাদশ শ্রেণি পর্যন্ত সীমিত আসনে ভর্তি চলছে। সহজে অনলাইনে আবেদন করুন এবং প্রবেশপত্র সংগ্রহ করুন।'
            : 'Admissions are now open for all classes with limited seats. Fill out our simple online form to begin your admission process.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/apply">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 shadow-xl">
              {isBengali ? 'অনলাইন ভর্তি ফরম পূরণ করুন' : 'Fill Online Application'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/admission-info">
            <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 px-6">
              {isBengali ? 'ভর্তি নীতিমালা ও ফি' : 'Admission Criteria & Fees'}
            </Button>
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            {isBengali ? 'অনলাইন ডকুমেন্ট আপলোড' : 'Digital Document Submission'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            {isBengali ? 'তাৎক্ষণিক ট্র্যাকিং কোড' : 'Instant Tracking Number'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            {isBengali ? 'মেধাভিত্তিক বৃত্তি সুবিধা' : 'Merit Scholarships Available'}
          </span>
        </div>
      </div>
    </section>
  );
}
