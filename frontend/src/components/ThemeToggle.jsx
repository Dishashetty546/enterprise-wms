/**
 * ThemeToggle.jsx
 * ----------------
 * A button component to toggle between light and dark themes.
 * Persists the selected theme in localStorage and applies it globally.
 *
 * Features:
 *  - Toggles between light 🌞 and dark 🌙 themes
 *  - Persists theme choice across page reloads
 *  - Automatically applies theme on mount
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme to document root and save to localStorage whenever it changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggle the theme between 'light' and 'dark'
   */
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-lg border focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
}
