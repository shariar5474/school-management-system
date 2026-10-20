'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Award } from 'lucide-react';

export default function ChairmanMessagePage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'গভর্নিং বডির সভাপতির বাণী' : "Chairman's Message"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'সভাপতি, পরিচালনা পর্ষদ' : 'Chairman, Governing Body'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-gray-700 text-sm leading-relaxed">
        <p>
          {isBengali
            ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ পরিচালনা পর্ষদের পক্ষ থেকে আমি সকল অভিভাবক, শিক্ষক, কর্মকর্তা ও প্রিয় শিক্ষার্থীদের জানাই আন্তরিক অভিনন্দন। ১৯৯৫ সাল থেকে এই প্রতিষ্ঠানটি সুনামের সাথে আধুনিক শিক্ষার আলো ছড়িয়ে আসছে।'
            : 'On behalf of the Governing Body of Agrani Model High School & College, I extend my heartfelt gratitude to our teachers, patrons, parents, and bright students.'}
        </p>

        <p>
          {isBengali
            ? 'আমাদের গভর্নিং বডি সর্বদা ক্যাম্পাসের অবকাঠামোগত উন্নয়ন, শিক্ষকদের পেশাগত প্রশিক্ষণ এবং শিক্ষার্থীদের নিরাপদ ও আনন্দময় শিক্ষার পরিবেশ নিশ্চিত করতে নিরলসভাবে কাজ করে যাচ্ছে।'
            : 'We remain steadfast in our dedication to continually upgrading campus infrastructure, adopting cutting-edge pedagogical tools, and sustaining a secure learning sanctuary.'}
        </p>
      </div>
      <Footer />
    </>
  );
}
