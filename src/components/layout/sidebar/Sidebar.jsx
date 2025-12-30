import { Box } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Header, Body, Footer } from "./components";

export default function Sidebar({ menu }) {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: collapsed ? "120px" : "385px",
        transition: theme.transitions.create("width", {
          duration: theme.transitions.duration.standard,
        }),
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 🔹 HEADER */}
      <Header collapsed={collapsed} />

      {/* 🔹 MENÚ */}
      <Body collapsed={collapsed} options={menu} />

      {/* 🔹 FOOTER */}
      <Footer collapsed={collapsed} />
    </Box>
  );
}
