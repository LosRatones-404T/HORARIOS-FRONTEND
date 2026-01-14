import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

/**
 * Componente reutilizable para notificaciones
 * Muestra mensajes de éxito, error, advertencia o información
 * 
 * @example
 * // En tu componente:
 * const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
 * 
 * // Para mostrar una notificación:
 * setNotification({ open: true, message: 'Guardado exitoso', severity: 'success' });
 * 
 * // Renderizar:
 * <Notification 
 *   open={notification.open}
 *   message={notification.message}
 *   severity={notification.severity}
 *   onClose={() => setNotification({ ...notification, open: false })}
 * />
 */
const Notification = ({ 
  open, 
  message, 
  severity = 'success', 
  onClose,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' }
}) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={autoHideDuration} 
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};

export default Notification;
