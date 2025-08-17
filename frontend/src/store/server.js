import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * Mock Service Worker (MSW) Server
 *
 * This server intercepts network requests during tests or development
 * and responds with predefined handlers. This allows testing components
 * or features without relying on a real backend.
 *
 * Usage:
 *  - Start in test setup: beforeAll(() => server.listen())
 *  - Reset handlers after each test: afterEach(() => server.resetHandlers())
 *  - Stop after all tests: afterAll(() => server.close())
 */
export const server = setupServer(...handlers)
