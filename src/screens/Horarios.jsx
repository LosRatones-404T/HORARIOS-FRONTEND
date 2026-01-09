import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  Divider,
} from '@mui/material';
import { IoAdd, IoRefresh } from 'react-icons/io5';
import MainLayout from '../components/layout/MainLayout';

// Datos de ejemplo (mock data)
const mockDegrees = [
  { id: 1, name: 'Licenciatura en Informática', is_active: true },
  { id: 2, name: 'Ingeniería en Sistemas', is_active: true },
  { id: 3, name: 'Licenciatura en Computación', is_active: true },
];

const mockExams = [
  {
    id: 1,
    course: 'Programación Avanzada',
    group: '106-A',
    professor: 'Dr. Juan Pérez',
    classroom: 'Lab-301',
    date: '2026-01-15',
    start: '09:00:00',
    end: '11:00:00'
  },
  {
    id: 2,
    course: 'Base de Datos',
    group: '106-B',
    professor: 'Dra. María López',
    classroom: 'Aula-205',
    date: '2026-01-16',
    start: '10:00:00',
    end: '12:00:00'
  },
  {
    id: 3,
    course: 'Inteligencia Artificial',
    group: '106-A',
    professor: 'Dr. Carlos Ruiz',
    classroom: 'Lab-302',
    date: '2026-01-17',
    start: '14:00:00',
    end: '16:00:00'
  },
  {
    id: 4,
    course: 'Redes de Computadoras',
    group: '106-C',
    professor: 'Ing. Ana Martínez',
    classroom: 'Lab-303',
    date: '2026-01-18',
    start: '08:00:00',
    end: '10:00:00'
  },
];

function Horarios() {
  const theme = useTheme();
  
  // Estados
  const [degrees] = useState(mockDegrees);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [exams, setExams] = useState(mockExams);
  const [loading, setLoading] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Generar horarios de exámenes (simulado)
  const handleGenerateSchedule = async () => {
    if (!selectedDegree) {
      setError('Por favor selecciona una carrera');
      return;
    }

    setLoadingGenerate(true);
    
    // Simular llamada al API
    setTimeout(() => {
      const selectedDegreeName = degrees.find(d => d.id === selectedDegree)?.name;
      setSuccess(`Se generaron ${mockExams.length} exámenes para ${selectedDegreeName}`);
      setLoadingGenerate(false);
      setSelectedDegree('');
    }, 2000);
  };

  // Recargar exámenes (simulado)
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
      setSuccess('Horarios actualizados');
    }, 1000);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  // Formatear hora
  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // HH:MM
  };

  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Encabezado */}
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Gestión de Horarios de Exámenes
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: theme.palette.text.secondary }}
          >
            Genera y consulta los horarios de exámenes por carrera
          </Typography>
        </Box>

        {/* Tarjeta de generación */}
        <Card 
          sx={{ 
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: theme.palette.text.primary,
              }}
            >
              Generar Nuevo Horario
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Selector de carrera */}
              <FormControl 
                sx={{ 
                  minWidth: 300,
                  flex: 1,
                }}
              >
                <InputLabel id="degree-select-label">Seleccionar Carrera</InputLabel>
                <Select
                  labelId="degree-select-label"
                  value={selectedDegree}
                  label="Seleccionar Carrera"
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  disabled={loadingGenerate}
                >
                  {degrees.filter(d => d.is_active).map((degree) => (
                    <MenuItem key={degree.id} value={degree.id}>
                      {degree.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Botón generar */}
              <Button
                variant="contained"
                startIcon={loadingGenerate ? <CircularProgress size={20} color="inherit" /> : <IoAdd size={20} />}
                onClick={handleGenerateSchedule}
                disabled={!selectedDegree || loadingGenerate}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                {loadingGenerate ? 'Generando...' : 'Generar Horarios'}
              </Button>

              {/* Botón recargar */}
              <Button
                variant="outlined"
                startIcon={<IoRefresh size={20} />}
                onClick={handleRefresh}
                disabled={loading}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(74, 131, 221, 0.04)' : 'rgba(166, 195, 252, 0.08)',
                  },
                }}
              >
                Actualizar
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Tabla de exámenes */}
        <Card 
          sx={{ 
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Horarios Generados ({exams.length})
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : exams.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No hay exámenes generados. Selecciona una carrera y genera horarios.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Materia</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Grupo</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Profesor</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Aula</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Hora Inicio</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Hora Fin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow 
                        key={exam.id}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800' 
                          } 
                        }}
                      >
                        <TableCell>{exam.course}</TableCell>
                        <TableCell>{exam.group}</TableCell>
                        <TableCell>{exam.professor}</TableCell>
                        <TableCell>{exam.classroom}</TableCell>
                        <TableCell>{formatDate(exam.date)}</TableCell>
                        <TableCell>{formatTime(exam.start)}</TableCell>
                        <TableCell>{formatTime(exam.end)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Snackbars para mensajes */}
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar 
          open={!!success} 
          autoHideDuration={4000} 
          onClose={() => setSuccess(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
}

export default Horarios;
