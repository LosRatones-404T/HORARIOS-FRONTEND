import { 
  Box, 
  Typography, 
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Alert,
  Paper,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { 
  MdCheckCircle, 
  MdCancel, 
  MdSchedule,
  MdPerson,
  MdCalendarMonth,
  MdEventNote,
  MdSchool
} from 'react-icons/md';
import useRevision from '../hooks/useRevision';
import { ESTADO_LABELS } from '../constants/estadosExamen';

const Revision = () => {
  const theme = useTheme();
  const {
    horariosPendientes,
    horarioSeleccionado,
    loading,
    dialogAprobar,
    dialogRechazar,
    observaciones,
    retroalimentacion,
    seleccionarHorario,
    abrirDialogoAprobar,
    cerrarDialogoAprobar,
    abrirDialogoRechazar,
    cerrarDialogoRechazar,
    setObservaciones,
    setRetroalimentacion,
    aprobarHorario,
    rechazarHorario,
  } = useRevision();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Revisión de Horarios
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Revisa y aprueba los horarios enviados por los Jefes de Carrera
        </Typography>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdSchedule size={32} color={theme.palette.warning.main} />
                <Typography variant="h4" sx={{ ml: 2, fontWeight: 700 }}>
                  {horariosPendientes.length}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Horarios Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdEventNote size={32} color={theme.palette.info.main} />
                <Typography variant="h4" sx={{ ml: 2, fontWeight: 700 }}>
                  {horariosPendientes.reduce((acc, h) => acc + h.total_examenes, 0)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total de Exámenes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdSchool size={32} color={theme.palette.primary.main} />
                <Typography variant="h4" sx={{ ml: 2, fontWeight: 700 }}>
                  {new Set(horariosPendientes.map(h => h.carrera)).size}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Carreras
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {horariosPendientes.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No hay horarios pendientes de revisión en este momento.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {/* Lista de horarios pendientes */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Horarios Pendientes
                </Typography>
                <List sx={{ p: 0 }}>
                  {horariosPendientes.map((horario, index) => (
                    <Box key={horario.id}>
                      <ListItem disablePadding>
                        <ListItemButton 
                          onClick={() => seleccionarHorario(horario)}
                          selected={horarioSeleccionado?.id === horario.id}
                          sx={{ 
                            borderRadius: 1,
                            '&.Mui-selected': {
                              bgcolor: 'primary.lighter',
                              '&:hover': {
                                bgcolor: 'primary.lighter',
                              }
                            }
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" fontWeight={600}>
                                {horario.carrera}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="caption" display="block" color="text.secondary">
                                  {horario.jefe_carrera}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <Chip 
                                    label={horario.tipo_examen} 
                                    size="small" 
                                    color="warning"
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    {horario.total_examenes} exámenes
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      {index < horariosPendientes.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Detalle del horario seleccionado */}
          <Grid item xs={12} md={8}>
            {horarioSeleccionado ? (
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {horarioSeleccionado.carrera}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip 
                          label={horarioSeleccionado.tipo_examen} 
                          color="warning" 
                          size="small"
                        />
                        <Chip 
                          label={ESTADO_LABELS[horarioSeleccionado.estado]} 
                          color="warning" 
                          size="small"
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<MdCheckCircle />}
                        onClick={abrirDialogoAprobar}
                      >
                        Aprobar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<MdCancel />}
                        onClick={abrirDialogoRechazar}
                      >
                        Rechazar
                      </Button>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Información general */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MdPerson size={20} style={{ marginRight: 8 }} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          Jefe de Carrera
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={500}>
                        {horarioSeleccionado.jefe_carrera}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MdCalendarMonth size={20} style={{ marginRight: 8 }} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          Periodo
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={500}>
                        {horarioSeleccionado.periodo}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MdSchedule size={20} style={{ marginRight: 8 }} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          Fecha de Envío
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={500}>
                        {horarioSeleccionado.fecha_envio}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MdEventNote size={20} style={{ marginRight: 8 }} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                          Total de Exámenes
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={500}>
                        {horarioSeleccionado.total_examenes}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Tabla de horarios */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Detalle de Exámenes
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Semestre</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Materia</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Profesor</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Aula</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Horario</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Alumnos</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {horarioSeleccionado.horarios.map((examen, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{examen.semestre}</TableCell>
                            <TableCell>{examen.materia}</TableCell>
                            <TableCell>{examen.profesor}</TableCell>
                            <TableCell>
                              <Chip label={examen.aula} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>{examen.fecha}</TableCell>
                            <TableCell>{examen.hora_inicio} - {examen.hora_fin}</TableCell>
                            <TableCell>{examen.alumnos}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ) : (
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <CardContent sx={{ py: 8, textAlign: 'center' }}>
                  <MdSchedule size={64} color={theme.palette.text.disabled} />
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                    Selecciona un horario para revisar
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}

      {/* Diálogo de Aprobar */}
      <Dialog 
        open={dialogAprobar} 
        onClose={cerrarDialogoAprobar}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MdCheckCircle size={28} color={theme.palette.success.main} style={{ marginRight: 12 }} />
            Aprobar Horario
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Estás a punto de aprobar el horario de <strong>{horarioSeleccionado?.carrera}</strong>.
            Puedes agregar observaciones o sugerencias opcionales.
          </Typography>
          <TextField
            label="Observaciones y Sugerencias (Opcional)"
            multiline
            rows={4}
            fullWidth
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ej: El horario cumple con los requisitos. Se sugiere revisar la distribución de aulas para el grupo 3A..."
            helperText="Estas observaciones se mostrarán al Jefe de Carrera"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={cerrarDialogoAprobar}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            onClick={aprobarHorario}
            startIcon={<MdCheckCircle />}
          >
            Aprobar Horario
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Rechazar */}
      <Dialog 
        open={dialogRechazar} 
        onClose={cerrarDialogoRechazar}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MdCancel size={28} color={theme.palette.error.main} style={{ marginRight: 12 }} />
            Rechazar Horario
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            El Jefe de Carrera recibirá una notificación con tu retroalimentación.
          </Alert>
          <TextField
            label="Retroalimentación (Obligatoria)"
            multiline
            rows={4}
            fullWidth
            required
            value={retroalimentacion}
            onChange={(e) => setRetroalimentacion(e.target.value)}
            placeholder="Especifica los motivos del rechazo y las correcciones necesarias..."
            helperText="Explica claramente qué debe corregirse"
            error={dialogRechazar && !retroalimentacion.trim()}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={cerrarDialogoRechazar}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={rechazarHorario}
            startIcon={<MdCancel />}
            disabled={!retroalimentacion.trim()}
          >
            Rechazar Horario
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Revision;
