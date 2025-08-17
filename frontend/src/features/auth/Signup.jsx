/**
 * Signup.jsx
 * -----------
 * Signup page for Enterprise Work Management (EWM) application.
 * Features:
 *  - Collects user name, email, and password
 *  - Uses react-hook-form for form state management
 *  - Navigates to login page after successful signup
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  /**
   * Handles form submission
   * Currently, it simply navigates to the login page.
   * Can be extended to integrate with backend API for real signup.
   */
  const onSubmit = () => {
    navigate('/login');
  };

  return (
    /**
     * Return JSX:
     * - Full height container, centered
     * - Form with rounded corners, shadow, and dark mode support
     * - Inputs for Name, Email, Password
     * - Submit button
     * - Link to login page for existing users
     */
    <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-96 space-y-4"
      >
        {/* Form Heading */}
        <h1 className="text-2xl font-semibold text-center">Sign up</h1>

        {/* Name Input */}
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email Input */}
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password Input */}
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Create account
        </button>

        {/* Login Link for existing users */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
