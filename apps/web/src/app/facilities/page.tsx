'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Monitor, BookOpen, FlaskConical, Trophy, ShieldCheck, Bus, Sparkles } from 'lucide-react';

export default function FacilitiesPage() {
  const { isBengali } = useTranslation();

  const facilities = [
    {
      icon: Monitor,
      title: isBengali ? 'ডিজিটাল স্মার্ট ক্লাসরুম' : 'Smart Digital Classrooms',
      desc: isBengali
        ? 'ইন্টারেক্টিভ মাল্টিমিডিয়া প্রজেক্টর, সাউন্ড সিস্টেম ও হাই-স্পিড ওয়াইফাই সংবলিত আধুনিক শীতাতপ নিয়ন্ত্রিত শ্রেণিকক্ষ।'
        : 'Interactive multimedia screens, digital sound, high-speed WiFi, and ergonomic student seating.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      badge: 'Interactive ICT',
    },
    {
      icon: FlaskConical,
      title: isBengali ? 'আধুনিক বিজ্ঞান গবেষণাগার' : 'Advanced Science Labs',
      desc: isBengali
        ? 'পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞানের পৃথক শীতাতপ নিয়ন্ত্রিত ল্যাবরেটরি যেখানে শিক্ষার্থীরা হাতে-কলমে পরীক্ষার সুযোগ পায়।'
        : 'Separate dedicated air-conditioned laboratories for Physics, Chemistry, and Biology practical research.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      badge: 'Modern Equipment',
    },
    {
      icon: BookOpen,
      title: isBengali ? 'সমৃদ্ধ কেন্দ্রীয় গ্রন্থাগার' : 'Comprehensive Central Library',
      desc: isBengali
        ? '১৫,০০০+ পাঠ্য ও রেফারেন্স বই, আন্তর্জাতিক গবেষণা জার্নাল, দৈনিক সংবাদপত্র এবং শান্ত রিডিং কর্নার।'
        : 'Over 15,000 curriculum, literary, and reference volumes, research journals, and quiet reading zones.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      badge: '15,000+ Books',
    },
    {
      icon: Trophy,
      title: isBengali ? 'সুপরিসর খেলার মাঠ ও স্পোর্টস কমপ্লেক্স' : 'Sprawling Playground & Sports',
      desc: isBengali
        ? 'ফুটবল ও ক্রিকেট মাঠ, বাস্কেটবল কোর্ট এবং ইনডোর টেবিল টেনিস ও ব্যাডমিন্টন খেলার সার্বিক ব্যবস্থা।'
        : 'Expansive outdoor pitches for football and cricket, along with indoor table tennis and badminton.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      badge: 'Active Athletics',
    },
    {
      icon: Monitor,
      title: isBengali ? 'হাইটেক কম্পিউটার ও রোবটিক্স ল্যাব' : 'ICT & Robotics Laboratory',
      desc: isBengali
        ? '১০০+ কোর আই৭ কম্পিউটার সমৃদ্ধ ল্যাব যেখানে পাইথন প্রোগ্রামিং, ওয়েব ডেভেলপমেন্ট ও রোবটিক্স শেখানো হয়।'
        : '100+ high-end workstations with dedicated training in Python coding, web design, and AI robotics.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      badge: '100+ Systems',
    },
    {
      icon: ShieldCheck,
      title: isBengali ? 'নিরাপত্তা ও সিসিটিভি নজরদারি' : '24/7 Security & CCTV',
      desc: isBengali
        ? 'পুরো ক্যাম্পাস জুড়ে ১৬০+ হাই-ডেফিনিশন নাইট ভিশন সিসিটিভি এবং সার্বক্ষণিক পেশাদার নিরাপত্তা কর্মী।'
        : 'Full campus perimeter CCTV surveillance and certified safety personnel ensuring a secure environment.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      badge: 'Safe Campus',
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-[#1e3a5f] text-white py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{isBengali ? 'আন্তর্জাতিক মানসম্পন্ন অবকাঠামো' : 'Global Infrastructure'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {isBengali ? 'ক্যাম্পাসের সুযোগ-সুবিধা' : 'Campus Facilities & Infrastructure'}
          </h1>
          <p className="text-sm text-blue-200 mt-2 max-w-2xl">
            {isBengali
              ? 'শিক্ষার্থীদের মেধা বিকাশ, সুস্থ শরীর ও সৃষ্টিশীল চিন্তাভাবনার অনুকূল বিশ্বমানের প্রাতিষ্ঠানিক পরিবেশ।'
              : 'World-class educational facilities engineered to nurture intellect, fitness, and creative vision.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-blue-900 flex items-center justify-center shadow">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-yellow-500 text-gray-900 px-2.5 py-1 rounded-full shadow">
                      {f.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-xs font-semibold text-blue-700 flex items-center justify-between">
                  <span>{isBengali ? 'সকল শিক্ষার্থীর জন্য উন্মুক্ত' : 'Available for all students'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
