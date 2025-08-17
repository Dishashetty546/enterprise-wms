import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { initFakeServer } from './api/fakeServer';

/**
 * Root application component.
 * Initializes the fake server (demo backend) and renders the app routes.
 * Includes a ToastContainer for notifications.
 */
export default function App() {
  const dispatch = useDispatch();

  // Initialize the fake backend server once when the app mounts
  useEffect(() => {
    initFakeServer(dispatch);
  }, [dispatch]);

  return (
    <>
      {/* Render all application routes */}
      <AppRoutes />

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}        // Close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={true}      // Show newest notifications on top
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
