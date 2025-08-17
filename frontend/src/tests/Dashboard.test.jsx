/**
 * Dashboard.test.jsx
 * -------------------
 * Unit test for the Dashboard component using React Testing Library.
 * Verifies that key metrics are displayed after initializing fake data.
 *
 * Steps:
 * 1. Mock login by dispatching loginSuccess to Redux store.
 * 2. Initialize fake server data to populate projects and tasks.
 * 3. Render Dashboard within Redux Provider and React Router.
 * 4. Assert that "Total Projects" metric is rendered correctly.
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../store';
import Dashboard from '../features/dashboard/Dashboard';
import { loginSuccess } from '../store/slices/authSlice';
import { initFakeServer } from '../api/fakeServer';

describe('Dashboard Component', () => {

  beforeEach(() => {
    // Mock user login in Redux store
    store.dispatch(loginSuccess({
      token: 'demo-token',
      role: 'Admin',
      user: { name: 'Admin' }
    }));

    // Initialize demo data for projects and tasks
    initFakeServer(store.dispatch);
  });

  test('renders dashboard metrics', () => {
    // Render Dashboard component within Redux Provider and MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    // Check if the "Total Projects" metric is displayed
    expect(screen.getByText(/Total Projects/i)).toBeInTheDocument();

    // Optional: Additional assertions
    expect(screen.getByText(/Total Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});
