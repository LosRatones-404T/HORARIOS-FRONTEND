import { Box, Button } from "@mui/material";
import { IoLogOut } from "react-icons/io5";

export default function Footer({ collapsed }) {
  return (
    <Box sx={{ mt: "auto", p: 2 }}>
      <Button
        startIcon={!collapsed ? <IoLogOut /> : null}
        sx={{
          justifyContent: collapsed ? "center" : "flex-start",
          padding: "10px 14px",
          width: "100%",
        }}
      >
        {collapsed ? <IoLogOut /> : "Cerrar sesión"}
      </Button>
    </Box>
  );
}
