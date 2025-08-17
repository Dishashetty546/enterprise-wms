/**
 * notificationsSlice.js
 * ---------------------
 * Redux slice to manage notifications in the Enterprise Work Management (EWM) platform.
 * Features:
 *  - Push new notifications
 *  - Mark notifications as read
 *  - Clear all notifications
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import { createSlice, nanoid } from '@reduxjs/toolkit'

/**
 * Initial state for notifications
 * items: Array of notification objects
 * Each notification:
 *  - id: unique identifier
 *  - message: notification text
 *  - time: timestamp
 *  - read: boolean
 */
const initialState = { items: [] }

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    /**
     * Push a new notification to the top of the list
     * Uses `prepare` to generate unique id, timestamp, and read status
     */
    pushNotification: {
      reducer(state, action) {
        state.items.unshift(action.payload) // add at the beginning
      },
      prepare(message) {
        return {
          payload: {
            id: nanoid(),
            message,
            time: Date.now(),
            read: false,
          },
        }
      },
    },

    /**
     * Mark a notification as read by its ID
     * @param {string} action.payload - notification id
     */
    markRead(state, action) {
      const note = state.items.find((n) => n.id === action.payload)
      if (note) note.read = true
    },

    /**
     * Clear all notifications
     */
    clearAll(state) {
      state.items = []
    },
  },
})

// Export actions for dispatching
export const { pushNotification, markRead, clearAll } =
  notificationsSlice.actions

// Export reducer to configure store
export default notificationsSlice.reducer
