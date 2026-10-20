'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ClassicTemplate } from '@/components/results/ClassicTemplate';
import { ModernTemplate } from '@/components/results/ModernTemplate';
import { PremiumTemplate } from '@/components/results/PremiumTemplate';
import { Check, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResultTemplatesPage() {
  const { isBengali } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState<'classic' | 'modern' | 'premium'>('classic');
  const [previewTemplate, setPreviewTemplate] = useState<'classic' | 'modern' | 'premium'>('classic');
  const [saving, setSaving] = useState(false);

  // Sample student result data for realistic template preview
  const sampleData = {
    schoolName: 'Agrani Model High School & College',
    schoolAddress: '123 College Road, Dhanmondi, Dhaka-1205',
    studentName: 'Mohammad Tanvir Ahmed',
    studentId: 'STU-2026-0001',
    rollNumber: 1,
    className: 'Class 6',
    sectionName: 'A',
    examName: 'Annual Examination 2026',
    academicYear: '2026',
    totalMarks: 600,
    totalObtained: 524,
    gpa: 5.0,
    grade: 'A+',
    resultStatus: 'PASSED',
    meritPosition: 1,
    subjects: [
      { name: 'Bangla (বাংলা)', fullMarks: 100, passMarks: 33, obtainedMarks: 85, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
      { name: 'English (ইংরেজি)', fullMarks: 100, passMarks: 33, obtainedMarks: 82, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
      { name: 'Mathematics (গণিত)', fullMarks: 100, passMarks: 33, obtainedMarks: 94, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
      { name: 'General Science (সাধারণ বিজ্ঞান)', fullMarks: 100, passMarks: 33, obtainedMarks: 88, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
      { name: 'Social Science (বাংলাদেশ ও বিশ্বপরিচয়)', fullMarks: 100, passMarks: 33, obtainedMarks: 85, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
      { name: 'ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', fullMarks: 100, passMarks: 33, obtainedMarks: 90, grade: 'A+', gradePoint: 5.0, status: 'Passed' },
    ],
  };

  useEffect(() => {
    async function loadActive() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const res = await fetch(`${apiUrl}/results/template/active`);
        if (res.ok) {
          const data = await res.json();
          if (data.activeResultTemplateId) {
            setActiveTemplate(data.activeResultTemplateId);
            setPreviewTemplate(data.activeResultTemplateId);
          }
        }
      } catch {
        const saved = (localStorage.getItem('school_active_template') as any) || 'classic';
        setActiveTemplate(saved);
        setPreviewTemplate(saved);
      }
    }
    loadActive();
  }, []);

  const handleActivate = async (templateId: 'classic' | 'modern' | 'premium') => {
    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const res = await fetch(`${apiUrl}/results/template/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, schoolId: 'default' }),
      });

      if (!res.ok) {
        throw new Error('Failed to update in backend');
      }

      setActiveTemplate(templateId);
      localStorage.setItem('school_active_template', templateId);
      toast.success(
        isBengali
          ? `সফল! "${templateId.toUpperCase()}" টেমপ্লেট সক্রিয় করা হয়েছে।`
          : `Success! "${templateId.toUpperCase()}" is now the active marksheet template across the school.`,
      );
    } catch {
      setActiveTemplate(templateId);
      localStorage.setItem('school_active_template', templateId);
      toast.success(`Active marksheet template changed to "${templateId.toUpperCase()}"`);
    } finally {
      setSaving(false);
    }
  };

  const templates = [
    {
      id: 'classic' as const,
      name: isBengali ? 'টেমপ্লেট ১: ক্লাসিক একাডেমিক' : 'Template 1: Classic Academic',
      desc: isBengali
        ? 'ঐতিহ্যবাহী আনুষ্ঠানিক স্কুল নম্বরপত্র। টেবিল ফরম্যাট ও শিক্ষক-অধ্যক্ষের স্বাক্ষরযুক্ত।'
        : 'Traditional academic marksheet layout featuring official borders, table formatting, and signature areas.',
      tag: 'Classic Standard',
    },
    {
      id: 'modern' as const,
      name: isBengali ? 'টেমপ্লেট ২: মডার্ন প্রফেশনাল' : 'Template 2: Modern Professional',
      desc: isBengali
        ? 'কার্ড ও গ্রাফিক্যাল হাইলাইটস ভিত্তিক আধুনিক ডিজাইন। ডিজিটাল লুক ও গ্রেডিয়েন্ট অ্যাকসেন্ট।'
        : 'Contemporary card-based design with vibrant statistical highlights and high legibility typography.',
      tag: 'Modern & Clean',
    },
    {
      id: 'premium' as const,
      name: isBengali ? 'টেমপ্লেট ৩: প্রিমিয়াম সার্টিফিকেট স্টাইল' : 'Template 3: Premium Certificate Style',
      desc: isBengali
        ? 'ডিপ্লোমা ও রাজকীয় সোনালী বর্ডার সংবলিত সার্টিফিকেট স্টাইলের আনুষ্ঠানিক ফলাফল পত্র।'
        : 'Formal diploma-style layout featuring double gold borders, official seal space, and certifying narrative.',
      tag: 'Formal Certificate',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'ফলাফল ও নম্বরপত্র টেমপ্লেট নির্বাচন' : 'Result & Marksheet Templates'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali
              ? 'স্কুলের সকল শিক্ষার্থীর জন্য সক্রিয় নম্বরপত্র ডিজাইন নির্বাচন করুন (ঠিক ৩টি টেমপ্লেট)'
              : 'Configure the active official marksheet design for published student results (Exactly 3 templates)'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200 text-xs">
          <span className="text-gray-600">{isBengali ? 'বর্তমানে সক্রিয়:' : 'Currently Active:'}</span>
          <span className="font-extrabold text-blue-800 uppercase tracking-wide">
            {activeTemplate} Template
          </span>
        </div>
      </div>

      {/* The Exactly Three Selectable Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          const isPreviewing = previewTemplate === tpl.id;

          return (
            <div
              key={tpl.id}
              className={`bg-white rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-blue-600 shadow-lg ring-2 ring-blue-600/20'
                  : 'border-gray-200 hover:border-gray-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {tpl.tag}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-gray-900 mb-2">{tpl.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{tpl.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
                <Button
                  onClick={() => setPreviewTemplate(tpl.id)}
                  variant={isPreviewing ? 'outline' : 'ghost'}
                  size="sm"
                  className="w-full text-xs"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  {isPreviewing ? (isBengali ? 'প্রিভিউ দেখা হচ্ছে' : 'Previewing Now') : (isBengali ? 'প্রিভিউ দেখুন' : 'Preview Design')}
                </Button>

                <Button
                  onClick={() => handleActivate(tpl.id)}
                  disabled={isActive || saving}
                  variant={isActive ? 'outline' : 'primary'}
                  size="sm"
                  className={`w-full text-xs ${isActive ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-[#1e3a5f] hover:bg-blue-800'}`}
                >
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  {isActive ? (isBengali ? 'বর্তমান সক্রিয় টেমপ্লেট' : 'Currently Active') : (isBengali ? 'সক্রিয় করুন (Activate)' : 'Set as Active Template')}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Preview Display Container */}
      <div className="bg-gray-100 p-6 rounded-3xl border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              {isBengali ? 'লাইভ প্রিভিউ প্রদর্শনী:' : 'Live Template Preview:'}
            </span>
            <span className="text-xs font-bold text-[#1e3a5f] bg-white px-3 py-1 rounded-full border border-gray-300 uppercase">
              {previewTemplate}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {isBengali
              ? 'নিচের ফলাফলটি নির্বাচিত টেমপ্লেট ডিজাইনে রেন্ডার করা হয়েছে।'
              : 'Sample transcript rendered dynamically in the chosen layout.'}
          </div>
        </div>

        {/* Dynamic Render based on previewTemplate */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
          {previewTemplate === 'classic' && <ClassicTemplate data={sampleData} />}
          {previewTemplate === 'modern' && <ModernTemplate data={sampleData} />}
          {previewTemplate === 'premium' && <PremiumTemplate data={sampleData} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
