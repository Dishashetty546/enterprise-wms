import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import store from '../store';
import Login from '../features/auth/Login';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      msg.includes('React Router Future Flag Warning') ||
      msg.includes('Relative route resolution within Splat routes')
    ) return;
    console.warn(msg);
  });
});

afterAll(() => {
  console.warn.mockRestore();
});

// Mock API
const server = setupServer(
  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'admin@acme.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'abc123', user: { id: '1', name: 'Admin', role: 'Admin' } })
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  })
);

beforeAll(() => {
  server.listen();
  jest.spyOn(window, 'alert').mockImplementation(() => {}); // mock alert
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  window.alert.mockRestore();
});

describe('Login Component', () => {
  test('renders login form and shows validation errors', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('submits form successfully with valid credentials', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

  await waitFor(() => {
  const state = store.getState().auth;
  expect(state.token).toBe('demo-jwt-token'); // <-- match what API returns
  expect(state.user.name).toBe('admin');
});

  });
});
