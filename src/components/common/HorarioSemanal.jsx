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
  MenuItem
} from '@mui/material';
import { MdAccessTime, MdSave } from 'react-icons/md';
import { useState } from 'react';

/**
 * Componente de horario semanal
 * Muestra una tabla de lunes a viernes con franjas horarias de 8am a 7pm
 * 
 * @param {Object} props
 * @param {Array} props.events - Array de eventos/exámenes a mostrar en el horario
 * @param {Array} props.materias - Array de materias disponibles para asignar
 * @param {Function} props.onEventsChange - Callback cuando cambian los eventos
 * @param {Function} props.onSave - Función a ejecutar al guardar cambios
 * @param {boolean} props.showHeader - Mostrar encabezado del componente
 */
const HorarioSemanal = ({ 
  events = [], 
  materias = [],
  onEventsChange = null,
  onSave = null,
  showHeader = true 
}) => {
  const theme = useTheme();
  
  // Estados locales
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [eventToDelete, setEventToDelete] = useState(null);

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

  // Abrir modal para asignar materia o eliminar evento
  const handleCellClick = (dia, hora) => {
    const existingEvent = getEventForSlot(dia, hora);
    if (existingEvent) {
      // Si hay un evento, abrir dialog de eliminación
      setEventToDelete(existingEvent);
      setOpenDeleteDialog(true);
    } else if (materias.length > 0) {
      // Si está vacío, abrir dialog de asignación
      setSelectedSlot({ dia, hora });
      setSelectedMateria('');
      setOpenDialog(true);
    }
  };

  // Asignar materia a una celda
  const handleAssignMateria = () => {
    if (selectedMateria && selectedSlot && onEventsChange) {
      const newEvent = {
        dia: selectedSlot.dia.id,
        horaInicio: selectedSlot.hora,
        materia: selectedMateria,
        aula: 'Por asignar'
      };
      onEventsChange([...events, newEvent]);
      setOpenDialog(false);
      setSelectedMateria('');
      setSelectedSlot(null);
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (event, eventData) => {
    setDraggedEvent(eventData);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dia, hora) => {
    if (draggedEvent && onEventsChange) {
      const existingEvent = getEventForSlot(dia, hora);
      
      // Solo permitir drop si la celda está vacía
      if (!existingEvent) {
        // Remover el evento de su posición anterior
        const updatedEvents = events.filter(e => 
          !(e.dia === draggedEvent.dia && e.horaInicio === draggedEvent.horaInicio)
        );
        
        // Agregar el evento en la nueva posición
        const movedEvent = {
          ...draggedEvent,
          dia: dia.id,
          horaInicio: hora
        };
        
        onEventsChange([...updatedEvents, movedEvent]);
      }
    }
    setDraggedEvent(null);
  };

  // Eliminar evento
  const handleDeleteEvent = () => {
    if (eventToDelete && onEventsChange) {
      const updatedEvents = events.filter(e => 
        !(e.dia === eventToDelete.dia && e.horaInicio === eventToDelete.horaInicio && e.materia === eventToDelete.materia)
      );
      onEventsChange(updatedEvents);
      setOpenDeleteDialog(false);
      setEventToDelete(null);
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
                    fontSize: '0.75rem',
                    minWidth: 100
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
                  const event = getEventForSlot(dia, hora);

                  return (
                    <TableCell 
                      key={`${dia.id}-${hora}`}
                      align="center"
                      onClick={() => handleCellClick(dia, hora)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(dia, hora)}
                      sx={{ 
                        cursor: event ? 'move' : 'pointer',
                        bgcolor: event 
                          ? theme.palette.primary.light + '40'
                          : 'transparent',
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        p: 1,
                        minHeight: 60,
                        position: 'relative',
                        '&:hover': {
                          bgcolor: event 
                            ? theme.palette.primary.light + '60'
                            : theme.palette.primary.light + '20',
                        }
                      }}
                    >
                      {event && (
                        <Box
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 1,
                            p: 0.5,
                            minHeight: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 0.5,
                            boxShadow: 1,
                            cursor: 'move',
                            userSelect: 'none'
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.primary.contrastText,
                              fontSize: '0.65rem',
                              lineHeight: 1.1
                            }}
                          >
                            {event.materia}
                          </Typography>
                          {event.aula && (
                            <Chip
                              label={event.aula}
                              size="small"
                              sx={{
                                height: 16,
                                fontSize: '0.6rem',
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

      {/* Botón de guardar */}
      {onSave && (
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

      {/* Dialog para asignar materia */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Asignar Examen</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Seleccionar Materia</InputLabel>
            <Select
              value={selectedMateria}
              label="Seleccionar Materia"
              onChange={(e) => setSelectedMateria(e.target.value)}
            >
              {materias.map((materia) => (
                <MenuItem key={materia} value={materia}>
                  {materia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleAssignMateria} 
            variant="contained" 
            disabled={!selectedMateria}
          >
            Asignar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para eliminar examen */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Eliminar Examen</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el examen de <strong>{eventToDelete?.materia}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleDeleteEvent} 
            variant="contained" 
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
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
  materias: PropTypes.arrayOf(PropTypes.string),
  onEventsChange: PropTypes.func,
  onSave: PropTypes.func,
  showHeader: PropTypes.bool,
};

export default HorarioSemanal;
