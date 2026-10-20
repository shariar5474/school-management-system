'use client';

import React from 'react';
import { Users, GraduationCap, Trophy, BookOpen } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function StatsSection() {
  const { isBengali } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: '2,500+',
      label: isBengali ? 'নিয়মিত শিক্ষার্থী' : 'Enrolled Students',
      desc: isBengali ? 'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি' : 'Play to Class 12',
    },
    {
      icon: GraduationCap,
      value: '120+',
      label: isBengali ? 'অভিজ্ঞ শিক্ষক-শিক্ষিকা' : 'Certified Teachers',
      desc: isBengali ? 'উচ্চতর ডিগ্রিধারী বিশেষজ্ঞ' : 'Subject specialists',
    },
    {
      icon: Trophy,
      value: '100%',
      label: isBengali ? 'বোর্ড পরীক্ষায় সাফল্য' : 'Board Success Rate',
      desc: isBengali ? 'জেএসসি, এসএসসি ও এইচএসসি' : 'JSC, SSC & HSC',
    },
    {
      icon: BookOpen,
      value: '25+',
      label: isBengali ? 'বছরের গৌরবোজ্জ্বল ইতিহাস' : 'Years of Legacy',
      desc: isBengali ? '১৯৯৫ সাল থেকে নিরবচ্ছিন্ন' : 'Established in 1995',
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50/50 transition-colors border border-gray-100 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
