'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  UserCheck,
  CreditCard,
  BookOpen,
  Bell,
  Settings,
  ShieldCheck,
  BarChart3,
  X,
} from 'lucide-react';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ role = 'super_admin', isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isBengali } = useTranslation();

  const navItems = [
    {
      title: isBengali ? 'ড্যাশবোর্ড' : 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['super_admin', 'school_admin', 'teacher', 'accountant', 'librarian', 'admission_officer', 'student', 'parent'],
    },
    {
      title: isBengali ? 'ব্যবহারকারী ও রোল' : 'Users & Roles',
      href: '/dashboard/users',
      icon: ShieldCheck,
      roles: ['super_admin'],
    },
    {
      title: isBengali ? 'শিক্ষার্থী ব্যবস্থাপনা' : 'Students',
      href: '/dashboard/students',
      icon: Users,
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      title: isBengali ? 'শিক্ষকমণ্ডলী' : 'Teachers',
      href: '/dashboard/teachers',
      icon: GraduationCap,
      roles: ['super_admin', 'school_admin'],
    },
    {
      title: isBengali ? 'একাডেমিক কাঠামো' : 'Academics',
      href: '/dashboard/academics',
      icon: GraduationCap,
      roles: ['super_admin', 'school_admin'],
    },
    {
      title: isBengali ? 'উপস্থিতি' : 'Attendance',
      href: '/dashboard/attendance',
      icon: CalendarCheck,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      title: isBengali ? 'পরীক্ষা ও নম্বর' : 'Examinations',
      href: '/dashboard/exams',
      icon: FileSpreadsheet,
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      title: isBengali ? 'ফলাফল ও টেমপ্লেট' : 'Results & Templates',
      href: '/dashboard/results',
      icon: Award,
      roles: ['super_admin', 'school_admin', 'student', 'parent'],
    },
    {
      title: isBengali ? 'ভর্তি আবেদন' : 'Admissions',
      href: '/dashboard/admissions',
      icon: UserCheck,
      roles: ['super_admin', 'school_admin', 'admission_officer'],
    },
    {
      title: isBengali ? 'হিসাব ও ফি' : 'Finance & Fees',
      href: '/dashboard/finance',
      icon: CreditCard,
      roles: ['super_admin', 'school_admin', 'accountant'],
    },
    {
      title: isBengali ? 'লাইব্রেরি' : 'Library',
      href: '/dashboard/library',
      icon: BookOpen,
      roles: ['super_admin', 'school_admin', 'librarian'],
    },
    {
      title: isBengali ? 'নোটিশ ও ইভেন্ট' : 'Notices & Events',
      href: '/dashboard/notices',
      icon: Bell,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      title: isBengali ? 'প্রতিবেদন' : 'Reports',
      href: '/dashboard/reports',
      icon: BarChart3,
      roles: ['super_admin', 'school_admin', 'accountant'],
    },
    {
      title: isBengali ? 'সেটিংস' : 'School Settings',
      href: '/dashboard/settings',
      icon: Settings,
      roles: ['super_admin', 'school_admin'],
    },
    {
      title: isBengali ? 'অডিট লগ' : 'Audit Logs',
      href: '/dashboard/audit',
      icon: ShieldCheck,
      roles: ['super_admin'],
    },
  ];

  const allowedItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1e3a5f] text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-blue-900/50 bg-[#162a45]">
          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-lg text-white">
            <GraduationCap className="w-6 h-6 text-yellow-400" />
            <span>SchoolOS</span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Pill */}
        <div className="px-5 py-3 bg-[#183050] border-b border-blue-900/40 text-xs">
          <span className="text-gray-400">{isBengali ? 'ভূমিকা:' : 'Role:'} </span>
          <span className="font-semibold text-yellow-400 uppercase tracking-wide">
            {role.replace('_', ' ')}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {allowedItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white',
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-blue-300')} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Public Site */}
        <div className="p-4 border-t border-blue-900/50 bg-[#162a45]">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
          >
            &larr; {isBengali ? 'পাবলিক ওয়েবসাইটে ফিরুন' : 'Back to Public Website'}
          </Link>
        </div>
      </aside>
    </>
  );
}
