import React from "react";
import { Box, IconButton, InputBase, Paper, useTheme } from "@mui/material";
import { FaBars, FaBell, FaUser, FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

const Header = ({ sidebarWidth = '0px', onToggleSidebar, showSidebar = false }) => {
  const theme = useTheme();
  
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: sidebarWidth,
        right: 0,
        width: `calc(100% - ${sidebarWidth})`,
        transition: theme.transitions.create(['left', 'width'], {
          duration: theme.transitions.duration.standard,
        }),
        height: "70px",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: { xs: 1, sm: 1.5, md: 2 },
        pr: "2%",
        boxShadow: 2,
        zIndex: 1000,
        overflow: "visible",
      }}
    >
      {/* ---- IZQUIERDA: Ícono Menú + Buscador ---- */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: { xs: 1, sm: 1.5, md: 2 },
        flex: "0 1 auto",
        minWidth: 0,
      }}>
        {/* Ícono del menú */}
        <IconButton 
          sx={{ 
            color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
            flexShrink: 0,
            p: { xs: 1, sm: 1.5 },
            display: showSidebar ? 'flex' : 'none',
          }}
          aria-label="Menú"
          onClick={onToggleSidebar}
        >
          <FaBars size={18} />
        </IconButton>
        
        {/* Buscador */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '120px', sm: '200px', md: '300px', lg: '400px' },
            height: { xs: 38, sm: 42 },
            bgcolor: theme.palette.accent?.main || '#DFBCE2',
            borderRadius: theme.shape.borderRadius / 6,
            px: { xs: 1.5, sm: 2 },
            py: 0.5,
            display: "flex",
            alignItems: "center",
            flexShrink: 1,
          }}
        >
          <FaSearch size={14} style={{ color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344' }} />
          <InputBase
            placeholder="Buscar…"
            sx={{
              ml: { xs: 1, sm: 1.5 },
              flex: 1,
              color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
              fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
              "&::placeholder": {
                color: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(42,51,68,0.7)',
                opacity: 1,
              },
            }}
            inputProps={{ 'aria-label': 'Buscar' }}
          />
        </Paper>
      </Box>

      {/* ---- DERECHA: Toggle + Notificación + Usuario ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5, md: 2 },
          flex: "0 0 auto",
          ml: "auto",
          pr: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <ThemeToggle />
        </Box>
        
        <IconButton 
          sx={{ 
            color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
            p: { xs: 1, sm: 1.5 },
          }}
          aria-label="Notificaciones"
        >
          <FaBell size={18} />
        </IconButton>
        
        <Box
          sx={{
            width: { xs: 36, sm: 42 },
            height: { xs: 36, sm: 42 },
            borderRadius: "50%",
            bgcolor: theme.palette.accent?.main || '#DFBCE2',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
          role="button"
          aria-label="Perfil de usuario"
          tabIndex={0}
        >
          <FaUser color={theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344'} size={16} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
