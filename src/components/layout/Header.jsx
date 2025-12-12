import React from "react";
import { Box, IconButton, Typography, InputBase, Paper } from "@mui/material";
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
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        px: 3,
        boxShadow: 1,
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {/* ---- IZQUIERDA: Logo + Nombre ---- */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img src="/logo.png" alt="logo" style={{ width: 55, height: 55 }} />

        {/* Textos centrados */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", lineHeight: 1 }}
          >
            SIPLEX
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "white", opacity: 0.9, fontSize: "0.75rem" }}
          >
            Sistema de Planificación de Exámenes
          </Typography>
        </Box>

        <IconButton sx={{ color: "white", ml: 2 }}>
          <FaBars size={22} />
        </IconButton>
      </Box>

      {/* ---- CENTRO: BUSCADOR ---- */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          ml: 5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 230,
            height: 45,
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
              "::placeholder": { color: "white", opacity: 0.8 },
            }}
          />
        </Paper>
      </Box>

      {/* ---- DERECHA ---- */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <ThemeToggle />

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
