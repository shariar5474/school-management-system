'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, Award, CheckCircle2, FileText, ArrowRight, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Exam {
  id: string;
  name: string;
  type: string;
  academicYear: string;
  status: 'draft' | 'marks_entry' | 'published';
  studentCount: number;
}

export default function ExamsDashboardPage() {
  const { isBengali } = useTranslation();
  const [selectedExamForMarks, setSelectedExamForMarks] = useState<Exam | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 'exam_1',
      name: 'Annual Examination 2026',
      type: 'annual',
      academicYear: '2026',
      status: 'published',
      studentCount: 1240,
    },
    {
      id: 'exam_2',
      name: 'Half-Yearly Examination 2026',
      type: 'half_yearly',
      academicYear: '2026',
      status: 'marks_entry',
      studentCount: 1240,
    },
    {
      id: 'exam_3',
      name: 'Model Test (SSC 2027 Candidates)',
      type: 'model_test',
      academicYear: '2026',
      status: 'draft',
      studentCount: 180,
    },
  ]);

  const [marksRoster, setMarksRoster] = useState([
    { studentId: 'STU-2026-0001', name: 'Mohammad Tanvir Ahmed', roll: 1, theory: 70, practical: 24, total: 94 },
    { studentId: 'STU-2026-0002', name: 'Nusrat Jahan', roll: 2, theory: 62, practical: 20, total: 82 },
    { studentId: 'STU-2026-0003', name: 'Samiul Hasan', roll: 3, theory: 55, practical: 15, total: 70 },
  ]);

  const handlePublishResults = (examId: string) => {
    setExams(
      exams.map((ex) => (ex.id === examId ? { ...ex, status: 'published' } : ex)),
    );
    toast.success(
      isBengali
        ? 'জিপিএ ও গ্রেড গণনা করে ফলাফল সফলভাবে প্রকাশ করা হয়েছে!'
        : 'GPA calculated and results officially published! Students can now access marksheets.',
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'পরীক্ষা ও ফলাফল প্রকাশনা' : 'Examinations & Marks Evaluation'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'পরীক্ষা তৈরি, বিষয়ভিত্তিক নম্বর এন্ট্রি ও জিপিএ মূল্যায়ন' : 'Manage exams, enter subject marks, and publish official student results'}
          </p>
        </div>

        <Button
          onClick={() => {
            const newExam: Exam = {
              id: `exam_${Date.now()}`,
              name: 'Class Test 3 (Term 2)',
              type: 'class_test',
              academicYear: '2026',
              status: 'draft',
              studentCount: 220,
            };
            setExams([newExam, ...exams]);
            toast.success('Exam created');
          }}
          className="bg-[#1e3a5f] hover:bg-blue-800 text-xs"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন পরীক্ষা তৈরি' : 'Create Examination'}
        </Button>
      </div>

      {/* Exam List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {exam.type.replace('_', ' ')}
                </span>
                <Badge
                  variant={exam.status === 'published' ? 'success' : exam.status === 'marks_entry' ? 'warning' : 'default'}
                  size="sm"
                >
                  {exam.status.toUpperCase()}
                </Badge>
              </div>

              <h3 className="font-bold text-base text-gray-900 mb-1">{exam.name}</h3>
              <p className="text-xs text-gray-500">
                Session {exam.academicYear} | {exam.studentCount} Students
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExamForMarks(exam)}
                className="w-full text-xs"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                {isBengali ? 'নম্বর এন্ট্রি করুন' : 'Enter Marks'}
              </Button>

              {exam.status !== 'published' && (
                <Button
                  size="sm"
                  onClick={() => handlePublishResults(exam.id)}
                  className="w-full text-xs bg-emerald-600 hover:bg-emerald-700"
                >
                  <Award className="w-3.5 h-3.5 mr-1.5" />
                  {isBengali ? 'জিপিএ গণনা ও প্রকাশ করুন' : 'Calculate GPA & Publish'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Marks Entry Modal */}
      {selectedExamForMarks && (
        <Modal
          isOpen={!!selectedExamForMarks}
          onClose={() => setSelectedExamForMarks(null)}
          title={`Marks Entry: ${selectedExamForMarks.name}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Class & Section"
                options={[{ value: 'class_6_a', label: 'Class 6 - Section A' }]}
              />
              <Select
                label="Subject"
                options={[{ value: 'math', label: 'Mathematics (100 Marks)' }]}
              />
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 font-bold text-gray-700">
                  <tr>
                    <th className="p-3 w-16 text-center">Roll</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3 w-24 text-center">Theory (70)</th>
                    <th className="p-3 w-24 text-center">Practical (30)</th>
                    <th className="p-3 w-20 text-center font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {marksRoster.map((m, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-center font-bold">{m.roll}</td>
                      <td className="p-3 font-semibold text-gray-900">{m.name}</td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          max={70}
                          defaultValue={m.theory}
                          className="w-16 p-1 border rounded text-center text-xs"
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = [...marksRoster];
                            updated[idx].theory = val;
                            updated[idx].total = val + updated[idx].practical;
                            setMarksRoster(updated);
                          }}
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          max={30}
                          defaultValue={m.practical}
                          className="w-16 p-1 border rounded text-center text-xs"
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = [...marksRoster];
                            updated[idx].practical = val;
                            updated[idx].total = updated[idx].theory + val;
                            setMarksRoster(updated);
                          }}
                        />
                      </td>
                      <td className="p-3 text-center font-bold text-blue-700">{m.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setSelectedExamForMarks(null)}>
                Cancel
              </Button>
              <Button
                className="bg-[#1e3a5f]"
                onClick={() => {
                  setSelectedExamForMarks(null);
                  toast.success('Marks saved successfully');
                }}
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save Marks
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
