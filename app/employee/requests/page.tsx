"use client";

import { useState } from 'react';

type RequestType = 'leave' | 'helpdesk' | 'feedback';

export default function EmployeeRequestsPage() {
  const [type, setType] = useState<RequestType>('leave');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!subject.trim() || !details.trim()) return;
    // Here we would call backend API to submit the request
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setSubject('');
    setDetails('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Requests</h1>

      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={type} onChange={(e) => setType(e.target.value as RequestType)} className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm">
            <option value="leave">Leave Request</option>
            <option value="helpdesk">Helpdesk Ticket</option>
            <option value="feedback">Feedback</option>
          </select>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm" />
        </div>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details" rows={5} className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm" />
        <button onClick={submit} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Submit</button>
        {submitted && <div className="text-sm text-success-600">Request submitted successfully.</div>}
      </div>
    </div>
  );
}


