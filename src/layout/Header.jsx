import { Close, Menu } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Link } from '@mui/material';


export function Header({ drawerOpen, setDrawerOpen, sx, ...props }) {
  return (
    <AppBar position="fixed"
      /* to clip the drawer under the app bar */
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}
      {...props}
    >
      <Toolbar variant="dense">
        <IconButton aria-label="toggle sidebar"
          size="large"
          color="inherit"
          edge="start"
          sx={{ marginRight: 2 }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ?
            <Close /> :
            <Menu />
          }
        </IconButton>
        <Link aria-label="home button"
          href="/"
          color="inherit"
          variant="h6"
          underline="none"
          sx={{ flexGrow: 1 }}
        >
          MD-React
        </Link>
      </Toolbar>
    </AppBar>
  );
}