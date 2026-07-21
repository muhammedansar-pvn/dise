'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Applicant {
  id: string;
  studentName: string;
  applyingClass: string;
  guardianName: string;
  contactPhone: string;
  previousSchool: string;
  additionalNotes: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  adminNotes?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Selected Applicant for detail view modal
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [tempAdminNotes, setTempAdminNotes] = useState('');
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);

  // Admissions Settings states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [admissionsEnabled, setAdmissionsEnabled] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Fetch all applicants from the API
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admissions');
      const data = await res.json();
      if (data.success) {
        setApplicants(data.data);
      } else {
        setError(data.error || 'Failed to retrieve application records');
      }
    } catch (err: any) {
      setError('Error connecting to Server API. Make sure the development server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch admissions settings
  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setStartDate(data.data.startDate || '');
        setEndDate(data.data.endDate || '');
        setAcademicYear(data.data.academicYear || '2026-27');
        setAdmissionsEnabled(data.data.admissionsEnabled ?? true);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  // Save admissions settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsError(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
          academicYear,
          admissionsEnabled,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert('Admissions configuration saved successfully and is now active on the public site!');
      } else {
        setSettingsError(result.error || 'Failed to save settings');
      }
    } catch (err: any) {
      setSettingsError('Error connecting to Settings endpoint.');
      console.error(err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    fetchSettings();
  }, []);

  // Update applicant status (Approve, Reject, Pending)
  const handleUpdateStatus = async (id: string, newStatus: 'Pending' | 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        // Update local state
        setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        // Update currently selected modal details if open
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert('Failed to update status: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
    }
  };

  // Update applicant admin notes
  const handleSaveNotes = async () => {
    if (!selectedApplicant) return;
    try {
      setIsUpdatingNotes(true);
      const res = await fetch(`/api/admissions/${selectedApplicant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: tempAdminNotes }),
      });
      const result = await res.json();
      if (result.success) {
        setApplicants(prev => prev.map(app => app.id === selectedApplicant.id ? { ...app, adminNotes: tempAdminNotes } : app));
        setSelectedApplicant(prev => prev ? { ...prev, adminNotes: tempAdminNotes } : null);
        alert('Admin notes updated successfully.');
      } else {
        alert('Failed to update notes: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving notes.');
    } finally {
      setIsUpdatingNotes(false);
    }
  };

  // Delete applicant
  const handleDeleteApplicant = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this application record? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setApplicants(prev => prev.filter(app => app.id !== id));
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant(null);
        }
      } else {
        alert('Failed to delete applicant: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting applicant.');
    }
  };



  // Export applicants to CSV
  const handleExportCSV = () => {
    if (applicants.length === 0) {
      alert('No data to export.');
      return;
    }

    const headers = [
      'ID',
      'Student Name',
      'Applying Class',
      'Parent/Guardian Name',
      'Contact Phone',
      'Previous School',
      'Additional Notes',
      'Status',
      'Admin Notes',
      'Submission Date'
    ];

    const rows = applicants.map(app => [
      app.id,
      `"${app.studentName.replace(/"/g, '""')}"`,
      app.applyingClass,
      `"${app.guardianName.replace(/"/g, '""')}"`,
      app.contactPhone,
      `"${app.previousSchool.replace(/"/g, '""')}"`,
      `"${(app.additionalNotes || '').replace(/"/g, '""')}"`,
      app.status,
      `"${(app.adminNotes || '').replace(/"/g, '""')}"`,
      new Date(app.createdAt).toLocaleString()
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DISE_Applicants_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Log out of admin panel
  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out of the admin panel?')) return;
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
      });
      if (res.ok) {
        window.location.href = '/admin/login';
      } else {
        alert('Failed to log out.');
      }
    } catch (e) {
      console.error(e);
      alert('Network error during logout.');
    }
  };

  // Calculate statistics
  const totalCount = applicants.length;
  const pendingCount = applicants.filter(app => app.status === 'Pending').length;
  const approvedCount = applicants.filter(app => app.status === 'Approved').length;
  const rejectedCount = applicants.filter(app => app.status === 'Rejected').length;

  const class7Count = applicants.filter(app => app.applyingClass === '7').length;
  const class8Count = applicants.filter(app => app.applyingClass === '8').length;

  // Filter and search logic
  const filteredApplicants = applicants
    .filter(app => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        app.studentName.toLowerCase().includes(searchLower) ||
        app.guardianName.toLowerCase().includes(searchLower) ||
        app.previousSchool.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

      // Class filter
      const matchesClass = classFilter === 'All' || app.applyingClass === classFilter;

      return matchesSearch && matchesStatus && matchesClass;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'name-asc') {
        return a.studentName.localeCompare(b.studentName);
      } else if (sortBy === 'name-desc') {
        return b.studentName.localeCompare(a.studentName);
      }
      return 0;
    });

  // Open Detailed Modal
  const openDetails = (app: Applicant) => {
    setSelectedApplicant(app);
    setTempAdminNotes(app.adminNotes || '');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased pb-16">
      {/* Admin Nav */}
      <header className="sticky top-0 bg-white border-b border-[#E2E8F0] shadow-sm z-50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <svg className="h-8 w-auto text-[#0D4EA3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
          </svg>
          <div>
            <h1 className="font-heading font-extrabold text-xl md:text-2xl text-[#0D4EA3] leading-none">DISE Admin</h1>
            <span className="text-xs text-[#475569] font-medium tracking-wide uppercase">Admissions Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="text-xs md:text-sm bg-white text-[#475569] hover:text-[#0D4EA3] border border-[#CBD5E1] hover:border-[#0D4EA3] font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
          >
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs md:text-sm bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0D4EA3] to-[#062F68] rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10 scale-125">
            <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl mb-2">Admissions Review Desk</h2>
          <p className="text-blue-100 max-w-xl text-sm md:text-base">
            Review comprehensive applicant portfolios, process admissions for 7th and 8th classes, and maintain local communication logs.
          </p>
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Card 1: Total */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wide">Total Applications</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#0D4EA3] mt-1">{totalCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0D4EA3] flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wide">Pending Review</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-amber-500 mt-1">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 3: Approved */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wide">Approved</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-emerald-600 mt-1">{approvedCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 4: Rejected */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wide">Rejected</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-rose-600 mt-1">{rejectedCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Visual Charts/Distribution Section */}
        {totalCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Class distribution meter */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide mb-4">Class Distribution</h4>
              <div className="flex justify-between items-center text-xs font-semibold text-[#475569] mb-2">
                <span>7th Class ({class7Count})</span>
                <span>8th Class ({class8Count})</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-4 rounded-full overflow-hidden flex">
                <div 
                  className="bg-[#0D4EA3] h-full transition-all duration-500" 
                  style={{ width: `${(class7Count / totalCount) * 100}%` }}
                  title={`7th Class: ${class7Count}`}
                ></div>
                <div 
                  className="bg-[#F6C400] h-full transition-all duration-500" 
                  style={{ width: `${(class8Count / totalCount) * 100}%` }}
                  title={`8th Class: ${class8Count}`}
                ></div>
              </div>
              <div className="flex gap-4 mt-3 text-xs text-[#475569]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#0D4EA3] rounded-full inline-block"></span>
                  <span>7th Class ({( (class7Count/totalCount) * 100 ).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#F6C400] rounded-full inline-block"></span>
                  <span>8th Class ({( (class8Count/totalCount) * 100 ).toFixed(0)}%)</span>
                </div>
              </div>
            </div>

            {/* Approval Progress visual chart */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide mb-4">Review Progress</h4>
              <div className="flex justify-between items-center text-xs font-semibold text-[#475569] mb-2">
                <span>Processed (Approved + Rejected: {approvedCount + rejectedCount})</span>
                <span>Pending ({pendingCount})</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-4 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${(approvedCount / totalCount) * 100}%` }}
                  title={`Approved: ${approvedCount}`}
                ></div>
                <div 
                  className="bg-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${(rejectedCount / totalCount) * 100}%` }}
                  title={`Rejected: ${rejectedCount}`}
                ></div>
                <div 
                  className="bg-amber-400 h-full transition-all duration-500" 
                  style={{ width: `${(pendingCount / totalCount) * 100}%` }}
                  title={`Pending: ${pendingCount}`}
                ></div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#475569]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
                  <span>Approved ({( (approvedCount/totalCount) * 100 ).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>
                  <span>Rejected ({( (rejectedCount/totalCount) * 100 ).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-amber-400 rounded-full inline-block"></span>
                  <span>Pending ({( (pendingCount/totalCount) * 100 ).toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admissions Date Management Panel */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm mb-8">
          <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-1 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0D4EA3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Admissions Date & Portal Management
          </h3>
          <p className="text-xs text-[#64748B] mb-5">
            Configure the dates during which student registration is allowed. This updates the "Apply Now" button and status live on the home page.
          </p>

          {settingsError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded-lg text-xs mb-4">
              {settingsError}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider">Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full text-xs md:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#0D4EA3]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider">End Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full text-xs md:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#0D4EA3]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider">Academic Year</label>
              <input 
                type="text" 
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                required
                placeholder="e.g. 2026-27"
                className="w-full text-xs md:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#0D4EA3]"
              />
            </div>
            <div className="flex items-center h-10 gap-2 pb-2">
              <input 
                type="checkbox" 
                id="admissionsEnabled"
                checked={admissionsEnabled}
                onChange={(e) => setAdmissionsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0D4EA3] border-[#CBD5E1] rounded focus:ring-[#0D4EA3]"
              />
              <label htmlFor="admissionsEnabled" className="text-xs font-semibold text-[#475569] cursor-pointer select-none">
                Admissions Enabled
              </label>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={isSavingSettings}
                className="w-full text-xs md:text-sm bg-[#0D4EA3] hover:bg-[#062F68] text-white font-bold px-4 py-2.5 rounded-lg transition-all duration-200 border border-[#0D4EA3] shadow-sm flex items-center justify-center gap-1.5"
              >
                {isSavingSettings ? 'Saving...' : 'Apply Config'}
              </button>
            </div>
          </form>
        </div>

        {/* Filters and Search controls */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Filters & Tools</h4>
            {applicants.length > 0 && (
              <button 
                onClick={handleExportCSV} 
                className="self-end md:self-auto flex items-center gap-2 text-xs md:text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-4 py-2 border border-emerald-200 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search name, parent, school..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0D4EA3] focus:bg-white text-slate-800 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0D4EA3] focus:bg-white text-slate-700 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Class Filter */}
            <div>
              <select 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0D4EA3] focus:bg-white text-slate-700 transition-colors"
              >
                <option value="All">All Classes</option>
                <option value="7">7th Class</option>
                <option value="8">8th Class</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0D4EA3] focus:bg-white text-slate-700 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Load States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0D4EA3]"></div>
            <p className="mt-4 text-[#475569] font-medium text-sm">Retrieving applicant directory...</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-center shadow-sm">
            <svg className="w-10 h-10 mx-auto text-rose-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="font-bold text-lg">Failed to Connect</h4>
            <p className="mt-1 text-sm text-rose-700">{error}</p>
          </div>
        )}

        {/* Applicants List Grid / Table */}
        {!loading && !error && (
          <>
            {filteredApplicants.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0] px-6">
                <svg className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="font-heading font-bold text-lg text-[#0F172A]">No Applicants Found</h4>
                <p className="text-[#475569] text-sm mt-1 max-w-md mx-auto">
                  {totalCount === 0 
                    ? 'No admissions inquiry submissions have been registered yet. Once public users submit inquiries on the main site, they will automatically appear here.'
                    : 'No applicants match the current search filters. Clear some filter criteria and try again.'}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#E2E8F0] text-xs font-bold text-[#475569] uppercase tracking-wider">
                        <th className="py-4 px-6">Student & Parent</th>
                        <th className="py-4 px-6">Class</th>
                        <th className="py-4 px-6">Contact info</th>
                        <th className="py-4 px-6">Previous School</th>
                        <th className="py-4 px-6">Submitted Date</th>
                        <th className="py-4 px-6 text-center">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-sm text-[#0F172A]">
                      {filteredApplicants.map((app) => (
                        <tr 
                          key={app.id}
                          className="hover:bg-slate-50/70 transition-colors duration-150 cursor-pointer group"
                          onClick={() => openDetails(app)}
                        >
                          {/* Student & Parent */}
                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-900 group-hover:text-[#0D4EA3] transition-colors duration-150">
                              {app.studentName}
                            </div>
                            <div className="text-xs text-[#475569] mt-0.5">
                              Guardian: {app.guardianName}
                            </div>
                          </td>

                          {/* Applying Class */}
                          <td className="py-4 px-6 font-medium">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                              app.applyingClass === '7' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {app.applyingClass}th Class
                            </span>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-6 text-[#475569]">
                            {app.contactPhone}
                          </td>

                          {/* Previous School */}
                          <td className="py-4 px-6 max-w-xs truncate text-[#475569]" title={app.previousSchool}>
                            {app.previousSchool}
                          </td>

                          {/* Submission Date */}
                          <td className="py-4 px-6 text-[#475569] text-xs">
                            {new Date(app.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>

                          {/* Status Badge */}
                          <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                app.status === 'Approved' ? 'bg-emerald-500' :
                                app.status === 'Rejected' ? 'bg-rose-500' :
                                'bg-amber-500'
                              }`}></span>
                              {app.status}
                            </span>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end gap-1.5">
                              {/* Approve action */}
                              {app.status !== 'Approved' && (
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, 'Approved')}
                                  title="Approve Applicant"
                                  className="p-1.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              )}

                              {/* Reject action */}
                              {app.status !== 'Rejected' && (
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                  title="Reject Applicant"
                                  className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}

                              {/* Delete action */}
                              <button 
                                onClick={() => handleDeleteApplicant(app.id)}
                                title="Delete Record"
                                className="p-1.5 rounded bg-slate-50 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Footer showing count */}
                <div className="bg-slate-50 border-t border-[#E2E8F0] py-3.5 px-6 text-xs text-[#475569] font-medium flex justify-between items-center">
                  <span>Showing {filteredApplicants.length} of {totalCount} applications</span>
                  <span>Double-click a row to log notes and view complete profile details</span>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* Slide-out / Pop-up detailed applicant view modal */}
      {selectedApplicant && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedApplicant(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0D4EA3] to-[#062F68] px-6 py-5 text-white flex justify-between items-center">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Applicant Portfolio</span>
                <h3 className="text-xl font-heading font-bold">{selectedApplicant.studentName}</h3>
              </div>
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="text-white/80 hover:text-white text-2xl font-bold p-1 leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-[#E2E8F0]">
                <div>
                  <span className="text-xs text-[#475569] font-semibold block">Applying Class</span>
                  <span className="font-semibold text-slate-800">{selectedApplicant.applyingClass}th Class</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] font-semibold block">Application Status</span>
                  <span className={`inline-flex items-center gap-1 mt-0.5 text-xs font-bold ${
                    selectedApplicant.status === 'Approved' ? 'text-emerald-700' :
                    selectedApplicant.status === 'Rejected' ? 'text-rose-700' :
                    'text-amber-700'
                  }`}>
                    {selectedApplicant.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] font-semibold block">Parent / Guardian</span>
                  <span className="font-semibold text-slate-800">{selectedApplicant.guardianName}</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] font-semibold block">Contact Number</span>
                  <span className="font-semibold text-slate-800">{selectedApplicant.contactPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-[#475569] font-semibold block">Previous School & Curriculum</span>
                  <span className="font-semibold text-slate-800 block leading-tight">{selectedApplicant.previousSchool}</span>
                </div>
              </div>

              {/* Student Personal Notes */}
              <div>
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1.5">Candidate Statement / Notes</h4>
                <div className="bg-slate-50 border border-[#E2E8F0] p-4 rounded-xl text-sm text-[#475569] italic whitespace-pre-line min-h-[60px]">
                  {selectedApplicant.additionalNotes || 'No additional statement provided by the candidate.'}
                </div>
              </div>

              {/* Status Action Buttons inside details */}
              <div className="border-t border-[#E2E8F0] pt-4">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-3">Admission Decision Action</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'Approved')}
                    className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all duration-150 ${
                      selectedApplicant.status === 'Approved'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    ✓ Approve Admission
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'Rejected')}
                    className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all duration-150 ${
                      selectedApplicant.status === 'Rejected'
                        ? 'bg-rose-600 text-white border-rose-600 shadow'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                    }`}
                  >
                    ✗ Decline Admission
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'Pending')}
                    className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all duration-150 ${
                      selectedApplicant.status === 'Pending'
                        ? 'bg-amber-500 text-white border-amber-500 shadow'
                        : 'bg-slate-100 hover:bg-slate-200 text-[#475569] border-[#CBD5E1]'
                    }`}
                  >
                    Reset to Pending
                  </button>
                </div>
              </div>

              {/* Admin Notes / Communication Log */}
              <div className="border-t border-[#E2E8F0] pt-4">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1.5">Admin Review Notes (Kuttippala Office Log)</h4>
                <textarea
                  className="w-full p-3 text-sm bg-slate-50 border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#0D4EA3] focus:bg-white text-slate-800 transition-colors"
                  rows={4}
                  placeholder="Log applicant test scores, interview feedback, or phone conversation summaries here..."
                  value={tempAdminNotes}
                  onChange={(e) => setTempAdminNotes(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-[#94A3B8]">Notes are stored in persistent file logs.</span>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isUpdatingNotes}
                    className="text-xs md:text-sm bg-[#0D4EA3] hover:bg-[#062F68] text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isUpdatingNotes ? 'Saving Notes...' : 'Save Office Log'}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
              <button
                onClick={() => handleDeleteApplicant(selectedApplicant.id)}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Record
              </button>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="bg-white hover:bg-slate-100 text-[#475569] border border-[#CBD5E1] font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
