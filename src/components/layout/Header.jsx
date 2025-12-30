import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Paper } from "@mui/material";
import { FaBars, FaBell, FaUser, FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "70px",
        bgcolor: "primary.main",
        boxShadow: 2,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: { xs: 1, sm: 1.5, md: 2 },
          pr: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        {/* ---- IZQUIERDA: Ícono Menú + Buscador ---- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5, md: 2 },
            flex: "0 1 auto",
            minWidth: 0,
          }}
        >
          {/* Ícono del menú */}
          <IconButton
            sx={{
              color: "primary.contrastText",
              flexShrink: 0,
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
              bgcolor: "tertiary.light",
              borderRadius: theme.shape.borderRadius / 6,
              px: 2,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              flexShrink: 1,
            }}
          >
            <Box sx={{ color: "tertiary.contrastText", display: "flex", alignItems: "center" }}>
              <FaSearch size={16} />
            </Box>
            <InputBase
              placeholder="Buscar…"
              sx={{
                ml: 1.5,
                flex: 1,
                color: "tertiary.contrastText",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "& .MuiInputBase-input::placeholder": {
                  color: "tertiary.contrastText",
                  opacity: 0.9,
                },
              }}
              inputProps={{ "aria-label": "Buscar" }}
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
            pr: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ThemeToggle />
          </Box>

          <IconButton
            sx={{
              color: "primary.contrastText",
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
              bgcolor: "tertiary.light",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              flexShrink: 0,
              color: "tertiary.contrastText",
            }}
            role="button"
            aria-label="Perfil de usuario"
            tabIndex={0}
          >
            <FaUser size={18} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
