'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, GraduationCap, CheckCircle, Users, Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '../ui/Button';

export function HeroBanner() {
  const { isBengali } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#12233a] via-[#1e3a5f] to-[#12233a] text-white py-16 lg:py-24">
      {/* Background Subtle Shapes */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>{isBengali ? 'ভর্তি চলছে ২০২৬-২০২৭ শিক্ষাবর্ষ' : 'Admissions Open for Session 2026-2027'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isBengali ? (
                <>
                  প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400">
                    আধুনিক ও নৈতিক শিক্ষার
                  </span>{' '}
                  বিশ্বস্ত ঠিকানা
                </>
              ) : (
                <>
                  Shaping Future Leaders with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400">
                    Academic & Moral Excellence
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {isBengali
                ? 'ডিজিটাল স্মার্ট ক্লাসরুম, অভিজ্ঞ শিক্ষকমণ্ডলী, সমৃদ্ধ বিজ্ঞান ও কম্পিউটার ল্যাব এবং সুশৃঙ্খল পরিবেশের মাধ্যমে গড়ে তুলুন আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ।'
                : 'Experience premier education with smart multimedia classrooms, state-of-the-art science labs, caring faculty, and holistic extracurricular programs.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/apply">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 shadow-lg hover:shadow-yellow-500/30 transition-all">
                  {isBengali ? 'অনলাইন ভর্তি আবেদন' : 'Apply for Admission'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/results">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-6">
                  {isBengali ? 'ফলাফল অনুসন্ধান' : 'Check Results'}
                </Button>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{isBengali ? '১০০% পাস রেট' : '100% Pass Rate'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{isBengali ? 'মাল্টিমিডিয়া ক্লাসরুম' : 'Smart Classrooms'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{isBengali ? 'নিরাপদ ক্যাম্পাস' : 'CCTV Surveillance'}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic with Real Demo Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                    alt="School Building & Campus"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Overlaid details */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <div className="flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full text-[11px] w-fit mb-2 shadow">
                    <Award className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'সেরা ডিজিটাল বিদ্যাপীঠ' : 'Excellence in Digital Education'}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">
                    {isBengali ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ' : 'Agrani Model High School & College'}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {isBengali ? 'স্থাপিত: ২০০১ | প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি' : 'Est. 2001 | Play Group to Class 12'}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-bold text-yellow-400 text-sm">২,৫০০+</div>
                      <div className="text-[10px] text-gray-300">{isBengali ? 'শিক্ষার্থী' : 'Students'}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-bold text-yellow-400 text-sm">৮৫+</div>
                      <div className="text-[10px] text-gray-300">{isBengali ? 'শিক্ষক' : 'Faculty'}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <div className="font-bold text-yellow-400 text-sm">১০০%</div>
                      <div className="text-[10px] text-gray-300">{isBengali ? 'সাফল্য' : 'Success'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top Badge */}
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-2xl shadow-xl p-3 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold">{isBengali ? 'A+ গ্রেড অর্জন' : 'GPA 5.00 Record'}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{isBengali ? 'বোর্ড পরীক্ষায় সেরা' : 'Top Board Results'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
