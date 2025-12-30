import { createTheme } from '@mui/material/styles';

// Tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4A83DD',
      light: '#A6C3FC',
      dark: '#3E4E6C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3E4E6C',
      light: '#41495B',
      dark: '#2A3344',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#7B318F',
      light: '#AF89B7',
      dark: '#5A2366',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#9F0208',
      light: '#D9010F',
      dark: '#7A0106',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F0F0F7',
      paper: '#FFFFFF',
      secondary: '#D3D4DB',
      tertiary: '#B8B8BF',
    },
    text: {
      primary: '#2A3344',
      secondary: '#3E4E6C',
      disabled: '#B8B8BF',
    },
    divider: '#D3D4DB',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2A3344',
    },
    body1: {
      fontSize: '1rem',
      color: '#2A3344',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#3E4E6C',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// Tema oscuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A6C3FC',
      light: '#C5DBFE',
      dark: '#4A83DD',
      contrastText: '#0A0E1A',
    },
    secondary: {
      main: '#41495B',
      light: '#565E70',
      dark: '#3E4E6C',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#AF89B7',
      light: '#C9A8CF',
      dark: '#7B318F',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D9010F',
      light: '#FF4D55',
      dark: '#9F0208',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0E1A',
      paper: '#1A1E2E',
      secondary: '#2A3344',
      tertiary: '#3E4E6C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D3D4DB',
      disabled: '#B8B8BF',
    },
    divider: '#3E4E6C',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#D3D4DB',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});
