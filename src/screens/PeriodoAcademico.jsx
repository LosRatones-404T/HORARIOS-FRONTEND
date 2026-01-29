import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  AlertTitle,
  useTheme,
  Stack,
  Chip,
  Paper,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  MdCalendarMonth,
  MdAdd,
  MdEdit,
  MdWarning,
  MdCheckCircle,
  MdBlock,
  MdError,
  MdSave,
  MdCancel,
} from 'react-icons/md';
import MainLayout from '../components/layout/MainLayout';
import Notification from '../components/common/Notification';
import { periodosApi } from '../services';

/**
 * Estados del período académico
 */
const ESTADO_PERIODO = {
  PLANIFICADO: 'planificado',
  ACTIVO: 'activo',
  FINALIZADO: 'finalizado',
  MODIFICADO: 'modificado',
};

const ESTADO_LABELS = {
  [ESTADO_PERIODO.PLANIFICADO]: 'Planificado',
  [ESTADO_PERIODO.ACTIVO]: 'Activo',
  [ESTADO_PERIODO.FINALIZADO]: 'Finalizado',
  [ESTADO_PERIODO.MODIFICADO]: 'Modificado por Emergencia',
};

const ESTADO_COLORS = {
  [ESTADO_PERIODO.PLANIFICADO]: 'info',
  [ESTADO_PERIODO.ACTIVO]: 'success',
  [ESTADO_PERIODO.FINALIZADO]: 'default',
  [ESTADO_PERIODO.MODIFICADO]: 'warning',
};

/**
 * Tipos de período
 */
const TIPOS_PERIODO = {
  ORDINARIO: 'ordinario',
  EXTRAORDINARIO: 'extraordinario',
  REGULARIZACION: 'regularizacion',
};

const TIPOS_LABELS = {
  [TIPOS_PERIODO.ORDINARIO]: 'Período Ordinario',
  [TIPOS_PERIODO.EXTRAORDINARIO]: 'Período Extraordinario',
  [TIPOS_PERIODO.REGULARIZACION]: 'Período de Regularización',
};

