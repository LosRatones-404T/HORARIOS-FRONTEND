import { useState, useMemo } from 'react';
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
          modalidad: 'Digital',
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
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Lógica Matemática',
          profesor: 'Dr. Arisel Darío Barragán López',
          aplicador: '',
          sinodales: ['Dra. Aidee Cruz Barragán'],
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Cálculo I',
          profesor: 'Dr. Arturo Benítez Hernández',
          aplicador: '',
          sinodales: ['Dr. José J. Hernández Barriga', 'M.C.C. Silviana Juárez Chalini'],
          modalidad: 'Digital',
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
          modalidad: 'Digital',
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
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Teoría de Autómatas',
          profesor: 'Dr. Eric Melecio Castro Leal',
          aplicador: '',
          sinodales: ['M.C.C. Eliezer Alcázar Silva'],
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Álgebra Lineal',
          profesor: 'Dr. Arisel Darío Barragán López',
          aplicador: '',
          sinodales: ['Dr. Arturo Benítez Hernández', 'Dra. Aidee Cruz Barragán'],
          modalidad: 'Digital',
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
          modalidad: 'Digital',
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
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Fundamentos de Sistemas Operativos',
          profesor: 'Dr. Jesús Cruz Ahuactzil',
          aplicador: '',
          sinodales: ['M.C.C. Eliezer Alcázar Silva'],
          modalidad: 'Digital',
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
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Bases de Datos Avanzadas',
          profesor: 'Dr. Eric Melecio Castro Leal',
          aplicador: '',
          sinodales: ['Dr. Alejandro Jarillo Silva'],
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Ingeniería de Software II',
          profesor: 'M.C.A.C. José Alberto Cruz Tolentino',
          aplicador: '',
          sinodales: ['M.C.C. Silviana Juárez Chalini', 'M.C.M. Oscar Cuauhtémoc Esperanza Contreras'],
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Probabilidad y Estadística',
          profesor: 'Dr. Arturo Benítez Hernández',
          aplicador: '',
          sinodales: ['Dr. Arisel Darío Barragán López'],
          modalidad: 'Digital',
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
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Seguridad Informática',
          profesor: 'M.C.M. Jesús Pacheco Mendoza',
          aplicador: '',
          sinodales: ['M.I.T.I. Oswaldo Rey Ávila Barrón'],
          modalidad: 'Digital',
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
          modalidad: 'Digital',
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

  // Estado editable de las materias
  const [semestres, setSemestres] = useState(semestresIniciales);
  
  // Estado para manejar qué semestres están expandidos (solo el primero al inicio)
  const [expandedSemesters, setExpandedSemesters] = useState([0]);
  
  // Estado para notificaciones
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Función para manejar cambios en las materias
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

  // Manejar expansión/colapso de semestre
  const handleAccordionChange = (index) => {
    setExpandedSemesters(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Expandir o colapsar todos los semestres
  const handleToggleAll = () => {
    if (expandedSemesters.length === semestres.length) {
      // Si todos están expandidos, colapsar todos
      setExpandedSemesters([]);
    } else {
      // Expandir todos
      setExpandedSemesters(semestres.map((_, index) => index));
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
            {expandedSemesters.length === semestres.length ? 'Colapsar Todo' : 'Expandir Todo'}
          </Button>
        </Box>

        {/* Semestres como Accordions */}
        {semestres.map((semestre, semestreIndex) => (
          <Accordion 
            key={semestre.numero}
            expanded={expandedSemesters.includes(semestreIndex)}
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
                {semestre.materias.map((materia, materiaIndex) => (
                  <MateriaCard
                    key={materiaIndex}
                    nombre={materia.nombre}
                    profesor={materia.profesor}
                    aplicador={materia.aplicador}
                    sinodales={materia.sinodales}
                    modalidad={materia.modalidad}
                    academia={materia.academia}
                    onChange={(field, value) => handleMateriaChange(semestreIndex, materiaIndex, field, value)}
                  />
                ))}
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


