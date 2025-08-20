"use client";

import { useState } from 'react';
import { FiPlus, FiCheckCircle } from 'react-icons/fi';

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'Update onboarding checklist', due: '2025-08-15', status: 'In Progress' },
    { id: 'TSK-102', title: 'Prepare weekly report', due: '2025-08-16', status: 'Pending' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([{ id: `TSK-${Math.floor(Math.random() * 1000)}`, title: newTask, due: 'TBD', status: 'Pending' }, ...tasks]);
    setNewTask('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">My Tasks</h1>
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task title"
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm"
          />
          <button onClick={addTask} className="px-3 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2">
            <FiPlus /> Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-neutral-800 dark:text-neutral-200">{t.title}</h2>
              <p className="text-xs text-neutral-500">Due {t.due}</p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              <FiCheckCircle /> {t.status}
            </span>
          </div>
        ))}
        {tasks.length === 0 && <div className="text-sm text-neutral-500">No tasks yet.</div>}
      </div>
    </div>
  );
}


