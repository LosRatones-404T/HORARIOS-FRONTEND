import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

export default function Footer({ collapsed }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar lógica adicional de cierre de sesión
    // Por ejemplo: limpiar tokens, estado global, etc.
    navigate('/login');
  };
  
  return (
    <Box
      sx={{
        mt: "auto",
        bgcolor: "primary.main",
        height: { xs: "72px", sm: "80px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        p: 2,
      }}
    >
      <Button
        onClick={handleLogout}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
          color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
          textTransform: "none",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          justifyContent: "center",
          px: 3,
          py: 1.5,
          borderRadius: 2,
          transition: theme.transitions.create(['background-color', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
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
