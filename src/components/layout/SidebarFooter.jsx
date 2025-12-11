import { Box } from "@mui/material";
import SidebarLogoutButton from "../../common/buttons/SidebarLogoutButton";

export default function SidebarFooter({ collapsed }) {
  return (
    <Box sx={{ mt: "auto", p: 2 }}>
      <SidebarLogoutButton collapsed={collapsed} />
    </Box>
  );
}
