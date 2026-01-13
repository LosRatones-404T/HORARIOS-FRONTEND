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
          profesor: 'Dr. Juan Pérez García',
          aplicador: '',
          sinodales: ['Dra. María López', 'Mtro. Carlos Ruiz'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Administración',
          profesor: 'Mtra. Ana González Martínez',
          aplicador: '',
          sinodales: ['Lic. Pedro Sánchez'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Historia del Pensamiento Filosófico',
          profesor: 'Dr. Roberto Fernández',
          aplicador: '',
          sinodales: ['Dra. Laura Jiménez', 'Mtro. José Ramírez'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Lógica Matemática',
          profesor: 'Dr. Miguel Ángel Torres',
          aplicador: '',
          sinodales: ['Dra. Patricia Morales'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Cálculo I',
          profesor: 'Dr. Fernando Castillo',
          aplicador: '',
          sinodales: ['Dr. Ricardo Méndez', 'Mtra. Sofía Herrera'],
          modalidad: 'Digital',
          academia: true
        }
      ]
    },
    {
      numero: 3,
      nombre: 'TERCER SEMESTRE',
      materias: [
        {
          nombre: 'Estructuras de Datos',
          profesor: 'Dr. Raúl Domínguez',
          aplicador: '',
          sinodales: ['Mtro. Javier Cortés', 'Mtra. Beatriz Luna'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Electrónica Digital',
          profesor: 'Ing. Eduardo Castro',
          aplicador: '',
          sinodales: ['Dr. Pablo Aguilar'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Contabilidad y Finanzas',
          profesor: 'Lic. Mariana Salazar',
          aplicador: '',
          sinodales: ['Mtra. Claudia Paredes', 'Lic. Enrique Benítez'],
          modalidad: 'Digital',
          academia: false
        },
        {
          nombre: 'Teoría de Autómatas',
          profesor: 'Dr. Daniel Ochoa',
          aplicador: '',
          sinodales: ['Dra. Liliana Campos'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Álgebra Lineal',
          profesor: 'Dra. Verónica Ponce',
          aplicador: '',
          sinodales: ['Dr. Armando León', 'Mtra. Cecilia Ríos'],
          modalidad: 'Digital',
          academia: true
        }
      ]
    },
    {
      numero: 5,
      nombre: 'QUINTO SEMESTRE',
      materias: [
        {
          nombre: 'Paradigmas de Programación II',
          profesor: 'Dr. Oscar Montes',
          aplicador: '',
          sinodales: ['Mtra. Silvia Ortega', 'Mtro. Felipe Márquez'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Redes I',
          profesor: 'Ing. Mauricio Acosta',
          aplicador: '',
          sinodales: ['Dr. Gerardo Lara'],
          modalidad: 'Tradicional',
          academia: true
        },
        {
          nombre: 'Bases de Datos II',
          profesor: 'Dra. Elena Cordero',
          aplicador: '',
          sinodales: ['Mtro. Hugo Sandoval', 'Dra. Yolanda Cervantes'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Fundamentos de Sistemas Operativos',
          profesor: 'Dr. César Espinosa',
          aplicador: '',
          sinodales: ['Dra. Karla Miranda'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Diseño Web',
          profesor: 'Mtra. Daniela Rosales',
          aplicador: '',
          sinodales: ['Mtro. Samuel Gallegos', 'Mtra. Fernanda Ugalde'],
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
          profesor: 'Dr. Marcos Arellano',
          aplicador: '',
          sinodales: ['Mtro. Omar Alvarado', 'Mtra. Regina Santos'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Bases de Datos Avanzadas',
          profesor: 'Dra. Pilar Rangel',
          aplicador: '',
          sinodales: ['Dr. Gonzalo Trejo'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Ingeniería de Software II',
          profesor: 'Dr. Benjamín Camacho',
          aplicador: '',
          sinodales: ['Dra. Leticia Arriaga', 'Mtro. Saúl Hidalgo'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Probabilidad y Estadística',
          profesor: 'Dra. Susana Cárdenas',
          aplicador: '',
          sinodales: ['Dr. Emilio Zúñiga'],
          modalidad: 'Digital',
          academia: true
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
          profesor: 'Dr. Xavier Montes',
          aplicador: '',
          sinodales: ['Dra. Raquel Orozco', 'Mtro. Augusto Parra'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Seguridad Informática',
          profesor: 'Dr. Leonardo Bermúdez',
          aplicador: '',
          sinodales: ['Dra. Mireya Galván'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Administración de Proyectos',
          profesor: 'Mtra. Ximena Salinas',
          aplicador: '',
          sinodales: ['Lic. Gustavo Macías', 'Mtra. Liliana Robles'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Cómputo en la Nube',
          profesor: 'Dr. Maximiliano Aranda',
          aplicador: '',
          sinodales: ['Dr. Octavio Serrano'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Auditoría Informática',
          profesor: 'Lic. Flor Mariana Cortés',
          aplicador: '',
          sinodales: ['Lic. Salvador Ochoa', 'Mtra. Nadia Suárez'],
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
                    xl: 'repeat(4, 1fr)',
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


