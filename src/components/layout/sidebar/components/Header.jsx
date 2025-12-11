import { Box, Typography } from "@mui/material";
import logo from "../../../../assets/logo-unsis.png";

export default function Header({ collapsed }) {
  return (
    <Box sx={{ p: 2, textAlign: collapsed ? "center" : "left" }}>
      {!collapsed ? (
        <>
          <img 
            src={logo} 
            alt="SIPLEX Logo" 
            style={{
              width: "50px",
              height: "auto",
              marginBottom: "8px",
            }}
          />
          <Typography variant="h6" fontWeight="bold">SIPLEX</Typography>
          <Typography variant="caption">Sistema de Planificación</Typography>
        </>
      ) : (
        <img 
          src={logo} 
          alt="SIPLEX Logo" 
          style={{
            width: "40px",
            height: "auto",
          }}
        />
      )}
    </Box>
  );
}
