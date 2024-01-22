import { createTheme } from "@mui/material";

export const theme = createTheme({
  // https://mui.com/components/use-media-query/#client-side-only-rendering
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
  palette: {
    primary: {
      main: '#607d8b'
    },
    secondary: {
      main: '#757575'
    },
    background: {
      paper: '#f0f1f2'
    }
  },
});