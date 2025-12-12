import React from "react";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { FaBars, FaBell, FaUser, FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        background: "linear-gradient(to right, white 0%, white 20%, #4A83DD 20%, #4A83DD 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        boxShadow: 1,
        zIndex: 1000,
      }}
    >
      {/* ---- IZQUIERDA: Ícono Menú + Buscador ---- */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: { xs: 1, sm: 2, md: 3 },
        marginLeft: { xs: 0, sm: "50px", md: "200px", lg: "400px" },
        flex: 1,
      }}>
        {/* Ícono del menú */}
        <IconButton sx={{ color: "white" }}>
          <FaBars size={24} />
        </IconButton>
        
        {/* Buscador */}
        <Paper
          elevation={0}
          sx={{
            width: { xs: "150px", sm: "250px", md: "350px", lg: "400px" },
            height: 40,
            bgcolor: "#DFBCE2",
            borderRadius: "10px",
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSearch size={16} color="white" />
          <InputBase
            placeholder="Buscar…"
            sx={{
              ml: 1,
              flex: 1,
              color: "white",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&::placeholder": {
                color: "white",
                opacity: 0.8,
              },
            }}
          />
        </Paper>
      </Box>

      {/* ---- DERECHA: Toggle + Notificación + Usuario ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          mr: { xs: 1, sm: 3, md: 6 },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <ThemeToggle />
        </Box>
        
        <IconButton sx={{ color: "white" }}>
          <FaBell size={20} />
        </IconButton>
        
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "#DFBCE2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FaUser color="white" />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;