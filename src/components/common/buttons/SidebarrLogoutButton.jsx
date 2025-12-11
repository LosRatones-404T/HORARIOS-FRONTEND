import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SidebarLogoutButton({ collapsed }) {
  return (
    <Button
      startIcon={!collapsed ? <LogoutIcon /> : null}
      sx={{
        justifyContent: collapsed ? "center" : "flex-start",
        padding: "10px 14px",
      }}
    >
      {collapsed ? <LogoutIcon /> : "Cerrar sesión"}
    </Button>
  );
}
