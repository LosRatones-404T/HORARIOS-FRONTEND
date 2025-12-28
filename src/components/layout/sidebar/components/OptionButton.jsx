import { Button, Stack, Typography } from "@mui/material";

export default function OptionButton({ icon, label, collapsed, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        justifyContent: collapsed ? "center" : "flex-start",
        textTransform: "none",
        padding: collapsed ? "8px" : "14px 38px",
        borderRadius: "14px",
        minHeight: collapsed ? 'auto' : '40px',
        backgroundColor: '#4A83DD',
        color: 'white',
        '&:hover': {
          backgroundColor: '#3a73c7',
        },
      }}
      startIcon={!collapsed ? icon : null}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {collapsed ? icon : <Typography>{label}</Typography>}
      </Stack>
    </Button>
  );
}
