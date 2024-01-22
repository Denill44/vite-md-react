import { Toolbar, Drawer, List, ListItem, ListItemText, ListItemButton, Typography, Box } from '@mui/material';


export function Sidebar({ drawerWidth, isSmallScreen, drawerOpen, ...props }) {
  return (
    <Drawer aria-label="sidebar"
      open={drawerOpen}
      variant={isSmallScreen ? "temporary" : "persistent"}
      {...props}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', width: drawerWidth, height: "100%", display: "flex", flexDirection: "column" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/titles">
              <ListItemText primary="Titles" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
          <Typography>Powered by</Typography>
          <a href="https://api.mangadex.org/docs/">
            <Typography>Mangadex</Typography>
          </a>
        </Box>
      </Box>
    </Drawer>
  );
}