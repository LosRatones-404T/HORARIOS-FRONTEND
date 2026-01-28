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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormControlLabel,
  Switch
} from '@mui/material';
import { MdAccessTime, MdSave, MdWarning } from 'react-icons/md';
import { useState } from 'react';

/**
 * Componente de horario semanal
 * Muestra una tabla de fechas con franjas horarias de 8am a 7pm
 * Agrupa exámenes que ocurren a la misma hora (apilados)
 * 
 * @param {Object} props
 * @param {Array} props.events - Array de eventos/exámenes a mostrar en el horario
 * @param {Array} props.materias - Array de materias disponibles para asignar
 * @param {Function} props.onEventsChange - Callback cuando cambian los eventos
 * @param {Function} props.onSave - Función a ejecutar al guardar cambios
 * @param {boolean} props.showHeader - Mostrar encabezado del componente
 * @param {boolean} props.readOnly - Modo solo lectura (deshabilita edición)
 * @param {Object} props.coloresGrupos - Mapeo de grupos a colores (para pintar materias)
 * @param {Date} props.fechaInicio - Fecha de inicio del calendario
 */
const HorarioSemanal = ({ 
  events = [], 
  materias = [],
  onEventsChange = null,
  onSave = null,
  showHeader = true,
  readOnly = false,
  coloresGrupos = {},
  fechaInicio = null
}) => {
  const theme = useTheme();
  
  // Estados locales
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsAtSlot, setEventsAtSlot] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [conflictoToggle, setConflictoToggle] = useState(false);

  // Generar fechas dinámicas (solo lunes a viernes, saltando fines de semana)
  const generateDates = () => {
    const start = fechaInicio ? new Date(fechaInicio) : new Date(2026, 0, 26); // 26 enero 2026
    const dates = [];
    let currentDate = new Date(start);
    let diaId = 0;
    
    // Asegurar que iniciamos en lunes (si no es lunes, ir al próximo lunes)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 1) { // 1 = lunes
      const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
      currentDate.setDate(currentDate.getDate() + daysToMonday);
    }
    
    // Generar 5 días (lunes a viernes)
    for (let i = 0; i < 5; i++) {
      dates.push({
        id: diaId,
        fecha: new Date(currentDate),
        nombre: currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        abrev: currentDate.toLocaleDateString('es-ES', { weekday: 'short', month: 'numeric', day: 'numeric' })
      });
      currentDate.setDate(currentDate.getDate() + 1);
      diaId++;
    }
    return dates;
  };

  const dias = generateDates();

  // Franjas horarias (8am a 7pm)
  const horas = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00'
  ];

  // Obtener todos los eventos en una celda específica (pueden ser múltiples grupos)
  const getEventsForSlot = (diaId, hora) => {
    return events.filter(event => 
      event.diaId === diaId && 
      event.horaInicio === hora
    );
  };

  // Agrupar eventos por (día, hora) cuando hay múltiples
  const getGroupedEventsForSlot = (diaId, hora) => {
    const slotEvents = getEventsForSlot(diaId, hora);
    // Agrupar por materia
    const grouped = {};
    slotEvents.forEach(event => {
      if (!grouped[event.materia]) {
        grouped[event.materia] = [];
      }
      grouped[event.materia].push(event);
    });
    return grouped;
  };

  // Abrir detalles del evento (modal con detalles)
  const handleEventClick = (event) => {
    if (readOnly) return;
    setSelectedEvent(event);
    const slotEvents = getEventsForSlot(event.diaId, event.horaInicio);
    setEventsAtSlot(slotEvents);
    setSelectedGroup(event.grupo);
    setConflictoToggle(event.conflicto || false);
    setOpenDetailsDialog(true);
  };

  // Cerrar detalles y guardar conflicto toggle
  const handleCloseDetails = () => {
    if (selectedEvent && selectedEvent.conflicto !== conflictoToggle && onEventsChange) {
      const updatedEvents = events.map(e => 
        e === selectedEvent ? { ...e, conflicto: conflictoToggle } : e
      );
      onEventsChange(updatedEvents);
    }
    setOpenDetailsDialog(false);
    setSelectedEvent(null);
    setEventsAtSlot([]);
    setSelectedGroup(null);
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
              Calendario de Exámenes
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary 
            }}
          >
            {dias[0]?.fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} al {dias[dias.length - 1]?.fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} • 8:00 AM - 7:00 PM
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
          maxHeight: 700
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
                    fontSize: '0.75rem',
                    minWidth: 110,
                    maxWidth: 110
                  }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {dia.nombre}
                    <br />
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                      {dia.fecha.toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit' })}
                    </Typography>
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
                    fontSize: '0.7rem',
                    color: theme.palette.text.primary,
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    borderRight: `2px solid ${theme.palette.divider}`,
                    py: 0.5,
                    px: 1
                  }}
                >
                  {hora}
                </TableCell>

                {/* Celdas de cada día */}
                {dias.map((dia) => {
                  const groupedEvents = getGroupedEventsForSlot(dia.id, hora);
                  const eventCount = Object.keys(groupedEvents).length;

                  return (
                    <TableCell 
                      key={`${dia.id}-${hora}`}
                      align="center"
                      sx={{ 
                        cursor: 'default',
                        bgcolor: eventCount > 0 
                          ? theme.palette.action.hover
                          : 'transparent',
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        p: 0.5,
                        minHeight: 80,
                        maxWidth: 110,
                        position: 'relative',
                        verticalAlign: 'flex-start',
                        overflow: 'hidden'
                      }}
                    >
                      {eventCount > 0 ? (
                        <Stack spacing={0.5} sx={{ width: '100%', p: 0.5 }}>
                          {Object.entries(groupedEvents).map(([materia, gruposDeMateria], idx) => (
                            <Box 
                              key={`${materia}-${idx}`}
                              sx={{
                                cursor: readOnly ? 'default' : 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.25,
                                width: '100%'
                              }}
                            >
                              {gruposDeMateria.map((event, grpIdx) => {
                                const colorKey = coloresGrupos[event.grupo] || theme.palette.primary.main;
                                return (
                                  <Paper
                                    key={`${materia}-${grpIdx}`}
                                    onClick={() => !readOnly && handleEventClick(event)}
                                    sx={{
                                      bgcolor: colorKey,
                                      borderRadius: 0.75,
                                      p: 0.5,
                                      minHeight: 30,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      boxShadow: event.conflicto ? `0 0 8px ${theme.palette.warning.main}` : 1,
                                      border: event.conflicto ? `2px solid ${theme.palette.warning.main}` : 'none',
                                      transition: 'all 0.2s',
                                      '&:hover': !readOnly ? {
                                        transform: 'scale(1.05)',
                                        boxShadow: 3,
                                      } : {},
                                      position: 'relative'
                                    }}
                                  >
                                    <Typography 
                                      variant="caption" 
                                      sx={{ 
                                        fontWeight: 700,
                                        color: '#fff',
                                        fontSize: '0.6rem',
                                        lineHeight: 1,
                                        wordBreak: 'break-word',
                                        textAlign: 'center'
                                      }}
                                    >
                                      {event.grupo}
                                    </Typography>
                                  </Paper>
                                );
                              })}
                            </Box>
                          ))}
                          {eventCount > 1 && (
                            <Chip
                              label={`${eventCount} grupos`}
                              size="small"
                              variant="outlined"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                fontWeight: 600
                              }}
                            />
                          )}
                        </Stack>
                      ) : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón de guardar */}
      {onSave && !readOnly && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<MdSave />}
            onClick={onSave}
            sx={{
              bgcolor: 'success.main',
              color: theme.palette.mode === 'dark' ? '#fff' : 'success.contrastText',
              '&:hover': {
                bgcolor: 'success.dark',
              },
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      )}

      {/* Dialog para ver detalles del evento */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdAccessTime size={20} />
          Detalles del Examen
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Materia
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {selectedEvent.materia}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Grupo
                </Typography>
                <Chip label={selectedEvent.grupo} size="small" variant="filled" sx={{ mt: 0.5 }} />
              </Box>

              {eventsAtSlot.length > 1 && (
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
                    Otros grupos en esta hora
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {eventsAtSlot.map((event) => (
                      <Chip
                        key={`${event.materia}-${event.grupo}`}
                        label={event.grupo}
                        onClick={() => {
                          setSelectedEvent(event);
                          setSelectedGroup(event.grupo);
                          setConflictoToggle(event.conflicto || false);
                        }}
                        variant={selectedEvent.grupo === event.grupo ? 'filled' : 'outlined'}
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Aplicador
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {selectedEvent.aplicador || 'Sin especificar'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Fecha y Hora
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {selectedEvent.fecha || `Día ${selectedEvent.diaId}`} • {selectedEvent.horaInicio}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Duración
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {selectedEvent.duracion || 'Sin especificar'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  Aula
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  {selectedEvent.aula || 'Por asignar'}
                </Typography>
              </Box>

              {!readOnly && (
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.warning.light + '30',
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.warning.light}`
                }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={conflictoToggle}
                        onChange={(e) => setConflictoToggle(e.target.checked)}
                        color="warning"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MdWarning size={18} color={theme.palette.warning.main} />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Marcar como Conflicto
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {conflictoToggle ? 'Tiene observaciones o conflictos' : 'Sin conflictos'}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>
            {readOnly ? 'Cerrar' : 'Listo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

HorarioSemanal.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      diaId: PropTypes.number.isRequired, // 0-6 (7 días)
      horaInicio: PropTypes.string.isRequired, // Formato: "08:00"
      materia: PropTypes.string.isRequired,
      grupo: PropTypes.string.isRequired,
      aplicador: PropTypes.string,
      aula: PropTypes.string,
      duracion: PropTypes.string,
      fecha: PropTypes.string,
      conflicto: PropTypes.bool,
    })
  ),
  materias: PropTypes.arrayOf(PropTypes.string),
  onEventsChange: PropTypes.func,
  onSave: PropTypes.func,
  showHeader: PropTypes.bool,
  readOnly: PropTypes.bool,
  coloresGrupos: PropTypes.object,
  fechaInicio: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default HorarioSemanal;
