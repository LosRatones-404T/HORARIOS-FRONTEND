import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
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
  MdCheckCircle, 
  MdError, 
  MdSchedule, 
  MdCalendarMonth,
  MdClass,
  MdEventNote
} from 'react-icons/md';
import { useNavigate, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { getCurrentUser } from '../store/authStore';

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

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Estado del examen actual (mock - vendrá del backend)
  const [estadoExamen, setEstadoExamen] = useState({
    existe: true,
    estado: ESTADOS.APROBADO,
    tipo_examen: 'Parcial 1',
    periodo: 'Periodo 1 - 2026',
    fecha_generacion: '2026-01-11',
    total_examenes: 25,
    fecha_aprobacion: '2026-01-11',
    retroalimentacion: null
  });

  // Logs recientes (mock - vendrán del backend)
  const [logsRecientes, setLogsRecientes] = useState([
    {
      id: 1,
      fecha: '2026-01-11 16:45',
      usuario: 'Dir. Carlos Mendoza',
      accion: 'Horario aprobado',
      estado: ESTADOS.APROBADO,
    },
    {
      id: 2,
      fecha: '2026-01-11 15:30',
      usuario: 'Mtra. Ana López',
      accion: 'Horario revisado',
      estado: ESTADOS.REVISADO,
    },
    {
      id: 3,
      fecha: '2026-01-11 14:20',
      usuario: 'Mtra. Ana López',
      accion: 'En revisión',
      estado: ESTADOS.EN_REVISION,
    },
  ]);

  // Renderizado para Jefe de Carrera
  const renderJefeHome = () => (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Bienvenido, {user?.name || 'Jefe de Carrera'}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Panel de control - Gestión de exámenes
        </Typography>
      </Box>

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

      {/* Estado Aprobado */}
      {estadoExamen.existe && estadoExamen.estado === ESTADOS.APROBADO && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          <AlertTitle sx={{ fontWeight: 600 }}>Horario Aprobado</AlertTitle>
          El horario de {estadoExamen.tipo_examen} ha sido aprobado y publicado.
        </Alert>
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

  // Renderizado para Admin
  const renderAdminHome = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Panel de Administración
      </Typography>
      <Alert severity="info">
        Vista de administrador en desarrollo...
      </Alert>
    </Container>
  );

  // Renderizado para Secretaria
  const renderSecretariaHome = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Panel de Secretaría
      </Typography>
      <Alert severity="info">
        Vista de secretaria en desarrollo...
      </Alert>
    </Container>
  );

  // Renderizar según el rol
  const renderContent = () => {
    switch (user?.role) {
      case 'jefe':
        return renderJefeHome();
      case 'admin':
        return renderAdminHome();
      case 'secretaria':
        return renderSecretariaHome();
      default:
        return renderJefeHome();
    }
  };

  return (
    <MainLayout showSidebar={true}>
      {renderContent()}
    </MainLayout>
  );
}

export default Home;