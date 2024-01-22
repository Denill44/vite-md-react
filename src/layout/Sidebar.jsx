import { Toolbar, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';


export function Sidebar({ drawerWidth, isSmallScreen, drawerOpen, ...props }) {
  return (
    <Drawer aria-label="sidebar"
      open={drawerOpen}
      variant={isSmallScreen ? "temporary" : "persistent"}
      {...props}
    >
      <Toolbar />
      <div style={{ overflow: 'auto', width: drawerWidth }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/titles">
              <ListItemText primary="Titles" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}