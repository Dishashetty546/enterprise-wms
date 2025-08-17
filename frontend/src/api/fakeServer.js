/**
 * fakeServer.js
 * --------------
 * Simulates a fake backend server for demo purposes in the EWM platform.
 * Provides:
 *  - Seed demo project and task data
 *  - Simulated realtime notifications
 *  - Simple in-memory task movement helpers
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import { pushNotification } from '../store/slices/notificationsSlice'
import store from '../store'
import { setData, setTasks } from '../store/slices/projectsSlice'
import { v4 as uuid } from 'uuid'

let initialized = false

/**
 * Initialize the fake server with demo data and notifications.
 *
 * @param {Function} dispatch - Redux dispatch function to update state
 */
export function initFakeServer(dispatch) {
  if (initialized) return // Prevent multiple initializations
  initialized = true

  // Seed demo project and task data
  const projectId = 'p1'
  const demo = {
    projects: [
      {
        id: projectId,
        name: 'EWM Platform',
        owner: 'Manager Meera',
        status: 'Active',
        dueDate: Date.now() + 7 * 86400000, // +7 days
      },
    ],
    tasks: {
      [projectId]: {
        backlog: [
          {
            id: uuid(),
            title: 'Design login UI',
            type: 'Feature',
            priority: 'High',
            assignee: 'Eshaan',
          },
          {
            id: uuid(),
            title: 'Fix auth bug',
            type: 'Bug',
            priority: 'Medium',
            assignee: 'Meera',
          },
        ],
        inprogress: [
          {
            id: uuid(),
            title: 'Kanban DnD',
            type: 'Improvement',
            priority: 'Low',
            assignee: 'Eshaan',
          },
        ],
        done: [],
      },
    },
  }
  dispatch(setData(demo))

  // Simulate realtime notifications every 12 seconds
  setInterval(() => {
    const messages = [
      'New task assigned to you.',
      'Project deadline updated.',
      'Comment added on Task #123.',
      'Build passed on CI.',
    ]
    const m = messages[Math.floor(Math.random() * messages.length)]
    dispatch(pushNotification(m))
  }, 12000)
}

/**
 * Move a task between columns in a project.
 *
 * @param {string} projectId - ID of the project
 * @param {string} sourceCol - Column name of the source (backlog, inprogress, done)
 * @param {string} destCol - Column name of the destination
 * @param {number} sourceIndex - Index of the task in the source column
 * @param {number} destIndex - Index where the task should be inserted in destination
 */
export function moveTask(
  projectId,
  sourceCol,
  destCol,
  sourceIndex,
  destIndex,
) {
  const state = store.getState().projects

  // Deep-ish clone of tasks to avoid direct mutation
  const tasks = JSON.parse(JSON.stringify(state.tasks[projectId]))

  // Remove task from source column
  const [moved] = tasks[sourceCol].splice(sourceIndex, 1)

  // Insert task into destination column at the specified index
  tasks[destCol].splice(destIndex, 0, moved)

  // Update the Redux store
  store.dispatch(setTasks({ projectId, tasks }))
}
