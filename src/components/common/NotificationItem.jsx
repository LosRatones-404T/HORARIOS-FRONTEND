import { Box, ListItem, Typography, useTheme } from '@mui/material';
import { MdCheckCircle, MdError, MdSchedule, MdInfo } from 'react-icons/md';

const NotificationItem = ({ notification, onClick }) => {
  const theme = useTheme();

  const getNotificationIcon = (tipo) => {
    const icons = {
      aprobado: <MdCheckCircle size={20} color={theme.palette.success.main} />,
      rechazado: <MdError size={20} color={theme.palette.error.main} />,
      en_revision: <MdSchedule size={20} color={theme.palette.warning.main} />,
      revisado: <MdInfo size={20} color={theme.palette.primary.main} />,
      nuevo: <MdInfo size={20} color={theme.palette.info.main} />,
      pendiente: <MdSchedule size={20} color={theme.palette.warning.main} />,
      sistema: <MdInfo size={20} color={theme.palette.info.main} />,
    };
    return icons[tipo] || <MdInfo size={20} />;
  };

  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        py: 1.5,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: notification.leido 
          ? 'transparent' 
          : theme.palette.mode === 'light' 
            ? 'rgba(66, 114, 210, 0.05)' 
            : 'rgba(166, 195, 252, 0.05)',
        '&:hover': {
          bgcolor: theme.palette.mode === 'light' 
            ? 'rgba(66, 114, 210, 0.1)' 
            : 'rgba(166, 195, 252, 0.1)',
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
        <Box sx={{ pt: 0.5 }}>
          {getNotificationIcon(notification.tipo)}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {notification.titulo}
            </Typography>
            {!notification.leido && (
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main',
                  flexShrink: 0,
                  ml: 1,
                }} 
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {notification.mensaje}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {notification.fecha}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default NotificationItem;
