import { useState } from 'react';
import { Box, Typography, Container, useTheme, Divider, Button } from '@mui/material';
import { MdSave } from 'react-icons/md';
import MateriaCard from '../components/common/MateriaCard';
import Notification from '../components/common/Notification';
import MainLayout from '../components/layout/MainLayout';

/**
 * Pantalla de Preferencias de Materias
 * Muestra las materias de la carrera de Informática organizadas por semestre
 */
const Preferencias = () => {
  const theme = useTheme();

  // Datos de materias por semestre para la carrera de Informática
  const semestresIniciales = [
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
      numero: 2,
      nombre: 'SEGUNDO SEMESTRE',
      materias: [
        {
          nombre: 'Programación Estructurada',
          profesor: 'Dr. Alberto Gutiérrez',
          aplicador: '',
          sinodales: ['Mtro. Jorge Vega', 'Mtra. Diana Cruz'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Fundamentos de Electrónica',
          profesor: 'Ing. Carmen Delgado',
          aplicador: '',
          sinodales: ['Dr. Luis Navarro'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Teoría General de Sistemas',
          profesor: 'Dr. Héctor Ortiz',
          aplicador: '',
          sinodales: ['Dra. Gabriela Rojas', 'Mtro. Andrés Silva'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Matemáticas Discretas',
          profesor: 'Dra. Isabel Vargas',
          aplicador: '',
          sinodales: ['Dr. Francisco Medina'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Cálculo II',
          profesor: 'Dr. Sergio Ramos',
          aplicador: '',
          sinodales: ['Dra. Mónica Flores', 'Dr. Antonio Reyes'],
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
      numero: 4,
      nombre: 'CUARTO SEMESTRE',
      materias: [
        {
          nombre: 'Paradigmas de Programación I',
          profesor: 'Dr. Guillermo Santos',
          aplicador: '',
          sinodales: ['Mtro. Mario Guzmán', 'Dra. Rosa Núñez'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Arquitectura de Computadoras',
          profesor: 'Ing. Alejandro Bravo',
          aplicador: '',
          sinodales: ['Dr. Ernesto Chávez'],
          modalidad: 'Tradicional',
          academia: true
        },
        {
          nombre: 'Bases de Datos I',
          profesor: 'Dra. Norma Fuentes',
          aplicador: '',
          sinodales: ['Mtro. Víctor Escobar', 'Mtra. Adriana Mejía'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Programación de Sistemas',
          profesor: 'Dr. Arturo Maldonado',
          aplicador: '',
          sinodales: ['Dra. Teresa Valencia'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Métodos Numéricos',
          profesor: 'Dr. Ignacio Peña',
          aplicador: '',
          sinodales: ['Dra. Alma Ibarra', 'Dr. Rodrigo Carrillo'],
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
      numero: 6,
      nombre: 'SEXTO SEMESTRE',
      materias: [
        {
          nombre: 'Tecnologías Web I',
          profesor: 'Dr. Óscar Villanueva',
          aplicador: '',
          sinodales: ['Mtra. Paola Mendoza', 'Mtro. Ramiro Cabrera'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Redes II',
          profesor: 'Ing. Alfredo Palacios',
          aplicador: '',
          sinodales: ['Dr. Jaime Montoya'],
          modalidad: 'Tradicional',
          academia: true
        },
        {
          nombre: 'Ingeniería de Software I',
          profesor: 'Dra. Lorena Barrios',
          aplicador: '',
          sinodales: ['Dr. Manuel Estrada', 'Mtra. Brenda Quintero'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Sistemas Operativos de Red',
          profesor: 'Dr. Rubén Zamora',
          aplicador: '',
          sinodales: ['Dra. Cristina Velázquez'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Programación de Dispositivos Móviles',
          profesor: 'Mtro. Iván Solís',
          aplicador: '',
          sinodales: ['Mtra. Jazmin Padilla', 'Mtro. Esteban Olvera'],
          modalidad: 'Digital',
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
      numero: 8,
      nombre: 'OCTAVO SEMESTRE',
      materias: [
        {
          nombre: 'Sistemas Distribuidos',
          profesor: 'Dr. Sebastián Pacheco',
          aplicador: '',
          sinodales: ['Mtra. Victoria Soto', 'Dr. Tomás Figueroa'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Calidad de Software',
          profesor: 'Dra. Amparo Santillán',
          aplicador: '',
          sinodales: ['Mtro. Édgar Prieto'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Interacción Humano-Computadora',
          profesor: 'Mtra. Natalia Molina',
          aplicador: '',
          sinodales: ['Dr. Luciano Badillo', 'Mtra. Esmeralda Quiroz'],
          modalidad: 'Tradicional',
          academia: false
        },
        {
          nombre: 'Inteligencia de Negocios',
          profesor: 'Dr. Adrián Cano',
          aplicador: '',
          sinodales: ['Dra. Magdalena Duran'],
          modalidad: 'Digital',
          academia: true
        },
        {
          nombre: 'Investigación de Operaciones',
          profesor: 'Dr. Nicolás Tapia',
          aplicador: '',
          sinodales: ['Dra. Gloria Pedraza', 'Dr. Julio Vázquez'],
          modalidad: 'Digital',
          academia: true
        }
      ]
    }
  ];

  // Estado editable de las materias
  const [semestres, setSemestres] = useState(semestresIniciales);
  
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

  // Función para guardar las preferencias
  const handleSavePreferences = () => {
    console.log('Guardando preferencias:', semestres);
    // Aquí puedes agregar la lógica para guardar en el backend
    
    // Mostrar notificación de éxito
    setNotification({
      open: true,
      message: 'Preferencias guardadas exitosamente',
      severity: 'success'
    });
  };

  return (
    <MainLayout showSidebar={true} menuType="admin">
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
              Preferencias de Materias
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary 
              }}
            >
              Licenciatura en Informática - Gestión de exámenes por semestre
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<MdSave />}
            onClick={handleSavePreferences}
            sx={{
              bgcolor: theme.palette.success.main,
              '&:hover': {
                bgcolor: theme.palette.success.dark,
              },
            }}
          >
            Guardar Cambios
          </Button>
        </Box>

        {/* Semestres */}
        {semestres.map((semestre, semestreIndex) => (
          <Box key={semestre.numero} sx={{ mb: 5 }}>
            {/* Título del Semestre */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 1
                }}
              >
                {semestre.nombre}
              </Typography>
              <Divider sx={{ borderColor: theme.palette.primary.main, borderWidth: 2 }} />
            </Box>

            {/* Grid de Materias */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                },
                gap: 2,
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
          </Box>
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


