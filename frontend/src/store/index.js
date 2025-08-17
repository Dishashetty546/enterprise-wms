import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import projectsReducer from './slices/projectsSlice'
import usersReducer from './slices/usersSlice'
import notificationsReducer from './slices/notificationsSlice'

/**
 * Redux Store
 *
 * Combines all slice reducers to create the global store.
 * Each slice manages a specific domain of the application:
 *
 * - auth: User authentication, roles, and token management
 * - projects: Project data and tasks
 * - users: User management (add/update/delete)
 * - notifications: App notifications and unread count
 *
 * configureStore automatically sets up:
 *  - Redux DevTools integration
 *  - Middleware like Redux Thunk
 */

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})

export default store
