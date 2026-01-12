import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Chip
} from '@mui/material';
import { MdAccessTime } from 'react-icons/md';

/**
 * Componente de horario semanal
 * Muestra una tabla de lunes a viernes con franjas horarias de 8am a 7pm
 * 
 * @param {Object} props
 * @param {Array} props.events - Array de eventos/exámenes a mostrar en el horario
 * @param {Function} props.onSlotClick - Función a ejecutar al hacer click en una celda
 * @param {boolean} props.showHeader - Mostrar encabezado del componente
 */
const HorarioSemanal = ({ 
  events = [], 
  onSlotClick = null,
  showHeader = true 
}) => {
  const theme = useTheme();

  // Días de la semana
  const dias = [
    { id: 1, nombre: 'Lunes', abrev: 'Lun' },
    { id: 2, nombre: 'Martes', abrev: 'Mar' },
    { id: 3, nombre: 'Miércoles', abrev: 'Mié' },
    { id: 4, nombre: 'Jueves', abrev: 'Jue' },
    { id: 5, nombre: 'Viernes', abrev: 'Vie' }
  ];

  // Franjas horarias (8am a 7pm)
  const horas = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00'
  ];

  // Función para verificar si hay un evento en una celda específica
  const getEventForSlot = (dia, hora) => {
    return events.find(event => 
      event.dia === dia.id && 
      event.horaInicio === hora
    );
  };

  // Manejar click en celda
  const handleCellClick = (dia, hora) => {
    if (onSlotClick) {
      onSlotClick({ dia, hora });
    }
  };

  return (
    <Box>
      {/* Encabezado */}
      {showHeader && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <MdAccessTime size={24} color={theme.palette.primary.main} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary 
              }}
            >
              Horario Semanal
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary 
            }}
          >
            Lunes a Viernes • 8:00 AM - 7:00 PM
          </Typography>
        </Box>
      )}

      {/* Tabla de horarios */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 2,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'auto',
          maxHeight: 600
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          {/* Encabezado de la tabla */}
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  minWidth: 100,
                  position: 'sticky',
                  left: 0,
                  zIndex: 3,
                  borderRight: `2px solid ${theme.palette.divider}`
                }}
              >
                Hora
              </TableCell>
              {dias.map((dia) => (
                <TableCell 
                  key={dia.id}
                  align="center"
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    minWidth: 150
                  }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {dia.nombre}
                  </Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    {dia.abrev}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Cuerpo de la tabla */}
          <TableBody>
            {horas.map((hora, horaIndex) => (
              <TableRow 
                key={hora}
                sx={{ 
                  '&:hover': { 
                    bgcolor: theme.palette.mode === 'light' 
                      ? theme.palette.action.hover 
                      : 'rgba(255, 255, 255, 0.05)' 
                  }
                }}
              >
                {/* Celda de hora */}
                <TableCell 
                  component="th" 
                  scope="row"
                  sx={{ 
                    bgcolor: theme.palette.mode === 'light'
                      ? theme.palette.background.default
                      : theme.palette.background.paper,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    borderRight: `2px solid ${theme.palette.divider}`
                  }}
                >
                  {hora}
                </TableCell>

                {/* Celdas de cada día */}
                {dias.map((dia) => {
                  const event = getEventForSlot(dia, hora);
                  const isClickable = onSlotClick && !event;

                  return (
                    <TableCell 
                      key={`${dia.id}-${hora}`}
                      align="center"
                      onClick={() => isClickable && handleCellClick(dia, hora)}
                      sx={{ 
                        cursor: isClickable ? 'pointer' : 'default',
                        bgcolor: event 
                          ? theme.palette.primary.light + '40'
                          : 'transparent',
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        p: 1,
                        minHeight: 60,
                        position: 'relative',
                        '&:hover': isClickable ? {
                          bgcolor: theme.palette.primary.light + '20',
                        } : {}
                      }}
                    >
                      {event && (
                        <Box
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 1,
                            p: 1,
                            minHeight: 50,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 0.5,
                            boxShadow: 1
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.primary.contrastText,
                              fontSize: '0.75rem',
                              lineHeight: 1.2
                            }}
                          >
                            {event.materia}
                          </Typography>
                          {event.aula && (
                            <Chip
                              label={event.aula}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                bgcolor: theme.palette.mode === 'light'
                                  ? 'rgba(255, 255, 255, 0.3)'
                                  : 'rgba(0, 0, 0, 0.3)',
                                color: theme.palette.primary.contrastText,
                                fontWeight: 500
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Leyenda */}
      {events.length > 0 && (
        <Box 
          sx={{ 
            mt: 2, 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: 16, 
                height: 16, 
                bgcolor: theme.palette.primary.main,
                borderRadius: 0.5 
              }} 
            />
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Examen programado
            </Typography>
          </Box>
          {onSlotClick && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 0.5 
                }} 
              />
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Disponible (click para asignar)
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

HorarioSemanal.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      dia: PropTypes.number.isRequired, // 1: Lunes, 2: Martes, etc.
      horaInicio: PropTypes.string.isRequired, // Formato: "08:00"
      materia: PropTypes.string.isRequired,
      aula: PropTypes.string,
      profesor: PropTypes.string,
    })
  ),
  onSlotClick: PropTypes.func,
  showHeader: PropTypes.bool,
};

export default HorarioSemanal;
