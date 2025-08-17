import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './store';
import './index.css';

/**
 * Root Entry Point
 *
 * This file bootstraps the React application.
 * It wraps the app with:
 *  - Redux Provider: to access the global state via Redux store.
 *  - BrowserRouter: to enable client-side routing with React Router.
 *  - React.StrictMode: to help detect potential problems in the app during development.
 *
 * Usage:
 *  - Renders <App /> into the HTML element with id="root".
 *  - Ensures all components have access to Redux store and routing context.
 */

// Select the root HTML element
const container = document.getElementById('root');

// Create React root
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
