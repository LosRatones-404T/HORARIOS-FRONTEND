import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  useTheme 
} from '@mui/material';
import { IoAdd } from 'react-icons/io5';
import UserListItem from './UserListItem';

/**
 * Componente principal de tarjeta del dashboard
 * Muestra contenido diferente según el tipo de usuario
 */
const DashboardMainCard = ({ 
  userType = 'admin',
  title,
  subtitle,
  actionButton,
  data = [],
  onActionClick,
  sx = {}
}) => {
  const theme = useTheme();

  // Renderiza la tarjeta de Gestión de Usuarios (Administrador)
  const renderUserManagement = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {data.map((user, index) => (
        <UserListItem
          key={index}
          nombre={user.nombre}
          email={user.email}
          rol={user.rol}
          avatar={user.avatar}
          onMenuClick={() => user.onMenuClick?.(user)}
        />
      ))}
    </Box>
  );

  // Renderiza tabla de horarios (Secretaria y Jefe de Carrera)
  const renderScheduleTable = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.3)' : theme.palette.divider}`,
            }}
          >
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Departamento
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Autor
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Periodo
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Fecha
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Estado
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 500, pb: 2 }}>
              Acción
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(62,78,108,0.5)'}`,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(166,195,252,0.1)',
                },
              }}
            >
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: '0.875rem' }}>
                {item.departamento}
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: '0.875rem' }}>
                {item.autor}
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: '0.875rem' }}>
                {item.periodo}
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: '0.875rem' }}>
                {item.fecha}
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: '0.875rem' }}>
                {item.estado}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => item.onAction?.(item)}
                  sx={{
                    bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
                    color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.text.primary,
                    px: 2,
                    py: 0.75,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'light' ? '#8FA9E8' : theme.palette.background.secondary,
                    },
                  }}
                >
                  Revisar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Determina qué contenido mostrar según el tipo de usuario
  const renderContent = () => {
    switch (userType) {
      case 'admin':
        return renderUserManagement();
      case 'secretaria':
      case 'jefe':
        return renderScheduleTable();
      default:
        return renderUserManagement();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: 3,
        p: 3,
        boxShadow: 3,
        ...sx,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.contrastText,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : theme.palette.text.secondary,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {actionButton && (
          <Button
            onClick={onActionClick}
            startIcon={<IoAdd size={18} />}
            sx={{
              bgcolor: theme.palette.accent.main,
              color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.primary,
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? '#E8C5EB' : theme.palette.tertiary.light,
              },
            }}
          >
            {actionButton}
          </Button>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

DashboardMainCard.propTypes = {
  userType: PropTypes.oneOf(['admin', 'secretaria', 'jefe']).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actionButton: PropTypes.string,
  data: PropTypes.array,
  onActionClick: PropTypes.func,
  sx: PropTypes.object,
};

export default DashboardMainCard;
