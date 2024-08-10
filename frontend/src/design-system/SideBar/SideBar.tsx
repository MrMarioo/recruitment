import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Person, Search, Mail, Group } from '@mui/icons-material';
import { Button, IconButton, Drawer, Divider, Typography, useTheme, useMediaQuery, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import BasicModal from '@/src/components/modals/BasicModal.modal';
import { NewPost } from '../NewPost/NewPost';

const Sidebar = styled('div')({
  width: '250px',
  borderRight: '1px solid #e6ecf0',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const SidebarOption = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: '#e8f5fe',
    borderRadius: '30px',
    color: '#50b7f5',
  },
}));

const SidebarOptionText = styled(Typography)({
  display: 'inline-block',
  marginLeft: '16px',
});

const MobileBottomNav = styled(Paper)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

export const SideBar: React.FC = () => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const activeModal = () => {
    setShow(true);
  };

  return (
    <>
      {isMobile ? (
        <MobileBottomNav elevation={3} style={{zIndex: 5}}>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/" />
            <BottomNavigationAction label="Profile" icon={<Person />} component={Link} to="/account" />
          </BottomNavigation>
        </MobileBottomNav>
      ) : (
        <Sidebar>
          {show && (
            <BasicModal setShow={setShow} show={show}>
              <NewPost />
            </BasicModal>
          )}
          <SidebarOption to="/">
            <Home sx={{ marginRight: 2 }} />
            <SidebarOptionText>Główna</SidebarOptionText>
          </SidebarOption>
          <SidebarOption to="/account">
            <Person sx={{ marginRight: 2 }} />
            <SidebarOptionText>Profil</SidebarOptionText>
          </SidebarOption>
          <Button
            variant="contained"
            color="primary"
            style={{width: "75%"}}
            sx={{ marginTop: 2 }}
            onClick={activeModal}
          >
            Opublikuj wpis
          </Button>
        </Sidebar>
      )}
    </>
  );
};