import PropTypes from 'prop-types';
import { Button as MuiButton, useTheme } from '@mui/material';
import { Box } from '@mui/material';

/**
 * Componente de botón reutilizable con soporte para iconos y variantes
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon, 
  iconPosition = 'left',
  sx = {},
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const theme = useTheme();

  const variantStyles = {
    primary: {
      bgcolor: theme.palette.accent.main,
      color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.primary,
      '&:hover': {
        bgcolor: theme.palette.mode === 'light' ? '#E8C5EB' : theme.palette.tertiary.light,
      },
    },
    secondary: {
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        bgcolor: theme.palette.primary.light,
      },
    },
    outline: {
      border: `2px solid ${theme.palette.accent.main}`,
      color: theme.palette.accent.main,
      bgcolor: 'transparent',
      '&:hover': {
        bgcolor: theme.palette.mode === 'light' ? 'rgba(223, 188, 226, 0.1)' : 'rgba(223, 188, 226, 0.2)',
      },
    },
    ghost: {
      color: theme.palette.text.primary,
      bgcolor: 'transparent',
      '&:hover': {
        bgcolor: theme.palette.background.secondary,
      },
    },
  };

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 3,
        fontWeight: 500,
        textTransform: 'none',
        gap: 1,
        ...variantStyles[variant],
        ...sx,
      }}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Box component="span" sx={{ display: 'flex', fontSize: '1.25rem' }}>
          {icon}
        </Box>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Box component="span" sx={{ display: 'flex', fontSize: '1.25rem' }}>
          {icon}
        </Box>
      )}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  sx: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
