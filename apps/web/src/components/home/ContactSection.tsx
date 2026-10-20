'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export function ContactSection() {
  const { isBengali } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
                {isBengali ? 'যোগাযোগ' : 'Get in Touch'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] mt-3">
                {isBengali ? 'আমাদের সাথে যোগাযোগ করুন' : 'We Welcome Your Inquiries'}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {isBengali
                  ? 'ভর্তি সংক্রান্ত তথ্য, পরামর্শ বা ক্যাম্পাসে আসার জন্য আমাদের সাথে যোগাযোগ করতে পারেন।'
                  : 'Contact our administrative office for admissions, inquiries, or scheduling a campus tour.'}
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">{isBengali ? 'ক্যাম্পাসের ঠিকানা' : 'Campus Address'}</div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {isBengali
                      ? '১২৩ কলেজ রোড, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ'
                      : '123 College Road, Dhanmondi, Dhaka-1205, Bangladesh'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">{isBengali ? 'হটলাইন নম্বর' : 'Phone Numbers'}</div>
                  <div className="text-xs text-gray-600 mt-0.5">+880 1712-345678, +880 2-9876543</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">{isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}</div>
                  <div className="text-xs text-gray-600 mt-0.5">info@agranischool.edu.bd, admission@agranischool.edu.bd</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">{isBengali ? 'অফিস সময়' : 'Office Hours'}</div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {isBengali ? 'রবিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৩:৩০' : 'Sunday - Thursday: 8:00 AM - 3:30 PM'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isBengali ? 'বার্তা পাঠান' : 'Send Us a Message'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {isBengali ? 'আপনার যে কোনো প্রশ্ন বা মতামত লিখে পাঠান।' : 'Fill out the form below and our desk will respond shortly.'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(isBengali ? 'বার্তা পাঠানো হয়েছে!' : 'Message sent successfully!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label={isBengali ? 'আপনার নাম' : 'Full Name'} placeholder="e.g. Mohammad Rahim" required />
                <Input label={isBengali ? 'ফোন নম্বর' : 'Phone Number'} placeholder="+880 1712-345678" required />
              </div>
              <Input label={isBengali ? 'ইমেইল' : 'Email Address'} type="email" placeholder="rahim@example.com" />
              <Textarea label={isBengali ? 'আপনার বার্তা' : 'Your Message'} rows={4} placeholder="Write your message here..." required />
              <Button type="submit" variant="primary" className="w-full bg-[#1e3a5f] hover:bg-blue-800">
                <Send className="w-4 h-4 mr-2" />
                {isBengali ? 'বার্তা পাঠান' : 'Submit Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
