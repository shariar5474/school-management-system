'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Camera, Eye } from 'lucide-react';

export default function GalleryPage() {
  const { isBengali } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const albums = [
    {
      title: isBengali ? 'বিজ্ঞান গবেষণাগার ও উদ্ভাবন মেলা' : 'Science Fair & Practical Lab',
      category: 'academic',
      categoryName: isBengali ? 'একাডেমিক' : 'Academic',
      count: '24 Photos',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      date: 'March 2026',
    },
    {
      title: isBengali ? 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও ফুটবল ফাইনাল' : 'Annual Sports & Football Championship',
      category: 'sports',
      categoryName: isBengali ? 'খেলাধুলা' : 'Sports',
      count: '36 Photos',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      date: 'February 2026',
    },
    {
      title: isBengali ? 'ডিজিটাল স্মার্ট ক্লাসরুমে পাঠদান' : 'Smart Interactive Classrooms',
      category: 'academic',
      categoryName: isBengali ? 'একাডেমিক' : 'Academic',
      count: '18 Photos',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      date: 'January 2026',
    },
    {
      title: isBengali ? 'সাংস্কৃতিক সন্ধ্যা ও বিতর্ক প্রতিযোগিতা' : 'Cultural Evening & Inter-School Debate',
      category: 'cultural',
      categoryName: isBengali ? 'সাংস্কৃতিক' : 'Cultural',
      count: '28 Photos',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      date: 'December 2025',
    },
    {
      title: isBengali ? 'কম্পিউটার ও আইসিটি প্রোগ্রামিং ল্যাব' : 'ICT & Coding Laboratory',
      category: 'facility',
      categoryName: isBengali ? 'সুযোগ-সুবিধা' : 'Facilities',
      count: '15 Photos',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      date: 'November 2025',
    },
    {
      title: isBengali ? 'কেন্দ্রীয় লাইব্রেরি ও বুক রিডিং কর্নার' : 'Central Library & Reading Hall',
      category: 'facility',
      categoryName: isBengali ? 'সুযোগ-সুবিধা' : 'Facilities',
      count: '20 Photos',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      date: 'October 2025',
    },
    {
      title: isBengali ? 'প্রাক-প্রাথমিক আনন্দময় শিশু শ্রেণিকক্ষ' : 'Pre-Primary Playgroup & Kindergarten',
      category: 'academic',
      categoryName: isBengali ? 'একাডেমিক' : 'Academic',
      count: '22 Photos',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      date: 'October 2025',
    },
    {
      title: isBengali ? 'ঐতিহাসিক স্কুল ভবন ও ক্যাম্পাস প্রাঙ্গণ' : 'Main Academic Building & Campus',
      category: 'facility',
      categoryName: isBengali ? 'সুযোগ-সুবিধা' : 'Facilities',
      count: '12 Photos',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      date: 'September 2025',
    },
  ];

  const filteredAlbums = activeFilter === 'all'
    ? albums
    : albums.filter((a) => a.category === activeFilter);

  return (
    <>
      <Header />
      <div className="bg-[#1e3a5f] text-white py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-4 h-4" />
            <span>{isBengali ? 'ক্যাম্পাস স্মৃতিচিত্র' : 'Visual Highlights'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {isBengali ? 'ফটো ও ভিডিও গ্যালারি' : 'Campus Photo Gallery'}
          </h1>
          <p className="text-sm text-blue-200 mt-2 max-w-2xl">
            {isBengali
              ? 'আমাদের ক্যাম্পাসের বর্ণিল মুহূর্তসমূহ, খেলাধুলা, বিজ্ঞান মেলা ও সাংস্কৃতিক উৎসবের জীবন্ত চিত্র।'
              : 'Cherished memories, academic triumphs, sporting events, and campus life at Agrani.'}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { id: 'all', label: isBengali ? 'সকল অ্যালবাম' : 'All Albums' },
              { id: 'academic', label: isBengali ? 'একাডেমিক' : 'Academic' },
              { id: 'sports', label: isBengali ? 'খেলাধুলা' : 'Sports' },
              { id: 'cultural', label: isBengali ? 'সাংস্কৃতিক' : 'Cultural' },
              { id: 'facility', label: isBengali ? 'সুযোগ-সুবিধা' : 'Facilities' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-yellow-500 text-gray-900 shadow'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAlbums.map((alb, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={alb.image}
                    alt={alb.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-blue-900 px-2.5 py-1 rounded shadow">
                    {alb.categoryName}
                  </span>

                  <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded">
                    {alb.count}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {alb.title}
                  </h3>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                <span>{alb.date}</span>
                <span className="text-blue-600 font-semibold group-hover:underline inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {isBengali ? 'দেখুন' : 'View'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