function PeriodoAcademico() {
  const theme = useTheme();
  
  // Estados
  const [periodoActual, setPeriodoActual] = useState(null);
  const [historicoPeriodos, setHistoricoPeriodos] = useState([]);
  const [openDialogNuevo, setOpenDialogNuevo] = useState(false);
  const [openDialogModificar, setOpenDialogModificar] = useState(false);
  const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Formulario de nuevo período
  const [formData, setFormData] = useState({
    clave: '2026A',
    fInicio: '2025-10-01',
    fFin: '2026-02-09',
    // Fechas de parciales - sugerencias automáticas
    primer_parcial_inicio: '2025-10-15',
    primer_parcial_fin: '2025-10-25',
    segundo_parcial_inicio: '2025-11-10',
    segundo_parcial_fin: '2025-11-20',
    tercer_parcial_inicio: '2025-12-05',
    tercer_parcial_fin: '2025-12-15',
    // Fechas de ordinarios y extraordinarios
    ordinario_inicio: '2026-01-15',
    ordinario_fin: '2026-01-25',
    extra1_inicio: '2026-02-01',
    extra1_fin: '2026-02-05',
    extra2_inicio: '2026-02-06',
    extra2_fin: '2026-02-09',
    // Fecha de especial
    especial_inicio: '',
    especial_fin: '',
  });

  // Formulario de modificación
  const [formModificacion, setFormModificacion] = useState({
    nueva_fecha_inicio: '',
    nueva_fecha_fin: '',
    motivo: '',
    tipo_emergencia: 'desastre_natural',
  });

  useEffect(() => {
    cargarPeriodoActual();
    cargarHistorico();
  }, []);

  const cargarPeriodoActual = async () => {
    try {
      setLoading(true);
      const periodo = await periodosApi.obtenerPeriodoActivo();
      setPeriodoActual(periodo);
    } catch (error) {
      console.error('Error al cargar período actual:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarHistorico = async () => {
    try {
      const historico = await periodosApi.obtenerHistorico();
      setHistoricoPeriodos(historico);
    } catch (error) {
      console.error('Error al cargar histórico:', error);
    }
  };

  const handleCrearPeriodo = async () => {
    try {
      setLoading(true);
      await periodosApi.crearPeriodo(formData);
      
      setNotification({
        open: true,
        message: 'Período académico creado exitosamente',
        severity: 'success',
      });
      
      setOpenDialogNuevo(false);
      setFormData({
        clave: '2026A',
        fInicio: '2025-10-01',
        fFin: '2026-02-09',
        primer_parcial_inicio: '2025-10-15',
        primer_parcial_fin: '2025-10-25',
        segundo_parcial_inicio: '2025-11-10',
        segundo_parcial_fin: '2025-11-20',
        tercer_parcial_inicio: '2025-12-05',
        tercer_parcial_fin: '2025-12-15',
        ordinario_inicio: '2026-01-15',
        ordinario_fin: '2026-01-25',
        extra1_inicio: '2026-02-01',
        extra1_fin: '2026-02-05',
        extra2_inicio: '2026-02-06',
        extra2_fin: '2026-02-09',
        especial_inicio: '',
        especial_fin: '',
      });
      
      await cargarPeriodoActual();
      await cargarHistorico();
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Error al crear el período académico',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivarPeriodo = async () => {
    try {
      setLoading(true);
      
      // Validar que todas las fechas de tipos de examen estén dentro del rango del período
      const fInicio = new Date(periodoActual.fInicio);
      const fFin = new Date(periodoActual.fFin);
      
      const fechasExamen = [
        { tipo: 'Primer Parcial', inicio: periodoActual.primer_parcial_inicio, fin: periodoActual.primer_parcial_fin },
        { tipo: 'Segundo Parcial', inicio: periodoActual.segundo_parcial_inicio, fin: periodoActual.segundo_parcial_fin },
        { tipo: 'Tercer Parcial', inicio: periodoActual.tercer_parcial_inicio, fin: periodoActual.tercer_parcial_fin },
        { tipo: 'Ordinario', inicio: periodoActual.ordinario_inicio, fin: periodoActual.ordinario_fin },
        { tipo: 'Extraordinario 1', inicio: periodoActual.extra1_inicio, fin: periodoActual.extra1_fin },
        { tipo: 'Extraordinario 2', inicio: periodoActual.extra2_inicio, fin: periodoActual.extra2_fin },
        { tipo: 'Especial', inicio: periodoActual.especial_inicio, fin: periodoActual.especial_fin },
      ];
      
      for (const fecha of fechasExamen) {
        // Solo validar si las fechas están configuradas
        if (fecha.inicio && fecha.fin) {
          const inicio = new Date(fecha.inicio);
          const fin = new Date(fecha.fin);
          
          if (inicio < fInicio || inicio > fFin) {
            setNotification({
              open: true,
              message: `La fecha de inicio de ${fecha.tipo} (${fecha.inicio}) está fuera del rango del período (${periodoActual.fInicio} - ${periodoActual.fFin})`,
              severity: 'error',
            });
            setLoading(false);
            return;
          }
          
          if (fin < fInicio || fin > fFin) {
            setNotification({
              open: true,
              message: `La fecha de fin de ${fecha.tipo} (${fecha.fin}) está fuera del rango del período (${periodoActual.fInicio} - ${periodoActual.fFin})`,
              severity: 'error',
            });
            setLoading(false);
            return;
          }
        }
      }
      
      await periodosApi.activarPeriodo(periodoActual.id);
      
      setNotification({
        open: true,
        message: 'Período académico activado. Los jefes de carrera ya pueden generar exámenes.',
        severity: 'success',
      });
      
      setOpenDialogConfirmacion(false);
      await cargarPeriodoActual();
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Error al activar el período académico',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModificarPeriodo = async () => {
    try {
      setLoading(true);
      await periodosApi.modificarPeriodo(periodoActual.id, formModificacion);
      
      setNotification({
        open: true,
        message: 'Período académico modificado por situación de emergencia',
        severity: 'warning',
      });
      
      setOpenDialogModificar(false);
      setFormModificacion({
        nueva_fecha_inicio: '',
        nueva_fecha_fin: '',
        motivo: '',
        tipo_emergencia: 'desastre_natural',
      });
      
      await cargarPeriodoActual();
      await cargarHistorico();
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Error al modificar el período académico',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizarPeriodo = async () => {
    try {
      setLoading(true);
      await periodosApi.finalizarPeriodo(periodoActual.id);
      
      setNotification({
        open: true,
        message: 'Período académico finalizado exitosamente',
        severity: 'info',
      });
      
      await cargarPeriodoActual();
      await cargarHistorico();
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Error al finalizar el período académico',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <Box sx={{ py: 4, px: 3 }}>
        {/* Encabezado */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Gestión de Períodos Académicos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Control de períodos de exámenes y generación de horarios
            </Typography>
          </Box>
          
          {!periodoActual && (
            <Button
              variant="contained"
              startIcon={<MdAdd />}
              onClick={() => setOpenDialogNuevo(true)}
              size="large"
            >
              Crear Nuevo Período
            </Button>
          )}
        </Box>

        {/* Período Actual */}
        {periodoActual ? (
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Período Actual
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={ESTADO_LABELS[periodoActual.estado]} 
                    color={ESTADO_COLORS[periodoActual.estado]}
                    size="small"
                  />
                  <Chip 
                    label={periodoActual.clave} 
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Box>

              <Stack direction="row" spacing={1}>
                {periodoActual.estado === ESTADO_PERIODO.PLANIFICADO && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<MdCheckCircle />}
                    onClick={() => setOpenDialogConfirmacion(true)}
                  >
                    Iniciar Período
                  </Button>
                )}
                
                {periodoActual.estado === ESTADO_PERIODO.ACTIVO && (
                  <>
                    <Tooltip title="Modificar por emergencia (requiere justificación)">
                      <Button
                        variant="outlined"
                        color="warning"
                        startIcon={<MdWarning />}
                        onClick={() => setOpenDialogModificar(true)}
                      >
                        Modificar
                      </Button>
                    </Tooltip>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<MdBlock />}
                      onClick={handleFinalizarPeriodo}
                    >
                      Finalizar
                    </Button>
                  </>
                )}
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      FECHA DE INICIO
                    </Typography>
                    <Typography variant="h6">
                      {new Date(periodoActual.fInicio).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      FECHA DE FIN
                    </Typography>
                    <Typography variant="h6">
                      {new Date(periodoActual.fFin).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      CLAVE
                    </Typography>
                    <Typography variant="body1">
                      {periodoActual.clave}
                    </Typography>
                  </Box>

                  {periodoActual.fecha_activacion && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        FECHA DE ACTIVACIÓN
                      </Typography>
                      <Typography variant="body1">
                        {new Date(periodoActual.fecha_activacion).toLocaleString('es-MX')}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {periodoActual.modificaciones && periodoActual.modificaciones.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  <AlertTitle sx={{ fontWeight: 600 }}>Modificaciones por Emergencia</AlertTitle>
                  {periodoActual.modificaciones.map((mod, idx) => (
                    <Box key={idx} sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        <strong>{new Date(mod.fecha).toLocaleString('es-MX')}:</strong> {mod.motivo}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Tipo: {mod.tipo_emergencia} | Usuario: {mod.usuario}
                      </Typography>
                    </Box>
                  ))}
                </Alert>
              </>
            )}
          </Paper>
        ) : (
          <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>No hay período académico activo</AlertTitle>
            Los jefes de carrera no podrán generar exámenes hasta que se cree e inicie un período académico.
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<MdAdd />}
                onClick={() => setOpenDialogNuevo(true)}
              >
                Crear Período
              </Button>
            </Box>
          </Alert>
        )}

        {/* Histórico de Períodos */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Histórico de Períodos
          </Typography>
        </Box>

        {historicoPeriodos.length > 0 ? (
          <Grid container spacing={2}>
            {historicoPeriodos.map((periodo) => (
              <Grid item xs={12} md={6} key={periodo.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        label={ESTADO_LABELS[periodo.estado]} 
                        color={ESTADO_COLORS[periodo.estado]}
                        size="small"
                      />
                      <Chip 
                        label={periodo.clave} 
                        variant="outlined"
                        size="small"
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {new Date(periodo.fInicio).toLocaleDateString('es-MX')} - {new Date(periodo.fFin).toLocaleDateString('es-MX')}
                    </Typography>

                    {periodo.examenes_generados > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        {periodo.examenes_generados} exámenes generados
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No hay períodos académicos en el histórico
          </Alert>
        )}

        {/* Dialog: Crear Nuevo Período */}
        <Dialog 
          open={openDialogNuevo} 
          onClose={() => setOpenDialogNuevo(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MdCalendarMonth size={24} />
              <Typography variant="h6" fontWeight={600}>
                Crear Nuevo Período Académico
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Clave del Período"
                value={formData.clave}
                onChange={(e) => setFormData({ ...formData, clave: e.target.value })}
                placeholder="Ej: 2026A, 2026B, 2025C"
                fullWidth
                required
                disabled
                helperText="Identificador único del período (generado automáticamente)"
              />

              <TextField
                label="Fecha de Inicio"
                type="date"
                value={formData.fInicio}
                onChange={(e) => setFormData({ ...formData, fInicio: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                disabled
                helperText="Fecha proporcionada por el sistema"
              />

              <TextField
                label="Fecha de Fin"
                type="date"
                value={formData.fFin}
                onChange={(e) => setFormData({ ...formData, fFin: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                disabled
                helperText="Fecha proporcionada por el sistema"
              />

              <Divider sx={{ my: 2 }}>
                <Chip label="Fechas de Tipos de Examen" size="small" />
              </Divider>

              {/* Primer Parcial */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Primer Parcial
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.primer_parcial_inicio}
                  onChange={(e) => setFormData({ ...formData, primer_parcial_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.primer_parcial_fin}
                  onChange={(e) => setFormData({ ...formData, primer_parcial_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Segundo Parcial */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Segundo Parcial
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.segundo_parcial_inicio}
                  onChange={(e) => setFormData({ ...formData, segundo_parcial_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.segundo_parcial_fin}
                  onChange={(e) => setFormData({ ...formData, segundo_parcial_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Tercer Parcial */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Tercer Parcial
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.tercer_parcial_inicio}
                  onChange={(e) => setFormData({ ...formData, tercer_parcial_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.tercer_parcial_fin}
                  onChange={(e) => setFormData({ ...formData, tercer_parcial_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Ordinario */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Ordinario
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.ordinario_inicio}
                  onChange={(e) => setFormData({ ...formData, ordinario_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.ordinario_fin}
                  onChange={(e) => setFormData({ ...formData, ordinario_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Extraordinario 1 */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Extraordinario 1
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.extra1_inicio}
                  onChange={(e) => setFormData({ ...formData, extra1_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.extra1_fin}
                  onChange={(e) => setFormData({ ...formData, extra1_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Extraordinario 2 */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Extraordinario 2
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.extra2_inicio}
                  onChange={(e) => setFormData({ ...formData, extra2_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.extra2_fin}
                  onChange={(e) => setFormData({ ...formData, extra2_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              {/* Especial */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Especial
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Inicio"
                  type="date"
                  value={formData.especial_inicio}
                  onChange={(e) => setFormData({ ...formData, especial_inicio: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Fin"
                  type="date"
                  value={formData.especial_fin}
                  onChange={(e) => setFormData({ ...formData, especial_fin: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>

              <Alert severity="info" sx={{ borderRadius: 2 }}>
                El período se creará en estado <strong>Planificado</strong>. Deberás iniciarlo manualmente para que los jefes de carrera puedan generar exámenes.
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenDialogNuevo(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              variant="contained" 
              onClick={handleCrearPeriodo}
              disabled={loading || !formData.clave || !formData.fInicio || !formData.fFin}
              startIcon={<MdSave />}
            >
              {loading ? 'Creando...' : 'Crear Período'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Confirmación de Inicio */}
        <Dialog 
          open={openDialogConfirmacion} 
          onClose={() => setOpenDialogConfirmacion(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MdCheckCircle size={24} color={theme.palette.success.main} />
              <Typography variant="h6" fontWeight={600}>
                Iniciar Período Académico
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ borderRadius: 2, mb: 2 }}>
              <AlertTitle sx={{ fontWeight: 600 }}>¿Estás seguro?</AlertTitle>
              Al iniciar el período académico:
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Los jefes de carrera podrán generar exámenes</li>
                <li>El período no se podrá modificar fácilmente</li>
                <li>Solo se permitirán modificaciones por situaciones de emergencia</li>
              </ul>
            </Alert>

            {periodoActual && (
              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Clave:</strong> {periodoActual.clave}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Inicio:</strong> {new Date(periodoActual.fInicio).toLocaleDateString('es-MX')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fin:</strong> {new Date(periodoActual.fFin).toLocaleDateString('es-MX')}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenDialogConfirmacion(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              variant="contained"
              color="success"
              onClick={handleActivarPeriodo}
              disabled={loading}
              startIcon={<MdCheckCircle />}
            >
              {loading ? 'Iniciando...' : 'Sí, Iniciar Período'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Modificar Período por Emergencia */}
        <Dialog 
          open={openDialogModificar} 
          onClose={() => setOpenDialogModificar(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MdWarning size={24} color={theme.palette.warning.main} />
              <Typography variant="h6" fontWeight={600}>
                Modificar Período por Emergencia
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 600 }}>Atención</AlertTitle>
                Esta opción debe usarse únicamente para situaciones de emergencia como desastres naturales, contingencias sanitarias, etc.
              </Alert>

              <FormControl fullWidth>
                <InputLabel>Tipo de Emergencia</InputLabel>
                <Select
                  value={formModificacion.tipo_emergencia}
                  onChange={(e) => setFormModificacion({ ...formModificacion, tipo_emergencia: e.target.value })}
                  label="Tipo de Emergencia"
                >
                  <MenuItem value="desastre_natural">Desastre Natural</MenuItem>
                  <MenuItem value="contingencia_sanitaria">Contingencia Sanitaria</MenuItem>
                  <MenuItem value="situacion_social">Situación Social</MenuItem>
                  <MenuItem value="falla_tecnica">Falla Técnica Mayor</MenuItem>
                  <MenuItem value="otra">Otra Emergencia</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Motivo de la Modificación"
                multiline
                rows={4}
                value={formModificacion.motivo}
                onChange={(e) => setFormModificacion({ ...formModificacion, motivo: e.target.value })}
                placeholder="Describe detalladamente la situación que requiere modificar el período..."
                fullWidth
                required
              />

              <TextField
                label="Nueva Fecha de Inicio (opcional)"
                type="date"
                value={formModificacion.nueva_fecha_inicio}
                onChange={(e) => setFormModificacion({ ...formModificacion, nueva_fecha_inicio: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                helperText="Deja vacío si no deseas modificar la fecha de inicio"
              />

              <TextField
                label="Nueva Fecha de Fin (opcional)"
                type="date"
                value={formModificacion.nueva_fecha_fin}
                onChange={(e) => setFormModificacion({ ...formModificacion, nueva_fecha_fin: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                helperText="Deja vacío si no deseas modificar la fecha de fin"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenDialogModificar(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              variant="contained"
              color="warning"
              onClick={handleModificarPeriodo}
              disabled={loading || !formModificacion.motivo}
              startIcon={<MdWarning />}
            >
              {loading ? 'Modificando...' : 'Aplicar Modificación'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notificación */}
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        />
      </Box>
    </MainLayout>
  );
}

export default PeriodoAcademico;
