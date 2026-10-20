'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function ProgramsSection() {
  const { isBengali } = useTranslation();

  const programs = [
    {
      icon: Sparkles,
      title: isBengali ? 'প্রাক-প্রাথমিক (প্লে - কেজি)' : 'Pre-Primary (Play - KG)',
      desc: isBengali
        ? 'মন্টেসরি ও প্লে-ওয়ে মেথডে আনন্দের সাথে প্রাথমিক বর্ণ ও সংখ্যার পরিচয় এবং সামাজিক দক্ষতা বৃদ্ধি।'
        : 'Montessori-inspired play-way learning fostering cognitive development and social skills.',
      badge: 'Early Years',
    },
    {
      icon: BookOpen,
      title: isBengali ? 'প্রাথমিক শাখা (শ্রেণি ১ - ৫)' : 'Primary Section (Class 1 - 5)',
      desc: isBengali
        ? 'বাংলা ও ইংরেজির মজবুত ভিত্তি, প্রাথমিক গণিত, নৈতিক শিক্ষা ও সৃজনশীল কার্যক্রমের সমন্বয়।'
        : 'Strong foundational literacy and numeracy paired with interactive arts and science exploration.',
      badge: 'Foundational',
    },
    {
      icon: Layers,
      title: isBengali ? 'মাধ্যমিক শাখা (শ্রেণি ৬ - ১০)' : 'Secondary Section (Class 6 - 10)',
      desc: isBengali
        ? 'জাতীয় শিক্ষাক্রমের আলোকে বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগে আধুনিক ডিজিটাল পাঠদান।'
        : 'Rigorous academic preparation in Science, Business Studies, and Humanities with modern labs.',
      badge: 'SSC Curriculum',
    },
    {
      icon: Award,
      title: isBengali ? 'উচ্চ মাধ্যমিক (একাদশ - দ্বাদশ)' : 'Higher Secondary (Class 11 - 12)',
      desc: isBengali
        ? 'বিশ্ববিদ্যালয় ও মেডিকেল/ইঞ্জিনিয়ারিং ভর্তি উপযোগী গভীর জ্ঞানচর্চা ও মডেল টেস্টের মাধ্যমে সার্বিক প্রস্তুতি।'
        : 'Pre-university excellence equipping students for medical, engineering, and public university admissions.',
      badge: 'HSC College',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
            {isBengali ? 'একাডেমিক স্তরসমূহ' : 'Academic Levels'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a5f] mt-3">
            {isBengali ? 'আমাদের পাঠদান কার্যক্রম' : 'Our Academic Programs'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {isBengali
              ? 'প্লে গ্রুপ থেকে শুরু করে উচ্চ মাধ্যমিক পর্যন্ত প্রতিটি স্তরে আন্তর্জাতিক মানের সমন্বিত শিক্ষাব্যবস্থা।'
              : 'A continuous pathway of educational excellence guiding students from childhood to graduation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-full">
                      {prog.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{prog.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{prog.desc}</p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100">
                  <Link
                    href="/academic-programs"
                    className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>{isBengali ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
