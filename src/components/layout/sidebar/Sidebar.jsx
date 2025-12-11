import { Box, IconButton } from "@mui/material";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { Header, Body, Footer } from "./components";

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
        <HiMenu />
      </IconButton>

      <Header collapsed={collapsed} />

      <Body collapsed={collapsed} options={menu} />

      <Footer collapsed={collapsed} />
    </Box>
  );
}
