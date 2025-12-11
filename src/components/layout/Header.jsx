import React from 'react';
import {AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar,
  Menu, MenuItem, Divider, ListItemIcon, Button} from '@mui/material';
import { 
  MdNotifications, 
  MdPerson, 
  MdSettings, 
  MdLogout, 
  MdDashboard, 
  MdCalendarToday, 
  MdBuild 
} from 'react-icons/md';
import ThemeToggle from '../ThemeToggle';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Logo y Título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              S
            </Typography>
          </Box>
          
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              STPLEX
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Sistema de Planificación de Exámenes
            </Typography>
          </Box>
        </Box>

        {/* Navegación */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button 
            startIcon={<MdDashboard />}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Dashboard
          </Button>
          <Button 
            startIcon={<MdCalendarToday />}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Horarios
          </Button>
          <Button 
            startIcon={<MdBuild />}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Ajustes
          </Button>
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notificaciones */}
          <IconButton sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error">
              <MdNotifications />
            </Badge>
          </IconButton>
          
          {/* Perfil */}
          <IconButton
            onClick={handleClick}
            sx={{ color: 'text.secondary' }}
          >
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: 'primary.light',
                color: 'primary.main'
              }}
            >
              <MdPerson />
            </Avatar>
          </IconButton>
        </Box>

        {/* Menú del perfil */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              bgcolor: 'background.paper',
              boxShadow: 3
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Alicia Martínez
            </Typography>
            <Typography variant="body2" color="text.secondary">
              alicia@example.com
            </Typography>
            <Typography variant="caption" color="primary.main">
              Servicios Escolares
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MdPerson fontSize="small" />
            </ListItemIcon>
            Mi Perfil
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MdSettings fontSize="small" />
            </ListItemIcon>
            Configuración
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MdLogout fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;