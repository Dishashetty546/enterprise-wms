/**
 * ProtectedRoute.jsx
 * ------------------
 * A higher-order route component to protect routes based on authentication
 * and role-based access control (RBAC).
 *
 * Features:
 *  - Redirects unauthenticated users to the login page
 *  - Redirects unauthorized roles to the home/dashboard
 *  - Supports multiple roles per route
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../utils/roles';

/**
 * ProtectedRoute Component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component(s) to render if access is allowed
 * @param {Array<string>} props.roles - Array of roles allowed to access this route
 */
export default function ProtectedRoute({ children, roles = [] }) {
  const { token, role } = useSelector(state => state.auth);

  // If user is not logged in, redirect to login page
  if (!token) return <Navigate to="/login" replace />;

  // If roles are specified and user's role is not allowed, redirect to home/dashboard
  if (roles.length && !roles.includes(role)) return <Navigate to="/" replace />;

  // User is authorized; render the child components
  return children;
}
