'use client';

import React from 'react';
import { Award, GraduationCap, ShieldCheck } from 'lucide-react';

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

export function PremiumTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-[#fffdfa] p-10 max-w-4xl mx-auto border-8 border-double border-[#855e28] shadow-2xl text-gray-900 font-serif relative print:shadow-none print:border-4 print:p-6 print:max-w-none">
      {/* Decorative Corner Ornaments */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#855e28]" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#855e28]" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#855e28]" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#855e28]" />

      {/* Header Banner */}
      <div className="text-center pb-6 border-b-2 border-[#d4af37]/60 mb-6">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#855e28] to-[#d4af37] flex items-center justify-center text-white shadow-lg">
            <GraduationCap className="w-9 h-9" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-[#5c3e16]">
          {data.schoolName || 'Agrani Model High School & College'}
        </h1>
        <p className="text-xs text-gray-600 tracking-wide mt-1 italic">
          {data.schoolAddress || '123 College Road, Dhanmondi, Dhaka-1205, Bangladesh'}
        </p>
        <div className="mt-3 inline-block px-6 py-1 bg-gradient-to-r from-[#855e28] via-[#d4af37] to-[#855e28] text-white text-xs font-bold tracking-widest uppercase rounded shadow">
          Official Academic Transcript of Records
        </div>
      </div>

      {/* Student Certifying Paragraph */}
      <div className="text-center mb-6 text-xs sm:text-sm leading-relaxed text-gray-800">
        This is to certify that{' '}
        <span className="font-bold underline text-gray-900">{data.studentName || 'Mohammad Tanvir'}</span>,
        Student ID: <span className="font-bold">{data.studentId || 'STU-2026-0001'}</span>, Roll: <span className="font-bold">{data.rollNumber ?? '01'}</span>,
        of <span className="font-bold">{data.className || 'Class 6'} (Section {data.sectionName || 'A'})</span>,
        has appeared in the <span className="font-bold">{data.examName || 'Annual Examination'}</span> for the Academic Year{' '}
        <span className="font-bold">{data.academicYear || '2026'}</span> and has secured the following marks and grade points:
      </div>

      {/* Subject Marks Table */}
      <table className="w-full text-xs border border-[#855e28] mb-6">
        <thead>
          <tr className="bg-[#fbf4ea] text-[#5c3e16] font-bold border-b border-[#855e28]">
            <th className="border-r border-[#855e28] p-2.5 text-left">Course / Subject</th>
            <th className="border-r border-[#855e28] p-2.5 text-center">Full Marks</th>
            <th className="border-r border-[#855e28] p-2.5 text-center">Pass Marks</th>
            <th className="border-r border-[#855e28] p-2.5 text-center">Marks Obtained</th>
            <th className="border-r border-[#855e28] p-2.5 text-center">Grade</th>
            <th className="p-2.5 text-center">Grade Point</th>
          </tr>
        </thead>
        <tbody>
          {(data.subjects || []).map((sub, idx) => (
            <tr key={idx} className="border-b border-[#d8c3a5]/50 text-center">
              <td className="border-r border-[#855e28] p-2 text-left font-semibold text-gray-900">{sub.name}</td>
              <td className="border-r border-[#855e28] p-2">{sub.fullMarks}</td>
              <td className="border-r border-[#855e28] p-2">{sub.passMarks}</td>
              <td className="border-r border-[#855e28] p-2 font-bold text-[#5c3e16]">{sub.obtainedMarks}</td>
              <td className="border-r border-[#855e28] p-2 font-bold">{sub.grade}</td>
              <td className="p-2 font-semibold">{sub.gradePoint.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Distinction & Grade Ribbon */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#fbf4ea] border-2 border-[#855e28] p-4 rounded-lg mb-8 gap-4">
        <div className="flex items-center gap-3">
          <Award className="w-10 h-10 text-[#d4af37]" />
          <div>
            <div className="text-xs uppercase font-bold text-[#855e28]">Final Outcome</div>
            <div className="text-lg font-bold text-gray-900">
              GPA: <span className="text-[#855e28]">{data.gpa.toFixed(2)}</span> / 5.00 (Grade: {data.grade})
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">Total Score: {data.totalObtained} / {data.totalMarks}</div>
          <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider">{data.resultStatus}</div>
        </div>
      </div>

      {/* Signatures & Seal */}
      <div className="grid grid-cols-3 gap-6 pt-10 text-center text-xs border-t border-[#855e28]/40">
        <div>
          <div className="w-36 mx-auto border-t border-[#855e28] pt-1 font-bold text-gray-800">Class Teacher</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#855e28] flex items-center justify-center text-[10px] text-[#855e28] uppercase font-bold">
            Official Seal
          </div>
        </div>
        <div>
          <div className="w-36 mx-auto border-t border-[#855e28] pt-1 font-bold text-gray-800">Principal</div>
        </div>
      </div>
    </div>
  );
}
