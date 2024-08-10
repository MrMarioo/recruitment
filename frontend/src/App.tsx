import { FC } from 'react';
import { Provider } from 'react-redux';

import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './redux/store/newPost.store';

import TwitterLikeFeed from './pages/mainPage/MainPage';
import './styles/main.scss';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import { routes } from './app-routing.module';

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Box className="center">
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            </Routes>
          </BrowserRouter>
        </Box>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
