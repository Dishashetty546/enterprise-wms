/**
 * Settings.jsx
 * -------------
 * User settings page for the Enterprise Work Management (EWM) app.
 * Features:
 *  - Update user profile information (name, email, password)
 *  - Clean and responsive layout
 *  - Dark mode support
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React, { useState } from 'react';
import Layout from '../../components/Layout';

export default function Settings() {
  // Local state to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles saving profile changes
   * Here you can integrate with Redux or API to persist changes
   */
  const handleSave = () => {
    // Example: Log to console
    console.log('Saved profile:', { name, email, password });
    // TODO: Dispatch Redux action or call API endpoint to update user data
  };

  return (
    <Layout>
      <div className="max-w-xl space-y-3">
        {/* Page header */}
        <h2 className="text-xl font-semibold">Settings</h2>

        {/* Profile form card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow">
          <div className="font-medium mb-2">Profile</div>

          {/* Form inputs */}
          <div className="grid md:grid-cols-2 gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Change password"
            />
          </div>

          {/* Save button */}
          <div className="mt-3">
            <button
              onClick={handleSave}
              className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
