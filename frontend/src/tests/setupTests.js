import 'whatwg-fetch' // fetch polyfill
import { TextEncoder, TextDecoder } from 'util'
import { server } from '../mocks/server.js' // MSW server
// setupTests.js
import '@testing-library/jest-dom'

// Node global polyfills
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

// Mock ResizeObserver (for Recharts ResponsiveContainer)
class ResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver

// Start MSW server
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
