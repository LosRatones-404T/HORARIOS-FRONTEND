import { useState } from 'react';
import { Box, IconButton, Badge, Menu, Typography, List, ListItem } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    
    // Navegar según el tipo de notificación
    if (notification.tipo === 'aprobado' || notification.tipo === 'rechazado' || notification.tipo === 'en_revision') {
      navigate('/generar');
    } else if (notification.tipo === 'nuevo' || notification.tipo === 'pendiente') {
      navigate('/calendario');
    }
    
    handleNotificationClose();
  };

  return (
    <>
      <IconButton 
        sx={{ 
          color: theme.palette.mode === 'light' ? '#FFFFFF' : '#2A3344',
          p: { xs: 1, sm: 1.5 },
        }}
        aria-label="Notificaciones"
        onClick={handleNotificationOpen}
      >
        <Badge badgeContent={unreadCount} color="error">
          <FaBell size={18} />
        </Badge>
      </IconButton>

      {/* Menú de notificaciones */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            minWidth: 360,
            maxWidth: 400,
            maxHeight: 500,
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Notificaciones
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="caption" color="text.secondary">
              {unreadCount} {unreadCount === 1 ? 'nueva' : 'nuevas'}
            </Typography>
          )}
        </Box>
        
        <List sx={{ p: 0, maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <ListItem>
              <Typography 
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', width: '100%', py: 2 }}
              >
                No hay notificaciones
              </Typography>
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification)}
              />
            ))
          )}
        </List>
      </Menu>
    </>
  );
};

export default NotificationMenu;
