import React from 'react';
import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme();

  return (
    <IconButton 
      onClick={toggleTheme} 
      sx={{ color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344' }}
    >
      {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
