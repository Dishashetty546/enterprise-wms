import { createSlice } from '@reduxjs/toolkit'

/**
 * Projects Slice
 *
 * Manages state related to projects and their tasks in the application.
 *
 * State Structure:
 *  - projects: Array of project objects ({ id, name, owner, status, dueDate, createdAt })
 *  - tasks: Object keyed by projectId containing tasks for each project
 *  - status: Optional string to track loading or idle state
 */

const initialState = {
  projects: [], // Stores all projects
  tasks: {}, // Tasks keyed by projectId
  status: 'idle', // Can track API request status if needed
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    /**
     * setData
     * Overwrites the entire projects state. Useful for initializing or resetting state.
     */
    setData(state, action) {
      return { ...state, ...action.payload }
    },

    /**
     * addProject
     * Adds a new project to the state.
     * Expects the full project object with id and createdAt already included.
     */
    addProject(state, action) {
      state.projects.push(action.payload)
    },

    /**
     * updateProject
     * Updates an existing project by ID.
     * Expects the full updated project object.
     */
    updateProject(state, action) {
      const idx = state.projects.findIndex((p) => p.id === action.payload.id)
      if (idx >= 0) state.projects[idx] = action.payload
    },

    /**
     * deleteProject
     * Removes a project and its associated tasks.
     * Expects the project ID as payload.
     */
    deleteProject(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
      delete state.tasks[action.payload] // Remove associated tasks
    },

    /**
     * setTasks
     * Sets or updates tasks for a specific project.
     * Expects an object: { projectId, tasks }
     */
    setTasks(state, action) {
      const { projectId, tasks } = action.payload
      state.tasks[projectId] = tasks
    },
  },
})

// Export actions for components to dispatch
export const { setData, addProject, updateProject, deleteProject, setTasks } =
  projectsSlice.actions

// Export reducer for store configuration
export default projectsSlice.reducer
