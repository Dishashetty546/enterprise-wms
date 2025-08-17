/**
 * ProjectDetails.jsx
 * ------------------
 * Detailed view of a single project in the Enterprise Work Management (EWM) app.
 * Features:
 *  - Displays project name, owner, and status
 *  - Shows the project's tasks in a Kanban board
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KanbanBoard from '../../components/KanbanBoard';

export default function ProjectDetails() {
  // Extract project ID from the URL parameters
  const { id } = useParams();

  // Fetch the project details from Redux store
  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id === id)
  );

  // Fetch tasks for this project from Redux store
  const tasks = useSelector(
    (state) => state.projects.tasks[id] || { backlog: [], inprogress: [], done: [] }
  );

  return (
    <Layout>
      {/* Project Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{project?.name}</h2>
        <div className="text-sm opacity-70">
          Owner: {project?.owner} • Status: {project?.status}
        </div>
      </div>

      {/* Kanban Board for Project Tasks */}
      <KanbanBoard projectId={id} tasks={tasks} />
    </Layout>
  );
}
