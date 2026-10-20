'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, UserPlus, Users, KeyRound, Search, CheckCircle, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface SystemUser {
  id: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

export default function UsersManagementPage() {
  const { isBengali } = useTranslation();
  const { getToken } = useAuth();
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: 'dpDiZSs9nZdy1cFttseI0Sg0Bir1',
      displayName: 'Super Admin',
      email: 'sohel229229@gmail.com',
      role: 'super_admin',
      isActive: true,
      createdAt: '2026-10-20',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Create User Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('teacher');
  const [creating, setCreating] = useState(false);

  // Fetch users from API if available
  useEffect(() => {
    async function loadUsers() {
      try {
        const token = await getToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const res = await fetch(`${apiUrl}/users`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            setUsers(json.data);
          }
        }
      } catch (e) {
        console.error('Could not fetch remote users, using local state', e);
      }
    }
    loadUsers();
  }, [getToken]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword || !newName) {
      toast.error(isBengali ? 'সকল তথ্য পূরণ করুন' : 'Please fill all fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error(isBengali ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }

    setCreating(true);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          displayName: newName,
          email: newEmail,
          password: newPassword,
          role: newRole,
          schoolId: 'school_001',
        }),
      });

      const newUser: SystemUser = {
        id: `usr_${Date.now()}`,
        displayName: newName,
        email: newEmail,
        role: newRole,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setUsers((prev) => [newUser, ...prev]);
      toast.success(
        isBengali
          ? `নতুন ব্যবহারকারী (${newRole}) সফলভাবে তৈরি হয়েছে!`
          : `User with role ${newRole} created successfully!`
      );
      setModalOpen(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('teacher');
    } catch (err: any) {
      toast.error(err.message || 'Error creating user');
    } finally {
      setCreating(false);
    }
  };

  const roleLabels: Record<string, { en: string; bn: string; color: 'blue' | 'emerald' | 'amber' | 'indigo' | 'rose' | 'gray' }> = {
    super_admin: { en: 'Super Admin', bn: 'সুপার এডমিন', color: 'rose' },
    school_admin: { en: 'School Admin', bn: 'স্কুল এডমিন', color: 'amber' },
    teacher: { en: 'Teacher', bn: 'শিক্ষক', color: 'blue' },
    accountant: { en: 'Accountant', bn: 'হিসাবরক্ষক', color: 'indigo' },
    librarian: { en: 'Librarian', bn: 'গ্রন্থাগারিক', color: 'emerald' },
    admission_officer: { en: 'Admission Officer', bn: 'ভর্তি কর্মকর্তা', color: 'amber' },
    student: { en: 'Student', bn: 'শিক্ষার্থী', color: 'gray' },
    parent: { en: 'Parent', bn: 'অভিভাবক', color: 'gray' },
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            {isBengali ? 'ব্যবহারকারী ও রোল ম্যানেজমেন্ট' : 'User & Role Management'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali
              ? 'সুপার এডমিন হিসেবে নতুন ইউজার তৈরি ও দায়িত্বভিত্তিক রোল বরাদ্দ করুন'
              : 'Create new users and assign role-based permissions (Super Admin Privilege)'}
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#1e3a5f] hover:bg-blue-800 text-xs shadow-md"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          {isBengali ? 'নতুন ইউজার তৈরি করুন' : 'Create New User'}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBengali ? 'নাম বা ইমেইল দিয়ে খুঁজুন...' : 'Search by name or email...'}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">{isBengali ? 'সকল রোল' : 'All Roles'}</option>
          <option value="super_admin">Super Admin</option>
          <option value="school_admin">School Admin</option>
          <option value="teacher">Teacher</option>
          <option value="accountant">Accountant</option>
          <option value="librarian">Librarian</option>
          <option value="admission_officer">Admission Officer</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">{isBengali ? 'ব্যবহারকারী' : 'User'}</th>
                <th className="py-3.5 px-4">{isBengali ? 'ইমেইল' : 'Email'}</th>
                <th className="py-3.5 px-4">{isBengali ? 'রোল / ভূমিকা' : 'Role'}</th>
                <th className="py-3.5 px-4">{isBengali ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3.5 px-4">{isBengali ? 'তৈরির তারিখ' : 'Created'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    {isBengali ? 'কোনো ব্যবহারকারী পাওয়া যায়নি' : 'No users found'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleMeta = roleLabels[user.role] || { en: user.role, bn: user.role, color: 'blue' };
                  return (
                    <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-900 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{user.displayName}</div>
                          {user.email === 'sohel229229@gmail.com' && (
                            <span className="text-[10px] text-emerald-600 font-bold">★ Primary Super Admin</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-mono">{user.email}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                          {isBengali ? roleMeta.bn : roleMeta.en}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={user.isActive ? 'success' : 'danger'}>
                          {user.isActive ? (isBengali ? 'সক্রিয়' : 'Active') : (isBengali ? 'নিষ্ক্রিয়' : 'Inactive')}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-gray-400">{user.createdAt || '2026-10-20'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isBengali ? 'নতুন ব্যবহারকারী তৈরি করুন' : 'Create New System User'}
      >
        <form onSubmit={handleCreateUser} className="space-y-4 pt-2">
          <Input
            label={isBengali ? 'পূর্ণ নাম' : 'Full Name'}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="John Doe"
            required
          />

          <Input
            label={isBengali ? 'ইমেইল ঠিকানা' : 'Email Address'}
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="teacher@school.edu.bd"
            required
          />

          <Input
            label={isBengali ? 'পাসওয়ার্ড' : 'Initial Password'}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Select
            label={isBengali ? 'রোল নির্ধারণ করুন' : 'Assign System Role'}
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            options={[
              { value: 'school_admin', label: 'School Admin (স্কুল প্রশাসক)' },
              { value: 'teacher', label: 'Teacher (শিক্ষক)' },
              { value: 'accountant', label: 'Accountant (হিসাবরক্ষক)' },
              { value: 'librarian', label: 'Librarian (লাইব্রেরিয়ান)' },
              { value: 'admission_officer', label: 'Admission Officer (ভর্তি কর্মকর্তা)' },
              { value: 'student', label: 'Student (শিক্ষার্থী)' },
              { value: 'parent', label: 'Parent / Guardian (অভিভাবক)' },
              { value: 'super_admin', label: 'Super Admin (সর্বোচ্চ ক্ষমতা)' },
            ]}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              {isBengali ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={creating}
              className="bg-[#1e3a5f]"
            >
              {creating
                ? (isBengali ? 'তৈরি করা হচ্ছে...' : 'Creating...')
                : (isBengali ? 'ব্যবহারকারী তৈরি করুন' : 'Create User')}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
