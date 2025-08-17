// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/authSlice'
import projectsReducer from '../store/slices/projectsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
  // Optional: add middleware if needed
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // enable Redux DevTools in dev
})

export default store
