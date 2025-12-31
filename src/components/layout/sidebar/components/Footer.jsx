import { Box, Button, Typography, useTheme } from "@mui/material";
import { LuLogOut } from "react-icons/lu";

export default function Footer({ collapsed }) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        mt: "auto",
        bgcolor: "primary.main",
        height: { xs: "70px", sm: "80px", md: "90px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "divider",
        p: 0,
      }}
    >
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
          color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
          textTransform: "none",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          justifyContent: "center",
          p: { xs: 1, sm: 1.5 },
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              whiteSpace: "nowrap",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: 'inherit',
            }}
          >
            Cerrar sesión
          </Typography>
        )}
        <LuLogOut size={collapsed ? 16 : 18} />
      </Button>
    </Box>
  );
}
