import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SideBar } from '@/src/design-system/SideBar/SideBar';
import { SecondSideBar } from '@/src/design-system/secondSideBar/SecondSideBar';
import { GetPosts } from '@/src/features/Posts/Queries/GetPosts';
import { useReload } from '@/src/hooks/useReload.hook';
import { selectPosts } from '@/src/redux/selectors/newPost.selectors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Avatar, Typography, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  justifyContent: 'center',
}));

const MainContent = styled('div')({
  display: 'flex',
  maxWidth: '1200px',
  width: '100%',
});

const Feed = styled('div')(({ theme }) => ({
  flex: 1,
  maxWidth: '600px',
  width: '100%',
  borderLeft: '1px solid #e6ecf0',
  borderRight: '1px solid #e6ecf0',
  overflowY: 'auto',
}));

const SidebarWrapper = styled('div')(({ theme }) => ({
  width: '250px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SecondSidebarWrapper = styled('div')(({ theme }) => ({
  width: '350px',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const Header = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 15px',
}));

const ProfileInfo = styled('div')({
  padding: '16px',
  borderBottom: '1px solid #e6ecf0',
});

const ProfileAvatar = styled(Avatar)({
  width: '134px',
  height: '134px',
  marginBottom: '16px',
});

const BackButtonLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
});

export const AccountPage = () => {
  const { reloadKey, reloadPage } = useReload();
  const { error, isLoading } = GetPosts(reloadKey);
  const data = useSelector(selectPosts);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Wrapper>
      <MainContent>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>
        <Feed>
          <Header>
            <BackButtonLink to="/">
              <IconButton aria-label="Powrót" color="inherit">
                <ArrowBackIcon />
              </IconButton>
            </BackButtonLink>
            <div>
              <Typography variant="h6">Mario</Typography>
              <Typography variant="body2" color="textSecondary">
                {data.length} wpis
              </Typography>
            </div>
          </Header>
          <ProfileInfo>
            <ProfileAvatar />
            <Typography variant="h6">Mario</Typography>
            <Typography variant="body2" color="textSecondary">
              @Marioo
            </Typography>
          </ProfileInfo>
          {/* Tu możesz dodać listę postów użytkownika */}
        </Feed>
        <SecondSidebarWrapper>
          <SecondSideBar />
        </SecondSidebarWrapper>
      </MainContent>
      {isMobile && <SideBar />}
    </Wrapper>
  );
};
