'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, CreditCard, Receipt, Printer, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  month: string;
  netAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'partial' | 'unpaid';
  dueDate: string;
}

export default function FinancePage() {
  const { isBengali } = useTranslation();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2026-0001',
      studentId: 'STU-2026-0001',
      studentName: 'Mohammad Tanvir Ahmed',
      month: 'October 2026',
      netAmount: 2500,
      paidAmount: 2500,
      dueAmount: 0,
      status: 'paid',
      dueDate: '2026-10-25',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-0002',
      studentId: 'STU-2026-0002',
      studentName: 'Nusrat Jahan',
      month: 'October 2026',
      netAmount: 2500,
      paidAmount: 1500,
      dueAmount: 1000,
      status: 'partial',
      dueDate: '2026-10-25',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-0003',
      studentId: 'STU-2026-0003',
      studentName: 'Samiul Hasan',
      month: 'October 2026',
      netAmount: 2500,
      paidAmount: 0,
      dueAmount: 2500,
      status: 'unpaid',
      dueDate: '2026-10-25',
    },
  ]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;

    if (paymentAmount <= 0 || paymentAmount > selectedInvoiceForPayment.dueAmount) {
      toast.error('Invalid payment amount');
      return;
    }

    const updated = invoices.map((inv) => {
      if (inv.id === selectedInvoiceForPayment.id) {
        const newPaid = inv.paidAmount + paymentAmount;
        const newDue = inv.dueAmount - paymentAmount;
        return {
          ...inv,
          paidAmount: newPaid,
          dueAmount: newDue,
          status: (newDue === 0 ? 'paid' : 'partial') as any,
        };
      }
      return inv;
    });

    setInvoices(updated);
    setSelectedInvoiceForPayment(null);
    toast.success(isBengali ? 'পেমেন্ট সফলভাবে সংরক্ষিত হয়েছে!' : 'Payment recorded successfully! Receipt generated.');
  };

  const columns: Column<Invoice>[] = [
    {
      header: 'Invoice #',
      accessorKey: 'invoiceNumber',
      sortable: true,
      cell: (row) => <span className="font-bold text-blue-700 text-xs">{row.invoiceNumber}</span>,
    },
    {
      header: 'Student',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.studentName}</div>
          <div className="text-[11px] text-gray-500">{row.studentId}</div>
        </div>
      ),
    },
    {
      header: 'Month',
      accessorKey: 'month',
      cell: (row) => <span className="text-xs">{row.month}</span>,
    },
    {
      header: 'Total',
      cell: (row) => <span className="font-semibold text-xs">৳{row.netAmount.toLocaleString()}</span>,
    },
    {
      header: 'Paid',
      cell: (row) => <span className="text-emerald-700 font-semibold text-xs">৳{row.paidAmount.toLocaleString()}</span>,
    },
    {
      header: 'Due',
      cell: (row) => (
        <span className={`font-bold text-xs ${row.dueAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
          ৳{row.dueAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => {
        const map: Record<Invoice['status'], 'success' | 'warning' | 'danger'> = {
          paid: 'success',
          partial: 'warning',
          unpaid: 'danger',
        };
        return <Badge variant={map[row.status]} size="sm">{row.status.toUpperCase()}</Badge>;
      },
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          {row.dueAmount > 0 && (
            <Button
              size="sm"
              onClick={() => {
                setSelectedInvoiceForPayment(row);
                setPaymentAmount(row.dueAmount);
              }}
              className="bg-[#1e3a5f] hover:bg-blue-800 text-[11px] h-7 px-2"
            >
              <CreditCard className="w-3.5 h-3.5 mr-1" />
              Pay
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.print()}
            className="text-[11px] h-7 px-2"
          >
            <Printer className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'হিসাব ও ফি ব্যবস্থাপনা' : 'Fee Collection & Finance'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'ইনভয়েস তৈরি, বকেয়া পর্যবেক্ষণ ও রসিদ প্রদান' : 'Manage student billings, fee structures, and collection receipts'}
          </p>
        </div>

        <Button onClick={() => setIsInvoiceModalOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন ইনভয়েস তৈরি' : 'Generate Student Invoice'}
        </Button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Total Invoiced</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">৳7,500</div>
          <div className="text-xs text-gray-400 mt-0.5">October 2026 billing cycle</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-xs text-emerald-600 font-semibold uppercase">Total Collected</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">৳4,000</div>
          <div className="text-xs text-emerald-600 mt-0.5">53.3% collection rate</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-xs text-red-600 font-semibold uppercase">Total Outstanding Due</div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">৳3,500</div>
          <div className="text-xs text-red-500 mt-0.5">Actionable dues</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={invoices}
          searchKey="studentName"
          searchPlaceholder="Search by student name..."
        />
      </div>

      {/* Payment Recording Modal */}
      {selectedInvoiceForPayment && (
        <Modal
          isOpen={!!selectedInvoiceForPayment}
          onClose={() => setSelectedInvoiceForPayment(null)}
          title={`Collect Payment: ${selectedInvoiceForPayment.invoiceNumber}`}
        >
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs border border-gray-200">
              <div><span className="font-bold">Student:</span> {selectedInvoiceForPayment.studentName}</div>
              <div><span className="font-bold">Invoice Month:</span> {selectedInvoiceForPayment.month}</div>
              <div><span className="font-bold">Remaining Due:</span> <span className="font-bold text-red-600">৳{selectedInvoiceForPayment.dueAmount}</span></div>
            </div>

            <Input
              label="Payment Amount (BDT)"
              type="number"
              max={selectedInvoiceForPayment.dueAmount}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              required
            />

            <Select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={[
                { value: 'cash', label: 'Cash at Counter' },
                { value: 'bank_transfer', label: 'Bank Deposit' },
                { value: 'mobile_banking', label: 'bKash / Nagad / Rocket' },
              ]}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedInvoiceForPayment(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1e3a5f]">
                Confirm & Issue Receipt
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
