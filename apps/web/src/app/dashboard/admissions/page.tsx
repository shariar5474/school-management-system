'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Check, X, UserPlus, Eye, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdmissionApp {
  id: string;
  applicationNumber: string;
  studentNameEn: string;
  studentNameBn: string;
  desiredClass: string;
  fatherPhone: string;
  submissionDate: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'enrolled';
}

export default function AdmissionsDashboardPage() {
  const { isBengali } = useTranslation();
  const [selectedApp, setSelectedApp] = useState<AdmissionApp | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const [applications, setApplications] = useState<AdmissionApp[]>([
    {
      id: '1',
      applicationNumber: 'ADM-2026-0001',
      studentNameEn: 'Abdur Rahman',
      studentNameBn: 'আব্দুর রহমান',
      desiredClass: 'Class 6',
      fatherPhone: '+880 1711-223344',
      submissionDate: '2026-10-18',
      status: 'submitted',
    },
    {
      id: '2',
      applicationNumber: 'ADM-2026-0002',
      studentNameEn: 'Sadia Islam',
      studentNameBn: 'সাদিয়া ইসলাম',
      desiredClass: 'Class 9 (Science)',
      fatherPhone: '+880 1811-223344',
      submissionDate: '2026-10-17',
      status: 'under_review',
    },
    {
      id: '3',
      applicationNumber: 'ADM-2026-0003',
      studentNameEn: 'Mehedi Hasan',
      studentNameBn: 'মেহেদী হাসান',
      desiredClass: 'Play Group',
      fatherPhone: '+880 1911-223344',
      submissionDate: '2026-10-15',
      status: 'approved',
    },
  ]);

  const handleStatusUpdate = (appId: string, newStatus: AdmissionApp['status']) => {
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app,
      ),
    );
    setSelectedApp(null);
    if (newStatus === 'enrolled') {
      toast.success(
        isBengali
          ? 'আবেদনকারীকে সফলভাবে শিক্ষার্থী হিসেবে তালিকাভুক্ত করা হয়েছে!'
          : 'Applicant successfully enrolled as an official student record!',
      );
    } else {
      toast.success(`Application updated to "${newStatus}"`);
    }
  };

  const columns: Column<AdmissionApp>[] = [
    {
      header: 'App No',
      accessorKey: 'applicationNumber',
      sortable: true,
      cell: (row) => <span className="font-bold text-blue-700 text-xs">{row.applicationNumber}</span>,
    },
    {
      header: 'Applicant Name',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.studentNameEn}</div>
          <div className="text-[11px] text-gray-500">{row.studentNameBn}</div>
        </div>
      ),
    },
    {
      header: 'Desired Class',
      accessorKey: 'desiredClass',
      cell: (row) => <span className="text-xs">{row.desiredClass}</span>,
    },
    {
      header: 'Father Contact',
      accessorKey: 'fatherPhone',
      cell: (row) => <span className="text-xs text-gray-600">{row.fatherPhone}</span>,
    },
    {
      header: 'Status',
      cell: (row) => {
        const variants: Record<AdmissionApp['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
          submitted: 'info',
          under_review: 'warning',
          approved: 'success',
          rejected: 'danger',
          enrolled: 'default',
        };
        return <Badge variant={variants[row.status]} size="sm">{row.status}</Badge>;
      },
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedApp(row)}
            className="text-[11px] h-7 px-2"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Review
          </Button>
          {row.status === 'approved' && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate(row.id, 'enrolled')}
              className="bg-emerald-600 hover:bg-emerald-700 text-[11px] h-7 px-2"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1" />
              Enroll
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isBengali ? 'ভর্তি আবেদন পর্যালোচনা' : 'Admission Applications Review'}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {isBengali ? 'অনলাইন ভর্তি আবেদন অনুমোদন ও শিক্ষার্থী হিসেবে নথিভুক্তকরণ' : 'Review submitted applications, approve and enroll applicants'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={applications}
          searchKey="studentNameEn"
          searchPlaceholder="Search applicant..."
        />
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Review Application: ${selectedApp.applicationNumber}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 border border-gray-200">
              <div><span className="font-bold">Student:</span> {selectedApp.studentNameEn} ({selectedApp.studentNameBn})</div>
              <div><span className="font-bold">Desired Class:</span> {selectedApp.desiredClass}</div>
              <div><span className="font-bold">Contact Phone:</span> {selectedApp.fatherPhone}</div>
              <div><span className="font-bold">Submitted:</span> {selectedApp.submissionDate}</div>
              <div><span className="font-bold">Current Status:</span> <Badge size="sm">{selectedApp.status}</Badge></div>
            </div>

            <Textarea
              label="Reviewer Notes / Verification Remarks"
              placeholder="All certificates checked and eligibility satisfied..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                className="text-red-600 hover:bg-red-50 text-xs"
                onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
              >
                <X className="w-3.5 h-3.5 mr-1" /> Reject
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
              >
                <Check className="w-3.5 h-3.5 mr-1" /> Approve
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
