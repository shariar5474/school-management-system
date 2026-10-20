'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Mail, GraduationCap, Award } from 'lucide-react';

export default function TeachersPage() {
  const { isBengali } = useTranslation();

  const teachers = [
    {
      name: isBengali ? 'প্রফেসর মোহাম্মদ হারুনুর রশীদ' : 'Prof. Mohammad Harunur Rashid',
      designation: isBengali ? 'অধ্যক্ষ' : 'Principal',
      dept: 'Administration',
      qual: 'M.Sc (1st Class), B.Ed',
      email: 'principal@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '২৫+ বছরের শিক্ষকতা' : '25+ Yrs Experience',
    },
    {
      name: isBengali ? 'ড. মাহফুজা বেগম' : 'Dr. Mahfuza Begum',
      designation: isBengali ? 'সহকারী প্রধান শিক্ষক' : 'Assistant Headmaster',
      dept: 'Physics & Science',
      qual: 'Ph.D in Physics, M.Sc (DU)',
      email: 'mahfuza@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১৮+ বছরের শিক্ষকতা' : '18+ Yrs Experience',
    },
    {
      name: isBengali ? 'মোঃ রফিকুল ইসলাম' : 'Md. Rafiqul Islam',
      designation: isBengali ? 'সিনিয়র গণিত শিক্ষক' : 'Senior Mathematics Teacher',
      dept: 'Mathematics',
      qual: 'M.Sc in Applied Mathematics',
      email: 'rafiqul@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১৫+ বছরের শিক্ষকতা' : '15+ Yrs Experience',
    },
    {
      name: isBengali ? 'তানিয়া সুলতানা' : 'Tania Sultana',
      designation: isBengali ? 'ইংরেজি সিনিয়র প্রভাষক' : 'Senior English Lecturer',
      dept: 'English Language & Lit',
      qual: 'M.A in English Literature (DU)',
      email: 'tania@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১২+ বছরের শিক্ষকতা' : '12+ Yrs Experience',
    },
    {
      name: isBengali ? 'আহমেদ জিয়াউল হক' : 'Ahmed Ziaul Haque',
      designation: isBengali ? 'আইসিটি ও কম্পিউটার শিক্ষক' : 'ICT & Computer Teacher',
      dept: 'Information Technology',
      qual: 'B.Sc in Computer Science (BUET)',
      email: 'ziaul@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১০+ বছরের শিক্ষকতা' : '10+ Yrs Experience',
    },
    {
      name: isBengali ? 'নাজমা আক্তার' : 'Nazma Akhter',
      designation: isBengali ? 'বাংলা সিনিয়র শিক্ষক' : 'Senior Bengali Teacher',
      dept: 'Bengali Language & Arts',
      qual: 'M.A in Bengali (JU)',
      email: 'nazma@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১৪+ বছরের শিক্ষকতা' : '14+ Yrs Experience',
    },
    {
      name: isBengali ? 'কাজী মনিরুজ্জামান' : 'Kazi Moniruzzaman',
      designation: isBengali ? 'রসায়ন প্রভাষক' : 'Lecturer in Chemistry',
      dept: 'Chemistry',
      qual: 'M.Sc in Chemistry (RU)',
      email: 'monir@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '৯+ বছরের শিক্ষকতা' : '9+ Yrs Experience',
    },
    {
      name: isBengali ? 'ফারহানা ইসলাম' : 'Farhana Islam',
      designation: isBengali ? 'জীববিজ্ঞান শিক্ষক' : 'Biology Teacher',
      dept: 'Biology & Botany',
      qual: 'M.Sc in Zoology (DU)',
      email: 'farhana@agranischool.edu.bd',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      experience: isBengali ? '১১+ বছরের শিক্ষকতা' : '11+ Yrs Experience',
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-[#1e3a5f] text-white py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>{isBengali ? 'অভিজ্ঞ শিক্ষকমণ্ডলী' : 'Dedicated Faculty'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {isBengali ? 'আমাদের শিক্ষক ও অনুষদ সদস্যবৃন্দ' : 'Our Distinguished Faculty'}
          </h1>
          <p className="text-sm text-blue-200 mt-2 max-w-2xl">
            {isBengali
              ? 'স্নেহ, মেধা ও পেশাদারিত্বের সাথে পাঠদানে নিয়োজিত আমাদের সম্মানিত শিক্ষক-শিক্ষিকাবৃন্দ।'
              : 'Passionate and certified educators guiding the moral and intellectual future of every student.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-blue-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {t.dept}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                    {t.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700 mt-0.5">{t.designation}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.qual}</div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-gray-50 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.experience}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{t.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
