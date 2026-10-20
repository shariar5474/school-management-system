'use client';

import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

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

export function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border-2 border-gray-800 text-gray-900 font-serif print:p-6 print:border-black print:max-w-none">
      {/* School Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-gray-800" />
          </div>
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          {data.schoolName || 'Agrani Model High School & College'}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {data.schoolAddress || '123 College Road, Dhanmondi, Dhaka-1205'}
        </p>
        <div className="inline-block mt-3 px-4 py-1 border border-gray-800 font-sans font-bold text-sm tracking-wide uppercase bg-gray-100">
          Academic Marksheet / একাডেমিক ট্রান্সক্রিপ্ট
        </div>
      </div>

      {/* Student Meta Details */}
      <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6 border border-gray-300 p-3 bg-gray-50/50">
        <div className="space-y-1.5">
          <div><span className="font-bold">Student Name:</span> {data.studentName || 'Mohammad Tanvir'}</div>
          <div><span className="font-bold">Student ID:</span> {data.studentId || 'STU-2026-0001'}</div>
          <div><span className="font-bold">Class:</span> {data.className || 'Class 6'}</div>
        </div>
        <div className="space-y-1.5">
          <div><span className="font-bold">Examination:</span> {data.examName || 'Annual Examination 2026'}</div>
          <div><span className="font-bold">Roll No:</span> {data.rollNumber ?? '01'} | <span className="font-bold">Section:</span> {data.sectionName || 'A'}</div>
          <div><span className="font-bold">Academic Year:</span> {data.academicYear || '2026'}</div>
        </div>
      </div>

      {/* Marks Table */}
      <table className="w-full text-xs font-sans border-collapse border border-gray-800 mb-6">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-800 text-center font-bold">
            <th className="border border-gray-800 p-2 text-left">Subject</th>
            <th className="border border-gray-800 p-2 w-20">Full Marks</th>
            <th className="border border-gray-800 p-2 w-20">Pass Marks</th>
            <th className="border border-gray-800 p-2 w-24">Marks Obtained</th>
            <th className="border border-gray-800 p-2 w-20">Letter Grade</th>
            <th className="border border-gray-800 p-2 w-20">Grade Point</th>
          </tr>
        </thead>
        <tbody>
          {(data.subjects || []).map((sub, idx) => (
            <tr key={idx} className="border-b border-gray-300 text-center">
              <td className="border border-gray-800 p-2 text-left font-medium">{sub.name}</td>
              <td className="border border-gray-800 p-2">{sub.fullMarks}</td>
              <td className="border border-gray-800 p-2">{sub.passMarks}</td>
              <td className="border border-gray-800 p-2 font-bold">{sub.obtainedMarks}</td>
              <td className="border border-gray-800 p-2 font-bold">{sub.grade}</td>
              <td className="border border-gray-800 p-2">{sub.gradePoint.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Result Summary */}
      <div className="grid grid-cols-4 gap-3 text-center font-sans text-xs mb-10 border border-gray-800 p-3 bg-gray-100">
        <div>
          <div className="text-gray-600">Total Marks</div>
          <div className="font-bold text-sm mt-0.5">{data.totalObtained} / {data.totalMarks}</div>
        </div>
        <div>
          <div className="text-gray-600">GPA</div>
          <div className="font-bold text-sm mt-0.5 text-blue-700">{data.gpa.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-600">Grade</div>
          <div className="font-bold text-sm mt-0.5">{data.grade}</div>
        </div>
        <div>
          <div className="text-gray-600">Result Status</div>
          <div className={`font-bold text-sm mt-0.5 ${data.resultStatus === 'PASSED' ? 'text-green-700' : 'text-red-700'}`}>
            {data.resultStatus}
          </div>
        </div>
      </div>

      {/* Official Signatures */}
      <div className="grid grid-cols-3 gap-6 pt-16 text-center font-sans text-xs border-t border-dashed border-gray-400 mt-12">
        <div>
          <div className="border-t border-gray-800 pt-1 font-bold">Class Teacher</div>
        </div>
        <div>
          <div className="border-t border-gray-800 pt-1 font-bold">Exam Controller</div>
        </div>
        <div>
          <div className="border-t border-gray-800 pt-1 font-bold">Principal / Headmaster</div>
        </div>
      </div>
    </div>
  );
}
