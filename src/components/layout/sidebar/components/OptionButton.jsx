import { Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function OptionButton({ icon, label, collapsed, onClick }) {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        justifyContent: collapsed ? "center" : "flex-start",
        textTransform: "none",
        p: collapsed ? 1 : { xs: 1.5, sm: 1.75 },
        px: collapsed ? 1 : { xs: 2, sm: 3 },
        borderRadius: theme.shape.borderRadius / 0.85,
        minHeight: { xs: 40, sm: 44 },
        bgcolor: 'primary.main',
        color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
        transition: theme.transitions.create(['background-color', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          bgcolor: 'primary.dark',
          transform: 'translateX(4px)',
        },
      }}
      startIcon={!collapsed ? icon : null}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {collapsed ? icon : (
          <Typography 
            variant="body2"
            sx={{ color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344' }}
          >
            {label}
          </Typography>
        )}
      </Stack>
    </Button>
  );
}
