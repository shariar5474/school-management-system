'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  Plus,
  BookOpen,
  Layers,
  Calendar,
  CheckCircle,
  Filter,
  GraduationCap,
  Sparkles,
  Trash2,
  Edit2,
  FileSpreadsheet,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SchoolClass {
  id: string;
  nameEn: string;
  nameBn: string;
  order: number;
  sections: string[];
  group?: string;
}

interface SchoolSubject {
  id: string;
  classId: string;
  classNameEn: string;
  code: string;
  nameEn: string;
  nameBn: string;
  fullMarks: number;
  passMarks: number;
  type: 'mandatory' | 'optional';
  hasPractical?: boolean;
}

export default function AcademicsDashboardPage() {
  const { isBengali } = useTranslation();
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'years'>('classes');

  // Initial Seed Classes
  const [classes, setClasses] = useState<SchoolClass[]>([
    { id: 'cls_pg', nameEn: 'Play Group', nameBn: 'প্লে গ্রুপ', order: 0, sections: ['A', 'B'] },
    { id: 'cls_nursery', nameEn: 'Nursery', nameBn: 'নার্সারি', order: 1, sections: ['A', 'B'] },
    { id: 'cls_kg', nameEn: 'KG', nameBn: 'কেজি', order: 2, sections: ['A', 'B'] },
    { id: 'cls_1', nameEn: 'Class 1', nameBn: 'প্রথম শ্রেণি', order: 3, sections: ['A', 'B'] },
    { id: 'cls_2', nameEn: 'Class 2', nameBn: 'দ্বিতীয় শ্রেণি', order: 4, sections: ['A', 'B'] },
    { id: 'cls_3', nameEn: 'Class 3', nameBn: 'তৃতীয় শ্রেণি', order: 5, sections: ['A', 'B'] },
    { id: 'cls_4', nameEn: 'Class 4', nameBn: 'চতুর্থ শ্রেণি', order: 6, sections: ['A', 'B'] },
    { id: 'cls_5', nameEn: 'Class 5', nameBn: 'পঞ্চম শ্রেণি', order: 7, sections: ['A', 'B'] },
    { id: 'cls_6', nameEn: 'Class 6', nameBn: 'ষষ্ঠ শ্রেণি', order: 8, sections: ['A', 'B', 'C'] },
    { id: 'cls_7', nameEn: 'Class 7', nameBn: 'সপ্তম শ্রেণি', order: 9, sections: ['A', 'B'] },
    { id: 'cls_8', nameEn: 'Class 8', nameBn: 'অষ্টম শ্রেণি', order: 10, sections: ['A', 'B'] },
    { id: 'cls_9', nameEn: 'Class 9', nameBn: 'নবম শ্রেণি', order: 11, sections: ['Science-A', 'Commerce-A', 'Arts-A'], group: 'Science / Commerce / Arts' },
    { id: 'cls_10', nameEn: 'Class 10', nameBn: 'দশম শ্রেণি', order: 12, sections: ['Science-A', 'Commerce-A', 'Arts-A'], group: 'Science / Commerce / Arts' },
    { id: 'cls_11', nameEn: 'Class 11 (College)', nameBn: 'একাদশ শ্রেণি', order: 13, sections: ['Science', 'Commerce', 'Humanities'], group: 'College Streams' },
    { id: 'cls_12', nameEn: 'Class 12 (College)', nameBn: 'দ্বাদশ শ্রেণি', order: 14, sections: ['Science', 'Commerce', 'Humanities'], group: 'College Streams' },
  ]);

  // Initial Seed Subjects by Class
  const [subjects, setSubjects] = useState<SchoolSubject[]>([
    { id: 'sub_1', classId: 'cls_1', classNameEn: 'Class 1', code: 'BNG-101', nameEn: 'Bangla 1st Paper', nameBn: 'বাংলা প্রথম পত্র', fullMarks: 100, passMarks: 33, type: 'mandatory' },
    { id: 'sub_2', classId: 'cls_1', classNameEn: 'Class 1', code: 'ENG-101', nameEn: 'English 1st Paper', nameBn: 'ইংরেজি প্রথম পত্র', fullMarks: 100, passMarks: 33, type: 'mandatory' },
    { id: 'sub_3', classId: 'cls_1', classNameEn: 'Class 1', code: 'MTH-101', nameEn: 'Elementary Mathematics', nameBn: 'প্রাথমিক গণিত', fullMarks: 100, passMarks: 33, type: 'mandatory' },
    { id: 'sub_4', classId: 'cls_6', classNameEn: 'Class 6', code: 'MTH-601', nameEn: 'General Mathematics', nameBn: 'সাধারণ গণিত', fullMarks: 100, passMarks: 33, type: 'mandatory' },
    { id: 'sub_5', classId: 'cls_6', classNameEn: 'Class 6', code: 'SCI-601', nameEn: 'General Science', nameBn: 'সাধারণ বিজ্ঞান', fullMarks: 100, passMarks: 33, type: 'mandatory' },
    { id: 'sub_6', classId: 'cls_6', classNameEn: 'Class 6', code: 'ICT-601', nameEn: 'Information Technology', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', fullMarks: 50, passMarks: 17, type: 'mandatory' },
    { id: 'sub_7', classId: 'cls_9', classNameEn: 'Class 9', code: 'PHY-901', nameEn: 'Physics (with Practical)', nameBn: 'পদার্থবিজ্ঞান', fullMarks: 100, passMarks: 33, type: 'mandatory', hasPractical: true },
    { id: 'sub_8', classId: 'cls_9', classNameEn: 'Class 9', code: 'CHM-901', nameEn: 'Chemistry (with Practical)', nameBn: 'রসায়ন', fullMarks: 100, passMarks: 33, type: 'mandatory', hasPractical: true },
    { id: 'sub_9', classId: 'cls_9', classNameEn: 'Class 9', code: 'BIO-901', nameEn: 'Higher Biology', nameBn: 'উচ্চতর জীববিজ্ঞান', fullMarks: 100, passMarks: 33, type: 'optional', hasPractical: true },
    { id: 'sub_10', classId: 'cls_11', classNameEn: 'Class 11 (College)', code: 'HSC-PHY-1', nameEn: 'Physics 1st Paper', nameBn: 'পদার্থবিজ্ঞান ১ম পত্র', fullMarks: 100, passMarks: 33, type: 'mandatory', hasPractical: true },
    { id: 'sub_11', classId: 'cls_11', classNameEn: 'Class 11 (College)', code: 'HSC-MAT-1', nameEn: 'Higher Mathematics 1st', nameBn: 'উচ্চতর গণিত ১ম পত্র', fullMarks: 100, passMarks: 33, type: 'mandatory' },
  ]);

  // Filter state for subjects
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Add Class Modal State
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [classNameEn, setClassNameEn] = useState('');
  const [classNameBn, setClassNameBn] = useState('');
  const [classOrder, setClassOrder] = useState<number>(classes.length);
  const [classSections, setClassSections] = useState('A, B');
  const [classGroup, setClassGroup] = useState('General');

  // Add Subject Modal State
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [subjectClassId, setSubjectClassId] = useState<string>(classes[0]?.id || 'cls_1');
  const [subjectNameEn, setSubjectNameEn] = useState('');
  const [subjectNameBn, setSubjectNameBn] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectFullMarks, setSubjectFullMarks] = useState<number>(100);
  const [subjectPassMarks, setSubjectPassMarks] = useState<number>(33);
  const [subjectType, setSubjectType] = useState<'mandatory' | 'optional'>('mandatory');
  const [subjectHasPractical, setSubjectHasPractical] = useState(false);

  // Handle Add Class
  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNameEn || !classNameBn) {
      toast.error(isBengali ? 'শ্রেণির নাম পূরণ করুন' : 'Please provide class names');
      return;
    }

    const newClassId = `cls_${Date.now()}`;
    const sectionsArray = classSections.split(',').map((s) => s.trim()).filter(Boolean);

    const newClass: SchoolClass = {
      id: newClassId,
      nameEn: classNameEn,
      nameBn: classNameBn,
      order: Number(classOrder) || classes.length,
      sections: sectionsArray.length > 0 ? sectionsArray : ['A'],
      group: classGroup !== 'General' ? classGroup : undefined,
    };

    setClasses((prev) => [...prev, newClass]);
    toast.success(isBengali ? `নতুন শ্রেণি (${classNameBn}) তৈরি হয়েছে!` : `Class ${classNameEn} created successfully!`);
    setIsAddClassOpen(false);
    setClassNameEn('');
    setClassNameBn('');
    setClassSections('A, B');
    setClassGroup('General');
  };

  // Handle Add Subject
  const handleSaveSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectNameEn || !subjectCode) {
      toast.error(isBengali ? 'বিষয়ের নাম ও কোড দিন' : 'Please enter subject name and code');
      return;
    }

    const assignedClass = classes.find((c) => c.id === subjectClassId);
    const newSubject: SchoolSubject = {
      id: `sub_${Date.now()}`,
      classId: subjectClassId,
      classNameEn: assignedClass?.nameEn || 'All Classes',
      code: subjectCode.toUpperCase(),
      nameEn: subjectNameEn,
      nameBn: subjectNameBn || subjectNameEn,
      fullMarks: Number(subjectFullMarks) || 100,
      passMarks: Number(subjectPassMarks) || 33,
      type: subjectType,
      hasPractical: subjectHasPractical,
    };

    setSubjects((prev) => [newSubject, ...prev]);
    toast.success(
      isBengali
        ? `নতুন বিষয় (${subjectNameBn || subjectNameEn}) শ্রেণি '${assignedClass?.nameBn || assignedClass?.nameEn}'-তে যুক্ত হয়েছে!`
        : `Subject ${subjectNameEn} added to ${assignedClass?.nameEn}!`
    );

    setIsAddSubjectOpen(false);
    setSubjectNameEn('');
    setSubjectNameBn('');
    setSubjectCode('');
    setSubjectFullMarks(100);
    setSubjectPassMarks(33);
    setSubjectType('mandatory');
    setSubjectHasPractical(false);
  };

  // Filtered subjects
  const filteredSubjects = selectedClassFilter === 'all'
    ? subjects
    : subjects.filter((s) => s.classId === selectedClassFilter);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            {isBengali ? 'একাডেমিক কাঠামো ও বিষয় ব্যবস্থাপনা' : 'Academic Structure & Curriculum'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali
              ? 'শ্রেণি তৈরি, শাখা এবং শ্রেণি অনুযায়ী আবশ্যিক ও ঐচ্ছিক বিষয় যোগ ও নিয়ন্ত্রণ করুন'
              : 'Manage classes, sections, and add subjects mapped to specific classes'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => setIsAddClassOpen(true)}
            className="bg-[#1e3a5f] hover:bg-blue-800 text-xs shadow-md"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            {isBengali ? 'নতুন শ্রেণি যোগ করুন' : 'Add New Class'}
          </Button>

          <Button
            onClick={() => {
              if (selectedClassFilter !== 'all') {
                setSubjectClassId(selectedClassFilter);
              }
              setIsAddSubjectOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-xs shadow-md text-white"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            {isBengali ? 'শ্রেণি অনুযায়ী বিষয় যোগ করুন' : 'Add Subject to Class'}
          </Button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('classes')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'classes'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isBengali ? `শ্রেণি ও শাখা (${classes.length})` : `Classes & Sections (${classes.length})`}</span>
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'subjects'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isBengali ? `শ্রেণিভিত্তিক বিষয়সমূহ (${subjects.length})` : `Subjects Catalog (${subjects.length})`}</span>
        </button>
        <button
          onClick={() => setActiveTab('years')}
          className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'years'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isBengali ? 'শিক্ষাবর্ষ (Sessions)' : 'Academic Sessions'}</span>
        </button>
      </div>

      {/* Classes & Sections Content */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{isBengali ? `মোট শ্রেণি: ${classes.length}টি` : `Total Classes: ${classes.length}`}</span>
            <span className="text-blue-600 font-semibold">{isBengali ? 'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত অন্তর্ভুক্ত' : 'Play Group to Class 12'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((cls) => {
              const classSubjectCount = subjects.filter((s) => s.classId === cls.id).length;
              return (
                <div
                  key={cls.id}
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-base text-gray-900">{cls.nameEn}</h3>
                        <div className="text-xs text-gray-500 font-medium">{cls.nameBn}</div>
                      </div>
                      <Badge size="sm">Order: {cls.order}</Badge>
                    </div>

                    {cls.group && (
                      <div className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit mb-3">
                        {cls.group}
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100 mt-2">
                      <div className="text-xs font-semibold text-gray-700 mb-2">
                        {isBengali ? 'শাখা ও সেকশন:' : 'Active Sections:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cls.sections.map((sec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 font-bold text-xs border border-blue-100"
                          >
                            Sec {sec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">
                      {isBengali ? `${classSubjectCount}টি বিষয় সংযুক্ত` : `${classSubjectCount} Subjects`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClassFilter(cls.id);
                        setActiveTab('subjects');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                    >
                      {isBengali ? 'বিষয় দেখুন ➔' : 'View Subjects ➔'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subjects Content */}
      {activeTab === 'subjects' && (
        <div className="space-y-4">
          {/* Class Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-700">
                {isBengali ? 'শ্রেণি নির্বাচন করুন:' : 'Filter by Class:'}
              </span>
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{isBengali ? 'সকল শ্রেণি (All Classes)' : 'All Classes'}</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameEn} ({c.nameBn})
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => {
                if (selectedClassFilter !== 'all') {
                  setSubjectClassId(selectedClassFilter);
                }
                setIsAddSubjectOpen(true);
              }}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              {isBengali ? 'এই শ্রেণিতে বিষয় যোগ করুন' : 'Add Subject to this Class'}
            </Button>
          </div>

          {/* Subjects Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs text-left">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">{isBengali ? 'শ্রেণি' : 'Class'}</th>
                    <th className="p-3.5">{isBengali ? 'কোড' : 'Code'}</th>
                    <th className="p-3.5">{isBengali ? 'বিষয়ের নাম' : 'Subject Name'}</th>
                    <th className="p-3.5 text-center">{isBengali ? 'পূর্ণ নম্বর' : 'Full Marks'}</th>
                    <th className="p-3.5 text-center">{isBengali ? 'পাস নম্বর' : 'Pass Marks'}</th>
                    <th className="p-3.5 text-center">{isBengali ? 'ধরণ' : 'Type'}</th>
                    <th className="p-3.5 text-center">{isBengali ? 'ব্যবহারিক' : 'Practical'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400">
                        {isBengali ? 'এই শ্রেণিতে এখনও কোনো বিষয় যোগ করা হয়নি' : 'No subjects added to this class yet'}
                      </td>
                    </tr>
                  ) : (
                    filteredSubjects.map((sub) => (
                      <tr key={sub.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-3.5 font-bold text-gray-900">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px]">
                            {sub.classNameEn}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-blue-700">{sub.code}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-gray-900">{sub.nameEn}</div>
                          <div className="text-[11px] text-gray-500 font-medium">{sub.nameBn}</div>
                        </td>
                        <td className="p-3.5 text-center font-bold text-gray-800">{sub.fullMarks}</td>
                        <td className="p-3.5 text-center font-semibold text-gray-700">{sub.passMarks}</td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              sub.type === 'mandatory'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {sub.type === 'mandatory'
                              ? isBengali ? 'আবশ্যিক' : 'Compulsory'
                              : isBengali ? 'ঐচ্ছিক' : 'Optional'}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          {sub.hasPractical ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {isBengali ? 'আছে (Practical)' : 'Yes'}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Academic Sessions */}
      {activeTab === 'years' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs max-w-xl space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div>
              <div className="font-bold text-base text-blue-900">Academic Session 2026-2027 (২০২৬-২০২৭)</div>
              <div className="text-xs text-blue-700 mt-0.5">Jan 01, 2026 — Dec 31, 2026</div>
            </div>
            <span className="flex items-center gap-1 font-bold text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full shadow-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              Current Active
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div>
              <div className="font-bold text-base text-gray-800">Academic Session 2025 (২০২৫)</div>
              <div className="text-xs text-gray-500 mt-0.5">Completed Academic Year</div>
            </div>
            <Badge size="sm">Archived</Badge>
          </div>
        </div>
      )}

      {/* 1. Modal: Add Class */}
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title={isBengali ? 'নতুন শ্রেণি ও শাখা তৈরি করুন' : 'Add New Class & Sections'}
      >
        <form onSubmit={handleSaveClass} className="space-y-4 pt-2">
          <Input
            label={isBengali ? 'শ্রেণির নাম (ইংরেজিতে)' : 'Class Name (English)'}
            placeholder="e.g. Class 10 / Class 6"
            value={classNameEn}
            onChange={(e) => setClassNameEn(e.target.value)}
            required
          />

          <Input
            label={isBengali ? 'শ্রেণির নাম (বাংলায়)' : 'Class Name (Bengali)'}
            placeholder="উদাঃ দশম শ্রেণি / ষষ্ঠ শ্রেণি"
            value={classNameBn}
            onChange={(e) => setClassNameBn(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={isBengali ? 'ক্রমিক নম্বর (Sorting Order)' : 'Numeric Order'}
              type="number"
              value={classOrder.toString()}
              onChange={(e) => setClassOrder(Number(e.target.value))}
              required
            />

            <Select
              label={isBengali ? 'গ্রুপ বা বিভাগ' : 'Stream / Group'}
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
              options={[
                { value: 'General', label: 'সাধারণ (General)' },
                { value: 'Science', label: 'বিজ্ঞান (Science)' },
                { value: 'Commerce', label: 'ব্যবসায় শিক্ষা (Commerce)' },
                { value: 'Humanities', label: 'মানবিক (Humanities)' },
                { value: 'Science / Commerce / Arts', label: 'উভয় গ্রুপ (Science / Commerce / Arts)' },
              ]}
            />
          </div>

          <Input
            label={isBengali ? 'শাখা সমূহ (কমা দিয়ে পৃথক করুন)' : 'Sections (comma separated)'}
            placeholder="A, B, C"
            value={classSections}
            onChange={(e) => setClassSections(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddClassOpen(false)}>
              {isBengali ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-[#1e3a5f]">
              {isBengali ? 'শ্রেণি সংরক্ষণ করুন' : 'Save Class'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal: Add Subject by Class */}
      <Modal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        title={isBengali ? 'শ্রেণি অনুযায়ী নতুন বিষয় যোগ করুন' : 'Add Subject by Class'}
      >
        <form onSubmit={handleSaveSubject} className="space-y-4 pt-2">
          {/* Class Selector Dropdown */}
          <Select
            label={isBengali ? 'কোন শ্রেণির জন্য বিষয়?' : 'Select Class'}
            value={subjectClassId}
            onChange={(e) => setSubjectClassId(e.target.value)}
            options={classes.map((c) => ({
              value: c.id,
              label: `${c.nameEn} (${c.nameBn})`,
            }))}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={isBengali ? 'বিষয় কোড' : 'Subject Code'}
              placeholder="e.g. MTH-101 / SCI-201"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              required
            />

            <Select
              label={isBengali ? 'বিষয়ের ধরণ' : 'Subject Type'}
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value as any)}
              options={[
                { value: 'mandatory', label: isBengali ? 'আবশ্যিক (Compulsory)' : 'Mandatory / Compulsory' },
                { value: 'optional', label: isBengali ? 'ঐচ্ছিক (Elective/Optional)' : 'Optional / Elective' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={isBengali ? 'বিষয়ের নাম (ইংরেজিতে)' : 'Subject Name (English)'}
              placeholder="e.g. Higher Mathematics"
              value={subjectNameEn}
              onChange={(e) => setSubjectNameEn(e.target.value)}
              required
            />

            <Input
              label={isBengali ? 'বিষয়ের নাম (বাংলায়)' : 'Subject Name (Bengali)'}
              placeholder="উদাঃ উচ্চতর গণিত"
              value={subjectNameBn}
              onChange={(e) => setSubjectNameBn(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={isBengali ? 'পূর্ণ নম্বর (Full Marks)' : 'Full Marks'}
              type="number"
              value={subjectFullMarks.toString()}
              onChange={(e) => setSubjectFullMarks(Number(e.target.value))}
              required
            />

            <Input
              label={isBengali ? 'পাস নম্বর (Pass Marks)' : 'Pass Marks'}
              type="number"
              value={subjectPassMarks.toString()}
              onChange={(e) => setSubjectPassMarks(Number(e.target.value))}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={subjectHasPractical}
              onChange={(e) => setSubjectHasPractical(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{isBengali ? 'এই বিষয়ে ব্যবহারিক (Practical Exam) পরীক্ষা আছে' : 'This subject has a practical examination'}</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddSubjectOpen(false)}>
              {isBengali ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              {isBengali ? 'বিষয় যোগ করুন' : 'Save Subject'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
