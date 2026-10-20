'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  description: string;
  performedBy: string;
  timestamp: string;
}

export default function AuditLogsDashboardPage() {
  const { isBengali } = useTranslation();

  const logs: AuditLog[] = [
    {
      id: '1',
      action: 'RESULT_TEMPLATE_ACTIVATED',
      entityType: 'settings',
      description: 'Active result marksheet template switched to "modern"',
      performedBy: 'superadmin@school.edu.bd',
      timestamp: '2026-10-20 11:45:00',
    },
    {
      id: '2',
      action: 'RESULTS_PUBLISHED',
      entityType: 'exam',
      description: 'Published GPA and final results for Annual Examination 2026 (1,240 students)',
      performedBy: 'superadmin@school.edu.bd',
      timestamp: '2026-10-20 10:30:15',
    },
    {
      id: '3',
      action: 'STUDENT_ENROLLED_FROM_ADMISSION',
      entityType: 'student',
      description: 'Enrolled student Mohammad Tanvir Ahmed (STU-2026-0001) from ADM-2026-0001',
      performedBy: 'admin@school.edu.bd',
      timestamp: '2026-10-19 14:12:44',
    },
    {
      id: '4',
      action: 'PAYMENT_RECORDED',
      entityType: 'payment',
      description: 'Recorded payment of 2,500 BDT for Invoice INV-2026-0001 (Receipt: REC-2026-0001)',
      performedBy: 'accounts@school.edu.bd',
      timestamp: '2026-10-19 11:20:10',
    },
    {
      id: '5',
      action: 'ATTENDANCE_FINALIZED',
      entityType: 'attendance',
      description: 'Finalized attendance for Class 6 Section A on 2026-10-19',
      performedBy: 'teacher@school.edu.bd',
      timestamp: '2026-10-19 09:15:22',
    },
  ];

  const columns: Column<AuditLog>[] = [
    {
      header: 'Timestamp',
      accessorKey: 'timestamp',
      sortable: true,
      cell: (row) => <span className="font-mono text-[11px] text-gray-500">{row.timestamp}</span>,
    },
    {
      header: 'Action',
      sortable: true,
      cell: (row) => (
        <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
          {row.action}
        </span>
      ),
    },
    {
      header: 'Description',
      cell: (row) => <span className="text-xs text-gray-800">{row.description}</span>,
    },
    {
      header: 'Actor',
      accessorKey: 'performedBy',
      cell: (row) => <span className="text-xs font-semibold text-gray-700">{row.performedBy}</span>,
    },
    {
      header: 'Security',
      cell: () => (
        <Badge variant="success" size="sm">
          <Lock className="w-3 h-3 mr-1 inline" /> Verified
        </Badge>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'সিস্টেম অডিট ট্রেইল ও সিকিউরিটি লগ' : 'System Audit Trail & Security Logs'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'সুপার অ্যাডমিন অ্যাক্সেস: সকল সংবেদনশীল পরিবর্তনের অপরিবর্তনীয় রেকর্ড' : 'Immutable audit trail of administrative activities, result publications, and financial records'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={logs}
          searchKey="description"
          searchPlaceholder="Search audit events..."
        />
      </div>
    </DashboardLayout>
  );
}
