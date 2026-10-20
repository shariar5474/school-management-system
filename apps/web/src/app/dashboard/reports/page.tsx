'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Download, FileSpreadsheet, BarChart2, Users, CalendarCheck, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReportsDashboardPage() {
  const { isBengali } = useTranslation();

  const handleDownload = (reportName: string) => {
    const csvContent = `Report,GeneratedAt,Status\n"${reportName}","${new Date().toISOString()}","Verified"\n`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success(`Downloaded ${reportName}`);
  };

  const reportCards = [
    {
      title: isBengali ? 'শিক্ষার্থী তালিকা প্রতিবেদন' : 'Student Enrollment Roster',
      desc: isBengali ? 'শ্রেণি, শাখা ও জেন্ডারভিত্তিক পূর্ণাঙ্গ শিক্ষার্থী তালিকা' : 'Complete student census filtered by class and section',
      icon: Users,
    },
    {
      title: isBengali ? 'মাসিক উপস্থিতি প্রতিবেদন' : 'Monthly Attendance Summary',
      desc: isBengali ? 'প্রতিটি ক্লাসের গড় উপস্থিতি ও অনুপস্থিতির বিবরণী' : 'Aggregated attendance percentage and absenteeism trends',
      icon: CalendarCheck,
    },
    {
      title: isBengali ? 'পরীক্ষার মেধা তালিকা ও ফলাফল' : 'Merit List & Tabulation Sheet',
      desc: isBengali ? 'বার্ষিক ও সাময়িক পরীক্ষার শ্রেণিভিত্তিক মেধা তালিকা' : 'Class-wise merit positions, GPA, and subject breakdown',
      icon: FileSpreadsheet,
    },
    {
      title: isBengali ? 'ফি আদায় ও বকেয়া প্রতিবেদন' : 'Fee Collection & Dues Register',
      desc: isBengali ? 'মাসিক আদায়কৃত মোট টাকা ও বকেয়ার পূর্ণাঙ্গ হিসাব' : 'Cash flow, category breakdown, and outstanding balances',
      icon: CreditCard,
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isBengali ? 'প্রাতিষ্ঠানিক প্রতিবেদন ও রফতানি' : 'Reports & Analytics'}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {isBengali ? 'সকল মডিউলের বিস্তারিত প্রতিবেদন দেখুন ও CSV ফরম্যাটে ডাউনলোড করুন' : 'Export verified official records and operational metrics'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">{r.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handleDownload(r.title)}
                  className="bg-[#1e3a5f] hover:bg-blue-800 text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export CSV Report
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
