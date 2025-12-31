import { Box } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Header, Body, Footer } from "./components";

export default function Sidebar({ menu, visible = true }) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Box
      sx={{
        height: '100vh',
        width: { xs: '280px', sm: '340px', md: '380px' },
        transition: theme.transitions.create('width', {
          duration: theme.transitions.duration.standard,
        }),
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1100,
        flexShrink: 0,
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      {/* 🔹 HEADER */}
      <Header collapsed={false} />

      {/* 🔹 MENÚ */}
      <Body collapsed={false} options={menu} />

      {/* 🔹 FOOTER */}
      <Footer collapsed={false} />
    </Box>
  );
}
