/**
 * Dashboard.jsx
 * --------------
 * Main dashboard page for Enterprise Work Management (EWM).
 * Displays key metrics and charts for projects and tasks.
 *
 * Features:
 *  - Total projects and tasks overview
 *  - Completed vs pending tasks
 *  - Project status pie chart
 *  - Task breakdown bar chart
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import { ProjectStatusPie, TasksBar } from '../../components/Charts';

export default function Dashboard() {
  // Fetch projects from Redux store
  const projects = useSelector((state) => state.projects.projects);
  
  // Pick first project to display tasks (demo purposes)
  const demoProjectId = projects[0]?.id;
  const tasks = useSelector((state) => state.projects.tasks[demoProjectId] || {});

  // Metrics for the dashboard cards
  const metrics = [
    { label: 'Total Projects', value: projects.length },
    { 
      label: 'Total Tasks', 
      value: (tasks.backlog?.length || 0) + 
             (tasks.inprogress?.length || 0) + 
             (tasks.done?.length || 0) 
    },
    { label: 'Completed', value: tasks.done?.length || 0 },
    { 
      label: 'Pending', 
      value: (tasks.backlog?.length || 0) + (tasks.inprogress?.length || 0) 
    },
  ];

  return (
    <Layout>
      {/* Dashboard Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div 
            key={m.label} 
            className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow"
          >
            <div className="text-sm opacity-70">{m.label}</div>
            <div className="text-2xl font-semibold">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Project Status Pie Chart */}
        <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow">
          <div className="font-semibold mb-2">Project Status</div>
          <ProjectStatusPie projects={projects} />
        </div>

        {/* Task Breakdown Bar Chart */}
        <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow">
          <div className="font-semibold mb-2">Task Breakdown</div>
          <TasksBar tasks={tasks} />
        </div>
      </div>
    </Layout>
  );
}
