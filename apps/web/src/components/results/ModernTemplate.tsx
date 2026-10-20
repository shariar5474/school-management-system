'use client';

import React from 'react';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  data: {
    schoolName?: string;
    schoolAddress?: string;
    studentName?: string;
    studentId?: string;
    rollNumber?: number | string;
    className?: string;
    sectionName?: string;
    examName?: string;
    academicYear?: string;
    subjects: Array<{
      name: string;
      fullMarks: number;
      passMarks: number;
      obtainedMarks: number;
      grade: string;
      gradePoint: number;
      status: string;
    }>;
    totalMarks: number;
    totalObtained: number;
    gpa: number;
    grade: string;
    resultStatus: string;
    meritPosition?: number;
  };
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto rounded-2xl shadow-xl border border-blue-100 text-gray-900 font-sans print:shadow-none print:border-none print:p-4 print:max-w-none">
      {/* Top Gradient Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] text-white p-6 rounded-xl mb-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-xs border border-white/20">
              <GraduationCap className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {data.schoolName || 'Agrani Model High School & College'}
              </h1>
              <p className="text-xs text-blue-100 mt-0.5">
                {data.schoolAddress || '123 College Road, Dhanmondi, Dhaka-1205'}
              </p>
            </div>
          </div>
          <div className="text-right bg-white/10 px-4 py-2 rounded-lg border border-white/20">
            <div className="text-xs uppercase tracking-wider text-yellow-300 font-bold">Official Transcript</div>
            <div className="text-sm font-semibold">{data.examName || 'Annual Exam 2026'}</div>
          </div>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs mb-6">
        <div>
          <span className="text-gray-500 block">Student Name</span>
          <span className="font-bold text-sm text-gray-900">{data.studentName || 'Mohammad Tanvir'}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Student ID / Roll</span>
          <span className="font-semibold text-gray-800">{data.studentId || 'STU-2026-0001'} (Roll: {data.rollNumber ?? '01'})</span>
        </div>
        <div>
          <span className="text-gray-500 block">Class & Section</span>
          <span className="font-semibold text-gray-800">{data.className || 'Class 6'} - {data.sectionName || 'A'}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Academic Year</span>
          <span className="font-semibold text-gray-800">{data.academicYear || '2026'}</span>
        </div>
      </div>

      {/* Performance Summary Highlights */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
          <div className="text-xs text-blue-700 font-medium">Grade Point Average (GPA)</div>
          <div className="text-3xl font-extrabold text-blue-900 mt-1">{data.gpa.toFixed(2)}</div>
          <div className="text-xs text-blue-600 mt-0.5">Scale: 5.00</div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <div className="text-xs text-emerald-700 font-medium">Letter Grade</div>
          <div className="text-3xl font-extrabold text-emerald-900 mt-1">{data.grade}</div>
          <div className="text-xs text-emerald-600 mt-0.5">{data.resultStatus}</div>
        </div>
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
          <div className="text-xs text-purple-700 font-medium">Total Score</div>
          <div className="text-3xl font-extrabold text-purple-900 mt-1">{data.totalObtained}</div>
          <div className="text-xs text-purple-600 mt-0.5">Out of {data.totalMarks}</div>
        </div>
      </div>

      {/* Modern Subject Marks Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
            <tr>
              <th className="p-3">Subject Name</th>
              <th className="p-3 text-center">Full Marks</th>
              <th className="p-3 text-center">Pass Marks</th>
              <th className="p-3 text-center">Obtained</th>
              <th className="p-3 text-center">Grade</th>
              <th className="p-3 text-center">Grade Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(data.subjects || []).map((sub, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="p-3 font-medium text-gray-900">{sub.name}</td>
                <td className="p-3 text-center text-gray-600">{sub.fullMarks}</td>
                <td className="p-3 text-center text-gray-600">{sub.passMarks}</td>
                <td className="p-3 text-center font-bold text-gray-900">{sub.obtainedMarks}</td>
                <td className="p-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded font-bold text-blue-700 bg-blue-50">
                    {sub.grade}
                  </span>
                </td>
                <td className="p-3 text-center font-semibold text-gray-800">{sub.gradePoint.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-gray-200 text-center text-xs">
        <div>
          <div className="w-36 mx-auto border-t border-gray-400 pt-1 font-semibold text-gray-700">Class Teacher</div>
        </div>
        <div className="hidden sm:block">
          <div className="w-36 mx-auto border-t border-gray-400 pt-1 font-semibold text-gray-700">Exam Controller</div>
        </div>
        <div>
          <div className="w-36 mx-auto border-t border-gray-400 pt-1 font-semibold text-gray-700">Principal</div>
        </div>
      </div>
    </div>
  );
}
