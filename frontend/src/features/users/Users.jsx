/**
 * Users.jsx
 * ----------
 * User Management page for the Enterprise Work Management (EWM) app.
 * Features:
 *  - Add new users with role selection
 *  - Update existing user roles
 *  - Delete users
 *  - Clean and responsive layout
 *  - Dark mode support
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../../store/slices/usersSlice';

export default function Users() {
  // Get users state from Redux
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Local state for form inputs
  const [form, setForm] = useState({ name: '', email: '', role: 'Employee' });

  /**
   * Handles adding a new user
   */
  const handleAddUser = () => {
    if (!form.name || !form.email) {
      alert('Name and Email are required.');
      return;
    }
    dispatch(addUser(form));
    setForm({ name: '', email: '', role: 'Employee' }); // Reset form
  };

  /**
   * Handles toggling user role between Employee and Manager
   */
  const handleToggleRole = (user) => {
    const newRole = user.role === 'Employee' ? 'Manager' : 'Employee';
    dispatch(updateUser({ id: user.id, role: newRole }));
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>

      {/* Layout: Form on left, user list on right */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Add User Form */}
        <div className="md:col-span-1 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow space-y-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
          <button
            onClick={handleAddUser}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white w-full hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
        </div>

        {/* Users List */}
        <div className="md:col-span-2 grid gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow flex items-center justify-between"
            >
              {/* User Info */}
              <div>
                <div className="font-semibold">
                  {user.name} <span className="text-xs opacity-70">({user.role})</span>
                </div>
                <div className="text-sm opacity-70">{user.email}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleRole(user)}
                  className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
