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
  Chip,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  AlertTitle,
  TextField,
  useTheme,
  Divider,
  Stack,
} from '@mui/material';
import { 
  MdCheckCircle, 
  MdError, 
  MdSchedule, 
  MdSend,
  MdAutorenew,
  MdSettings,
  MdCalendarMonth,
  MdWarning,
  MdBlock,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Notification from '../components/common/Notification';
import { periodosApi } from '../services';

/**
 * Estados del horario generado
 */
const ESTADOS = {
  BORRADOR: 'borrador',
  ENVIADO: 'enviado',
  EN_REVISION: 'en_revision',
  REVISADO: 'revisado',
  APROBADO: 'aprobado',
  RECHAZADO: 'rechazado',
};

const ESTADO_LABELS = {
  [ESTADOS.BORRADOR]: 'Borrador',
  [ESTADOS.ENVIADO]: 'Enviado',
  [ESTADOS.EN_REVISION]: 'En Revisión',
  [ESTADOS.REVISADO]: 'Revisado',
  [ESTADOS.APROBADO]: 'Aprobado',
  [ESTADOS.RECHAZADO]: 'Rechazado',
};

const ESTADO_COLORS = {
  [ESTADOS.BORRADOR]: 'default',
  [ESTADOS.ENVIADO]: 'info',
  [ESTADOS.EN_REVISION]: 'warning',
  [ESTADOS.REVISADO]: 'primary',
  [ESTADOS.APROBADO]: 'success',
  [ESTADOS.RECHAZADO]: 'error',
};

function Generar() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Estados
  const [horarioGenerado, setHorarioGenerado] = useState(null);
  const [estadoActual, setEstadoActual] = useState(null);
  const [openDialogGenerar, setOpenDialogGenerar] = useState(false);
  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);
  const [openDialogVerificarPreferencias, setOpenDialogVerificarPreferencias] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Estado del período académico
  const [periodoActivo, setPeriodoActivo] = useState(null);
  const [loadingPeriodo, setLoadingPeriodo] = useState(true);
  
  // Estados para control de flujo de trabajo
  const [preferenciasConfiguradas, setPreferenciasConfiguradas] = useState(false);
  const [calendarioGenerado, setCalendarioGenerado] = useState(false);
  const [calendarioEnviado, setCalendarioEnviado] = useState(false);

  useEffect(() => {
    validarPeriodoActivo();
    // Cargar estado de localStorage
    const enviado = localStorage.getItem('calendarioEnviado') === 'true';
    const generado = localStorage.getItem('calendarioGenerado') === 'true';
    const horarioGuardado = localStorage.getItem('horarioGenerado');
    const estadoGuardado = localStorage.getItem('estadoActual');
    
    if (enviado) {
      setCalendarioEnviado(true);
    }
    if (generado) {
      setCalendarioGenerado(true);
    }
    if (horarioGuardado) {
      try {
        setHorarioGenerado(JSON.parse(horarioGuardado));
      } catch (error) {
        console.error('Error al cargar horario:', error);
      }
    }
    if (estadoGuardado) {
      setEstadoActual(estadoGuardado);
    }
  }, []);

  const validarPeriodoActivo = async () => {
    try {
      setLoadingPeriodo(true);
      const periodo = await periodosApi.obtenerPeriodoActivo();
      setPeriodoActivo(periodo);
      
      // Si no hay período activo, mostrar notificación
      if (!periodo || periodo.estado !== 'activo') {
        setNotification({
          open: true,
          message: 'No hay un período académico activo. No puedes generar exámenes.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error al validar período:', error);
    } finally {
      setLoadingPeriodo(false);
    }
  };

  // Determinar si se puede generar exámenes
  const puedeGenerarExamenes = periodoActivo && periodoActivo.estado === 'activo';

  useEffect(() => {
    // Simular que las preferencias ya están configuradas (esto vendría del backend)
    setPreferenciasConfiguradas(true);
  }, []);

  // Log de cambios (mock data - vendrá del backend)
  const [logCambios] = useState([
    {
      id: 1,
      fecha: '2026-01-11 10:30',
      usuario: 'Dr. Juan Pérez (Jefe)',
      accion: 'Horario generado',
      estado: ESTADOS.BORRADOR,
      comentario: 'Primera generación del periodo'
    },
    {
      id: 2,
      fecha: '2026-01-11 11:15',
      usuario: 'Dr. Juan Pérez (Jefe)',
      accion: 'Horario enviado',
      estado: ESTADOS.ENVIADO,
      comentario: 'Enviado a revisión administrativa'
    },
    {
      id: 3,
      fecha: '2026-01-11 14:20',
      usuario: 'Mtra. Ana López (Secretaria)',
      accion: 'En revisión',
      estado: ESTADOS.EN_REVISION,
      comentario: 'Iniciada revisión de conflictos'
    },
  ]);

  // Manejar generación de calendarios
  const handleConfirmarGeneracion = async () => {
    if (!puedeGenerarExamenes) {
      setNotification({
        open: true,
        message: 'No hay un período académico activo',
        severity: 'error'
      });
      return;
    }

    setGenerando(true);
    
    // Simular llamada al backend
    setTimeout(() => {
      const nuevoHorario = {
        id: 1,
        periodo: periodoActivo.descripcion || `Período ${periodoActivo.tipo} - 2026`,
        fecha_generacion: new Date().toISOString(),
        total_examenes: 25,
        periodo_id: periodoActivo.id,
      };
      setHorarioGenerado(nuevoHorario);
      setEstadoActual(ESTADOS.BORRADOR);
      setCalendarioGenerado(true);
      setCalendarioEnviado(false);
      // Guardar en localStorage para persistir entre navegaciones
      localStorage.setItem('calendarioGenerado', 'true');
      localStorage.setItem('horarioGenerado', JSON.stringify(nuevoHorario));
      localStorage.setItem('estadoActual', ESTADOS.BORRADOR);
      // Limpiar el estado de enviado cuando se genera un nuevo calendario
      localStorage.removeItem('calendarioEnviado');
      setOpenDialogGenerar(false);
      setOpenDialogVerificarPreferencias(false);
      setGenerando(false);
      setNotification({
        open: true,
        message: 'Horario generado exitosamente. Revisa el calendario y envía a revisión.',
        severity: 'success'
      });
    }, 2500);
  };

  // Abrir diálogo para verificar preferencias antes de generar
  const handleClickGenerar = () => {
    if (!preferenciasConfiguradas) {
      setNotification({
        open: true,
        message: 'Por favor, configura tus preferencias antes de generar',
        severity: 'warning'
      });
      return;
    }
    setOpenDialogVerificarPreferencias(true);
  };

  // Enviar a revisión
  const handleEnviarRevision = () => {
    setEnviando(true);
    
    setTimeout(() => {
      setEstadoActual(ESTADOS.ENVIADO);
      setCalendarioEnviado(true);
      // Guardar en localStorage para que Calendario.jsx pueda acceder
      localStorage.setItem('calendarioEnviado', 'true');
      localStorage.setItem('estadoActual', ESTADOS.ENVIADO);
      setOpenDialogEnviar(false);
      setEnviando(false);
      setNotification({
        open: true,
        message: 'Horario enviado a revisión administrativa',
        severity: 'success'
      });
    }, 1500);
  };

  // Obtener paso actual del stepper
  const getActiveStep = () => {
    const steps = [
      ESTADOS.BORRADOR,
      ESTADOS.ENVIADO,
      ESTADOS.EN_REVISION,
      ESTADOS.REVISADO,
      ESTADOS.APROBADO,
    ];
    return steps.indexOf(estadoActual);
  };

  return (
    <MainLayout showSidebar={true}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', py: 4, px: 2 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Generar Calendarios de Exámenes
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary 
            }}
          >
            Administra la generación y revisión de calendarios de exámenes del periodo actual
          </Typography>
        </Box>

        {/* Alerta de período inactivo */}
        {!loadingPeriodo && !puedeGenerarExamenes && (
          <Alert 
            severity="error" 
            sx={{ mb: 4, borderRadius: 2 }}
            icon={<MdBlock />}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Generación de Exámenes No Disponible
            </Typography>
            {!periodoActivo ? (
              <Typography variant="body2">
                No hay un período académico activo. Contacta a Servicios Escolares para que configure e inicie un período académico.
              </Typography>
            ) : (
              <Typography variant="body2">
                El período académico está en estado &quot;{periodoActivo.estado}&quot;. Solo puedes generar exámenes cuando el período esté activo.
              </Typography>
            )}
          </Alert>
        )}

        {/* Info del período activo */}
        {!loadingPeriodo && puedeGenerarExamenes && (
          <Alert 
            severity="info" 
            sx={{ mb: 4, borderRadius: 2 }}
            icon={<MdCalendarMonth />}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Período Académico Activo
            </Typography>
            <Typography variant="body2">
              {periodoActivo.descripcion || `Período ${periodoActivo.tipo}`} | 
              Desde {new Date(periodoActivo.fecha_inicio).toLocaleDateString('es-MX')} hasta {new Date(periodoActivo.fecha_fin).toLocaleDateString('es-MX')}
            </Typography>
          </Alert>
        )}

        {/* Navegación por pasos (Breadcrumbs) */}
        <Card elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <CardContent>
            <Stepper 
              activeStep={calendarioGenerado ? (calendarioEnviado ? 2 : 1) : 0}
              alternativeLabel
              sx={{ 
                '& .MuiStep-root': {
                  p: 1.5,
                  borderRadius: 2,
                },
                '& .MuiStepLabel-root': {
                  cursor: 'pointer'
                }
              }}
            >
              {/* Paso 1: Preferencias */}
              <Step 
                onClick={() => !calendarioGenerado && navigate('/preferencias')}
                sx={{ 
                  cursor: !calendarioGenerado ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  '&:hover': !calendarioGenerado ? {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                  } : {}
                }}
              >
                <StepLabel 
                  StepIconComponent={() => (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: preferenciasConfiguradas && !calendarioGenerado ? 'primary.main' : calendarioGenerado ? 'grey.400' : 'grey.300',
                      color: 'white',
                      transition: 'all 0.2s',
                      boxShadow: preferenciasConfiguradas && !calendarioGenerado ? 2 : 0,
                      opacity: calendarioGenerado ? 0.5 : 1,
                      '&:hover': !calendarioGenerado ? {
                        boxShadow: 3,
                        transform: 'scale(1.1)',
                      } : {}
                    }}>
                      <MdSettings size={26} />
                    </Box>
                  )}
                >
                  <Typography sx={{ 
                    fontWeight: preferenciasConfiguradas && !calendarioGenerado ? 700 : 500, 
                    mt: 1,
                    opacity: calendarioGenerado ? 0.5 : 1
                  }}>
                    Configurar Preferencias
                  </Typography>
                </StepLabel>
              </Step>

              {/* Paso 2: Generar */}
              <Step 
                onClick={() => !calendarioGenerado && handleClickGenerar()}
                sx={{ 
                  cursor: !calendarioGenerado && preferenciasConfiguradas ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  '&:hover': !calendarioGenerado && preferenciasConfiguradas ? {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                  } : {}
                }}
              >
                <StepLabel
                  StepIconComponent={() => (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: calendarioGenerado ? 'primary.main' : 'grey.300',
                      color: 'white',
                      transition: 'all 0.2s',
                      boxShadow: calendarioGenerado ? 2 : 0,
                      '&:hover': !calendarioGenerado && preferenciasConfiguradas ? {
                        boxShadow: 3,
                        transform: 'scale(1.1)',
                      } : {}
                    }}>
                      <MdAutorenew size={26} />
                    </Box>
                  )}
                >
                  <Typography sx={{ 
                    fontWeight: calendarioGenerado ? 700 : 500, 
                    mt: 1
                  }}>
                    Generar Calendarios
                  </Typography>
                </StepLabel>
              </Step>

              {/* Paso 3: Ver Calendarios */}
              <Step 
                onClick={() => calendarioGenerado && navigate('/calendario')}
                sx={{ 
                  cursor: calendarioGenerado ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  '&:hover': calendarioGenerado ? {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                  } : {}
                }}
              >
                <StepLabel
                  StepIconComponent={() => (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: calendarioEnviado ? 'success.main' : calendarioGenerado ? 'warning.main' : 'grey.300',
                      color: 'white',
                      opacity: calendarioGenerado ? 1 : 0.5,
                      transition: 'all 0.2s',
                      boxShadow: calendarioGenerado ? 2 : 0,
                      '&:hover': calendarioGenerado ? {
                        boxShadow: 3,
                        transform: 'scale(1.1)',
                      } : {}
                    }}>
                      <MdCalendarMonth size={26} />
                    </Box>
                  )}
                >
                  <Typography sx={{ 
                    fontWeight: calendarioGenerado ? 700 : 500, 
                    mt: 1,
                    opacity: calendarioGenerado ? 1 : 0.5
                  }}>
                    Ver Calendarios
                  </Typography>
                </StepLabel>
              </Step>
            </Stepper>
          </CardContent>
        </Card>

        {/* Estado actual */}
        {horarioGenerado && (
          <>
            <Card elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Estado del Horario
                  </Typography>
                  <Chip 
                    label={ESTADO_LABELS[estadoActual]} 
                    color={ESTADO_COLORS[estadoActual]}
                    icon={estadoActual === ESTADOS.APROBADO ? <MdCheckCircle /> : <MdSchedule />}
                  />
                </Box>

                {/* Stepper de progreso */}
                <Stepper activeStep={getActiveStep()} alternativeLabel sx={{ mb: 3 }}>
                  <Step>
                    <StepLabel>Borrador</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Enviado</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>En Revisión</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Revisado</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Aprobado</StepLabel>
                  </Step>
                </Stepper>

                {/* Información del horario */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Periodo</Typography>
                    <Typography variant="body1" fontWeight={600}>{horarioGenerado.periodo}</Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Fecha Generación</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {new Date(horarioGenerado.fecha_generacion).toLocaleDateString('es-MX')}
                    </Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Total Exámenes</Typography>
                    <Typography variant="body1" fontWeight={600}>{horarioGenerado.total_examenes}</Typography>
                  </Paper>
                </Box>

                {/* Acción según estado */}
                {estadoActual === ESTADOS.BORRADOR && (
                  <Button
                    variant="contained"
                    startIcon={<MdSend />}
                    onClick={() => setOpenDialogEnviar(true)}
                    fullWidth
                  >
                    Enviar a Revisión
                  </Button>
                )}

                {estadoActual === ESTADOS.RECHAZADO && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    El horario fue rechazado. Revisa la retroalimentación en el log de cambios y genera un nuevo horario.
                  </Alert>
                )}

                {estadoActual === ESTADOS.APROBADO && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Horario aprobado y publicado. Los estudiantes pueden consultar sus exámenes.
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Log de cambios */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Historial de Cambios
                </Typography>
                
                <Stack spacing={2}>
                  {logCambios.map((log, index) => (
                    <Paper 
                      key={log.id} 
                      elevation={0} 
                      sx={{ 
                        p: 2.5,
                        borderLeft: `4px solid`,
                        borderLeftColor: `${ESTADO_COLORS[log.estado]}.main`,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {log.accion}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {log.usuario}
                          </Typography>
                        </Box>
                        <Chip 
                          label={ESTADO_LABELS[log.estado]} 
                          color={ESTADO_COLORS[log.estado]}
                          size="small"
                          sx={{ ml: 2 }}
                        />
                      </Box>
                      {log.comentario && (
                        <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
                          {log.comentario}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                        {log.fecha}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </>
        )}

        {/* Mensaje cuando no hay horario generado */}
        {!horarioGenerado && (
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <MdSchedule size={64} color={theme.palette.text.secondary} />
              </Box>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                No hay calendarios generados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configura tus preferencias de exámenes y genera el calendario para el periodo actual
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Dialog: Confirmar generación */}
        <Dialog 
          open={openDialogGenerar} 
          onClose={() => !generando && setOpenDialogGenerar(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MdWarning size={24} color={theme.palette.warning.main} />
              Confirmar Generación
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" paragraph>
              Se generará automáticamente el calendario de exámenes basado en tus preferencias configuradas.
            </Typography>
            <Typography variant="body2">
              ¿Deseas continuar?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setOpenDialogGenerar(false)} disabled={generando}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmarGeneracion} 
              variant="contained"
              disabled={generando}
              startIcon={generando ? <MdAutorenew className="spin" /> : <MdCheckCircle />}
            >
              {generando ? 'Generando...' : 'Sí, Generar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Verificar Preferencias antes de Generar */}
        <Dialog 
          open={openDialogVerificarPreferencias} 
          onClose={() => !generando && setOpenDialogVerificarPreferencias(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MdWarning size={24} color={theme.palette.warning.main} />
              Verificar Preferencias
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
              <AlertTitle sx={{ fontWeight: 600 }}>¡Importante!</AlertTitle>
              Antes de generar el calendario, asegúrate de que tus preferencias estén correctamente configuradas.
            </Alert>
            <Typography variant="body2" paragraph>
              Una vez que generes el calendario:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>
                <Typography variant="body2">
                  No podrás modificar las preferencias hasta que se complete el proceso
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  El calendario se generará automáticamente para todos los semestres
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Podrás revisar y enviar el calendario a revisión
                </Typography>
              </li>
            </Box>
            <Typography variant="body2" fontWeight={600}>
              ¿Tus preferencias están correctamente configuradas?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button 
              onClick={() => {
                setOpenDialogVerificarPreferencias(false);
                navigate('/preferencias');
              }} 
              disabled={generando}
              variant="outlined"
            >
              Revisar Preferencias
            </Button>
            <Button 
              onClick={() => {
                setOpenDialogVerificarPreferencias(false);
                setOpenDialogGenerar(true);
              }} 
              variant="contained"
              disabled={generando}
              startIcon={<MdCheckCircle />}
            >
              Sí, Continuar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Enviar a revisión */}
        <Dialog 
          open={openDialogEnviar} 
          onClose={() => !enviando && setOpenDialogEnviar(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle>Enviar a Revisión</DialogTitle>
          <DialogContent>
            <Typography variant="body2" paragraph>
              El horario será enviado al área administrativa para su revisión. Una vez enviado, no podrás modificarlo hasta que sea aprobado o rechazado.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Comentarios (opcional)"
              placeholder="Agrega comentarios para los revisores..."
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setOpenDialogEnviar(false)} disabled={enviando}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEnviarRevision} 
              variant="contained"
              disabled={enviando}
              startIcon={enviando ? <MdAutorenew className="spin" /> : <MdSend />}
            >
              {enviando ? 'Enviando...' : 'Enviar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notificaciones */}
        <Notification 
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        />
      </Box>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </MainLayout>
  );
}

export default Generar;
