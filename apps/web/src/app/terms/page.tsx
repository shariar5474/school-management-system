'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/i18n';

export default function TermsPage() {
  const { isBengali } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
            {isBengali ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isBengali ? 'অনলাইন পোর্টাল ও ওয়েবসাইট ব্যবহারের সাধারণ নীতিমালা' : 'Institutional portal and public website usage terms'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
        <p>
          Welcome to the Agrani Model High School & College web application and management system. By accessing our public website or authorized portals, you agree to comply with the terms set forth below.
        </p>
        <h2 className="text-base font-bold text-gray-900">1. Authorized Account Usage</h2>
        <p>
          Staff, teachers, students, and guardians must maintain confidentiality over their authentication credentials. Unauthorized extraction of student or financial data is prohibited and subject to institutional and legal disciplinary action.
        </p>
        <h2 className="text-base font-bold text-gray-900">2. Academic Results & Marksheets</h2>
        <p>
          Online marksheet transcripts downloaded via the public result search or student portal serve as authentic informational records as published by the examination authority. Formal hardcopy transcripts with embossing remain available via the registrar office.
        </p>
      </div>
      <Footer />
    </>
  );
}
