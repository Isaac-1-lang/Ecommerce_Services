"use client";

import { useState } from 'react';

export default function EmployeeAnnouncementsPage() {
  const [search, setSearch] = useState('');

  const announcements = [
    { id: 'AN-001', title: 'Quarterly Town Hall', date: '2025-08-10', summary: 'Join us for company updates and Q&A.' },
    { id: 'AN-002', title: 'Office Maintenance Schedule', date: '2025-08-12', summary: 'Planned maintenance on Level 3.' },
  ].filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Announcements</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search announcements..."
          className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm"
        />
      </div>

      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800 dark:text-neutral-200">{a.title}</h2>
              <span className="text-xs text-neutral-500">{a.date}</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{a.summary}</p>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="text-sm text-neutral-500">No announcements found.</div>
        )}
      </div>
    </div>
  );
}


