'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'শিক্ষার্থী ও অভিভাবকদের তথ্যের সুরক্ষা নীতিমালা' : 'How we safeguard student and institutional records'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
        <p>
          At Agrani Model High School & College, data privacy, confidentiality, and security of academic records are fundamental obligations. This policy explains how student and guardian records are collected, utilized, and protected.
        </p>
        <h2 className="text-base font-bold text-gray-900">1. Data We Collect</h2>
        <p>
          We collect basic student profile details (name, date of birth, blood group), guardian contact details, attendance records, academic exam results, and fee payment history purely for institutional operation and verification.
        </p>
        <h2 className="text-base font-bold text-gray-900">2. Data Security & Storage</h2>
        <p>
          All data is securely managed through Firebase Authentication, Firestore document database, and encrypted token-based sessions. Personal student marks and records are restricted strictly to authorized faculty and linked guardians.
        </p>
      </div>
      <Footer />
    </>
  );
}
