/**
 * AppRoutes.jsx
 * ----------------
 * Defines all the application routes and their access permissions.
 * Uses ProtectedRoute for authentication and role-based authorization.
 *
 * Routes:
 *  - /login           : Public login page
 *  - /signup          : Public signup page
 *  - /                : Dashboard (protected)
 *  - /projects        : Projects list (protected)
 *  - /projects/:id    : Project details with Kanban board (protected)
 *  - /users           : User management (protected, Admin/Manager only)
 *  - /settings        : User settings (protected)
 *  - *                : Redirect unknown routes to Dashboard
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Feature pages
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import Dashboard from '../features/dashboard/Dashboard';
import Projects from '../features/projects/Projects';
import ProjectDetails from '../features/projects/ProjectDetails';
import Users from '../features/users/Users';
import Settings from '../features/settings/Settings';

// Components
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../utils/roles';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute roles={[ROLES.Admin, ROLES.Manager]}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
