import { useState, useMemo, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  useTheme, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tabs,
  Tab,
  Chip,
  Paper
} from '@mui/material';
import { MdExpandMore, MdCalendarToday } from 'react-icons/md';
import HorarioSemanal from '../components/common/HorarioSemanal';
import MainLayout from '../components/layout/MainLayout';
import { Notification } from '../components/common';
import { getCurrentUser } from '../store/authStore';

/**
 * Pantalla de Calendario
 * Muestra el calendario de exámenes de todos los semestres de Informática
 */
const Calendario = () => {
  const theme = useTheme();
  const currentUser = getCurrentUser();
  const isSecretaria = currentUser?.role === 'secretaria';

  // Carreras disponibles (solo para secretaria)
  const carreras = [
    { id: 'informatica', label: 'Lic. en Informática' },
    { id: 'sistemas', label: 'Ing. en Sistemas Computacionales' },
    { id: 'industrial', label: 'Ing. Industrial' },
    { id: 'electronica', label: 'Ing. Electrónica' },
  ];

  // Tipos de examen disponibles
  const tiposExamen = [
    { id: 'parcial1', label: 'Parcial 1' },
    { id: 'parcial2', label: 'Parcial 2' },
    { id: 'parcial3', label: 'Parcial 3' },
    { id: 'ordinario', label: 'Ordinario' },
    { id: 'extraordinario1', label: 'Extraordinario 1' },
    { id: 'extraordinario2', label: 'Extraordinario 2' },
    { id: 'especial', label: 'Especial' },
  ];

  // Estado del tipo de examen seleccionado (por defecto Parcial 1)
  const [tipoExamenActual, setTipoExamenActual] = useState('parcial1');
  
  // Estado de carrera seleccionada (solo para secretaria)
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('informatica');

  // Estado de notificación
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Estado de expansión de accordions (primer semestre expandido por defecto)
  const [expandedSemesters, setExpandedSemesters] = useState({ 1: true });

  // Horarios de exámenes por semestre - Licenciatura en Informática (solo impares)
  // TODO: Estos datos vendrán del backend filtrados por tipoExamenActual
  // GET /api/calendario?tipo_examen=parcial1&periodo=2026-1
  // Cada tipo de examen tendrá sus propios horarios guardados en la BD
  const semestresData = useMemo(() => [
    {
      numero: 1,
      nombre: 'PRIMER SEMESTRE',
      materias: [
        'Diseño Estructurado de Algoritmos',
        'Administración',
        'Historia del Pensamiento Filosófico',
        'Lógica Matemática',
        'Cálculo I'
      ],
      eventos: [
        { dia: 1, horaInicio: '08:00', materia: 'Diseño Estructurado de Algoritmos', aula: 'Lab-301' },
        { dia: 1, horaInicio: '10:00', materia: 'Administración', aula: 'Aula-102' },
        { dia: 2, horaInicio: '09:00', materia: 'Historia del Pensamiento Filosófico', aula: 'Aula-205' },
        { dia: 3, horaInicio: '11:00', materia: 'Lógica Matemática', aula: 'Aula-303' },
        { dia: 4, horaInicio: '08:00', materia: 'Cálculo I', aula: 'Aula-101' },
      ]
    },
    {
      numero: 3,
      nombre: 'TERCER SEMESTRE',
      materias: [
        'Estructuras de Datos',
        'Electrónica Digital',
        'Contabilidad y Finanzas',
        'Teoría de Autómatas',
        'Álgebra Lineal'
      ],
      eventos: [
        { dia: 1, horaInicio: '10:00', materia: 'Estructuras de Datos', aula: 'Lab-303' },
        { dia: 1, horaInicio: '15:00', materia: 'Electrónica Digital', aula: 'Lab-402' },
        { dia: 2, horaInicio: '11:00', materia: 'Contabilidad y Finanzas', aula: 'Aula-207' },
        { dia: 3, horaInicio: '09:00', materia: 'Teoría de Autómatas', aula: 'Aula-305' },
        { dia: 4, horaInicio: '08:00', materia: 'Álgebra Lineal', aula: 'Aula-103' },
      ]
    },
    {
      numero: 5,
      nombre: 'QUINTO SEMESTRE',
      materias: [
        'Paradigmas de Programación II',
        'Redes I',
        'Bases de Datos II',
        'Fundamentos de Sistemas Operativos',
        'Diseño Web'
      ],
      eventos: [
        { dia: 1, horaInicio: '08:00', materia: 'Paradigmas de Programación II', aula: 'Lab-307' },
        { dia: 1, horaInicio: '13:00', materia: 'Redes I', aula: 'Lab-404' },
        { dia: 2, horaInicio: '09:00', materia: 'Bases de Datos II', aula: 'Lab-308' },
        { dia: 3, horaInicio: '11:00', materia: 'Fundamentos de Sistemas Operativos', aula: 'Lab-309' },
        { dia: 4, horaInicio: '15:00', materia: 'Diseño Web', aula: 'Lab-310' },
      ]
    },
    {
      numero: 7,
      nombre: 'SÉPTIMO SEMESTRE',
      materias: [
        'Tecnologías Web II',
        'Bases de Datos Avanzadas',
        'Ingeniería de Software II',
        'Probabilidad y Estadística',
        'Derecho y Legislación en Informática'
      ],
      eventos: [
        { dia: 1, horaInicio: '10:00', materia: 'Tecnologías Web II', aula: 'Lab-314' },
        { dia: 1, horaInicio: '15:00', materia: 'Bases de Datos Avanzadas', aula: 'Lab-315' },
        { dia: 2, horaInicio: '11:00', materia: 'Ingeniería de Software II', aula: 'Aula-209' },
        { dia: 3, horaInicio: '09:00', materia: 'Probabilidad y Estadística', aula: 'Aula-306' },
        { dia: 4, horaInicio: '13:00', materia: 'Derecho y Legislación en Informática', aula: 'Aula-105' },
      ]
    },
    {
      numero: 9,
      nombre: 'NOVENO SEMESTRE',
      materias: [
        'Sistemas Distribuidos',
        'Calidad de Software',
        'Interacción Humano-Computadora',
        'Inteligencia de Negocios',
        'Investigación de Operaciones'
      ],
      eventos: [
        { dia: 1, horaInicio: '11:00', materia: 'Sistemas Distribuidos', aula: 'Lab-316' },
        { dia: 1, horaInicio: '16:00', materia: 'Calidad de Software', aula: 'Aula-210' },
        { dia: 2, horaInicio: '08:00', materia: 'Interacción Humano-Computadora', aula: 'Lab-317' },
        { dia: 3, horaInicio: '10:00', materia: 'Inteligencia de Negocios', aula: 'Lab-318' },
        { dia: 4, horaInicio: '14:00', materia: 'Investigación de Operaciones', aula: 'Aula-106' },
      ]
    }
  ], []);

  const [semestres, setSemestres] = useState(semestresData);

  // Efecto para cargar datos cuando cambia el tipo de examen o carrera
  useEffect(() => {
    // TODO: Aquí se hará la llamada al backend
    // const fetchHorarios = async () => {
    //   try {
    //     const url = isSecretaria 
    //       ? `/api/calendario?tipo_examen=${tipoExamenActual}&carrera=${carreraSeleccionada}&periodo=2026-1`
    //       : `/api/calendario?tipo_examen=${tipoExamenActual}&periodo=2026-1`;
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setSemestres(data.semestres);
    //   } catch (error) {
    //     console.error('Error al cargar horarios:', error);
    //   }
    // };
    // fetchHorarios();
    
    // Por ahora, solo recargamos los datos mock
    setSemestres(semestresData);
  }, [tipoExamenActual, carreraSeleccionada, semestresData, isSecretaria]);

  // Manejar cambios en los eventos de un semestre
  const handleEventsChange = (semestreNumero, newEvents) => {
    setSemestres(prev => prev.map(sem => 
      sem.numero === semestreNumero 
        ? { ...sem, eventos: newEvents }
        : sem
    ));
  };

  // Guardar cambios de un semestre
  const handleSaveSemestre = (semestreNumero) => {
    // TODO: Aquí se enviará al backend junto con el tipo de examen actual
    console.log(`Guardando cambios del semestre ${semestreNumero} para ${tipoExamenActual}`);
    setNotification({
      open: true,
      message: `Cambios guardados exitosamente para el ${semestres.find(s => s.numero === semestreNumero)?.nombre} - ${tiposExamen.find(t => t.id === tipoExamenActual)?.label}`,
      severity: 'success'
    });
  };

  // Cerrar notificación
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Manejar expansión de accordions
  const handleAccordionChange = (semestreNumero) => (event, isExpanded) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [semestreNumero]: isExpanded
    }));
  };

  // Expandir/Colapsar todos
  const handleToggleAll = () => {
    const allExpanded = semestres.every(sem => expandedSemesters[sem.numero]);
    if (allExpanded) {
      // Colapsar todos
      setExpandedSemesters({});
    } else {
      // Expandir todos
      const newState = {};
      semestres.forEach(sem => {
        newState[sem.numero] = true;
      });
      setExpandedSemesters(newState);
    }
  };

  // Manejar cambio de tipo de examen
  const handleChangeTipoExamen = (event, newValue) => {
    setTipoExamenActual(newValue);
    setNotification({
      open: true,
      message: `Mostrando horarios de ${tiposExamen.find(t => t.id === newValue)?.label}`,
      severity: 'info'
    });
  };

  // Manejar cambio de carrera
  const handleChangeCarrera = (event, newValue) => {
    setCarreraSeleccionada(newValue);
    setNotification({
      open: true,
      message: `Mostrando horarios de ${carreras.find(c => c.id === newValue)?.label}`,
      severity: 'info'
    });
  };

  return (
    <MainLayout showSidebar={true}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              Calendario de Exámenes
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary 
              }}
            >
              {isSecretaria 
                ? `${carreras.find(c => c.id === carreraSeleccionada)?.label} - Horarios por semestre`
                : 'Licenciatura en Informática - Horarios por semestre'
              }
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={handleToggleAll}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                bgcolor: theme.palette.primary.main + '10',
              },
            }}
          >
            {semestres.every(sem => expandedSemesters[sem.numero]) ? 'Colapsar Todo' : 'Expandir Todo'}
          </Button>
        </Box>

        {/* Selector de carrera (solo para secretaria) */}
        {isSecretaria && (
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 3, 
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <MdCalendarToday size={20} color={theme.palette.info.main} />
              <Typography variant="subtitle1" fontWeight={600}>
                Carrera
              </Typography>
            </Box>
            
            <Tabs
              value={carreraSeleccionada}
              onChange={handleChangeCarrera}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  minHeight: 48,
                },
                '& .Mui-selected': {
                  color: theme.palette.info.main,
                },
              }}
              TabIndicatorProps={{
                sx: { bgcolor: theme.palette.info.main }
              }}
            >
              {carreras.map((carrera) => (
                <Tab
                  key={carrera.id}
                  value={carrera.id}
                  label={carrera.label}
                />
              ))}
            </Tabs>
          </Paper>
        )}

        {/* Selector de Tipo de Examen */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MdCalendarToday size={20} color={theme.palette.primary.main} />
              <Typography variant="subtitle1" fontWeight={600}>
                Tipo de Examen
              </Typography>
            </Box>
            <Chip 
              label="Periodo Actual" 
              color="primary" 
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
          
          <Tabs
            value={tipoExamenActual}
            onChange={handleChangeTipoExamen}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 1.5,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                minHeight: 48,
                '&.Mui-selected': {
                  fontWeight: 600,
                },
              },
            }}
          >
            {tiposExamen.map((tipo) => (
              <Tab 
                key={tipo.id} 
                label={tipo.label} 
                value={tipo.id}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Indicador de tipo de examen actual */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Mostrando horarios de:
          </Typography>
          <Chip 
            label={tiposExamen.find(t => t.id === tipoExamenActual)?.label} 
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Accordions por semestre */}
        {semestres.map((semestre) => (
          <Accordion
            key={semestre.numero}
            expanded={expandedSemesters[semestre.numero] || false}
            onChange={handleAccordionChange(semestre.numero)}
            elevation={0}
            sx={{
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              '&:before': { display: 'none' },
              overflow: 'hidden',
            }}
            TransitionProps={{ timeout: 300 }}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore size={24} color="#fff" />}
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                minHeight: 64,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '& .MuiAccordionSummary-content': {
                  my: 1.5,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                {semestre.nombre}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 3,
                bgcolor: 'background.paper',
              }}
            >
              <HorarioSemanal 
                events={semestre.eventos}
                materias={semestre.materias}
                onEventsChange={(newEvents) => handleEventsChange(semestre.numero, newEvents)}
                onSave={() => handleSaveSemestre(semestre.numero)}
                showHeader={false}
              />
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Notificación */}
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Container>
    </MainLayout>
  );
};

export default Calendario;
