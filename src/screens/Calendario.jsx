import { useState } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import HorarioSemanal from '../components/common/HorarioSemanal';
import MainLayout from '../components/layout/MainLayout';

/**
 * Pantalla de Calendario
 * Muestra el calendario de exámenes
 */
const Calendario = () => {
  const theme = useTheme();

  // Datos de ejemplo de exámenes programados
  const [events] = useState([
    {
      dia: 1, // Lunes
      horaInicio: '09:00',
      materia: 'Programación Estructurada',
      aula: 'Lab-301',
      profesor: 'Dr. Alberto Gutiérrez'
    },
    {
      dia: 2, // Martes
      horaInicio: '10:00',
      materia: 'Bases de Datos I',
      aula: 'Aula-205',
      profesor: 'Dra. Norma Fuentes'
    },
    {
      dia: 3, // Miércoles
      horaInicio: '14:00',
      materia: 'Estructuras de Datos',
      aula: 'Lab-302',
      profesor: 'Dr. Raúl Domínguez'
    },
    {
      dia: 4, // Jueves
      horaInicio: '08:00',
      materia: 'Cálculo I',
      aula: 'Aula-101',
      profesor: 'Dr. Fernando Castillo'
    },
    {
      dia: 5, // Viernes
      horaInicio: '11:00',
      materia: 'Teoría General de Sistemas',
      aula: 'Aula-303',
      profesor: 'Dr. Héctor Ortiz'
    },
  ]);

  // Manejar click en celda vacía
  const handleSlotClick = ({ dia, hora }) => {
    console.log(`Celda seleccionada - Día: ${dia}, Hora: ${hora}`);
    // Aquí puedes abrir un modal para crear un nuevo examen
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
            Visualiza y gestiona el calendario de exámenes semanal
          </Typography>
        </Box>

        {/* Componente de horario semanal */}
        <HorarioSemanal 
          events={events}
          onSlotClick={handleSlotClick}
          showHeader={true}
        />
      </Container>
    </MainLayout>
  );
};

export default Calendario;
