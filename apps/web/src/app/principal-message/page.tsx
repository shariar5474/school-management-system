'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Quote, GraduationCap } from 'lucide-react';

export default function PrincipalMessagePage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'অধ্যক্ষের বাণী' : "Principal's Message"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'প্রফেসর মোহাম্মদ হারুনুর রশীদ, অধ্যক্ষ' : 'Prof. Mohammad Harunur Rashid, Principal'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-gray-700 text-sm leading-relaxed">
        <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="w-16 h-16 rounded-2xl bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-2xl shrink-0">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">
              {isBengali ? 'সম্মানিত অভিভাবক ও সুধীবৃন্দ' : 'Respected Guardians, Students & Well-Wishers'}
            </h2>
            <div className="text-xs text-blue-700 font-semibold mt-0.5">
              {isBengali ? 'আসসালামু আলাইকুম ও উষ্ণ শুভেচ্ছা' : 'Warm Greetings from the Office of the Principal'}
            </div>
          </div>
        </div>

        <p>
          {isBengali
            ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজের পক্ষ থেকে আপনাদের সবাইকে আন্তরিক শুভেচ্ছা ও অভিনন্দন। একটি জাতির সার্বিক উন্নয়নের মূল চাবিকাঠি হলো সুশিক্ষা। আমরা বিশ্বাস করি, শিক্ষাদান শুধুমাত্র পাঠ্যপুস্তকের তত্ত্বীয় জ্ঞান অর্জনে সীমাবদ্ধ নয়; এর মূল লক্ষ্য হলো শিক্ষার্থীদের মধ্যে চারিত্রিক সততা, দেশপ্রেম, মানবিক মূল্যবোধ ও নেতৃত্বগুণের বিকাশ ঘটানো।'
            : 'Welcome to Agrani Model High School & College. Education is the greatest catalyst for human empowerment and societal progress. Our objective is to impart knowledge that builds resilient character, curiosity, and civic responsibility.'}
        </p>

        <p>
          {isBengali
            ? 'আমাদের প্রতিষ্ঠানে প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত প্রতিটি স্তরে মানসম্মত পাঠদান পরিচালিত হয়। আধুনিক তথ্যপ্রযুক্তিভিত্তিক স্মার্ট ক্লাসরুম, সুসজ্জিত বিজ্ঞান ল্যাব ও সমৃদ্ধ লাইব্রেরির পাশাপাশি খেলাধুলা ও সহশিক্ষামূলক কার্যক্রমের মাধ্যমে শিক্ষার্থীদের মনোদৈহিক বিকাশ নিশ্চিত করা হয়।'
            : 'From early childhood education to higher secondary studies, our tailored curriculum balances conceptual depth with creative exploration, supported by multimedia classrooms and dedicated laboratories.'}
        </p>

        <div className="pt-6 border-t border-gray-200 mt-8">
          <div className="font-bold text-gray-900">
            {isBengali ? 'প্রফেসর মোহাম্মদ হারুনুর রশীদ' : 'Prof. Mohammad Harunur Rashid'}
          </div>
          <div className="text-xs text-gray-500">
            {isBengali ? 'অধ্যক্ষ, অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ' : 'Principal, Agrani Model High School & College'}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
