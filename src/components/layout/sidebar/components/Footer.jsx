import { Box, Button, Typography } from "@mui/material";
import { LuLogOut } from "react-icons/lu";

export default function Footer({ collapsed }) {
  return (
    <Box
      sx={{
        mt: "auto",
        bgcolor: "primary.main",
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "rgba(255,255,255,0.35)",
        p: 0,
      }}
    >
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          color: "primary.contrastText",
          textTransform: "none",
          fontSize: "14px",
          justifyContent: "center",
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              whiteSpace: "nowrap",
              fontSize: "14px",
            }}
          >
            Cerrar sesión
          </Typography>
        )}
        <LuLogOut size={18} />
      </Button>
    </Box>
  );
}
