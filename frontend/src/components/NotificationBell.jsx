/**
 * NotificationBell.jsx
 * --------------------
 * A notification bell component that shows unread count.
 * Clicking the bell opens a dropdown showing latest notifications.
 * Users can mark notifications as read by clicking them.
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.1
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markRead } from '../store/slices/notificationsSlice'; // Correct action

export default function NotificationBell() {
  const [open, setOpen] = useState(false); // Dropdown visibility
  const items = useSelector(state => state.notifications.items);
  const unreadCount = items.filter(i => !i.read).length;
  const dispatch = useDispatch();

  /**
   * Handles clicking a notification
   * Marks the notification as read
   */
  const handleNotificationClick = (id) => {
    dispatch(markRead(id)); // Correct action
    // Optional: add navigation or extra logic here
  };

  return (
    <div className="relative">
      {/* Bell icon */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative text-2xl focus:outline-none"
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
          <div className="p-2 font-semibold border-b border-gray-200 dark:border-gray-700">
            Notifications
          </div>
          <div className="max-h-60 overflow-y-auto">
            {items.length === 0 && (
              <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            )}
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => handleNotificationClick(item.id)}
                className={`w-full text-left px-3 py-2 border-b border-gray-100 dark:border-gray-700 ${
                  item.read ? 'bg-gray-50 dark:bg-gray-900' : 'bg-blue-50 dark:bg-blue-900'
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <div className="text-sm">{item.message}</div>
                <div className="text-xs text-gray-400 dark:text-gray-300">
                  {new Date(item.time).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
