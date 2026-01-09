import PropTypes from 'prop-types';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { IoArrowForward } from 'react-icons/io5';

/**
 * Componente de tarjeta de usuario con información y acción
 * Diseñado para mostrar información de licenciaturas/materias con estado
 */
const UserCard = ({ 
  licenciatura,
  nombre,
  codigo,
  fecha,
  estado = 'Pendiente',
  onRevisar,
  variant = 'default',
  sx = {}
}) => {
  const theme = useTheme();

  // Variantes de color basadas en el tipo de usuario/contexto
  const variants = {
    default: theme.palette.primary.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.primary.light,
    tertiary: theme.palette.primary.dark,
  };

  const bgColor = variants[variant] || variants.default;

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
          <Typography sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}>
            {licenciatura}
          </Typography>
          <Typography sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}>
            {nombre}
          </Typography>
          <Typography sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}>
            {codigo}
          </Typography>
          <Typography sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}>
            {fecha}
          </Typography>
          <Typography sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}>
            {estado}
          </Typography>
        </Box>
        
        <Button
          onClick={onRevisar}
          endIcon={<IoArrowForward size={18} />}
          sx={{
            bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
            color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.text.primary,
            px: 2,
            py: 1,
            borderRadius: 2,
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              bgcolor: theme.palette.mode === 'light' ? '#8FA9E8' : theme.palette.background.secondary,
            },
          }}
        >
          Revisar
        </Button>
      </Box>
    </Box>
  );
};

UserCard.propTypes = {
  licenciatura: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  codigo: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  estado: PropTypes.string,
  onRevisar: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  sx: PropTypes.object,
};

export default UserCard;
