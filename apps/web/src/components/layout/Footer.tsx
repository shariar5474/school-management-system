'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function Footer() {
  const { isBengali } = useTranslation();

  return (
    <footer className="bg-[#0f1d30] text-gray-300 pt-16 pb-8 border-t-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About School */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-gray-900 shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg text-white">
                {isBengali ? 'অগ্রণী মডেল উচ্চ বিদ্যালয়' : 'Agrani Model High School'}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isBengali
                ? 'একটি আধুনিক, যুগোপযোগী এবং মানসম্মত শিক্ষাপ্রতিষ্ঠান। প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত ডিজিটাল পাঠদান ও সার্বিক চরিত্র গঠন।'
                : 'A premier educational institution dedicated to academic excellence, discipline, and moral values from Play Group to Class 12.'}
            </p>
            <div className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">
              EIIN: 108542 | School Code: 2045
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-yellow-500 pl-2">
              {isBengali ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'আমাদের সম্পর্কে' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/academic-programs" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'শিক্ষাক্রম ও বিভাগ' : 'Academic Programs'}
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'অনলাইন ভর্তি আবেদন' : 'Online Admission'}
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'পরীক্ষার ফলাফল' : 'Examination Results'}
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'নোটিশ বোর্ড' : 'Notice Board'}
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'একাডেমিক ক্যালেন্ডার' : 'Academic Calendar'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Policies */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-yellow-500 pl-2">
              {isBengali ? 'নীতিমালা ও তথ্য' : 'Policies & Info'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rules" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'স্কুল নিয়মাবলী' : 'School Rules'}
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'ক্যাম্পাস সুবিধা' : 'Campus Facilities'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-yellow-400 transition-colors">
                  {isBengali ? 'স্টাফ ও পোর্টাল লগইন' : 'Staff Portal Login'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-yellow-500 pl-2">
              {isBengali ? 'যোগাযোগ' : 'Contact Information'}
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>
                  {isBengali
                    ? '১২৩ কলেজ রোড, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ'
                    : '123 College Road, Dhanmondi, Dhaka-1205, Bangladesh'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>+880 1712-345678, +880 2-9876543</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>info@agranischool.edu.bd</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>
                  {isBengali
                    ? 'রবি - বৃহস্পতি: সকাল ৮:০০ - বিকাল ৩:৩০'
                    : 'Sun - Thu: 8:00 AM - 3:30 PM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()}{' '}
            {isBengali ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ।' : 'Agrani Model High School & College.'}{' '}
            {isBengali ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-gray-400">Developed by</span>
            <a
              href="YOUR_FACEBOOK_PAGE_URL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Developer Facebook Page - SHARIAR ISLAM SOHEL"
              className="inline-flex items-center gap-1.5 font-bold text-yellow-400 hover:text-blue-400 hover:underline transition-all duration-200 group px-2 py-1 rounded-md hover:bg-white/5 active:scale-95"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform shrink-0" />
              <span>SHARIAR ISLAM SOHEL</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
