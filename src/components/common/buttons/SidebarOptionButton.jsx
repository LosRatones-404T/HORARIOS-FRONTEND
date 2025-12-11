import { Button, Stack, Typography } from "@mui/material";

export default function SidebarOptionButton({ icon, label, collapsed, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        justifyContent: collapsed ? "center" : "flex-start",
        textTransform: "none",
        padding: "10px 14px",
        borderRadius: "10px",
      }}
      startIcon={!collapsed ? icon : null}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {collapsed ? icon : <Typography>{label}</Typography>}
      </Stack>
    </Button>
  );
}
