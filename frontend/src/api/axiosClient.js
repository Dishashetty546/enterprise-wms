/**
 * api.js
 * -------
 * Axios instance configuration for making API calls.
 * Handles base URL setup and global response/error handling.
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import axios from 'axios'

/**
 * Create a pre-configured Axios instance.
 * - baseURL: All requests will use this as the base path.
 */
const instance = axios.create({
  baseURL: '/api', // Change this to your server URL if needed
})

/**
 * Global response interceptor
 *
 * @param {Object} r - Axios response object
 * @returns {Object} Response data if successful
 * @throws {Object|string} Error response data or message
 */
instance.interceptors.response.use(
  (r) => r, // Pass through successful response
  (err) => Promise.reject(err.response?.data || err.message), // Handle errors globally
)

export default instance
