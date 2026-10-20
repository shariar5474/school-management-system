'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, BookOpen, Layers, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AcademicsDashboardPage() {
  const { isBengali } = useTranslation();
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'years'>('classes');
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const classes = [
    { id: '1', nameEn: 'Play Group', nameBn: 'প্লে গ্রুপ', order: 0, sections: ['A', 'B'] },
    { id: '2', nameEn: 'Nursery', nameBn: 'নার্সারি', order: 1, sections: ['A', 'B'] },
    { id: '3', nameEn: 'KG', nameBn: 'কেজি', order: 2, sections: ['A', 'B'] },
    { id: '4', nameEn: 'Class 1', nameBn: 'প্রথম শ্রেণি', order: 3, sections: ['A', 'B'] },
    { id: '5', nameEn: 'Class 6', nameBn: 'ষষ্ঠ শ্রেণি', order: 8, sections: ['A', 'B', 'C'] },
    { id: '6', nameEn: 'Class 9', nameBn: 'নবম শ্রেণি', order: 11, sections: ['Science-A', 'Commerce-A', 'Arts-A'] },
    { id: '7', nameEn: 'Class 11 (College)', nameBn: 'একাদশ শ্রেণি', order: 13, sections: ['Science', 'Commerce', 'Humanities'] },
  ];

  const subjects = [
    { id: '1', code: 'BNG-101', nameEn: 'Bangla 1st Paper', nameBn: 'বাংলা প্রথম পত্র', fullMarks: 100, passMarks: 33 },
    { id: '2', code: 'ENG-101', nameEn: 'English 1st Paper', nameBn: 'ইংরেজি প্রথম পত্র', fullMarks: 100, passMarks: 33 },
    { id: '3', code: 'MTH-101', nameEn: 'General Mathematics', nameBn: 'সাধারণ গণিত', fullMarks: 100, passMarks: 33 },
    { id: '4', code: 'SCI-101', nameEn: 'General Science', nameBn: 'সাধারণ বিজ্ঞান', fullMarks: 100, passMarks: 33 },
    { id: '5', code: 'PHY-101', nameEn: 'Physics (with Practical)', nameBn: 'পদার্থবিজ্ঞান', fullMarks: 100, passMarks: 33 },
    { id: '6', code: 'ICT-101', nameEn: 'Information & Communication Tech', nameBn: 'আইসিটি', fullMarks: 100, passMarks: 33 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'একাডেমিক কাঠামো ও শিক্ষাক্রম' : 'Academic Structure & Curriculum'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'শ্রেণি, শাখা, বিষয় ও শিক্ষাবর্ষ ব্যবস্থাপনা' : 'Configure grades, sections, subjects, and academic sessions'}
          </p>
        </div>

        <Button onClick={() => setIsAddClassOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন শ্রেণি / শাখা তৈরি' : 'Add Class / Section'}
        </Button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('classes')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'classes' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Classes & Sections</span>
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'subjects' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Subject Catalog</span>
        </button>
        <button
          onClick={() => setActiveTab('years')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'years' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Academic Sessions</span>
        </button>
      </div>

      {/* Classes & Sections Content */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{cls.nameEn}</h3>
                  <div className="text-xs text-gray-500">{cls.nameBn}</div>
                </div>
                <Badge size="sm">Order: {cls.order}</Badge>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Active Sections:</div>
                <div className="flex flex-wrap gap-1.5">
                  {cls.sections.map((sec, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold text-xs border border-blue-100">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subjects Content */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-xs text-left">
            <thead className="bg-gray-50 text-gray-700 font-bold">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Subject Name</th>
                <th className="p-3.5 text-center">Full Marks</th>
                <th className="p-3.5 text-center">Pass Marks</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50">
                  <td className="p-3.5 font-bold text-blue-700">{sub.code}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-gray-900">{sub.nameEn}</div>
                    <div className="text-[11px] text-gray-500">{sub.nameBn}</div>
                  </td>
                  <td className="p-3.5 text-center font-semibold text-gray-800">{sub.fullMarks}</td>
                  <td className="p-3.5 text-center font-semibold text-gray-800">{sub.passMarks}</td>
                  <td className="p-3.5 text-center">
                    <Badge variant="success" size="sm">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Academic Sessions */}
      {activeTab === 'years' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs max-w-xl space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div>
              <div className="font-bold text-base text-blue-900">Academic Year 2026 (২০২৬)</div>
              <div className="text-xs text-blue-700 mt-0.5">Jan 01, 2026 — Dec 31, 2026</div>
            </div>
            <span className="flex items-center gap-1 font-bold text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              Current Active
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div>
              <div className="font-bold text-base text-gray-800">Academic Year 2025 (২০২৫)</div>
              <div className="text-xs text-gray-500 mt-0.5">Archived Session</div>
            </div>
            <Badge size="sm">Completed</Badge>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title="Add New Class & Sections"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddClassOpen(false);
            toast.success('Class added successfully');
          }}
          className="space-y-4"
        >
          <Input label="Class Name (English)" placeholder="e.g. Class 10" required />
          <Input label="Class Name (Bengali)" placeholder="উদাঃ দশম শ্রেণি" required />
          <Input label="Numeric Order (for sorting)" type="number" defaultValue="12" required />
          <Input label="Sections (comma separated)" defaultValue="A, B" required />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddClassOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1e3a5f]">
              Save Class
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
