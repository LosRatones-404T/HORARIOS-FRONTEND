import { useState, useEffect } from 'react';
import { 
  Box,
  Typography, 
  Card,
  CardContent,
  Grid,
  Button,
  useTheme,
  Stack,
  Chip,
  Alert,
  AlertTitle,
} from '@mui/material';
import { 
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdRateReview,
  MdCalendarMonth,
  MdSettings 
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { periodosApi } from '../../services';

const SecretariaHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO: Obtener datos reales del backend
  const pendientesRevision = 3;
  const revisadosHoy = 2;
  const totalRevisados = 15;

  // Estado del período académico
  const [periodoActual, setPeriodoActual] = useState(null);
  const [loadingPeriodo, setLoadingPeriodo] = useState(true);

  useEffect(() => {
    cargarPeriodoActivo();
  }, []);

  const cargarPeriodoActivo = async () => {
    try {
      setLoadingPeriodo(true);
      const periodo = await periodosApi.obtenerPeriodoActivo();
      setPeriodoActual(periodo);
    } catch (error) {
      console.error('Error al cargar período:', error);
    } finally {
      setLoadingPeriodo(false);
    }
  };

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Bienvenido, Servicios Escolares
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Panel de control - Revisión de horarios de exámenes
        </Typography>
      </Box>

      {/* Alerta de Período Académico */}
      {!loadingPeriodo && !periodoActual && (
        <Alert 
          severity="error" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => navigate('/periodo-academico')}
            >
              Configurar
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 600 }}>No hay período académico activo</AlertTitle>
          Los jefes de carrera no pueden generar exámenes sin un período académico activo. 
          Configura uno ahora.
        </Alert>
      )}

      {!loadingPeriodo && periodoActual && periodoActual.estado === 'planificado' && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => navigate('/periodo-academico')}
            >
              Iniciar
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 600 }}>Período Académico Planificado</AlertTitle>
          Hay un período académico creado pero aún no ha sido iniciado. 
          Los jefes de carrera no podrán generar exámenes hasta que se inicie.
        </Alert>
      )}

      {/* Alert de pendientes */}
      {pendientesRevision > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => navigate('/revision')}
            >
              Ver ahora
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 600 }}>Horarios Pendientes de Revisión</AlertTitle>
          Tienes {pendientesRevision} {pendientesRevision === 1 ? 'horario pendiente' : 'horarios pendientes'} de revisar.
        </Alert>
      )}

      {/* Tarjetas de Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card 
            elevation={0} 
            sx={{ 
              border: '2px solid', 
              borderColor: pendientesRevision > 0 ? 'warning.main' : 'divider', 
              borderRadius: 2, 
              width: '100%', 
              minWidth: 220,
              bgcolor: pendientesRevision > 0 ? 'rgba(255, 152, 0, 0.04)' : 'background.paper'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdSchedule size={40} color={theme.palette.warning.main} />
                {pendientesRevision > 0 && (
                  <Chip 
                    label="Pendiente" 
                    size="small" 
                    color="warning"
                  />
                )}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {pendientesRevision}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Horarios por Revisar
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdCheckCircle size={40} color={theme.palette.success.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {revisadosHoy}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Revisados Hoy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdRateReview size={40} color={theme.palette.primary.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {totalRevisados}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Revisados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Accesos Rápidos */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Accesos Rápidos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'warning.main',
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => navigate('/revision')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'warning.lighter', 
                        borderRadius: 2,
                        display: 'flex'
                      }}
                    >
                      <MdRateReview size={28} color={theme.palette.warning.main} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Revisar Horarios
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ver horarios pendientes de revisión
                      </Typography>
                    </Box>
                    {pendientesRevision > 0 && (
                      <Chip 
                        label={pendientesRevision} 
                        color="warning" 
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => navigate('/calendario')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'primary.lighter', 
                        borderRadius: 2,
                        display: 'flex'
                      }}
                    >
                      <MdCalendarMonth size={28} color={theme.palette.primary.main} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Ver Calendario
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Calendario de exámenes aprobados
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'success.main',
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => navigate('/periodo-academico')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: periodoActual && periodoActual.estado === 'activo' 
                          ? 'success.lighter' 
                          : 'error.lighter', 
                        borderRadius: 2,
                        display: 'flex'
                      }}
                    >
                      <MdSettings size={28} color={
                        periodoActual && periodoActual.estado === 'activo'
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      } />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Período Académico
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gestionar períodos de exámenes
                      </Typography>
                    </Box>
                    {periodoActual && (
                      <Chip 
                        label={periodoActual.estado === 'activo' ? 'Activo' : 'Planificado'} 
                        color={periodoActual.estado === 'activo' ? 'success' : 'warning'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                    {!periodoActual && (
                      <Chip 
                        label="Sin período" 
                        color="error"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SecretariaHome;
