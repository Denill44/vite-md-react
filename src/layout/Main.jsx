import { Box } from "@mui/material";


export function Main({ drawerWidth, drawerOpen, sx, ...props }) {
  return (
    <Box sx={theme => ({
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(drawerOpen && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerOpen && drawerWidth
      },
      ...sx
    })}
      {...props}
    >
      <Box sx={{
        maxWidth: 1500,
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {props.children}
      </Box>
    </Box>
  )
}