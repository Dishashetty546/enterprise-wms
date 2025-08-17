import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import projectsReducer from '../store/slices/projectsSlice';
import usersReducer from '../store/slices/usersSlice';
import notificationsReducer from '../store/slices/notificationsSlice';

import Projects from '../features/projects/Projects';
import ProtectedRoute from '../components/ProtectedRoute';
import ProjectDetails from '../features/projects/ProjectDetails';

describe('Admin full flow', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        projects: projectsReducer,
        users: usersReducer,
        notifications: notificationsReducer,
      },
      preloadedState: {
        auth: { user: { role: 'admin', email: 'admin@acme.com' }, token: 'mock-token' },
        projects: { projects: [{ id: '1', name: 'Existing Project', owner: 'Admin', status: 'Active' }] },
        users: { list: [] },
        notifications: { items: [] },
      },
    });
  });

  test('admin can view projects and create a new project', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/projects']}>
            <Routes>
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      );
    });

    // Ensure Projects page is rendered
    const projectsHeading = await screen.findByRole('heading', { name: /Projects/i });
    expect(projectsHeading).toBeInTheDocument();

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /New Project/i }));
    });

    // Fill form
    fireEvent.change(await screen.findByLabelText(/Project Name/i), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText(/Project Owner/i), { target: { value: 'Admin' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    // Check new project appears
    const newProject = await screen.findByText('Test Project');
    expect(newProject).toBeInTheDocument();
  });
});
