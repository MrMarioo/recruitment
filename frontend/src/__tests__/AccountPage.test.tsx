import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logRoles, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { AccountPage } from '../pages/account/AccountPage'; 

vi.mock('@/src/hooks/useReload.hook', () => ({
  useReload: () => ({ reloadKey: 1, reloadPage: vi.fn() }),
}));

vi.mock('@/src/features/Posts/Queries/GetPosts', () => ({
  GetPosts: () => ({ error: null, isLoading: false }),
}));

vi.mock('@/src/redux/selectors/newPost.selectors', () => ({
  selectPosts: () => [{ id: 1, content: 'Test post' }],
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...(actual as object),
    useMediaQuery: () => false,
  };
});

vi.mock('@/src/design-system/SideBar/SideBar', () => ({
  SideBar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('@/src/design-system/secondSideBar/SecondSideBar', () => ({
  SecondSideBar: () => <div data-testid="second-sidebar">Second Sidebar</div>,
}));

const mockStore = configureStore([]);

describe('AccountPage', () => {
  let store;
  let queryClient;
  beforeEach(() => {
    store = mockStore({
    });
    queryClient = new QueryClient();
  });

  const renderAccountPage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <AccountPage />
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>
    );

    it('renders the account page with correct user information', () => {
      renderAccountPage();
  
      const userHandle = screen.getByText('@Marioo', { exact: false });
      expect(userHandle).toBeInTheDocument();
  
      const postCount = screen.getByText('1 wpis', { exact: false });
      expect(postCount).toBeInTheDocument();
  });
  

  it('displays the back button', () => {
    renderAccountPage();
    
    const backLink = screen.getByRole('button', { name: /powrót/i });
    expect(backLink).toBeInTheDocument();

    const arrowBackIcon = backLink.querySelector('[data-testid="ArrowBackIcon"]');
    expect(arrowBackIcon).toBeInTheDocument();
  });

  it('renders SideBar and SecondSideBar on desktop', () => {
    renderAccountPage();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('second-sidebar')).toBeInTheDocument();
  });

  it('renders SideBar and SecondSideBar on desktop', () => {
    renderAccountPage();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('second-sidebar')).toBeInTheDocument();
  });
});