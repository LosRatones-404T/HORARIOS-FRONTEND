import { Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

export default function OptionButton({ icon, label, collapsed, onClick, path }) {
  const theme = useTheme();
  const location = useLocation();
  
  const isActive = location.pathname === path;

  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        justifyContent: collapsed ? "center" : "flex-start",
        textTransform: "none",
        p: { xs: 1.25, sm: 1.5 },
        px: collapsed ? 1.25 : { xs: 2.5, sm: 3 },
        borderRadius: 3,
        minHeight: { xs: 44, sm: 48 },
        bgcolor: isActive ? 'primary.main' : 'transparent',
        color: isActive 
          ? (theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344')
          : 'text.primary',
        boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
        transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          bgcolor: isActive ? 'primary.dark' : 'action.hover',
          transform: 'translateX(4px)',
          boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
        },
        '&:active': {
          transform: 'translateX(2px)',
        },
      }}
      startIcon={!collapsed ? icon : null}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        {collapsed ? icon : (
          <Typography 
            variant="body2"
            fontWeight={isActive ? 600 : 500}
            sx={{ 
              color: 'inherit',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            }}
          >
            {label}
          </Typography>
        )}
      </Stack>
    </Button>
  );
}
