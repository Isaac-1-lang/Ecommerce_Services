"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in localStorage
    const darkMode = localStorage.getItem('admin-dark-mode') === 'true';
    setIsDark(darkMode);
    
    // Apply dark mode to body
    if (darkMode) {
      document.body.classList.add('admin-dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    // Save to localStorage
    localStorage.setItem('admin-dark-mode', newDarkMode.toString());
    
    // Apply to body
    if (newDarkMode) {
      document.body.classList.add('admin-dark-mode');
    } else {
      document.body.classList.remove('admin-dark-mode');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <FiSun className="h-5 w-5 text-yellow-500" />
      ) : (
        <FiMoon className="h-5 w-5 text-neutral-600" />
      )}
    </button>
  );
}
