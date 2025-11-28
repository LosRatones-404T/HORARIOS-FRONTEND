// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B318F',
    },
    secondary: {
      main: '#6A2B7D',
    },
    // ...other colors
  },
  typography: {
    fontFamily: '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif',
    // ...other typography settings
  },
  // ...other theme settings
});

export default theme;