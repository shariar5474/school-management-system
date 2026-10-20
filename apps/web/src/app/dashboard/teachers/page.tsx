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
import { Plus, Edit, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface Teacher {
  id: string;
  employeeId: string;
  nameEn: string;
  nameBn: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

export default function TeachersDashboardPage() {
  const { isBengali } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      employeeId: 'EMP-001',
      nameEn: 'Prof. Mohammad Harunur Rashid',
      nameBn: 'প্রফেসর মোহাম্মদ হারুনুর রশীদ',
      designation: 'Principal',
      department: 'Administration',
      phone: '+880 1712-345678',
      email: 'principal@agranischool.edu.bd',
      status: 'active',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      nameEn: 'Dr. Mahfuza Begum',
      nameBn: 'ড. মাহফুজা বেগম',
      designation: 'Assistant Headmaster',
      department: 'Science',
      phone: '+880 1812-345678',
      email: 'mahfuza@agranischool.edu.bd',
      status: 'active',
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      nameEn: 'Md. Rafiqul Islam',
      nameBn: 'মোঃ রফিকুল ইসলাম',
      designation: 'Senior Mathematics Teacher',
      department: 'Mathematics',
      phone: '+880 1912-345678',
      email: 'rafiqul@agranischool.edu.bd',
      status: 'active',
    },
  ]);

  const [formData, setFormData] = useState({
    nameEn: '',
    nameBn: '',
    designation: 'Assistant Teacher',
    department: 'General',
    phone: '',
    email: '',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: String(Date.now()),
      employeeId: `EMP-${String(teachers.length + 1).padStart(3, '0')}`,
      nameEn: formData.nameEn,
      nameBn: formData.nameBn,
      designation: formData.designation,
      department: formData.department,
      phone: formData.phone,
      email: formData.email,
      status: 'active',
    };

    setTeachers([...teachers, newTeacher]);
    setIsAddOpen(false);
    toast.success('Teacher record added successfully');
  };

  const columns: Column<Teacher>[] = [
    {
      header: 'Emp ID',
      accessorKey: 'employeeId',
      sortable: true,
      cell: (row) => <span className="font-bold text-blue-700 text-xs">{row.employeeId}</span>,
    },
    {
      header: 'Name',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.nameEn}</div>
          <div className="text-[11px] text-gray-500">{row.nameBn}</div>
        </div>
      ),
    },
    {
      header: 'Designation & Dept',
      cell: (row) => (
        <div>
          <div className="font-medium text-xs text-gray-800">{row.designation}</div>
          <div className="text-[11px] text-gray-500">{row.department}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      cell: (row) => (
        <div className="text-xs text-gray-600">
          <div>{row.phone}</div>
          <div className="text-[11px] text-blue-600">{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <Badge variant="success" size="sm">{row.status}</Badge>,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'শিক্ষকমণ্ডলী ব্যবস্থাপনা' : 'Teachers & Staff Management'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'অনুষদ সদস্য ও শিক্ষক প্রোফাইল পরিচালনা' : 'Faculty directory, subject assignment, and contact records'}
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন শিক্ষক যোগ' : 'Add Faculty Member'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={teachers}
          searchKey="nameEn"
          searchPlaceholder="Search teacher..."
        />
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Faculty Member"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Name in English"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            placeholder="e.g. Mohammad Harun"
            required
          />
          <Input
            label="Name in Bengali"
            value={formData.nameBn}
            onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
            placeholder="উদাঃ মোহাম্মদ হারুন"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            />
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1e3a5f]">
              Save Faculty Record
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
