import PropTypes from 'prop-types';
import { Box, Typography, Avatar, IconButton, useTheme } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

/**
 * Componente universal de lista de usuarios
 * Muestra avatar, nombre, email, rol y menú de opciones
 */
const UserListItem = ({ 
  nombre,
  email,
  rol,
  avatar,
  onMenuClick,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: theme.palette.primary.light,
        },
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {/* Avatar */}
        <Avatar
          src={avatar}
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
            color: theme.palette.primary.contrastText,
          }}
        >
          {!avatar && <FiUser size={20} />}
        </Avatar>

        {/* Información del usuario */}
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              color: theme.palette.primary.contrastText,
            }}
          >
            {nombre}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : theme.palette.text.secondary,
              fontSize: '0.875rem',
            }}
          >
            {email}
          </Typography>
        </Box>

        {/* Rol */}
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500,
            color: theme.palette.primary.contrastText,
            px: 2,
          }}
        >
          {rol}
        </Typography>
      </Box>

      {/* Menú de opciones */}
      <IconButton
        onClick={onMenuClick}
        sx={{
          color: theme.palette.primary.contrastText,
          '&:hover': {
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.2)' : theme.palette.background.secondary,
          },
        }}
        aria-label="Opciones"
      >
        <BsThreeDotsVertical size={20} />
      </IconButton>
    </Box>
  );
};

UserListItem.propTypes = {
  nombre: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rol: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onMenuClick: PropTypes.func,
  sx: PropTypes.object,
};

export default UserListItem;
