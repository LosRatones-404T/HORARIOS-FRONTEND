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
  useTheme,
  Container
} from '@mui/material';
import { useEffect } from 'react';
import { 
  MdCheckCircle, 
  MdCancel, 
  MdSchedule,
  MdPerson,
  MdCalendarMonth,
  MdEventNote,
  MdSchool
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useRevision from '../hooks/useRevision';
import { ESTADO_LABELS } from '../constants/estadosExamen';
import MainLayout from '../components/layout/MainLayout';

const Revision = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!horarioSeleccionado && horariosPendientes.length > 0) {
      seleccionarHorario(horariosPendientes[0]);
    }
  }, [horariosPendientes, horarioSeleccionado, seleccionarHorario]);

  if (loading) {
    return (
      <MainLayout showSidebar={true}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout showSidebar={true}>
      <Box sx={{ 
        py: 4, 
        px: { xs: 2, md: 3 },
        maxWidth: '1400px',
        mx: 'auto',
        width: '100%'
      }}>
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
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdSchedule size={32} color={theme.palette.primary.main} />
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
        
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MdEventNote size={32} color={theme.palette.primary.main} />
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

        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 200 }}>
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
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2,
            p: 3,
            bgcolor: 'background.paper'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' },
              gap: { xs: 2, md: 3 },
              alignItems: 'start'
            }}
          >
            {/* Lista de horarios pendientes */}
            <Box>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Pendientes
                    </Typography>
                    <Chip 
                      label={horariosPendientes.length} 
                      color="primary" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </CardContent>
                <Divider />
                <Box sx={{ overflow: 'auto', flex: 1 }}>
                  <List sx={{ p: 2, pt: 1 }}>
                    {horariosPendientes.map((horario, index) => (
                      <Box key={horario.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            border: '1px solid',
                            borderColor: horarioSeleccionado?.id === horario.id ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            bgcolor: horarioSeleccionado?.id === horario.id ? 'primary.lighter' : 'transparent',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'primary.lighter',
                              transform: 'translateY(-2px)',
                              boxShadow: 1
                            }
                          }}
                          onClick={() => seleccionarHorario(horario)}
                        >
                          <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                              <Box 
                                sx={{ 
                                  p: 1, 
                                  bgcolor: 'primary.main',
                                  borderRadius: 1.5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <MdSchool size={20} color="white" />
                              </Box>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  fontWeight={600}
                                  sx={{ 
                                    mb: 0.5,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                  }}
                                >
                                  {horario.carrera}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ 
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {horario.jefe_carrera}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                              <Chip 
                                label={horario.tipo_examen} 
                                size="small" 
                                color="primary"
                                variant={horarioSeleccionado?.id === horario.id ? 'filled' : 'outlined'}
                              />
                              <Chip 
                                icon={<MdEventNote size={14} />}
                                label={`${horario.total_examenes}`}
                                size="small"
                                variant="outlined"
                              />
                            </Stack>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <MdCalendarMonth size={14} color={theme.palette.text.secondary} />
                              <Typography variant="caption" color="text.secondary">
                                Enviado: {horario.fecha_envio}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                        {index < horariosPendientes.length - 1 && <Box sx={{ my: 1.5 }} />}
                      </Box>
                    ))}
                  </List>
                </Box>
              </Card>
            </Box>

            {/* Detalle del horario seleccionado */}
            <Box>
              {horarioSeleccionado ? (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                  {/* Header con fondo */}
                  <Box sx={{ bgcolor: 'primary.lighter', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}>
                            {horarioSeleccionado.carrera}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip 
                              label={horarioSeleccionado.tipo_examen} 
                              color="primary" 
                              size="medium"
                              sx={{ fontWeight: 600 }}
                            />
                            <Chip 
                              label={ESTADO_LABELS[horarioSeleccionado.estado]} 
                              color="info" 
                              variant="outlined"
                              size="medium"
                            />
                            <Chip 
                              icon={<MdEventNote size={18} />}
                              label={`${horarioSeleccionado.total_examenes} Exámenes`}
                              variant="outlined"
                              size="medium"
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>

                  {/* Botones de acción flotantes */}
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<MdCheckCircle />}
                      onClick={abrirDialogoAprobar}
                      fullWidth
                      sx={{ py: 1.5, fontWeight: 600 }}
                    >
                      Aprobar Horario
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<MdCancel />}
                      onClick={abrirDialogoRechazar}
                      fullWidth
                      sx={{ py: 1.5, fontWeight: 600 }}
                    >
                      Rechazar Horario
                    </Button>
                  </Box>

                  <CardContent sx={{ pt: 3 }}>

                    {/* Información general */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Box sx={{ p: 1, bgcolor: 'primary.lighter', borderRadius: 1, display: 'flex' }}>
                              <MdPerson size={24} color={theme.palette.primary.main} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                              Jefe de Carrera
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontWeight={600} sx={{ ml: 5 }}>
                            {horarioSeleccionado.jefe_carrera}
                          </Typography>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Box sx={{ p: 1, bgcolor: 'info.lighter', borderRadius: 1, display: 'flex' }}>
                              <MdCalendarMonth size={24} color={theme.palette.info.main} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                              Periodo
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontWeight={600} sx={{ ml: 5 }}>
                            {horarioSeleccionado.periodo}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Box sx={{ p: 1, bgcolor: 'primary.lighter', borderRadius: 1, display: 'flex' }}>
                              <MdSchedule size={24} color={theme.palette.primary.main} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                              Fecha de Envío
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontWeight={600} sx={{ ml: 5 }}>
                            {horarioSeleccionado.fecha_envio}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Box sx={{ p: 1, bgcolor: 'success.lighter', borderRadius: 1, display: 'flex' }}>
                              <MdEventNote size={24} color={theme.palette.success.main} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                              Total de Exámenes
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontWeight={600} sx={{ ml: 5 }}>
                            {horarioSeleccionado.total_examenes}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Resumen de Semestres */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Semestres Incluidos
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {horarioSeleccionado.semestres.map((sem) => (
                          <Chip 
                            key={sem}
                            label={`${sem} Semestre`} 
                            color="primary" 
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Resumen de exámenes por semestre */}
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'primary.lighter',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        mb: 2
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Este horario incluye {horarioSeleccionado.total_examenes} exámenes distribuidos en {horarioSeleccionado.semestres.length} semestres.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<MdCalendarMonth />}
                        onClick={() => navigate('/calendario')}
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Ver Horario Completo en Calendario
                      </Button>
                    </Paper>

                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ textAlign: 'center', mb: 2 }}>
                      Revisa el calendario completo antes de aprobar o rechazar el horario
                    </Typography>
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
            </Box>
          </Box>
        </Paper>
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
    </MainLayout>
  );
};

export default Revision;
