import { createSlice } from '@reduxjs/toolkit'

/**
 * Auth Slice
 *
 * This slice manages authentication state in the application, including:
 *  - token: JWT or demo token for authentication
 *  - role: Role of the logged-in user (Admin, Manager, Employee)
 *  - user: Object containing user details (name, email, etc.)
 *
 * Authentication state is persisted to `localStorage` so it survives page reloads.
 */

// LocalStorage keys
const tokenKey = 'ewm_token'
const roleKey = 'ewm_role'
const userKey = 'ewm_user'

// Initial state setup
const initialState = {
  token: localStorage.getItem(tokenKey),
  role: localStorage.getItem(roleKey) || 'Employee', // Default role
  user: JSON.parse(localStorage.getItem(userKey) || 'null'), // User details
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * loginSuccess
     *
     * Updates the auth state when a user successfully logs in.
     * Stores token, role, and user info both in Redux state and localStorage.
     *
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action payload containing { token, role, user }
     */
    loginSuccess(state, action) {
      const { token, role, user } = action.payload
      state.token = token
      state.role = role
      state.user = user

      // Persist to localStorage
      localStorage.setItem(tokenKey, token)
      localStorage.setItem(roleKey, role)
      localStorage.setItem(userKey, JSON.stringify(user))
    },

    /**
     * logout
     *
     * Clears the authentication state from Redux and localStorage.
     * Resets role to default ('Employee').
     *
     * @param {Object} state - Current Redux state
     */
    logout(state) {
      state.token = null
      state.role = 'Employee'
      state.user = null

      localStorage.removeItem(tokenKey)
      localStorage.removeItem(roleKey)
      localStorage.removeItem(userKey)
    },
  },
})

// Export actions for use in components
export const { loginSuccess, logout } = authSlice.actions

// Export reducer to include in Redux store
export default authSlice.reducer
