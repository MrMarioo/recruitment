import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import App from '@/src/App';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
  };
});

// Mock the routes
vi.mock('@/src/app-routing.module', () => ({
  routes: [
    { path: '/', element: <div>Home Page</div> },
    { path: '/other', element: <div>Other Page</div> },
  ],
}));

const mockStore = configureStore([]);

describe('App Component', () => {
  let store;
  let queryClient;

  beforeEach(() => {
    store = mockStore({
    });
    queryClient = new QueryClient();
  });

  const renderApp = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    );

  it('renders without crashing', () => {
    const { container } = renderApp();
    expect(container).toBeTruthy();
  });

  it('renders routes', () => {
    renderApp();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('contains the main Box component', () => {
    const { container } = renderApp();
    const boxElement = container.querySelector('.center');
    expect(boxElement).toBeInTheDocument();
  });
});