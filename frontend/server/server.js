/**
 * server.js
 * ----------
 * Entry point for the EWM Realtime Server.
 * Implements Express.js REST API and Socket.IO for realtime notifications.
 *
 * Author: Disha
 * Date: 2025-08-16
 * Version: 1.0
 */

import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { PORT } from './config.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

/**
 * Create HTTP server and attach Socket.IO
 */
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }, // Allow all origins for demo purposes
})

/**
 * Socket.IO connection handler
 *
 * @param {Socket} socket - The connected client socket
 */
io.on('connection', (socket) => {
  console.log('Client connected: ' + socket.id)

  // Send welcome message on connection
  socket.emit('notification', { message: 'Welcome to EWM realtime!' })
})

/**
 * Health check endpoint
 */
app.get('/health', (_, res) => {
  res.json({ ok: true })
})

/**
 * Start server
 */
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
