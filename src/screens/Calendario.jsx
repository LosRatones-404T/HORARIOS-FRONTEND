import { useState } from 'react';
import { Box, Typography, Container, useTheme, Divider } from '@mui/material';
import HorarioSemanal from '../components/common/HorarioSemanal';
import MainLayout from '../components/layout/MainLayout';
import { Notification } from '../components/common';

/**
 * Pantalla de Calendario
 * Muestra el calendario de exámenes de todos los semestres de Informática
 */
const Calendario = () => {
  const theme = useTheme();

  // Estado de notificación
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Horarios de exámenes por semestre - Licenciatura en Informática
  const [semestres, setSemestres] = useState([
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
      numero: 2,
      nombre: 'SEGUNDO SEMESTRE',
      materias: [
        'Programación Estructurada',
        'Fundamentos de Electrónica',
        'Teoría General de Sistemas',
        'Matemáticas Discretas',
        'Cálculo II'
      ],
      eventos: [
        { dia: 1, horaInicio: '09:00', materia: 'Programación Estructurada', aula: 'Lab-302' },
        { dia: 1, horaInicio: '14:00', materia: 'Fundamentos de Electrónica', aula: 'Lab-401' },
        { dia: 2, horaInicio: '10:00', materia: 'Teoría General de Sistemas', aula: 'Aula-206' },
        { dia: 3, horaInicio: '08:00', materia: 'Matemáticas Discretas', aula: 'Aula-304' },
        { dia: 4, horaInicio: '11:00', materia: 'Cálculo II', aula: 'Aula-102' },
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
      numero: 4,
      nombre: 'CUARTO SEMESTRE',
      materias: [
        'Paradigmas de Programación I',
        'Arquitectura de Computadoras',
        'Bases de Datos I',
        'Programación de Sistemas',
        'Métodos Numéricos'
      ],
      eventos: [
        { dia: 1, horaInicio: '11:00', materia: 'Paradigmas de Programación I', aula: 'Lab-304' },
        { dia: 1, horaInicio: '16:00', materia: 'Arquitectura de Computadoras', aula: 'Lab-403' },
        { dia: 2, horaInicio: '08:00', materia: 'Bases de Datos I', aula: 'Lab-305' },
        { dia: 3, horaInicio: '10:00', materia: 'Programación de Sistemas', aula: 'Lab-306' },
        { dia: 4, horaInicio: '14:00', materia: 'Métodos Numéricos', aula: 'Aula-104' },
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
      numero: 6,
      nombre: 'SEXTO SEMESTRE',
      materias: [
        'Tecnologías Web I',
        'Redes II',
        'Ingeniería de Software I',
        'Sistemas Operativos de Red',
        'Programación de Dispositivos Móviles'
      ],
      eventos: [
        { dia: 1, horaInicio: '09:00', materia: 'Tecnologías Web I', aula: 'Lab-311' },
        { dia: 1, horaInicio: '14:00', materia: 'Redes II', aula: 'Lab-405' },
        { dia: 2, horaInicio: '10:00', materia: 'Ingeniería de Software I', aula: 'Aula-208' },
        { dia: 3, horaInicio: '08:00', materia: 'Sistemas Operativos de Red', aula: 'Lab-312' },
        { dia: 4, horaInicio: '16:00', materia: 'Programación de Dispositivos Móviles', aula: 'Lab-313' },
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
      numero: 8,
      nombre: 'OCTAVO SEMESTRE',
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
  ]);

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
    // Aquí puedes hacer la llamada a la API para guardar
    console.log(`Guardando cambios del semestre ${semestreNumero}`);
    setNotification({
      open: true,
      message: `Cambios guardados exitosamente para el ${semestres.find(s => s.numero === semestreNumero)?.nombre}`,
      severity: 'success'
    });
  };

  // Cerrar notificación
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
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
            Licenciatura en Informática - Horarios por semestre
          </Typography>
        </Box>

        {/* Horarios por semestre */}
        {semestres.map((semestre, index) => (
          <Box key={semestre.numero} sx={{ mb: 5 }}>
            {/* Título del semestre */}
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

            {/* Componente de horario semanal */}
            <HorarioSemanal 
              events={semestre.eventos}
              materias={semestre.materias}
              onEventsChange={(newEvents) => handleEventsChange(semestre.numero, newEvents)}
              onSave={() => handleSaveSemestre(semestre.numero)}
              showHeader={false}
            />
          </Box>
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
