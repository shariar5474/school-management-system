'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Plus, Download, Printer, Edit, Trash2, IdCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  studentIdStr: string;
  nameEn: string;
  nameBn: string;
  currentClass: string;
  section: string;
  rollNumber: number;
  phone: string;
  gender: string;
  status: 'active' | 'archived' | 'transferred';
}

export default function StudentsPage() {
  const { isBengali } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);

  // Initial student roster data
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      studentIdStr: 'STU-2026-0001',
      nameEn: 'Mohammad Tanvir Ahmed',
      nameBn: 'মোহাম্মদ তানভীর আহমেদ',
      currentClass: 'Class 6',
      section: 'A',
      rollNumber: 1,
      phone: '+8801712345678',
      gender: 'Male',
      status: 'active',
    },
    {
      id: '2',
      studentIdStr: 'STU-2026-0002',
      nameEn: 'Nusrat Jahan',
      nameBn: 'নুসরাত জাহান',
      currentClass: 'Class 6',
      section: 'A',
      rollNumber: 2,
      phone: '+8801812345678',
      gender: 'Female',
      status: 'active',
    },
    {
      id: '3',
      studentIdStr: 'STU-2026-0003',
      nameEn: 'Samiul Hasan',
      nameBn: 'সামিউল হাসান',
      currentClass: 'Class 6',
      section: 'B',
      rollNumber: 1,
      phone: '+8801912345678',
      gender: 'Male',
      status: 'active',
    },
    {
      id: '4',
      studentIdStr: 'STU-2026-0004',
      nameEn: 'Fatima Tuz Zohra',
      nameBn: 'ফাতিমা তুজ জোহরা',
      currentClass: 'Class 7',
      section: 'A',
      rollNumber: 1,
      phone: '+8801612345678',
      gender: 'Female',
      status: 'active',
    },
    {
      id: '5',
      studentIdStr: 'STU-2026-0005',
      nameEn: 'Abdullah Al Mamun',
      nameBn: 'আব্দুল্লাহ আল মামুন',
      currentClass: 'Class 9',
      section: 'Science-A',
      rollNumber: 3,
      phone: '+8801755555555',
      gender: 'Male',
      status: 'active',
    },
  ]);

  const [formData, setFormData] = useState({
    nameEn: '',
    nameBn: '',
    currentClass: 'Class 6',
    section: 'A',
    rollNumber: 1,
    phone: '',
    gender: 'Male',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `STU-2026-${String(students.length + 1).padStart(4, '0')}`;
    const newStudent: Student = {
      id: String(Date.now()),
      studentIdStr: newId,
      nameEn: formData.nameEn,
      nameBn: formData.nameBn,
      currentClass: formData.currentClass,
      section: formData.section,
      rollNumber: Number(formData.rollNumber),
      phone: formData.phone,
      gender: formData.gender,
      status: 'active',
    };

    setStudents([newStudent, ...students]);
    setIsAddOpen(false);
    toast.success(isBengali ? 'নতুন শিক্ষার্থী সফলভাবে সংরক্ষিত হয়েছে!' : 'Student created successfully!');
  };

  const handleExportCsv = () => {
    const headers = ['Student ID,Name (English),Name (Bengali),Class,Section,Roll,Phone,Status\n'];
    const rows = students.map(
      (s) =>
        `"${s.studentIdStr}","${s.nameEn}","${s.nameBn}","${s.currentClass}","${s.section}",${s.rollNumber},"${s.phone}","${s.status}"\n`,
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('CSV exported successfully');
  };

  const columns: Column<Student>[] = [
    {
      header: 'ID',
      accessorKey: 'studentIdStr',
      sortable: true,
      cell: (row) => <span className="font-bold text-blue-700 text-xs">{row.studentIdStr}</span>,
    },
    {
      header: isBengali ? 'শিক্ষার্থীর নাম' : 'Name',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.nameEn}</div>
          <div className="text-[11px] text-gray-500">{row.nameBn}</div>
        </div>
      ),
    },
    {
      header: isBengali ? 'শ্রেণি ও শাখা' : 'Class & Sec',
      cell: (row) => (
        <span className="text-xs">
          {row.currentClass} ({row.section})
        </span>
      ),
    },
    {
      header: isBengali ? 'রোল' : 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      cell: (row) => <span className="font-semibold text-xs">{row.rollNumber}</span>,
    },
    {
      header: isBengali ? 'ফোন নম্বর' : 'Phone',
      accessorKey: 'phone',
      cell: (row) => <span className="text-xs text-gray-600">{row.phone}</span>,
    },
    {
      header: isBengali ? 'স্ট্যাটাস' : 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'default'} size="sm">
          {row.status}
        </Badge>
      ),
    },
    {
      header: isBengali ? 'কার্যক্রম' : 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedStudentForCard(row)}
            className="p-1 rounded text-blue-600 hover:bg-blue-50"
            title="Generate ID Card"
          >
            <IdCard className="w-4 h-4" />
          </button>
          <button
            onClick={() => toast(isBengali ? 'সম্পাদনা মোড' : 'Editing student')}
            className="p-1 rounded text-gray-600 hover:bg-gray-100"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'শিক্ষার্থী ব্যবস্থাপনা' : 'Student Management'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'সকল নিবন্ধিত শিক্ষার্থীর তথ্য ও প্রোফাইল' : 'View, register, and manage student enrollments'}
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন শিক্ষার্থী নিবন্ধন' : 'Register New Student'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={students}
          searchKey="nameEn"
          searchPlaceholder={isBengali ? 'নাম বা আইডি দিয়ে খুঁজুন...' : 'Search by name or ID...'}
          onExportCsv={handleExportCsv}
          pageSize={10}
        />
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title={isBengali ? 'নতুন শিক্ষার্থী নিবন্ধন' : 'Register New Student'}
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Name in English"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            placeholder="e.g. Mohammad Tanvir"
            required
          />
          <Input
            label="Name in Bengali"
            value={formData.nameBn}
            onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
            placeholder="উদাঃ মোহাম্মদ তানভীর"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Class"
              value={formData.currentClass}
              onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
              options={[
                { value: 'Play Group', label: 'Play Group' },
                { value: 'Class 1', label: 'Class 1' },
                { value: 'Class 6', label: 'Class 6' },
                { value: 'Class 9', label: 'Class 9' },
                { value: 'Class 11', label: 'Class 11' },
              ]}
            />
            <Input
              label="Section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              placeholder="A"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Roll Number"
              type="number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: Number(e.target.value) })}
              required
            />
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </div>
          <Input
            label="Guardian Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1712-345678"
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-[#1e3a5f]">
              Save Student Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Printable Student ID Card Modal */}
      {selectedStudentForCard && (
        <Modal
          isOpen={!!selectedStudentForCard}
          onClose={() => setSelectedStudentForCard(null)}
          title="Student ID Card Preview"
        >
          <div className="space-y-4">
            <div className="w-80 mx-auto bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] text-white p-5 rounded-2xl shadow-xl border-2 border-yellow-400 text-center relative overflow-hidden">
              <div className="text-[10px] uppercase font-bold tracking-widest text-yellow-300">
                Agrani Model High School & College
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white mx-auto my-3 flex items-center justify-center font-bold text-xl">
                {selectedStudentForCard.nameEn.charAt(0)}
              </div>
              <div className="font-bold text-sm">{selectedStudentForCard.nameEn}</div>
              <div className="text-[11px] text-blue-100">{selectedStudentForCard.nameBn}</div>
              <div className="bg-black/30 p-2.5 rounded-lg mt-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">ID:</span>
                  <span className="font-bold text-yellow-300">{selectedStudentForCard.studentIdStr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Class:</span>
                  <span>{selectedStudentForCard.currentClass} ({selectedStudentForCard.section})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Roll:</span>
                  <span>{selectedStudentForCard.rollNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={() => window.print()} variant="primary" size="sm" className="bg-[#1e3a5f]">
                <Printer className="w-4 h-4 mr-1.5" />
                Print ID Card
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
