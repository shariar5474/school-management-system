'use client';

import React from 'react';
import { Menu, Globe, LogOut, User as UserIcon } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/Button';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  userRole?: string;
}

export function DashboardHeader({ onToggleSidebar, userRole = 'super_admin' }: DashboardHeaderProps) {
  const { toggleLocale, isBengali } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-gray-800 text-sm hidden sm:inline">
          {isBengali ? 'স্কুল ম্যানেজমেন্ট সিস্টেম' : 'School Management System'}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Language Toggle */}
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>{isBengali ? 'English' : 'বাংলা'}</span>
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 text-sm text-gray-700">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left text-xs">
            <div className="font-semibold text-gray-900">{user?.displayName || 'Administrator'}</div>
            <div className="text-gray-500 capitalize">{userRole.replace('_', ' ')}</div>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-2.5"
          title="Logout"
        >
          <LogOut className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{isBengali ? 'লগআউট' : 'Logout'}</span>
        </Button>
      </div>
    </header>
  );
}
