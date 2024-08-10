import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import { NewPost } from '@/src/design-system/NewPost/NewPost';
import PostList from '@/src/design-system/PostList/PostList';
import { SideBar } from '@/src/design-system/SideBar/SideBar';
import { SecondSideBar } from '@/src/design-system/secondSideBar/SecondSideBar';
import { GetPosts } from '@/src/features/Posts/Queries/GetPosts';
import { useReload } from '@/src/hooks/useReload.hook';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const MainContent = styled('div')({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
});

const Feed = styled('div')(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  maxWidth: '100%',
  paddingBottom: '56px', // Height of the bottom navigation
  [theme.breakpoints.up('md')]: {
    width: '600px',
    maxWidth: '600px',
    borderLeft: '1px solid #e6ecf0',
    borderRight: '1px solid #e6ecf0',
    paddingBottom: 0,
  },
}));

const SidebarWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    width: '350px',
    flexShrink: 0,
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
}));

const SecondSidebarWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '350px',
    flexShrink: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

const MainPage = () => {
  const { reloadKey, reloadPage } = useReload();
  const { error, isLoading } = GetPosts(reloadKey);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Wrapper key={reloadKey}>
      <MainContent>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>
        <Feed>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Dla Ciebie</Typography>
            </Toolbar>
          </AppBar>
          <NewPost />
          {isLoading ? <div>ładuje...</div> : <PostList />}
        </Feed>
        <SecondSidebarWrapper>
          <SecondSideBar />
        </SecondSidebarWrapper>
      </MainContent>
      {isMobile && <SideBar />}
    </Wrapper>
  );
};

export default MainPage;