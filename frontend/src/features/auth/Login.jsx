/**
 * Login.jsx
 * ----------
 * Login page for Enterprise Work Management (EWM).
 * Features:
 *  - Form validation using react-hook-form + Yup
 *  - Role assignment based on email prefix
 *  - Dispatch login success to Redux
 *  - Redirect to dashboard on login
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validators';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize react-hook-form with Yup schema
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    // Assign role based on email prefix
    const role =
      data.email.startsWith('admin')
        ? 'Admin'
        : data.email.startsWith('meera')
        ? 'Manager'
        : 'Employee';

    // Dispatch login to Redux
    dispatch(
      loginSuccess({
        token: 'demo-jwt-token',
        role,
        user: { name: data.email.split('@')[0], email: data.email },
      })
    );

    // Redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="admin@acme.com"
            className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Sign in
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          No account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
