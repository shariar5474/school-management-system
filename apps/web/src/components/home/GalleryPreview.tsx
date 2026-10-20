'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function GalleryPreview() {
  const { isBengali } = useTranslation();

  const galleryItems = [
    {
      title: isBengali ? 'বিজ্ঞান গবেষণাগার ও প্র্যাকটিক্যাল' : 'Modern Science & Physics Lab',
      category: isBengali ? 'গবেষণা' : 'Laboratory',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-2 md:row-span-2',
      height: 'h-80 md:h-full',
    },
    {
      title: isBengali ? 'ডিজিটাল স্মার্ট মাল্টিমিডিয়া ক্লাসরুম' : 'Smart Multimedia Classrooms',
      category: isBengali ? 'একাডেমিক' : 'Academic',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-1',
      height: 'h-48 md:h-52',
    },
    {
      title: isBengali ? 'হাইটেক কম্পিউটার ও কোডিং ল্যাব' : 'ICT & Computer Programming Lab',
      category: isBengali ? 'আইসিটি' : 'Technology',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-1',
      height: 'h-48 md:h-52',
    },
    {
      title: isBengali ? 'বার্ষিক ক্রীড়া ও ফুটবল টুর্নামেন্ট' : 'Annual Sports & Athletics',
      category: isBengali ? 'খেলাধুলা' : 'Sports',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-1',
      height: 'h-48 md:h-52',
    },
    {
      title: isBengali ? 'সমৃদ্ধ কেন্দ্রীয় লাইব্রেরি ও বুক কর্নার' : 'Central Library & Reading Zone',
      category: isBengali ? 'লাইব্রেরি' : 'Library',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-1 md:row-span-1',
      height: 'h-48 md:h-52',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
              <Camera className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
              {isBengali ? 'ক্যাম্পাস গ্যালারি' : 'Campus Moments'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] mt-3">
              {isBengali ? 'জীবন্ত ও বর্ণিল ক্যাম্পাস জীবন' : 'A Vibrant Learning Atmosphere'}
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              {isBengali
                ? 'শ্রেণিকক্ষ থেকে শুরু করে খেলার মাঠ—আমাদের শিক্ষার্থীদের বহুমুখী মেধা বিকাশের খণ্ডচিত্র।'
                : 'Glance into our vibrant community, modern facilities, sporting championships, and creative events.'}
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900 group"
          >
            <span>{isBengali ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'Explore Full Gallery'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group ${item.span} ${item.height} bg-slate-900`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-500 text-gray-900 px-2 py-0.5 rounded shadow">
                  {item.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base mt-2 group-hover:text-yellow-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
