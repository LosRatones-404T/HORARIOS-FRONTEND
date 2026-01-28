import { useState, useMemo, useEffect, useRef } from 'react';
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
  Paper,
  Stack,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  MdExpandMore, 
  MdCalendarToday, 
  MdFileDownload, 
  MdArrowDropDown,
  MdDownload,
  MdAllInclusive
} from 'react-icons/md';
import HorarioSemanal from '../components/common/HorarioSemanal';
import MainLayout from '../components/layout/MainLayout';
import { Notification } from '../components/common';
import { getCurrentUser } from '../store/authStore';
import { exportarCalendarioCarrera, exportarTodasLasCarreras } from '../utils/pdfExport';

/**
 * Pantalla de Calendario
 * Muestra el calendario de exámenes de todos los semestres de Informática
 */
const Calendario = () => {
  const theme = useTheme();
  const currentUser = getCurrentUser();
  const isSecretaria = currentUser?.role === 'escolares';

  // Licenciaturas disponibles (solo para secretaria)
  const carreras = [
    { id: 'informatica', label: 'Informática' },
    { id: 'administracion-municipal', label: 'Administración Municipal' },
    { id: 'administracion-publica', label: 'Administración Pública' },
    { id: 'ciencias-biomedicas', label: 'Ciencias Biomédicas' },
    { id: 'ciencias-empresariales', label: 'Ciencias Empresariales' },
    { id: 'enfermeria', label: 'Enfermería' },
    { id: 'medicina', label: 'Medicina' },
    { id: 'nutricion', label: 'Nutrición' },
    { id: 'odontologia', label: 'Odontología' },
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

  // Estado de expansión de accordions (solo uno a la vez - por índice)
  const [expandedSemesterIndex, setExpandedSemesterIndex] = useState(0);
  
  // Refs para cada acordeón para hacer scroll
  const accordionRefs = useRef({});

  // Estado para menú de exportación (solo secretaria)
  const [anchorElExport, setAnchorElExport] = useState(null);
  const openExportMenu = Boolean(anchorElExport);

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
        { diaId: 0, horaInicio: '08:00', materia: 'Diseño Estructurado de Algoritmos', grupo: '106-A', aplicador: 'Dr. Alejandro', aula: 'Lab-301', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '08:00', materia: 'Diseño Estructurado de Algoritmos', grupo: '106-B', aplicador: 'Dr. Alejandro', aula: 'Lab-302', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '10:00', materia: 'Administración', grupo: '106-A', aplicador: 'M.C. Mónica', aula: 'Aula-102', duracion: '1.5 horas', conflicto: false },
        { diaId: 1, horaInicio: '09:00', materia: 'Historia del Pensamiento Filosófico', grupo: '106-A', aplicador: 'Dr. Amando', aula: 'Aula-205', duracion: '2 horas', conflicto: false },
        { diaId: 2, horaInicio: '11:00', materia: 'Lógica Matemática', grupo: '106-A', aplicador: '', aula: 'Aula-303', duracion: '2 horas', conflicto: false },
        { diaId: 3, horaInicio: '08:00', materia: 'Cálculo I', grupo: '106-A', aplicador: '', aula: 'Aula-101', duracion: '2 horas', conflicto: false },
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
        { diaId: 0, horaInicio: '10:00', materia: 'Estructuras de Datos', grupo: '306-A', aplicador: '', aula: 'Lab-303', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '15:00', materia: 'Electrónica Digital', grupo: '306-A', aplicador: '', aula: 'Lab-402', duracion: '2 horas', conflicto: false },
        { diaId: 1, horaInicio: '11:00', materia: 'Contabilidad y Finanzas', grupo: '306-A', aplicador: '', aula: 'Aula-207', duracion: '1.5 horas', conflicto: false },
        { diaId: 2, horaInicio: '09:00', materia: 'Teoría de Autómatas', grupo: '306-A', aplicador: '', aula: 'Aula-305', duracion: '2 horas', conflicto: false },
        { diaId: 3, horaInicio: '08:00', materia: 'Álgebra Lineal', grupo: '306-A', aplicador: '', aula: 'Aula-103', duracion: '2 horas', conflicto: false },
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
        { diaId: 0, horaInicio: '08:00', materia: 'Paradigmas de Programación II', grupo: '506-A', aplicador: '', aula: 'Lab-307', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '13:00', materia: 'Redes I', grupo: '506-A', aplicador: '', aula: 'Lab-404', duracion: '2 horas', conflicto: false },
        { diaId: 1, horaInicio: '09:00', materia: 'Bases de Datos II', grupo: '506-A', aplicador: '', aula: 'Lab-308', duracion: '2 horas', conflicto: false },
        { diaId: 2, horaInicio: '11:00', materia: 'Fundamentos de Sistemas Operativos', grupo: '506-A', aplicador: '', aula: 'Lab-309', duracion: '2 horas', conflicto: false },
        { diaId: 3, horaInicio: '15:00', materia: 'Diseño Web', grupo: '506-A', aplicador: '', aula: 'Lab-310', duracion: '2 horas', conflicto: false },
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
        { diaId: 0, horaInicio: '10:00', materia: 'Tecnologías Web II', grupo: 'Único', aplicador: '', aula: 'Lab-314', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '15:00', materia: 'Bases de Datos Avanzadas', grupo: 'Único', aplicador: '', aula: 'Lab-315', duracion: '2 horas', conflicto: false },
        { diaId: 1, horaInicio: '11:00', materia: 'Ingeniería de Software II', grupo: 'Único', aplicador: '', aula: 'Aula-209', duracion: '2 horas', conflicto: false },
        { diaId: 2, horaInicio: '09:00', materia: 'Probabilidad y Estadística', grupo: 'Único', aplicador: '', aula: 'Aula-306', duracion: '2 horas', conflicto: false },
        { diaId: 3, horaInicio: '13:00', materia: 'Derecho y Legislación en Informática', grupo: 'Único', aplicador: '', aula: 'Aula-105', duracion: '1.5 horas', conflicto: false },
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
        { diaId: 0, horaInicio: '11:00', materia: 'Sistemas Distribuidos', grupo: 'Único', aplicador: '', aula: 'Lab-316', duracion: '2 horas', conflicto: false },
        { diaId: 0, horaInicio: '16:00', materia: 'Calidad de Software', grupo: 'Único', aplicador: '', aula: 'Aula-210', duracion: '2 horas', conflicto: false },
        { diaId: 1, horaInicio: '08:00', materia: 'Interacción Humano-Computadora', grupo: 'Único', aplicador: '', aula: 'Lab-317', duracion: '2 horas', conflicto: false },
        { diaId: 2, horaInicio: '10:00', materia: 'Inteligencia de Negocios', grupo: 'Único', aplicador: '', aula: 'Lab-318', duracion: '2 horas', conflicto: false },
        { diaId: 3, horaInicio: '14:00', materia: 'Investigación de Operaciones', grupo: 'Único', aplicador: '', aula: 'Aula-106', duracion: '2 horas', conflicto: false },
      ]
    }
  ], []);

  const [semestres, setSemestres] = useState(semestresData);

  // Mapeo de colores para grupos (basado en preferencias)
  const coloresGrupos = {
    '106-A': theme.palette.primary.main,
    '106-B': theme.palette.success.main,
    '106-C': theme.palette.warning.main,
    '306-A': theme.palette.info.main,
    '506-A': theme.palette.error.main,
    'Único': theme.palette.secondary.main,
  };

  // Cargar datos guardados del localStorage al iniciar
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const key = `calendario_${carreraSeleccionada}_${tipoExamenActual}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsedData = JSON.parse(saved);
          setSemestres(parsedData);
          console.log('Datos cargados desde localStorage:', key);
        } else {
          // Si no hay datos guardados, usar los datos mock
          setSemestres(semestresData);
          console.log('Usando datos mock iniciales');
        }
      } catch (error) {
        console.error('Error al cargar datos guardados:', error);
        setSemestres(semestresData);
      }
    };
    loadSavedData();
  }, [tipoExamenActual, carreraSeleccionada, semestresData]);

  // Guardar datos en localStorage cuando cambien los semestres
  useEffect(() => {
    try {
      const key = `calendario_${carreraSeleccionada}_${tipoExamenActual}`;
      localStorage.setItem(key, JSON.stringify(semestres));
      console.log('Datos guardados en localStorage:', key);
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  }, [semestres, carreraSeleccionada, tipoExamenActual]);

  // Efecto para cargar datos cuando cambia el tipo de examen o carrera
  useEffect(() => {
    // TODO: Aquí se hará la llamada al backend
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
  }, [isSecretaria]);

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

  // Manejar expansión/colapso de semestre (solo uno a la vez)
  const handleAccordionChange = (index) => {
    setExpandedSemesterIndex(expandedSemesterIndex === index ? -1 : index);
  };

  // Effect para hacer scroll al semestre expandido (enfocando en el título)
  useEffect(() => {
    if (expandedSemesterIndex >= 0 && accordionRefs.current[expandedSemesterIndex]) {
      // Esperar a que la animación del Accordion termine (350ms según TransitionProps)
      setTimeout(() => {
        accordionRefs.current[expandedSemesterIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 350);
    }
  }, [expandedSemesterIndex]);

  // Expandir/Colapsar todos (cambiar a solo expandir el primero)
  const handleToggleAll = () => {
    if (expandedSemesterIndex >= 0) {
      // Si hay un semestre expandido, colapsarlo
      setExpandedSemesterIndex(-1);
    } else {
      // Expandir el primero
      setExpandedSemesterIndex(0);
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

  // Manejar apertura de menú de exportación
  const handleOpenExportMenu = (event) => {
    setAnchorElExport(event.currentTarget);
  };

  // Manejar cierre de menú de exportación
  const handleCloseExportMenu = () => {
    setAnchorElExport(null);
  };

  // Exportar licenciatura actual
  const handleExportarCarreraActual = () => {
    const carreraActual = carreras.find(c => c.id === carreraSeleccionada);
    const tipoExamenLabel = tiposExamen.find(t => t.id === tipoExamenActual)?.label || 'Sin tipo';
    
    console.log('Exportando licenciatura:', carreraActual?.label);
    console.log('Semestres a exportar:', semestres);
    console.log('Total de eventos:', semestres.reduce((acc, sem) => acc + sem.eventos.length, 0));
    
    exportarCalendarioCarrera({
      semestres: semestres,
      carrera: carreraActual?.label || 'Carrera',
      tipoExamen: tipoExamenLabel,
      periodo: 'Enero - Junio 2026',
    });

    setNotification({
      open: true,
      message: `PDF generado: ${semestres.reduce((acc, sem) => acc + sem.eventos.length, 0)} exámenes de ${carreraActual?.label}`,
      severity: 'success'
    });

    handleCloseExportMenu();
  };

  // Exportar todas las licenciaturas
  const handleExportarTodasCarreras = () => {
    const tipoExamenLabel = tiposExamen.find(t => t.id === tipoExamenActual)?.label || 'Sin tipo';
    
    // Simular datos de todas las licenciaturas
    // En producción, estos datos vendrían del backend
    const todasCarreras = carreras.map(carrera => ({
      nombre: carrera.label,
      semestres: semestres // Reutilizamos los mismos semestres para el demo
    }));

    exportarTodasLasCarreras({
      carreras: todasCarreras,
      tipoExamen: tipoExamenLabel,
      periodo: 'Enero - Junio 2026',
    });

    setNotification({
      open: true,
      message: 'Exportando calendarios de todas las licenciaturas...',
      severity: 'success'
    });

    handleCloseExportMenu();
  };

  // Exportar calendario simple (para jefe de carrera)
  const handleExportarCalendario = () => {
    const carreraJefe = 'Informática'; // En producción vendría del usuario autenticado
    const tipoExamenLabel = tiposExamen.find(t => t.id === tipoExamenActual)?.label || 'Sin tipo';
    
    console.log('Exportando calendario jefe de carrera');
    console.log('Semestres:', semestres);
    console.log('Total de eventos:', semestres.reduce((acc, sem) => acc + sem.eventos.length, 0));
    
    exportarCalendarioCarrera({
      semestres: semestres,
      carrera: carreraJefe,
      tipoExamen: tipoExamenLabel,
      periodo: 'Enero - Junio 2026',
    });

    setNotification({
      open: true,
      message: `PDF generado: ${semestres.reduce((acc, sem) => acc + sem.eventos.length, 0)} exámenes de ${tipoExamenLabel}`,
      severity: 'success'
    });
  };

  return (
    <MainLayout showSidebar={true}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
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
          
          <Stack direction="row" spacing={2}>
            {/* Botón de exportación para Jefe de Carrera */}
            {!isSecretaria && (
              <Button
                variant="contained"
                startIcon={<MdFileDownload />}
                onClick={handleExportarCalendario}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Exportar PDF
              </Button>
            )}

            {/* Botones de exportación para Secretaria */}
            {isSecretaria && (
              <ButtonGroup variant="contained">
                <Button
                  startIcon={<MdFileDownload />}
                  onClick={handleExportarCarreraActual}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Exportar Licenciatura Actual
                </Button>
                <Button
                  size="small"
                  onClick={handleOpenExportMenu}
                  sx={{
                    px: 1,
                  }}
                >
                  <MdArrowDropDown size={20} />
                </Button>
              </ButtonGroup>
            )}

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
            {expandedSemesterIndex >= 0 ? 'Colapsar Todo' : 'Expandir Primero'}
          </Button>
          </Stack>
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
                Licenciatura
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

        {/* Menú de opciones de exportación (solo secretaria) */}
        {isSecretaria && (
          <Menu
            anchorEl={anchorElExport}
            open={openExportMenu}
            onClose={handleCloseExportMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleExportarCarreraActual}>
              <ListItemIcon>
                <MdDownload size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Exportar Carrera Actual" 
                secondary={carreras.find(c => c.id === carreraSeleccionada)?.label}
              />
            </MenuItem>
            <MenuItem onClick={handleExportarTodasCarreras}>
              <ListItemIcon>
                <MdAllInclusive size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Exportar Todas las Carreras" 
                secondary="Genera un PDF consolidado"
              />
            </MenuItem>
          </Menu>
        )}

        {/* Accordions por semestre */}
        {semestres.map((semestre, semestreIndex) => (
          <Accordion
            key={semestre.numero}
            ref={(el) => {
              if (el) accordionRefs.current[semestreIndex] = el;
            }}
            expanded={expandedSemesterIndex === semestreIndex}
            onChange={() => handleAccordionChange(semestreIndex)}
            elevation={0}
            sx={{
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              '&:before': { display: 'none' },
              overflow: 'hidden',
            }}
            TransitionProps={{ timeout: 350 }}
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
                readOnly={isSecretaria}
                coloresGrupos={coloresGrupos}
                fechaInicio={new Date(2026, 0, 26)} // 26 enero 2026
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
