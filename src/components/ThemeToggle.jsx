import React from 'react';
import { IconButton } from '@mui/material';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
