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
import { Plus, BookOpen, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Book {
  id: string;
  bookCode: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

export default function LibraryDashboardPage() {
  const { isBengali } = useTranslation();
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState<Book | null>(null);

  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      bookCode: 'BK-001',
      title: 'Ananda Path (Literature)',
      author: 'Rabindranath Tagore',
      category: 'Literature',
      totalCopies: 15,
      availableCopies: 12,
    },
    {
      id: '2',
      bookCode: 'BK-002',
      title: 'Higher Mathematics Guide',
      author: 'Prof. A. K. Das',
      category: 'Mathematics',
      totalCopies: 20,
      availableCopies: 18,
    },
    {
      id: '3',
      bookCode: 'BK-003',
      title: 'Banglapedia Vol 1',
      author: 'Asiatic Society',
      category: 'Reference',
      totalCopies: 5,
      availableCopies: 5,
    },
    {
      id: '4',
      bookCode: 'BK-004',
      title: 'Concept of Physics Vol 1',
      author: 'H. C. Verma',
      category: 'Science',
      totalCopies: 12,
      availableCopies: 9,
    },
  ]);

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookForIssue) return;
    if (selectedBookForIssue.availableCopies <= 0) {
      toast.error('No copies available to issue');
      return;
    }

    setBooks(
      books.map((b) =>
        b.id === selectedBookForIssue.id
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b,
      ),
    );
    setSelectedBookForIssue(null);
    toast.success('Book issued successfully!');
  };

  const columns: Column<Book>[] = [
    {
      header: 'Code',
      accessorKey: 'bookCode',
      sortable: true,
      cell: (row) => <span className="font-bold text-blue-700 text-xs">{row.bookCode}</span>,
    },
    {
      header: 'Title & Author',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-gray-900 text-xs">{row.title}</div>
          <div className="text-[11px] text-gray-500">{row.author}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (row) => <span className="text-xs">{row.category}</span>,
    },
    {
      header: 'Stock',
      cell: (row) => (
        <span className="text-xs font-semibold">
          {row.availableCopies} / {row.totalCopies} Available
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.availableCopies > 0 ? 'success' : 'danger'} size="sm">
          {row.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            onClick={() => setSelectedBookForIssue(row)}
            disabled={row.availableCopies <= 0}
            className="bg-[#1e3a5f] hover:bg-blue-800 text-[11px] h-7 px-2"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            Issue
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setBooks(
                books.map((b) =>
                  b.id === row.id && b.availableCopies < b.totalCopies
                    ? { ...b, availableCopies: b.availableCopies + 1 }
                    : b,
                ),
              );
              toast.success('Book returned to inventory');
            }}
            className="text-[11px] h-7 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Return
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
            {isBengali ? 'গ্রন্থাগার ও লাইব্রেরি ব্যবস্থাপনা' : 'Library Catalog & Issue System'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'বই তালিকা, ইস্যু-রিটার্ন ও ইনভেন্টরি ট্র্যাকিং' : 'Book lending, inventory control, and transaction history'}
          </p>
        </div>

        <Button onClick={() => setIsAddBookOpen(true)} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন বই যোগ করুন' : 'Add New Book'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <DataTable
          columns={columns}
          data={books}
          searchKey="title"
          searchPlaceholder="Search by book title or author..."
        />
      </div>

      {/* Issue Modal */}
      {selectedBookForIssue && (
        <Modal
          isOpen={!!selectedBookForIssue}
          onClose={() => setSelectedBookForIssue(null)}
          title={`Issue Book: ${selectedBookForIssue.title}`}
        >
          <form onSubmit={handleIssue} className="space-y-4">
            <Input label="Student ID or Employee ID" placeholder="e.g. STU-2026-0001" required />
            <Input label="Return Due Date" type="date" defaultValue="2026-11-15" required />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedBookForIssue(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1e3a5f]">
                Confirm Book Issue
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        title="Add Book to Catalog"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddBookOpen(false);
            toast.success('Book registered successfully');
          }}
          className="space-y-4"
        >
          <Input label="Book Title" required />
          <Input label="Author" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Book Code" defaultValue={`BK-${books.length + 1}`} required />
            <Input label="Total Copies" type="number" defaultValue="10" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddBookOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1e3a5f]">
              Save Book
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
