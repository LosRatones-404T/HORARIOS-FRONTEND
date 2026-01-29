import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  useTheme,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  AlertTitle,
  Paper,
  Stack,
  Divider,
  Grid
} from '@mui/material';
import { 
  MdSchedule, 
  MdCalendarMonth,
  MdClass,
  MdEventNote,
  MdBlock,
  MdAutoAwesome
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ESTADOS, ESTADO_LABELS, ESTADO_COLORS } from '../../constants/estadosExamen';
import { periodosApi } from '../../services';
import { getCurrentUser } from '../../store/authStore';

const JefeHome = ({ estadoExamen, logsRecientes }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Estado del período académico
  const [periodoActivo, setPeriodoActivo] = useState(null);
  const [loadingPeriodo, setLoadingPeriodo] = useState(true);

  useEffect(() => {
    validarPeriodoActivo();
  }, []);

  const validarPeriodoActivo = async () => {
    try {
      setLoadingPeriodo(true);
      const periodo = await periodosApi.obtenerPeriodoActivo();
      setPeriodoActivo(periodo);
    } catch (error) {
      console.error('Error al validar período:', error);
    } finally {
      setLoadingPeriodo(false);
    }
  };

  // Determinar si se puede generar exámenes
  const puedeGenerarExamenes = periodoActivo && periodoActivo.estado === 'activo';

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Bienvenido, {currentUser?.name || currentUser?.username || 'Jefe de Carrera'}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Panel de control - Gestión de exámenes
        </Typography>
      </Box>

      {/* Alerta de período inactivo */}
      {!loadingPeriodo && !puedeGenerarExamenes && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} icon={<MdBlock />}>
          <AlertTitle sx={{ fontWeight: 600 }}>Generación de Exámenes No Disponible</AlertTitle>
          {!periodoActivo ? (
            'No hay un período académico activo. Servicios Escolares debe configurar e iniciar un período académico para habilitar la generación de exámenes.'
          ) : (
            `El período académico está en estado "${periodoActivo.estado}". Solo puedes generar exámenes cuando el período esté activo.`
          )}
        </Alert>
      )}

      {/* Retroalimentación si fue rechazado */}
      {estadoExamen.existe && estadoExamen.estado === ESTADOS.RECHAZADO && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          <AlertTitle sx={{ fontWeight: 600 }}>Horario Rechazado</AlertTitle>
          El horario generado fue rechazado. Revisa los comentarios y genera un nuevo horario.
          {estadoExamen.retroalimentacion && (
            <Box sx={{ mt: 1, p: 1.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                Retroalimentación:
              </Typography>
              <Typography variant="body2">{estadoExamen.retroalimentacion}</Typography>
            </Box>
          )}
        </Alert>
      )}

      {/* Botón Grande de Acceso Rápido - Generar */}
      {puedeGenerarExamenes && (
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/generar')}
            startIcon={<MdAutoAwesome size={28} />}
            sx={{
              py: 3,
              px: 5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Generar Calendario de Exámenes
          </Button>
        </Box>
      )}

      {/* Tarjetas de Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdEventNote size={40} color={theme.palette.primary.main} />
                <Chip 
                  label={estadoExamen.tipo_examen} 
                  size="small" 
                  color="primary"
                />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {estadoExamen.total_examenes}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Exámenes Generados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdSchedule size={40} color={theme.palette.warning.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {ESTADO_LABELS[estadoExamen.estado]}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Estado Actual
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MdCalendarMonth size={40} color={theme.palette.info.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {estadoExamen.periodo}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Periodo Actual
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MdClass size={40} color={theme.palette.success.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                5
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Semestres Activos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Card de Estado Aprobado con Observaciones */}
      {estadoExamen.existe && estadoExamen.estado === ESTADOS.APROBADO && estadoExamen.observaciones && (
        <Card 
          elevation={0} 
          sx={{ 
            mb: 4, 
            border: '2px solid', 
            borderColor: 'success.main', 
            borderRadius: 2,
            bgcolor: 'rgba(46, 125, 50, 0.04)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{ 
                  p: 1.5, 
                  bgcolor: 'success.main', 
                  borderRadius: 2, 
                  display: 'flex',
                  mr: 2 
                }}
              >
                <MdEventNote size={28} color="#fff" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark' }}>
                  Horario Aprobado - {estadoExamen.tipo_examen}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de aprobación: {estadoExamen.fecha_aprobacion}
                </Typography>
              </Box>
              <Chip 
                label="Aprobado" 
                color="success" 
                sx={{ fontWeight: 600 }}
              />
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.dark', mb: 1 }}>
              Observaciones y Sugerencias de Servicios Escolares:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                whiteSpace: 'pre-line',
                color: 'text.primary',
                lineHeight: 1.6,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              {estadoExamen.observaciones}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Actividad Reciente */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Actividad Reciente
          </Typography>
          <Stack spacing={2}>
            {logsRecientes.map((log, index) => (
              <Box key={log.id}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: `${ESTADO_COLORS[log.estado]}.main`,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {log.accion}
                    </Typography>
                    <Chip 
                      label={ESTADO_LABELS[log.estado]} 
                      color={ESTADO_COLORS[log.estado]}
                      size="small"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {log.usuario}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {log.fecha}
                  </Typography>
                </Paper>
                {index < logsRecientes.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Stack>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button 
              variant="text" 
              onClick={() => navigate('/generar')}
              sx={{ textTransform: 'none' }}
            >
              Ver historial completo
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JefeHome;
