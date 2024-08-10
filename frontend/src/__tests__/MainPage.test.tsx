import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import configureStore from 'redux-mock-store';
import MainPage from '../pages/mainPage/MainPage'; 
import * as useMediaQuery from '@mui/material/useMediaQuery';
import * as GetPosts from '@/src/features/Posts/Queries/GetPosts';
import * as useReload from '@/src/hooks/useReload.hook';


vi.mock('@mui/material/useMediaQuery');
vi.mock('@/src/features/Posts/Queries/GetPosts');
vi.mock('@/src/hooks/useReload.hook');
vi.mock('@/src/design-system/NewPost/NewPost', () => ({
  NewPost: () => <div data-testid="new-post">New Post Component</div>
}));
vi.mock('@/src/design-system/PostList/PostList', () => ({
  default: () => <div data-testid="post-list">Post List Component</div>
}));
vi.mock('@/src/design-system/SideBar/SideBar', () => ({
  SideBar: () => <div data-testid="sidebar">Sidebar Component</div>
}));
vi.mock('@/src/design-system/secondSideBar/SecondSideBar', () => ({
  SecondSideBar: () => <div data-testid="second-sidebar">Second Sidebar Component</div>
}));

const theme = createTheme();
const mockStore = configureStore([]);
const queryClient = new QueryClient();

describe('MainPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      posts: {
        posts: [],
      },
    });
    vi.mocked(useReload.useReload).mockReturnValue({ reloadKey: Math.random(), reloadPage: vi.fn() });
    vi.mocked(GetPosts.GetPosts).mockReturnValue({ error: null, isLoading: false });
  });

  const renderMainPage = (isMobile = false) => {
    vi.mocked(useMediaQuery.default).mockReturnValue(isMobile);
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <MainPage />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  it('renders main components', async () => {
    await act(async () => {
      renderMainPage();
    });
    expect(screen.getByText('Dla Ciebie')).toBeDefined();
    expect(screen.getByTestId('new-post')).toBeDefined();
    expect(screen.getByTestId('post-list')).toBeDefined();
  });

  it('renders sidebars on desktop view', async () => {
    await act(async () => {
      renderMainPage(false);
    });
    expect(screen.getAllByTestId('sidebar')).toHaveLength(1);
    expect(screen.getByTestId('second-sidebar')).toBeDefined();
  });

  it('renders mobile view correctly', async () => {
    await act(async () => {
      renderMainPage(true);
    });
    expect(screen.getAllByTestId('sidebar')).toHaveLength(1);
  });

  it('shows loading state', async () => {
    vi.mocked(GetPosts.GetPosts).mockReturnValue({ error: null, isLoading: true });
    await act(async () => {
      renderMainPage();
    });
    expect(screen.getByText('ładuje...')).toBeDefined();
    expect(screen.queryByTestId('post-list')).toBeNull();
  });
});