'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Globe, GraduationCap, LogIn, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '../ui/Button';

export function Header() {
  const { t, locale, toggleLocale, isBengali } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-[#1e3a5f] text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              +880 1712-345678
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-yellow-400" />
              info@agranischool.edu.bd
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-2.5 py-1 rounded text-xs font-medium cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-yellow-400" />
              <span>{isBengali ? 'English' : 'বাংলা'}</span>
            </button>

            <Link
              href="/results"
              className="hover:text-yellow-400 transition-colors text-xs font-medium"
            >
              {isBengali ? 'ফলাফল অনুসন্ধান' : 'Search Result'}
            </Link>

            <Link
              href="/apply"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-2.5 py-1 rounded text-xs transition-colors"
            >
              {isBengali ? 'ভর্তি আবেদন' : 'Apply Online'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1e3a5f] to-[#2563eb] flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="block font-bold text-lg sm:text-xl text-[#1e3a5f] group-hover:text-blue-600 transition-colors leading-tight">
                {isBengali ? 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ' : 'Agrani Model High School & College'}
              </span>
              <span className="block text-xs text-gray-500">
                {isBengali ? 'জ্ঞান, চরিত্র ও উৎকর্ষ' : 'Knowledge, Character, Excellence'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'হোম' : 'Home'}
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span>{isBengali ? 'আমাদের সম্পর্কে' : 'About'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'বিদ্যালয় পরিচিতি' : 'About School'}
                  </Link>
                  <Link href="/principal-message" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'অধ্যক্ষের বাণী' : "Principal's Message"}
                  </Link>
                  <Link href="/chairman-message" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'সভাপতির বাণী' : "Chairman's Message"}
                  </Link>
                  <Link href="/mission-vision" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission & Vision'}
                  </Link>
                  <Link href="/teachers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'শিক্ষকমণ্ডলী ও কর্মকর্তা' : 'Teachers & Staff'}
                  </Link>
                </div>
              )}
            </div>

            {/* Academic Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span>{isBengali ? 'একাডেমিক' : 'Academics'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {academicDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                  onMouseLeave={() => setAcademicDropdownOpen(false)}
                >
                  <Link href="/academic-programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'শিক্ষাক্রম ও বিভাগ' : 'Academic Programs'}
                  </Link>
                  <Link href="/classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'শ্রেণি ও শাখা' : 'Classes & Sections'}
                  </Link>
                  <Link href="/facilities" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'সুযোগ-সুবিধা' : 'Facilities'}
                  </Link>
                  <Link href="/rules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'নিয়মাবলী ও আচরণবিধি' : 'School Rules'}
                  </Link>
                  <Link href="/calendar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {isBengali ? 'একাডেমিক ক্যালেন্ডার' : 'Academic Calendar'}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/admission-info"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'ভর্তি তথ্য' : 'Admissions'}
            </Link>

            <Link
              href="/notices"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'নোটিশ বোর্ড' : 'Notices'}
            </Link>

            <Link
              href="/events"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'ইভেন্ট' : 'Events'}
            </Link>

            <Link
              href="/gallery"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'গ্যালারি' : 'Gallery'}
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isBengali ? 'যোগাযোগ' : 'Contact'}
            </Link>
          </nav>

          {/* Login Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="primary" size="sm" className="bg-[#1e3a5f] hover:bg-blue-800">
                <LogIn className="w-4 h-4 mr-1.5" />
                {isBengali ? 'লগইন' : 'Login'}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-6 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'হোম' : 'Home'}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'বিদ্যালয় পরিচিতি' : 'About School'}
          </Link>
          <Link
            href="/academic-programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'শিক্ষাক্রম' : 'Academic Programs'}
          </Link>
          <Link
            href="/teachers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'শিক্ষকমণ্ডলী' : 'Teachers'}
          </Link>
          <Link
            href="/admission-info"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'ভর্তি তথ্য' : 'Admissions'}
          </Link>
          <Link
            href="/notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'নোটিশ' : 'Notices'}
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'ফলাফল অনুসন্ধান' : 'Search Result'}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {isBengali ? 'যোগাযোগ' : 'Contact'}
          </Link>
          <div className="pt-4 border-t border-gray-100 flex gap-2">
            <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full bg-[#1e3a5f]">
                <LogIn className="w-4 h-4 mr-1.5" />
                {isBengali ? 'লগইন' : 'Login'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
