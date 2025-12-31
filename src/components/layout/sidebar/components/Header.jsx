import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../../../assets/logo-unsis.png";

export default function Header({ collapsed }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: collapsed ? { xs: '8px 4px', sm: '10px 6px' } : { xs: '12px', sm: '14px' },
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: collapsed ? "column" : "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0.75 : { xs: 1, sm: 1.5 },
        boxShadow: 1,
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          bgcolor: "primary.light",
          p: collapsed ? { xs: 0.5, sm: 0.75 } : { xs: 1, sm: 1.5 },
          borderRadius: collapsed ? theme.shape.borderRadius / 1.2 : theme.shape.borderRadius / 0.75,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="SIPLEX Logo"
          style={{
            width: collapsed ? "36px" : "64px",
            display: "block",
          }}
        />
      </Box>

      {/* TEXTO */}
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
            lineHeight: 1.1,
          }}
        >
          {/* SIPLEX */}
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              fontFamily: theme.typography.fontFamily,
              px: 1,
              letterSpacing: "1px",
              mb: 0.25,
              display: "flex",
              justifyContent: "center",
              color: 'inherit',
            }}
          >
            SIPLEX
          </Typography>

          {/* SUBTÍTULO */}
          <Typography
            variant="caption"
            sx={{
              fontSize: "11.5px",
              fontFamily: theme.typography.fontFamily,
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontWeight: 350,
              opacity: 0.94,
              color: 'inherit',
            }}
          >
            Sistema de Planificación de Exámenes
          </Typography>
        </Box>
      )}
    </Box>
  );
}
