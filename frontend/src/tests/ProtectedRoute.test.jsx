/**
 * ProtectedRoute.test.jsx
 * -----------------------
 * Unit test for the ProtectedRoute component.
 * Ensures that unauthenticated users are redirected to the login page.
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import store from '../store';
import ProtectedRoute from '../components/ProtectedRoute';

// Dummy component to simulate protected content
const Dummy = () => <div>Protected</div>;

describe('ProtectedRoute', () => {

  test('redirects unauthenticated users to /login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dummy /></ProtectedRoute>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Expect that unauthenticated users see the login page
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

});
