import { createSlice, nanoid } from '@reduxjs/toolkit'

/**
 * Users Slice
 *
 * This slice manages the list of users in the system.
 * Each user object contains:
 *  - id: Unique identifier
 *  - name: Full name of the user
 *  - email: User's email
 *  - role: Role of the user (Admin, Manager, Employee)
 *  - status: 'active' or 'inactive'
 *  - lastActivity: Timestamp of last activity
 */

const initialState = {
  users: [
    {
      id: '1',
      name: 'Admin User',
      role: 'Admin',
      email: 'admin@acme.com',
      status: 'active',
      lastActivity: Date.now(),
    },
    {
      id: '2',
      name: 'Manager Meera',
      role: 'Manager',
      email: 'meera@acme.com',
      status: 'active',
      lastActivity: Date.now(),
    },
    {
      id: '3',
      name: 'Employee Eshaan',
      role: 'Employee',
      email: 'eshaan@acme.com',
      status: 'inactive',
      lastActivity: Date.now() - 86400000,
    },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Adds a new user to the state.
     *
     *
     *
     * The prepare callback generates a unique ID and sets the current timestamp for lastActivity.
     */
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload)
      },
      prepare(user) {
        return {
          payload: {
            ...user,
            id: nanoid(), // Unique identifier
            lastActivity: Date.now(), // Timestamp of creation
          },
        }
      },
    },

    /**
     * Updates an existing user's information.
     *
     * @param {Object} state - Current state
     * @param {Object} action - Action containing the updated user fields
     *
     * Only fields provided in the payload will be updated; other fields remain unchanged.
     */
    updateUser(state, action) {
      const idx = state.users.findIndex((u) => u.id === action.payload.id)
      if (idx >= 0) {
        state.users[idx] = { ...state.users[idx], ...action.payload }
      }
    },

    /**
     * Deletes a user by ID.
     *
     * @param {Object} state - Current state
     * @param {Object} action - Action containing the ID of the user to delete
     */
    deleteUser(state, action) {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
  },
})

// Export actions for use in components
export const { addUser, updateUser, deleteUser } = usersSlice.actions

// Export reducer to integrate into Redux store
export default usersSlice.reducer
