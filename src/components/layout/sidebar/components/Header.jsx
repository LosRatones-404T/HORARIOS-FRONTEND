import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../../../assets/logo-unsis.png";

export default function Header({ collapsed }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: collapsed ? { xs: '12px 8px', sm: '16px 12px' } : { xs: '16px', sm: '20px' },
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: collapsed ? "column" : "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 1 : { xs: 1.5, sm: 2 },
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.15)",
          p: collapsed ? { xs: 0.75, sm: 1 } : { xs: 1.25, sm: 1.75 },
          borderRadius: 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: 'blur(8px)',
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
