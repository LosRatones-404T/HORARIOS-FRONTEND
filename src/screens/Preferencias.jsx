import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  useTheme, 
  Divider, 
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { MdSave, MdExpandMore } from 'react-icons/md';
import MateriaCard from '../components/common/MateriaCard';
import Notification from '../components/common/Notification';
import MainLayout from '../components/layout/MainLayout';

/**
 * Pantalla de Preferencias de Materias
 * Muestra las materias de la carrera de Informática organizadas por semestre
 */
const Preferencias = () => {
  const theme = useTheme();

  // Datos de materias por semestre para la carrera de Informática (memoizado)
  const semestresIniciales = useMemo(() => [
    {
      numero: 1,
      nombre: 'PRIMER SEMESTRE',
      materias: [
        {
          nombre: 'Diseño Estructurado de Algoritmos',
          profesor: 'Dr. Alejandro Jarillo Silva',
          aplicador: '',
          sinodales: ['Dr. Eric Melecio Castro Leal', 'M.C. Enrique García Reyes'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Administración',
          profesor: 'M.C. Mónica Pérez Meza',
          aplicador: '',
          sinodales: ['M.C. Teresita de J. Mijangos Martínez'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Historia del Pensamiento Filosófico',
          profesor: 'Dr. Amando Alejandro Ruiz Figueroa',
          aplicador: '',
          sinodales: ['M.C.C. Lirio Ruiz Guerra', 'M.T.E. Everardo de Jesús Pacheco Antonio'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Lógica Matemática',
          profesor: 'Dr. Arisel Darío Barragán López',
          aplicador: '',
          sinodales: ['Dra. Aidee Cruz Barragán'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Cálculo I',
          profesor: 'Dr. Arturo Benítez Hernández',
          aplicador: '',
          sinodales: ['Dr. José J. Hernández Barriga', 'M.C.C. Silviana Juárez Chalini'],
          modalidad: 'Tradicional',
          academia: false
        }
      ]
    },
    {
      numero: 3,
      nombre: 'TERCER SEMESTRE',
      materias: [
        {
          nombre: 'Estructuras de Datos',
          profesor: 'Dr. Jesús Cruz Ahuactzil',
          aplicador: '',
          sinodales: ['M.C.M. Jesús Pacheco Mendoza', 'M.I.T.I. Oswaldo Rey Ávila Barrón'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Electrónica Digital',
          profesor: 'M.T.C.A. Rolando Pedro Gabriel',
          aplicador: '',
          sinodales: ['M.T.I.E. Irving Ulises Hernández Miguel'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Contabilidad y Finanzas',
          profesor: 'M.C. Mónica Pérez Meza',
          aplicador: '',
          sinodales: ['M.C. Teresita de J. Mijangos Martínez', 'M.C.A.C. José Alberto Cruz Tolentino'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Teoría de Autómatas',
          profesor: 'Dr. Eric Melecio Castro Leal',
          aplicador: '',
          sinodales: ['M.C.C. Eliezer Alcázar Silva'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Álgebra Lineal',
          profesor: 'Dr. Arisel Darío Barragán López',
          aplicador: '',
          sinodales: ['Dr. Arturo Benítez Hernández', 'Dra. Aidee Cruz Barragán'],
          modalidad: 'Tradicional',
          academia: false
        }
      ]
    },
    {
      numero: 5,
      nombre: 'QUINTO SEMESTRE',
      materias: [
        {
          nombre: 'Paradigmas de Programación II',
          profesor: 'M.C.M. Oscar Cuauhtémoc Esperanza Contreras',
          aplicador: '',
          sinodales: ['M.C.C. Silviana Juárez Chalini', 'M.C.M. Jesús Pacheco Mendoza'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Redes I',
          profesor: 'M.T.I.E. Irving Ulises Hernández Miguel',
          aplicador: '',
          sinodales: ['M.T.C.A. Rolando Pedro Gabriel'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Bases de Datos II',
          profesor: 'Dr. Alejandro Jarillo Silva',
          aplicador: '',
          sinodales: ['M.C. Enrique García Reyes', 'Dr. Eric Melecio Castro Leal'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Fundamentos de Sistemas Operativos',
          profesor: 'Dr. Jesús Cruz Ahuactzil',
          aplicador: '',
          sinodales: ['M.C.C. Eliezer Alcázar Silva'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Diseño Web',
          profesor: 'M.C.C. Lirio Ruiz Guerra',
          aplicador: '',
          sinodales: ['M.I.T.I. Oswaldo Rey Ávila Barrón', 'M.T.E. Everardo de Jesús Pacheco Antonio'],
          modalidad: 'Tradicional',
          academia: false
        }
      ]
    },
    {
      numero: 7,
      nombre: 'SÉPTIMO SEMESTRE',
      materias: [
        {
          nombre: 'Tecnologías Web II',
          profesor: 'Dr. Amando Alejandro Ruiz Figueroa',
          aplicador: '',
          sinodales: ['M.C. Enrique García Reyes', 'M.C. Teresita de J. Mijangos Martínez'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Bases de Datos Avanzadas',
          profesor: 'Dr. Eric Melecio Castro Leal',
          aplicador: '',
          sinodales: ['Dr. Alejandro Jarillo Silva'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Ingeniería de Software II',
          profesor: 'M.C.A.C. José Alberto Cruz Tolentino',
          aplicador: '',
          sinodales: ['M.C.C. Silviana Juárez Chalini', 'M.C.M. Oscar Cuauhtémoc Esperanza Contreras'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Probabilidad y Estadística',
          profesor: 'Dr. Arturo Benítez Hernández',
          aplicador: '',
          sinodales: ['Dr. Arisel Darío Barragán López'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Derecho y Legislación en Informática',
          profesor: 'Lic. Leonel Arias',
          aplicador: '',
          sinodales: ['Lic. Angélica Duarte', 'Lic. Martín Guerra'],
          modalidad: 'Tradicional',
          academia: false
        }
      ]
    },
    {
      numero: 9,
      nombre: 'NOVENO SEMESTRE',
      materias: [
        {
          nombre: 'Inteligencia Artificial',
          profesor: 'Dr. José J. Hernández Barriga',
          aplicador: '',
          sinodales: ['Dr. Jesús Cruz Ahuactzil', 'M.C.C. Eliezer Alcázar Silva'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Seguridad Informática',
          profesor: 'M.C.M. Jesús Pacheco Mendoza',
          aplicador: '',
          sinodales: ['M.I.T.I. Oswaldo Rey Ávila Barrón'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Administración de Proyectos',
          profesor: 'M.C. Mónica Pérez Meza',
          aplicador: '',
          sinodales: ['M.C. Teresita de J. Mijangos Martínez', 'M.C.C. Lirio Ruiz Guerra'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Cómputo en la Nube',
          profesor: 'M.T.E. Everardo de Jesús Pacheco Antonio',
          aplicador: '',
          sinodales: ['M.T.I.E. Irving Ulises Hernández Miguel'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Auditoría Informática',
          profesor: 'Dra. Aidee Cruz Barragán',
          aplicador: '',
          sinodales: ['M.T.C.A. Rolando Pedro Gabriel', 'M.C.A.C. José Alberto Cruz Tolentino'],
          modalidad: 'Tradicional',
          academia: false
        }
      ]
    }
  ], []);

  // Estado editable de las materias con grupos por materia
  const [semestres, setSemestres] = useState(() => {
    return semestresIniciales.map(sem => ({
      ...sem,
      materias: sem.materias.map(m => {
        // Asignar grupos según el semestre
        let gruposCodigos;
        if (sem.numero === 1) {
          gruposCodigos = ['106-A', '106-B', '106-C'];
        } else if (sem.numero === 3) {
          gruposCodigos = ['306-A', '306-B', '306-C'];
        } else if (sem.numero === 5) {
          gruposCodigos = ['506-A', '506-B'];
        } else {
          gruposCodigos = ['Único'];
        }
        
        return {
          ...m,
          // Materia-level (aplica a todos los grupos)
          modalidad: m.modalidad || 'Tradicional',
          academia: !!m.academia,
          // Grupos
          selectedGrupoIndex: 0,
          gruposData: gruposCodigos.map(codigo => ({
            codigo,
            profesor: m.profesor,
            aplicador: m.aplicador || '',
            sinodales: (m.sinodales && m.sinodales.length > 0) ? [m.sinodales[0]] : [''],
          })),
        };
      })
    }));
  });
  
  // Estado para manejar qué semestre está expandido (solo uno a la vez)
  const [expandedSemesterIndex, setExpandedSemesterIndex] = useState(0);
  
  // Refs para cada acordeón para hacer scroll
  const accordionRefs = useRef({});
  
  // Estado para notificaciones
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Función para manejar cambios en las materias (nivel materia: aplica a todos los grupos)
  const handleMateriaChange = (semestreIndex, materiaIndex, field, value) => {
    setSemestres(prevSemestres => {
      const newSemestres = [...prevSemestres];
      newSemestres[semestreIndex].materias[materiaIndex] = {
        ...newSemestres[semestreIndex].materias[materiaIndex],
        [field]: value
      };
      return newSemestres;
    });
  };

  // Seleccionar grupo activo en una materia
  const handleSelectGrupo = (semestreIndex, materiaIndex, grupoIndex) => {
    setSemestres(prev => {
      const next = [...prev];
      next[semestreIndex].materias[materiaIndex].selectedGrupoIndex = grupoIndex;
      return next;
    });
  };

  // Cambiar campo específico de un grupo
  const handleMateriaGroupChange = (semestreIndex, materiaIndex, grupoIndex, field, value) => {
    setSemestres(prev => {
      const next = [...prev];
      const materia = next[semestreIndex].materias[materiaIndex];
      const gruposData = [...materia.gruposData];
      gruposData[grupoIndex] = { ...gruposData[grupoIndex], [field]: value };
      materia.gruposData = gruposData;
      return next;
    });
  };

  // Función para guardar las preferencias de un semestre específico
  const handleSaveSemester = (semestreIndex) => {
    console.log(`Guardando cambios del semestre ${semestreIndex + 1}`);
    
    // Mostrar notificación de éxito
    setNotification({
      open: true,
      message: `Cambios guardados exitosamente para ${semestres[semestreIndex].nombre}`,
      severity: 'success'
    });
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

  // Expandir o colapsar todos los semestres
  const handleToggleAll = () => {
    if (expandedSemesterIndex >= 0) {
      // Si hay un semestre expandido, colapsarlo
      setExpandedSemesterIndex(-1);
    } else {
      // Expandir el primero
      setExpandedSemesterIndex(0);
    }
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
              Preferencias de Exámenes
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary 
              }}
            >
              Configura las preferencias de examen para cada materia de la Licenciatura en Informática
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
            {expandedSemesterIndex >= 0 ? 'Colapsar Todo' : 'Expandir Todo'}
          </Button>
        </Box>

        {/* Semestres como Accordions */}
        {semestres.map((semestre, semestreIndex) => (
          <Accordion 
            key={semestre.numero}
            ref={(el) => accordionRefs.current[semestreIndex] = el}
            expanded={expandedSemesterIndex === semestreIndex}
            onChange={() => handleAccordionChange(semestreIndex)}
            TransitionProps={{ timeout: 300 }}
            sx={{
              mb: 2,
              '&:before': {
                display: 'none',
              },
              boxShadow: 2,
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&.Mui-expanded': {
                margin: '0 0 16px 0',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore size={24} style={{ color: '#fff' }} />}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&.Mui-expanded': {
                  minHeight: 56,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
                '& .MuiAccordionSummary-content': {
                  my: 1.5,
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  color: '#fff',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                {semestre.nombre}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              {/* Grid de Materias */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(3, 1fr)',
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                {semestre.materias.map((materia, materiaIndex) => {
                  const grupoActual = materia.gruposData[materia.selectedGrupoIndex];
                  return (
                    <MateriaCard
                      key={materiaIndex}
                      nombre={materia.nombre}
                      // Nivel materia (aplica a todos los grupos)
                      modalidad={materia.modalidad}
                      academia={materia.academia}
                      onChange={(field, value) => handleMateriaChange(semestreIndex, materiaIndex, field, value)}
                      // Grupos
                      grupos={materia.gruposData.map(g => g.codigo)}
                      selectedGrupoIndex={materia.selectedGrupoIndex}
                      onSelectGrupo={(idx) => handleSelectGrupo(semestreIndex, materiaIndex, idx)}
                      // Datos del grupo actual
                      profesor={grupoActual.profesor}
                      aplicador={grupoActual.aplicador}
                      sinodales={grupoActual.sinodales}
                      onChangeGrupo={(field, value) => handleMateriaGroupChange(semestreIndex, materiaIndex, materia.selectedGrupoIndex, field, value)}
                    />
                  );
                })}
              </Box>

              {/* Botón Guardar del Semestre */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<MdSave />}
                  onClick={() => handleSaveSemester(semestreIndex)}
                  sx={{
                    bgcolor: theme.palette.success.main,
                    color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.success.contrastText,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: theme.palette.success.dark,
                    },
                  }}
                >
                  Guardar {semestre.nombre}
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Notificaciones */}
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </MainLayout>
  );
};

export default Preferencias;


