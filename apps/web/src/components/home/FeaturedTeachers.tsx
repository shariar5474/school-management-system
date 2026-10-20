'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Award, BookOpen } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function FeaturedTeachers() {
  const { isBengali } = useTranslation();

  const teachers = [
    {
      name: isBengali ? 'ড. মাহফুজা বেগম' : 'Dr. Mahfuza Begum',
      role: isBengali ? 'সহকারী প্রধান শিক্ষক ও পদার্থবিজ্ঞান' : 'Asst. Headmaster & Physics',
      qual: 'Ph.D in Physics, M.Sc (DU)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      tag: 'Science',
    },
    {
      name: isBengali ? 'মোঃ রফিকুল ইসলাম' : 'Md. Rafiqul Islam',
      role: isBengali ? 'সিনিয়র গণিত শিক্ষক' : 'Senior Mathematics Teacher',
      qual: 'M.Sc in Applied Mathematics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      tag: 'Math',
    },
    {
      name: isBengali ? 'তানিয়া সুলতানা' : 'Tania Sultana',
      role: isBengali ? 'ইংরেজি সিনিয়র প্রভাষক' : 'Senior English Lecturer',
      qual: 'M.A in English Literature (DU)',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      tag: 'English',
    },
    {
      name: isBengali ? 'আহমেদ জিয়াউল হক' : 'Ahmed Ziaul Haque',
      role: isBengali ? 'আইসিটি ও রোবটিক্স শিক্ষক' : 'ICT & Robotics Specialist',
      qual: 'B.Sc in Computer Science (BUET)',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      tag: 'ICT',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
              {isBengali ? 'শিক্ষকমণ্ডলী' : 'Expert Faculty'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] mt-3">
              {isBengali ? 'আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ' : 'Meet Our Distinguished Faculty'}
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              {isBengali
                ? 'দেশসেরা বিশ্ববিদ্যালয় থেকে উচ্চশিক্ষিত ও আধুনিক পাঠদানে অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে পাঠদান।'
                : 'Passionate and certified educators committed to shaping the intellectual future of every student.'}
            </p>
          </div>

          <Link
            href="/teachers"
            className="inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900 group"
          >
            <span>{isBengali ? 'সকল শিক্ষক দেখুন' : 'View All Faculty'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-blue-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {teacher.tag}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">{teacher.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{teacher.qual}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  {isBengali ? '১০+ বছরের অভিজ্ঞতা' : '10+ Yrs Exp.'}
                </span>
                <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                  {isBengali ? 'প্রোফাইল' : 'Profile'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
