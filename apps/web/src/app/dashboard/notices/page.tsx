'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Bell, Calendar, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface NoticeItem {
  id: string;
  titleEn: string;
  titleBn: string;
  publishDate: string;
  isPublished: boolean;
  isImportant: boolean;
  audience: string;
}

export default function NoticesDashboardPage() {
  const { isBengali } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: '1',
      titleEn: 'Admission Test Schedule for Session 2026',
      titleBn: '২০২৬ শিক্ষাবর্ষে ভর্তি পরীক্ষার সময়সূচি',
      publishDate: '2026-10-18',
      isPublished: true,
      isImportant: true,
      audience: 'all',
    },
    {
      id: '2',
      titleEn: 'Revised Routine for Annual Examination 2026',
      titleBn: 'বার্ষিক পরীক্ষা ২০২৬ এর সংশোধিত রুটিন',
      publishDate: '2026-10-15',
      isPublished: true,
      isImportant: true,
      audience: 'students',
    },
    {
      id: '3',
      titleEn: 'Inter-Class Debate & Science Fair 2026',
      titleBn: 'আন্তঃশ্রেণি বিতর্ক ও বিজ্ঞান মেলা নোটিশ',
      publishDate: '2026-10-10',
      isPublished: true,
      isImportant: false,
      audience: 'all',
    },
  ]);

  const [form, setForm] = useState({
    titleEn: '',
    titleBn: '',
    contentEn: '',
    contentBn: '',
    isImportant: false,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: NoticeItem = {
      id: String(Date.now()),
      titleEn: form.titleEn,
      titleBn: form.titleBn,
      publishDate: new Date().toISOString().split('T')[0],
      isPublished: true,
      isImportant: form.isImportant,
      audience: 'all',
    };
    setNotices([newNotice, ...notices]);
    setIsAddOpen(false);
    toast.success('Notice published successfully');
  };

  const columns: Column<NoticeItem>[] = [
    {
      header: 'Notice Title',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.titleEn}</div>
          <div className="text-[11px] text-gray-500">{row.titleBn}</div>
        </div>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'publishDate',
      cell: (row) => <span className="text-xs text-gray-600">{row.publishDate}</span>,
    },
    {
      header: 'Important',
      cell: (row) => (
        <Badge variant={row.isImportant ? 'danger' : 'default'} size="sm">
          {row.isImportant ? 'Urgent' : 'Normal'}
        </Badge>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.isPublished ? 'success' : 'default'} size="sm">
          {row.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'বিজ্ঞপ্তি ও নোটিশ বোর্ড পরিচালনা' : 'Notice Board & Announcements'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'পাবলিক ওয়েবসাইটে বাংলা ও ইংরেজি নোটিশ প্রকাশ' : 'Create, schedule, and publish institutional announcements'}
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন নোটিশ প্রকাশ' : 'Publish Notice'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={notices}
          searchKey="titleEn"
          searchPlaceholder="Search notices..."
        />
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Publish New Notice"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Title in English"
            value={form.titleEn}
            onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
            placeholder="e.g. Summer Vacation Notice"
            required
          />
          <Input
            label="Title in Bengali"
            value={form.titleBn}
            onChange={(e) => setForm({ ...form, titleBn: e.target.value })}
            placeholder="উদাঃ গ্রীষ্মকালীন ছুটি সংক্রান্ত নোটিশ"
            required
          />
          <Textarea
            label="Content (English)"
            rows={3}
            value={form.contentEn}
            onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
            required
          />
          <Textarea
            label="Content (Bengali)"
            rows={3}
            value={form.contentBn}
            onChange={(e) => setForm({ ...form, contentBn: e.target.value })}
            required
          />
          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isImportant}
              onChange={(e) => setForm({ ...form, isImportant: e.target.checked })}
              className="rounded text-red-600"
            />
            <span className="font-semibold text-red-600">Mark as Important Notice (Highlighted on Homepage)</span>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1e3a5f]">
              Publish Now
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
