import React from "react";
import { Box, IconButton, InputBase, Paper, useTheme } from "@mui/material";
import { FaBars, FaBell, FaUser, FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
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
            color: "white",
            flexShrink: 0,
            p: 1.5,
          }}
          aria-label="Menú"
        >
          <FaBars size={20} />
        </IconButton>
        
        {/* Buscador */}
        <Paper
          elevation={0}
          sx={{
            width: { xs: "150px", sm: "250px", md: "350px", lg: "450px" },
            maxWidth: "100%",
            height: 42,
            bgcolor: theme.palette.accent?.main || "#DFBCE2",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            flexShrink: 1,
          }}
        >
          <FaSearch size={16} color="white" />
          <InputBase
            placeholder="Buscar…"
            sx={{
              ml: 1.5,
              flex: 1,
              color: "white",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&::placeholder": {
                color: "white",
                opacity: 0.9,
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
            color: "white",
            p: 1.5,
          }}
          aria-label="Notificaciones"
        >
          <FaBell size={20} />
        </IconButton>
        
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            bgcolor: theme.palette.accent?.main || "#DFBCE2",
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
          <FaUser color="white" size={18} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
