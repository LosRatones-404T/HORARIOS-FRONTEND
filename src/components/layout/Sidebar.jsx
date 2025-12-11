import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarOptions from "./SidebarOptions";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar({ menu }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        width: collapsed ? "80px" : "240px",
        transition: "0.3s",
        bgcolor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
      }}
    >
     
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ alignSelf: collapsed ? "center" : "flex-end", m: 1 }}
      >
        <MenuIcon />
      </IconButton>

      <SidebarHeader collapsed={collapsed} />

      <SidebarOptions collapsed={collapsed} options={menu} />

      <SidebarFooter collapsed={collapsed} />
    </Box>
  );
}
