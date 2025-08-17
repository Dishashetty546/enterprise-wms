/**
 * Charts.jsx
 * -----------
 * React components for visualizing project and task data using Recharts.
 *
 * Components:
 *  - ProjectStatusPie: Shows a pie chart of project statuses (Active, On Hold, Completed)
 *  - TasksBar: Shows a bar chart of task counts per workflow stage (Backlog, In Progress, Done)
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

/**
 * ProjectStatusPie Component
 * --------------------------
 * Renders a pie chart representing the distribution of project statuses.
 *
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects with a `status` property
 */
export function ProjectStatusPie({ projects }) {
  // Aggregate count of projects by status
  const data = ['Active', 'On Hold', 'Completed'].map(status => ({
    name: status,
    value: projects.filter(p => p.status === status).length
  }));

  // Optional: Define colors for each slice
  const COLORS = ['#4ade80', '#facc15', '#60a5fa'];

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * TasksBar Component
 * ------------------
 * Renders a bar chart showing the number of tasks in each workflow stage.
 *
 * @param {Object} props
 * @param {Object} props.tasks - Object containing task arrays for 'backlog', 'inprogress', and 'done'
 */
export function TasksBar({ tasks }) {
  // Count tasks per stage
  const counts = {
    backlog: tasks.backlog?.length || 0,
    inprogress: tasks.inprogress?.length || 0,
    done: tasks.done?.length || 0,
  };

  // Prepare data for the bar chart
  const data = [
    { name: 'Backlog', count: counts.backlog },
    { name: 'In Progress', count: counts.inprogress },
    { name: 'Done', count: counts.done },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
