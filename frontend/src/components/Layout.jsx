/**
 * Layout.jsx
 * -----------
 * Main layout component for the Enterprise Work Management (EWM) platform.
 * Handles:
 *  - Sidebar navigation with role-based links
 *  - Header with notifications, theme toggle, user info, and logout
 *  - Responsive sidebar collapse/expand
 *  - Dark/light theme persistence
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';
import { logout } from '../store/slices/authSlice';

/**
 * Layout Component
 * ----------------
 * Wraps application pages with a sidebar and header.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content of the page to render inside the layout
 */
export default function Layout({ children }) {
  const [open, setOpen] = useState(true); // Sidebar open/close state
  const { user, role } = useSelector(s => s.auth); // Redux auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Apply theme on mount
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 shadow-lg ${open ? 'w-64' : 'w-16'} transition-all`}>
        <div className="p-4 flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
          {open && <Link to="/" className="font-bold text-lg">EWM</Link>}
        </div>

        {/* Sidebar Navigation */}
        <nav className="px-2 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
            }
          >
            Projects
          </NavLink>

          {/* Role-based access: Users link hidden for Employee */}
          {role !== 'Employee' && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
              }
            >
              Users
            </NavLink>
          )}

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        <header className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold">Enterprise Work Management</div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <ThemeToggle />
            <div className="text-sm">{user?.name} ({role})</div>
            <button
              onClick={() => { dispatch(logout()); navigate('/login'); }}
              className="px-3 py-1 rounded-lg bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        {children}
      </main>
    </div>
  );
}
