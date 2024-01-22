import { Toolbar, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { Header, Sidebar, Main } from '.'
import { Outlet } from 'react-router-dom';


export function Layout() {
  const drawerWidth = "180px";
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(() => !isSmallScreen);
  useEffect(() => setDrawerOpen(!isSmallScreen), [isSmallScreen]);

  return (
    <>
      <Header {... { drawerOpen, setDrawerOpen }} />
      <Sidebar {... { drawerWidth, drawerOpen, isSmallScreen }} />
      <Main {... { drawerWidth, drawerOpen }}>
        {/* toolbar necessary for content to be below header */}
        <Toolbar variant="dense" />
        <Outlet />
      </Main>
    </>
  );
}