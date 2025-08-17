/**
 * KanbanBoard.test.jsx
 * -------------------
 * Unit test for the KanbanBoard component.
 * Verifies that all expected columns render correctly.
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanBoard from '../components/KanbanBoard';

describe('KanbanBoard Component', () => {

  test('renders all columns correctly', () => {
    // Render KanbanBoard with empty task arrays
    render(
      <KanbanBoard 
        projectId="p1" 
        tasks={{ backlog: [], inprogress: [], done: [] }} 
      />
    );

    // Assert that each column title is visible
    expect(screen.getByText(/Backlog/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });

});
