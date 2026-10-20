'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function PrincipalMessage() {
  const { isBengali } = useTranslation();

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Principal Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-72 sm:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                  alt="Principal Prof. Mohammad Harunur Rashid"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-5 text-white text-center">
                  <h4 className="font-bold text-base">
                    {isBengali ? 'প্রফেসর মোহাম্মদ হারুনুর রশীদ' : 'Prof. Mohammad Harunur Rashid'}
                  </h4>
                  <p className="text-xs text-yellow-300 font-medium mt-0.5">
                    {isBengali ? 'অধ্যক্ষ ও শিক্ষাবিদ (এম.এসসি, বি.এড)' : 'Principal & Renowned Educator (M.Sc, B.Ed)'}
                  </p>
                </div>
              </div>

              {/* Floating Quote Icon */}
              <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-gray-900 p-3.5 rounded-2xl shadow-xl">
                <Quote className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
                {isBengali ? 'অধ্যক্ষের বাণী' : "Principal's Desk"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a5f] mt-3 leading-tight">
                {isBengali
                  ? 'নৈতিকতা ও আধুনিক শিক্ষার সমন্বয়ে আগামীর নেতৃত্ব তৈরি'
                  : 'Empowering Minds, Inspiring Character & Building Leaders'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic border-l-4 border-yellow-400 pl-4 py-1">
              {isBengali
                ? '“আমরা বিশ্বাস করি, প্রতিটি শিক্ষার্থীর মধ্যেই এক অনন্য সম্ভাবনা নিহিত থাকে। আমাদের দায়িত্ব কেবল পাঠ্যপুস্তকের জ্ঞান বিতরণ নয়, বরং তাদের মধ্যে সততা, দেশপ্রেম, অনুসন্ধিৎসু মনোভাব এবং আধুনিক বিশ্বের সাথে তাল মিলিয়ে চলার যোগ্যতা গড়ে তোলা।”'
                : '"Education is not the learning of facts, but the training of the mind to think. At Agrani Model High School & College, we strive to build a vibrant environment where academic curiosity meets disciplined values."'}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBengali
                    ? 'নিয়মিত অভিভাবক সমাবেশ ও শিক্ষার্থীদের সার্বিক অগ্রগতি পর্যবেক্ষণ'
                    : 'Consistent parent-teacher dialogue and progress tracking'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBengali
                    ? 'বিজ্ঞান অলিম্পিয়াড, বিতর্ক ও রোবটিক্স ক্লাবের মাধ্যমে মেধার বিকাশ'
                    : 'Active participation in Science Olympiads, Debates & Robotics Clubs'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBengali
                    ? 'কম্পিউটার ল্যাব ও ডিজিটাল লাইব্রেরির মাধ্যমে আইসিটি দক্ষতা অর্জন'
                    : 'Comprehensive digital literacy and modern library resources'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/principal-message"
                className="inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900 group"
              >
                <span>{isBengali ? 'সম্পূর্ণ বক্তব্য ও জীবনী পড়ুন' : 'Read Full Message & Profile'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
