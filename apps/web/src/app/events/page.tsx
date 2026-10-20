'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Calendar, MapPin } from 'lucide-react';

export default function EventsPage() {
  const { isBengali } = useTranslation();

  const events = [
    {
      title: isBengali ? 'বার্ষিক বিজ্ঞান মেলা ও রোবটিক্স প্রদর্শনী ২০২৬' : 'Annual Science & Robotics Expo 2026',
      date: '2026-11-15',
      location: isBengali ? 'স্কুল অডিটোরিয়াম' : 'Main Auditorium',
      desc: isBengali ? 'শিক্ষার্থীদের উদ্ভাবনী প্রকল্প ও বিজ্ঞান প্রজেক্ট প্রদর্শনী।' : 'Innovative student STEM projects and live robotics demonstrations.',
    },
    {
      title: isBengali ? 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী' : 'Annual Sports Meet & Prize Giving Ceremony',
      date: '2026-12-10',
      location: isBengali ? 'স্কুল খেলার মাঠ' : 'Main Playground',
      desc: isBengali ? 'দৌড়, লং জাম্প, ক্রিকেট ও ফুটবল প্রতিযোগিতা।' : 'Athletics, track events, and championship matches.',
    },
    {
      title: isBengali ? 'মহান বিজয় দিবস উদ্‌যাপন ও সাংস্কৃতিক অনুষ্ঠান' : 'Victory Day Celebration & Cultural Program',
      date: '2026-12-16',
      location: isBengali ? 'মুক্তমঞ্চ' : 'Open Stage',
      desc: isBengali ? 'দেশাত্মবোধক গান, কবিতা আবৃত্তি ও নাটক পরিবেশনা।' : 'Patriotic music, poetry recitations, and drama performances.',
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'আসন্ন ইভেন্ট ও অনুষ্ঠানসমূহ' : 'Events & Celebrations'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'বিদ্যালয়ের বাৎসরিক ক্রীড়া, সাংস্কৃতিক ও বিজ্ঞান অনুষ্ঠান' : 'Upcoming extracurricular milestones and assemblies'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {events.map((ev, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 text-xs text-blue-700 font-semibold">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {ev.date}</span>
                <span className="flex items-center gap-1 text-gray-500"><MapPin className="w-3.5 h-3.5" /> {ev.location}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">{ev.title}</h3>
              <p className="text-xs text-gray-600">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
