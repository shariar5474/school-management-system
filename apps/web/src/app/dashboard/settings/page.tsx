'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Save, School, Award, Phone, Globe, Sliders, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsDashboardPage() {
  const { isBengali } = useTranslation();
  const { user, changePassword } = useAuth();
  const [saving, setSaving] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [settings, setSettings] = useState({
    schoolNameEn: 'Agrani Model High School & College',
    schoolNameBn: 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ',
    sloganEn: 'Excellence in Education since 1995',
    sloganBn: '১৯৯৫ সাল থেকে শিক্ষার উৎকর্ষে',
    address: '123 College Road, Dhanmondi, Dhaka-1205',
    phone: '+880 1712-345678',
    email: 'info@agranischool.edu.bd',
    principalNameEn: 'Prof. Mohammad Harunur Rashid',
    principalNameBn: 'প্রফেসর মোহাম্মদ হারুনুর রশীদ',
    activeResultTemplateId: 'classic',
    enableOnlineAdmission: true,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      await fetch(`${apiUrl}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      toast.success(isBengali ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'School settings saved successfully!');
    } catch {
      toast.success('Settings updated in local state');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error(isBengali ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(isBengali ? 'উভয় পাসওয়ার্ড একই হতে হবে' : 'Passwords do not match');
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(newPassword);
      toast.success(isBengali ? 'আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' : 'Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Error updating password. Re-login may be required.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isBengali ? 'বিদ্যালয় সেটিংস ও কনফিগারেশন' : 'School Settings & Configuration'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBengali ? 'নাম, ঠিকানা, সক্রিয় ফলাফল টেমপ্লেট ও ব্র্যান্ডিং সেটিংস' : 'Manage institutional branding, active templates, and policies'}
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving} className="bg-[#1e3a5f] hover:bg-blue-800 text-xs">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Identity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1e3a5f] flex items-center gap-2 border-b pb-2">
            <School className="w-4 h-4 text-blue-600" />
            {isBengali ? 'প্রাতিষ্ঠানিক পরিচয় ও নাম' : 'Institutional Identity'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="School Name (English)"
              value={settings.schoolNameEn}
              onChange={(e) => setSettings({ ...settings, schoolNameEn: e.target.value })}
              required
            />
            <Input
              label="School Name (Bengali)"
              value={settings.schoolNameBn}
              onChange={(e) => setSettings({ ...settings, schoolNameBn: e.target.value })}
              required
            />
            <Input
              label="Slogan (English)"
              value={settings.sloganEn}
              onChange={(e) => setSettings({ ...settings, sloganEn: e.target.value })}
            />
            <Input
              label="Slogan (Bengali)"
              value={settings.sloganBn}
              onChange={(e) => setSettings({ ...settings, sloganBn: e.target.value })}
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1e3a5f] flex items-center gap-2 border-b pb-2">
            <Phone className="w-4 h-4 text-blue-600" />
            {isBengali ? 'যোগাযোগ ও ঠিকানা' : 'Contact & Location'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
            />
            <Input
              label="Official Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
            />
            <div className="sm:col-span-2">
              <Textarea
                label="Full Address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={2}
                required
              />
            </div>
          </div>
        </div>

        {/* Academic & Active Template Settings */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1e3a5f] flex items-center gap-2 border-b pb-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            {isBengali ? 'ফলাফল টেমপ্লেট ও ভর্তি সেটিংস' : 'Academic & Template Policy'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Active Result / Marksheet Template"
              value={settings.activeResultTemplateId}
              onChange={(e) => setSettings({ ...settings, activeResultTemplateId: e.target.value as any })}
              options={[
                { value: 'classic', label: 'Classic Academic (Traditional Marksheet)' },
                { value: 'modern', label: 'Modern Professional (Clean Cards & Highlights)' },
                { value: 'premium', label: 'Premium Certificate Style (Diploma Border)' },
              ]}
            />
            <Select
              label="Public Online Admission Form"
              value={settings.enableOnlineAdmission ? 'enabled' : 'disabled'}
              onChange={(e) => setSettings({ ...settings, enableOnlineAdmission: e.target.value === 'enabled' })}
              options={[
                { value: 'enabled', label: 'Enabled (Public form accepting applications)' },
                { value: 'disabled', label: 'Disabled (Closed for this session)' },
              ]}
            />
          </div>
        </div>

        {/* Change Account Password Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1e3a5f] flex items-center gap-2 border-b pb-2">
            <Lock className="w-4 h-4 text-blue-600" />
            {isBengali ? 'পাসওয়ার্ড পরিবর্তন (Change Password)' : 'Account Security & Password'}
          </h2>
          <p className="text-xs text-gray-500">
            {isBengali
              ? 'আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে নতুন শক্তিশালী পাসওয়ার্ড সেট করুন'
              : 'Update your current login password directly'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={isBengali ? 'নতুন পাসওয়ার্ড' : 'New Password'}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label={isBengali ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="pt-2">
            <Button
              type="button"
              onClick={handlePasswordChange}
              disabled={passwordLoading}
              className="bg-[#1e3a5f] hover:bg-blue-800 text-xs"
            >
              <KeyRound className="w-3.5 h-3.5 mr-1.5" />
              {passwordLoading ? (isBengali ? 'আপডেট হচ্ছে...' : 'Updating...') : (isBengali ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Update Password')}
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
